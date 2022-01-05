import { connectToDatabase } from "../../util/mongodb";
import { MongoClient } from "mongodb";

const MONGODB_URI =
	"mongodb+srv://omkardb_user:7d5TkISfS51JPwHU@omkardb.lsnqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_DB = "DAC";
const client = new MongoClient(MONGODB_URI);
//const client = new MongoClient(uri);

async function createProject(document) {
	try {
		await client.connect();
		const database = client.db(MONGODB_DB);
		const project = database.collection("project");
		// create a document to insert
		const doc = document || { name: "name", desription: "desciption" };
		const result = await project.insertOne(doc);
		console.log(`A document was inserted with the _id: ${result.insertedId}`);
	} finally {
		await client.close();
	}
}
//run().catch(console.dir);

export default async (req, res) => {
	if (req.method === "GET") {
		console.log("Method", req.method);
		console.log("Body", req.body);
		console.log("Query", req.query);
		let name = req.query.name === undefined ? "" : req.query.name;
		let description =
			req.query.description === undefined ? "" : req.query.description;
		let filter = "";
		filter = "{ name: /" + name + "/i , description: /" + description + "/i }";
		//console.log(JSON.parse(filter));
		const { db } = await connectToDatabase();

		const project = await db
			.collection("project")
			.find({
				name: { $regex: name, $options: "i" },
				description: { $regex: description, $options: "i" },
			})
			.sort({ metacritic: -1 })
			.limit(20)
			.toArray();

		//res.json(project);
		res.json(JSON.stringify(project, null, "\t"));
	} else if (req.method === "POST") {
		console.log("Method", req.method);
		console.log("Body", req.body);
		createProject(req.body);
		res.json(req.body);
	}
};
