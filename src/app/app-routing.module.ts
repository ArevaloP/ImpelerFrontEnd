import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pagina-web/pagina-web.module').then(m => m.PaginaWebModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'impeler',
    loadChildren: () => import('./Impeler/impeler.module').then(m => m.ImpelerModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
