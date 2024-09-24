import express from "express";
import cors from "cors";
import axios from "axios";
import { MongoClient } from "mongodb";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const myuri=""

const app = express();
const port = 8080;


const client = new MongoClient(uri); // Create client - Think of it as a live connection
await client.connect(); // Connect client to server
const database = client.db("music"); // Access the database on server
let soundsCollection = null;



let datas = await database.listCollections({}, { nameOnly: true }).toArray();
datas.filter((collectionName) => {
  return collectionName === "datas";
});

if (datas.length == 0 ) {
  soundsCollection = await database.createCollection("datas");


app.use(cors(corsOptions));

app.post('/savedata', async (req, res) => {
  const newData = new Data(req.body);
  console.log(req.body);
  await newData.save();
  res.status(201).send(newData);
});

app.get("/flights/sort=:sorT&start=:start&end=:end&to=:to", async (req, res) => {
  let route;
  if (req.params.to !== '') {
    route = 'route=' + req.params.to;
  } else {
    route = '';
  }
  const sorT = req.params.sorT;
  const start = req.params.start;
  const end = req.params.end;

  try {
    const response = await axios.get(`https://api.schiphol.nl/public-flights/flights?${route}&includedelays=false&page=0&sort=${sorT}&fromScheduleDate=${start}&toScheduleDate=${end}`, {
      headers: {
        "resourceversion": "v4",
        "app_id": "55dc9a45",
        "app_key": "c5568451fe8477667aba81c920b4d7fd",
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/destinations/:location", async (req, res) => {
  const location = req.params.location;

  try {
    const response = await axios.get(`https://api.schiphol.nl/public-flights/destinations/${location}`, {
      headers: {
        "Accept": "application/json",
        "resourceversion": "v4",
        "app_id": "55dc9a45",
        "app_key": "c5568451fe8477667aba81c920b4d7fd",
      },
    });
    //console.log("Başarılı!");
    //console.log(response.data.city);
    res.send(response.data.city);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/airline/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const response = await axios.get(`https://api.schiphol.nl/public-flights/airlines/${code}`, {
      headers: {
        "Accept": "application/json",
        "resourceversion": "v4",
        "app_id": "55dc9a45",
        "app_key": "c5568451fe8477667aba81c920b4d7fd",
      },
    });
    //console.log("Başarılı!");
    //console.log(response.data.publicName);
    res.send(response.data.publicName);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/alldestinations", async (req, res) => {

  try {
    const totalPages = 10;
    const requests = [];
    for (let page = 1; page <= totalPages; page++) {

      requests.push(
        axios.get(`https://api.schiphol.nl/public-flights/destinations?page=${page}&sort=%2Biata`, {
          headers: {
            "Accept": "application/json",
            "resourceversion": "v4",
            "app_id": "55dc9a45",
            "app_key": "c5568451fe8477667aba81c920b4d7fd",
          },
        })
      );
    }

    const responses = await Promise.all(requests);
    const allCities = responses.flatMap(response => response.data.destinations
      .filter(dest => dest.iata)
      .map(dest => [dest.iata, dest.publicName.english])
    );

    //console.log(allCities);
    res.send(allCities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
