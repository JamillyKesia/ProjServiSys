import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-nav-cpd',
  templateUrl: './nav-cpd.component.html',
  styleUrls: ['./nav-cpd.component.scss']
})
export class NavCpdComponent {
  
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
