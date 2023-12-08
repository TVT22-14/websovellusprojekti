const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const pgPool = require('../postgre/connection'); 

const should = chai.should();

chai.use(chaiHttp);

describe('Customer Route Tests', () => {
    let server; 

    // Ennen testejä käynnistellään serveri ja tietokantayhteys
    before((done) => {
        pgPool.connect((err) => { 
            if (err) {
                console.error('Error connecting to Postgres database');
                console.error(err.message);
                done(err); 
            } else {
                server = app.listen(3002, () => { // Tässä eri portti kuin varsinaisessa sovelluksessa
                    done(); 
                });
            }
        });
    });

    after((done) => {
        server.close(() => { // Sulje serveri testien jälkeen
            pgPool.end(); // Lopeta tietokantayhteys
            done();
        });
    });

    // Testit
    it('Palauttaa kaikki käyttäjät', (done) => {
        chai.request(app)
            .get('/customer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });

    // Muut testitapaukset...

});
