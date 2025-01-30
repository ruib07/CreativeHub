exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('comments', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.text('comment').notNull();

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
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('comments');
