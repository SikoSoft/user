import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export enum UserListProp {
  ENV = 'env',
}

export interface UserListProps extends PropTypes {
  [UserListProp.ENV]: ApiEnv;
}

export const userListProps: PropConfigMap<UserListProps> = {
  [UserListProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
};
