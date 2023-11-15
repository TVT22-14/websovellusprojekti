const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');

const {addUser,getUsers,getUser,updateUser,deleteUser,getUsersFromGroup} = require('../postgre/customer');


// GET ALL USERS
router.get('/', async (req, res) => {
    res.json(await getUsers());
})

// GET ONE USER
router.get('/getUser', async (req, res) => {
    const username = req.query.username;
    console.log(username)
    res.json(await getUser(username))
})

// ADD USER (SUPPORTS URLENCODED AND MULTER)
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
})

// UPDATE USER
router.put('/:username', upload.none() , async(req, res) => {

    const username = req.params.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    let pw = req.body.pw;
    const profilepic = req.body.profilepic;

    console.log(username,fname,lname,pw,profilepic);

    pw = await bcrypt.hash(pw, 10);

    try{
        await updateUser(username,fname,lname,pw,profilepic);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }

})

// DELETE USER
router.delete('/', async (req, res) => {
    const username = req.body.username;
    try{
        await deleteUser(username);
        res.end();
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
})

// GET USERS FROM GROUP
router.get('/getUsersFromGroup/:idgroup', async (req, res) => {
    const idgroup = req.params.idgroup;
    console.log(idgroup)
    res.json(await getUsersFromGroup(idgroup));
})

module.exports = router;