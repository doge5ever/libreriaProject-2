import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private ROOT_URL = "http://localhost:8000/";

  constructor(
    private http: HttpClient
  ) { };

  postEmailSubscription = (emailAddress: string) => {
    return this.http.post(this.ROOT_URL + 'api/email-subscribe/', emailAddress);
  };
}
