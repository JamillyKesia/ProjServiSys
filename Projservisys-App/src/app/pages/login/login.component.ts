import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UserLogin } from 'src/app/models/identity/user-login';
import { Router } from '@angular/router';
import { User, TipoUsuarioEnum } from 'src/app/models/identity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: UserLogin = new UserLogin();

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {}

  public login(): void {
    this.accountService.login(this.model).subscribe(
      (user: User) => { 
        console.log('Usuário logado:', user);
        const tipoUsuarioNumero = this.convertTipoUsuarioToNumber(user.tipoUsuario);
        this.redirectUser(tipoUsuarioNumero);
      },
      (error: any) => {
        if (error.status === 401) {
          console.log('usuário inválido');
        } else {
          console.error(error);
        }
      }
    )
  }

  private convertTipoUsuarioToNumber(tipoUsuario: TipoUsuarioEnum): number {
    switch (tipoUsuario) {
      case TipoUsuarioEnum.Solicitante:
        return 1;
      case TipoUsuarioEnum.Coordenador_TI:
        return 2;
      case TipoUsuarioEnum.Tecnico:
        return 3;
      case TipoUsuarioEnum.Administrador:
        return 4;
      default:
        return 0;
    }
  }

  private redirectUser(tipoUsuario: number): void {
    console.log(tipoUsuario);
    switch (tipoUsuario) {
      case 1: // Solicitante
        this.router.navigateByUrl('/home');
        console.log('Redirecionando para /home');
        break;
      case 2: // Coordenador_TI
        this.router.navigateByUrl('/home/coord');
        console.log('Redirecionando para /home/coord');
        break;
      case 3: // Tecnico
        this.router.navigateByUrl('/home/cpd');
        console.log('Redirecionando para /home/cpd');
        break;
      case 4: // Administrador
        this.router.navigateByUrl('/area-adm');
        console.log('Redirecionando para /area-adm');
        break;
      default:
        this.router.navigateByUrl('/login');
        console.log('Redirecionando para /login');
        break;
    }
  }
}