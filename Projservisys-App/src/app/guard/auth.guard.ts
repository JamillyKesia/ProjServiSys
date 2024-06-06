import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, _state) => {
  return true;

  const router = inject(Router);
  //const toaster = inject(ToastrService);

  if (localStorage.getItem('user') !== null) {
    return true;
  }

  //toaster.info('Usuário não autenticado!');
  router.navigate(['/login']);
  return false;

  // constructor(
  //   private router:Router
  //   //private toaster: ToastrService
  // ) {}

  // if(localStorage.getItem('user') !== null ){
  //   return true;
  // }

  // //this.toaster.info('Usuário não autenticado!');
  // this.router.navigate(['/login']);
  // return false;
};
