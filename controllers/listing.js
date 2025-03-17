const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        //here we are populating each review so that we can access the author of each review
        path: "author",
      },
    })
    .populate("owner"); // this will populate the owner of listing
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exists");
    res.redirect("/listings");
  }
  res.render("show.ejs", { listing });
};
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlist = new Listing(req.body.listing);
  newlist.owner = req.user._id;
  newlist.image = {url, filename};
  await newlist.save();
  req.flash("success", "New Listing added successfully");
  res.redirect("/listings");
};
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listingData = await Listing.findById(id);
  if (!listingData) {
    req.flash("error", "Listing you requested for doesn't exists");
    return res.redirect("/listings");
  }
  let originalImageUrl = listingData.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/");
  res.render("edit.ejs", { listingData, originalImageUrl });
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // yeh khali form ke data ko update kr dega
  if(typeof req.file !== "undefined"){ // agar user  ne new file upload ki hogi to hi listing ki image ko update krna hai
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename}; // yeh per hum listing ki image ko upload kr rahe hai or save kr rahe hai
    await listing.save(); //listing image ko database mai update kr rahe hai
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted  successfully");
  res.redirect("/listings");
};
