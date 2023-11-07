// adding temperature columns, max and min validation to be done at business level
exports.up = function(knex) {
  return knex.schema.alterTable("observations", (table) => {
    table.integer("air_temperature", null);
    table.string("air_temperature_unit", null);
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable("observations", (table) => {
    table.dropColumn("air_temperature");
    table.dropColumn("air_temperature_unit");
  })
}
