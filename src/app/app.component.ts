import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmDialog, Toast],
  providers: [MessageService, ConfirmationService],
  template: `<router-outlet /> <p-confirmDialog></p-confirmDialog>
    <p-toast></p-toast>`,
})
export class AppComponent {
  title = 'in-church-challenge';
}
