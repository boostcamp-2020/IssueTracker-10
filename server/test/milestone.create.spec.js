const request = require('supertest');
const app = require('../app');

describe('POST /api/milestone API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .post('/api/milestone')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        title: 'create milestone test 401',
      })
      .expect(401)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('request body에 title 값이 없으면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/milestone')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('request body에 date 값이 date타입이 아니면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/milestone')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        title: 'create milestone test 200',
        date: 'not date'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('정상적일 경우에는 200 코드와 json을 리턴한다.', (done) => {
    request(app)
      .post('/api/milestone')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        title: 'create milestone test 200',
        describe: 'create mileston test describe',
        date: '2020-10-10'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
});
