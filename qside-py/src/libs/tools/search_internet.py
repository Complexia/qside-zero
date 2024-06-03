from tavily import TavilyClient
from src.libs.config import config

def search_internet(prompt: str) -> str:
    """Searches the internet."""
    # For basic search:
    print("this is prompt: ", prompt)
    TAVILY_API_KEY = config.get("TAVILY_API_KEY")
    print(TAVILY_API_KEY)
    tavily = TavilyClient(api_key=TAVILY_API_KEY)
    prompt = prompt.strip()
    response = tavily.search(query=prompt)
    # For advanced search:
    #response = tavily.search(query="Should I invest in Apple in 2024?", search_depth="advanced")
    # Get the search results as context to pass an LLM:
    context = [{"url": obj["url"], "content": obj["content"]} for obj in response["results"]]
    
    return context
