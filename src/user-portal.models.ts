import { ApiEnv, defaultEnv } from '@/models/Api';
import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum UserPortalProp {
  ENV = 'env',
}

export interface UserPortalProps extends PropTypes {
  [UserPortalProp.ENV]: ApiEnv;
}

export const userPortalProps: PropConfigMap<UserPortalProps> = {
  [UserPortalProp.ENV]: {
    default: defaultEnv,
    control: 'text',
    description: 'The environment to use for the API',
  },
};
