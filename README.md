export const scheduledEmails = pgTable("scheduled_emails", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .references(() => customers.id, { onDelete: "cascade" }) // 💡 foreign key
    .notNull(),

  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  body: text("body").notNull(),
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

needed 