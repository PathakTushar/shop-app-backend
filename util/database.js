const mongoDb = require('mongodb');
const MongoClient =mongoDb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://tusharph1:H7MKm7DQxGFinIw3@cluster0.pnz96nc.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected to database');
        _db = client.db()
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err;
    })
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'No Database Found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete','root','Tushar786@',{
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;

// H7MKm7DQxGFinIw3

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Tushar786@'
// })

// module.exports = pool.promise();