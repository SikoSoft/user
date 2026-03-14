export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponseBody {
  authToken: string;
  userId: string;
  username: string;
}

export interface RolesRequestBody {
  userId: string;
  roles: string[];
}

export type RolesResponseBody = Record<string, never>;

export type UsersResponseBody = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
}[];
