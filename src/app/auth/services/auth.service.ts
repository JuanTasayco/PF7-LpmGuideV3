import { Injectable, computed, inject, signal } from '@angular/core';
import { LoginUser, UserResponse } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment.development';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from 'src/app/admin/interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUrl = environment.url;
  private _currentUser = signal<User | null>(null);
  public currentUser = computed(() => this._currentUser);

  currentErrorMsg = signal<string>('');

  registerUser() {}

  loginUser(userData: LoginUser): Observable<boolean> {
    return this.httpClient
      .post<UserResponse>(`${this.currentUrl}/auth/login`, userData)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('keyToken', token);
        }),
        map(() => true),
        catchError((responseError: HttpErrorResponse) => {
          this.currentErrorMsg.update(() => responseError.error?.message);
          return of(false);
        })
      );
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('keyToken') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .get<User>(`${this.currentUrl}/auth/verify`, { headers })
      .pipe(
        tap((response) => {
          this._currentUser.set(response);
        }),
        map(() => true),
        catchError((reponseError: HttpErrorResponse) => {
          this.currentErrorMsg.update(() => reponseError.error?.message);
          return of(false);
        })
      );
  }

  httpClient: HttpClient = inject(HttpClient);
}
