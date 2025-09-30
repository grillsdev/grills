import { pgTable, varchar, uuid, timestamp, boolean} from "drizzle-orm/pg-core";

export const llm = pgTable("llm", {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    title: varchar({length: 225}).notNull(), //public facing llm name
    name: varchar({length: 225}).notNull(), //for internal use
})

export const model = pgTable("model", {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    title: varchar('title', {length: 225}).notNull(),
    name: varchar('name', {length: 225}).notNull(),
    isReasoning: boolean('is_reasoning').default(false).notNull(),
    llmId: uuid("llm_id").references(()=>llm.id, {onDelete:'cascade'}).notNull(),
    createdAt: timestamp("created_at").notNull()
})
