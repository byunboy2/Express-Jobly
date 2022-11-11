"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureIsAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");
const jobFilterSchema = require("../schemas/jobFilter.json");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { title, salary, equity, companyHandle }
 *
 * Authorization required: login as admin
 */

router.post("/", ensureIsAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body,
    jobNewSchema,
    { required: true }
  );

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }
  console.log("in route to create",req.body)
  const job = await Job.create(req.body);

  return res.status(201).json({ job });
});


/** GET /  =>
 *   { jobs: [ { title,salary,equity,companyHandle }, ...] }
 *
 * Can filter on provided search filters:
 *  - title
 *  - minSalary
 *  - hasEquity (if true, filter to jobs that provide a non-zero amount of equity)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    const jobs = await Job.findAll();
    return res.json({ jobs });
  }

  // const jobs = req.query;
  const filters = { ...req.query };

  filters.salary = Number(filters.salary);
  filters.equity = Number(filters.equity);

  const validator = jsonschema.validate(
    filters,
    jobFilterSchema,
    { required: true }
  );

  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  // const companies = await Company.filter(req.query);
  return res.json({ jobs });
});

/** GET /[id]  =>  { job }
 *
 *  Job is { title,salary,equity,companyHandle }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  const job = await Job.get(req.params.id);
  return res.json({ job });
});

/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Patches id data.
 *
 * fields can be: { title, salary, equity }
 * Doesn't make sense to change company relation. Would have to delete and remake
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: login as admin
 */

 router.patch("/:id", ensureIsAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body,
    jobUpdateSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const job = await Job.update(req.params.id, req.body);
  return res.json({ job });
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: login as admin
 */

 router.delete("/:id", ensureIsAdmin, async function (req, res, next) {
  await Job.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;