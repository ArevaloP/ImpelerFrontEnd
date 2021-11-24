import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { collection, doc, DocumentData, getDocs, orderBy, query, setDoc, where } from '@firebase/firestore';

import { Departamento, ServiceResponse } from '../interfaces/interfaces';
import {db} from 'src/app/shared/firebase/firebase-impeler';
import {environment} from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ImpelerService{

  private BaseUrl: string = 'https://www.datos.gov.co/resource/xdk5-pm3f.json?';
  private baseUrl: string = environment.baseUrl;

  private _departamentos: string[] = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía',
    'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo',
    'Quindío', 'Risaralda', 'Archipiélago de San Andrés, Providencia y Santa Catalina', 'Santander',
    'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada',];

  private _FormaJuridica: string[] = ['Persona natural comerciante', 'Empresa unipersonal', 
    'Sociedades por Acciones Simplificadas (S.A.S.)', 'Sociedad limitada', 'Sociedad colectiva', 
    'Sociedad en Comandita Simple (S. en C.)', 'Sociedad Anónima (S.A.)', 
    'Sociedad en Comandita por Acciones (S.C.A)', 'Empresa Asociativa de Trabajo (E.A.T)', 
    'Sociedad Agrarria de Transformación (S.A.T)', 'Establecimiento de comercio'];

  private _SectorEconomia: string[] = [
    'AGRICULTURA, GANADERÍA, CAZA, SILVICULTURA Y PESCA',
    'EXPLOTACIÓN DE MINAS Y CANTERAS',
    'INDUSTRIAS MANUFACTURERAS',
    'SUMINISTRO DE ELECTRICIDAD, GAS, VAPOR Y AIRE ACONDICIONADO',
    'DISTRIBUCIÓN DE AGUA; EVACUACIÓN Y TRATAMIENTO DE AGUAS RESIDUALES, GESTIÓN DE DESECHOS Y ACTIVIDADES DE SANEAMIENTO AMBIENTAL',
    'CONSTRUCCIÓN',
    'COMERCIO AL POR MAYOR Y AL POR MENOR; REPARACIÓN DE VEHÍCULOS AUTOMOTORES Y MOTOCICLETAS',
    'TRANSPORTE Y ALMACENAMIENTO',
    'ALOJAMIENTO Y SERVICIOS DE COMIDA',
    'INFORMACIÓN Y COMUNICACIONES',
    'ACTIVIDADES FINANCIERAS Y DE SEGUROS',
    'ACTIVIDADES INMOBILIARIAS',
    'ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS',
    'ACTIVIDADES DE SERVICIOS ADMINISTRATIVOS Y DE APOYO',
    'ADMINISTRACIÓN PÚBLICA Y DEFENSA; PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLIGATORIA',
    'EDUCACIÓN',
    'ACTIVIDADES DE ATENCIÓN DE LA SALUD HUMANA Y DE ASISTENCIA SOCIAL',
    'ACTIVIDADES ARTÍSTICAS, DE ENTRETENIMIENTO Y RECREACIÓN',
    'OTRAS ACTIVIDADES DE SERVICIOS',
    'ACTIVIDADES DE LOS HOGARES INDIVIDUALES EN CALIDAD DE EMPLEADORES; ACTIVIDADES NO DIFERENCIADAS DE LOS HOGARES INDIVIDUALES COMO PRODUCTORES DE BIENES Y SERVICIOS PARA USO PROPIO',
    'ACTIVIDADES DE ORGANIZACIONES Y ENTIDADES EXTRATERRITORIALES ',
    'OTRAS CLASIFICACIONES ',
  ]

  get departamentos():string[]{
    return [...this._departamentos];
  }

  get FormaJuridica():string[]{
    return [...this._FormaJuridica];
  }

  get SectorEconomia():string[]{
    return [...this._SectorEconomia];
  }

  constructor(private http: HttpClient) { }

  getMunicipiosXDepartamento(departamento: string): Observable<Departamento[]>{

    const url: string = `${this.BaseUrl}departamento=${departamento}`;

    return this.http.get<Departamento[]>(url);

  }

  async getActividadEconomicaXSector(sector: string){
    const actRef = collection(db,"ActEconomica");

    const q = await query(actRef, where("Sector_Economia","==", sector));

    return getDocs(q);

  }

  async getPreguntas(){
    const preguntasRef = collection(db, "Preguntas");

    const q = await query(preguntasRef, orderBy("numero"));

    return getDocs(q);
  }

  async createAnswer(respuestas: any, uid: string){
    const data = {
      identifiacdor: uid,
      resp: respuestas
    }

    const docRef = await setDoc(doc(db, 'Respuestas', uid), data);

    return docRef;
  }

 async  obtenerAnswer(Uid: string){
    const resRef = collection(db, "Respuestas");
    const q = await query(resRef, where("identifiacdor","==", Uid));

    return getDocs(q);
  }

  crearBuss(razon_social:string, nit:string, forma_juridica: string, act_economica: string,
            sect_economico: string, direccion: string, departamento: string, ciudad: string,
            fec_creacion: string, contacto: string, id_user: string){

      const url = `${this.baseUrl}/auth/newBuss`;

      const body = {razon_social, nit, forma_juridica, act_economica, sect_economico,
                    direccion, departamento, ciudad, fec_creacion, contacto, id_user};

      
        return this.http.post<ServiceResponse>(url,body)
                .pipe(
                  map(resp => resp.ok),
                  catchError(err => of(err.error.msg))
                );
  }


}
