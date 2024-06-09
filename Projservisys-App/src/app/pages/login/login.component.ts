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

    // public login(): void {
    //   this.accountService.login(this.model).subscribe(
    //     () => { 
    //       const user = this.accountService.getCurrentUser();
    //       this.redirectUser(user);
    //     },
    //     (error: any) => {
    //       if (error.status === 401){
    //         console.log('usuario invalido');
    //       } else {
    //         console.error(error);
    //       }
    //     }
    //   )
    // }
  
    // private redirectUser(user: any): void {
    //   switch (user.tipoUsuario) {
    //     case 'Solicitante':
    //       this.router.navigate(['/home']);
    //       break;
    //     case 'Coordenador_TI':
    //       this.router.navigate(['/home/coord']);
    //       break;
    //     case 'Tecnico':
    //       this.router.navigate(['/home/cpd']);
    //       break;
    //     case 'Administrador':
    //       this.router.navigate(['/novo-usuario']);
    //       break;
    //     default:
    //       this.router.navigate(['/login']);
    //       break;
    //   }
    // }

    /*public login(): void {
      this.accountService.login(this.model).subscribe(

        (response: any) => {
          const userType: TipoUsuarioEnum = response.userType;
          switch(userType) {
            case TipoUsuarioEnum.Solicitante:
              this.router.navigateByUrl('/pagina-inicial');
              break;
            case TipoUsuarioEnum.Coordenador_TI:
              this.router.navigateByUrl('/pagina-inicial-coord');
              break;
            case TipoUsuarioEnum.Tecnico:
              this.router.navigateByUrl('/pagina-inicial-cpd');
              break;
            case TipoUsuarioEnum.Administrador:
              this.router.navigateByUrl('/novo-usuario');
              break;
            default:
              this.router.navigateByUrl('/login');
              break;
          }
        },
        (error: any) => {
          if (error.status == 401) {
            console.log('usuario invalido');
          } else {
            console.error(error);
          }
        }*/

        /*() => { 
          this.router.navigateByUrl('/home');
        },
        (error: any) => {
          if (error.status == 401){
            //this.toaster.error('usuario invalido');
            console.log('usuario invalido');
          }
          else console.error(error);
        }


      );
    }*/

}
