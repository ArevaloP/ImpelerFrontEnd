import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalytcsDiagnosticoComponent } from './pages/analytcs-diagnostico/analytcs-diagnostico.component';
import { CaracterizacionComponent } from './pages/caracterizacion/caracterizacion.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'caracterizacion',
        component: CaracterizacionComponent
      },
      {
        path: 'diagnostico',
        component: DiagnosticoComponent
      },
      {
        path: 'analytcs',
        component: AnalytcsDiagnosticoComponent
      },
      {
        path: '**',
        redirectTo: 'caracterizacion'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpelerRoutingModule { }