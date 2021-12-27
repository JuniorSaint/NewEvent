import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BotaoConfirmaComponent } from 'src/app/Shared/botao-confirma/botao-confirma.component';
import { SubSink } from 'subsink2';

import { SocialMediaService } from '../../social-media/shared/social-media.service';
import { ISpeaker } from '../shared/ispeaker.interface';
import { SpeakerService } from '../shared/speaker.service';
import { IlistSocialMedia } from './../../social-media/shared/ilist-social-media';
import { ISocialMedia } from './../../social-media/shared/isocial-media';

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
  public imageUrl = 'assets/img/upload-image.png';
  private currentSocialMedia = { id: '', name: '', index: 0 };
  private file: File;
  public listSocialMedia$: IlistSocialMedia[];
  private subs = new SubSink();

  constructor(
    private service: SpeakerService,
    private serviceSocialMedia: SocialMediaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlAtiva = this.activedRoute.snapshot.url[0]?.path ?? ' '; // take params url

    this.subs.sink = this.serviceSocialMedia.listSocialMedia().subscribe({
      next: (data) => (this.listSocialMedia$ = data),
      error: (erro) => console.log(erro),
    });

    this.formulario = this.fb.group({
      id: [],
      speakerName: [null, Validators.required],
      miniResume: [null],
      speakerImage: ['', Validators.pattern('.*.(gif|jpe?g|bmp|png|webp)$')],
      speakerPhone: [null, Validators.required],
      speakerEmail: [null, [Validators.required, Validators.email]],
      birthday: [null],
      socialMedias: this.fb.array([]),
    });
    this.popularForm();
    this.showHeaderButton();
  }

  onSubmit(): void {
    this.formValue = this.formulario.value;
    if (this.urlAtiva === 'new') {
      this.save(this.formValue);
    }
  }

  // function to populate
  popularForm() {
    if (this.urlAtiva !== 'new') {
      this.service.getByID(this.urlAtiva).subscribe({
        next: (data) => {
          this.formulario.patchValue(data);
          if (data.speakerImage !== '') {
            this.imageUrl =
              'https://localhost:7217' + 'resources/images' + data.speakerImage;
          }
          this.loadSocialMedia();
        },
        error: (error) => console.log(error),
      });
    }
  }

  // load and populate grid of social media
  public loadSocialMedia() {
    this.serviceSocialMedia.getBySpeaker(this.urlAtiva).subscribe({
      next: (data: ISocialMedia[]) => {
        data.forEach((socialMedia) => {
          this.socialMediaFormControl.push(this.addSocialMedia(socialMedia));
        });
      },
    });
  }

  save(formValue: ISpeaker): void {
    this.service.create(formValue).subscribe({
      next: (data) => {
        (this.formUpdate = data),
          this.snackBar.open('Formulário salvo com sucesso', '', {
            duration: 2000,
          }),
          this.router.navigate([`speaker/${this.formUpdate.id}/edit`]);
      },
      error: (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
      complete: () => this.popularForm(),
    });
  }

  update(): void {
    this.service.update(this.formulario.value).subscribe({
      next: () => {
        this.saveSocialMedia();
        this.snackBar.open('Formulário atualizado com sucesso', '', {
          duration: 2000,
        });
      },
      error: (error) =>
        this.snackBar.open('Erro ao atualizar o formulário ', error, {
          duration: 2000,
        }),
      complete: () => this.router.navigate([`speaker`]),
    });
  }

  //button and title  showHeaderButton
  showHeaderButton(): void {
    if (this.urlAtiva !== 'new') {
      this.pageTitle = 'Editando o formulário';
      this.txtBtn = 'Atualizar';
    } else {
      this.pageTitle = 'Criando novo formulário';
      this.txtBtn = 'Salvar';
    }
  }

  btnReturn() {
    this.router.navigate([`speaker`]);
  }

  // load image

  onFileChange(ev: any): void {
    const READER = new FileReader();

    READER.onload = (event: any) => (this.imageUrl = event.target.result);

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

  // Save Social Media
  public saveSocialMedia(): void {
    this.serviceSocialMedia
      .createSocialMedia(this.urlAtiva, this.formulario.value.socialMedia)
      .subscribe({
        next: (dados) => console.log(dados),
        error: (erro) => console.log(erro),
        complete: () => this.router.navigate([`speaker`]),
      });
  }

  // Add array of social media

  public addSocialMedia(x: ISocialMedia): FormGroup {
    return this.fb.group({
      id: [x.id],
      socialMedia: [x.socialMedia, Validators.required],
      urlSocialMedia: [x.urlSocialMedia, Validators.required],
      speakerId: [this.urlAtiva],
    });
  }

  public includeSocialMedia(): void {
    this.socialMediaFormControl.push(
      this.addSocialMedia({ id: '' } as ISocialMedia)
    );
  }

  public removeSocialMedia(i: number): void {
    this.currentSocialMedia.id = this.socialMediaFormControl.get(
      i + '.id'
    )?.value;
    this.currentSocialMedia.name = this.socialMediaFormControl.get(
      i + '.socialMedia'
    )?.value;
    this.currentSocialMedia.index = i;

    const dialogRef = this.dialog.open(BotaoConfirmaComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {
        mensagem: `Deseja realmente exluir: ${this.currentSocialMedia.name}?`,
        botao1: 'Excluir',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.currentSocialMedia.id !== '') {
          this.serviceSocialMedia
            .deleteSocialMedia(this.urlAtiva, this.currentSocialMedia.id)
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
          this.socialMediaFormControl.removeAt(this.currentSocialMedia.index);
        }
      }
    });
  }

  get socialMediaFormControl() {
    return this.formulario.get('socialMedias') as FormArray;
  }
}
