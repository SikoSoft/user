import { PropConfigMap, PropTypes } from '@/models/Prop';

export enum PopUpProp {
  OPEN = 'open',
}

export interface PopUpProps extends PropTypes {
  [PopUpProp.OPEN]: boolean;
}

export const popUpProps: PropConfigMap<PopUpProps> = {
  [PopUpProp.OPEN]: {
    default: false,
    control: 'boolean',
    description: 'Whether the pop-up is open or not',
  },
};
