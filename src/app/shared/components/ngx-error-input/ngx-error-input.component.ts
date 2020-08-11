import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormValidations } from "../../classes/form-validations";

@Component({
  selector: "ngx-error-input",
  templateUrl: "./ngx-error-input.component.html",
  styles: [],
})
export class NgxErrorInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;

  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        (this.control.dirty || this.control.touched)
      ) {
        return FormValidations.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
