import { LoginResult } from '../../entidades/especifico/Login-Result';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// SERVICIOS
import { PersonaService } from 'app/CRUD/persona/persona.service';
import { GeneroService } from 'app/CRUD/genero/genero.service';
import { EtniaService } from 'app/CRUD/etnia/etnia.service';
import { TipoIngresosService } from 'app/CRUD/tipoingresos/tipoingresos.service';
import { OcupacionService } from 'app/CRUD/ocupacion/ocupacion.service';
import { TipoDiscapacidadService } from 'app/CRUD/tipodiscapacidad/tipodiscapacidad.service';
import { TipoSangreService } from 'app/CRUD/tiposangre/tiposangre.service';
import { EstadoCivilService } from 'app/CRUD/estadocivil/estadocivil.service';
import { TituloService } from 'app/CRUD/titulo/titulo.service';
import { EstudianteService } from 'app/CRUD/estudiante/estudiante.service';
import { TipoInstitucionProcedenciaService } from 'app/CRUD/tipoinstitucionprocedencia/tipoinstitucionprocedencia.service';
import { NivelTituloService } from 'app/CRUD/niveltitulo/niveltitulo.service';
import { UbicacionService } from 'app/CRUD/ubicacion/ubicacion.service';
// ENTIDADES
import { Persona } from 'app/entidades/CRUD/Persona';
import { Genero } from 'app/entidades/CRUD/Genero';
import { Etnia } from 'app/entidades/CRUD/Etnia';
import { TipoIngresos } from 'app/entidades/CRUD/TipoIngresos';
import { Ocupacion } from 'app/entidades/CRUD/Ocupacion';
import { TipoDiscapacidad } from 'app/entidades/CRUD/TipoDiscapacidad';
import { TipoSangre } from 'app/entidades/CRUD/TipoSangre';
import { EstadoCivil } from 'app/entidades/CRUD/EstadoCivil';
import { Titulo } from 'app/entidades/CRUD/Titulo';
import { TipoInstitucionProcedencia } from 'app/entidades/CRUD/TipoInstitucionProcedencia';
import { NivelTitulo } from 'app/entidades/CRUD/NivelTitulo';
import { Ubicacion } from 'app/entidades/CRUD/Ubicacion';
import { Estudiante } from 'app/entidades/CRUD/Estudiante';
@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
    busy: Promise<any>;
    personaLogeada: Persona;
    rol: number;
    estudiante: Estudiante;
    generos: Genero[] = [];
    etnias: Etnia[] = [];
    tiposIngresos: TipoIngresos[] = [];
    tiposSangre: TipoSangre[] = [];
    estadosCivil: EstadoCivil[] = [];
    titulos: Titulo[] = [];
    tiposInstitucionProcedencia: TipoInstitucionProcedencia[] = [];
    nivelesTitulo: NivelTitulo[] = [];
    ubicaciones: Ubicacion[] = [];
    paises: Ubicacion[] = [];
    provinciasDomicilio: Ubicacion[] = [];
    cantonesDomicilio: Ubicacion[] = [];
    parroquiasDomicilio: Ubicacion[] = [];
    provinciasNacimiento: Ubicacion[] = [];
    cantonesNacimiento: Ubicacion[] = [];
    parroquiasNacimiento: Ubicacion[] = [];
    ocupaciones: Ocupacion[] = [];
    tiposDiscapacidad: TipoDiscapacidad[] = [];
    tieneDiscapacidad: Boolean;
    esEstudiante: Boolean;
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
        private personaDataService: PersonaService,
        private generoDataService: GeneroService,
        private estadoCivilDataService: EstadoCivilService,
        private etniaDataService: EtniaService,
        private tipoSangreDataService: TipoSangreService,
        private ingresosDataService: TipoIngresosService,
        private ocupacionDataService: OcupacionService,
        private tipoDiscapacidadDataService: TipoDiscapacidadService,
        private ubicacionDataService: UbicacionService,
        private nivelTituloDataService: NivelTituloService,
        private estudianteDataService: EstudianteService,
        private tipoInstitucionProcedenciaService: TipoInstitucionProcedenciaService) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.esEstudiante = false;
        this.estudiante = new Estudiante();
        this.tieneDiscapacidad = false;
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        this.personaLogeada = logedResult.persona;
        this.rol = logedResult.idRol;
        this.busy = this.generoDataService.getAll()
        .then(respuesta => {
            this.generos = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.estadoCivilDataService.getAll()
        .then(respuesta => {
            this.estadosCivil = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.etniaDataService.getAll()
        .then(respuesta => {
            this.etnias = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoSangreDataService.getAll()
        .then(respuesta => {
            this.tiposSangre = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ingresosDataService.getAll()
        .then(respuesta => {
            this.tiposIngresos = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ocupacionDataService.getAll()
        .then(respuesta => {
            this.ocupaciones = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoDiscapacidadDataService.getAll()
        .then(respuesta => {
            this.tiposDiscapacidad = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ubicacionDataService.getAll()
        .then(respuesta => {
            this.ubicaciones = respuesta;
            this.paises = [];
            this.ubicaciones.forEach(element => {
                if (element.codigoPadre == null) {
                    this.paises.push(element);
                }
            });
            this.getProvinciasDomicilio();
            this.getCantonesDomicilio();
            this.getParroquiasDomicilio();
            this.getProvinciasNacimiento();
            this.getCantonesNacimiento();
            this.getParroquiasNacimiento();
        })
        .catch(error => {

        });
        this.busy = this.nivelTituloDataService.getAll()
        .then(respuesta => {
            this.nivelesTitulo = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoInstitucionProcedenciaService.getAll()
        .then(respuesta => {
            this.tiposInstitucionProcedencia = respuesta;
        })
        .catch(error => {

        });
        if (this.personaLogeada.carnetConadis === 'true') {
            this.tieneDiscapacidad = true;
        } else {
            this.tieneDiscapacidad = false;
        }
        if (this.rol === 2 || this.rol === 6) {
            this.esEstudiante = true;
            this.busy = this.estudianteDataService.getFiltrado('idPersona', 'coincide', this.personaLogeada.id.toString())
            .then(respuesta => {
                this.estudiante = respuesta[0];
            })
            .catch(error => {
                // Error
            });
        } else {
            this.esEstudiante = false;
        }
    }

    getProvinciasDomicilio() {
        this.provinciasDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioPais) {
                this.provinciasDomicilio.push(element);
            }
        });
    }

    cancelar(): void {
        this.toastr.warning('Los cambios fueron descartados', 'Actualización');
        this.ngOnInit();
    }

    getCantonesDomicilio() {
        this.cantonesDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioProvincia) {
                this.cantonesDomicilio.push(element);
            }
        });
    }

    getParroquiasDomicilio() {
        this.parroquiasDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioCanton) {
                this.parroquiasDomicilio.push(element);
            }
        });
    }

    getProvinciasNacimiento() {
        this.provinciasNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoPais) {
                this.provinciasNacimiento.push(element);
            }
        });
    }

    getCantonesNacimiento() {
        this.cantonesNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoProvincia) {
                this.cantonesNacimiento.push(element);
            }
        });
    }

    getParroquiasNacimiento() {
        this.parroquiasNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoCanton) {
                this.parroquiasNacimiento.push(element);
            }
        });
    }

    TieneDiscapacidad() {
        if (this.tieneDiscapacidad) {
            this.tieneDiscapacidad = false;
            this.personaLogeada.carnetConadis = 'false';
        } else {
            this.tieneDiscapacidad = true;
            this.personaLogeada.carnetConadis = 'true';
        }

    }

   update(personaParaActualizar: Persona): void {
        this.busy = this.personaDataService.update(personaParaActualizar)
        .then(respuesta => {
            if (respuesta) {
                this.toastr.success('La actualización fue exitosa', 'Actualización');
                const newLogResult = new LoginResult();
                newLogResult.idRol = this.rol;
                newLogResult.persona = personaParaActualizar;
                localStorage.setItem('logedResult', JSON.stringify(newLogResult));
            } else {
                this.toastr.warning('Se produjo un error', 'Actualización');
            }
            this.ngOnInit();
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }
}
