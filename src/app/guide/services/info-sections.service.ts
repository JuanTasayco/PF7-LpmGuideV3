import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { Question, QuestionsData } from '../interfaces/question.interface';
import { Seccion } from '../interfaces/sections.interfaces';
@Injectable({
  providedIn: 'root',
})
export class InfoSectionsService {
  constructor(private http: HttpClient) {}

  private url: string = environment.url;

  public getSectionsName(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/lpm/sections/names/all`);
  }

  public getAllSections(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.url}/lpm`);
  }

  public getQuestions(): Observable<QuestionsData[]> {
    return this.http
      .get<Question>('assets/json/question.json')
      .pipe(map((result) => result.questions));
  }

  public getOnlyOneDataByTitle(title: string) {
    return this.http.get<Seccion>(`${this.url}/lpm/${title}`);
  }

  public getInfoPerSectionName(section: string): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.url}/lpm/sections/${section}`);
  }

  public getMultipleDataByMatch(title: string) {
    return this.http.get(`${this.url}/lpm/titles/${title}`);
  }
}
