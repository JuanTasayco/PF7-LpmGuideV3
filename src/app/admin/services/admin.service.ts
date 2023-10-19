import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private currentUrl: string = environment.url;

  createSection(section: Seccion): Observable<string> {
    return this.http.post<Seccion>(`${this.currentUrl}/lpm/`, section).pipe(
      map((response) => 'AgregadoCorrectamente'),
      catchError((responseError: HttpErrorResponse) =>
        of(responseError.error.message)
      )
    );
  }

  updateSection(id: string, sectionChanges: any): Observable<Seccion> {
    return this.http.patch<Seccion>(
      `${this.currentUrl}/lpm/section/${id}`,
      sectionChanges
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.currentUrl}/auth/all`);
  }

  getUserById(id: string): Observable<User> {
    /* remember that id must be uuid */
    return this.http.get<User>(`${this.currentUrl}/auth/user/${id}`);
  }

  createUser(body: any) {
    return this.http
      .post<User>(`${this.currentUrl}/auth/register`, body)
      .pipe(
        catchError((response: HttpErrorResponse) => of(response.error.message))
      );
  }

  updateUser(id: string, changes: any): Observable<User> {
    return this.http.post<User>(
      `${this.currentUrl}/auth/updateUser/${id}`,
      changes
    );
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.currentUrl}/auth/users/${name}`);
  }

  constructor(private http: HttpClient) {}
}
