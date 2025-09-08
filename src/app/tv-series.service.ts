import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchDto, SubmitDto } from './model/dto.model';

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};
@Injectable({
  providedIn: 'root'
})
export class TvSeriesService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiBaseUrl}/api/tvseries/`;

  addTvSeriesData(submitDto: SubmitDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'add', submitDto);
  }

  getTvSeriesBySearch(searchDto: SearchDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getBySearch', searchDto);
  }

  deleteTvSeries(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'delete/' + id);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<string[]>(this.apiUrl + 'categories');
  }

  getAllLanguages(): Observable<any> {
    return this.http.get<string[]>(this.apiUrl + 'languages');
  }

  getAllTvSeries(page: number, size: number): Observable<any> {
    const params = {page: page, size: size};
    return this.http.get<any>(this.apiUrl + 'getAll', {params});
  }
}
