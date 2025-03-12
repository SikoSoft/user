import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';
import '@/components/login-form/login-form';
import '@/components/pop-up/pop-up';

import { theme } from './styles/theme';
import {
  UserLoggedInEvent,
  UserLoggedInProp,
} from './components/login-form/login-form.events';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [theme];

  @state() popUpIsOpen = false;

  private async _handleUserLoggedIn(e: UserLoggedInEvent) {
    Object.values(UserLoggedInProp).forEach(key => {
      sessionStorage.setItem(key, e.detail[key]);
    });
  }

  private _togglePopUp() {
    this.popUpIsOpen = !this.popUpIsOpen;
  }

  render() {
    return html`
      <div>
        <pop-up ?open=${this.popUpIsOpen}>
          <login-form @user-logged-in=${this._handleUserLoggedIn}></login-form>
        </pop-up>

        <ss-button @click=${this._togglePopUp}>Show login form</ss-button>
      </div>
    `;
  }
}
