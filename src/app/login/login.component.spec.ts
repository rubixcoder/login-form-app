import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { LoginComponent } from './login.component';
import { UserService } from '../user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [ UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('username field validity to be required', () => {
    let errors = {};
    let username = component.form.controls['username'];
    errors = username.errors || {};
    
    expect(errors['required']).toBeTruthy();
  });

  it('password field validity to be required', () => {
    let errors = {};
    let password = component.form.controls['password'];
    errors = password.errors || {};
    
    expect(errors['required']).toBeTruthy();
  });

  it('password field validity for minlength', () => {
    let errors = {};
    let password = component.form.controls['password'];
    password.setValue('123')
    errors = password.errors || {};
    
    expect(errors['minlength']).toBeTruthy();
  });

  it('password field validity for maxlength', () => {
    let errors = {};
    let password = component.form.controls['password'];
    password.setValue('1234567890123456789011')
    errors = password.errors || {};
    
    expect(errors['maxlength']).toBeTruthy();
  })

});
