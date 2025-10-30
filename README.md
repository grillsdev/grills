<div align="center">
  
  <img src="public/apple-icon.png" alt="Grills Logo" width="80" />
  
  <br>
  
  # Grills
  
  ### Your Own Gen UI Platform
  
  ![](public/grills-demo.gif)

  <br>
  
</div>


## Purpose

- **flexibility** - Most AI platforms only generate UI code for Next.js, Tailwind, and ShadCN, which is pretty limiting. If you’re using Angular, Vue, or Svelte, you’re out of luck. We’re here to fix that.

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
# Drizzle uses this for local migrations (see drizzle.config.ts)
LOCAL_DB_URL=postgresql://grilluser:grills@localhost:5433/grills

# Redis (optional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# E2b Sandbox
SANDBOX_ID=89o8700b7nj0m6neqtye # Do not change this id
```

Notes:

- `drizzle.config.ts` is already set to use `LOCAL_DB_URL` when `prod` is `false`. If you change that behavior, update it accordingly.
- Make sure the DB is reachable at the URL above (or change both URLs to your local Postgres).

### 3) Hyperdrive local connection (Wrangler)

In `wrangler.jsonc`, ensure `hyperdrive[0].localConnectionString` matches your local DB URL:
- For production setup your database with CF Hyperdrive [docs](https://developers.cloudflare.com/hyperdrive/)

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

- Follow the format shown in `models.ts` 
- Id should be unique.

Example reference (from `lib/modles.ts`):

```ts
const anthropic: Model[] = [
    {id: "42916ff9-08a3-4219-9c49-9f3d2a999e03", title: "Claude Sonnet 4.5", slug: "claude-sonnet-4-5-20250929", isReasoning:false, isMultiModel:true},
    {id: "7e1fc859-c221-4adc-8397-7306c78b79b5", title: "Claude Sonnet 4.5", slug: "claude-sonnet-4-5-20250929", isReasoning:true, isMultiModel:true},
    {id: "7e1fc859-c221-4adc-8397-7306c78b79b9", title: "Claude Haiku 4.5", slug: "claude-haiku-4-5-20251001", isReasoning:true, isMultiModel:true},
]
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
- [x] Claude
- [ ] Grok
- [ ] Groq
- [ ] TogetherAI

### Other

- [x] Multiple file support
- [ ] Daytona support
- [x] E2B support
- [x] Reasoning Support
- [ ] Image Support
- [ ] Publish UI
- [ ] Share whole chat
- [x] Context 7

### Framework
- [x] Next
- [ ] Veu
- [ ] Solid
- [ ] Astro
- [ ] Angular
- [ ] Svelte
