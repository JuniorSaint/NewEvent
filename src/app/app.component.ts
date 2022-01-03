import { IUser } from './core/user/Shared/iuser';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './core/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((_) => this.route),
        map((rout) => {
          while (rout.firstChild) rout = rout.firstChild;
          return rout;
        }),
        switchMap((rout) => rout.data)
      )
      .subscribe((event) => this.titleService.setTitle(event['Title']));

    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: IUser;

    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    } else {
      user = null;
    }

    if (user) {
      this.service.setCurrentUser(user);
    }
  }
}
