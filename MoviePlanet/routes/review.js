const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { addReview, getReview, deleteReview } = require('../postgre/review');

// ADD REVIEW TO DATABASE
router.post('/', upload.none(), async (req, res) => {
    const review = req.body.review;
    const movieidapi = req.body.movieidapi;
    const moviestars = req.body.moviestars;
    const idcustomer = req.body.idcustomer;

    console.log(review, movieidapi, moviestars, idcustomer);

    try {
        await addReview(review, movieidapi, moviestars, idcustomer);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

// GET REVIEWS FROM DATABASE
router.get('/allmoviereviews', async (req, res) => {
    res.json(await getReview());
})
// GET MOVIES FROM DATABASE
//router.get('/', async (req, res) => {});

// DELETE REVIEW FROM DATABASE
router.delete('/:idreview', async (req, res) => {
    const idreview = req.body.idreview;
    console.log(idreview);
    try {
        await deleteReview(idreview);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

module.exports = router;