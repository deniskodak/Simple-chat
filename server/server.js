import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws';
import { useServer as useWsServer} from 'graphql-ws/lib/use/ws';

import { authMiddleware, handleLogin, decodeToken, handleSignup } from './auth.js';
import { resolvers } from './resolvers.js';
import { makeExecutableSchema } from '@graphql-tools/schema';


const PORT = 9000;

const app = express();
app.use(cors(), express.json());

app.post('/login', handleLogin);
app.post('/signup', handleSignup);

// Executes on each request and define if req has valid token
function getHttpContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.id };
  }
  return {};
}

// Executes on each ws connection and define if connection has valid token
function getWsContext({ connectionParams = {} }) {
  const accessToken = connectionParams.accessToken;
  if(!accessToken) return {}

  const claims = decodeToken(accessToken);
  return { userId: claims.id }
}

// graphql schemas
const typeDefs = await readFile('./schema.graphql', 'utf8');

// executable graphql schema
const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });

// apollo server connected to graphql executable schema
const apolloServer = new ApolloServer({ schema: graphqlSchema  });

// launches apollo server
await apolloServer.start();

// add graphql middleware to listen specific path
app.use('/graphql', authMiddleware, apolloMiddleware(apolloServer, {
  context: getHttpContext,
}));

// creates httpServer over the Express app.
const httpServer = createServer(app);

// creates websocket protocol over http server and has its path to listen 
const websocketServer = new WebSocketServer({ server: httpServer, path: '/graphql' })

// launches listening graphql websocket
useWsServer({ schema: graphqlSchema, context: getWsContext }, websocketServer);

// launches http server over express app
httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
