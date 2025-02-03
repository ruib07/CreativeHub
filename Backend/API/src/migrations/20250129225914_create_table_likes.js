exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('likes', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .notNull();

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('likes');
