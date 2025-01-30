exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('categories', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name', 80).notNull().unique();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('categories');
