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
    {id:"default", title: "Grok Code Fast 1", name: "x-ai/grok-code-fast-1", llm_id: "openrouter-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT-5 Mini", name: "gpt-5-mini-2025-08-07", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT-5 Nano", name: "gpt-5-nano-2025-08-07", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT-4.1", name: "gpt-4.1", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT-4.1 Mini", name: "gpt-4.1-mini", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT 4o", name: "gpt-4o", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT o4 Mini", name: "o4-mini", llm_id: "openai-primarykey", created_at: "Select now"},
    {id:"default", title: "GPT o3 Mini ", name: "o3-mini", llm_id: "openai-primarykey", created_at: "Select now"},
]