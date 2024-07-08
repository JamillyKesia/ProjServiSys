import { Component } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';


@Component({
  selector: 'app-pagina-inicial-cpd',
  templateUrl: './pagina-inicial-cpd.component.html',
  styleUrls: ['./pagina-inicial-cpd.component.scss']
})
export class PaginaInicialCpdComponent {

  modalSwitch: boolean = false;

  public ordens: OrdemServico[] = [];
  public ordensFiltradas: OrdemServico[] = [];

  private _filtrosListado: string = '';

  public get filtroLista(): string{
    return this._filtrosListado;
  }

  public set filtroLista(value: string){
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
    private ordemService: OrdemService) {
  }

  public ngOnInit(){
    this.GetOrdemServico();
  }

  public openModel2(){
    this.modalSwitch = true;
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

}
