exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('views', (t) => {
    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .nullable();

    t.uuid('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .notNull();

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();

    t.primary(['user_id', 'project_id', 'created_at']);
  });
};

exports.down = (knex) => knex.schema.dropTable('views');
