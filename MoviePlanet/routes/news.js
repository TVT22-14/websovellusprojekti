const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');

//const { createToken } = require('../auth/auth');
const { getNews, addNews,getNewsByGroup } = require('../postgre/news');


// GET ALL NEWS
router.get('/', async (req, res) => {
    res.json(await getNews());
});

// GET NEWS BY GROUP
router.get('/groupnews', async (req, res) => {
    const idgroup = req.query.idgroup;
    console.log(idgroup);
    res.json(await getNewsByGroup(idgroup));
});

// SHARE NEWS
router.post('/', upload.none(), async (req, res) => {
    const newsidapi = req.body.newsidapi;
    const idgroup = req.body.idgroup;

    try {
        await addNews(newsidapi, idgroup);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});



// EXPORT ROUTES
module.exports = router;