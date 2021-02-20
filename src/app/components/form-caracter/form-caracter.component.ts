import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-caracter',
  templateUrl: './form-caracter.component.html',
  styleUrls: ['./form-caracter.component.css'],
})
export class FormCaracterComponent implements OnInit {
  private regexHttps = /(http|https)?:\/\/(\S+)/;

  races = [
    { id: 1, label: 'Sayan' },
    { id: 2, label: 'Humano' },
    { id: 3, label: 'Namekiano' },
    { id: 4, label: 'Alien' },
    { id: 5, label: 'Androide' },
    { id: 6, label: 'Desconocido' },
  ];
  loginForm = this.form.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(64)],
    ],
    race: ['', [Validators.required]],
    image: ['', [Validators.required, Validators.pattern(this.regexHttps)]],
    power: ['', [Validators.required]],
  });
  constructor(private form: FormBuilder) {}
  getErrorMessage(field: string): string {
    let mesj;
    const _field = this.loginForm.get(field);
    if (_field.hasError('required')) {
      mesj = 'Campo requerido';
    }
    if (_field.hasError('pattern')) {
      mesj = 'No es un valor válido';
    }
    if (_field.hasError('minLength')) {
      const minLength = _field.errors?.minLength;
      mesj = `Ingresa ${minLength} caracteres`;
    }
    if (_field.hasError('maxLength')) {
      const maxLength = _field.errors?.maxLength;
      mesj = `Ingresa máximo ${maxLength} caracteres`;
    }
    return mesj;
  }
  isValidField(field: string): boolean {
    const _field = this.loginForm.get(field);
    const fieldActions = _field.touched || _field.dirty;
    return fieldActions && !_field.valid;
  }
  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const formValues = this.loginForm.value;
    console.log(formValues);
  }
  ngOnInit(): void {}
}
