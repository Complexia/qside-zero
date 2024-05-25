use scraper::{Html, Selector};
use reqwest;
pub mod models;
// use crate::models;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn scrap_web(url: String) -> crate::models::SocialMetaData {
    let client = reqwest::Client::new();
    let response = client.get(&url).send().await.unwrap().text().await.unwrap();
    let document = Html::parse_document(&response);
      // Define a selector for the script tag with the specific id
      let script_selector = Selector::parse("script#__UNIVERSAL_DATA_FOR_REHYDRATION__").unwrap();
      // Find the script tag and extract its content
      let mut meta: crate::models::SocialMetaData = crate::models::SocialMetaData::default();
      if let Some(element) = document.select(&script_selector).next() {
          let script_content = element.inner_html();
                  // Parse the JSON content
                  let json_data: crate::models::TikTokMetaData = serde_json::from_str(&script_content).unwrap();
                  let user = json_data.default_scope.map(|x|x.webapp_user_detail.clone().unwrap_or_default()).unwrap_or_default();
                  meta.image = user.user_info.as_ref().map(|y|y.user.as_ref().map(|i|i.avatar_larger.clone()).unwrap_or_default()).unwrap_or_default();
                  meta.r#type = Some("TikTok".to_string());
                  meta.title = user.share_meta.as_ref().map(|x|x.title.clone().unwrap_or_default());
                  meta.description = user.share_meta.as_ref().map(|x|x.desc.clone().unwrap_or_default());
                  let unique_id = user.user_info.as_ref().map(|y|y.user.as_ref().map(|i|i.unique_id.clone()).unwrap_or_default()).unwrap_or_default().unwrap_or_default();
                  meta.url = Some(format!("https://www.tiktok.com/@{}",unique_id));
                  println!("User Detail1 : {:#?}", user);
      } else {
          println!("Script tag with the specified id not found.");
      }
    
  
    meta
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, scrap_web])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
