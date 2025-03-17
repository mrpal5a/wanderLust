const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer")
const {storage} = require("../cloudConfig.js");
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

//combining the same  routes using router.route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
  // .post(upload.single("listing[image]"), (req, res) => {
  //   res.send(req.file.path); // this will give the image link that is uploaded on the cloudinary storage by user listing form
  //   console.log(req.file.filename); // this will print the filename 
  // });

//new Listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);
module.exports = router;
