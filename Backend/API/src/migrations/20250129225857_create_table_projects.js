exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return knex.schema.createTable('projects', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('title', 80).notNull();
    t.text('description').notNull();
    t.specificType('tags', 'TEXT[]').notNull();
    t.specificType('image_urls', 'TEXT[]').notNull();

    t.uuid('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .notNull();

    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNull();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = (knex) => knex.schema.dropTable('projects');
