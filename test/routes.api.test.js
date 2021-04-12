const assert = require("assert");
const request = require("supertest");
const msgError =
  "limit exceeded quotas cannot be greater than 36 and credit value must not be greater than 10'000000";
var req = request("http://localhost:4000");
describe("POST", function () {
  /*it("shoul respond with status 200", function (done) {
    req.post("/api/credit").expect(200, done);
  });*/
  it("should respond value to pay of the credit", function (done) {
    let data = {
      total: 500000,
      cuotas: 12,
    };
    req
      .post("/api/credit")
      .send(data)
      .end((err, res) => {
        assert.deepStrictEqual(res.body, {
          pay: 42119,
          message: "successful account",
        });
        done();
      });
  });
  it("should respond error for Invalid Values", function (done) {
    let data = {
      total: -55000,
      cuotas: 12,
    };
    req
      .post("/api/credit")
      .send(data)
      .end((err, res) => {
        assert.deepStrictEqual(res.body, {
          pay: null,
          message: "unsuccessful account Invalid Values",
        });
        done();
      });
  });
  it("should respond error for  for credit value limit exceeded", function (done) {
    let data = {
      total: 10000001,
      cuotas: 12,
    };
    req
      .post("/api/credit")
      .send(data)
      .end((err, res) => {
        assert.deepStrictEqual(res.body, {
          pay: null,
          message: "unsuccessful account " + msgError,
        });
        done();
      });
  });
  it("should respond error for credit installments limit exceeded", function (done) {
    let data = {
      total: 500000,
      cuotas: 37,
    };
    req
      .post("/api/credit")
      .send(data)
      .end((err, res) => {
        assert.deepStrictEqual(res.body, {
          pay: null,
          message: "unsuccessful account " + msgError,
        });
        done();
      });
  });
});
