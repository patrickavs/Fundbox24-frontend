export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type RegisterUserCredentials = {
  date?: Date,
  name: string,
  email: string,
  password: string,
  passwordRepeat: string,
}