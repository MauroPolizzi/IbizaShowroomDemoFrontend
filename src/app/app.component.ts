import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IbizaServiceService } from 'src/services/ibiza-service.service';
import { ProductoModel } from './models/producto-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IbizaShowroomDemo';

  productos:any[] = [];
  producto = new ProductoModel();

  constructor( private service: IbizaServiceService ){

    this.service.getProductos()
      .subscribe( (data: any) => {
        //console.log(data);
        this.productos = data;
        console.log(this.productos);
    })
  }

  // postProducto( producto: ProductoModel ) {

  //   console.log(producto);
  //   this.service.postProducto( producto )
  //       .subscribe( (resp: any) => {
  //         //this.producto = resp;
  //         //this.productos.push(this.producto);
  //         this.producto.id = resp.id;
  //         console.log('respuesta del componente:', this.producto);
  //         //console.log(resp);
  //       } );
  // }

  deleteProducto(producto: ProductoModel, i: number){

    if (producto.id) {

      //this.service.getProducto(producto.id);
      this.productos.splice(i, 1);
      this.service.deleteProducto(producto.id)
          .subscribe((resp: any) => 
            { 
              console.log('resp: ', resp); 
            });
    }else{
      console.log("No existe el producto.");
      return;
    }

    //this.service.deleteProducto(producto.id).subscribe();

    // PROBAR CON EL MODULO O ARCHIVO DE RUTAS
    
  }


  guardar( form ) {

    let peticion: Observable<any>;

    //console.log('producto: ', this.producto)

    // let payload: ProductoModel = {
    //   nombre: form.controls.nombre.value = this.producto.nombre,
    //   descripcion: form.controls.descripcion.value = this.producto.descripcion,
    //   cantidad: form.controls.cantidad.value = this.producto.cantidad,
    //   precio: form.controls.precio.value = this.producto.precio,
    //   estaBorrado: this.producto.estaBorrado,
    //   id: this.producto.id
    // }

    let payload: ProductoModel = {
      nombre: form.controls.nombre.value,
      descripcion: form.controls.descripcion.value,
      cantidad: form.controls.cantidad.value,
      precio: form.controls.precio.value,
      estaBorrado: this.producto.estaBorrado,
      id: this.producto.id
    }


    //this.producto.nombre = form.controls.nombre.value
    //console.log( payload );
    peticion = this.service.postProducto( payload );

    peticion.subscribe( (resp: any) => {
      this.producto = resp;
      console.log('respuesta: ', this.producto); 

    } )

  }
}
