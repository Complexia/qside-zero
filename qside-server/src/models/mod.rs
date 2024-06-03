use axum::response::{IntoResponse, Response};
use axum::http::StatusCode;
use thiserror::Error;

use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct SocialMetaData {
    pub r#type: Option<String>,
    pub image: Option<String>,
    pub title: Option<String>,
    pub url: Option<String>,
    pub description: Option<String>,
    pub icon: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct ScrapeRequest {
    pub entity: String,
    pub url: String,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct TikTokMetaData {
    #[serde(alias = "__DEFAULT_SCOPE__")]
    pub default_scope: Option<DefaultScope>,
}
#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct DefaultScope {
    #[serde(alias = "webapp.app-context")]
    pub webapp_app_context: Option<serde_json::Value>,
    #[serde(alias = "webapp.biz-context")]
    pub webapp_biz_context: Option<serde_json::Value>,
    #[serde(alias = "webapp.i18n-translation")]
    pub webapp_i18n_translation: Option<serde_json::Value>,
    #[serde(alias = "seo.abtest")]
    pub seo_abtest: Option<serde_json::Value>,
    #[serde(alias = "webapp.user-detail")]
    pub webapp_user_detail: Option<WebAppUserDetail>,
    #[serde(alias = "webapp.a-b")]
    pub webapp_a_b: Option<serde_json::Value>,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct WebAppUserDetail {
    #[serde(alias = "userInfo")]
    pub user_info: Option<UserInfo>,
    #[serde(alias = "shareMeta")]
    pub share_meta: Option<ShareMeta>,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct UserInfo {
    pub user: Option<User>,
    pub stats: Option<serde_json::Value>,
    #[serde(alias = "itemList")]
    pub item_list: Option<serde_json::Value>,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct User {
    #[serde(alias = "avatarLarger")]
    pub avatar_larger: Option<String>,
    pub nickname: Option<String>,
    #[serde(alias = "uniqueId")]
    pub unique_id: Option<String>,
    pub signature: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct ShareMeta {
    pub title: Option<String>,
    #[serde(alias = "shareMeta")]
    pub desc: Option<String>,
}



#[derive(Error, Debug, Clone)]
pub enum Errors {
    #[error("Error: {0}")]
    Error(String),
    
}

impl IntoResponse for Errors {
    fn into_response(self) -> Response {
        let e = self;
        let response = match e {
            Errors::Error(_) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()),
            
        };
        response.into_response()
    }
} //end.
