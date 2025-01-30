exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name', 60).notNull();
    t.string('email', 100).notNull().unique();
    t.string('password', 100).notNull();
    t.string('role', 50)
      .notNull()
      .defaultTo('designer');
    t.string('bio').notNull();
    t.string('avatar_url', 255).notNull();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
  });

  await knex.raw(`
    ALTER TABLE users 
    ADD CONSTRAINT check_role 
    CHECK (role IN ('designer', 'photographer', 'developer'))
  `);
};

exports.down = (knex) => knex.schema.dropTable('users');
