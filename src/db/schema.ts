import { pgTable, serial, varchar,  timestamp, integer,boolean  } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    clerkId: varchar("clerk_id").unique(),
    email: varchar("email").unique().notNull(),
    phone: varchar("phone").unique().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
 

export const subscriptions=pgTable("subscriptions", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id")
        .notNull()
        .references(() => customers.id, { onDelete: "cascade" }),
    plan: varchar("plan").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    status: varchar("status").notNull(),
    price: integer("price").notNull(),
    currency: varchar("currency").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
export const customersRelations = relations(customers, ({ many }) => ({
    subscriptions: many(subscriptions),
}))


export const scheduledEmails = pgTable("scheduled_emails", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .references(() => customers.id, { onDelete: "cascade" }) // 💡 foreign key
    .notNull(),

  email: varchar("email", { length: 255 }).notNull(),
  reminderTitle: varchar("reminder_title", { length: 255 }).notNull(),

  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  sent: boolean("sent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const scheduledEmailsRelations = relations(scheduledEmails, ({ one }) => ({
  customer: one(customers, {
    fields: [scheduledEmails.customerId],
    references: [customers.id],
  }),
}));
