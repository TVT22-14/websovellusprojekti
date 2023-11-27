require('dotenv').config();
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const axios = require('axios');

const { addReview, getReview, deleteReview, getMovies } = require('../postgre/review');

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
});

// GET MOVIES FROM DATABASE
router.get('/movies', async (req, res) => {

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
        api_key: process.env.TMDB_API_KEY,
        query: req.query.movieidapi,
            },
        });
        console.log(response.data);
        // Palauta ensimmäinen elokuva hakutuloksista
        if (response.data.results.length > 0) {
            const elokuva = response.data.results[0];
            console.log(elokuva);

            const parsittuElokuva = {
                id: elokuva.id,
                title: elokuva.title,
                poster_path: elokuva.poster_path,
            };

            const moviesInDatabase = await getMovies(elokuva.id);
            if (moviesInDatabase.length > 0) {
                parsittuElokuva.isInDatabase = true;
            } else {
                parsittuElokuva.isInDatabase = false;
            }

            res.json(parsittuElokuva);
        } else {
            res.status(404).json({ message: 'Elokuvaa ei löytynyt' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Virhe elokuvan hakemisessa' });
    }
});

// DELETE REVIEW FROM DATABASE
router.delete('/', async (req, res) => {
    const idreview = req.query.idreview;
    console.log("Poistetaan elokuva", idreview);
    
    try {
        await deleteReview(idreview);
        res.end();
        console.log("Elokuva", idreview, "poistettu");
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

module.exports = router;