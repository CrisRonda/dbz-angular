import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { MaterialModule } from './material.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormCaracterComponent } from './components/form-caracter/form-caracter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, ApolloClientOptions } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { DialogComponent } from './components/dialog/dialog.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardCharacterComponent,
    FormCaracterComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({
          uri: environment.service_url,
        });
        const ws = new WebSocketLink({
          uri: environment.service_ws,
          options: {
            reconnect: true,
          },
        });
        const link = split(
          ({ query }) => {
            let definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          ws,
          http
        );
        return {
          cache: new InMemoryCache(),
          link: {
            ...link,
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:4200',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'application/json',
            },
          },
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
