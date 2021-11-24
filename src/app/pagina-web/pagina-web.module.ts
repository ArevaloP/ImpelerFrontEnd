import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginaWebRoutingModule } from './pagina-web-routing.module';
import { PaginaWebPrincipalComponent } from './pages/pagina-web-principal/pagina-web-principal.component';


@NgModule({
  declarations: [
    PaginaWebPrincipalComponent
  ],
  imports: [
    CommonModule,
    PaginaWebRoutingModule,
    FontAwesomeModule
  ]
})
export class PaginaWebModule { }
