import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@ss/ui/components/pop-up';
import '@ss/ui/components/ss-input';
import '@ss/ui/components/ss-button';
import '@ss/ui/components/ss-icon';
import '@ss/ui/components/notification-provider';
import '@/components/login-form/login-form';

import { NotificationProvider } from '@ss/ui/components/notification-provider';
import { NotificationType } from '@ss/ui/components/notification-provider.models';

import { theme } from './styles/theme';
import {
  UserLoggedInEvent,
  UserLoggedInFailedEvent,
  UserLoggedInProp,
} from './components/login-form/login-form.events';
import {
  userPortalHeadLinks,
  UserPortalProp,
  userPortalProps,
  UserPortalProps,
} from './user-portal.models';

@customElement('user-portal')
export class UserPortal extends LitElement {
  static styles = [
    theme,

    css`
      ss-icon {
        vertical-align: middle;
      }
    `,
  ];

  @property()
  [UserPortalProp.ENV]: UserPortalProps[UserPortalProp.ENV] =
    userPortalProps[UserPortalProp.ENV].default;

  @state() popUpIsOpen = false;

  @query('notification-provider') notificationProvider:
    | NotificationProvider
    | undefined;

  constructor() {
    super();
    this._injectGoogleFonts();
  }

  showLoginForm() {
    this.popUpIsOpen = true;
  }

  hideLoginForm() {
    this.popUpIsOpen = false;
  }

  private _notify(message: string, type: NotificationType) {
    console.log('_notify', message);
    if (this.notificationProvider) {
      console.log('found notification-provider; use it');
      this.notificationProvider.addNotification(message, type);
    }
  }

  private async _handleUserLoggedIn(e: UserLoggedInEvent) {
    Object.values(UserLoggedInProp).forEach(key => {
      sessionStorage.setItem(key, e.detail[key]);
    });
    this.hideLoginForm();
    this._notify('You are now logged in', NotificationType.SUCCESS);
  }

  private async _handleUserLoggedInFailed(e: UserLoggedInFailedEvent) {
    this._notify('Failed to log in', NotificationType.ERROR);
  }

  private _togglePopUp() {
    this.popUpIsOpen = !this.popUpIsOpen;
  }

  private _injectGoogleFonts() {
    userPortalHeadLinks.forEach(link => {
      const el = document.createElement('link');
      el.rel = link.rel;
      el.href = link.href;
      if (link.crossorigin) {
        el.crossOrigin = link.crossorigin;
      }
      document.head.appendChild(el);
    });
  }

  render() {
    return html`
      <div class="user-portal">
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form
            env=${this.env}
            @user-logged-in=${this._handleUserLoggedIn}
            @user-logged-in-failed=${this._handleUserLoggedInFailed}
          ></login-form>
        </pop-up>
        ${import.meta.env.MODE === 'development' &&
        html`
          <notification-provider messageLife="3000"></notification-provider>
          <ss-button @click=${this._togglePopUp}>
            <ss-icon name="profile" size="24" color="#444"></ss-icon>
            Login</ss-button
          >
        `}
      </div>
    `;
  }
}
