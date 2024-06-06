import { Component } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
//import { SwitchService } from 'src/app/services/switch.service';
import { OrdemCompartilhadaService } from 'src/app/services/ordem-compartilhada.service';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';


@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent {
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

  // public filtrarOrdens(filtrarPor: string):any{
  //   filtrarPor = filtrarPor.toLocaleLowerCase();
  //   return this.ordens.filter( //o tema é oq vc vai filtrar, mudar pelo certo
  //   ordem.id.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || 
  //   ordem.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
  //     //(ordem: { tema: string; }) => ordem.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
  //     //||
  //     //ordem.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
  //   );
  // }

  public filtrarOrdens(filtrarPor: string): OrdemServico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.ordens.filter(
      ordem => ordem.descricaoProblema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
    );
  }
  
  constructor(
      //private modalSS: SwitchService,
      private ordemService: OrdemService,
      private ordemCompartilhadaService: OrdemCompartilhadaService
  ) {
      // console.log('TO AQUI', environment.api)
      //this.obterOrdensCadastradas();
  }

  public ngOnInit(){
   // this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor}); 
    this.GetOrdemServico();
  }

  public openModel2(id: number){
    const ordem = this.ordens.find(o => o.id === id);
    if (ordem) {
      this.ordemCompartilhadaService.mudarOrdem(ordem);
      this.modalSwitch = true;
    }
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

  // Expor o enum para o template
  estadoOrdemServicoEnum = EstadoOrdemServicoEnum;
  
  // Suponha que você tenha uma lista de ordens
  // ordens = [
  //   { estadoOrdemServico: EstadoOrdemServicoEnum.EmAndamento },
  //   { estadoOrdemServico: EstadoOrdemServicoEnum.Concluida },
  //   { estadoOrdemServico: EstadoOrdemServicoEnum.Rejeitado },
  //   { estadoOrdemServico: EstadoOrdemServicoEnum.EmAnalise }
  // ];


  // abrirModal(ordem: any) {
  //   console.log('Ordem selecionada:', ordem);
  // }
}
