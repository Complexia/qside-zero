use axum_server::tls_rustls::RustlsConfig;
use clap::{App, Arg, SubCommand};
use tokio::io::{self, AsyncReadExt};
//use tower::make::Shared;
//use tower::ServiceBuilder;

#[allow(unused_imports)]
use std::fs::File;
use std::net::SocketAddr;
// use std::io::prelude::*;
// use tokio::join;
use dotenv::dotenv;


#[tokio::main]
async fn main() {
    dotenv().ok();

    println!("Launching Axum...🚀");
    println!("Running on port {}", 3030);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3030));
    let service = qside_server::routes::routes().into_make_service();

    axum_server::bind(addr).serve(service).await.unwrap();

    
}


