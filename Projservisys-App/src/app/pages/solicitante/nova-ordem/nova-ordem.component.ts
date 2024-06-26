import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidatorField } from 'src/app/helpers/validator-field';
import { EstadoOrdemServicoEnum } from 'src/app/models/Enum/estado-ordem-servico-enum';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemService } from 'src/app/services/ordem.service';
//import { SwitchService } from 'src/app/services/switch.service';
import { OrdemCompartilhadaService } from 'src/app/services/ordem-compartilhada.service';

// Import Bootstrap's JS
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-nova-ordem',
  templateUrl: './nova-ordem.component.html',
  styleUrls: ['./nova-ordem.component.scss']
})
export class NovaOrdemComponent implements OnInit {
  condicao1: boolean = true;
  modalSwitch: boolean = false;
  formNO!: FormGroup;
  //ordens = new Observable<OrdemServico[]>();

  ordens = {} as OrdemServico;
  modalMessage: string = '';

  //ordens  : Ordem[] = []
  //get f(): any { return this.form.controls; }
  
  constructor(
  //private modalSS: SwitchService,
  private ordemService: OrdemService,
  private fb: FormBuilder,
  private ordemCompartilhadaService: OrdemCompartilhadaService) {}

  ngOnInit(): void{
    //this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor}); 
    this.validation();
  }

  get fn(): any {
    return this.formNO.controls;
  }

  private validation(): void {
    this.formNO = this.fb.group({
      localEquipamento: ['', Validators.required],
      tipoEquipamento: ['', Validators.required],
      serialEquipamento: ['',[Validators.required, Validators.minLength(4)]],
      posicaoEquipamento: ['', Validators.required],
      descricaoProblema: ['', [Validators.required]],
      estadoOrdemServico: [EstadoOrdemServicoEnum.EmAnalise, Validators.required]
    });
  }

  public resetForm(): void {
    this.formNO.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  //salvar ordens com api
  public salvarAlteracao(): void {
    if (this.formNO.valid) {
      this.ordens = { ...this.formNO.value };
      console.log('Dados da nova ordem:', this.ordens);

      this.ordemCompartilhadaService.mudarOrdem(this.ordens);
      this.ordemService.PostOrdemServico(this.ordens).subscribe(
        () => {
          this.showToast('successToast');
        },
        (error: any) => {
          console.error(error);
          this.showToast('errorToast');
        }
      );
    }
  }

  showToast(toastId: string): void {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const bootstrapToast = new bootstrap.Toast(toastElement);
      bootstrapToast.show();
    }
  }
}
