import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { theme } from '@/styles/theme';
import { PopUpProp, PopUpProps, popUpProps } from './pop-up.models';
import { classMap } from 'lit/directives/class-map.js';
import { PopUpClosedEvent } from './pop-up.events';

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

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .inner {
          padding: 3rem;
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          .close-button {
            position: absolute;
            top: 0rem;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    `,
  ];

  @property({ type: Boolean })
  [PopUpProp.OPEN]: PopUpProps[PopUpProp.OPEN] =
    popUpProps[PopUpProp.OPEN].default;

  @property({ type: Boolean })
  [PopUpProp.CLOSE_BUTTON]: PopUpProps[PopUpProp.CLOSE_BUTTON] =
    popUpProps[PopUpProp.CLOSE_BUTTON].default;

  @property({ type: Boolean })
  [PopUpProp.CLOSE_ON_OUTSIDE_CLICK]: PopUpProps[PopUpProp.CLOSE_ON_OUTSIDE_CLICK] =
    popUpProps[PopUpProp.CLOSE_ON_OUTSIDE_CLICK].default;

  @property({ type: Boolean })
  [PopUpProp.CLOSE_ON_ESC]: PopUpProps[PopUpProp.CLOSE_ON_ESC] =
    popUpProps[PopUpProp.CLOSE_ON_ESC].default;

  @state()
  newlyOpened = false;

  @state()
  get classes() {
    return {
      'pop-up': true,
      open: this.open,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('click', this._handleClickOutside);
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has(PopUpProp.OPEN)) {
      if (this[PopUpProp.OPEN]) {
        this.newlyOpened = true;
        setTimeout(() => {
          this.newlyOpened = false;
        }, 100);
      } else {
        this.newlyOpened = false;
      }
    }
  }

  private _handleClickOutside = (e: MouseEvent) => {
    if (
      !this.newlyOpened &&
      this[PopUpProp.CLOSE_ON_OUTSIDE_CLICK] &&
      this[PopUpProp.OPEN] &&
      this.shadowRoot &&
      !this.shadowRoot.contains(e.target as Node)
    ) {
      this.dispatchEvent(new PopUpClosedEvent({}));
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this[PopUpProp.CLOSE_ON_ESC] && e.key === 'Escape') {
      this.dispatchEvent(new PopUpClosedEvent({}));
    }
  };

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="inner">
          ${this[PopUpProp.CLOSE_BUTTON]
            ? html`
                <div
                  class="close-button"
                  @click=${() => {
                    this.dispatchEvent(new PopUpClosedEvent({}));
                  }}
                >
                  &#215;
                </div>
              `
            : nothing}
          <slot></slot>
        </div>
      </div>
    `;
  }
}
