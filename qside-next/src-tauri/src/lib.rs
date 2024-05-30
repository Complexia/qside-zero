use scraper::{Html, Selector};
use reqwest;
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
        "Tiktok"=> crate::handler::tiktok_scrap(url).await,
        "Instagram" => crate::handler::instar_scrap(url).await,
        "Linkedin" => crate::handler::linkein_scrap(url).await,
        "Github" => crate::handler::instar_scrap(url).await,
        "My page" => crate::handler::instar_scrap(url).await,
        _=> crate::models::SocialMetaData::default()
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_nfc::init())
        .invoke_handler(tauri::generate_handler![greet,scrap_web])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
