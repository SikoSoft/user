import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@ss/ui/components/pop-up';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';
import '@/components/login-form/login-form';

import { theme } from './styles/theme';
import {
  UserLoggedInEvent,
  UserLoggedInProp,
} from './components/login-form/login-form.events';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [theme];

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
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href =
      'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);
  }

  render() {
    return html`
      <div>
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form @user-logged-in=${this._handleUserLoggedIn}></login-form>
        </pop-up>
        ${import.meta.env.MODE === 'development' &&
        html` <ss-button @click=${this._togglePopUp}>Login</ss-button> `}
      </div>
    `;
  }
}
