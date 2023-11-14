const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');

const {addUser,getUsers,updateUser,deleteUser} = require('../postgre/customer');


//USER ROOT GET MAPPING
router.get('/', async (req, res) => {
    res.json(await getUsers());
});

//SUPPORTS URLENCODED AND MULTER
router.post('/', upload.none() , async(req, res) => {    
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    let pw = req.body.pw;
    const profilepic = req.body.profilepic;

    console.log(fname,lname,username,pw,profilepic);
    
    pw = await bcrypt.hash(pw, 10);

    try{
        await addUser(fname,lname,username,pw,profilepic);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

router.delete('/', async (req, res) => {
    const username = req.body.username;
    try{
        await deleteUser(username);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

module.exports = router;