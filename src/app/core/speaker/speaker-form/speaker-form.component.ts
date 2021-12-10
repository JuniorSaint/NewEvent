import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ISpeaker } from '../shared/ispeaker.interface';
import { SpeakerService } from '../shared/speaker.service';

@Component({
  selector: 'app-speaker-form',
  templateUrl: './speaker-form.component.html',
  styleUrls: ['./speaker-form.component.scss'],
})
export class SpeakerFormComponent implements OnInit {
  public formUpdate: ISpeaker;
  public formulario: FormGroup;
  public formValue;
  public urlAtiva: string;
  public pageTitle: string;
  public txtBtn: string;
  public dataSource$: ISpeaker[];

  constructor(
    private service: SpeakerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [],
      speakerName: [null, Validators.required],
      miniResume: [null],
      speakerImage: [
        null,
        [Validators.required, Validators.pattern('.*.(gif|jpe?g|bmp|png)$')],
      ],
      speakerPhone: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-z A-Z 0-9 _ -.]+[@]+[a-z]+[.][a-z]{2,3}'),
        ],
      ],
    });
    this.popularForm();
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

  // Função de Popular Formulário
  popularForm() {
    if (this.urlAtiva !== 'new') {
      this.service.getByID(this.urlAtiva).subscribe(
        (dados) => {
          (this.formUpdate = dados),
            this.formulario.patchValue(this.formUpdate);
        },
        (error) => console.log(error)
      );
    }
  }

  save(formValue: ISpeaker): void {
    this.service.create(formValue).subscribe(
      () =>
        this.snackBar.open('Formulário salvo com sucesso', '', {
          duration: 2000,
        }),
      (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
      () => this.formulario.reset()
    );
  }

  update(formValue: ISpeaker, id: string): void {
    this.service.update(formValue).subscribe(
      () =>
        this.snackBar.open('Formulário atualizado com sucesso', '', {
          duration: 2000,
        }),
      (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      () => this.router.navigate([`speaker`])
    );
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
    this.router.navigate([`speaker`]);
  }
}
