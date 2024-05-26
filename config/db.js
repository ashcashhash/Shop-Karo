import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_DB_CONNECTION_STRING
    );
    console.log(
      `Connected to MongoDB Database ${connection.connection.host}.`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}.`.bgRed.white);
  }
};

export default connectDB;
