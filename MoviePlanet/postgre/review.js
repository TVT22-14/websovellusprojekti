// CONNECT TO DATABASE
const pgPool = require('./connection');

// SQL QUERIES
const sql = {
    INSERT_REVIEW: 'INSERT INTO review (review, movieidapi, moviestars, idcustomer) VALUES ($1, $2, $3, $4)',
    GET_REVIEWS: 'SELECT idreview, review, movieidapi, moviestars, idcustomer FROM review',
    GET_MOVIES: 'SELECT idmovie FROM review WHERE idcustomer = $1',
    DELETE_REVIEW: 'DELETE FROM review WHERE idreview = $1'
}

// ADD REVIEW TO DATABASE
async function addReview(review, movieidapi, moviestars, idcustomer) {
    await pgPool.query(sql.INSERT_REVIEW, [review, movieidapi, moviestars, idcustomer]);
};
// GET REVIEWS FROM DATABASE
async function getReview() {
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    console.log(rows);
    return rows;
};

// GET MOVIES FROM DATABASE
// async function getMovies() {};

// DELETE REVIEW FROM DATABASE
async function deleteReview(idreview) {
        try {
            await pgPool.query(sql.DELETE_REVIEW, [idreview]);
    
            return { success: true, message: 'Review deleted successfully.' };
        } catch (error) {
    
            await pgPool.query('ROLLBACK'); // Rollback the transaction if an error occurs
            console.error('Error deleting review:', error);
            return { success: false, error: error.message };
        }    
};

// EXPORT FUNCTIONS
module.exports = { addReview, getReview, deleteReview };     