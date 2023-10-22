import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private currentUrl: string = environment.url;
  private _currentSection = signal<Seccion | null>(null);
  private _currentUser = signal<User | null>(null);

  public currentError = signal<string>('');
  public currentSection = computed(() => this._currentSection());
  public currentUser = computed(() => this._currentUser());

  createSection(section: Seccion): Observable<boolean> {
    return this.http.post<Seccion>(`${this.currentUrl}/lpm/`, section).pipe(
      map(() => true),
      catchError((respError) => {
        this.currentError.update(() => respError?.error?.message);
        return of(false);
      })
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

  createUser(body: any): Observable<boolean> {
    return this.http.post<User>(`${this.currentUrl}/auth/register`, body).pipe(
      map(() => true),
      catchError((respError) => {
        this.currentError.update(() => respError?.error?.message);
        return of(false);
      })
    );
  }

  updateUser(id: string, changes: any): Observable<boolean> {
    return this.http
      .post<User>(`${this.currentUrl}/auth/updateUser/${id}`, changes)
      .pipe(
        map((resp: User) => {
          this._currentUser.set(<User>resp);
          return true;
        }),
        catchError((respError) => {
          console.log(respError);
          this.currentError.update(() => respError?.error?.message);
          return of(false);
        })
      );
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.currentUrl}/auth/users/${name}`);
  }

  constructor(private http: HttpClient) {}
}
