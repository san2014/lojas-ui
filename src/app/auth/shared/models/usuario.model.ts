import { CrudModels } from './../../../shared/models/crud-models.model';

export interface UsuarioModel extends CrudModels {
  nome: string;
  login: string;
  email: string;
  senha: string;
  ativo: boolean;
}
