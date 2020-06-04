import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(
    private http: HttpClient
  ) { };

  postEmailSubscription = (emailAddress: string) => {
    return this.http.post(environment.ROOT_URL + 'api/email-subscribe/', emailAddress);
  };
 
  isEmailAddressDuplicate = (emailAddress: string) => {
    return this.http.get(environment.ROOT_URL + `api/duplicate-email/:${emailAddress}`);
  };
}
