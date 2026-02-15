# 🌍 MemoGlobe — Shared Agent Directive v1.0

> **Project Codename**: MemoGlobe
> **Subtitle**: Geo-Metacognitive Self-Evolution Learning Platform
> **Directive Authority**: 달의이성 (Reason of Moon)
> **Effective Date**: 2026-02-15
> **Agents**: CODEX (Backend/Execution) × ANTIGRAVITY (Frontend/Knowledge)
> **Protocol Base**: Prometheus Developer Agent v3.0

---

## 0. HOW TO READ THIS DOCUMENT

This directive is the **single source of truth** for both agents. Every design decision, API contract, naming convention, and communication rule lives here. When in doubt, refer here first. When this document is silent, escalate to 달의이성.

```
📖 Structure:
  §1  — Project Vision & Core Thesis (WHY)
  §2  — Architecture & Data Model (WHAT)
  §3  — API Contract (HOW they talk)
  §4  — Agent Role Assignment (WHO does WHAT)
  §5  — Coding Standards & Conventions (HOW to code)
  §6  — Communication Protocol (HOW agents talk)
  §7  — Development Phases & Timeline (WHEN)
  §8  — Quality Gates & Definition of Done (HOW GOOD)
  §9  — Glossary (WHAT words mean)
```

---

## 1. PROJECT VISION & CORE THESIS

### 1.1 One-Line Pitch

**"Write notes on a globe. AI finds your blind spots. Places make you remember."**

**"지구 위에 필기하라. AI가 빈칸을 찾는다. 장소가 기억하게 한다."**

### 1.2 Problem Statement

Students take notes but never know:
1. **What they don't know** (knowledge gaps are invisible)
2. **How to remember** what they learned (no spatial anchoring)
3. **What to study next** (no adaptive learning path)

Existing tools solve only one piece: note apps (Notion, Obsidian) handle recording, AI tutors (Khan Academy) handle teaching, memory apps (Anki) handle repetition. **None fuse all three with spatial memory.**

### 1.3 Core Thesis — Triple Memory Reinforcement

```
┌──────────────────────────────────────────────────┐
│           MemoGlobe Triple Memory Model           │
│                                                    │
│   1. SEMANTIC MEMORY ← NoteEvol AI Analysis        │
│      (understanding what you know & don't know)    │
│                                                    │
│   2. SPATIAL MEMORY  ← GeoAnchoring on Globe       │
│      (placing concepts at real-world locations)     │
│                                                    │
│   3. EPISODIC MEMORY ← Journey-Based Learning       │
│      (traveling between locations = learning path)  │
│                                                    │
│   Combined → 3x retention vs. text-only notes       │
└──────────────────────────────────────────────────┘
```

### 1.4 Patent Foundation

MemoGlobe is built on the patented AI engine comprising 5 core engines:

| Engine | Full Name | Function |
|--------|-----------|----------|
| **SRS** | Semantic Redundancy Score | Detects duplicate notes across sessions via vector similarity |
| **KCS** | Knowledge Coverage Score | Measures curriculum coverage gaps from student notes |
| **Bloom** | Bloom's Taxonomy Classifier | Auto-classifies each note's cognitive level (Remember→Create) |
| **CLI** | Cognitive Load Index | Real-time cognitive overload detection |
| **DAG** | Prerequisite Dependency Graph | Maps concept prerequisites for optimal learning order |

### 1.5 Unique Innovation — GeoAnchoring

The 6th component unique to MemoGlobe:

| Engine | Full Name | Function |
|--------|-----------|----------|
| **GAE** | GeoAnchoring Engine | Maps each concept to an optimal real-world location on the globe |

**Anchoring Strategies:** HISTORICAL, CULTURAL, PERSONAL

---

## 2. ARCHITECTURE & DATA MODEL

### 2.1 System Architecture — 6-Layer Closed Loop

```
L1 NOTE-TAKING → L2 AI ANALYSIS → L3 GEOANCHORING →
L4 METACOGNITIVE FEEDBACK → L5 CONSTRUCTIVIST GROWTH →
L6 GLOBE DASHBOARD → (feeds back to L1)
```

### 2.4 Tech Stack

| Layer | Technology | Owner |
|-------|-----------|-------|
| 3D Globe | CesiumJS | ANTIGRAVITY |
| Frontend | Next.js 14 (App Router) | ANTIGRAVITY |
| UI Styling | TailwindCSS + Framer Motion | ANTIGRAVITY |
| Note Editor | TipTap | ANTIGRAVITY |
| Charts | Recharts + D3 | ANTIGRAVITY |
| Backend API | FastAPI (Python 3.12+) | CODEX |
| AI/NLP | LangChain + Claude API | CODEX |
| Primary DB | PostgreSQL 16 + pgvector | CODEX |
| Graph DB | Neo4j | CODEX |
| Cache | Redis | CODEX |
| Maps API | Google Maps Platform | SHARED |
| Auth | Supabase Auth | SHARED |
| Infra | Vercel (FE) + AWS ECS (BE) + Neon (PG) | SHARED |

---

## 3-9. See full directive for complete API Contract, Agent Roles, Coding Standards, Communication Protocol, Timeline, Quality Gates, and Glossary.

---

*MemoGlobe Shared Directive v1.0 — Approved by 달의이성*
*Protocol Base: Prometheus Developer Agent v3.0*
*Date: 2026-02-15*
