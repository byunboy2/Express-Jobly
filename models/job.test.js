"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");

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
  const newJob = {
    title: "J1 new",
    salary: 50000,
    equity: .00005,
    companyHandle: "c1",
  };
  const returnedJob = {
    title: "J1 new",
    salary: 50000,
    equity: "0.00005",
    companyHandle: "c1",
  };
  test("works", async function () {
    const job = await Job.create(newJob);
    expect(job).toEqual(returnedJob);

    const result = await db.query(
      `SELECT  title,
            salary,
            equity,
            company_handle AS "companyHandle"
           FROM jobs
           WHERE title = 'J1 new'`);
    expect(result.rows).toEqual([
      {
        title: "J1 new",
        salary: 50000,
        equity: "0.00005",
        companyHandle: "c1",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        title: "J1",
        salary: 1,
        equity: "0.00000001",
        companyHandle: "c1",
      },
      {
        title: "J2",
        salary: 2,
        equity: "0.00000002",
        companyHandle: "c2",
      },
      {
        title: "J3",
        salary: 3,
        equity: "0.00000003",
        companyHandle: "c3",
      },
      {
        title: "J4",
        salary: 4,
        equity: null,
        companyHandle: "c3",
      },
    ]);
  });
});

// /************************************** get */

describe("get", function () {
  test("works", async function () {

    let job = await Job.get(1);
    expect(job).toEqual({
      title: "J1",
      salary: 1,
      equity: "0.00000001",
      companyHandle: "c1",
    });
  });

  test("not found if no such company", async function () {
    try {
      await Job.get(10000);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** update */

describe("update", function () {
  const updateData = {
    title: "New Job",
    salary: 1234,
    equity: 0.1234,
    companyHandle: "c1",
  };

  test("works", async function () {
    let job = await Job.update(1, updateData);
    expect(job).toEqual({
      id: 1,
      title: "New Job",
      salary: 1234,
      equity: "0.1234",
      companyHandle: "c1",
    });

    const result = await db.query(
      `SELECT title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = 1`);

    expect(result.rows).toEqual([{
      title: "New Job",
      salary: 1234,
      equity: "0.1234",
      companyHandle: "c1",
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "New Job",
      salary: null,
      equity: null,
      companyHandle: "c1",
    };

    let job = await Job.update(1, updateDataSetNulls);
    expect(job).toEqual({
      id: 1,
      ...updateDataSetNulls,
    });

    const result = await db.query(
      `SELECT title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = 1`);

    expect(result.rows).toEqual([{
      title: "New Job",
      salary: null,
      equity: null,
      companyHandle: "c1",
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(10000, updateData);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update(1, {});
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const res = await db.query(
      "SELECT id FROM jobs WHERE id=1");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove(10000);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** sql filter conversion */
describe("convert", function () {
  test("sql partial filter conversion for equity true",
    function () {
      const input = {
        title: 'job1',
        minSalary: 1,
        hasEquity: true
      };

      const convertedJsObj = Job.sqlForJobFilter(input);
      expect(convertedJsObj).toEqual({
        filters:
          `title ILIKE $1 AND salary >= $2 AND equity > $3`,
        values: ['%job1%', 1, 0]
      });
    });

  test("sql partial filter conversion for equity false",
    function () {
      const input = {
        title: 'job1',
        minSalary: 1,
        hasEquity: false
      };

      const convertedJsObj = Job.sqlForJobFilter(input);
      expect(convertedJsObj).toEqual({
        filters:
          `title ILIKE $1 AND salary >= $2`,
        values: ['%job1%', 1]
      });
    });

  test("sql partial filter conversion for equity not included",
    function () {
      const input = {
        title: 'job1',
        minSalary: 1
      };

      const convertedJsObj = Job.sqlForJobFilter(input);
      expect(convertedJsObj).toEqual({
        filters:
          `title ILIKE $1 AND salary >= $2`,
        values: ['%job1%', 1]
      });
    });

  test("sql partial filter conversion for partial data",
    function () {
      const input = {
        minSalary: 1,
      };

      const convertedJsObj = Job.sqlForJobFilter(input);
      expect(convertedJsObj).toEqual({
        filters:
          `salary >= $1`,
        values: [1]
      });
    });

  test("no data", function () {
    try {
      Job.sqlForJobFilter({});
      throw new Error("This is wrong");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});



/************************************** Filter*/

describe("filter", function () {
  test("run a query based on title filter", async function () {
    const test = {
      title: "J"
    };
    const queryResult = await Job.filter(test);

    expect(queryResult).toEqual([
      {
        title: "J1",
        salary: 1,
        equity: "0.00000001",
        companyHandle: "c1",
      },
      {
        title: "J2",
        salary: 2,
        equity: "0.00000002",
        companyHandle: "c2",
      },
      {
        title: "J3",
        salary: 3,
        equity: "0.00000003",
        companyHandle: "c3",
      },
      {
        title: "J4",
        salary: 4,
        equity: null,
        companyHandle: "c3",
      },
    ]);
  });

  test("run a query using test filter minSalary and hasEquity: true", async function () {
    const testFilter = {
    minSalary: 3,
    hasEquity: true
  };
    const results = await Job.filter(testFilter);

    expect(results).toEqual([
      {
        title: "J3",
        salary: 3,
        equity: "0.00000003",
        companyHandle: "c3",
      }
    ]);
  });

  test("run a query using test filter minSalary and hasEquity: false", async function () {
    const testFilter = {
    minSalary: 3,
    hasEquity: false
  };
    const results = await Job.filter(testFilter);

    expect(results).toEqual([
      {
        title: "J3",
        salary: 3,
        equity: "0.00000003",
        companyHandle: "c3",
      },
      {
        title: "J4",
        salary: 4,
        equity: null,
        companyHandle: "c3",
      }
    ]);
  });

  test("invalid hasEquity data type", async function () {
    const testFilter = {
      hasEquity: .05
    };
    try {
      const results = await Job.filter(testFilter);
      throw new Error('You should not reach this!');
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.message).toEqual(['Invalid hasEquity data type']);
    }
  });

  test("invalid minSalary data type", async function () {
    const testFilter = {
      minSalary: 'not-a-number'
    };
    try {
      const results = await Job.filter(testFilter);
      throw new Error('You should not reach this!');
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.message).toEqual(['Invalid minSalary data type']);
    }
  });

  test("invalid title data type", async function () {
    const testFilter = {
      title: 1
    };
    try {
      const results = await Job.filter(testFilter);
      throw new Error('You should not reach this!');
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
      expect(err.message).toEqual(['Invalid title data type']);
    }
  });
});