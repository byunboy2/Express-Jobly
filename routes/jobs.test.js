"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: 'J4 new job admin',
    salary: 4,
    equity: .00000004,
    companyHandle: 'c3'
  };
  const respJob = {
    title: 'J4 new job admin',
    salary: 4,
    equity: "0.00000004",
    companyHandle: 'c3'
  };

  test("ok for admins", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: respJob,
    });
  });

  test("test for non existing company ", async function () {
    const testJob = {
      title: 'J4 new job admin',
      salary: 4,
      equity: .00000004,
      companyHandle: 'c4'
    };
    const resp = await request(app)
      .post("/jobs")
      .send(testJob)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
     "c4 doesn't exist."
    );
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "J4",
        salary: 4,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        ...newJob,
        equity: "not-a-number",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("unauth for non-admin users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message === "Unauthorized").toBeTruthy();
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs:
        [
          {
            title: 'J1',
            salary: 1,
            equity: "0.00000001",
            companyHandle: 'c1'
          },
          {
            title: 'J2',
            salary: 2,
            equity: "0.00000002",
            companyHandle: 'c2'
          },
          {
            title: 'J3',
            salary: 3,
            equity: "0.00000003",
            companyHandle: 'c3'
          },
        ],
    });
  });

  // test("ok for filtered data", async function() {
  //   const resp = await request(app)
  //     .get("/companies")
  //     .query({name: "c", minEmployees: 1, maxEmployees: 2});

  //   expect(resp.statusCode).toEqual(200);
  //   expect(resp.body).toEqual({
  //     companies: [{
  //       handle: "c1",
  //       name: "C1",
  //       description: "Desc1",
  //       numEmployees: 1,
  //       logoUrl: "http://c1.img"
  //     },
  //   {
  //     handle: "c2",
  //     name: "C2",
  //     description: "Desc2",
  //     numEmployees: 2,
  //     logoUrl: "http://c2.img"
  //   }]
  //   });
  // });


  // test("extra properties JSON structure", async function () {
  //   const resp = await request(app)
  //     .get("/jobs")
  //     .query(
  //       {
  //         title: 'j1',
  //         salary: 1,
  //         equity: .000001,
  //         companyHandle: "c1",
  //         location: "Podunk"
  //       });

  //   expect(resp.statusCode).toEqual(400);
  //   expect(resp.body.error.message).toEqual([
  //     // "instance.salary is not of a type(s) integer",
  //     // "instance.equity is not of a type(s) number",
  //     "instance is not allowed to have the additional property \"location\""
  //   ]);
  // });

  // test("wrong data types JSON structure", async function () {
  //   const resp = await request(app)
  //     .get("/jobs")
  //     .query(
  //       {
  //         title: 'j1',
  //         salary: 1,
  //         equity: ".000001",
  //         companyHandle: "c1",
  //       });

  //   expect(resp.statusCode).toEqual(400);
  //   expect(resp.body.error.message).toEqual([
  //     "instance.salary is not of a type(s) integer",
  //     "instance.equity is not of a type(s) number"
  //   ]);
  // });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
      .get("/jobs")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:handle */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/1`);
    expect(resp.body).toEqual({
      job: {
        title: 'J1',
        salary: 1,
        equity: "0.00000001",
        companyHandle: 'c1'
      },
    });
  });

  test("not found for a job that doesn't exist", async function () {
    const resp = await request(app).get(`/jobs/10`);
    expect(resp.statusCode).toEqual(404);
  });
});

// /************************************** PATCH /jobs/:handle */

describe("PATCH /jobs/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          title: "J1-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      job: {
        id: 1,
        title: 'J1-new',
        salary: 1,
        equity: "0.00000001",
        companyHandle: 'c1'
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          title: "J1-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for job that doesn't exist", async function () {
    const resp = await request(app)
        .patch(`/jobs/1000`)
        .send({
          title: "J1000-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on id change attempt", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          id: "1-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          salary: "not-a-number",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  //think about grouping tests together
  test("non admin request", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          name: "J1-new",
        })
        .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message === "Unauthorized").toBeTruthy();
  })
});

// /************************************** DELETE /jobs/:handle */

describe("DELETE /jobs/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: "1" });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for non existing job", async function () {
    const resp = await request(app)
        .delete(`/jobs/1000`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("unauth for non-admin users", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`)
        .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message === "Unauthorized").toBeTruthy();
  });
});
