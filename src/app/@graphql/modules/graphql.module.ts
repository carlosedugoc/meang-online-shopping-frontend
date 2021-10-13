import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, from, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from "@apollo/client/link/error"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'http://localhost:2004/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });


  const urlLink = from([errorLink, httpLink.create({uri})])

  const subscriptionLink = new WebSocketLink({
    uri: 'ws://localhost:2004/graphql',
    options: {
      reconnect: true
    }
  })

  const link = split(({query})=> {
    const {kind, operation}: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  subscriptionLink,
  urlLink)

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}


