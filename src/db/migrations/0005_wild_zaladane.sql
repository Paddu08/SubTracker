ALTER TABLE "scheduled_emails" RENAME COLUMN "body" TO "reminder_title";--> statement-breakpoint
ALTER TABLE "scheduled_emails" DROP COLUMN "subject";