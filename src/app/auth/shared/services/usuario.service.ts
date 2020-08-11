import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../shared/interfaces/crud-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements CrudService {

  private basrUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  incluir(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.basrUrl}`, model);
  }

  excluir(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.basrUrl}/${id}`);
  }

  atualizar(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.basrUrl}`, model);
  }

  listar(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.basrUrl}`);
  }

  obter(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.basrUrl}/${id}`);
  }

  filtrar(model: UsuarioModel): Observable<UsuarioModel[]> {
    return this.http.post<UsuarioModel[]>(`${this.basrUrl}/filtrar`, model);
  }

}
