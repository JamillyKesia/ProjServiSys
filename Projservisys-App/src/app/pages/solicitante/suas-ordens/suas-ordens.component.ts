import { Component } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';

import { OrdemService } from 'src/app/services/ordem.service';

@Component({
  selector: 'app-suas-ordens',
  templateUrl: './suas-ordens.component.html',
  styleUrls: ['./suas-ordens.component.scss']
})
export class SuasOrdensComponent {

  botaoSelecionado: number = 0;
  ordemSelecionada: any = null;

  modalSwitch: boolean = false;

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
    private ordemService: OrdemService
  ) { }

  ngOnInit(): void {
    this.GetOrdemServico();
  }

  public mostrarTodas(): void {
    this.ordensFiltradas = this.ordens;
  }

  public mostrarConcluidas(): void {
    this.ordensFiltradas = this.ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.Concluida);
  }

  public mostrarRejeitadas(): void {
    this.ordensFiltradas = this.ordens.filter(ordem => ordem.estadoOrdemServico === EstadoOrdemServicoEnum.NaoAprovada);
  }

  public GetOrdemServico(): void {
    this.ordemService.GetOrdemServico().subscribe({
      next: (ordens: OrdemServico[]) => {
        this.ordens = ordens;
        this.ordensFiltradas = this.ordens;
      },
      error: (error:any) => console.log(error)
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

}
