import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

import { catchError, EMPTY, finalize, take } from 'rxjs';

import { User } from '../../data-access/auth.models';
import { AuthService } from '../../data-access/auth.service';
import { getFieldError } from '../../../../shared/utils/get-field-error';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, AuthCardComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  public form: FormGroup;
  public readonly loading = signal<boolean>(false);
  public readonly getFieldError: Function = getFieldError;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: MessageService
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
          this.messageService.add({
            severity: 'error',
            summary: 'Falha ao logar',
            detail: 'Por favor, verifique suas credenciais.',
          });
          return EMPTY;
        })
      )
      .subscribe((_: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Logado com sucesso',
          detail: 'Bem-vindo de volta!',
        });

        setTimeout(() => {
          this.router.navigate(['/admin/eventos']);
        }, 600);
      });
  }
}
