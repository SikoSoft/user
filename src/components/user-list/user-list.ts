import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';
import '@/components/user-roles-form/user-roles-form';

import { theme } from '@/styles/theme';
import { Api, devApi, prodApi } from '@/lib/Api';
import { UsersResponseBody } from '@/models/Identity';

import {
  User,
  UserListProp,
  UserListProps,
  userListProps,
} from './user-list.models';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

@customElement('user-list')
export class UserList extends LitElement {
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
  [UserListProp.ENV]: UserListProps[UserListProp.ENV] =
    userListProps[UserListProp.ENV].default;

  @state() loading: boolean = false;
  @state() users: User[] = [];

  get api(): Api {
    return this[UserListProp.ENV] === 'prod' ? prodApi : devApi;
  }

  get classes(): Record<string, boolean> {
    return {
      'user-list': true,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.getUsers();
  }

  async getUsers(): Promise<void> {
    const result = await this.api.get<UsersResponseBody>('user');

    console.log('API response for users:', result);

    if (result && result.response) {
      console.log('Users fetched successfully:', result.response);
      this.users = result.response;
    }
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        ${repeat(
          this.users,
          user => user.userId,
          user =>
            html`<user-roles-form
              userId=${user.userId}
              username=${user.username}
              .roles=${user.roles}
            ></user-roles-form>`,
        )}
      </div>
    `;
  }
}
