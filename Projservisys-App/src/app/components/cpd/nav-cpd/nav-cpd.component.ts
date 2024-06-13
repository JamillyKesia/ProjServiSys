import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/identity/user';
import { AccountService } from 'src/app/services/account.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-cpd',
  templateUrl: './nav-cpd.component.html',
  styleUrls: ['./nav-cpd.component.scss']
})
export class NavCpdComponent {
  
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
