import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ApiResponse} from "../models/response/api-response";


const AUTH_API = environment.baseUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  constructor(protected http: HttpClient) {}

  abstract getUri(): string;

  // delete T by Id
  delete(id: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(
      AUTH_API + this.getUri() + '/' + id,
      httpOptions
    );
  }

  edit(id: string, t: T): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(
      AUTH_API + this.getUri() + '/' + id,
      t
    );
  }
}
