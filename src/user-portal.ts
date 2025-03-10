import { html, LitElement, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { theme } from './styles/theme';
import { api } from './lib/Api';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [theme];

  render() {
    return html` <div>User portal</div> `;
  }
}
