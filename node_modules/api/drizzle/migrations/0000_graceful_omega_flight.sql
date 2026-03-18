CREATE TABLE "salons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"location" "geography(POINT, 4326)"
);
