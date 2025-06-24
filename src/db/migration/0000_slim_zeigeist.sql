CREATE TABLE "llm" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(225) NOT NULL,
	"name" varchar(225) NOT NULL,
	CONSTRAINT "llm_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(225) NOT NULL,
	"name" varchar(225) NOT NULL,
	"llm_id" uuid NOT NULL,
	CONSTRAINT "model_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "model" ADD CONSTRAINT "model_llm_id_llm_id_fk" FOREIGN KEY ("llm_id") REFERENCES "public"."llm"("id") ON DELETE cascade ON UPDATE no action;