import 'dotenv/config';
import { connectDatabase, mongoClient } from './db.js';
import { createApp } from './app.js';

try {
  const db = await connectDatabase();
  const server = createApp(db).listen(Number(process.env.PORT || 3000), 'localhost', () =>
    console.log('StripeSense API: http://localhost:' + (process.env.PORT || 3000)),
  );
  for (const signal of ['SIGINT', 'SIGTERM'])
    process.on(signal, () =>
      server.close(async () => {
        await mongoClient.close();
        process.exit(0);
      }),
    );
} catch (error) {
  console.error(
    'Cannot start API. Start MongoDB or configure MONGODB_URI in .env. ' + error.message,
  );
  await mongoClient.close();
  process.exitCode = 1;
}
