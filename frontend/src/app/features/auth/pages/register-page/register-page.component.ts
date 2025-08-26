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

import { MessageService } from 'primeng/api';
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
    private readonly authService: AuthService,
    private readonly messageService: MessageService
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
        phone: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), ,]],
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
          this.messageService.add({
            severity: 'error',
            summary: 'Falha ao cadastrar',
            detail: 'Por favor, tente novamente.',
          });

          return EMPTY;
        })
      )
      .subscribe((_: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro realizado com sucesso',
          detail: 'Você já pode fazer login!',
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1000);
      });
  }
}
