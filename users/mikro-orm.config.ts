import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { defineConfig } from '@mikro-orm/core';
import { User } from './src/entities/User';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig<PostgreSqlDriver>({
  entities: [User],
  dbName: 'users_db',
  driver: PostgreSqlDriver,
  host: 'users-psql-srv',
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  debug: true,
  extensions: [Migrator],
  migrations: {
    tableName: 'mikro_orm_migrations', // Change if needed
    path: './src/migrations', // Adjust the path to your migrations directory
  },
});
