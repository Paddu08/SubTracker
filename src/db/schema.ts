import { pgTable, serial, varchar,  timestamp, integer,  } from "drizzle-orm/pg-core"
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