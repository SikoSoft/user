import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum UserRolesFormProp {
  ENV = 'env',
  USER_ID = 'userId',
  USERNAME = 'username',
  ROLES = 'roles',
}

export interface UserRolesFormProps extends PropTypes {
  [UserRolesFormProp.ENV]: ApiEnv;
  [UserRolesFormProp.USER_ID]: string;
  [UserRolesFormProp.USERNAME]: string;
  [UserRolesFormProp.ROLES]: string[];
}

export const userRolesFormProps: PropConfigMap<UserRolesFormProps> = {
  [UserRolesFormProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
  [UserRolesFormProp.USER_ID]: {
    default: '',
    control: 'text',
    description: 'The ID of the user to edit roles for',
  },
  [UserRolesFormProp.USERNAME]: {
    default: '',
    control: 'text',
    description: 'The name of the user to edit roles for',
  },
  [UserRolesFormProp.ROLES]: {
    default: [],
    control: 'text',
    description: 'The roles assigned to the user',
  },
};
