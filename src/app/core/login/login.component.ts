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
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }

  authentication() {
    this.service.login(this.formulario.value).subscribe({
      next: () => this.router.navigate(['event']),
      error: (error: any) => {
        if (error.status == 401) {
          this.snackBar.open('Usuário e/ou senha inválidos', '', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Erro ao tentar conectar no servidor', '', {
            duration: 4000,
          });
        }
      },
    });
  }
}
