import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ISocialMedia } from '../shared/isocial-media';
import { SocialMediaService } from '../shared/social-media.service';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
})
export class SocialMediaFormComponent implements OnInit {
  public formUpdate!: ISocialMedia;
  public formulario!: FormGroup;
  public urlAtiva!: string;
  public formValue: ISocialMedia;
  public pageTitle!: string;
  public txtBtn!: string;

  constructor(
    private service: SocialMediaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      url: [null],
      socialMedia: [null, Validators.required],
      eventId: [null, Validators.required],
      speakerId: [null, Validators.required],
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

  popularForm() {
    if (this.urlAtiva !== 'new') {
      this.service.getByID(this.urlAtiva).subscribe(
        (dados) => (this.formUpdate = dados),
        (error) => console.log(error),
        () => this.patchFormUpdate(this.formUpdate)
      );
    }
  }

  patchFormUpdate(formUpdate: ISocialMedia) {
    this.formulario.patchValue({
      id: this.formUpdate.id,
      url: this.formUpdate.url,
      SocialMedia: this.formUpdate.socialMedia,
      speakerId: this.formUpdate.speakerId,
    });
  }

  save(formValue: ISocialMedia): void {
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

  update(formValue: ISocialMedia, id: string): void {
    this.service.update(formValue).subscribe(
      () =>
        this.snackBar.open('Formulário atualizado com sucesso', '', {
          duration: 2000,
        }),
      (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      () => this.router.navigate([`sociaMedia`])
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
    this.router.navigate(['socialMedia']);
  }
}
