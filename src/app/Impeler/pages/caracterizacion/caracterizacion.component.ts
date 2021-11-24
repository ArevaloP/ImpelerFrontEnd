import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from '@firebase/firestore';
import { switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { Departamento } from '../../interfaces/interfaces';
import { ImpelerService } from '../../services/impeler.service';

@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.css']
})
export class CaracterizacionComponent implements OnInit {


  ReactiveForm: FormGroup= this.fb.group({
    razon_social:['', [Validators.required, this.validatorService.nameVacio]],
    nit:[''],
    departamento: ['', [Validators.required]],
    municipio: [{value: '', disabled: true},[Validators.required]],
    formajuridica: ['',[Validators.required]],
    sec_economia: ['',[Validators.required]],
    act_economica: [{value:'', disabled: true},[Validators.required]],
    numero: ['', [Validators.required, Validators.max(9999999999), Validators.min(100)]],
    fecha: ['',[Validators.required]],
    direccion: ['']
  });

  departamentos: string[] =  [];
  municipios: Departamento[] =[];
  formaJuridica: string[] = [];

  Sector_Economia: string[] = [];
  Actividad_Economica:DocumentData[] =[];

  MsmMunicipio:boolean = true;
  MsmActividad: boolean = true;


  get usuario(){
    return this.authService.usuario;
  }

  get razomMsg(): string {
    const errors = this.ReactiveForm.get('razon_social')?.errors;

    if (errors?.required || errors?.vacio){
      return 'La razon social es obligatoria.';
    }

    return '';
  }

  get numMsg(): string {
    const errors = this.ReactiveForm.get('numero')?.errors;

    if (errors?.required || errors?.vacio){
      return 'El numero es obligatoria.';
    }else if(errors?.min || errors?.max){
      return 'Entre 3 y 10 digitos.';
    }

    return '';
  }

  

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private impelerService: ImpelerService,
              private validatorService: ValidatorsService,
              private router: Router) { }

  ngOnInit(){
    this.departamentos = this.impelerService.departamentos;

    this.formaJuridica = this.impelerService.FormaJuridica;

    this.Sector_Economia = this.impelerService.SectorEconomia;


    this.ReactiveForm.get('departamento')?.valueChanges
    .pipe(
      tap( ( _ ) =>{
        this.ReactiveForm.get('municipio')?.reset({value:'', disabled: false});
        if(this.ReactiveForm.get('departamento')?.value === ''){
          this.ReactiveForm.get('municipio')?.reset({value:'',disabled: true});
          this.MsmMunicipio = true;
        }
      }),
      switchMap(departamento => this.impelerService.getMunicipiosXDepartamento(departamento))
    )
    .subscribe(municipios => {
      this.municipios = municipios;
      if(this.ReactiveForm.get('departamento')?.value !== ''){
        this.MsmMunicipio = false;
      }
    });

    this.ReactiveForm.get('sec_economia')?.valueChanges.
    pipe(
      tap( ( _ )=>{
        this.ReactiveForm.get('act_economica')?.reset({value:'', disabled:  false});
        if (this.ReactiveForm.get('sec_economia')?.value === ''){
          this.ReactiveForm.get('act_economica')?.reset({value:'', disabled:true});
          this.MsmActividad = true;
        }
      })
    )
    .subscribe(sec_economia =>{
      this.impelerService.getActividadEconomicaXSector(sec_economia)
          .then(actividades => {

            const economia:DocumentData[] = []
            actividades.forEach(act=>{
              economia.push({
                ...act.data()
              });
            });
            this.Actividad_Economica = economia;
            if(this.ReactiveForm.get('sec_economia')?.value !== ''){
              this.MsmActividad = false;
            }
          });
    });

    console.log(this.usuario.uId);
  }

  campoValid(campo:string){
    return this.ReactiveForm.get(campo)?.invalid
            && this.ReactiveForm.get(campo)?.touched;
  }

  crearNegocio(){

    if(localStorage.getItem('token')){
      const {razon_social, nit, formajuridica, act_economica,
        sec_economia, direccion, departamento, municipio,
        fecha, numero} = this.ReactiveForm.value;
  
  
        this.impelerService.crearBuss(razon_social, nit, formajuridica, act_economica,
          sec_economia, direccion, departamento, municipio,
          fecha, numero, this.usuario.uId)
          .subscribe(ok =>{
            if(ok == true){
              this.router.navigateByUrl('/impeler/diagnostico');
            }else{
              console.log(ok);
            }
          });
    }else{
      this.router.navigateByUrl('/auth');
    }

    
  }
  
}

