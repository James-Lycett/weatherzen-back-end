const knex = require("../db/connection")

function create(newObservation) {
    return knex("observations")
        .insert(newObservation)
        .returning("*");
}

async function list() {
    return knex("observations")
    .select("*");
}

async function read(observationId) {
    return knex("observations")
    .select("*")
    .where({ observation_id: observationId })
    .then((returnedData) => returnedData[0])
}

async function update(updatedObservation) {
    return knex("observations")
    .select("*")
    .where({ observation_id: updatedObservation.observation_id})
    .update(updatedObservation, "*")
    .then((createdRecords) => createdRecords[0])
}

module.exports = {
    create,
    list,
    read,
    update,

}