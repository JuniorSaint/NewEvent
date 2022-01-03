import { IUser } from './../user/Shared/iuser';
import { Router } from '@angular/router';
import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { SubSink } from 'subsink2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public service: LoginService
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }
  showMenu(): boolean {
    return this.router.url !== '/logout' ? true : false;
  }

  public reloadPage() {
    if (this.service.currentUser$ === null) location.reload();
  }

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/logout');
  }
}
