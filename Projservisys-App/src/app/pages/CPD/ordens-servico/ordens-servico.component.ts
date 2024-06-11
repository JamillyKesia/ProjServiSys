import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ordens-servico',
  templateUrl: './ordens-servico.component.html',
  styleUrls: ['./ordens-servico.component.scss']
})
export class OrdensServicoComponent implements OnInit {
  public ordens: OrdemServico[] = [];
  public ordensFiltradas: OrdemServico[] = [];
  public ordemSelecionada: OrdemServico | undefined;
  modalRef?: BsModalRef;
  private _filtrosListado: string = '';

  public get filtroLista(): string {
    return this._filtrosListado;
  }

  public set filtroLista(value: string) {
    this._filtrosListado = value;
    this.ordensFiltradas = this.filtrarOrdens(this.filtroLista);
  }

  constructor(private ordemService: OrdemService, private modalService: BsModalService) {}

  public ngOnInit(): void {
    this.GetOrdemServico();
  }

  public openModal(template: TemplateRef<void>, id: number): void {
    this.ordemSelecionada = this.ordens.find(o => o.id === id);
    if (this.ordemSelecionada) {
      this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    }
  }

  public GetOrdemServico(): void {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        // Filtra as ordens aprovadas pelo CPD
        this.ordens = ordens.filter(
          ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Aprovada
        );
        this.ordensFiltradas = this.ordens;
      },
      error: (error: any) => console.log(error)
    });
  }

  public filtrarOrdens(tipoFiltro: string): OrdemServico[] {
    if (tipoFiltro === 'todas') {
      return this.ordens;
    } else if (tipoFiltro === 'Concluida') {
      return this.ordens.filter(ordens => ordens.estadoOrdemServico === EstadoOrdemServicoEnum.Concluida);
    } else if (tipoFiltro === 'Em Andamento') {
      return this.ordens.filter(ordens => ordens.estadoOrdemServico === EstadoOrdemServicoEnum.EmAndamento);
    } else {
      return [];
    }
  }

  public getBadgeClass(estado: EstadoOrdemServicoEnum): string {
    switch (estado) {
      case EstadoOrdemServicoEnum.EmAndamento:
        return 'badge-warning';
      case EstadoOrdemServicoEnum.Concluida:
        return 'badge-success';
      case EstadoOrdemServicoEnum.NaoAprovada:
        return 'badge-danger';
      case EstadoOrdemServicoEnum.EmAnalise:
        return 'badge-secondary';
      default:
        return 'badge-primary';
    }
  }

  // Expor o enum para o template
  estadoOrdemServicoEnum = EstadoOrdemServicoEnum;
}
