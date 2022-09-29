import { MessageEventPayload, MessageType } from "./../utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversationMessages } from "./../utils/api";
import { ConversationMessage } from "../utils/types";

export interface MessagesState {
  messages: MessageType[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetchMessagesThunk",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType>) => {
      state.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.messages = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
