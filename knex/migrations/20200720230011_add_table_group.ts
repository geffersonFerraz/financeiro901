import { Knex } from 'knex';
import { Group } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Group.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('nome');
    table.string('telegramId');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Group.tableName);
