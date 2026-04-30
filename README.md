# sourik.dev — Portfolio

**Sourik Dutta** · Software Engineer · MS Computer Science, NYU

> 2+ years building high-throughput distributed backend systems at Insight Enterprises and Ernst & Young. Focused on performance, telemetry, and reliability across Azure and AWS.

**[sourik.dev](https://sourik.dev)** · [LinkedIn](https://linkedin.com/in/sourik-dutta-71a34a17b/) · [GitHub](https://github.com/sourikduttanyu) · [sourik1999dutta@gmail.com](mailto:sourik1999dutta@gmail.com)

---

## Experience

| Role | Company | Period |
|---|---|---|
| Software Engineer — Full Stack Systems & Cloud Architecture | Insight Enterprises | Jan 2023 – Nov 2023 |
| Software Engineer — API Development & Cloud Security | Hanu Software (acq. by Insight) | Jan 2022 – Jan 2023 |
| Software Engineer Intern — Data & Backend Infrastructure | Ernst & Young | May – Jul 2021 |

**Insight Enterprises** — Architected production LLM-as-a-service on Azure (AKS, .NET + Spring Boot, Redis, circuit breaking). Built AIOps telemetry pipeline via Azure Event Hubs → Z-Score/EWMA anomaly detection → PagerDuty pre-escalation. Sustained 99.86% SLO at 3,412 req/sec across 12,143 signals. Delivered Angular 15 + Azure SignalR real-time ops dashboard with Entra ID RBAC.

**Hanu Software** — Sub-100ms p95 latency under millions of enterprise API calls via C# .NET hot-path profiling (Span\<T\>, ArrayPool\<T\>), CosmosDB partition key redesign, OAuth 2.0 centralised at Azure APIM. Drove SAST findings to zero (Semgrep + Gitleaks + SonarQube). Cut Azure spend 18% via Databricks Spark cost analysis + Terraform right-sizing.

**Ernst & Young** — MQTT + 3-topic Kafka pipeline on AWS processing 1,842 daily IoT signals. AIOps pipeline with Z-Score/EWMA anomaly detection. Zero-downtime blue-green releases across 4 services via containerised microservice blueprints.

---

## Projects

### Feast Fleet — Serverless Food Delivery Platform
AWS Lambda · API Gateway · DynamoDB · OpenSearch · Amazon Lex · SageMaker

Serverless microservices architecture for food delivery logistics. 43% latency reduction for 1,248 concurrent users. 312ms search response, 74% NLP intent resolution via Amazon Lex.

### Route Savvy — MTA Transit Telemetry Optimizer
Apache Kafka · PySpark · Docker · AWS · Azure · Graph Algorithms

Processes 112M+ daily transit signals with 99.87% system stability. Distributed graph algorithms cut pathfinding latency 17% across 14,321 simulations. Multi-cloud (AWS + Azure).

### NYU Reddit Pipeline — Social Data Engineering
Python · PRAW API · AWS S3 · DynamoDB · Streamlit

AWS-native ingestion pipeline: raw data → S3, meta-attributes indexed in DynamoDB, downstream toxicity analysis dashboards in Streamlit.

### Job Tracker — Gmail Job Classification & Analytics Pipeline
Python · Gmail API (OAuth 2.0) · Regex · Ollama (LLaMA) · pandas · Streamlit · GitHub Actions

Auto-scans Gmail inbox and classifies job application emails into Applied / Interview / Offer / Rejected / Unknown. Regex handles ~95% of cases; ambiguous emails fall back to a local LLM via Ollama. Deduplicates on Message ID so re-runs are safe. Exports colour-coded `jobs.xlsx` and serves an interactive Streamlit dashboard with filters, charts, and inline status editing — zero manual entry.

[github.com/sourikduttanyu/gmail-job-tracker-ollama](https://github.com/sourikduttanyu/gmail-job-tracker-ollama)

### Go Pub/Sub Broker — In-Memory Message Broker
Go · Goroutines · Channels · RWMutex

Pub/sub engine mirroring Google Cloud Pub/Sub semantics. At-least-once delivery, per-subscription goroutine fan-out, configurable retry budget, dead-letter queue, graceful shutdown. Handler panics isolated from delivery loop.

---

## Site Stack

React 19 · Vite · Tailwind CSS v4 · Framer Motion · Lucide · Canvas particle field

No UI component libraries. Custom design throughout.

---

## Run Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Contact

Recruiter? Reach out via the [contact form](https://sourik.dev/#contact) or directly at [sourik1999dutta@gmail.com](mailto:sourik1999dutta@gmail.com).
