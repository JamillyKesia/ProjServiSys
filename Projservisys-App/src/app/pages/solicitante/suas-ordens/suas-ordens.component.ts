import { Component } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
//import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-suas-ordens',
  templateUrl: './suas-ordens.component.html',
  styleUrls: ['./suas-ordens.component.scss']
})
export class SuasOrdensComponent {

  // ordens = [
  //   { id: 'OS4568SA', status: 'Em andamento', data: '14-09-2023' },
  //   { id: 'OS4567SA', status: 'Concluída', data: '11-07-2023' },
  //   { id: 'OS4566SA', status: 'Rejeitado', data: '27-06-2023' }
  // ]

  botaoSelecionado: number = 0;
  ordemSelecionada: any = null;

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
    //private modalSS: SwitchService,
    private ordemService: OrdemService
  ) { }

  ngOnInit(): void {
    //this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor}); 
    this.GetOrdemServico();
  }

  /*selecionarBotao(opcao: number): void {
    // Limpar a ordem selecionada quando um botão é clicado
    this.ordemSelecionada = null;

    // Lógica para selecionar a opção do botão
    if (opcao === 1) {
      // Todas as ordens
      this.ordens = this.obterTodasAsOrdens();
    } else if (opcao === 2) {
      // Ordens concluídas
      this.ordens = this.filtrarOrdensConcluidas();
    } else if (opcao === 3) {
      // Ordens rejeitadas
      this.ordens = this.filtrarOrdensRejeitadas();
    }
  }*/

  obterTodasAsOrdens(): any[] {
    return this.ordens; // Implemente a lógica adequada aqui
  }

 /* filtrarOrdensConcluidas(): any[] {
    return this.ordens.filter(ordem => ordem.status === 'Concluída');
  }

  filtrarOrdensRejeitadas(): any[] {
    return this.ordens.filter(ordem => ordem.status === 'Rejeitado');
  }*/

  /*// Método para ativar o botão
  activeButton(botao: BotaoFiltroComponent): void {
    botao.activeButton();
  }

  // Método para definir o estado do botão (ativo/desativado)
  setActiveButton(botao: Suas, status: boolean): void {
    botao.setActiveButton(status);
  }*/

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
