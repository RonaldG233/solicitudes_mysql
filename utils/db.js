import mysql from "mysql2/promise";
const connection=await mysql.createConnection({
    host:"localhost",
    user:"ronald_adso2894667",
    password:"Ronald2025",
    database:"node_adso2894667"
})
export default connection;