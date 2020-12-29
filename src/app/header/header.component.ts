import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  hasLoggedIn:boolean;
  destroy$ = new Subject<boolean>();
  constructor(private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
  this.authService.getHasLoggedIn().pipe(
    takeUntil(this.destroy$)
  ).subscribe(response => {this.hasLoggedIn = response});
  }
  onLogOut():void{
    this.authService.logOut();
    this.router.navigate(['login']);
  }
  ngOnDestroy():void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
