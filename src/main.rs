#[macro_use] extern crate rocket;


use rocket_contrib::json::Json;
use rocket::response::content;
use rocket::fs::{relative, FileServer};
use std::thread;
#[get("/<word>")]
fn foo(word : &str) -> String {
    println!("{}", word.to_string());
    word.to_string()
}

fn test() {
    for i in 1..1000 {
        println!("test");
    }
}

#[launch]
fn rocket() -> _ {
    println!("Hello");
    thread::spawn(move || {
        test();
    });
    rocket::build()
        .mount("/", routes![foo])
        .mount("/", FileServer::from(relative!("temp"))) // to host the html file. 
    
}
// #[rocket::main]
// async fn main() {
//     rocket::build()
//         .mount("/", routes![foo])
//         .mount("/", FileServer::from(relative!("temp"))).launch(); // to host the html file. 
// }

// #[launch]
// fn rocket() -> _ {
//     println!("Hello");
//     let thr = thread::spawn(move || {rocket::build()
//         .mount("/", routes![foo])
//         .mount("/", FileServer::from(relative!("temp"))) // to host the html file. 
//     });
    
//     println!("Hello");
//     thr.join();
// }