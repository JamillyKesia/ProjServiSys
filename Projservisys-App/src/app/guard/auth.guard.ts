import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/identity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
    //console.log('Usuário no Guardião:', user);


    if (user !== null) {
      const tipoUsuario = this.convertTipoUsuarioToNumber(user.tipoUsuario);
      console.log(user.tipoUsuario);

      const allowedRoutes: { [key: number]: string[] } = {
        1: ['/home', '/nova-ordem', '/suas-ordens'],
        2: ['/home/coord', '/aprovacoes-pendentes', '/suas-aprovacoes'],
        3: ['/home/cpd', '/ordens-servico'],
        4: ['/area-adm']
      };

      const currentRoute = state.url;

      const routesForUser = allowedRoutes[tipoUsuario];
      if (routesForUser && routesForUser.includes(currentRoute)) {
        return true;
      }

      this.router.navigate(['/login']);
      //console.log('Acesso não permitido!');
      return false;
    }

    this.router.navigate(['/login']);
    //console.log('Acesso não permitido!');
    return false;
  }

  private convertTipoUsuarioToNumber(tipoUsuario: string): number {
    switch (tipoUsuario) {
      case 'Solicitante':
        return 1;
      case 'Coordenador_TI':
        return 2;
      case 'Tecnico':
        return 3;
      case 'Administrador':
        return 4;
      default:
        return 0; // Se não corresponder a nenhum tipo conhecido, pode retornar 0 ou outro valor padrão.
    }
  }
}
