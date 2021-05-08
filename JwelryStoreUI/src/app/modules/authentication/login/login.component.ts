import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequestModel, ILoginResponseModel } from '@models';
import { AuthRepoService } from '@repos';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formSubmited = false;
  invalidLoginAttempt = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private authRepoService: AuthRepoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get userName() { return this.loginForm.get('userName') as FormControl; }
  get password() { return this.loginForm.get('password') as FormControl; }

  onSubmit() {
    this.formSubmited = true;
    this.invalidLoginAttempt = false;
    if (this.loginForm.invalid) {
      return;
    }
    const reqData = this.loginForm.value as ILoginRequestModel;
    this.authService.authenticate(reqData).subscribe((o: ILoginResponseModel) => {
      if (!!o.status) {
        this.authRepoService.storeLoginData(o);
        this.router.navigate(['/app/estimation']);
      }
    }, err => {
      this.invalidLoginAttempt = true;
    });
  }

  cancel() {
    this.loginForm.reset();
    this.formSubmited = false;
  }
}
