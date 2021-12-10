import { IEvent } from './../../event/shared/ievent';
import { FormGroup } from '@angular/forms';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpeakerService } from '../shared/speaker.service';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss'],
})
export class SpeakerListComponent implements OnInit, OnChanges {
  public showDetail = false;
  public idEvent: string;
  public Search: string;
  public value = 'Clear me';
  public idSpeaker: string;
  public dataSource$: IEvent[];

  constructor(private service: SpeakerService, private router: Router) {}

  ngOnChanges() {}

  ngOnInit(): void {}

  detailSpeaker(_id: string) {
    this.showDetail = true;
    this.idSpeaker = _id;
  }

  editForm(_id: string) {
    this.router.navigate([`speaker/${_id}/edit`]);
  }

  newForm() {
    this.router.navigate(['speaker/new']);
  }

  resetForm() {
    this.ngOnInit();
  }

  displayedColumns: string[] = [
    'Button',
    'speakerName',
    'speakerEmail',
    'Phone',
  ];
}
