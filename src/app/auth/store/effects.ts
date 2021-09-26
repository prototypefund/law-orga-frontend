import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  TRY_RELOAD_STATIC_INFORMATION,
  SET_TOKEN,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGOUT,
  ReloadStaticInformation,
  SetToken,
  SetUsersPrivateKey,
} from './actions';

import { DjangoError } from 'src/app/shared/services/axios';
import {
  FORGOT_PASSWORD_API_URL,
  GetResetPasswordApiUrl,
  GetStaticsApiUrl,
  LOGIN_API_URL,
  LOGOUT_API_URL,
} from 'src/app/statics/api_urls.statics';
import { AppSandboxService } from 'src/app/core/services/app-sandbox.service';
import { SET_ALL_PERMISSIONS, SET_NOTIFICATIONS, SET_RLC, SET_USER, SET_USER_PERMISSIONS } from 'src/app/core/store/core.actions';
import { LOGIN_FRONT_URL } from 'src/app/statics/frontend_links.statics';
import { Permission } from 'src/app/core/models/permission.model';
import { Rlc } from 'src/app/core/models/rlc.model';
import { IUser } from 'src/app/core/models/user.model';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private http: HttpClient, private router: Router, private appSB: AppSandboxService) {}

  login = createEffect(() =>
    this.actions.pipe(
      ofType(LOGIN),
      mergeMap((payload) =>
        this.http.post(LOGIN_API_URL, payload).pipe(
          mergeMap((response: { token: string; users_private_key: string }) => {
            this.appSB.saveTokenAndUsersPrivateKey(response.token, response.users_private_key);
            void this.router.navigate(['/dashboard/']);

            return [
              SetToken({ token: response.token }),
              SetUsersPrivateKey({ privateKey: response.users_private_key }),
              ReloadStaticInformation({ token: response.token }),
            ];
          }),
          catchError((error: HttpErrorResponse) => {
            const djangoError = error.error as DjangoError;
            this.appSB.showErrorSnackBar(djangoError.non_field_errors[0], 5000);
            return [];
          })
        )
      )
    )
  );

  reload = createEffect(() =>
    this.actions.pipe(
      ofType(TRY_RELOAD_STATIC_INFORMATION),
      mergeMap((payload: { token: string }) =>
        this.http.get(GetStaticsApiUrl(payload.token)).pipe(
          switchMap(
            (response: { user: IUser; rlc: Rlc; all_permissions: Permission[]; permissions: string[]; notifications: Notification[] }) => {
              return [
                {
                  type: SET_USER,
                  payload: response.user,
                },
                {
                  type: SET_RLC,
                  payload: response.rlc,
                },
                {
                  type: SET_ALL_PERMISSIONS,
                  payload: response.all_permissions,
                },
                {
                  type: SET_USER_PERMISSIONS,
                  payload: response.permissions,
                },
                {
                  type: SET_NOTIFICATIONS,
                  payload: response.notifications,
                },
              ];
            }
          ),
          catchError(() => {
            return [];
          })
        )
      )
    )
  );

  setToken = createEffect(() =>
    this.actions.pipe(
      ofType(SET_TOKEN),
      mergeMap(() => {
        return [];
      })
    )
  );

  forgotPassword = createEffect(() =>
    this.actions.pipe(
      ofType(FORGOT_PASSWORD),
      mergeMap((payload: { email: string }) =>
        this.http.post(FORGOT_PASSWORD_API_URL, { email: payload.email }).pipe(
          catchError((error) => {
            this.appSB.showErrorSnackBar(error.error.detail);
            return [];
          }),
          mergeMap((response) => {
            this.appSB.showSuccessSnackBar('a reactivation email was sent to the given email address');
            void this.router.navigate([LOGIN_FRONT_URL]);
            return [];
          })
        )
      )
    )
  );

  resetPassword = createEffect(() =>
    this.actions.pipe(
      ofType(RESET_PASSWORD),
      mergeMap((payload: { newPassword: string; userId: number; token: string }) =>
        this.http
          .post(GetResetPasswordApiUrl(payload.userId), {
            new_password: payload.newPassword,
            token: payload.token,
          })
          .pipe(
            catchError((error) => {
              this.appSB.showErrorSnackBar(error.error.detail);
              return [];
            }),
            mergeMap((response) => {
              this.appSB.showSuccessSnackBar('Your password was successfully reset. An admin needs to admit you back into the team, now.');
              void this.router.navigate([LOGIN_FRONT_URL]);
              return [];
            })
          )
      )
    )
  );

  logout = createEffect(() =>
    this.actions.pipe(
      ofType(LOGOUT),
      mergeMap(() =>
        this.http.post(LOGOUT_API_URL, {}).pipe(
          mergeMap(() => {
            this.appSB.resetTokenAndUsersPrivateKey();
            this.router.navigate([LOGIN_FRONT_URL]);
            return [];
          }),
          catchError((error) => {
            this.appSB.showErrorSnackBar(error.error.detail);
            return [];
          })
        )
      )
    )
  );
}