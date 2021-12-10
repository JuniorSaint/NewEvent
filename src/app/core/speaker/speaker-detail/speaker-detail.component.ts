import { Router } from '@angular/router';
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

import { ISpeaker } from '../shared/ispeaker.interface';
import { SpeakerService } from '../shared/speaker.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss'],
})
export class SpeakerDetailComponent implements OnInit, OnDestroy, OnChanges {
  speakerFind!: ISpeaker;
  @Input() id!: string;
  @Output() resetList = new EventEmitter();
  private subs = new SubSink();

  constructor(
    private service: SpeakerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.subs.sink = this.service.getByID(this.id).subscribe(
      (data) => (this.speakerFind = data),
      (erro) => console.error(erro),
      () => console.log(this.speakerFind)
    );
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(BotaoConfirmaComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        mensagem: `Deseja realmente exluir ?`,
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
          () => this.resetList.emit()
        );
      }
    });
  }

  editForm() {
    this.router.navigate([`speaker/${this.id}/edit`]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
