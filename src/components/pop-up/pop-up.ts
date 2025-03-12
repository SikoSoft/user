import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { theme } from '@/styles/theme';
import { PopUpProp, PopUpProps, popUpProps } from './pop-up.models';
import { classMap } from 'lit/directives/class-map.js';

@customElement('pop-up')
export class PopUp extends LitElement {
  static styles = [
    theme,
    css`
      .pop-up {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;
        padding: 3rem;
        box-sizing: border-box;
        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

        &.open {
          display: block;
        }
      }
    `,
  ];

  @property({ type: Boolean })
  [PopUpProp.OPEN]: PopUpProps[PopUpProp.OPEN] =
    popUpProps[PopUpProp.OPEN].default;

  @state()
  get classes() {
    return {
      'pop-up': true,
      open: this.open,
    };
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <slot></slot>
      </div>
    `;
  }
}
