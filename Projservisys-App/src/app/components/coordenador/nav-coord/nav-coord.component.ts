import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav-coord',
  templateUrl: './nav-coord.component.html',
  styleUrls: ['./nav-coord.component.scss']
})
export class NavCoordComponent {

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
