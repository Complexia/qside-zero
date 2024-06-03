import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_ANON_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

# JWT
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

DEBUG = bool(os.getenv("DEBUG"))

config = {"SUPABASE_URL": SUPABASE_URL,
          "SUPABASE_ANON_KEY": SUPABASE_SERVICE_KEY,
          "OPENAI_API_KEY": OPENAI_API_KEY,
          "JWT_SECRET": JWT_SECRET,
          "JWT_ALGORITHM": JWT_ALGORITHM,
          "TAVILY_API_KEY": TAVILY_API_KEY,
          "DEBUG": DEBUG}