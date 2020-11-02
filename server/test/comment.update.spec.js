const request = require('supertest');
const app = require('../app');

describe('PUT /api/comment/{commentId} API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .put('/api/comment/1')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        title: 'update comment test 401',
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
  it('request body에 content 값이 없으면 400을 리턴한다.', (done) => {
    request(app)
      .put('/api/comment/1')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
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
  it('수정하려는 커멘트가 없을 경우 404를 리턴한다.', (done) => {
    request(app)
      .put('/api/comment/1000')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        content: 'update comment test 404',
      })
      .expect('Content-Type', /json/)
      .expect(404)
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
      .put('/api/comment/3')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        content: 'update comment test 200',
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
