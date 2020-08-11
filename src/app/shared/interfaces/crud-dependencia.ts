/**
 * Classe utilizada para injetar as dependências nas telas de CRUD. ex: Carregar dados de um comboBox ao iniciar tela.
 * A classe CrudBase chama o método carregarDependencias ao iniciar (onInit), lendo assim o array de dependências
 * e chamando os métodos configurados na propriedade 'metodo' da classe.
 */

export class CrudDependencia {

  propriedade: string;
  service: any;
  metodo: string;

  constructor(propriedade: string, service?: any, metodo?: string) {
    this.propriedade = propriedade;
    this.service = service;
    this.metodo = metodo;
  }

}
