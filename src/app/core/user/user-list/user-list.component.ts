import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BotaoConfirmaComponent } from 'src/app/Shared/botao-confirma/botao-confirma.component';
import { SubSink } from 'subsink2';

import { IUser } from '../Shared/iuser';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public virtualProducts$: Observable<IUser[]>;
  public dataSource: IUser[];
  public subs = new SubSink();

  constructor(
    private service: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.subs.sink = this.service
      .get()
      .subscribe((dados) => (this.dataSource = dados));
  }

  editForm(_id: string) {
    this.router.navigate([`user/${_id}/edit`]);
  }

  newForm() {
    this.router.navigate(['user/new']);
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(BotaoConfirmaComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        mensagem: `Deseja realmente exluir?`,
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

  displayedColumns: string[] = [
    'UserName',
    'Email',
    'IsActive',
    'UserType',
    'Action',
  ];

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
