import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BotaoConfirmaComponent } from 'src/app/Shared/botao-confirma/botao-confirma.component';

import { EventService } from '../shared/event-service';
import { IEvent } from '../shared/ievent';
import { Ilot } from '../shared/ilot';
import { LotService } from './../shared/lot.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  private formUpdate = {} as IEvent;
  private currentLot = { id: '', name: '', index: 0 };
  public file: File;
  public imagemURL = 'assets/img/upload-image.png';
  public formulario: FormGroup;
  public formValue = {} as IEvent;
  public urlAtiva: string;
  public pageTitle: string;
  public txtBtn: string;

  constructor(
    protected service: EventService,
    private serviceLot: LotService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlAtiva = this.activatedRoute.snapshot.url[0]?.path ?? ' '; //take params url

    this.formulario = this.fb.group({
      id: [null],
      theme: [null, Validators.required],
      local: [null, Validators.required],
      eventDate: [null],
      eventTime: [null, Validators.required],
      peopleAmount: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      eventImage: [''],
      lots: this.fb.array([]),
    });

    this.popularForm();
    this.showHeaderButton();
  }

  //concat date and hour to send to BDo
  private dateTimeBd() {
    let newDate: moment.Moment = moment
      .utc(this.formulario.value.eventDate)
      .local();
    this.formulario.value.eventDate =
      newDate.format('YYYY-MM-DD') +
      'T' +
      this.formulario.value.eventTime +
      ':00.000Z';
  }

  onSubmit(): void {
    this.dateTimeBd();

    this.formValue = this.formulario.value;
    if (this.urlAtiva === 'new') {
      this.save(this.formValue);
    }
  }

  save(formValue: IEvent): void {
    this.service.create(formValue).subscribe({
      next: (data) => {
        (this.formUpdate = data),
          this.snackBar.open('Formulário salvo com sucesso', '', {
            duration: 2000,
          }),
          this.router.navigate([`event/${this.formUpdate.id}/edit`]);
      },
      error: (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
      complete: () => this.popularForm(),
    });
  }

  update(): void {
    this.service.update(this.formulario.value).subscribe({
      next: () => {
        this.saveLot(),
          this.snackBar.open('Formulário atualizado com sucesso', '', {
            duration: 2000,
          });
      },
      error: (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      complete: () => this.router.navigate([`event`]),
    });
  }

  // button return
  btnReturn() {
    this.router.navigate([`event`]);
  }

  // function to populate
  popularForm(): void {
    if (this.urlAtiva !== 'new') {
      this.service.getByID(this.urlAtiva).subscribe({
        next: (data) => {
          this.formulario.patchValue(data);
          if (data.eventImage !== '') {
            this.imagemURL =
              'https://localhost:7217' + 'resources/images' + data.eventImage;
          }
          this.loadLots();
        },
        error: (error) => console.log(error),
      });
    }
  }

  // load and populate grid lots
  public loadLots() {
    this.serviceLot.getByEvent(this.urlAtiva).subscribe({
      next: (data: Ilot[]) => {
        data.forEach((lot) => {
          this.lotFormControl.push(this.AddLots(lot));
        });
      },
    });
  }

  // load image
  onFileChange(ev: any): void {
    const READER = new FileReader();

    READER.onload = (event: any) => (this.imagemURL = event.target.result);

    this.file = ev.target.files;
    READER.readAsDataURL(this.file[0]);

    this.upLoadImage();
  }

  upLoadImage() {
    this.service.uploadImage(this.urlAtiva, this.file).subscribe({
      next: () => this.popularForm(),
      error: (erro) => console.error(erro),
    });
  }

  //button and title
  showHeaderButton(): void {
    if (this.urlAtiva !== 'new') {
      this.pageTitle = 'Editando o formulário';
      this.txtBtn = 'Atualizar';
    } else {
      this.pageTitle = 'Criando novo formulário';
      this.txtBtn = 'Salvar';
    }
  }

  // Save lot
  public saveLot(): void {
    this.serviceLot
      .createLote(this.urlAtiva, this.formulario.value.lots)
      .subscribe({
        next: (dados) => console.log(dados),
        error: (erro) => console.log(erro),
        complete: () => this.router.navigate([`event`]),
      });
  }

  // Add Array of Lots
  public AddLots(x: Ilot): FormGroup {
    return this.fb.group({
      id: [x.id],
      lotName: [x.lotName, Validators.required],
      price: [x.price, Validators.required],
      initialDate: [x.initialDate],
      endDate: [x.endDate],
      amount: [x.amount, Validators.required],
      eventId: [this.urlAtiva],
    });
  }

  public includeLot(): void {
    this.lotFormControl.push(this.AddLots({ id: '' } as Ilot));
  }

  public removeLot(i: number): void {
    this.currentLot.id = this.lotFormControl.get(i + '.id')?.value;
    this.currentLot.name = this.lotFormControl.get(i + '.lotName')?.value;
    this.currentLot.index = i;

    const dialogRef = this.dialog.open(BotaoConfirmaComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        mensagem: `Deseja realmente exluir: ${this.currentLot.name}?`,
        botao1: 'Excluir',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.currentLot.id !== '') {
          this.serviceLot
            .deleteLot(this.urlAtiva, this.currentLot.id)
            .subscribe({
              next: () => {
                this.snackBar.open('Deletado com sucesso', 'OK', {
                  duration: 2000,
                });
              },
              error: (error) =>
                this.snackBar.open(`${error}`, '', { duration: 2000 }),
              complete: () => this.ngOnInit(),
            });
        } else {
          this.lotFormControl.removeAt(this.currentLot.index);
        }
      }
    });
  }

  get lotFormControl() {
    return this.formulario.get('lots') as FormArray;
  }
}
