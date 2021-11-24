import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, TwitterAuthProvider} from 'firebase/auth';

import { environment } from 'src/environments/environment';
import {auth} from 'src/app/shared/firebase/firebase-impeler';
import { AuthResponse, Usuario } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }


  register(nombre: string, apellido: string, email: string, password: string){
    const url = `${this.baseUrl}/auth/new`;

    const body = {nombre, apellido, email, password};

    return this.http.post<AuthResponse>(url,body)
      .pipe( 
        tap( ({ok, token}) => {
          if (ok){
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }


  login(email: string, password: string){
    
    const url = `${this.baseUrl}/auth`;
    const body = {email, password}

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => {
        if (resp.ok){
          localStorage.setItem('token', resp.token!);
        }
      }),
      map( valid => valid.ok),
      catchError(err => of(err.error.msg))
    );
  }

  loginSocial(nombre: string, img: string, email: string, provedor: string){

    const body = {nombre, img, email, provedor};
    const url = `${this.baseUrl}/auth/loginSocial`;
    return this.http.post<AuthResponse>(url, body)
              .pipe(
                tap(resp=>{
                  if(resp.ok){
                    localStorage.setItem('token', resp.token!);
                  }
                }),
                map( valid => valid.ok),
                catchError(err => of(err.error.msg))
              );
  }


  loginFacebook(){
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result)=>{
        console.log(result);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  loginTwitter(){
    const provider = new TwitterAuthProvider();

    signInWithPopup(auth, provider)
        .then((result)=>{
          console.log(result);
        })
        .catch((error)=>{
          console.log(error);
        })
  }

  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token')|| '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map (resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            uId: resp.uid!,
            Nombre: resp.nombre!,
            email: resp.email!,
            Apellido: resp.apellido!,
            img: resp.img!
          }
          return resp.ok
        }),
        catchError(err => of(false))
      )
    }

    logOut(){
      localStorage.clear();
    }


}
