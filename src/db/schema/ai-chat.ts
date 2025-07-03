// AI Chat
import { pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const aiChat = pgTable("ai_chat", {
    id: uuid('id').primaryKey().defaultRandom(),
    chatId: text('chat_id').notNull(),
    title: varchar({length:300}),
    admin: text("user_id").references(()=>user.id, {onDelete: 'cascade'}).notNull(), //the real admin/user whho created/started this aichat, i may be started the chat i may be not can be diff but it always show that who started it, in case if forked/shared i should be the user
    type: text("role", {enum: ['admin', 'joined', 'forked'] }).notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})