import { pgTable, varchar, uuid} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

export const llm = pgTable("llm", {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    title: varchar({length: 225}).notNull(), //public facing llm name
    name: varchar({length: 225}).notNull(), //for internal use
})

export const model = pgTable("model", {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    title: varchar({length: 225}).notNull(), //public facing model name
    name: varchar({length: 225}).notNull(), //for internal use 
    llmId: uuid("llm_id").references(()=>llm.id, {onDelete:'cascade'}).notNull()
})

// export const llmRelations  = relations(llm, ({many})=>({
//     model: many(model)
// }))

// export const modelRelations = relations(model, ({one}) => ({
//     llm: one(llm, {
//         fields: [model.llmId],
//         references: [llm.id]
//     })
// }))
