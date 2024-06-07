import { Component, OnInit } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';

@Component({
  selector: 'app-ordens-servico',
  templateUrl: './ordens-servico.component.html',
  styleUrls: ['./ordens-servico.component.scss']
})
export class OrdensServicoComponent implements OnInit {
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

  constructor(private ordemService: OrdemService) {}

  public ngOnInit(): void {
    this.GetOrdemServico();
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

  // Expor o enum para o template
  estadoOrdemServicoEnum = EstadoOrdemServicoEnum;
}
