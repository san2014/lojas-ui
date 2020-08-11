import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'ngx-input',
  templateUrl: './ngx-input.component.html',
  styles: [
  ]
})
export class NgxInputComponent implements OnInit, AfterContentInit {

  @Input() id: string;
  @Input() label: string;
  @Input() control: any;

  input: any;

  @ContentChild(NgModel, {static: true}) ngModel: NgModel;
  @ContentChild(FormControlName, {static: true}) formControl: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.input = this.ngModel || this.formControl;
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
    }
  }

}
