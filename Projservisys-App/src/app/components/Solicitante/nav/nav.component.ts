import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/identity/user';
import { filter } from 'rxjs/operators';

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
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle();
    });

    this.activatedRoute.params.subscribe(() => {
      this.setPageTitle();
    });
  }

  setPageTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const routeTitle = route.snapshot.data['title'];
    this.pageTitle = routeTitle || 'Página Inicial'; // Se não houver título definido na rota, usa 'Página Inicial'
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
