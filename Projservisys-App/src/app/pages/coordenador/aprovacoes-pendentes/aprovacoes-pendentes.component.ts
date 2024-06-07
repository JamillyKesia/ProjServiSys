import { Component } from '@angular/core';
import { OrdemService } from 'src/app/services/ordem.service';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';

@Component({
  selector: 'app-aprovacoes-pendentes',
  templateUrl: './aprovacoes-pendentes.component.html',
  styleUrls: ['./aprovacoes-pendentes.component.scss']
})
export class AprovacoesPendentesComponent {
  /*ordens = [
    { codigo: 'OS4567SA', solicitante: 'Juliana Nascimento' },
    { codigo: 'OS4567SA', solicitante: 'Juliana Nascimento' },
    { codigo: 'OS4567SA', solicitante: 'Patricia Santos' },
    { codigo: 'OS4567SA', solicitante: 'Ayrton Nascimento' }
  ];*/

  ordensPendentes: OrdemServico[] = [];

  constructor(private ordemService: OrdemService) {}

  ngOnInit() {
    this.loadOrdensPendentes();
  }

  loadOrdensPendentes() {
    this.ordemService.GetOrdemServico().subscribe(ordens => {
      this.ordensPendentes = ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.EmAnalise);
    });
  }

  aprovarOrdem(id: number) {
    this.ordemService.AprovarOrdem(id).subscribe(() => {
      this.loadOrdensPendentes();
    });
  }

  rejeitarOrdem(id: number) {
    this.ordemService.RejeitarOrdem(id).subscribe(() => {
      this.loadOrdensPendentes();
    });
  }

  
}
