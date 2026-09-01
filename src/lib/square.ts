import { Client, Environment } from "square/legacy";

let _client: Client | null = null;

export function getSquareClient(): Client {
  if (_client) return _client;
  _client = new Client({
    bearerAuthCredentials: { accessToken: process.env.SQUARE_ACCESS_TOKEN! },
    environment:
      process.env.SQUARE_ENVIRONMENT === "production" ? Environment.Production : Environment.Sandbox,
  });
  return _client;
}
