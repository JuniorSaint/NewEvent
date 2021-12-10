import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BotaoConfirmaComponent } from 'src/app/Shared/botao-confirma/botao-confirma.component';
import { SubSink } from 'subsink2';

import { EventService } from '../shared/event-service';
import { IEvent } from '../shared/ievent';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() id: string;
  @Output() resetList = new EventEmitter();
  private subs = new SubSink();
  public eventFind: IEvent;
  private readonly endServer = 'https://localhost:7217/resources/images/';

  constructor(
    protected service: EventService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.subs.sink = this.service.getByIdComplete(this.id).subscribe({
      next: (data) => {
        this.eventFind = data;
      },
      error: (erro) => console.error(erro),
      complete: () => console.log(this.eventFind),
    });
  }
  resetForm() {
    this.ngOnInit();
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
        this.service.delete(id).subscribe({
          next: () =>
            this.snackBar.open('Deletado com sucesso', 'OK', {
              duration: 2000,
            }),
          error: (error) =>
            this.snackBar.open(`${error}`, '', { duration: 2000 }),
          complete: () => this.resetList.emit(),
        });
      }
    });
  }

  editForm() {
    this.router.navigate([`event/${this.id}/edit`]);
  }

  // verify if there is image name
  public verifyImage(imgUrl: string): string {
    if (imgUrl !== null && imgUrl !== undefined) {
      return `${this.endServer}${imgUrl}`;
    } else {
      return 'assets/img/no-picture.png';
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
