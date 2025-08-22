import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { catchError, EMPTY, finalize, take } from 'rxjs';

import { User } from '../../data-access/auth.models';
import { AuthService } from '../../data-access/auth.service';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { getFieldError } from '../../../../shared/utils/get-field-error';

@Component({
  selector: 'app-login-page',
  imports: [AuthCardComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  public form: FormGroup;
  public readonly loading = signal<boolean>(false);
  public readonly getFieldError: Function = getFieldError;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) return;

    this.loading.set(true);
    this.authService
      .login(this.form.value)
      .pipe(
        take(1),
        finalize(() => this.loading.set(false)),
        catchError(() => {
          console.error('Login failed');
          return EMPTY;
        })
      )
      .subscribe((_: User) => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 600);
      });
  }
}
