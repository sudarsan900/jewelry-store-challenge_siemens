import { Injectable } from '@angular/core';
import { ILoginResponseModel } from '../models/login-response-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRepoService {

  private currentUserKey = 'currentuser';
  constructor(
    private router: Router
  ) { }

  storeLoginData(o: ILoginResponseModel) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(o));
  }

  getCurrentUser(): ILoginResponseModel {
    if (this.isLoggedIn()) {
      const currentUserString = localStorage.getItem(this.currentUserKey);
      return JSON.parse(currentUserString);
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (!!localStorage.getItem(this.currentUserKey)) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
