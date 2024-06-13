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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: PaginaInicialComponent, data: { title: 'Página Inicial' }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'nova-ordem', component: NovaOrdemComponent, data: { title: 'Nova Ordem' }, canActivate: [AuthGuard]  },
  { path: 'suas-ordens', component: SuasOrdensComponent, data: { title: 'Suas Ordens' }, canActivate: [AuthGuard] },
  { path: 'home/coord', component: PaginaInicialCoordComponent, data: { title: 'Página Inicial - Coordenador' }, canActivate: [AuthGuard] },
  { path: 'aprovacoes-pendentes', component: AprovacoesPendentesComponent, data: { title: 'Aprovações Pendentes' }, canActivate: [AuthGuard] },
  { path: 'suas-aprovacoes', component: SuasAprovacoesComponent, data: { title: 'Suas Aprovações' }, canActivate: [AuthGuard] },
  { path: 'home/cpd', component: PaginaInicialCpdComponent, data: { title: 'Página Inicial - CPD' }, canActivate: [AuthGuard] },
  { path: 'ordens-servico', component: OrdensServicoComponent, data: { title: 'Ordens de Serviço' }, canActivate: [AuthGuard] },
  { path: 'area-adm', component: AddUsuarioComponent, data: { title: 'Área Administrativa' }, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
