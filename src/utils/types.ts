export type Conversation = { id: string; name: string; lastMessage: string };

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
