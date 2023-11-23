// CONNECT TO DATABASE
const pgPool = require('./connection');

// SQL QUERIES
const sql = {
    ADD_GROUP:'INSERT INTO community (groupname, grouppic, descript) VALUES ($1, $2, $3)',
    ADD_GROUPMS: 'INSERT INTO groupmembership (idcustomer, idgroup, roles) VALUES ($1, LAST_INSERT_ID(), 3)',
    UPDATE_GROUP: 'UPDATE community SET grouppic = $2, descript = $3 WHERE groupname = $1',
    GET_GROUPS: 'SELECT groupname, descript, grouppic FROM community',
    GET_GROUP: 'SELECT groupname, descript, grouppic FROM community WHERE groupname = $1',
    GET_OWNED_GROUPS: 'SELECT community.groupname, community.grouppic, community.descript \
    FROM Community JOIN groupmembership ON community.idgroup = groupmembership.idgroup \
    JOIN customer ON groupmembership.idcustomer = customer.idcustomer WHERE customer.username = $1 AND groupmembership.roles = 3', 
    GET_GROUPMEMBERS: 'SELECT customer.username, customer.profilepic FROM customer JOIN groupmembership ON customer.idcustomer = groupmembership.idcustomer \
    JOIN community ON groupmembership.idgroup = community.idgroup WHERE community.groupname = $1 AND groupmembership.roles = 2 || 3', // 2 = member, 3 = admin
    DELETE_GROUPMEMBER: 'DELETE FROM groupmembership WHERE idcustomer = (SELECT idcustomer FROM customer WHERE username = $1) AND idgroup = (SELECT idgroup FROM community WHERE groupname = $2)'
    
}


// ADD GROUP TO DATABASE
async function addGroup(groupname, grouppic, descript) {
    await pgPool.query(sql.ADD_GROUP, [groupname, grouppic, descript]);
    await pgPool.query(sql.ADD_GROUPMS, [idcustomer]);
}

// UPDATE GROUP
async function updateGroup(groupname, grouppic, descript) {
    await pgPool.query(sql.UPDATE_GROUP, [groupname, grouppic, descript]);
}

// GET ALL GROUPS
async function getGroups() {
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET OWNED GROUPS 

async function getOwnedGroups(username) {
    const result = await pgPool.query(sql.GET_OWNED_GROUPS, [username]);
    const rows = result.rows;
    console.log(rows);
    return rows;
} 

// GET GROUP

async function getGroup(groupname) {
    const result = await pgPool.query(sql.GET_GROUP, [groupname]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// GET GROUPMEMBERS

async function getGroupMembers(groupname) {
    const result = await pgPool.query(sql.GET_GROUPMEMBERS, [groupname]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

// DELETE GROUPMEMBER

async function deleteGroupMember(username, groupname) {
    try {
        await pgPool.query(sql.DELETE_GROUPMEMBER, [username, groupname]);
        return { success: true, message: 'Groupmember deleted successfully.' };
    } catch (error) {

        await pgPool.query('ROLLBACK'); // Rollback the transaction if an error occurs
        console.error('Error deleting groupmember:', error);
        return { success: false, error: error.message };
    }
}


// EXPORT FUNCTIONS
module.exports = {addGroup, updateGroup, getGroups, getGroup, getOwnedGroups, getGroupMembers, deleteGroupMember};                                                