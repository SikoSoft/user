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
import { repeat } from 'lit/directives/repeat.js';

import '@ss/ui/components/tag-manager';

import { TagsUpdatedEvent } from '@ss/ui/components/tag-manager.events';

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

  @property({ type: Array, reflect: true })
  [UserRolesFormProp.ROLES]: UserRolesFormProps[UserRolesFormProp.ROLES] =
    userRolesFormProps[UserRolesFormProp.ROLES].default;

  @property()
  [UserRolesFormProp.ENV]: UserRolesFormProps[UserRolesFormProp.ENV] =
    userRolesFormProps[UserRolesFormProp.ENV].default;

  @property()
  [UserRolesFormProp.USERNAME]: UserRolesFormProps[UserRolesFormProp.USERNAME] =
    userRolesFormProps[UserRolesFormProp.USERNAME].default;

  @state() loading: boolean = false;
  @state() roleSuggestions: string[] = [];

  get tagSuggestionsEnabled(): boolean {
    return this.roleSuggestions.length > 0;
  }

  get api(): Api {
    return this[UserRolesFormProp.ENV] === 'prod' ? prodApi : devApi;
  }

  updateRoles(roles: string[]): void {
    console.log('Updating roles:', roles);
    this[UserRolesFormProp.ROLES] = roles;
  }

  async handleRoleSuggestionsRequested(): Promise<void> {
    console.log('Role suggestions requested');

    // Simulate fetching role suggestions from the API
    setTimeout(() => {
      this.roleSuggestions = ['Admin', 'Editor', 'Viewer'];
      console.log('Role suggestions updated:', this.roleSuggestions);
    }, 1000);
  }

  private async save(): Promise<void> {
    this.loading = true;
    const result = await this.api.put<RolesRequestBody, RolesResponseBody>(
      'user',
      { userId: this[UserRolesFormProp.USER_ID], roles: this.roles },
    );

    this.loading = false;
  }

  render() {
    return html`
      <form>
        <span class="username">${this[UserRolesFormProp.USERNAME]}</span>

        <tag-manager
          label=${msg('Roles')}
          ?enableSuggestions=${this.tagSuggestionsEnabled}
          @tags-updated=${(e: TagsUpdatedEvent): void => {
            this.updateRoles(e.detail.tags);
          }}
          @tag-suggestions-requested=${this.handleRoleSuggestionsRequested}
        >
          <div slot="tags">
            ${repeat(
              this.roles,
              role => role,
              role => html`<data-item>${role}</data-item>`,
            )}
          </div>

          <div slot="suggestions">
            ${repeat(
              this.roleSuggestions,
              suggestion => suggestion,
              suggestion => html`<data-item>${suggestion}</data-item>`,
            )}
          </div>
        </tag-manager>

        <ss-button
          @click=${this.save}
          text=${msg('Save')}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `;
  }
}
