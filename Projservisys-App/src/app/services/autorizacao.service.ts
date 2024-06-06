import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  static obterLoginStatus() {
    throw new Error('Method not implemented.');
  }

  autorizado = false;

  constructor() { }

  autorizar(){
    localStorage.setItem("login","sim");
  }

  deslogar(){
    localStorage.clear();
  }

  //se n existir nada retorna falso, se existir retorna true
  obterLoginStatus = ()  => !!localStorage.getItem("login"); 

}
