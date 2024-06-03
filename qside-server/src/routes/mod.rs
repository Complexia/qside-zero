
use axum::{routing::get, routing::post, Router};


use tower_http::compression::CompressionLayer;


use crate::handlers;

pub fn routes() -> Router {
    Router::new()
        .route("/scrape", post(handlers::scrape_data))
        .route("/bob", get(|| async { "hey bob" }))
        .layer(CompressionLayer::new().gzip(true))
        
}
