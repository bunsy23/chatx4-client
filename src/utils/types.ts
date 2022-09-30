/**
 * Types related to User
 */

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = Pick<
  CreateUserParams,
  "email" | "password"
>;

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

/**
 * Types related to Conversation
 */

export type ConversationType = {
  id: number;
  creator: User;
  recipient: User;
  lastMessageSent?: MessageType;
  createdAt: string;
};

export type CreateConversationParams = {
  email: string;
  message: string;
};

/**
 * Types related to Message
 */

export type MessageType = {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
  conversation: ConversationType;
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: ConversationType;
};

export type CreateMessageParams = {
  conversationId: number;
  content: string;
};

export type MessageContentParam = {
  content: string;
};

export type ConversationMessage = { id: number; messages: MessageType[] };
