import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.component.html',
})
export class AuthCardComponent {
  public title = input<string>('Acesso');
  public subtitle = input<string>('Área restrita');
}
