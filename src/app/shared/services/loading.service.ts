import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  mostrar = new Subject<boolean>();

  public mostrarLoad() {
    this.mostrar.next(true);
  }

  public ocultarLoad() {
    this.mostrar.next(false);
  }

}
