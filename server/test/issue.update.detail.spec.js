const request = require('supertest');
const app = require('../app');

describe('POST /api/issue/{issudId}/details API는', () => {
  it('토큰이 없을 때 401을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
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
  it('request body에 type 값이 없으면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        method: 1,
        data: [1, 2],
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
  it('request body에 method 값이 없으면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        data: [1, 2],
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
  it('request body에 method 값이 0이나 1이 아니면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 3,
        data: [1, 2],
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
  it('request body에 data 값이 없으면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
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
  it('request body에 data 값이 숫자가 아니면 400을 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
        data: 'not number',
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
  it('수정하려는 이슈가 없을 경우 404를 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1000/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
        data: 1,
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
  it('type이 assignee | label | milestone이 아닐 경우 404를 리턴한다.', (done) => {
    request(app)
      .post('/api/issue/1000/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
        data: 1,
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
  it('존재하지 않는 assignee를 추가할 경우, 500을 리턴한다.(assignee 변경)', (done) => {
    request(app)
      .post('/api/issue/2/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
        data: 1000,
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('존재하지 않는 label을 추가할 경우, 500을 리턴한다.(label 변경)', (done) => {
    request(app)
      .post('/api/issue/3/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'label',
        method: 1,
        data: 1000,
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('존재하지 않는 milestone을 추가할 경우, 500를 리턴한다.(milestone 변경)', (done) => {
    request(app)
      .post('/api/issue/4/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'milestone',
        method: 1,
        data: 1000,
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
          console.log(result.body);
        }
      });
  });
  it('정상적일 경우에는 200 코드와 json을 리턴한다.(assignee 변경)', (done) => {
    request(app)
      .post('/api/issue/2/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'assignee',
        method: 1,
        data: 1,
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
  it('정상적일 경우에는 200 코드와 json을 리턴한다.(label 변경)', (done) => {
    request(app)
      .post('/api/issue/3/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'label',
        method: 1,
        data: 1,
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
  it('정상적일 경우에는 200 코드와 json을 리턴한다.(milestone 변경)', (done) => {
    request(app)
      .post('/api/issue/4/details')
      .set({
        Authorization: process.env.TEST_TOKEN,
        'Content-Type': 'application/json',
      })
      .send({
        type: 'milestone',
        method: 1,
        data: 1,
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
