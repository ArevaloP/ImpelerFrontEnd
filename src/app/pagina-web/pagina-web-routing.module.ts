import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaWebPrincipalComponent } from './pages/pagina-web-principal/pagina-web-principal.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaWebPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaWebRoutingModule { }
