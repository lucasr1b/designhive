import { MongoClient, ServerApiVersion } from 'mongodb';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not defined');
}

const uri = MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

// Check if we are running in development mode
if (process.env.NODE_ENV === 'development') {
  // Ensure global is typed correctly
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;