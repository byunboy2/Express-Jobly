const { BadRequestError } = require("../expressError");

/** Accepts data and jsToSql that needs to be updated and returns
 * {firstName: 'Aliya', age: 32}, {firstName:"first_name"}
 * =>{
 *    setCols:'"first_name"=$1, "age"=$2' ,
 *    values: ["Aliya",32],
 * }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
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
 *      filter: `
 *       name = $1,
 *       (num_employees >= minEmployees AND num_employees <= maxEmployees)
 *      `,
 *      values: ['java', 1, 10]
 *    }
 *
 */
function sqlForCompanyFilter(dataToFilter) {
  const keys = Object.keys(dataToFilter);
  const values = Object.values(dataToFilter);
  if (keys.length === 0) throw new BadRequestError("No data");

  const filters = keys.map((filter, idx) => {
    if (filter === 'name') {
      values[idx] = '%' + values[idx] + '%';
      return `${filter} ILIKE $${idx + 1}`;
    }
    if (filter === 'minEmployees') {
      return `num_employees >= ${idx + 1}`;
    }
    if (filter === 'maxEmployees') {
      return `num_employees <= ${idx + 1}`;
    }
  });

  return {
    filters: filters.join(" AND "),
    values: values
  };
}


module.exports = { sqlForPartialUpdate };
