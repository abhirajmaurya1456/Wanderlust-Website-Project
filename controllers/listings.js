const Listing=require("../models/listing.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});
module.exports.index=async (req,res)=>{
 let alllistings=await Listing.find({});
 res.render("listings/index.ejs",{alllistings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
        if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    } else{
        let originalUrl=listing.image.url;
       originalUrl= originalUrl.replace("/upload","/upload/w_250");
        res.render("listings/edit.ejs",{listing,originalUrl});
    }
};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    },
}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    } else{
        res.render("listings/show.ejs",{listing});
    }
};

module.exports.createListing=async (req,res,next)=>{
  let response=await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send();

    let url=req.file.path;
    let filename=req.file.filename;
    let result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    } 
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let saveListing= await newListing.save(); 
    // console.log(saveListing);
     req.flash("success","New listing Created!");
     res.redirect("/listings");
    };

module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing.");
    }
    let {id}=req.params;
let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof req.file !=="undefined"){
let url=req.file.path;
let filename=req.file.filename;
listing.image={url,filename};
await listing.save(); 
}

req.flash("success","listing updated!");
res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
let deletedlisting=await Listing.findByIdAndDelete(id);
req.flash("success","listing Deleted!");
res.redirect(`/listings`);
};
