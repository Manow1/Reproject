const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("studentRegistrationDB");
        const students = database.collection("students");

        // แฮชรหัสผ่าน
        const plainPassword = 'studentpassword';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        const newStudent = {
            studentID: "61011234",
            email: "student@mfu.ac.th",
            password: hashedPassword, // ใช้ค่าแฮชแทน
            faculty: "Faculty of Science",
            major: "Computer Science"
        };

        const result = await students.insertOne(newStudent);
        console.log(`New student created with the following id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
