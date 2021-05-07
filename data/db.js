import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MY_MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }
    catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;