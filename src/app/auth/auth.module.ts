import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
} from '@nebular/theme';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    AuthRoutingModule,
    SharedModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: 'http://localhost:3000',
          login: {
            endpoint: '/v1/usuarios/login',
            defaultErrors: ['Credenciais invalidas, tente novamente.'],
            defaultMessages: ['Logado com sucesso.'],
          },
          logout: {
            endpoint: '/v1/usuarios/logout',
          },
          requestPass: {
            endpoint: '/v1/usuarios/pedirSenha',
          },
          resetPass: {
            endpoint: '/v1/usuarios/resetarSenha',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
            error: true,
          },
        },
      },
    }),
  ],
  declarations: [
    LoginComponent,
    RegistrarComponent,
  ],
})
export class AuthModule {
}
