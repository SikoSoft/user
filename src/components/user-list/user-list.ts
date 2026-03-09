import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { theme } from '@/styles/theme';
import { Api, devApi, prodApi } from '@/lib/Api';
import {
  RolesRequestBody,
  RolesResponseBody,
  UsersResponseBody,
} from '@/models/Identity';

import { UserListProp, UserListProps, userListProps } from './user-list.models';

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
  @state() roles: string[] = [];

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

  private async save(): Promise<void> {
    this.loading = true;
    const result = await this.api.post<RolesRequestBody, RolesResponseBody>(
      'roles',
      { roles: this.roles },
    );

    this.loading = false;
  }

  async getUsers(): Promise<void> {
    const result = await this.api.get<UsersResponseBody>('user');
  }

  render() {
    return html` <div class=${this.classes}>users</div> `;
  }
}
