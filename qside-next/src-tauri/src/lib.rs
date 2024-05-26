use scraper::{Html, Selector};
use reqwest;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
pub mod models;
pub mod handler;
// use crate::models;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn scrap_web(r#type:String,url: String) -> crate::models::SocialMetaData {
    match r#type.as_str() {
        "tiktok"=> crate::handler::tiktok_scrap(url).await,
        "ing" => crate::handler::instar_scrap(url).await,
        "link" => crate::handler::linkein_scrap(url).await,
        "git" => crate::handler::instar_scrap(url).await,
        _=> crate::models::SocialMetaData::default()
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,scrap_web])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
