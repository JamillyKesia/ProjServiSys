import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/identity/user';

// Import Bootstrap's JS
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {
  user = {} as User;
  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      tipoUsuario: ['', Validators.required],
      cargo: ['', Validators.required]
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe(
      () => {
        this.router.navigateByUrl('/area-adm');
        this.showToast('successToast');
      },
      (error: any) => {
        this.showToast('errorToast');
        // Handle error (optional)
      }
    );
  }

  showToast(toastId: string): void {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const bootstrapToast = new bootstrap.Toast(toastElement);
      bootstrapToast.show();
    }
  }
}
