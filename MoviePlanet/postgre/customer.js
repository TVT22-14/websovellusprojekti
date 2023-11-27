// CONNECT TO DATABASE
const pgPool = require('./connection');

// SQL QUERIES
const sql = {
    INSERT_USER: 'INSERT INTO customer (fname, lname, username, pw, profilepic) VALUES ($1, $2, $3, $4, $5)',
    UPDATE_USER: 'UPDATE customer SET fname = $2, lname = $3, pw = $4, profilepic = $5 WHERE username = $1',
    GET_USERS: 'SELECT profilepic,fname,lname,username FROM customer',
    GET_USER: 'SELECT profilepic,fname,lname,username FROM customer WHERE username = $1',
    GET_USERID: 'SELECT idcustomer FROM customer WHERE username = $1',
    DELETE_USER: 'DELETE FROM customer WHERE username = $1',
    DELETE_GROUPMS: 'DELETE FROM groupmembership WHERE idcustomer = (SELECT idcustomer FROM customer WHERE username = $1)', //delete groupmembership first
    GET_USERS_FROM_GROUP: 'SELECT customer.username, customer.profilepic FROM customer JOIN groupmembership ON customer.idcustomer = groupmembership.idcustomer \
    JOIN community ON groupmembership.idgroup = community.idgroup WHERE community.idgroup = $1 AND groupmembership.roles IN (2, 3)', // 2 = member, 3 = admin
    GET_PW: 'SELECT pw FROM customer WHERE username = $1'
}


// ADD USER TO DATABASE
async function addUser(fname, lname, username, pw, profilepic) {
    await pgPool.query(sql.INSERT_USER, [fname, lname, username, pw, profilepic]);
}

// UPDATE USER FROM DATABASE
async function updateUser(username, fname, lname, pw, profilepic) {
    await pgPool.query(sql.UPDATE_USER, [username, fname, lname, pw, profilepic]);
}

// GET USERS FROM DATABASE
async function getUsers() {
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET USER FROM DATABASE
async function getUser(username) {
    const result = await pgPool.query(sql.GET_USER, [username]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET USERID FROM DATABASE
async function getUserID(username) {
    const result = await pgPool.query(sql.GET_USERID, [username]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// DELETE USER FROM DATABASE
async function deleteUser(username) {
    try {

        // deletoidaan groupmembership ensin
        await pgPool.query(sql.DELETE_GROUPMS, [username]);

        // ja sitten vasta customer
        await pgPool.query(sql.DELETE_USER, [username]);

        return { success: true, message: 'User deleted successfully.' };
    } catch (error) {

        await pgPool.query('ROLLBACK'); // Rollback the transaction if an error occurs
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
    } 

}

// GET USERS FROM GROUP
async function getUsersFromGroup(idgroup) {
    const result = await pgPool.query(sql.GET_USERS_FROM_GROUP, [idgroup]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET PASSWORD FROM DATABASE
async function getPw(username) {
    const result = await pgPool.query(sql.GET_PW, [username]);
    console.log(result);

    if(result.rows.length > 0){
        return result.rows[0].pw;
    }else{
        return null;
    }
   
}

// EXPORT FUNCTIONS
module.exports = { addUser, getUsers, getUser, getUserID, deleteUser, updateUser, getUsersFromGroup , getPw};                                                      