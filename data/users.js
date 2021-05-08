import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Seeding Users
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync(process.env.TEST_USERS_PWD, 10),
        isAdmin: false
    },
    {
        name: 'Jen Doe',
        email: 'jen@example.com',
        password: bcrypt.hashSync(process.env.TEST_USERS_PWD, 10),
        isAdmin: false
    }
];

export default users;