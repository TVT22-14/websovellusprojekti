const pgPool = require('./connection');                                                                         // <--- CONNECT TO DATABASE

const sql = {                                                                                                   // <--- SQL QUERIES
    INSERT_USER: 'INSERT INTO customer (fname, lname, username, pw, profilepic) VALUES ($1, $2, $3, $4, $5)',
    UPDATE_USER: 'UPDATE INTO customer (fname, lname, pw, profilepic) VALUES ($1, $2, $3, $4)',
    GET_USERS: 'SELECT profilepic,fname,lname,username FROM customer',   
    DELETE_USER: 'DELETE FROM customer WHERE username = $1',
};

async function addUser(fname,lname,username,pw,profilepic){                                                     // <--- ADD USER TO DATABASE
    await pgPool.query(sql.INSERT_USER,[fname,lname,username,pw,profilepic]);
}
async function updateUser(){                                                                                    // <--- UPDATE USER FROM DATABASE
    await pgPool.query(sql.UPDATE_USER);
}

async function getUsers(){                                                                                      // <--- GET USERS FROM DATABASE
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function deleteUser(username){                                                                            // <--- DELETE USER FROM DATABASE
    const deleteQuery = 'DELETE FROM customer WHERE username = $1';

    try {
        await pgPool.query(deleteQuery, [username]);
        console.log(`Käyttäjä ${username} poistettu onnistuneesti.`);
    } catch (error) {
        console.error('Virhe käyttäjän poistamisessa:', error);
    }
}


module.exports = {addUser,getUsers,deleteUser,updateUser};                                                      // <--- EXPORT FUNCTIONS