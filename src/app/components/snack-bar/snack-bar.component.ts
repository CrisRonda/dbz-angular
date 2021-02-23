import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBar {
  constructor(private snackBar: MatSnackBar) {}
  openSuccessSnackBar({ message = 'Listo' }: { message?: string }) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }
  openFailureSnackBar({ message = 'Ocurrio un error' }: { message?: string }) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  }
}
