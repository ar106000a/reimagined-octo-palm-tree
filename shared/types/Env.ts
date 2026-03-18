export type Env={
    Bindings: {
    JWT_ACCESS_SECRET: string;
  };
  Variables: {
    user: {
      id: string; // uuid
      email: string;
      username: string;
      password_hash: string; // Sensitive, but present in DB
      first_name: string | null;
      last_name: string | null;
      is_verified: boolean;
      created_at: string; // Timestamps are usually strings (ISO) when fetched
      updated_at: string;
      avatar_url: string | null;
      github_connected: boolean;
      points: number; // bigint maps to number (or string if > 2^53)
      rank: string; // varchar
      is_test_user: boolean;
    };
  };
}