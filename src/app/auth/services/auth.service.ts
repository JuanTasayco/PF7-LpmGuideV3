import { Injectable, inject } from '@angular/core';
import { LoginUser, UserResponse } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment.development';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/admin/interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUrl = environment.url;
  private _currentUser?: User;

  registerUser() {}

  loginUser(userData: LoginUser): Observable<User | string> {
    return this.httpClient
      .post<UserResponse>(`${this.currentUrl}/auth/login`, userData)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('keyToken', token);
        }),
        catchError((responseError: HttpErrorResponse) =>
          of(responseError?.error?.message)
        )
      );
  }

  public get currentUser() {
    return this._currentUser;
  }

  verifyToken(): Observable<User | string> {
    const token = localStorage.getItem('keyToken') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .get<User>(`${this.currentUrl}/auth/verify`, { headers })
      .pipe(
        catchError((reponseError: HttpErrorResponse) =>
          of(reponseError.error.message)
        )
      );
  }

  httpClient: HttpClient = inject(HttpClient);
}
