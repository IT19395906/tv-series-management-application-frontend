import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchDto, SubmitDto } from '../model/dto.model';

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
    const token = localStorage.getItem('jwtToken'); //    comment this line if jwt authentication is not required
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); //    comment this line if jwt authentication is not required
    return this.http.post<any>(this.apiUrl + 'add', submitDto, { headers });
  }

  getTvSeriesBySearch(searchDto: SearchDto): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl + 'getBySearch', searchDto, { headers });
  }

  deleteTvSeries(id: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(this.apiUrl + 'delete/' + id, { headers });
  }

  getAllCategories(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(this.apiUrl + 'categories', { headers });
  }

  getAllLanguages(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(this.apiUrl + 'languages', { headers });
  }

  getAllYears(): Observable<any> {
    return this.http.get<string[]>(this.apiUrl + 'years');
  }

  getAllTvSeries(page: number, size: number): Observable<any> {
    const params = { page: page, size: size };
    return this.http.get<any>(this.apiUrl + 'getAll', { params });
  }
  
  updateTvSeriesData(updateDto: SubmitDto, id:number):Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.apiUrl + 'update/' + id, updateDto, {headers});
  }
  
  search(keyword:string): Observable<any> {
    const params = { keyword: keyword};
    return this.http.get<any>(this.apiUrl + 'search', {params});
  }

  latestReleased(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'latest');
  }
}
