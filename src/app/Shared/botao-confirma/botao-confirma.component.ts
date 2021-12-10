import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-botao-confirma',
  templateUrl: './botao-confirma.component.html',
  styleUrls: ['./botao-confirma.component.scss'],
})
export class BotaoConfirmaComponent implements OnInit {
  dialogRef: any;

  constructor(
    private matDialogRef: MatDialogRef<BotaoConfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
