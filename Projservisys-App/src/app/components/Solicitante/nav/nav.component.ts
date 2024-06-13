import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/identity/user';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentUser: User | null = null;
  pageTitle: string = '';

  constructor(
    public accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      map(route => route.snapshot.data['title'] || 'Página inicial')
    ).subscribe(title => {
      this.pageTitle = title;
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
