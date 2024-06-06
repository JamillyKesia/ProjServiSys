import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/identity/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent {

  //model: any = {};
  model: UserLogin = new UserLogin();

  constructor(private accountService: AccountService,
              private router: Router/*,
              private toaster: ToastrService*/){}

    ngOnInit(): void {}

    public login(): void {
      this.accountService.login(this.model).subscribe(
        () => { 
          this.router.navigateByUrl('/home');
        },
        (error: any) => {
          if (error.status == 401){
            //this.toaster.error('usuario invalido');
            console.log('usuario invalido');
          }
          else console.error(error);
        }
      )
    }

}
