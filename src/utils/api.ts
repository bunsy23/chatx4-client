import {
  ConversationType,
  CreateMessageParams,
  CreateUserParams,
  MessageType,
  User,
  UserCredentialsParams,
} from "./types";
import axios, { AxiosRequestConfig } from "axios";

let VITE_API_URL = "";
if (import.meta.env.MODE == "development") {
  VITE_API_URL = import.meta.env.VITE_API_URL;
}

const config: AxiosRequestConfig = {
  withCredentials: true, // send request to the server with cookies
};

export const postRegisterUser = (data: CreateUserParams) => {
  axios.post(`${VITE_API_URL}/auth/register`, data, config);
};

export const postLoginUser = (data: UserCredentialsParams) => {
  return axios.post(`${VITE_API_URL}/auth/login`, data, config);
};

export const getAuthUser = () =>
  axios.get<User>(`${VITE_API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<ConversationType[]>(`${VITE_API_URL}/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
  axios.get<MessageType[]>(
    `${VITE_API_URL}/messages/${conversationId}`,
    config
  );

export const postNewMessage = (data: CreateMessageParams) =>
  axios.post(`${VITE_API_URL}/messages`, data, config);
