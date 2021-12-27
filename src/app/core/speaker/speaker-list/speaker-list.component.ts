import { ISpeaker } from './../shared/ispeaker.interface';
import { PaginatedResult } from './../../../Shared/pagination';
import { IEvent } from './../../event/shared/ievent';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpeakerService } from '../shared/speaker.service';
import { SubSink } from 'subsink2';
import { IPagination } from 'src/app/Shared/pagination';
import { debounce, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss'],
})
export class SpeakerListComponent implements OnInit, OnChanges {
  public showDetail = false;
  public idEvent: string;
  public search: string;
  public queryField = new FormControl();
  public idSpeaker: string;
  public dataSource$: any;
  public pagination = {} as IPagination;

  constructor(private service: SpeakerService, private router: Router) {}

  ngOnChanges() {}

  ngOnInit(): void {
    this.pagination = {
      itemsPerPage: 5,
      totalItems: 1,
      currentPage: 1,
    } as IPagination;

    this.loadPage();
    this.inputSearch();
  }

  //pipe the expression that a want
  public inputSearch(): void {
    if (this.queryField)
      this.queryField.valueChanges
        .pipe(
          map((value) => value.trim()),
          debounceTime(300),
          distinctUntilChanged(),
          tap((resp) => (this.search = resp))
        )
        .subscribe(() => this.loadPage());
  }

  // seek the data with filter word
  public loadPage(): void {
    if (isNaN(this.pagination.currentPage)) {
      this.pagination.currentPage = 1;
    }

    this.service
      .getByPagination(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.search
      )
      .subscribe((paginatedResult: PaginatedResult<ISpeaker[]>) => {
        this.dataSource$ = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
      });
  }

  //change page
  public pageChanged(event): void {
    this.pagination.currentPage = event;
    this.loadPage();
  }

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
