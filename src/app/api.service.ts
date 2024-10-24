import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}
  getData(endpoint: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  postData(endpoint: string, data: unknown): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // Outros métodos HTTP conforme necessário
}
