import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :softwareengineeringprojectbackend1, Softwareengineeringprojectbackend1.Repo,
  database:
    Path.expand("../softwareengineeringprojectbackend1_test.db", Path.dirname(__ENV__.file)),
  pool_size: 5,
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :softwareengineeringprojectbackend1, Softwareengineeringprojectbackend1Web.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "3ZUR1zMEt+Kxb120fWSmzObWNjgnAfcjmRqsb9FFvWPZxDAWaF9ULMcWvZrQ71ET",
  server: false

# In test we don't send emails.
config :softwareengineeringprojectbackend1, Softwareengineeringprojectbackend1.Mailer,
  adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
