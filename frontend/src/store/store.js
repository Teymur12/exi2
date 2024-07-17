import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/user.slice';
import postReducer from '../slices/post.slice';
import conversationReducer from '../slices/conversation.slice';
import messagesReducer from '../slices/messages.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    conversation: conversationReducer,
    messages: messagesReducer
  }
});

export default store;