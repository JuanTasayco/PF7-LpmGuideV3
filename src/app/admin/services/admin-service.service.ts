import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
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

  constructor(private http: HttpClient) {}
}
