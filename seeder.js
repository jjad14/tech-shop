import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

import connectDb from './data/db.js';

dotenv.config();

connectDb();

const importData = async () => {
    try {
        // Clear database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // insert users
        const createdUsers = await User.insertMany(users);
        // get admin
        const adminUser = createdUsers[0]._id;

        // map each product with the admin user
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser};
        });

        // insert products into db
        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()

      } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)

      }
};

const destroyData = async () => {
    try {
        // Clear database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Database has been cleared!'.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
};

if (process.argv[2] === '-d') {
    destroyData();
} 
else {
    importData();
}