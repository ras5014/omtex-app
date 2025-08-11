export default ({ env }) => {
  console.log("=== PRODUCTION DATABASE CONFIGURATION STARTING ===");
  console.log("Environment function type:", typeof env);
  console.log("Environment function keys:", Object.keys(env));

  // Test if env function is working
  try {
    const testValue = env("NODE_ENV", "default");
    console.log("NODE_ENV test:", testValue);
  } catch (error) {
    console.error("Error testing env function:", error);
  }

  // Try to get all possible environment variables
  const possibleEnvVars = [
    "NODE_ENV",
    "DATABASE_CLIENT",
    "DATABASE_URL",
    "DATABASE_HOST",
    "DATABASE_PORT",
    "DATABASE_NAME",
    "DATABASE_USERNAME",
    "DATABASE_PASSWORD",
  ];

  console.log("Checking environment variables:");
  possibleEnvVars.forEach((varName) => {
    try {
      const value = env(varName);
      console.log(`${varName}: ${value ? "SET" : "NOT SET"}`);
    } catch (error) {
      console.log(`${varName}: ERROR - ${error.message}`);
    }
  });

  const client = env("DATABASE_CLIENT", "postgres");
  console.log("Database client:", client);

  // Ensure DATABASE_URL is set
  const databaseUrl = env("DATABASE_URL");
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set");
    throw new Error(
      "DATABASE_URL environment variable is required for production"
    );
  }
  console.log("DATABASE_URL is set:", databaseUrl ? "Yes" : "No");

  // Check if DATABASE_URL is a valid connection string
  if (
    !databaseUrl.startsWith("postgresql://") &&
    !databaseUrl.startsWith("postgres://")
  ) {
    console.error(
      "Invalid DATABASE_URL format. Expected postgresql:// or postgres://"
    );
    throw new Error(
      "DATABASE_URL must be a valid PostgreSQL connection string"
    );
  }

  // SSL configuration for "require" mode
  const sslConfig = {
    rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false),
    // Additional SSL options for "require" mode
    ssl: true,
  };

  console.log("SSL configuration:", sslConfig);

  // Create a more robust configuration structure
  const config = {
    connection: {
      client,
      connection: {
        connectionString: databaseUrl,
        ssl: sslConfig,
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };

  console.log("Final database configuration:", JSON.stringify(config, null, 2));

  // Ensure the configuration has the expected structure
  if (!config.connection || !config.connection.client) {
    console.error("Invalid configuration structure:", config);
    throw new Error(
      "Database configuration must have connection.client property"
    );
  }

  console.log("=== PRODUCTION DATABASE CONFIGURATION COMPLETE ===");
  return config;
};
