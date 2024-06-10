import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav-adm',
  templateUrl: './nav-adm.component.html',
  styleUrls: ['./nav-adm.component.scss']
})
export class NavAdmComponent {

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}


  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
