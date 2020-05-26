// -   `GET /api/schemes/` - gets master list of schemes (without steps)
// -   `GET /api/schemes/:id` - gets a single scheme
// -   `GET /api/schemes/:id/steps` - gets all steps for a given scheme, ordered correctly
// -   `POST /api/schemes` - adds a new scheme
// -   `PUT /api/schemes:id` - updates a given scheme
// -   `DELETE /api/schemes/:id` - removes a given scheme and all associated steps

const db = require("../database");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps as s", "s.scheme_id", "schemes.id")
    .select("s.scheme_id", "scheme_name", "s.step_number", "s.instructions")
    .where("s.scheme_id", id)
    .orderBy("s.step_number");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((responso) => {
      return findById(responso[0]);
    });
}

function update(changes, id) {
  return db("schemes").where({ id }).first().update(changes);
}

function remove(id) {
  return db("schemes").where({ id }).del();
}

// -   `find()`:
//     -   Calling find returns a promise that resolves to an array of all schemes in the database.
//     -   No steps are included.
// -   `findById(id)`:
//     -   Expects a scheme `id` as its only parameter.
//     -   Resolve to a single scheme object.
//     -   On an invalid `id`, resolves to `null`.
// -   `findSteps(id)`:
//     -   Expects a scheme `id`.
//     -   Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
//     -   This array should include the `scheme_name` _not_ the `scheme_id`.
// -   `add(scheme)`:
//     -   Expects a scheme object.
//     -   Inserts scheme into the database.
//     -   Resolves to the newly inserted scheme, including `id`.
// -   `update(changes, id)`:
//     -   Expects a changes object and an `id`.
//     -   Updates the scheme with the given id.
//     -   Resolves to the newly updated scheme object.
// -   `remove(id)`:
