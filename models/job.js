"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {

  /** Create a job (from data), update db, return new job data.
   *
   * data should be {title, salary, equity, companyHandle}
   *
   * Returns {title, salary, equity, companyHandle}
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const duplicateCheck = await db.query(
      `SELECT title
           FROM jobs
           WHERE title = $1`,
      [title]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);
    const companyResult = await db.query(
      `SELECT name
        FROM companies
        WHERE handle = $1`,
      [companyHandle]
    );
    if (!companyResult.rows[0]) throw new BadRequestError(`${companyHandle} doesn't exist.`);
    const result = await db.query(
      `INSERT INTO jobs(
            title,
            salary,
            equity,
            company_handle )
           VALUES
             ($1, $2, $3, $4)
           RETURNING title,
           salary,
           equity,
           company_handle AS "companyHandle"`,
      [
        title,
        salary,
        equity,
        companyHandle
      ],
    );
    const job = result.rows[0];

    return job;
  }
  /** Find all jobs.
   *
   * Returns [{title, salary, equity, companyHandle}, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
      `SELECT title,
              salary,
              equity,
              company_handle AS "companyHandle"
           FROM jobs
           ORDER BY title`);
    return jobsRes.rows;
  }

  /** Given a job id, return data about the job.
   *
   * Returns { title, salary, equity, companyHandle }
   *
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
      `SELECT   title,
                salary,
                equity,
                company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,
      [id]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Update job data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {title, salary, equity, companyHandle}
     *
     * Returns {id, title, salary, equity, companyHandle}
     *
     * Throws NotFoundError if not found.
     */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        companyHandle: "company_handle"
      });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `
    UPDATE jobs
    SET ${setCols}
      WHERE id = ${idVarIdx}
      RETURNING id, title, salary, equity, company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
         FROM jobs
         WHERE id = $1
         RETURNING id`,
      [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${job}`);
  }

  /** Filter and return companies based on input data
   *    Input: {
   *      name: 'java',
   *      minEmployees: 1,
   *      maxEmployees: 10
   *    }
   *    Output: {
   *      companies: [ { handle, name, description, numEmployees, logoUrl }, ...]
   *    }
   *
   */
  // static async filter(data) {
  //   if ("minEmployees" in data && "maxEmployees" in data) {
  //     if (data.minEmployees > data.maxEmployees) {
  //       throw new BadRequestError('Min employees greater than max employees');
  //     }
  //   }

  //   const { filters, values } = this.sqlForCompanyFilter(data);


  //   const results = await db.query(
  //     `
  //     SELECT
  //         handle,
  //         name,
  //         description,
  //         num_employees AS "numEmployees",
  //         logo_url AS "logoUrl"
  //       FROM companies
  //       WHERE ${filters}
  //     `, values
  //   );
  //   console.log(results.rows);
  //   return results.rows;
  // }

  /** Accepts JS object data that we'll use to search and filter our jobs table.
  * Return an object containing SQL syntax WHERE statement that will be used to
  * filter our table and query parameters.
  *    Input: {
  *      title: 'job1',
  *      minSalary: 1,
  *      hasEquity: true
  *    }
  *    Output: {
  *      filters: `
  *      title ILIKE $1 AND
  *      salary >= $2 AND
  *      equity > $3 (if hasEquity is false, we don't include this)
  *      `,
  *      values: ['%job1%', 1, 0]
  *    }
  *
  */

  static sqlForJobFilter(dataToFilter) {
    if (dataToFilter.hasEquity === false) {
      delete dataToFilter.hasEquity;
    }

    const keys = Object.keys(dataToFilter);
    const values = Object.values(dataToFilter);
    if (keys.length === 0) throw new BadRequestError("No data");

    const filters = keys.map((filter, idx) => {
      if (filter === 'title') {
        values[idx] = '%' + values[idx] + '%';
        return `${filter} ILIKE $${idx + 1}`;
      }
      if (filter === 'minSalary') {
        return `salary >= $${idx + 1}`;
      }
      if (filter === 'hasEquity') {
        if (dataToFilter[filter] === true) {
          values[idx] = 0;
          return `equity > $${idx + 1}`;
        }
      }
    });

    return {
      filters: filters.join(" AND "),
      values: values
    };
  }


}



module.exports = Job;
