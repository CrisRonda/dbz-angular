import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.css'],
})
export class CardCharacterComponent implements OnInit {
  characters: Character[];
  loading = true;
  constructor(
    private CharacterService: CharacterService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.CharacterService.getAllCharacters(({ characters, loading }) => {
      this.characters = characters;
      this.loading = loading;
    });
    this.CharacterService.onCreateSubscribe(({ newCharacter }) => {
      const prevCharacters = [...this.characters, newCharacter];
      this.characters = [];
      prevCharacters.forEach((item) => this.characters.push(item));
    });
    this.CharacterService.onDeleteSubscribe(({ key }) => {
      const prevCharacters = this.characters.filter(
        (item) => item.name !== key
      );
      this.characters = [];
      prevCharacters.forEach((item) => this.characters.push(item));
    });
  }
  deleteCharacter(character: Character) {
    const res = window.confirm('¿Estás seguro de eliminar este personaje?');
    if (res) {
      this.CharacterService.delete(character.name);
    }
  }
  openDialog(character: Character): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: character,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
