import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ValidatorField } from 'src/app/helpers/validator-field';
import { User } from 'src/app/models/identity/user';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent {
  user = {} as User;
  form!: FormGroup;

  constructor(public fb: FormBuilder,
              private accountService: AccountService,
              private router: Router
  ) { }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {

    // const formOptions: AbstractControlOptions = {
    //   validators: ValidatorField.MustMatch('password', 'confirmePassword')
    // };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3),]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      tipoUsuario: ['', Validators.required],
      cargo: ['', Validators.required]
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  register(): void {
    this.user = { ... this.form.value }
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/area-adm')
      //(error: any) => this.toaster.error(error.error);
    )
  }

}
