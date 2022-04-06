#![feature(decl_macro)]
use std::fs;

use glob::glob;
use recmd::RecMD;
use serde::{Deserialize, Serialize};

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

fn main() {
	let recmds = load_recmds();

	let api_return = ApiReturn { recs: recmds };

	let json = serde_json::to_string(&api_return).unwrap();

	match fs::write("parsed-recmds.json", json) {
		Ok(r) => println!("Saved output. {:?}", r),
		Err(err) => println!("Failed to write output, {:?}", err),
	}
}

#[derive(Debug, Serialize, Deserialize)]
struct ApiReturn {
	recs: Vec<RecMD>,
}
