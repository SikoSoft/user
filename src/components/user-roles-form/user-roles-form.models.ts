import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum UserRolesFormProp {
  ENV = 'env',
}

export interface UserRolesFormProps extends PropTypes {
  [UserRolesFormProp.ENV]: ApiEnv;
}

export const userRolesFormProps: PropConfigMap<UserRolesFormProps> = {
  [UserRolesFormProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
};
