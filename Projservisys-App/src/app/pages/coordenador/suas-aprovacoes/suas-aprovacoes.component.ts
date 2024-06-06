import { Component } from '@angular/core';

@Component({
  selector: 'app-suas-aprovacoes',
  templateUrl: './suas-aprovacoes.component.html',
  styleUrls: ['./suas-aprovacoes.component.scss']
})
export class SuasAprovacoesComponent {
  ordens = [
    { id: 'OS4568SA', status: 'Rejeitado', data: '14-09-2023' },
    { id: 'OS4567SA', status: 'Aprovada', data: '11-07-2023' },
    { id: 'OS4567SA', status: 'Aprovada', data: '11-07-2023' },
    { id: 'OS4566SA', status: 'Rejeitado', data: '27-06-2023' }
  ]
}
