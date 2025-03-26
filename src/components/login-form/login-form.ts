import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { InputChangedEvent } from '@ss/ui/events/input-changed';
import { InputSubmittedEvent } from '@ss/ui/events/input-submitted';
import {
  UserLoggedInEvent,
  UserLoggedInFailedEvent,
} from './login-form.events';

import { theme } from '@/styles/theme';
import { Api, devApi, prodApi } from '@/lib/Api';
import { LoginRequestBody, LoginResponseBody } from '@/models/Identity';
import {
  LoginFormProp,
  loginFormProps,
  LoginFormProps,
} from './login-form.models';

@customElement('login-form')
export class LoginForm extends LitElement {
  static styles = [
    theme,
    css`
      form {
        ss-input,
        ss-button {
          display: block;
          margin: 0.5rem 0;
        }
      }
    `,
  ];

  @property()
  [LoginFormProp.ENV]: LoginFormProps[LoginFormProp.ENV] =
    loginFormProps[LoginFormProp.ENV].default;

  @state() username: string = '';
  @state() password: string = '';
  @state() loading: boolean = false;

  get api(): Api {
    return this[LoginFormProp.ENV] === 'prod' ? prodApi : devApi;
  }

  private _handleUsernameChanged(e: InputChangedEvent): void {
    this.username = e.detail.value;
  }

  private _handleUsernameSubmitted(e: InputSubmittedEvent): void {
    this._login();
  }

  private _handlePasswordChanged(e: InputChangedEvent): void {
    this.password = e.detail.value;
  }

  private _handlePasswordSubmitted(e: InputSubmittedEvent): void {
    this._login();
  }

  private async _login(): Promise<void> {
    this.loading = true;
    const result = await this.api.post<LoginRequestBody, LoginResponseBody>(
      'login',
      { username: this.username, password: this.password },
    );

    if (result && result.status !== 401) {
      this.dispatchEvent(new UserLoggedInEvent({ ...result.response }));
    }

    if (result && result.status === 401) {
      this.dispatchEvent(new UserLoggedInFailedEvent({}));
    }

    this.loading = false;
  }

  render() {
    return html`
      <form part="container">
        <ss-input
          id="username"
          placeholder=${msg('Username')}
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${msg('Password')}
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this._login}
          text=${msg('Login')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
