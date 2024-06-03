# """Callback handlers used in the app."""
# from typing import Any
# import json
# from langchain.callbacks.base import AsyncCallbackHandler

# class ActionSendCallbackHandler(AsyncCallbackHandler):
#     """Callback handler for streaming LLM responses."""

#     # def __init__(self, websocket):
#     websocket = None

#     async def on_agent_action(self, action, **kwargs: Any) -> None:
#         action_dict = json.loads(action.log)

#         await self.websocket.send_json(action_dict)

#     async def on_tool_end(self, output, **kwargs: Any) -> None:
#         print(output)
#         await self.websocket.send_json({"action_output": output})


# action_send_callback_handler = ActionSendCallbackHandler()
