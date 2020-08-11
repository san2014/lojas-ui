import { CrudModels } from './../models/crud-models.model';
import { Observable } from 'rxjs';
/**
 * Interface para definir comportamento dos services de CRUD da aplicação
 * A classe CrudBase utiliza essa abstração para operar os 'CRUDS'.
 */

export interface CrudService {
  incluir(model: any): Observable<CrudModels>;
  excluir(id: number): Observable<boolean>;
  atualizar(model: any): Observable<CrudModels>;
  listar(): Observable<CrudModels[]>;
  obter(id: number): Observable<CrudModels>;
  filtrar(model: any): Observable<CrudModels[]>;
}
