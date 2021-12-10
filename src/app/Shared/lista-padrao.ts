import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink2';

import { BotaoConfirmaComponent } from './botao-confirma/botao-confirma.component';
import { CrudServico } from './crud.service';
import { IInterfacePadrao } from './iinterface.stander';

@Component({
  selector: '',
  template: '',
  styles: [''],
})
export abstract class ListaPadrao<T extends IInterfacePadrao>
  implements OnInit
{
  public dataSource$!: T[];
  public deleteName!: string;
  public subs = new SubSink();

  // Variáveis do inject
  protected router: Router;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;

  constructor(
    protected injector: Injector,
    protected service: CrudServico<T>,
    @Inject(String) deleteName: string
  ) {
    this.router = this.injector.get(Router);
    this.dialog = this.injector.get(MatDialog);
    this.snackBar = this.injector.get(MatSnackBar);
    this.deleteName = deleteName; // Name in the dialog to delete
  }

  ngOnInit() {}

  CompleteList() {
    this.subs.sink = this.service.get().subscribe(
      (dados) => (this.dataSource$ = dados),
      (erro) => console.error(erro),
      () => console.log(this.dataSource$)
    );
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(BotaoConfirmaComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        mensagem: `Deseja realmente exluir o ${this.deleteName}?`,
        botao1: 'Excluir',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.service.delete(id).subscribe(
          () =>
            this.snackBar.open('Deletado com sucesso', 'OK', {
              duration: 2000,
            }),
          (error) => this.snackBar.open(`${error}`, '', { duration: 2000 }),
          () => this.ngOnInit()
        );
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
