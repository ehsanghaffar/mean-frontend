export interface User {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  expiresIn?: number;
  confirmPassword?: string;
  articles?: UserArticle[];
}


export interface UserArticle {
  id?: string;
  title?: string;
  description?: string;
  auther?: string;
}