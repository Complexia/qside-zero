from supabase.client import Client, create_client
from src.libs.config import config

supabase_client: Client = create_client(
    config.get("SUPABASE_URL"),
    config.get("SUPABASE_ANON_KEY")
)