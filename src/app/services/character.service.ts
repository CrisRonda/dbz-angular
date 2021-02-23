import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Character } from '../models/character';

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

const ADD_CHARACTER = gql`
  mutation createCharacter(
    $name: String!
    $power: String!
    $image: String!
    $race: String!
  ) {
    createCharacter(name: $name, power: $power, image: $image, race: $race) {
      name
      power
      race
      image
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private apollo: Apollo) {}

  getAllCharacters(callback: Function) {
    this.apollo
      .watchQuery({
        query: GET_CHARACTERS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        callback({ characters: data['character'], loading });
      });
  }

  create({ values, onSuccess }: { values: Object; onSuccess: Function }) {
    this.apollo
      .mutate<Character>({
        mutation: ADD_CHARACTER,
        variables: values,
      })
      .subscribe(
        () => onSuccess(),
        (err) => console.log(err)
      );
  }
  delete(name: String) {
    this.apollo
      .mutate<Boolean>({
        mutation: DELETE_CHARACTERS,
        variables: { name },
      })
      .subscribe(({ data }) => {
        console.log(data);
      });
  }

  onCreateSubscribe(callback: Function): void {
    this.apollo
      .subscribe({
        query: ON_CREATE_SUSCRIPTION,
      })
      .subscribe(
        ({ data }) => {
          callback({ newCharacter: data['newCharacter'] });
        },
        (err) => console.log(err)
      );
  }

  onDeleteSubscribe(callback: Function) {
    this.apollo
      .subscribe({
        query: ON_DELETE_SUSCRIPTION,
      })
      .subscribe(
        ({ data }) => {
          if (data['oldCharacter']) {
            callback({ key: data['oldCharacter'] });
          }
        },
        (err) => console.log(err)
      );
  }
}
