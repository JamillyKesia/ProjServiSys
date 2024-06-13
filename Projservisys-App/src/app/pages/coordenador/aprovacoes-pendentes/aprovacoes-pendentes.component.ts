import { Component, TemplateRef, OnInit } from '@angular/core';
import { OrdemService } from 'src/app/services/ordem.service';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-aprovacoes-pendentes',
  templateUrl: './aprovacoes-pendentes.component.html',
  styleUrls: ['./aprovacoes-pendentes.component.scss']
})
export class AprovacoesPendentesComponent implements OnInit {
  public ordensPendentes: OrdemServico[] = [];
  public ordemSelecionada: OrdemServico | undefined;
  modalRef?: BsModalRef;

  constructor(
    private ordemService: OrdemService, 
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadOrdensPendentes();
  }

  openModal(template: TemplateRef<void>, id: number) {
    this.ordemSelecionada = this.ordensPendentes.find(o => o.id === id);
    if (this.ordemSelecionada) {
      this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    }
  }

  loadOrdensPendentes() {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        this.ordensPendentes = ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.EmAnalise);
      },
      error: (error: any) => console.log(error)
    });
  }

  aprovarOrdem(id: number | undefined) {
    if (id !== undefined) {
      this.ordemService.mudarStatus(id, 'Aprovado').subscribe({
        next: () => {
          this.ordensPendentes = this.ordensPendentes.filter(ordem => ordem.id);
          this.modalRef?.hide();
        },
        error: (error: any) => console.log(error)
      });
    }
  }

  rejeitarOrdem(id: number | undefined) {
    if (id !== undefined) {
      this.ordemService.mudarStatus(id, 'Rejeitado').subscribe({
        next: () => {
          this.ordensPendentes = this.ordensPendentes.filter(ordem => ordem.id !== id);
          this.modalRef?.hide();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
}
