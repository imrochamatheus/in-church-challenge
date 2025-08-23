import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { delay, Observable, of, throwError } from 'rxjs';
import { Login, Register, User, UserRequest } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated = signal<boolean>(this.getAuthStatus());
  public readonly user = signal<User | null>(
    this.getUserFromStorage() as User | null
  );

  constructor(private readonly router: Router) {}

  public login(data: Login): Observable<User> {
    const savedUser = this.getUserFromStorage();

    if (
      savedUser &&
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      const user: User = {
        id: 1,
        email: savedUser.email,
        phone: savedUser.phone,
        username: savedUser.username,
      };

      this.setSession(user);
      return of(user);
    }

    return throwError(() => new Error('Credenciais inválidas'));
  }

  public signUp(data: Register): Observable<User> {
    const user: User = { id: 1, ...data };
    localStorage.setItem('user', JSON.stringify(user));

    return of(user).pipe(delay(800));
  }

  public setSession(user: User) {
    this.isAuthenticated.set(true);
    this.user.set(user);

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  }

  public logout(): void {
    this.isAuthenticated.set(false);
    this.user.set(null);

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');

    this.router.navigate(['auth/entrar']);
  }

  private getAuthStatus(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private getUserFromStorage(): UserRequest | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
