import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() : void {

  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
