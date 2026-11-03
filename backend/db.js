import { MongoClient } from 'mongodb';

export const mongoClient = new MongoClient(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  { serverSelectionTimeoutMS: 5000 },
);

export async function connectDatabase() {
  await mongoClient.connect();
  const database = mongoClient.db(process.env.MONGODB_DB || 'stripesense');

  await database.collection('users').createIndex({ email: 1 }, { unique: true });
  await database.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true });
  await database
    .collection('sessions')
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await database
    .collection('patients')
    .createIndex({ ownerId: 1, patientCode: 1 }, { unique: true });
  const indexes = await database.collection('patients').indexes();
  if (indexes.some((index) => index.name === 'patientCode_1')) {
    await database.collection('patients').dropIndex('patientCode_1');
  }
  await database
    .collection('tests')
    .createIndex({ ownerId: 1, patientId: 1, createdAt: -1 });

  return database;
}
