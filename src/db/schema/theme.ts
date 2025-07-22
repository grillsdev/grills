import { pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth"

export const userTheme = pgTable("user_theme",{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({length: 50}),
    color: varchar({length:50}), //primary color of the theme in Hex code
    data: text(),
    createdAt: timestamp("created_at").notNull(),
    user: text("user_id").references(()=>user.id, {onDelete: 'cascade'}).notNull()
})