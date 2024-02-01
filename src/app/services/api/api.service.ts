import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/dataList.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private url = 'https://www.amiiboapi.com/api/amiibo/';

  constructor(private http: HttpClient) {}

  getRepoIssues(page: number = 0): Observable<ApiResponse> {
    const requestUrl = `${this.url}`;
    return this.http.get<ApiResponse>(requestUrl);
  }
  
}
