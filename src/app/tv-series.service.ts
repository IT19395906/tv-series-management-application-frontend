import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmitDto } from './model/dto.model';

export const environment = {
  production: false,
  apiBaseUrl: 'https://jsonplaceholder.typicode.com/posts'
};
@Injectable({
  providedIn: 'root'
})
export class TvSeriesService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiBaseUrl}/api/`;

  addTvSeriesData(submitDto: SubmitDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'add', submitDto);
  }
  
  getTvSeriesBySearch(searchDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getBySearch', searchDto);
  }
}
