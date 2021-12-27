import { PageEvent } from '@angular/material/paginator';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { IPagination } from 'src/app/Shared/pagination';
import { SubSink } from 'subsink2';

import { EventService } from '../shared/event-service';
import { PaginatedResult } from './../../../Shared/pagination';
import { IEvent } from './../shared/ievent';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnDestroy {
  public showDetail = false;
  public idEvent!: string;
  public dataSource$: any;
  private subs = new SubSink();
  public pagination = {} as IPagination;
  public queryField = new FormControl();
  public search: any;
  public dataSource: any;

  constructor(private service: EventService, private router: Router) {}

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

  //seek the data with filter word
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
      .subscribe((paginatedResult: PaginatedResult<IEvent[]>) => {
        this.dataSource$ = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
      });
  }

  //change page
  public pageChanged(event): void {
    this.pagination.currentPage = event;
    this.loadPage();
  }

  detailEvent(_id: string) {
    this.showDetail = true;
    this.idEvent = _id;
  }

  editForm(_id: string) {
    this.router.navigate([`event/${_id}/edit`]);
  }

  newForm() {
    this.router.navigate(['event/new']);
  }

  resetForm() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  displayedColumns: string[] = ['Image', 'Local', 'Thema', 'Phone'];
}
