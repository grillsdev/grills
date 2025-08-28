/**
 * add the llm and modles to the DB LLM table and Model Table 
 * make sure use the same title (model sloug should be same) and name public facing name
 * name in Model is model sloug and title is public facing name/title
 */

export const llms = [
    {id:"default", title:"openai", name: "Open AI"},
    {id:"default", title:"openrouter", name: "Open Router"},
]

export const models = [
    {id:"default", title: "Kimi K2", name: "moonshotai/kimi-k2", llm_id: "openrouter-primarykey", created_at: "Select now"},
    {id:"default", title: "Qwen3 Coder", name: "qwen/qwen3-coder", llm_id: "openrouter-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT 5 Mini", name: "openai/gpt-5-mini", llm_id: "openrouter-primarykey", created_at: "Select now"},
    {id:"default", title: "G 2.5 flash lite", name: "google/gemini-2.5-flash-lite", llm_id: "openrouter-primarykey", created_at: "Select now"},
]