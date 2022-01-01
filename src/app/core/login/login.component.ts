import { Router } from '@angular/router';
import { Ilogin } from './ilogin';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  constructor(
    private service: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  authentication() {
    this.service.login(this.formulario.value).subscribe({
      next: () => this.router.navigate(['event']),
      error: (erro: any) => {
        if (erro === '401') {
          this.snackBar.open('Usuário ou senha inválidos', '', {
            duration: 2000,
          });
        } else {
          console.error(erro);
        }
      },
    });
  }
}
