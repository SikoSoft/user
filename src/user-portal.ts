import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';
import '@/components/login-form/login-form';

import { theme } from './styles/theme';
import {
  UserLoggedInEvent,
  UserLoggedInEventPayload,
  UserLoggedInProp,
} from './components/login-form/login-form.events';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [theme];

  private async _handleUserLoggedIn(e: UserLoggedInEvent) {
    Object.values(UserLoggedInProp).forEach(key => {
      sessionStorage.setItem(key, e.detail[key]);
    });
  }

  render() {
    return html`
      <div>
        <login-form @user-logged-in=${this._handleUserLoggedIn}></login-form>
      </div>
    `;
  }
}
