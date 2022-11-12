"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Company = require("./company.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newCompany = {
    handle: "new",
    name: "New",
    description: "New Description",
    numEmployees: 1,
    logoUrl: "http://new.img",
  };

  test("works", async function () {
    let company = await Company.create(newCompany);
    expect(company).toEqual(newCompany);

    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
           FROM companies
           WHERE handle = 'new'`);
    expect(result.rows).toEqual([
      {
        handle: "new",
        name: "New",
        description: "New Description",
        num_employees: 1,
        logo_url: "http://new.img",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Company.create(newCompany);
      await Company.create(newCompany);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let companies = await Company.findAll();
    expect(companies).toEqual([
      {
        handle: "c1",
        name: "C1",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
      },
      {
        handle: "c2",
        name: "C2",
        description: "Desc2",
        numEmployees: 2,
        logoUrl: "http://c2.img",
      },
      {
        handle: "c3",
        name: "C3",
        description: "Desc3",
        numEmployees: 3,
        logoUrl: "http://c3.img",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let company = await Company.get("c1");
    expect(company).toEqual({
      handle: "c1",
      name: "C1",
      description: "Desc1",
      numEmployees: 1,
      logoUrl: "http://c1.img",
      jobs : [{
        id: 1,
        title: "J1",
        salary: 1,
        equity: 1e-8,
        companyHandle: "c1"
      }]
    });
  });

  test("not found if no such company", async function () {
    try {
      await Company.get("nope");
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });


});

/************************************** update */

describe("update", function () {
  const updateData = {
    name: "New",
    description: "New Description",
    numEmployees: 10,
    logoUrl: "http://new.img",
  };

  test("works", async function () {
    let company = await Company.update("c1", updateData);
    expect(company).toEqual({
      handle: "c1",
      ...updateData,
    });

    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
           FROM companies
           WHERE handle = 'c1'`);
    expect(result.rows).toEqual([{
      handle: "c1",
      name: "New",
      description: "New Description",
      num_employees: 10,
      logo_url: "http://new.img",
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      name: "New",
      description: "New Description",
      numEmployees: null,
      logoUrl: null,
    };

    let company = await Company.update("c1", updateDataSetNulls);
    expect(company).toEqual({
      handle: "c1",
      ...updateDataSetNulls,
    });

    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
           FROM companies
           WHERE handle = 'c1'`);
    expect(result.rows).toEqual([{
      handle: "c1",
      name: "New",
      description: "New Description",
      num_employees: null,
      logo_url: null,
    }]);
  });

  test("not found if no such company", async function () {
    try {
      await Company.update("nope", updateData);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Company.update("c1", {});
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Company.remove("c1");
    const res = await db.query(
      "SELECT handle FROM companies WHERE handle='c1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Company.remove("nope");
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  /************************************** sql filter conversion */
  // only pass in name test
  describe("convert", function () {
    test("Converts js object to partial sql clause and an query params array",
      function () {
        const input = {
          name: 'java',
          minEmployees: 1,
          maxEmployees: 10
        };

        const convertedJsObj = Company.sqlForCompanyFilter(input);
        expect(convertedJsObj).toEqual({
          filters:
            `name ILIKE $1 AND num_employees >= $2 AND num_employees <= $3`,
          values: ['%java%', 1, 10]
        });
      });
  });

  test("no data", function () {
    try {
      Company.sqlForCompanyFilter({});
      throw new Error("This is wrong");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

});


/************************************** Filter*/

describe("filter", function () {
  test("run a query based on name filter", async function () {
    const test = {
      name: "1"
    };
    const queryResult = await Company.filter(test);

    expect(queryResult).toEqual(
      [{
        handle: "c1",
        name: "C1",
        description:"Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img"
      }]
    );
  });

  test("run a query using numEmployees Min and Max filters", async function() {
    const testFilter = {
      minEmployees: 2,
      maxEmployees: 3
    }
    const results = await Company.filter(testFilter);

    expect(results).toEqual([
      {
        handle: "c2",
        name: "C2",
        description:"Desc2",
        numEmployees: 2,
        logoUrl: "http://c2.img"
      },
      {
        handle: "c3",
        name: "C3",
        description:"Desc3",
        numEmployees: 3,
        logoUrl: "http://c3.img"
      }
    ]);
  });

  test("invalid min max numEmployees filters", async function() {
    const testFilter = {
      minEmployees: 3,
      maxEmployees: 2
    }

    try {
      const results = await Company.filter(testFilter);
      throw new Error('You should not reach this!');
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.message).toEqual('Min employees greater than max employees');
    }
  });
});