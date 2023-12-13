import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: 'admin@exapmle.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Mujtaba Qureshi",
        email: 'mujtaba@exapmle.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Irtaza Qureshi",
        email: 'irtazan@exapmle.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users