import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEvent } from './../../event/shared/ievent';
import { Component, OnInit, Injector } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { IUser } from '../Shared/iuser';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public formUpdate = {} as IUser;
  public emailUser$: any;
  public emalMatch = true;
  public hide = true;
  public senhaMatching: boolean;
  public formulario: FormGroup;
  public urlAtiva: string;
  public formValue = {} as IUser;
  public pageTitle: string;
  public txtBtn: string;

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlAtiva = this.activedRoute.snapshot.url[0]?.path ?? ' '; // take params url

    this.formulario = this.fb.group(
      {
        id: [],
        userName: [null, Validators.required],
        userEmail: [
          null,
          [
            Validators.required,
            Validators.pattern('[a-z A-Z 0-9 _ -.]+[@]+[a-z]+[.][a-z]{2,3}'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repPassword: ['', [Validators.required, Validators.minLength(6)]],
        isActive: [null, Validators.required],
        userImage: [null],
        phoneNumber: [null],
        userType: [null, Validators.required],
        dateBirthday: [null],
      },
      { validator: [this.matchingPasswords] } as AbstractControlOptions
    );

    this.popularForm();
    this.showHeaderButton();
  }

  onSubmit(): void {
    this.formValue = { ...this.formulario.value };
    if (this.urlAtiva === 'new') {
      this.save(this.formValue);
    } else {
      let id = this.urlAtiva;
      this.update(this.formValue, id);
    }
  }

  btnVoltar() {
    this.router.navigate(['user']);
  }

  // Comparação de passaword
  matchingPasswords(group: FormGroup) {
    const password = group.get('password')?.value ?? '';
    const repPassword = group.get('repPassword')?.value ?? '';

    if (repPassword.trim() + password.trim()) {
      return repPassword !== password ? { senhaMatching: false } : null;
    } else {
      return null;
    }
  }

  // Função de Popular Formulário
  popularForm() {
    if (this.urlAtiva !== 'new') {
      this.service.getByID(this.urlAtiva).subscribe({
        next: (dados) => {
          (this.formUpdate = { ...dados }),
            this.formulario.patchValue(this.formUpdate);
        },
        error: (error) => console.log(error),
      });
    }
  }

  showHeaderButton(): void {
    if (this.urlAtiva !== 'new') {
      this.pageTitle = 'Editando o formulário';
      this.txtBtn = 'Atualizar';
    } else {
      this.pageTitle = 'Criando novo formulário';
      this.txtBtn = 'Salvar';
    }
  }

  save(formValue: IUser): void {
    this.service.create(formValue).subscribe({
      next: () =>
        this.snackBar.open('Formulário salvo com sucesso', '', {
          duration: 2000,
        }),
      error: (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
      complete: () => this.formulario.reset(),
    });
  }

  update(formValue: IUser, id: string): void {
    this.service.update(formValue).subscribe({
      next: () =>
        this.snackBar.open('Formulário atualizado com sucesso', '', {
          duration: 2000,
        }),
      error: (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      complete: () => this.router.navigate([`/user`]),
    });
  }
}
