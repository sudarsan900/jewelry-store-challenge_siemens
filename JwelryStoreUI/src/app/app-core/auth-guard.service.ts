import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthRepoService } from '../repo/auth-repo.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authRepoService: AuthRepoService,
    private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.authRepoService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
