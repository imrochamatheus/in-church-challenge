import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

import { catchError, EMPTY, finalize, take } from 'rxjs';

import { User } from '../../data-access/auth.models';
import { AuthService } from '../../data-access/auth.service';
import { getFieldError } from '../../../../shared/utils/get-field-error';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';

function confirmPasswordValidator(
  group: AbstractControl
): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return pass && confirm && pass !== confirm
    ? { passwordsDontMatch: true }
    : null;
}

@Component({
  selector: 'app-register-page',
  imports: [AuthCardComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  public form: FormGroup;
  public readonly loading = signal<boolean>(false);
  public readonly getFieldError: Function = getFieldError;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10,11}$')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).*$'),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmPasswordValidator }
    );
  }

  public onSubmit(): void {
    if (!this.form.valid) return;

    const { confirmPassword, ...data } = this.form.value;

    this.loading.set(true);
    this.authService
      .signUp(data)
      .pipe(
        take(1),
        finalize(() => {
          this.loading.set(false);
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((_: User) => {
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      });
  }
}
