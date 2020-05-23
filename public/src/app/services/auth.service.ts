import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(
    private cookieService: CookieService
  ) {
    this.isLoggedIn = this.checkifLoggedIn();
  }

  checkifLoggedIn = (): boolean => {
    if (this.cookieService.get('session')) {
      var current = new Date();
      var currentDate = Date.parse(current.toString());
      var cookieExpirationDate = Date.parse(this.cookieService.get('session'));
      if (cookieExpirationDate > currentDate) return true;
      return false;
    }
    return false;
  }

  storeSessionCookie = (cookie): void => {
    this.cookieService.set(
      cookie.name,
      cookie.value,
      cookie.expires,
      cookie.path,
      cookie.domain,
      cookie.secure,
      cookie.sameSite
    );
  }
}
