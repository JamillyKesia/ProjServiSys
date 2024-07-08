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
  public novoStatus: EstadoOrdemServicoEnum = EstadoOrdemServicoEnum.EmAndamento;
  modalRef?: BsModalRef;
  private _filtroListado: string = '';

  estadoOrdemServicoEnum = EstadoOrdemServicoEnum;

  public get filtroLista(): string {
    return this._filtroListado;
  }

  public set filtroLista(value: string) {
    this._filtroListado = value;
    this.ordensFiltradas = this.filtrarOrdens(this.filtroLista);
  }

  constructor(
    private ordemService: OrdemService,
    private modalService: BsModalService,
  ) {}

  public ngOnInit(): void {
    this.GetOrdemServico();
  }

  public openModal(template: TemplateRef<void>, id: number): void {
    this.ordemSelecionada = this.ordens.find(o => o.id === id);
    if (this.ordemSelecionada) {
      this.novoStatus = this.ordemSelecionada.estadoOrdemServico;
      this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    }
  }

  public GetOrdemServico(): void {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        this.ordens = ordens.filter(
          ordem => 
            ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Aprovada ||
            ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Concluida ||
            ordem.estadoOrdemServico === EstadoOrdemServicoEnum.EmAndamento ||
            ordem.estadoOrdemServico === EstadoOrdemServicoEnum.ItemParaCompra
        );
        this.ordensFiltradas = this.ordens;
      },
      error: (error: any) => console.log(error)
    });
  }

  public filtrarOrdens(tipoFiltro: string): OrdemServico[] {
    if (tipoFiltro === 'todas') {
      return this.ordens;
    } else if (tipoFiltro === 'concluidas') {
      return this.ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Concluida);
    } else if (tipoFiltro === 'emandamento') {
      return this.ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.EmAndamento);
    } else if (tipoFiltro === 'itemparacompra') {
      return this.ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.ItemParaCompra);
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
      case EstadoOrdemServicoEnum.ItemParaCompra:
        return 'badge-info';
      case EstadoOrdemServicoEnum.Aprovada:
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  }

  public salvarStatus(): void {
    if (this.ordemSelecionada && this.novoStatus != null) {
      this.ordemService.mudarStatus(this.ordemSelecionada.id, this.novoStatus).subscribe({
        next: () => {
          this.GetOrdemServico();
          this.modalRef?.hide();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
  
  
}
