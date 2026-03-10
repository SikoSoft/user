import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { theme } from '@/styles/theme';
import { Api, devApi, prodApi } from '@/lib/Api';
import { RolesRequestBody, RolesResponseBody } from '@/models/Identity';

import {
  UserRolesFormProp,
  UserRolesFormProps,
  userRolesFormProps,
} from './user-roles-form.models';

@customElement('user-roles-form')
export class UserRolesForm extends LitElement {
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
  [UserRolesFormProp.USER_ID]: UserRolesFormProps[UserRolesFormProp.USER_ID] =
    userRolesFormProps[UserRolesFormProp.USER_ID].default;

  @property({ type: Array })
  [UserRolesFormProp.ROLES]: UserRolesFormProps[UserRolesFormProp.ROLES] =
    userRolesFormProps[UserRolesFormProp.ROLES].default;

  @property()
  [UserRolesFormProp.ENV]: UserRolesFormProps[UserRolesFormProp.ENV] =
    userRolesFormProps[UserRolesFormProp.ENV].default;

  @property()
  [UserRolesFormProp.USERNAME]: UserRolesFormProps[UserRolesFormProp.USERNAME] =
    userRolesFormProps[UserRolesFormProp.USERNAME].default;

  @state() loading: boolean = false;

  get api(): Api {
    return this[UserRolesFormProp.ENV] === 'prod' ? prodApi : devApi;
  }

  private async save(): Promise<void> {
    this.loading = true;
    const result = await this.api.post<RolesRequestBody, RolesResponseBody>(
      'roles',
      { roles: this.roles },
    );

    this.loading = false;
  }

  render() {
    return html`
      <form>
        <span class="username">${this[UserRolesFormProp.USERNAME]}</span>

        <ss-button
          @click=${this.save}
          text=${msg('Save')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
