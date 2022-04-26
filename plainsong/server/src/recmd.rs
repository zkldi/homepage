use lazy_static::lazy_static;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::{
	collections::HashMap,
	env,
	error::Error,
	fs::{self, File},
	io::{BufRead, BufReader},
	path::Path,
	time::UNIX_EPOCH,
};

#[derive(Debug, Serialize, Deserialize)]
pub struct RecMD {
	id: String,
	info: RecMDHead,
	last_changed: u128,
	about: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RecMDHead {
	artist: String,
	title: String,
	album: Option<String>,
	art_path: Option<String>,
	tags: Option<Vec<String>>,
	listen: Option<String>,
	weirdness: u32,
	rating: u32,
}

struct RecMDHeadValue {
	key: String,
	raw_value: String,
}

#[derive(Debug, std::cmp::PartialEq)]
enum ParseState {
	Header,
	Body,
}

/**
 * Given a file path, parses the file there into the RecMD structure.
 *
 * Example Structure:
 *
 * key: value
 * other_key: othervalue
 * ---
 *
 * markdown data goes here
 */
pub fn parse(filepath: &str) -> Result<RecMD, Box<dyn Error>> {
	let file = File::open(filepath)?;

	let lines = BufReader::new(file).lines();

	let mut header_values = HashMap::<String, String>::new();
	let mut body_lines: Vec<String> = Vec::new();

	let mut parse_state: ParseState = ParseState::Header;

	for line in lines.filter_map(Result::ok) {
		// println!("Parsing: {:?}, {}", parse_state, line);
		match parse_state {
			ParseState::Header if line.starts_with("---") => {
				parse_state = ParseState::Body;
				continue;
			}
			ParseState::Header if line.is_empty() => {
				continue;
			}
			ParseState::Header => {
				let data = parse_header_line(&line);
				header_values.insert(data.key, data.raw_value);
			}
			ParseState::Body => {
				body_lines.push(line);
			}
		}
	}

	let head = parse_head(header_values)?;
	let body = body_lines.join("\n");

	Ok(RecMD {
		id: Path::new(filepath)
			.file_stem()
			.expect("Failed to get filestem of path?")
			.to_str()
			.expect("Failed to convert OsStr into real string?")
			.to_string(),
		about: body,
		last_changed: fs::metadata(filepath)
			.expect("Couldn't read file again?")
			.accessed()
			.expect("Couldn't find out when file was last modified.")
			.duration_since(UNIX_EPOCH)
			.expect("Time went backwards?")
			.as_micros(),
		info: head,
	})
}

lazy_static! {
	// Essentially -- read a tag and its value, stripping trailing spaces.
	static ref HEADER_REGEX: Regex = Regex::new(r"^ *([a-z_]*) *: *(.*) *$").unwrap();
}

fn parse_header_line(raw_data: &str) -> RecMDHeadValue {
	let content = HEADER_REGEX.captures(raw_data);

	match content {
		Some(d) => {
			return RecMDHeadValue {
				key: d.get(1).unwrap().as_str().to_lowercase(),
				raw_value: d.get(2).unwrap().as_str().to_string(),
			}
		}
		None => panic!("Could not parse invalid header line {raw_data}."),
	}
}

fn parse_head(head_content: HashMap<String, String>) -> Result<RecMDHead, &'static str> {
	let artist = head_content
		.get("artist")
		.ok_or("No artist in header. Cannot parse.")?
		.to_owned();

	let title = head_content
		.get("title")
		.ok_or("No song title in header. Cannot parse.")?
		.to_owned();

	println!("Parsing {artist} - {title}.");

	let weirdness = head_content
		.get("weird")
		.ok_or("Missing weirdness. Cannot parse.")?
		.to_owned()
		.parse::<u32>()
		.map_err(|_| "Couldn't turn weirdness into an integer?")?;

	let rating = head_content
		.get("rating")
		.ok_or("Missing rating. Cannot parse.")?
		.to_owned()
		.parse::<u32>()
		.map_err(|_| "Couldn't turn rating into an integer?")?;

	if !(0..=3).contains(&rating) {
		return Err("Invalid rating. Can't exceed 3.");
	}

	if !(0..=3).contains(&weirdness) {
		return Err("Invalid weirdness. Must be between 0 and 3.");
	}

	let tags: Option<Vec<String>> = head_content.get("tags").map(|s| {
		s.split(',')
			.map(|s| s.trim().to_string())
			.collect::<Vec<String>>()
	});

	let network_data = get_network_data(&title, &artist);

	let (mut art_path, listen, network_album) = match network_data {
		Ok(d) => (Some(d.art_path), Some(d.listen), Some(d.album)),
		Err(err) => {
			println!("{err}");
			(None, None, None)
		}
	};

	// if the user passes an album, trust them instead.
	let mut album = head_content.get("album").map(|f| f.to_owned());

	if album.is_none() && network_album.is_some() {
		album = network_album;
	}

	// if the user passes album art, trust them instead.
	let art = head_content.get("art").map(|f| f.to_owned());

	if art.is_some() {
		art_path = art
	}

	Ok(RecMDHead {
		artist,
		title,
		art_path,
		listen,
		album,
		tags,
		weirdness,
		rating,
	})
}

struct NetworkData {
	listen: String,
	art_path: String,
	album: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct NetworkBody {
	track: Track,
}

#[derive(Deserialize, Serialize, Debug)]
struct Track {
	url: String,
	album: Album,
}

#[derive(Deserialize, Serialize, Debug)]
struct Album {
	title: String,
	image: Vec<Image>,
}

#[derive(Deserialize, Serialize, Debug)]
struct Image {
	#[serde(rename = "#text")]
	text: String,
	size: String,
}

fn get_network_data(title: &str, artist: &str) -> Result<NetworkData, Box<dyn Error>> {
	let api_key = match env::var("API_KEY") {
		Ok(r) => r,
		Err(_) => {
			return Err("No API_KEY set in environment. Can't fetch data from the internet.".into())
		}
	};

	let track_data = attohttpc::get("http://ws.audioscrobbler.com/2.0/")
		.params(&[
			("method", "track.getInfo"),
			("track", title),
			("artist", artist),
			("api_key", &api_key),
			("format", "json"),
		])
		.send()?;

	if !track_data.is_success() {
		return Err("Couldn't fetch track data?".into());
	}

	let json = track_data.json::<NetworkBody>()?;

	let track = json.track;

	let art_path = match track.album.image.iter().find(|f| f.size == "extralarge") {
		Some(d) => d.text.clone(),
		None => return Err("Couldn't get album art.".into()),
	};

	Ok(NetworkData {
		art_path,
		listen: track.url.clone(),
		album: track.album.title,
	})
}
