const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');



const { postJoinRequest, getPendingRequestsByAdmin, acceptJoinRequest, denyJoinRequest } = require('../postgre/groupmembership');

// ADD/POST JOIN REQUEST (SUPPORTS URLENCODED AND MULTER)
router.post('/join', upload.none(), async (req, res) => {
  try {
      const idcustomer = req.body.idcustomer;
      const idgroup = req.body.idgroup;

      console.log('Käyttäjä id ' + idcustomer + ' pyytää liittyä ryhmään ' + idgroup) //terminaliin tulee tämä viesti

      await postJoinRequest(idcustomer, idgroup);
      res.json({ message: 'Join request sent' });     //postmaniin tulee tämä viesti
  } catch (err) {
      console.error('Error in POST /join:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET JOIN REQUESTS BY ADMIN
router.get('/joinrequests', async (req, res) => {
  try {
      const adminId = req.query.idcustomer;
      const joinRequests = await getPendingRequestsByAdmin(adminId);

      console.log('Käyttäjän id ' + adminId + ' ryhmäpyynnöt haettu')
      res.json(joinRequests);

  } catch (err) {
      console.error('Error in GET /joinrequests:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ACCEPT JOIN REQUEST
router.put('/accept', upload.none(), async (req, res) => {
  try {
      const idcustomer = req.body.idcustomer;
      const idgroup = req.body.idgroup;          

      console.log('Käyttäjä id ' + idcustomer + ' hyväksytty ryhmään ' + idgroup)

      await acceptJoinRequest(idcustomer, idgroup);
      res.json({ message: 'Join request accepted' }); 
  } catch (err) {
      console.error('Error in POST /accept:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DENY JOIN REQUEST
router.delete('/deny', upload.none(), async (req, res) => {
  try {
      const idcustomer = req.body.idcustomer;
      const idgroup = req.body.idgroup;

      console.log('Käyttäjä id ' + idcustomer + ' hylätty ryhmästä ' + idgroup)

      await denyJoinRequest(idcustomer, idgroup);
      res.json({ message: 'Join request denied' });
  } catch (err) {
      console.error('Error in POST /deny:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;