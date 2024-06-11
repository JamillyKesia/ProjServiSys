import { Component, TemplateRef } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent {
  modalSwitch: boolean = false;

  public ordens: OrdemServico[] = [];
  public ordensFiltradas: OrdemServico[] = [];
  public ordemSelecionada: OrdemServico | undefined;

  private _filtrosListado: string = '';

  public get filtroLista(): string {
    return this._filtrosListado;
  }

  public set filtroLista(value: string) {
    this._filtrosListado = value;
    this.ordensFiltradas = this.filtroLista ? this.filtrarOrdens(this.filtroLista) : this.ordens;
  }

  public filtrarOrdens(filtrarPor: string): OrdemServico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.ordens.filter(
      ordem => ordem.descricaoProblema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
    );
  }
  
  modalRef?: BsModalRef;

  constructor(
      private ordemService: OrdemService,
      private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<void>, id: number) {
    this.ordemSelecionada = this.ordens.find(o => o.id === id);
    if (this.ordemSelecionada) {
      this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    }
  }

  public ngOnInit() {
    this.GetOrdemServico();
  }

  public GetOrdemServico(): void {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        this.ordens = ordens;
        this.ordensFiltradas = this.ordens;
      },
      error: (error: any) => console.log(error)
    });
  }

  estadoOrdemServicoEnum = EstadoOrdemServicoEnum;

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
}
