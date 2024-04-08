// const mongoose = require("mongoose");
import mongoose from "mongoose";

// const shoppingCartModel = require("../api/shopping-cart/shopping-cart.model");

export const initialize = () => {
  let uri: string = process.env.DB_URI || "";


  return mongoose
    .connect(uri)
    .then(() => {
      console.info(`database connected on`);
    })
    .catch((error) => {
      console.error(`Error :${error}`);
      console.info("not able to connect with mongoDB, existing process");
      process.exit(0);
    });


};


const db = {
  initialize,
  // shoppingCart: shoppingCartModel,
};

// global.db = db;

export default db;