
// this file is just created for inserting the initial data to the database
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

MONGO_URL = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:'67cf824c80d28b8b0315204e'}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized")
};
initDB();