import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.length > 6, Validators.length < 20]
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe((data: any) => {
      this.errorMessage = '';
      this.router.navigate(['/home']);
    }, (error: any) => {
      if (error.error.ERR_CODE === 'USER_NOT_FOUND')
        this.errorMessage = 'This user does not exist';
      else if (error.error.ERR_CODE === 'INCORRECT_CREDENTIALS')
        this.errorMessage = 'Incorrect credentials. Please login with correct username and password.';
      else
        this.errorMessage = 'Unknown error occurred.';
      this.loading = false;
    })
  }
}
