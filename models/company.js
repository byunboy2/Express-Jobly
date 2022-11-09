"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db.query(
      `SELECT handle
           FROM companies
           WHERE handle = $1`,
      [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
      `INSERT INTO companies(
          handle,
          name,
          description,
          num_employees,
          logo_url)
           VALUES
             ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
      [
        handle,
        name,
        description,
        numEmployees,
        logoUrl,
      ],
    );
    const company = result.rows[0];

    return company;
  }

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll() {
    const companiesRes = await db.query(
      `SELECT handle,
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoUrl"
           FROM companies
           ORDER BY name`);
    return companiesRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const companyRes = await db.query(
      `SELECT handle,
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
      [handle]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
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
      console.log(results.rows)
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



module.exports = Company;
