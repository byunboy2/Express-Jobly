const { sqlForPartialUpdate } = require("./sql");

describe("sqlPartialUpdate", function () {
  test("converts js to sql format", function () {
    const data = {
      firstName: 'Aliya',
      age: 32
    };
    const jsToSql = {
      firstName: "first_name"
    };
    const response = sqlForPartialUpdate(data, jsToSql);
    expect(response).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32]
    });
  });
});