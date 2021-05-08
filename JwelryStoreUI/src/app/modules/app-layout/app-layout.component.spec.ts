/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRepoService } from 'src/app/repo/auth-repo.service';
import { ILoginResponseModel } from 'src/app/models/login-response-model';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let authRepoService: AuthRepoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    authRepoService = TestBed.get(AuthRepoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get logged in username', () => {
    const userDummy = {
      email: 'privileged@gmail.com',
      firstName: 'Privileged',
      lastName: 'User',
      status: true,
      userId: 1,
      role: 'privileged'
    } as ILoginResponseModel;

    spyOn(authRepoService, 'getCurrentUser').and.returnValue(userDummy);
    const cu = component.getCurrentUser;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav.bg-light span').textContent).toContain('Welcome : Privileged User');
    expect(userDummy.firstName).toEqual(cu.firstName);
  });


});
