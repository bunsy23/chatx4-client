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

export type ConversationType = {
  id: number;
  creator: User;
  recipient: User;
  // createdAt: Date;
  createdAt: string;
};

export type MessageType = {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
};

export type MessageEventPayload = {
  id: number;
  createdAt: Date;
  conversation: ConversationType;
  author: User;
  content: string;
};

export type CreateMessageParams = {
  conversationId: number;
  content: string;
};

// export type CreateConversationParams = {
//   recipient: string;
// };

export type MessageContentParam = {
  content: string;
};
