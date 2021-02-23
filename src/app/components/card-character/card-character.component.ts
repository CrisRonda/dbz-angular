import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_CHARACTERS = gql`
  {
    character {
      id
      name
      race
      image
      power
    }
  }
`;

const DELETE_CHARACTERS = gql`
  mutation deleteCharacter($name: String!) {
    deleteCharacter(name: $name)
  }
`;

const ON_CREATE_SUSCRIPTION = gql`
  subscription newCharacter {
    newCharacter {
      id
      name
      power
      image
      race
    }
  }
`;
const ON_DELETE_SUSCRIPTION = gql`
  subscription oldCharacter {
    oldCharacter
  }
`;
@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.css'],
})
export class CardCharacterComponent implements OnInit {
  query;
  characters: Character[];
  loading = true;
  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: GET_CHARACTERS,
    });

    this.apollo
      .subscribe({
        query: ON_CREATE_SUSCRIPTION,
      })
      .subscribe(
        ({ data }) => {
          const prevCharacters = [...this.characters, data['newCharacter']];
          this.characters = [];
          prevCharacters.forEach((item) => this.characters.push(item));
        },
        (err) => console.log(err)
      );
    this.apollo
      .subscribe({
        query: ON_DELETE_SUSCRIPTION,
      })
      .subscribe(
        ({ data }) => {
          if (data['oldCharacter']) {
            const prevCharacters = this.characters.filter(
              (item) => item.name !== data['oldCharacter']
            );
            this.characters = [];
            prevCharacters.forEach((item) => this.characters.push(item));
          }
        },
        (err) => console.log(err)
      );
    this.query.valueChanges.subscribe(({ data, loading }) => {
      console.log(data.character);
      this.loading = loading;
      this.characters = data.character;
    });
  }
  deleteCharacter(name: string) {
    const res = window.confirm('¿Estás seguro de eliminar este personaje?');
    if (res) {
      this.apollo
        .mutate<Boolean>({
          mutation: DELETE_CHARACTERS,
          // refetchQueries: [{ query: GET_CHARACTERS }],
          variables: { name },
        })
        .subscribe(({ data }) => {
          // console.log(data);
        });
    }
  }
}
