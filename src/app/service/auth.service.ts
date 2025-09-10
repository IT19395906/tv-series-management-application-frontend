import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `http://localhost:8080/api/auth/`;

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', { username: username, password: password });
  }
  
  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', { username: username, password: password, role: role });
  }
  
}
