import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum LoginFormProp {
  ENV = 'env',
}

export interface LoginFormProps extends PropTypes {
  [LoginFormProp.ENV]: ApiEnv;
}

export const loginFormProps: PropConfigMap<LoginFormProps> = {
  [LoginFormProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
};
