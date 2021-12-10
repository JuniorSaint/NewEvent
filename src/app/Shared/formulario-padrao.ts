import {
  Inject,
  Injector,
  AfterContentChecked,
  Component,
} from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServico } from './crud.service';
import { IInterfacePadrao } from './iinterface.stander';

@Component({
  selector: '',
  template: '',
  styles: [''],
})
export abstract class FormularioPadrao<T extends IInterfacePadrao>
  implements AfterContentChecked
{
  public returnRouter!: string;
  public urlAtiva!: string;
  public pageTitle!: string;
  public txtBtn!: string;
  public formulario!: FormGroup;
  public formValue!: T;

  // Variáveis do inject
  protected fb: FormBuilder;
  public route: ActivatedRoute;
  public router: Router;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;

  constructor(
    protected injector: Injector,
    @Inject(String) returnRouter: string,
    protected servico: CrudServico<T>
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.fb = this.injector.get(FormBuilder);
    this.dialog = this.injector.get(MatDialog);
    this.snackBar = this.injector.get(MatSnackBar);
    this.returnRouter = returnRouter; // variable to return list
    this.urlAtiva = this.route.snapshot.url[0]?.path ?? ' '; //catch Id or empty to new
  }

  ngAfterContentChecked(): void {
    this.exibirCabecalhoBotao();
  }

  exibirCabecalhoBotao(): void {
    if (this.urlAtiva !== 'new') {
      this.pageTitle = 'Editando o formulário';
      this.txtBtn = 'Atualizar';
    } else {
      this.pageTitle = 'Criando novo formulário';
      this.txtBtn = 'Salvar';
    }
  }

  btnVoltar() {
    this.router.navigate([`${this.returnRouter}`]);
  }

  onSubmit(): void {
    this.formValue = this.formulario.value;
    if (this.urlAtiva === 'new') {
      this.save(this.formValue);
    } else {
      let id = this.urlAtiva;
      this.update(this.formValue, id);
    }
  }

  save(formValue: T): void {
    this.servico.create(formValue).subscribe(
      () =>
        this.snackBar.open('Formulário salvo com sucesso', '', {
          duration: 2000,
        }),
      (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
      () => this.formulario.reset()
    );
  }

  update(formValue: T, id: string): void {
    this.servico.update(formValue).subscribe(
      () =>
        this.snackBar.open('Formulário atualizado com sucesso', '', {
          duration: 2000,
        }),
      (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      () => this.router.navigate([`/${this.returnRouter}`])
    );
  }
}
