// Source of truth: Sourik_Master_Profile.md (project root). Keep claims inside its
// "honesty guardrails": 13,000 = addressable users, 99.86% = internal SLO, ~40% = affected
// resource categories, C++ = hot-path optimization, EWMA shipped at Insight.
// `keywords` = recruiter-facing skills; `stack` lists only technologies named in that job's `text` (shown in the hover box on its TV).
// Each job shows on one work monitor (public/clips/<slug>.mp4 replaces the placeholder).

export const experience = [
  {
    slug: 'insight',
    company: 'Insight Enterprises',
    role: 'Software Engineer, Cloud & AI Platform',
    period: 'Jan 2023 – Nov 2023',
    keywords: ['Java', 'Microservices', 'Kubernetes', 'Azure', 'LLM platforms'],
    stack: ['Spring Boot', 'AKS', 'Azure OpenAI', 'Kafka', 'Redis', 'Angular'],
    work: [
      {
        name: 'LLM-as-a-service platform',
        skill: 'Distributed systems',
        text: 'Architected the governed way ~13,000 teammates use LLMs: Spring Boot microservices on AKS in front of Azure OpenAI, with Entra ID auth, per-team rate limits and token budgets, a Redis response cache and Resilience4j circuit breaking.',
      },
      {
        name: 'Telemetry and AIOps',
        skill: 'Observability',
        text: 'Every request emits latency, token, cost and status signals into Event Hubs, feeding Z-Score and EWMA anomaly detection that routes alerts before they escalate.',
      },
      {
        name: 'Reliability ownership',
        skill: 'SRE',
        text: 'Held a 99.86% internal SLO at ~3,412 concurrent req/s. Traced a connection leak to per-request HTTP clients exhausting ephemeral ports and fixed it with a pooled keep-alive client; repartitioned Kafka from 12 to 48.',
      },
      {
        name: 'Real-time ops dashboard',
        skill: 'Frontend',
        text: 'Angular 15 over SignalR WebSockets, with OnPush change detection holding 60fps and RBAC-gated views.',
      },
      {
        name: 'Healthcare partner portal',
        skill: 'Full stack',
        text: 'Owned the frontend where partners manage patients, doctors and recurring medical subscriptions, working directly with a PM and a UI/UX designer.',
      },
      {
        name: 'Computer-vision warehousing',
        skill: 'Backend',
        text: 'Built the backend and serving layer around a model that tags bottles to speed up warehousing, handling messy, high-volume real-world data.',
      },
      {
        name: 'Forward-deployed and mentoring',
        skill: 'Leadership',
        text: 'Embedded with 3 customer-engineering teams, which reshaped the cache-key design; mentored junior engineers through pair programming.',
      },
    ],
  },
  {
    slug: 'hanu',
    company: 'Hanu Software',
    role: 'Software Engineer, API & Cloud Security',
    period: 'Jan 2022 – Jan 2023',
    keywords: ['C++', 'C#', 'API performance', 'CI/CD security', 'Infrastructure as code'],
    stack: ['C++', 'C#', 'CosmosDB', 'Terraform', 'Databricks', 'React + TypeScript'],
    work: [
      {
        name: 'API latency',
        skill: 'Backend',
        text: 'Sub-100ms p95 under millions of concurrent enterprise requests: C++ string_view for zero-allocation slicing, a C# access check from O(n) to O(1), tuned CosmosDB indexing and point reads. Built a k6 load-testing harness.',
      },
      {
        name: 'Security pipeline',
        skill: 'DevSecOps',
        text: 'Semgrep, Gitleaks and SonarQube gates on GitHub Actions took critical findings to zero and coverage from the low 30s to ~55%. Adopted by 4 teams.',
      },
      {
        name: 'Cloud cost',
        skill: 'Data · Infra',
        text: 'Databricks Spark cost analysis, right-sizing and Terraform + VMSS autoscaling cut Azure spend ~40% on the affected resources; CI/CD velocity up 27%.',
      },
      {
        name: 'FinOps and security dashboard',
        skill: 'Frontend',
        text: 'React 18 + TypeScript with live REST feeds, Recharts and Entra ID OAuth2 PKCE.',
      },
    ],
  },
  {
    slug: 'ey',
    company: 'Ernst & Young',
    role: 'Software Engineer Intern',
    period: 'May 2021 – Jul 2021',
    keywords: ['Data streaming', 'Kafka', 'AWS', 'IoT', 'Caching'],
    stack: ['MQTT', 'Kafka', 'AWS', 'TimescaleDB', 'Redis', 'Spark'],
    work: [
      {
        name: 'IoT streaming pipeline',
        skill: 'Streaming',
        text: 'Industrial sensor data over MQTT into a 3-topic Kafka pipeline on AWS, persisted to TimescaleDB so the durable store stays off the real-time path.',
      },
      {
        name: 'KPI dashboard caching',
        skill: 'Performance',
        text: 'A Redis layer over Spark aggregations cut dashboard query latency 85%, from 250ms to 38ms.',
      },
    ],
  },
]
