import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import conversationsReducer from "./conversationSlice";
import messagesReducer from "./messageSlice";

export const store = configureStore({
  reducer: { conversation: conversationsReducer, message: messagesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
