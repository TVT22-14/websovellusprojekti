// CONNECT TO DATABASE
const pgPool = require('./connection');                                                                         

// SQL QUERIES
const sql = {                                                                                                   
    INSERT_USER: 'INSERT INTO customer (fname, lname, username, pw, profilepic) VALUES ($1, $2, $3, $4, $5)',
    UPDATE_USER: 'UPDATE customer SET fname = $2, lname = $3, pw = $4, profilepic = $5 WHERE username = $1',
    GET_USERS: 'SELECT profilepic,fname,lname,username FROM customer', 
    GET_USER: 'SELECT profilepic,fname,lname,username FROM customer WHERE username = $1',  
    DELETE_USER: 'DELETE FROM customer WHERE username = $1'
}

// ADD USER TO DATABASE
async function addUser(fname,lname,username,pw,profilepic){                                                     
    await pgPool.query(sql.INSERT_USER,[fname,lname,username,pw,profilepic]);
}

// UPDATE USER FROM DATABASE
async function updateUser(username, fname, lname, pw, profilepic) {
    await pgPool.query(sql.UPDATE_USER, [username, fname, lname, pw, profilepic]);
}

// GET USERS FROM DATABASE
async function getUsers(){                                                                                      
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET USER FROM DATABASE
async function getUser(username){                                                                               
    const result = await pgPool.query(sql.GET_USER, [username]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// DELETE USER FROM DATABASE
async function deleteUser(username){                                                                            
    const deleteQuery = 'DELETE FROM customer WHERE username = $1';

    try {
        await pgPool.query(deleteQuery, [username]);
        console.log(`Käyttäjä ${username} poistettu onnistuneesti.`);
    } catch (error) {
        console.error('Virhe käyttäjän poistamisessa:', error);
    }
}

// EXPORT FUNCTIONS
module.exports = {addUser,getUsers,getUser,deleteUser,updateUser};                                                      