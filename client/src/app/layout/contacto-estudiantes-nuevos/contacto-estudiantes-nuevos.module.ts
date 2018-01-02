import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContactoEstudiantesNuevosRoutingModule } from './contacto-estudiantes-nuevos-routing.module';
import { ContactoEstudiantesNuevosComponent } from './contacto-estudiantes-nuevos.component';
import { PersonaService } from './../../CRUD/persona/persona.service';
import { CarreraService } from 'app/CRUD/carrera/carrera.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactoEstudiantesNuevosRoutingModule
  ],
  providers: [PersonaService, CarreraService],
  declarations: [ContactoEstudiantesNuevosComponent]
})
export class ContactoEstudiantesNuevosModule { }
