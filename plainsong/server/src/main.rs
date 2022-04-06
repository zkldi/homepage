#![feature(decl_macro)]
#![feature(in_band_lifetimes)]
#[macro_use]
extern crate rocket;

use glob::glob;
use lazy_static::lazy_static;
use recmd::RecMD;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::serde::{json::Json, Serialize};
use rocket::{get, Request, Response};

mod recmd;

fn load_recmds() -> Vec<RecMD> {
	let mut recs = Vec::new();

	for maybe_path in glob("../recs/**/*.recmd").expect("Failed to read glob pattern.") {
		match maybe_path {
			Ok(path) => match recmd::parse(path.to_str().unwrap()) {
				Ok(d) => recs.push(d),
				Err(err) => println!("An error occured while parsing {:?}. {err}", path),
			},
			Err(err) => panic!("Failed to read recs. {err}"),
		}
	}

	recs
}

lazy_static! {
	static ref RECMDS: Vec<RecMD> = load_recmds();
}

#[derive(Debug, Serialize)]
struct ApiReturn {
	recs: Vec<RecMD>,
}

#[get("/recs")]
fn return_data() -> Json<&'static Vec<RecMD>> {
	Json(&RECMDS)
}

pub struct CORS;
#[rocket::async_trait]
impl Fairing for CORS {
	fn info(&self) -> Info {
		Info {
			name: "Add CORS headers to responses",
			kind: Kind::Response,
		}
	}

	async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
		response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
		response.set_header(Header::new(
			"Access-Control-Allow-Methods",
			"POST, GET, PATCH, OPTIONS",
		));
		response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
		response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
	}
}

#[launch]
fn rocket() -> _ {
	rocket::build()
		.attach(CORS)
		.mount("/api", routes![return_data])
}
