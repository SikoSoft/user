import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@ss/ui/components/pop-up';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-icon';
import '@/components/login-form/login-form';

import { theme } from './styles/theme';
import {
  UserLoggedInEvent,
  UserLoggedInProp,
} from './components/login-form/login-form.events';
import {
  userPortalHeadLinks,
  UserPortalProp,
  userPortalProps,
  UserPortalProps,
} from './user-portal.models';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [
    theme,

    css`
      ss-icon {
        vertical-align: middle;
      }
    `,
  ];

  @property()
  [UserPortalProp.ENV]: UserPortalProps[UserPortalProp.ENV] =
    userPortalProps[UserPortalProp.ENV].default;

  @state() popUpIsOpen = false;

  constructor() {
    super();
    this._injectGoogleFonts();
  }

  showLoginForm() {
    this.popUpIsOpen = true;
  }

  hideLoginForm() {
    this.popUpIsOpen = false;
  }

  private async _handleUserLoggedIn(e: UserLoggedInEvent) {
    Object.values(UserLoggedInProp).forEach(key => {
      sessionStorage.setItem(key, e.detail[key]);
    });
    this.hideLoginForm();
  }

  private _togglePopUp() {
    this.popUpIsOpen = !this.popUpIsOpen;
  }

  private _injectGoogleFonts() {
    userPortalHeadLinks.forEach(link => {
      const el = document.createElement('link');
      el.rel = link.rel;
      el.href = link.href;
      if (link.crossorigin) {
        el.crossOrigin = link.crossorigin;
      }
      document.head.appendChild(el);
    });
  }

  render() {
    return html`
      <div class="user-portal">
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form
            env=${this.env}
            @user-logged-in=${this._handleUserLoggedIn}
          ></login-form>
        </pop-up>
        ${import.meta.env.MODE === 'development' &&
        html`
          <ss-button @click=${this._togglePopUp}>
            <ss-icon name="profile" size="24" color="#444"></ss-icon>
            Login</ss-button
          >
        `}
      </div>
    `;
  }
}
