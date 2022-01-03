import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  canActivate(): boolean {
    if (localStorage.getItem('user') !== null) return true;

    this.snackBar.open('Usuário não esta logado', '', { duration: 3000 });
    this.router.navigate(['logout']);
    return false;
  }
}
