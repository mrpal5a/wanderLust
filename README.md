WanderLust
A full‑stack Node.js app to browse, create, and manage travel listings with image uploads, reviews, and authentication. Built with Express, MongoDB/Mongoose, EJS, Tailwind CSS, Passport, and Cloudinary.

Features

Listings CRUD

Create, view, edit, and delete listings

Cloudinary image upload via Multer

Server-side validation with Joi

Reviews

Add and delete reviews with ratings (1–5)

Automatic cleanup of reviews when a listing is deleted

Authentication and Authorization

Local strategy with Passport

Protected routes for creating/editing/deleting listings and reviews

Ownership checks for editing/deleting listings

Review-author checks for deleting reviews

Sessions and Flash

MongoDB-backed sessions (connect-mongo)

Flash messages for success/error

UI

EJS templates (ejs-mate layouts/partials)

Tailwind CSS styling

Tech Stack

Runtime: Node.js 20.17.0

Web: Express, EJS, ejs-mate, method-override

Data: MongoDB, Mongoose

Auth: Passport, passport-local, passport-local-mongoose

Validation: Joi

Uploads: Multer, Cloudinary (multer-storage-cloudinary)

Sessions: express-session, connect-mongo

Styles: Tailwind CSS, PostCSS, Autoprefixer

Utilities: dotenv, connect-flash, uuid

Getting Started

Prerequisites

Node.js v20.17.0

MongoDB (Atlas connection recommended)

Cloudinary account

Installation

Clone and install

git clone (https://github.com/mrpal5a/wanderLust)

cd wanderLust

npm install

Set environment variables
Create a .env file in the project root:

NODE_ENV=development

ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD__API_KEY=your_cloudinary_api_key Note: Name matches the code (double underscore after CLOUD)

CLOUD_API_SECRET=your_cloudinary_api_secret

Build styles (optional in dev)

npm run build:css
This runs Tailwind in watch mode and outputs to public/css/output.css.

Start the app

node app.js
The server runs on http://localhost:8081

Project Structure

app.js — App bootstrap, DB connect, middleware, routes, error handling

cloudConfig.js — Cloudinary + Multer storage configuration

middleware.js — Auth and validation middleware (isLoggedIn, isOwner, isReviewAuthor, validateListing, validateReview)

schema.js — Joi schemas for listings and reviews

controllers/

listing.js — Handlers for listings

reviews.js — Handlers for reviews

routes/

listings.js — /listings routes

review.js — /listings/:id/reviews routes

user.js — Authentication routes (required by app.js; ensure file exists)

models/

listing.js — Listing schema/model

review.js — Review schema/model

user.js — User schema/model with passport-local-mongoose (ensure file exists)

views/

listings/ — EJS templates for pages

error.ejs — Error template

public/

css/ — Tailwind input and compiled output

js/, images/ — Static assets

utils/

wrapAsync.js — Async error wrapper

ExpressError.js — Custom error class

tailwind.config.js, postcss.config.js — Styling toolchain

package.json — Dependencies and scripts

Routing Overview

Listings

GET /listings — All listings

GET /listings/new — New listing form (auth)

POST /listings — Create listing (auth, image upload field name: listing[image])

GET /listings/:id — Show a listing

GET /listings/:id/edit — Edit form (auth + owner)

PUT /listings/:id — Update listing (auth + owner, optional new image)

DELETE /listings/:id — Delete listing (auth + owner)

Reviews

POST /listings/:id/reviews — Add review (auth)

DELETE /listings/:id/reviews/:reviewId — Delete review (auth + author)

Users

See routes in routes/user.js (login, register, logout). Ensure user.js is present.

Data Models

Listing

title: string, required

description: string

image: { url: string, filename: string }

price: number, default 0

location: string

country: string

owner: ObjectId → User

reviews: [ObjectId → Review]

Middleware: on findOneAndDelete, deletes associated reviews

Review

rating: number 1–5

comment: string

author: ObjectId → User

createdAt: Date (default now)

Validation

Listings (schema.js)

listing.title, listing.description, listing.location, listing.country, listing.price are required

listing.image can be empty or null

Reviews (schema.js)

review.rating required (1–5)

review.comment required

Authentication and Sessions

Local strategy via passport-local-mongoose

Sessions stored in MongoDB with connect-mongo

Flash messages available as res.locals.success / res.locals.error

Current user injected as res.locals.currUser

Image Uploads

Multer configured with Cloudinary storage (folder: wanderlust_DEVELOPMENT)

Allowed formats: png, jpg, jpeg

Form field name: listing[image]

Environment Variables

NODE_ENV

ATLASDB_URL

SECRET

CLOUD_NAME

CLOUD__API_KEY Note the double underscore in code

CLOUD_API_SECRET

