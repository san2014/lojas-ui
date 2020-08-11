import { UsuarioModel } from './../../shared/models/usuario.model';
import { UsuarioService } from '../../shared/services/usuario.service';
import { FormValidations } from './../../../shared/classes/form-validations';
import { Component, Inject, Injector } from '@angular/core';
import { NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudBase } from '../../../shared/classes/crud-base';

@Component({
  selector: 'ngx-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent extends CrudBase {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: UsuarioModel;

  formulario: FormGroup;

  constructor(
    protected usuarioService: UsuarioService,
    protected injector: Injector,
  ) {
    super(usuarioService, injector);
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      login: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, [Validators.required, FormValidations.equalsTo('senha')]],
    });
  }

}
