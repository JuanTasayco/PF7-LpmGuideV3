import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private currentUrl: string = environment.url;
  updateSection(sectionChanges: any): Observable<Seccion> {
    return this.http.patch<Seccion>(
      `${this.currentUrl}/lpm/section/`,
      sectionChanges
    );
  }

  createSection(section: Seccion): Observable<Seccion> {
    return this.http.post<Seccion>(`${this.currentUrl}/lpm/`, section);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.currentUrl}/auth/all`);
  }

  getUserById(id: string): Observable<User> {
    /* remember that id must be uuid */
    return this.http.get<User>(`${this.currentUrl}/auth/user/${id}`);
  }

  createUser(body: any) {
    return this.http.post<User>(`${this.currentUrl}/auth/register`, body);
  }

  updateUser(changes: any, id: string): Observable<User> {
    return this.http.put<User>(`${this.currentUrl}/updateUser/${id}`, changes);
  }

  constructor(private http: HttpClient) {}
}
