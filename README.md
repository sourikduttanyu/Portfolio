# sourik.dev — Portfolio

**Sourik Dutta** · Software Engineer · MS Computer Science, NYU

> 2+ years building high-throughput distributed backend systems at Insight Enterprises and Ernst & Young. Focused on performance, telemetry, and reliability across Azure and AWS.

**[sourik.dev](https://sourik.dev)** · [LinkedIn](https://linkedin.com/in/sourik-dutta-71a34a17b/) · [GitHub](https://github.com/sourikduttanyu) · [sourik1999dutta@gmail.com](mailto:sourik1999dutta@gmail.com)

---

## Experience

| Role | Company | Period |
|---|---|---|
| Software Engineer | Insight Enterprises | Jan 2022 – Nov 2023 |
| Software Engineering Intern | Ernst & Young | May – Jul 2021 |
| Graduate Assistant | New York University | May – Sep 2025 |

**Insight Enterprises** — Built Java Spring Boot microservices sustaining 3,412 concurrent auth requests/sec across multi-region Azure environments. Maintained 99.86% SLA as DRI monitoring 12,143 production signals. Reduced cloud spend 18% via Azure Monitor right-sizing.

**Ernst & Young** — IoT ingestion pipeline processing 1,842 daily sensor signals via MQTT + Apache Kafka on AWS. Introduced Redis caching layer that dropped dashboard query latency from 250ms → 2ms. Built React + WebSocket real-time dashboards backed by Flask.

**NYU Graduate Assistant** — Java microservice with Slack API integrations that accelerated operational workflows 30% across 52 departmental offerings.

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
