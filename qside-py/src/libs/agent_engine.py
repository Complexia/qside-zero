import json
from pydantic import BaseModel
from src.libs.config import config
from openai import OpenAI
from typing import List, Optional
from src.libs.clients import supabase_client

# tools
from src.libs.tools.search_internet import search_internet
from src.libs.tools.get_word_count import get_word_count

OPENAI_API_KEY = config.get("OPENAI_API_KEY")

class CharacterChatPayload(BaseModel):
    role: str
    content: str


# check if new chat, if so, get character description and tools
# if not new chat, then use chat history passed as the param from frontend
# if not new chat and no chat history is passed from frontend, fetch from supabase
# save chat history into supabase
def run_agent(user_prompt: str, chat_history: List[CharacterChatPayload], character_id: str, user_id: str, new_chat: bool, chat_id: str = None) -> str:

    # if this is a new chat
    if new_chat:
        # get character description
        character_name = supabase_client.table("characters").select("name").eq('id', character_id).execute()
        character_description = supabase_client.table("characters").select("description").eq('id', character_id).execute()
        
        # get character tools
        character_tools = supabase_client.table("characters_tools").select("tool_name").eq('character_id', character_id).execute().data
        print("tools data", character_tools)
        # json_format_tool = """
        # {
        #     "tool_needed": "true",
        #     "tool_name": "search_internet"
        #     "tool_prompt": "prompt to search"
        #     "answer": None
        # }
        # """

        # json_format_no_tool = """
        # {
        #     "tool_needed": "false",
        #     "tool_name": None
        #     "tool_prompt": None
        #     "answer": "Your answer here"
        # }
        # """
        
        system_prompt = f"""
            You are {character_name}, a character with the following description: {character_description}. 
            You can respond either form A or form B.
            In form A, respond in character and never break character.
            In form B, respond according to the specifications and nothing else.
            You can use tools to help you with your tasks. 
            The tools are: {character_tools}. 
            If you think a tool is required to answer a query, respond in form B as follows:
            [tool_name ./ tool_param]
            example: [search_internet ./ weather in San Francisco]
            ONLY RESPOND AS ABOVE IF TOOLS ARE NEEDED! DO NOT RESPOND IN CHARACTER! ONLY OUTPUT TOOL NAME AND TOOL PARAM!
            
            If no tool further tool use is required to answer, respond in form A
            If you've already used a tool, context will be provided with user's original query,
            and you have to decide whether the answer is complete and respond, or respond with another tool needed
            to complete it.
        """
            
        system_message = {"role": "system", "content": system_prompt.strip().replace('\n', '').replace('  ', ' ')}
        user_message = {"role": "user", "content": user_prompt} 
        
        
        messages = [system_message, user_message]
        
        completion = send_message(messages)
        
        #insert messages into supabase
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": system_message, "character_id": character_id, "user_id": user_id}).execute()
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": user_message, "character_id": character_id, "user_id": user_id}).execute()
        
        
        agent_response = completion.choices[0].message.content

        agent_message = {"role": "assistant", "content": agent_response}
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": agent_message, "character_id": character_id, "user_id": user_id}).execute()
        messages.append(agent_message)

        print(agent_message)

    else:
        messages = chat_history 
        # append user's latest message to chat history
        user_message = {"role": "user", "content": user_prompt}
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": user_message, "character_id": character_id, "user_id": user_id}).execute()
        messages.append(user_message)
        
        # get agent response
        completion = send_message(messages)
        
        agent_response = completion.choices[0].message.content

        agent_message = {"role": "assistant", "content": agent_response}
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": agent_message, "character_id": character_id, "user_id": user_id}).execute()
        messages.append(agent_message)
        
        print(agent_message)
        
        # save chat history into supabase

    agent_response_json = set_as_json(agent_response)
    print("agent response json", agent_response_json)

    while agent_response_json.get("tool_needed"):
        tool_name = agent_response_json.get("tool_name")
        tool_param = agent_response_json.get("tool_param")
        
        tool_output = use_tool(tool_name.strip(), tool_param.strip())

        system_prompt = f"""
            You have finished using the tool, and the answer or context is {tool_output}.
            Remember to stick to the JSON format as you answer. Answer in character. Remember, you are {character_name}.
        """
        
        system_message = {"role": "system", "content": system_prompt.strip().replace('\n', '').replace('  ', ' ')}
        messages.append(system_message)
        completion = send_message(messages)
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": system_message, "character_id": character_id, "user_id": user_id}).execute()
        agent_response = completion.choices[0].message.content
        agent_message = {"role": "assistant", "content": agent_response}
        messages.append(agent_message)
        supabase_client.table("chat_history").insert({"chat_id": chat_id, "message": agent_message, "character_id": character_id, "user_id": user_id}).execute()
        print("agent resss", agent_response)
        
        agent_response_json = set_as_json(agent_response) 
        
        
    
    return agent_response_json.get("answer")
    
    
    
def send_message(messages):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    return completion 

def use_tool(tool_name, tool_param):
    if tool_name in globals() and callable(globals()[tool_name]):
        function_to_call = globals()[tool_name]
        tool_output = function_to_call(tool_param)
        return tool_output
    else:
        print(f"Function '{tool_name}' not found.")
        return None
    
def set_as_json(agent_response):
    tool_indicator = "./"
    tool_needed = tool_indicator in agent_response
    if tool_needed:
        agent_response = agent_response.replace("[", '')
        agent_response = agent_response.replace("]", '')
        
        tool_and_param = agent_response.split(tool_indicator)
        tool_name = tool_and_param[0]
        tool_param = tool_and_param[1]
        print("tool name", tool_name)
        print("tool param", tool_param)
        answer = None
    else:
        tool_name = None
        tool_param = None
        answer = agent_response
        
    agent_response_json = {
        "tool_needed": tool_needed,
        "tool_name": tool_name,
        "tool_param": tool_param,
        "answer": answer 
    }
    return agent_response_json

client = OpenAI()