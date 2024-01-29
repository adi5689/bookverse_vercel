const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI; 

const client = new MongoClient(uri, {
 serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
 }
});

async function run() {
 try {
    await client.connect();
    const bookCollections = client.db("BookInventory").collection("books");
    let query = {};
    if(req.query?.category){
      query = {category: req.query.category}
    }
    const result = await bookCollections.find(query).toArray();
    return result;
 } finally {
    await client.close();
 }
}

module.exports = async (req, res) => {
 const result = await run();
 res.send(result);
}
