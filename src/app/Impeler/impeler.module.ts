import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpelerRoutingModule } from './impeler-routing.module';
import { CaracterizacionComponent } from './pages/caracterizacion/caracterizacion.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalytcsDiagnosticoComponent } from './pages/analytcs-diagnostico/analytcs-diagnostico.component';


@NgModule({
  declarations: [
    CaracterizacionComponent,
    DiagnosticoComponent,
    AnalytcsDiagnosticoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImpelerRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ImpelerModule { }