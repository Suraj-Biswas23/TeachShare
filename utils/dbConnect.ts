import mongoose from 'mongoose';

interface ConnectionState {
  isConnected: boolean;
}

const connection: ConnectionState = {
  isConnected: false
};

async function dbConnect(): Promise<typeof mongoose> {
  if (connection.isConnected) {
    console.log("DB is already connected!");
    return mongoose;
  }

  try {
    // Specify the database name
    const dbName: string = 'teachshare';
    const uri: string = `${process.env.MONGODB_URI}`;
    
    await mongoose.connect(uri, {
      dbName: dbName,
    });

    connection.isConnected = mongoose.connection.readyState === 1;
    console.log(`DB connected successfully to ${dbName}!`);
    return mongoose;
  } catch (error) {
    console.log("DB connection failed!", error);
    process.exit(1);
  }
}

export default dbConnect;