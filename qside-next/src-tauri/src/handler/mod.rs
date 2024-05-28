use scraper::{Html, Selector};
use reqwest;

pub async fn tiktok_scrap(url: String) -> crate::models::SocialMetaData {
    let url = url.to_lowercase();
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
                  meta.url = Some(format!("https://www.tiktok.com/@{}",unique_id).trim_end_matches('/').to_string());
                  println!("User Detail1 : {:#?}", user);
      } else {
          println!("Script tag with the specified id not found.");
      }
    
  
    meta
}

pub async fn instar_scrap(url: String) -> crate::models::SocialMetaData {
    let url = url.to_lowercase();
    let client = reqwest::Client::builder()
        .user_agent("Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1")
        .build().unwrap();
    let response = client.get(&url).send().await.unwrap().text().await.unwrap();
    //test
        // Write the entire HTML document to a file
        // let mut file = File::create("document.html").await.unwrap();
        // file.write_all(response.as_bytes()).await.unwrap();
        //end.
    let document = Html::parse_document(&response);
      // Define a selector for the script tag with the specific id
      let meta_type_selector = Selector::parse(r#"meta[property="og:type"]"#).unwrap();
      let meta_image_selector = Selector::parse(r#"meta[property="og:image"]"#).unwrap();
      let meta_title_selector = Selector::parse(r#"meta[property="og:title"]"#).unwrap();
      let meta_url_selector = Selector::parse(r#"meta[property="og:url"]"#).unwrap();
      let meta_description_selector = Selector::parse(r#"meta[property="og:description"]"#).unwrap();
      let mut meta: crate::models::SocialMetaData = crate::models::SocialMetaData::default();

      // Find the script tag and extract its content

    //   println!("this is debug from rust {:?}",document);
    // Extract meta image
    if let Some(element) = document.select(&meta_image_selector).next() {
        meta.image = element.value().attr("content").map(|s| s.to_string());
    }

    // Extract meta title
    if let Some(element) = document.select(&meta_title_selector).next() {
        meta.title = element.value().attr("content").map(|s| s.to_string());
    }

    // Extract meta url
    if let Some(element) = document.select(&meta_url_selector).next() {
        meta.url = element.value().attr("content").map(|s| s.trim_end_matches('/').to_string());
    }

    // Extract meta description
    if let Some(element) = document.select(&meta_description_selector).next() {
        meta.description = element.value().attr("content").map(|s| s.to_string());
    }
    
  
    meta
}

pub async fn linkein_scrap(url: String) -> crate::models::SocialMetaData {
    let url = url.to_lowercase();
    let client = reqwest::Client::builder()
        .user_agent("Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1")
        .build().unwrap();
    let response = client.get(&url).send().await.unwrap().text().await.unwrap();
    //test
        // Write the entire HTML document to a file
        // let mut file = File::create("document.html").await.unwrap();
        // file.write_all(response.as_bytes()).await.unwrap();
        //end.
    let document = Html::parse_document(&response);
      // Define a selector for the script tag with the specific id
      let meta_type_selector = Selector::parse(r#"meta[property="og:type"]"#).unwrap();
      let meta_image_selector = Selector::parse(r#"meta[property="og:image"]"#).unwrap();
      let meta_title_selector = Selector::parse(r#"meta[property="og:title"]"#).unwrap();
      let meta_url_selector = Selector::parse(r#"meta[property="og:url"]"#).unwrap();
      let meta_description_selector = Selector::parse(r#"meta[name="og:description"]"#).unwrap();
      let mut meta: crate::models::SocialMetaData = crate::models::SocialMetaData::default();

      // Find the script tag and extract its content

    //   println!("this is debug from rust {:?}",document);
    // Extract meta image
    if let Some(element) = document.select(&meta_image_selector).next() {
        meta.image = element.value().attr("content").map(|s| s.to_string());
    }

    // Extract meta title
    if let Some(element) = document.select(&meta_title_selector).next() {
        meta.title = element.value().attr("content").map(|s| s.to_string());
    }

    // Extract meta url
    if let Some(element) = document.select(&meta_url_selector).next() {
        meta.url = element.value().attr("content").map(|s| s.trim_end_matches('/').to_string());
    }

    // Extract meta description
    if let Some(element) = document.select(&meta_description_selector).next() {
        meta.description = element.value().attr("content").map(|s| s.to_string());
    }
    
  
    meta
}