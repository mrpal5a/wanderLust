const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:{
     type:Number,
     default:0,
    },
    location:String,
    country:String,
    reviews :[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner :{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete", async (listing)=>{ // listing ka data fetch karega jis listing ko hum delete kr rahe honge
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}}); // uss particular listing ke andar jitne bhi reviews honge wo bhi delete ho jayenge
    }else{
        next();
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;