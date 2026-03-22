CREATE TYPE "public"."imageProviderEnum" AS ENUM('S3', 'Cloudinary', 'Local');--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "amenities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"icon" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "amenities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "salon_amenities" (
	"salon_id" uuid NOT NULL,
	"amenity_id" integer NOT NULL,
	CONSTRAINT "salon_amenities_salon_id_amenity_id_pk" PRIMARY KEY("salon_id","amenity_id")
);
--> statement-breakpoint
CREATE TABLE "salon_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"salon_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"open_time" time,
	"close_time" time,
	"is_closed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "salon_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"salon_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"provider" "imageProviderEnum" DEFAULT 'Cloudinary' NOT NULL,
	"is_cover" boolean DEFAULT false,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "salon_amenities" ADD CONSTRAINT "salon_amenities_salon_id_salons_id_fk" FOREIGN KEY ("salon_id") REFERENCES "public"."salons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salon_amenities" ADD CONSTRAINT "salon_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salon_hours" ADD CONSTRAINT "salon_hours_salon_id_salons_id_fk" FOREIGN KEY ("salon_id") REFERENCES "public"."salons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salon_images" ADD CONSTRAINT "salon_images_salon_id_salons_id_fk" FOREIGN KEY ("salon_id") REFERENCES "public"."salons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "salon_day_unique" ON "salon_hours" USING btree ("salon_id","day_of_week");--> statement-breakpoint
CREATE INDEX "salon_hours_salon_idx" ON "salon_hours" USING btree ("salon_id");--> statement-breakpoint
CREATE INDEX "salon_images_salon_idx" ON "salon_images" USING btree ("salon_id");--> statement-breakpoint
CREATE UNIQUE INDEX "salon_images_order_unique" ON "salon_images" USING btree ("salon_id","display_order");