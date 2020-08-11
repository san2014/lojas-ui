import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class FormValidations {

  static regexChave = '^(j{1}|J{1})[a-zA-Z0-9_]{7}$';

  static equalsTo(otherField: string) {

    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls) {
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };

    return validator;

  }


  static validaCpf(controle: AbstractControl) {

    const cpf = controle.value;

    let soma = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) {

      valido = false;

    } else {

      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }

      if (resto !== parseInt(cpf.substring(9, 10), 10)) {
        valido = false;
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }

      if (resto !== parseInt(cpf.substring(10, 11), 10)) {
        valido = false;
      } else {
        valido = true;
      }

    }

    if (valido) {
      return null;
    }

    return { cpfInvalido: true };

  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {

    const config = {
      required: `${fieldName}: é obrigatório.`,
      minlength: `${fieldName}: precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName}: precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      equalsTo: 'Campos não são iguais',
      pattern: 'Campo inválido',
      cpfInvalido: 'Cpf inválido'
    };

    return config[validatorName];

  }

}
