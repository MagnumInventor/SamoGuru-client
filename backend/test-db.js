const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://MainLocalPC:TWFpbkxvY2FsUEM@samoguruclustera.9otyd1u.mongodb.net/?retryWrites=true&w=majority&appName=SamoGuruClusterA";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v13,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ ТЕСТОВЕ Підключення до MongoDB успішне!");
  } catch (e) {
    console.error("❌ Помилка підключення до ТЕСТОВОГО сервера MongoDB:", e);
  } finally {
    await client.close();
  }
}

run();
