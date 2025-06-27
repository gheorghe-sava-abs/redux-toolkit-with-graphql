import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './resolvers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path,
      extensions: error.extensions
    };
  }
});

// Start the server
async function startServer() {
  await server.start();
  
  // Apply middleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // You can add authentication, authorization, etc. here
      return { req };
    }
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      graphqlEndpoint: '/graphql'
    });
  });

  // Start listening
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${PORT}`);
    console.log(`📊 GraphQL Playground available at http://localhost:${PORT}/graphql`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down GraphQL server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down GraphQL server...');
  process.exit(0);
});

// Start the server
startServer().catch(console.error); 