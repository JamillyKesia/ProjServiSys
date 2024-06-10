import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/Solicitante/nav/nav.component';
import { PaginaInicialComponent } from './pages/solicitante/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { NovaOrdemComponent } from './pages/solicitante/nova-ordem/nova-ordem.component';
import { SuasOrdensComponent } from './pages/solicitante/suas-ordens/suas-ordens.component';
import { PaginaInicialCoordComponent } from './pages/coordenador/pagina-inicial-coord/pagina-inicial-coord.component';
import { NavCoordComponent } from './components/coordenador/nav-coord/nav-coord.component';
import { AprovacoesPendentesComponent } from './pages/coordenador/aprovacoes-pendentes/aprovacoes-pendentes.component';
import { SuasAprovacoesComponent } from './pages/coordenador/suas-aprovacoes/suas-aprovacoes.component';
import { PaginaInicialCpdComponent } from './pages/CPD/pagina-inicial-cpd/pagina-inicial-cpd.component';
import { OrdensServicoComponent } from './pages/CPD/ordens-servico/ordens-servico.component';
import { AuthGuard } from './guard/auth.guard';
import { AddUsuarioComponent } from './pages/administrador/add-usuario/add-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PaginaInicialComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'nova-ordem', component: NovaOrdemComponent, canActivate: [AuthGuard] },
  { path: 'suas-ordens', component: SuasOrdensComponent, canActivate: [AuthGuard] },
  { path: 'home/coord', component: PaginaInicialCoordComponent, canActivate: [AuthGuard] },
  { path: 'aprovacoes-pendentes', component: AprovacoesPendentesComponent, canActivate: [AuthGuard] },
  { path: 'suas-aprovacoes', component: SuasAprovacoesComponent, canActivate: [AuthGuard] },
  { path: 'home/cpd', component: PaginaInicialCpdComponent, canActivate: [AuthGuard] },
  { path: 'ordens-servico', component: OrdensServicoComponent, canActivate: [AuthGuard] },
  { path: 'area-adm', component: AddUsuarioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
