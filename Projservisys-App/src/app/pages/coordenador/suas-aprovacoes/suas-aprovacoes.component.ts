import { Component, OnInit } from '@angular/core';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemCompartilhadaService } from 'src/app/services/ordem-compartilhada.service';
import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-suas-aprovacoes',
  templateUrl: './suas-aprovacoes.component.html',
  styleUrls: ['./suas-aprovacoes.component.scss']
})
export class SuasAprovacoesComponent implements OnInit {
  public ordens: OrdemServico[] = [];
  public ordensFiltradas: OrdemServico[] = [];

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

  constructor(
    private ordemService: OrdemService,
    private ordemCompartilhadaService: OrdemCompartilhadaService
  ) {}

  public ngOnInit(): void {
    this.GetOrdemServico();
  }

  public openModel2(id: number): void {
    const ordem = this.ordens.find(o => o.id === id);
    if (ordem) {
      this.ordemCompartilhadaService.mudarOrdem(ordem);
    }
  }

  public GetOrdemServico(): void {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        // Filtra as ordens que são 'Aprovada' ou 'NaoAprovada'
        this.ordens = ordens.filter(ordem => 
          ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Aprovada ||
          ordem.estadoOrdemServico === EstadoOrdemServicoEnum.NaoAprovada
        );
        this.ordensFiltradas = this.ordens;
      },
      error: (error: any) => console.log(error)
    });
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
