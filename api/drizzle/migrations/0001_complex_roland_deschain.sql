CREATE TYPE "public"."subscriptionTierEnum" AS ENUM('Free', 'Silver', 'Gold', 'Platinum');--> statement-breakpoint
CREATE TABLE "salon_subscription_tier" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "salon_subscription_tier_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"subscription" "subscriptionTierEnum" NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "salon_subscription_tier_subscription_unique" UNIQUE("subscription")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "salons" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "salons" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "owner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "address_line" text NOT NULL;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "area" text;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "subscription_tier_id" integer;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "avg_rating" numeric(2, 1) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "total_reviews" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "total_bookings" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "salons" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "salons" ADD CONSTRAINT "salons_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salons" ADD CONSTRAINT "salons_subscription_tier_id_salon_subscription_tier_id_fk" FOREIGN KEY ("subscription_tier_id") REFERENCES "public"."salon_subscription_tier"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "salon_slug_idx" ON "salons" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "salons_owner_idx" ON "salons" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "salons_city_idx" ON "salons" USING btree ("city");--> statement-breakpoint
CREATE INDEX "salons_area_idx" ON "salons" USING btree ("area");--> statement-breakpoint
CREATE INDEX "salons_active_idx" ON "salons" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "salons_verified_idx" ON "salons" USING btree ("is_verified");