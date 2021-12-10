import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/Shared/user.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  formulario!: FormGroup;

  constructor
    (
      private servico: UserService,
      private fb: FormBuilder,
      private service: LoginService
    ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  authentication() {

    this.service.login(this.formulario.value)
  }

}
