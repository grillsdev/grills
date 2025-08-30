<div align="center">
  
  <img src="public/apple-icon.png" alt="Grills Logo" width="80" />
  
  <br>
  
  # Grills
  
  ### A free, open source alternative to **Lovable, Bolt and v0.**
  
  <br>
  
</div>

![Grills demo fallback](https://bucket.grills.dev/grills-giff.gif)
<div align="center">
UI built on grills platform
</div>


## Purpose

- **Too pricey to use** – Most AI UI builders are super expensive, which makes them tough to afford for indie devs and small teams.
- **Doesn’t play nice with your code** – The UIs they generate usually don’t fit smoothly into existing projects, so you end up spending extra time fixing things.
- **Annoying subscriptions** – A lot of platforms lock you into subscriptions and charge even if you’re not really using them.

## Feature

- **BYOK (Bring Your Own Keys)**: Use your own API keys. Your budget, your rules.
- **Use your favorite LLMs**: Works with all major providers (OpenAI, Anthropic, Google, Groq, Together, etc.).
- **Unstyled shadcn UI, plug-and-play**: Generates clean, unstyled shadcn components you can drop right into your existing project.
- **Copy & paste into prod**: Generate, copy, paste—done. No overhead or lock-in.
- **Live preview**: See what you’re building as you go, no guessing.

## ⚠️ Warning

> This project is in a very early stage. We are actively adding and removing features, which may introduce breaking changes. Use with caution in production.

## Local Setup

### 1) Clone and install

```bash
git clone https://github.com/grillsdev/grills.git
cd grills
pnpm install
```

### 2) Create .env from .example.env

```bash
cp .example.env .env
```

Fill the variables in `.env`:

```bash
# App/auth
BETTER_AUTH_SECRET=replace_me
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional for login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
# For app/runtime libraries that read DATABASE_URL
DATABASE_URL=postgresql://grilluser:grills@localhost:5433/grills
# Drizzle uses this for local migrations (see drizzle.config.ts)
LOCAL_DB_URL=postgresql://grilluser:grills@localhost:5433/grills

# Redis (optional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Notes:

- `drizzle.config.ts` is already set to use `LOCAL_DB_URL` when `prod` is `false`. If you change that behavior, update it accordingly.
- Make sure the DB is reachable at the URL above (or change both URLs to your local Postgres).

### 3) Hyperdrive local connection (Wrangler)

In `wrangler.jsonc`, ensure `hyperdrive[0].localConnectionString` matches your local DB URL:

```jsonc
"hyperdrive": [
  {
    "binding": "HYPERDRIVE",
    "id": "38770883636d4d7cb3bc279b34556e1",
    "localConnectionString": "postgresql://grilluser:grills@localhost:5433/grills"
  }
]
```

If you use a different DB, update both `LOCAL_DB_URL` in `.env` and this `localConnectionString` to match.

### 4) Run DB migrations and open studio

```bash
pnpm db:migrate
pnpm db:studio
```

Then add LLMs and Models:

- Follow the format shown in `example.llms.ts` (Note `title` in LLM Table Field and `name` in Model Table Fields)
- In the LLM table: use the same `title` as in the example
- In the Model table: use the same `name` is the model slug (e.g., `openai/gpt-5-mini`), `title` is the public-facing name

Example reference (from `example.llms.ts`):

```ts
export const llms = [
  { id: "default", title: "openai", name: "Open AI" },
  { id: "default", title: "openrouter", name: "Open Router" },
];

export const models = [
  {
    id: "default",
    title: "Kimi K2",
    name: "moonshotai/kimi-k2",
    llm_id: "openrouter-primarykey",
    created_at: "Select now",
  },
  {
    id: "default",
    title: "Qwen3 Coder",
    name: "qwen/qwen3-coder",
    llm_id: "openrouter-primarykey",
    created_at: "Select now",
  },
  {
    id: "default",
    title: "GPT 5 Mini",
    name: "openai/gpt-5-mini",
    llm_id: "openrouter-primarykey",
    created_at: "Select now",
  },
  {
    id: "default",
    title: "G 2.5 flash lite",
    name: "google/gemini-2.5-flash-lite",
    llm_id: "openrouter-primarykey",
    created_at: "Select now",
  },
];
```

### 5) Start the app

```bash
pnpm dev
```

## Major Todo's

### LLMs

- [x] OpenAI
- [x] OpenRouter
- [ ] Gemini
- [ ] Claude
- [ ] Grok
- [ ] Groq
- [ ] TogetherAI

### Other

- [ ] Multiple file support
- [ ] E2B support
- [ ] Reasoning Support
- [ ] Image Support
- [ ] Publish UI
- [ ] Share whole chat
