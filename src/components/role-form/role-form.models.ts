import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum RoleFormProp {
  ENV = 'env',
}

export interface RoleFormProps extends PropTypes {
  [RoleFormProp.ENV]: ApiEnv;
}

export const roleFormProps: PropConfigMap<RoleFormProps> = {
  [RoleFormProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
};
