const request = require('supertest');
const app = require('../app');

describe('POST /api/issue API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        title: 'issue example 1',
        content: null,
        label: [],
        assignees: [],
        milestone: [],
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
  it('타이틀이 존재하지 않으면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        'Content-Type': 'application/json',
      })
      .send({
        content: 'null',
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
      .post('/api/issue')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        'Content-Type': 'application/json',
      })
      .send({
        title: 'issue example 1',
        content: null,
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
