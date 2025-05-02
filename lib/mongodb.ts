import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect().then((connectedClient) => {
    console.log('✅ MongoDB connected successfully');
    return connectedClient;
  }).catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    throw err;
  });
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

