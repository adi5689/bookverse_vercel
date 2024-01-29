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
    const id = req.params.id;
    const updateBookData = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = {upsert: true};

    const updateDoc = {
      $set: {
        ...updateBookData
      }
    }
    //update
    const result = await bookCollections.updateOne(filter, updateDoc, options);
    return result;
 } finally {
    await client.close();
 }
}

module.exports = async (req, res) => {
 const result = await run();
 res.send(result);
}
