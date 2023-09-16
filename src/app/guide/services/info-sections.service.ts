import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InfoSectionsService {
  private url: string = environment.url;
  public getSections(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/lpm/sections/all`);
  }

  constructor(private http: HttpClient) {}
}
