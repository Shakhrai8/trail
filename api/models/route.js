const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  routeDescription: {
    type: String,
    required: true,
  },
  startingPoint: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  endingPoint: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  visitedLocations: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      placeId: { type: String, required: true },
      placeName: { type: String, required: true },
      description: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Route", RouteSchema);
