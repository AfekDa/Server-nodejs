const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const CostItem = require('../models/costItem');

const { expect } = chai;
chai.use(chaiHttp);

describe('API Endpoints', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://afek:afek4321@cluster0.2zqqy.mongodb.net/costs?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/users/:id', () => {
    it('should get user details', (done) => {
      chai.request(app)
        .get('/api/users/123123')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', '123123');
          done();
        });
    });
  });

  describe('POST /api/add', () => {
    it('should add a new cost item', (done) => {
      chai.request(app)
        .post('/api/add')
        .send({
          userId: '123123',
          description: 'Bills',
          category: 'Water',
          amount: 30,
          date: '2023-10-01T00:00:00.000Z',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('description', 'Bills');
          done();
        });
    });
  });

  describe('GET /api/report', () => {
    it('should get monthly report', (done) => {
      chai.request(app)
        .get('/api/report')
        .query({ userId: '123123', month: 10, year: 2023 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/costItems', () => {
    it('should get all cost items', (done) => {
      chai.request(app)
        .get('/api/costItems')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/about', () => {
    it('should get developers team', (done) => {
      chai.request(app)
        .get('/api/about')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
