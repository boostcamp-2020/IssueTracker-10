const request = require('supertest');
const app = require('../app');

describe('GET /api/milestone API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .get('/api/milestone')
      .set({
        'Content-Type': 'application/json',
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
  it('토큰이 valid하면 마일스톤 목록을 보여준다.', (done) => {
    request(app)
      .get('/api/milestone')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
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
