import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to Database: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
