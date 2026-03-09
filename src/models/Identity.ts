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
  roles: string[];
}

export type RolesResponseBody = Record<string, never>;

export interface UsersResponseBody {
  users: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
  }[];
}
