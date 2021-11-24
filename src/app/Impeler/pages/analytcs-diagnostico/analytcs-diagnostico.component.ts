import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImpelerService } from '../../services/impeler.service';
import { DocumentData } from '@firebase/firestore';

@Component({
  selector: 'app-analytcs-diagnostico',
  templateUrl: './analytcs-diagnostico.component.html',
  styleUrls: ['./analytcs-diagnostico.component.css']
})
export class AnalytcsDiagnosticoComponent implements OnInit {

  get usuario (){
    return this.authService.usuario;
  }

  

  Respuestas: DocumentData[] = [];

  constructor(private authService: AuthService,
              private impelerService: ImpelerService) { }

  ngOnInit(): void {
    this.impelerService.obtenerAnswer(this.usuario.uId)
        .then(respuesta=>{
          const Answer: DocumentData[] = []; 
          respuesta.forEach(resp =>{
            Answer.push({
              ...resp.data()
            });
          });

          this.Respuestas = Answer;

        });
  }

  get porCliente(){
    var s = 0;
    let porcentaje;
      this.Respuestas.forEach( resp =>{
        if(resp.resp.p1 == 'SI'){
          s = s + 1;
        }
        if(resp.resp.p2 == 'SI'){
          s = s+1;
        }
        if(resp.resp.p3 == 'SI'){
          s = s+1;
        }
      })
      porcentaje = s/3*100;
      return porcentaje;
  }

  get porProValor(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p4 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p5 == 'SI'){
        s = s+1;
      }
    })
    porcentaje = s/2*100;
    return porcentaje;
  }

  get porReClave(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p6 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p7 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p8 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p9 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p10 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p11 == 'SI'){
        s = s+1;
      }
    })
    porcentaje = s/6*100;
    return porcentaje;
  }

  get porActClave(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p12 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p13 == 'SI'){
        s = s+1;
      }
    })
    porcentaje = s/2*100;
    return porcentaje;
  }

  get porFuenteIngreso(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p14 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p15 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p16 == 'SI'){
        s = s+1;
      }
    })
    porcentaje = s/3*100;
    return porcentaje;
  }

  get porCanal(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p17 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p18 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p19 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p20 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p21 == 'SI'){
        s = s + 1;
      }
    })
    porcentaje = s/5*100;
    return porcentaje;
  }

  get porRelClient(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p22 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p23 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p24 == 'SI'){
        s = s + 1;
      }
    })
    porcentaje = s/3*100;
    return porcentaje;
  }

  get porAsoClave(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p25 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p26 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p27 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p28 == 'SI'){
        s = s + 1;
      }
    })
    porcentaje = s/4*100;
    return porcentaje;
  }

  get porEstrCost(){
    var s = 0;
    let porcentaje;

    this.Respuestas.forEach( resp =>{
      if(resp.resp.p29 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p30 == 'SI'){
        s = s+1;
      }
      if(resp.resp.p31 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p32 == 'SI'){
        s = s + 1;
      }
      if(resp.resp.p33 == 'SI'){
        s = s + 1;
      }
    })
    porcentaje = s/5*100;
    return porcentaje;
  }






}
