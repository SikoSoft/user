import { html, LitElement, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { Input } from '@ss/ui/models';

import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';

import { theme } from './styles/theme';
import { api } from './lib/Api';
import { InputChangedEvent } from '@ss/ui/events/input-changed';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [theme];

  private api = api;

  @state()
  private username = '';

  @state()
  private password = '';

  private _handleUsernameChanged(e: InputChangedEvent) {
    this.username = e.detail.value;
  }

  private _handlePasswordChanged(e: InputChangedEvent) {
    this.password = e.detail.value;
  }

  private async _login() {
    this.api.post('login', {
      username: this.username,
      password: this.password,
    });
  }

  render() {
    return html`
      <div>
        <ss-input
          placeholder="Username"
          @input-changed=${this._handleUsernameChanged}
        ></ss-input>
        <ss-input
          placeholder="Password"
          type=${Input.InputType.PASSWORD}
          @input-changed=${this._handlePasswordChanged}
        ></ss-input>
        <ss-button @click=${this._login}>Login</ss-button>
      </div>
    `;
  }
}
