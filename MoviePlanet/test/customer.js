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
    it('Hae kaikki käyttäjät', (done) => {
        chai.request(app)
            .get('/customer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });

    it('Luo käyttäjän', (done) => {
        chai.request(app)
            .post('/customer')
            .send({
                fname: 'tintti',
                lname: 'tinttinen',
                username: 'tintti',
                pw: '1234',
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Kirjaudu sisään', (done) => {
        chai.request(app)
            .post('/customer/login')
            .send({
                username: 'tintti',
                pw: '1234',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwtToken');
                done();
            });
    });

    it('Väärä salasana', (done) => {
        chai.request(app)
            .post('/customer/login')
            .send({
                username: 'tintti',
                pw: '12345',
            })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Poista käyttäjä', (done) => {
        chai.request(app)
            .delete('/customer/tintti')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('Käyttäjää ei löytynyt', (done) => {
        chai.request(app)
            .post('/customer/login')
            .send({
                username: 'tinttinen',
                pw: '1234',
            })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('poista olematon käyttäjä', (done) => {
        chai.request(app)
            .delete('/customer/tinttinen')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});






