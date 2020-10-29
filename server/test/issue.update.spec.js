const request = require('supertest');
const app = require('../app');

describe('PUT /api/issue/{issudId} API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/1')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        title: 'update issue example 1',
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
      .put('/api/issue/1')
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
  it('수정하려는 유저가 작성자와 다르면 403을 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/2')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        title: 'update issue example 1 (not author)',
      })
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('수정하려는 이슈가 없을 경우 404를 리턴한다.', (done) => {
    request(app)
      .put('/api/issue/1000')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        title: 'no issue data',
      })
      .expect('Content-Type', /json/)
      .expect(403)
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
      .put('/api/issue/1')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        title: 'update issue example 1',
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
