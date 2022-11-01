//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require('helmet')

//routes
const DestinationsRouter = require("./routes/destinations");
const travelVehicleRouter = require("./routes/travelVehicles");
const guideRoute = require("./routes/guides");
const AccomdationRouter = require("./routes/Accommodations");
const RoomsRouter = require("./routes/Rooms");

//creating express app
const app = express();
require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
//configuring dotenv variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
//creating express server
app.listen(PORT, async () => {
  //mongoDB connection
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: false,
      useUnifiedTopology: false,
      useFindAndModify: false,
      useCreateIndex: false,
    });
    console.log("MongoDB connected!🔥");
  } catch (error) {
    console.log(error);
  }

  console.log(`Express server running at PORT ${PORT} 😍`);
});

//routes
app.use("/destinations", DestinationsRouter);
app.use("/travelVehicle", travelVehicleRouter);
app.use(guideRoute);
app.use(AccomdationRouter);
app.use(RoomsRouter);
app.use(helmet())
