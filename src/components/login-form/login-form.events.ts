export const userLoggedInEventName = 'user-logged-in';

export enum UserLoggedInProp {
  USER_ID = 'userId',
  USERNAME = 'username',
  AUTH_TOKEN = 'authToken',
}

export interface UserLoggedInEventPayload {
  [UserLoggedInProp.USER_ID]: string;
  [UserLoggedInProp.USERNAME]: string;
  [UserLoggedInProp.AUTH_TOKEN]: string;
}

export class UserLoggedInEvent extends CustomEvent<UserLoggedInEventPayload> {
  constructor(payload: UserLoggedInEventPayload) {
    super(userLoggedInEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}

export const userLoggedInFailedEventName = 'user-logged-in-failed';

export type UserLoggedInFailedEventPayload = Record<string, never>;

export class UserLoggedInFailedEvent extends CustomEvent<UserLoggedInFailedEventPayload> {
  constructor(payload: UserLoggedInFailedEventPayload) {
    super(userLoggedInFailedEventName, {
      bubbles: true,
      composed: true,
      detail: payload,
    });
  }
}
