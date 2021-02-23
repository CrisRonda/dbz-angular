import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  private regexHttps = /(http|https)?:\/\/(\S+)/;
  races = [
    { id: 1, label: 'Sayan' },
    { id: 2, label: 'Humano' },
    { id: 3, label: 'Namekiano' },
    { id: 4, label: 'Alien' },
    { id: 5, label: 'Androide' },
    { id: 6, label: 'Desconocido' },
  ];
  initialValues = {
    id: [this.data.id, [Validators.required]],
    name: [
      this.data.name,
      [Validators.required, Validators.minLength(4), Validators.maxLength(64)],
    ],
    race: [
      this.races.find((item) => item.label === this.data.race),
      [Validators.required],
    ],
    image: [
      this.data.image,
      [Validators.required, Validators.pattern(this.regexHttps)],
    ],
    power: [this.data.power, [Validators.required]],
  };
  formData = this.form.group(this.initialValues);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Character,
    private CharacterService: CharacterService
  ) {}
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
  onSubmit() {
    const formValues = this.formData.value;
    const formatValues = { ...formValues, race: formValues.race.label };
    this.CharacterService.update({
      values: formatValues,
      onSuccess: () => this.dialogRef.close(),
    });
  }
}
