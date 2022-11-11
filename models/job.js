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

/** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

 static async update(handle, data) {
  const { setCols, values } = sqlForPartialUpdate(
    data,
    {
      numEmployees: "num_employees",
      logoUrl: "logo_url",
    });
  const handleVarIdx = "$" + (values.length + 1);

  const querySql = `
    UPDATE companies
    SET ${setCols}
      WHERE handle = ${handleVarIdx}
      RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`;
  const result = await db.query(querySql, [...values, handle]);
  const company = result.rows[0];

  if (!company) throw new NotFoundError(`No company: ${handle}`);

  return company;
}

/** Delete given company from database; returns undefined.
 *
 * Throws NotFoundError if company not found.
 **/

static async remove(handle) {
  const result = await db.query(
    `DELETE
         FROM companies
         WHERE handle = $1
         RETURNING handle`,
    [handle]);
  const company = result.rows[0];

  if (!company) throw new NotFoundError(`No company: ${handle}`);
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
static async filter(data) {
  if ("minEmployees" in data && "maxEmployees" in data) {
    if (data.minEmployees > data.maxEmployees) {
      throw new BadRequestError('Min employees greater than max employees');
    }
  }

  const { filters, values } = this.sqlForCompanyFilter(data);


  const results = await db.query(
    `
    SELECT
        handle,
        name,
        description,
        num_employees AS "numEmployees",
        logo_url AS "logoUrl"
      FROM companies
      WHERE ${filters}
    `, values
  );
  console.log(results.rows);
  return results.rows;
}

/** Accepts JS object data that we'll use to search and filter our companies table.
* Return an object containing SQL syntax WHERE statement that will be used to
* filter our table and query parameters.
*    Input: {
*      name: 'java',
*      minEmployees: 1,
*      maxEmployees: 10
*    }
*    Output: {
*      filters: `
*      name ILIKE $1 AND
*       num_employees >= $2 AND num_employees <= $3
*      `,
*      values: ['%java%', 1, 10]
*    }
*
*/

static sqlForCompanyFilter(dataToFilter) {
  const keys = Object.keys(dataToFilter);
  const values = Object.values(dataToFilter);
  if (keys.length === 0) throw new BadRequestError("No data");
  // .map() uneeded, rather use three if statements, iteration is great if unknown amount
  const filters = keys.map((filter, idx) => {
    if (filter === 'name') {
      values[idx] = '%' + values[idx] + '%';
      return `${filter} ILIKE $${idx + 1}`;
    }
    if (filter === 'minEmployees') {
      return `num_employees >= $${idx + 1}`;
    }
    if (filter === 'maxEmployees') {
      return `num_employees <= $${idx + 1}`;
    }
  });

  return {
    filters: filters.join(" AND "),
    values: values
  };
}


}



module.exports = Job;
