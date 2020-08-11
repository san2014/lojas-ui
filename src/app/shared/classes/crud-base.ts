import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CrudService } from '../interfaces/crud-service';
import { CrudDependencia } from '../interfaces/crud-dependencia';
import { LoadingService } from '../services/loading.service';
import { CrudModels } from '../models/crud-models.model';

export abstract class CrudBase implements OnInit, OnDestroy {

  formulario: FormGroup;
  formBuilder: FormBuilder;
  inscricoes$: Subscription[] = [];
  activatedRoute: ActivatedRoute;
  router: Router;

  dependencias: CrudDependencia[] = [];
  idEdit: number;
  model: CrudModels;
  _erPath = /^((\/[^\/]+){2})\/.*$/;
  _path = '';
  blockAcoes = false;

  loadingService: LoadingService;

  constructor(
    protected service: CrudService,
    protected injector: Injector,
  ) { }

  ngOnDestroy(): void {
    this.inscricoes$.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    this.injetarServicos();
    this.extrairParamsRota();
    this.registrarDependencias();
    this.carregarDependencias();
    this.configForm();
    this.detalhar();
  }

  abstract async configForm();

  instanciar() {}

  registrarDependencias() {}

  popularForm() {}

  async posDetalhar() {
    this.popularForm();
  };

  preInserir(): any {}

  preAtualizar(): any {}

  injetarServicos() {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.loadingService = this.injector.get(LoadingService);
  }

  async carregarDependencias() {
    for (let row of this.dependencias) {
      const dep = await eval(`row.service.${row.metodo}.toPromise()`);
      eval(`this.${row.propriedade} = ${JSON.stringify(dep)}`);
    }
  }

  async detalhar() {
    if (this.idEdit) {
      try {
        if (this.idEdit) {
          this.model = await this.service.obter(this.idEdit).toPromise();
          await this.posDetalhar();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async inserir() {
    try {
      const crudObj = await this.preInserir();
      const insert = crudObj ? crudObj : this.model;
      const saved = await this.service.incluir(insert).toPromise();
      this.idEdit = saved.id;
      this.handlerRecarregar();
    } catch (error) {
      console.error(error);
    }
  }

  async atualizar() {
    try {
      const crudObj = await this.preAtualizar();
      const update = crudObj ? crudObj : this.model;
      await this.service.atualizar(update).toPromise();
      this.handlerRecarregar();
    } catch (error) {
      console.error(error);
    }
  }

  public cancelar() {
    this.router.navigate([this._path]);
  }

  public recarregar() {
    this.router.navigate([`${this._path}/editar/${this.idEdit}`]);
  }

  handlerCancelar() {
    this.formulario.disable();
    setTimeout(() => {
      this.cancelar();
      this.formulario.enable();
    }, 1000);
  }

  handlerRecarregar() {
    this.blockAcoes = true;
    setTimeout(() => {
      this.recarregar();
      this.blockAcoes = false;
    }, 1000);
  }

  registrarDependencia(propriedade: string, service: any, metodo: string) {
    const dep: CrudDependencia = new CrudDependencia(propriedade, service, metodo);
    this.dependencias.push(dep);
  }

  extrairParamsRota() {
    this.idEdit = this.activatedRoute.snapshot.params['id'];
    this._path = this.router.url.replace(this._erPath, '$1');
  }

  mostrarLoad() {
    this.loadingService.mostrarLoad();
  }

  ocultarLoad() {
    this.loadingService.ocultarLoad();
  }

  observeCrud(event) {
    switch (event) {
      case 'inserir':
        this.inserir();
        break;
      case 'atualizar':
        this.atualizar();
        break;
      case 'cancelar':
        this.handlerCancelar();
        break;
      default:
        break;
    }
  }

  classeCss(campo) {
    const input = this.formulario.get(campo);
    if (this.hasSuccess(input)) {
      return 'success';
    }
    if (this.hasError(input)) {
      return 'danger';
    }
    return 'basic';
  }

  hasSuccess(input): boolean {
    return input.valid && (input.dirty || input.touched);
  }

  hasError(input): boolean {
    return input.invalid && (input.dirty || input.touched);
  }

  resetForm() {
    this.formulario.reset();
  }
}
