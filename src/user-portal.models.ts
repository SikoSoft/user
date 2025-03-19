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

export interface userPortalHeadLink {
  rel: string;
  href: string;
  crossorigin?: string;
}

export const userPortalHeadLinks: userPortalHeadLink[] = [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossorigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  },
];
