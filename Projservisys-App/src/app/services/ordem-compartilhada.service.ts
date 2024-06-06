import { Injectable } from '@angular/core';
import { OrdemServico } from '../models/ordem-servico';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompartilhadaService {

  private ordemSource = new BehaviorSubject<OrdemServico | null>(null);
  ordemAtual = this.ordemSource.asObservable();

  constructor() { }

  mudarOrdem(ordens: OrdemServico) {
    this.ordemSource.next(ordens);
  }
}
