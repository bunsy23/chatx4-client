import {
  ConversationType,
  CreateConversationParams,
  CreateMessageParams,
  CreateUserParams,
  MessageType,
  UserCredentialsParams,
} from "./types";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "",
  withCredentials: true,
});

/**
 * API: User
 */

export const postRegisterUser = (data: CreateUserParams) =>
  api.post("/auth/register", data);

export const postLoginUser = (data: UserCredentialsParams) =>
  api.post("/auth/login", data);

export const getAuthUser = () => api.get("/auth/status");

/**
 * API: Conversation
 */

export const getConversations = () =>
  api.get<ConversationType[]>("/conversations");

/**
 * API: Message
 */

export const getConversationMessages = (conversationId: number) =>
  api.get<MessageType[]>(`/messages/${conversationId}`);

export const postNewMessage = (data: CreateMessageParams) =>
  api.post("/messages", data);
