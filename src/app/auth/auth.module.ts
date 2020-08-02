import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbPasswordStrategyModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule
} from '@nebular/theme';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    AuthRoutingModule,

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
  ],
})
export class AuthModule {
}