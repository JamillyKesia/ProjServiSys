import { Component } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {  OnInit } from '@angular/core';
//import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-os',
  templateUrl: './modal-os.component.html',
  styleUrls: ['./modal-os.component.scss']
})
export class ModalOsComponent {

 
// @Component({
//   // eslint-disable-next-line @angular-eslint/component-selector
//   selector: 'demo-modal-service-component',
//   templateUrl: './service-component.html'
// })

//   bsModalRef?: BsModalRef;
//   constructor(private modalService: BsModalService) {}
 
//   openModalWithComponent() {
//     const initialState: ModalOptions = {
//       initialState: {
//         list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
//         title: 'Modal with component'
//       }
//     };
//     this.bsModalRef = this.modalService.show(ModalContentComponent, initialState);
//     this.bsModalRef.content.closeBtnName = 'Close';
//   }
// }
 
// /* This is a component which we pass in modal*/
 
// @Component({
//   // eslint-disable-next-line @angular-eslint/component-selector
//   selector: 'modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title pull-left">{{ title }}</h4>
//       <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
//         <span aria-hidden="true" class="visually-hidden">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <ul *ngIf="list.length">
//         <li *ngFor="let item of list">{{ item }}</li>
//       </ul>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{ closeBtnName }}</button>
//     </div>
//   `
// })
// export class ModalContentComponent implements OnInit {
//   title?: string;
//   closeBtnName?: string;
//   list: string[] = [];
 
//   constructor(public bsModalRef: BsModalRef) {}
 
//   ngOnInit() {
//     this.list.push('PROFIT!!!');
//   }
}


