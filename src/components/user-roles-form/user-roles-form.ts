import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-select';

import { theme } from '@/styles/theme';
import { Api, devApi, prodApi } from '@/lib/Api';
import { RolesRequestBody, RolesResponseBody } from '@/models/Identity';

import { RoleFormProp, RoleFormProps, roleFormProps } from './role-form.models';

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
  [RoleFormProp.ENV]: RoleFormProps[RoleFormProp.ENV] =
    roleFormProps[RoleFormProp.ENV].default;

  @state() loading: boolean = false;
  @state() roles: string[] = [];

  get api(): Api {
    return this[RoleFormProp.ENV] === 'prod' ? prodApi : devApi;
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
        <ss-button
          @click=${this.save}
          text=${msg('Save')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
