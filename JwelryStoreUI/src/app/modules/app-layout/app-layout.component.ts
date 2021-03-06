import { Component, OnInit } from '@angular/core';
import { AuthRepoService } from '@repos';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(private authRepoService: AuthRepoService) { }

  ngOnInit() {
  }

  get getCurrentUser() {
    return this.authRepoService.getCurrentUser();
  }

}
