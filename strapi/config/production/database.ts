export default ({ env }) => {
  const client = process.env.DATABASE_CLIENT;

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
