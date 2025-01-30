exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('likes', (t) => {
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

    t.primary(['user_id', 'project_id']);
  });
};

exports.down = (knex) => knex.schema.dropTable('likes');
