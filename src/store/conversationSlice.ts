import { ConversationType, CreateConversationParams } from "../utils/types";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getConversations, postNewConversation } from "../utils/api";
import { RootState } from ".";

export interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetchConversationsThunk",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/createConversationThunk",
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation", { state, action });
      state.conversations.push(action.payload);
    },
    updateConversations: (state, action: PayloadAction<ConversationType>) => {
      const newConversation = action.payload;
      const index = state.conversations.findIndex(
        (conversation) => conversation.id === newConversation.id
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(newConversation);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      });
  },
});

export const selectConversations = (state: RootState) =>
  state.conversation.conversations;

export const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) =>
    conversations.find((conversation) => conversation.id === conversationId)
);

export const { addConversation, updateConversations } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
