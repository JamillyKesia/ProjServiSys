import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/identity/user';
import { AccountService } from 'src/app/services/account.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-coord',
  templateUrl: './nav-coord.component.html',
  styleUrls: ['./nav-coord.component.scss']
})
export class NavCoordComponent {
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
