export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponseBody {
  authToken: string;
  userId: string;
  username: string;
}
