import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../app/models/producto-model';

@Injectable({
  providedIn: 'root'
})
export class IbizaServiceService {

  private url = '/api/';
  //private urlFB = 'https://heroes-app-c65f2.firebaseio.com';


  constructor( private http: HttpClient ) { }

  getQuery( query:string ) {

    const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET, POST');
        //headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Origin', '*');

    const url = `/api/${ query }`;


    return this.http.get( url, {headers} );
  }

  getProductos(){
    return this.getQuery("producto/getproductos")
      .pipe( map( data => data ) );
  }

  getProducto( id: string ){
    return this.http.get( `${ this.url }producto/getproducto/${ id }` );
  }

  postProducto( producto: ProductoModel ){

    // return this.getQuery("producto/postproducto")
    //   .pipe( map( (resp: any) => {
    //     //producto = resp;
    //     console.log('respuesta del servicio' , resp);
    //   } ) );

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Headers: Origin', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    //headers.set('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');


    return this.http.post( `${ this.url }producto/postproducto` ,producto, {headers} )
        .pipe( map( (resp: any) => {

          console.log(resp);
          producto.id = resp.id;
          console.log('respuesta del servicio1', producto);
          //console.log('respuesta del servicio2', producto = resp);
        } ) );


    //return this.http.post(`${ this.url }producto/postproducto`, producto,{headers: {"Content-Type": "application/json"}});
  }

  // createProduct(producto: ProductModel) {   
  //   return this.http.post(`${ this.url }producto/postproducto`, producto,{headers: {"Content-Type": "application/json"}}); 
  // }

  deleteProducto(id: string){

    return this.http.delete( `${ this.url }producto/deleteproducto/${ id }` );

    // Revisar que al hacer un DELETE pega en la url incorrecta
    // esta pegando en 'localhost:4200', la url del front
    // cuando deberia pegarr en 'localhost:44355', la url de la api
  }

}
