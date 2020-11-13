const request = require('supertest');
const app = require('../app');

describe('PUT /api/issue/state API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/state')
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
  it('이상한 데이터 보내면 400를 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/state')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        state: 1,
        issueIds: [],
      })
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
  it('잘 보내면 200를 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/state')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        state: 0,
        issueIds: [1, 2],
      })
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
