import { Component } from '@angular/core';

@Component({
  selector: 'app-aprovacoes-pendentes',
  templateUrl: './aprovacoes-pendentes.component.html',
  styleUrls: ['./aprovacoes-pendentes.component.scss']
})
export class AprovacoesPendentesComponent {
  ordens = [
    { codigo: 'OS4567SA', solicitante: 'Juliana Nascimento' },
    { codigo: 'OS4567SA', solicitante: 'Juliana Nascimento' },
    { codigo: 'OS4567SA', solicitante: 'Patricia Santos' },
    { codigo: 'OS4567SA', solicitante: 'Ayrton Nascimento' }
  ];
}
