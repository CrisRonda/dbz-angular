import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-form-caracter',
  templateUrl: './form-caracter.component.html',
  styleUrls: ['./form-caracter.component.css'],
})
export class FormCaracterComponent implements OnInit {
  private regexHttps = /(http|https)?:\/\/(\S+)/;
  loading = true;

  races = [
    { id: 1, label: 'Sayan' },
    { id: 2, label: 'Humano' },
    { id: 3, label: 'Namekiano' },
    { id: 4, label: 'Alien' },
    { id: 5, label: 'Androide' },
    { id: 6, label: 'Desconocido' },
  ];
  initialValues = {
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(64)],
    ],
    race: ['', [Validators.required]],
    image: ['', [Validators.required, Validators.pattern(this.regexHttps)]],
    power: ['', [Validators.required]],
  };
  formData = this.form.group(this.initialValues);
  constructor(
    private form: FormBuilder,
    private CharacterService: CharacterService
  ) {}
  ngOnInit(): void {}

  getErrorMessage(field: string): string {
    let mesj;
    const _field = this.formData.get(field);
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
    const _field = this.formData.get(field);
    const fieldActions = _field.touched || _field.dirty;
    return fieldActions && !_field.valid;
  }
  onSubmit(): void {
    if (this.formData.invalid) return;
    const formValues = this.formData.value;
    const formatValues = { ...formValues, race: formValues.race.label };
    this.CharacterService.create({
      values: formatValues,
      onSuccess: () => this.formData.reset(),
    });
  }
}
