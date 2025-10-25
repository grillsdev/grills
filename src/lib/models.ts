import { Model, LLM } from "./types"


const openRouter: Model[] = [
    {id: "515b3938-ba23-4054-8a7d-b1814193e6fd", title: "Kimi K2", slug: "moonshotai/kimi-k2-0905", isReasoning: true, isMultiModel:false},
    {id: "9c2104gh-66a2-4226-801d-a9b308ea0397", title: "Gemini 2.5 Pro", slug: "google/gemini-2.5-pro", isReasoning: true, isMultiModel:true},
    {id: "9c2d220d-66a2-4226-801d-a9b308ea0397", title: "Gemini 2.5 Flash", slug: "google/gemini-2.5-flash", isReasoning: true, isMultiModel: true},
    {id: "9c2d220d-66a2-4226-801d-a9bg4-2851d0", title: "Gemini 2.5 Flash", slug: "google/gemini-2.5-flash", isReasoning: false, isMultiModel:true},
    {id: "c5f0b9b4-0aa4-4c5a-8763-23fce8cff4fe", title: "Gemini 2.5 Flash Lite", slug: "google/gemini-2.5-flash-lite", isReasoning: true, isMultiModel:true},
    {id: "1907b2f4-a0eb-4a78-9f36-dc7c93f3aeaf", title: "Gemini 2.5 Flash Lite", slug: "google/gemini-2.5-flash-lite", isReasoning: false, isMultiModel:true},
    {id: "7479209a-9e67-11f0-a5d3-325096b39f47", title: "Qwen3 Coder", slug: "qwen/qwen3-coder", isReasoning:false, isMultiModel:false},
    {id: "5a15c5f0-9ec7-11f0-8892-925096939f48", title: "Claude Sonnet 4.5", slug: "anthropic/claude-sonnet-4.5", isReasoning:true, isMultiModel:true},
    {id: "5a15d5f0-9ec7-11f0-8892-925096939g9q", title: "Claude Sonnet 4.5", slug: "anthropic/claude-sonnet-4.5", isReasoning:false, isMultiModel:true},
    {id: "3a15ca32-9ec8-11f0-8c38-325096b39f47", title: "Deepseek Chat v3.1", slug: "deepseek/deepseek-chat-v3.1", isReasoning:true, isMultiModel:false},
    {id: "3a15ca30-9ec8-11f0-8c38-325196b39f40", title: "Deepseek Chat v3.1", slug: "deepseek/deepseek-chat-v3.1", isReasoning:false, isMultiModel:false},
    {id: "3787a35e-c045-4328-8290-088180785769", title: "Grok Code Fast 1", slug: "x-ai/grok-code-fast-1", isReasoning:true, isMultiModel: false},
    {id: "4d8c8160-cceb-4368-95df-5e26e12cd3b6", title: "Z.AI: GLM 4.6", slug: "z-ai/glm-4.6", isReasoning:true, isMultiModel:false},
]

const openAI: Model[] = [
    {id: "931f52c9-9da4-4cd4-a448-39fc006a6a3b", title: "GPT 5 Mini", slug: "gpt-5-mini", isReasoning:false, isMultiModel:true},
    {id: "9deb64e1-c46e-448a-88aa-20c808aafde1", title: "GPT 5 Mini", slug: "gpt-5-mini", isReasoning:true, isMultiModel:true},
    {id: "5zb64e1-c46e-448a-88aa-20c8009pafde1", title: "GPT 5", slug: "gpt-5", isReasoning:false, isMultiModel:true},
    {id: "6b64e1-c36e-443a-77aa-20c8009pafde03", title: "GPT 5", slug: "gpt-5", isReasoning:true, isMultiModel:true}
]

const anthropic: Model[] = [
    {id: "42916ff9-08a3-4219-9c49-9f3d2a999e03", title: "Claude Sonnet 4.5", slug: "claude-sonnet-4-5-20250929", isReasoning:false, isMultiModel:true},
    {id: "7e1fc859-c221-4adc-8397-7306c78b79b5", title: "Claude Sonnet 4.5", slug: "claude-sonnet-4-5-20250929", isReasoning:true, isMultiModel:true},
    {id: "7e1fc859-c221-4adc-8397-7306c78b79b9", title: "Claude Haiku 4.5", slug: "claude-haiku-4-5-20251001", isReasoning:true, isMultiModel:true},
]

export const models: LLM[] = [
    {
        id: "74791e88-9e67-11f0-b8db-325096b39f47",
        title: "Open Router",
        slug: "openrouter",
        models: [...openRouter].sort((a, b) => a.title.localeCompare(b.title)),
    },
    {id: "ed525e23-0a27-4582-84d7-b94ea4be9c9c", title: "Open AI", slug: "openai", models: [...openAI].sort((a, b) => a.title.localeCompare(b.title))},
    {id: "0eff7084-7d2c-4576-9273-06e657ea46ed", title: "Anthropic", slug: "anthropic", models: [...anthropic].sort((a, b) => a.title.localeCompare(b.title))}
]