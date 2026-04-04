import { useState, useEffect } from "react";

const course = [
  {
    module: "Module 1",
    title: "Foundations of AI & Machine Learning",
    duration: "Weeks 1–3",
    accent: "#F5A623",
    tag: "THEORY",
    icon: "◈",
    goal: "Build rock-solid mental models of how AI actually works — the vocabulary, math intuition, and concepts every AI engineer must own.",
    units: [
      {
        title: "Unit 1.1 — What AI Actually Is",
        resource: "Andrej Karpathy: 'Intro to LLMs' (YouTube, 1hr)",
        steps: [
          "Define AI vs. ML vs. Deep Learning vs. Generative AI — draw the nested diagram from memory",
          "Understand supervised, unsupervised, and reinforcement learning with one concrete example each",
          "Explain what 'training' means: you show a model millions of examples, it adjusts weights to minimize error",
          "Understand what a 'model' is: a mathematical function with billions of learned parameters",
          "Know the difference between a model and a product (GPT-4 is a model; ChatGPT is a product built on it)",
          "Watch Karpathy's 'Intro to LLMs' on YouTube — take notes on every concept you don't immediately understand",
        ],
      },
      {
        title: "Unit 1.2 — Math Intuition (No Calculus Required)",
        resource: "3Blue1Brown: Neural Networks series (YouTube)",
        steps: [
          "Understand vectors: a list of numbers that represents something (a word, an image, a user preference)",
          "Understand matrices: grids of numbers used for transformations — watch 3Blue1Brown 'Essence of Linear Algebra' eps 1–3",
          "Understand what a derivative means intuitively: 'how much does output change when I tweak this parameter slightly?'",
          "Understand gradient descent visually: you're rolling a ball downhill to find the lowest point (lowest error)",
          "Understand what a loss function is: the number you're trying to minimize during training",
          "Watch 3Blue1Brown's Neural Network series (4 videos, ~1hr total) — the best visual explanation anywhere",
          "You do NOT need to implement backprop by hand — you need to understand what it accomplishes",
        ],
      },
      {
        title: "Unit 1.3 — Neural Networks Deep Dive",
        resource: "fast.ai Practical Deep Learning Lesson 1–2",
        steps: [
          "Understand a neuron: takes inputs, multiplies by weights, adds bias, applies activation function",
          "Understand activation functions: why ReLU, sigmoid, tanh exist and what they add (non-linearity)",
          "Understand layers: input layer, hidden layers, output layer — and what 'deep' in deep learning means",
          "Understand overfitting: model memorizes training data but fails on new data — the core ML problem",
          "Understand regularization: dropout, L2 — techniques to prevent overfitting",
          "Complete fast.ai Lesson 1 — train your first image classifier in 5 lines of code",
          "Complete fast.ai Lesson 2 — understand what's happening under the hood",
        ],
      },
      {
        title: "Unit 1.4 — How Large Language Models Work",
        resource: "Jay Alammar: 'The Illustrated Transformer' (blog)",
        steps: [
          "Understand tokenization: text is split into tokens (not words), each mapped to an integer ID",
          "Understand embeddings: each token gets a dense vector; similar meanings → similar vectors",
          "Understand the attention mechanism: each token 'attends' to all other tokens to build context",
          "Read Jay Alammar's 'The Illustrated Transformer' — bookmark it, re-read multiple times",
          "Understand what 'next token prediction' means: LLMs are just very good at guessing the next word",
          "Understand context window: the maximum tokens an LLM can 'see' at once — and why it matters",
          "Understand the difference between pre-training (expensive, once) and fine-tuning (cheap, specialized)",
          "Know what RLHF is: Reinforcement Learning from Human Feedback — how models learn to be helpful",
        ],
      },
    ],
  },
  {
    module: "Module 2",
    title: "Prompt Engineering & LLM Mastery",
    duration: "Weeks 4–6",
    accent: "#50E3C2",
    tag: "APPLIED",
    icon: "◉",
    goal: "Become an expert at communicating with LLMs — get reliably great outputs, avoid failure modes, and build prompt systems that work at scale.",
    units: [
      {
        title: "Unit 2.1 — Core Prompting Techniques",
        resource: "Anthropic Prompt Engineering Docs + DeepLearning.AI Prompt Engineering Course",
        steps: [
          "Complete DeepLearning.AI 'ChatGPT Prompt Engineering for Developers' (free, 2hrs)",
          "Read Anthropic's entire prompt engineering guide at docs.anthropic.com",
          "Master zero-shot prompting: give a task with no examples, see what you get",
          "Master few-shot prompting: provide 2–5 input/output examples before your actual request",
          "Master chain-of-thought: add 'think step by step' or show reasoning in your examples",
          "Master role prompting: 'You are a senior Kotlin engineer reviewing a PR for security issues...'",
          "Practice each technique on 10 different tasks — note which works best for which task types",
        ],
      },
      {
        title: "Unit 2.2 — System Prompts & Context Management",
        resource: "Anthropic Workbench (workbench.anthropic.com)",
        steps: [
          "Understand the system prompt: the persistent instruction set that frames every conversation",
          "Write 3 different system prompts for 3 different use cases (code reviewer, data analyst, tutor)",
          "Understand context window limits: learn to prioritize what goes in, what gets truncated",
          "Learn prompt compression: how to convey the same meaning in fewer tokens",
          "Practice 'grounding': always give the model the specific context it needs rather than assuming it knows",
          "Experiment in Anthropic Workbench — compare outputs across temperature settings 0, 0.5, 1.0",
          "Learn the difference between deterministic (temp=0) vs. creative (temp=1) outputs and when to use each",
        ],
      },
      {
        title: "Unit 2.3 — Structured Outputs & Tool Calling",
        resource: "Anthropic Tool Use Documentation",
        steps: [
          "Learn JSON mode: prompt the model to return only valid JSON — parse it in your code",
          "Understand why structured outputs matter: your backend needs typed data, not prose",
          "Build a prompt that extracts structured data (name, date, amount) from unstructured text reliably",
          "Read Anthropic's tool use documentation — understand the request/response schema",
          "Implement a basic tool call: give the model a 'get_weather(city)' tool, let it decide when to use it",
          "Understand the tool call loop: model requests tool → you execute it → you return result → model continues",
          "Build a multi-tool example: model can choose between 3 tools to answer a question",
        ],
      },
      {
        title: "Unit 2.4 — Failure Modes & Evals",
        resource: "Build your own eval suite",
        steps: [
          "Learn the 6 main LLM failure modes: hallucination, sycophancy, prompt injection, refusal, repetition, drift",
          "Test each failure mode deliberately — provoke a hallucination, provoke sycophancy",
          "Understand prompt injection: malicious user input that hijacks your system prompt",
          "Build a simple eval suite: 20 test cases, expected outputs, automated scorer",
          "Learn LLM-as-judge: use another LLM to evaluate whether your primary LLM answered correctly",
          "Understand why you need evals before you ship any AI feature to production",
          "Complete DeepLearning.AI 'Evaluating and Debugging Generative AI' (free, 2hrs)",
        ],
      },
    ],
  },
  {
    module: "Module 3",
    title: "Embeddings, Vector Search & RAG",
    duration: "Weeks 7–10",
    accent: "#E056A0",
    tag: "SYSTEMS",
    icon: "◆",
    goal: "Master the retrieval layer — the most important production AI pattern. Build RAG systems from scratch that actually work reliably.",
    units: [
      {
        title: "Unit 3.1 — Embeddings in Depth",
        resource: "DeepLearning.AI: 'Understanding and Applying Text Embeddings'",
        steps: [
          "Complete DeepLearning.AI 'Understanding and Applying Text Embeddings' (free, 1hr)",
          "Understand embedding space: similar concepts are geometrically close — visualize with t-SNE",
          "Know the main embedding models: OpenAI text-embedding-3-small, Cohere embed-v3, BGE, E5",
          "Understand embedding dimensions: 768 vs. 1536 — tradeoff between quality and storage/cost",
          "Implement cosine similarity from scratch: dot product / (magnitude A × magnitude B)",
          "Build intuition: embed 'dog', 'cat', 'car' and verify dog+cat are closer than dog+car",
          "Understand cross-encoder vs. bi-encoder: when to use each for reranking",
          "Learn about late interaction models (ColBERT) — the frontier of embedding retrieval",
        ],
      },
      {
        title: "Unit 3.2 — Vector Databases",
        resource: "Qdrant Documentation + Pinecone Learning Center",
        steps: [
          "Understand why vector DBs exist: traditional DBs can't do nearest-neighbor search efficiently",
          "Learn HNSW index: the algorithm most vector DBs use — approximate nearest neighbor search",
          "Set up Qdrant locally via Docker, create a collection, insert 500 vectors, run a query",
          "Understand filtering: combine vector search with metadata filters (e.g., only search docs from 2024)",
          "Compare Qdrant vs. Pinecone vs. Weaviate vs. pgvector — know the tradeoffs",
          "Learn about hybrid search: combine dense vector search + sparse BM25 keyword search",
          "Understand namespaces/tenants: how to isolate data for different users or customers",
          "Build a benchmark: measure search latency and recall@10 for your dataset",
        ],
      },
      {
        title: "Unit 3.3 — RAG Architecture",
        resource: "DeepLearning.AI: 'Building and Evaluating Advanced RAG'",
        steps: [
          "Complete DeepLearning.AI 'Building and Evaluating Advanced RAG' (free, 2hrs)",
          "Understand the naive RAG pipeline: query → embed → retrieve → stuff into prompt → generate",
          "Implement fixed-size chunking: split docs into N-character chunks with overlap",
          "Implement sentence-boundary chunking: never cut mid-sentence — understand why it matters",
          "Implement semantic chunking: split when topic changes, not at arbitrary character counts",
          "Build the full naive RAG pipeline end-to-end: ingest PDF → chunk → embed → store → query → answer",
          "Add source attribution: every answer must cite which document chunk it came from",
          "Handle the 'no relevant docs' case: don't hallucinate an answer — say you don't know",
        ],
      },
      {
        title: "Unit 3.4 — Advanced RAG Techniques",
        resource: "LlamaIndex documentation + RAG research papers",
        steps: [
          "Implement HyDE: generate a hypothetical answer, embed it, use that for retrieval (often better than query)",
          "Implement query expansion: rewrite the user query 3 ways, retrieve for all, deduplicate",
          "Implement reranking: retrieve top 20, use a cross-encoder to rerank to top 5 before passing to LLM",
          "Implement parent-child chunking: retrieve small chunks, but pass the surrounding larger chunk to LLM",
          "Add a query router: classify the query first, route to the right retriever or index",
          "Evaluate RAG quality with RAGAS framework: faithfulness, answer relevancy, context precision",
          "Learn when RAG fails: ambiguous queries, missing context, retrieval irrelevance — and how to fix each",
        ],
      },
    ],
  },
  {
    module: "Module 4",
    title: "AI Agents & Agentic Systems",
    duration: "Weeks 11–14",
    accent: "#7B68EE",
    tag: "FRONTIER",
    icon: "◈",
    goal: "Understand and build autonomous AI agents — the defining paradigm of AI engineering in 2025 and beyond.",
    units: [
      {
        title: "Unit 4.1 — Agent Fundamentals",
        resource: "DeepLearning.AI: 'AI Agents in LangGraph'",
        steps: [
          "Understand what an agent is: LLM + perception (tools/memory) + action loop + goal",
          "Learn the ReAct pattern: Reason → Act → Observe → Reason again (loop until done)",
          "Understand the planning problem: why agents fail when tasks require too many steps",
          "Complete DeepLearning.AI 'AI Agents in LangGraph' (free, 4hrs)",
          "Build a minimal agent from scratch: no framework, just an LLM call in a while loop with 3 tools",
          "Understand agent memory types: in-context (prompt), external (vector DB), episodic (past conversations)",
          "Learn agent stopping conditions: max iterations, confidence threshold, explicit 'done' signal",
        ],
      },
      {
        title: "Unit 4.2 — Tool Design & Orchestration",
        resource: "Anthropic Tool Use + Claude computer use documentation",
        steps: [
          "Learn what makes a good tool: clear name, explicit description, typed inputs/outputs",
          "Design a tool suite for a domain you know: backend services → give an agent tools to query your APIs",
          "Implement parallel tool calling: agent calls multiple tools simultaneously, merges results",
          "Understand tool call validation: verify tool inputs before executing, return structured errors",
          "Build an orchestrator-worker pattern: one LLM breaks task into subtasks, worker LLMs execute them",
          "Learn about tool call injection: attacker embeds instructions in tool results to hijack the agent",
          "Build guardrails: max tool calls per session, disallowed tools list, human confirmation for writes",
        ],
      },
      {
        title: "Unit 4.3 — Multi-Agent Systems",
        resource: "Microsoft AutoGen documentation + research papers",
        steps: [
          "Understand why multi-agent: specialization, parallelism, independent verification",
          "Study the supervisor pattern: one agent routes tasks to specialized sub-agents",
          "Study the debate pattern: two agents argue opposite positions, third arbitrates",
          "Build a 2-agent system: one researches, one writes — handoff via structured message",
          "Understand shared memory in multi-agent: how do agents share state without conflicts?",
          "Learn about agent communication protocols: how agents describe their capabilities to each other",
          "Understand evaluation of multi-agent systems: harder than single-agent — trace every decision",
        ],
      },
      {
        title: "Unit 4.4 — Agentic System Reliability",
        resource: "Anthropic's 'Building Effective Agents' guide",
        steps: [
          "Read Anthropic's 'Building Effective Agents' guide (docs.anthropic.com)",
          "Understand why agents fail in production: context overflow, tool failures, planning loops",
          "Implement checkpointing: save agent state after each successful step — resume on failure",
          "Implement human-in-the-loop: pause before irreversible actions, surface to user for approval",
          "Build structured logging for agents: every reasoning step, every tool call, every observation",
          "Learn about agent testing: replay historical runs, inject simulated tool failures",
          "Design an agent monitoring dashboard: step count, tool call success rate, task completion rate",
        ],
      },
    ],
  },
  {
    module: "Module 5",
    title: "Model Training & Fine-Tuning",
    duration: "Weeks 15–18",
    accent: "#FF6B6B",
    tag: "ADVANCED",
    icon: "◉",
    goal: "Understand how models are built and fine-tuned — know when fine-tuning is worth it vs. RAG vs. prompting.",
    units: [
      {
        title: "Unit 5.1 — Training From Scratch (Conceptual)",
        resource: "Andrej Karpathy: 'makemore' and 'micrograd' on GitHub/YouTube",
        steps: [
          "Watch Karpathy's 'micrograd' video: implement backprop from scratch in 100 lines — understand every line",
          "Watch Karpathy's 'makemore' series: build a character-level language model step by step",
          "Understand the training loop: forward pass → compute loss → backward pass → update weights → repeat",
          "Understand batch size, learning rate, epochs — and how each affects training",
          "Understand what GPU memory limits: why you can't just make the batch size infinite",
          "Understand mixed precision training: FP16/BF16 — train faster with less memory",
          "Know the rough cost of training: GPT-3 cost ~$5M, GPT-4 ~$100M — understand why you won't do this",
        ],
      },
      {
        title: "Unit 5.2 — Fine-Tuning in Practice",
        resource: "Hugging Face Fine-Tuning Tutorial + DeepLearning.AI: 'Finetuning LLMs'",
        steps: [
          "Complete DeepLearning.AI 'Finetuning Large Language Models' (free, 1hr)",
          "Understand when to fine-tune: style/format consistency, domain vocabulary, confidential data",
          "Understand when NOT to fine-tune: knowledge injection (use RAG), general tasks (use prompts)",
          "Learn LoRA: Low-Rank Adaptation — fine-tune 0.1% of parameters, get 90% of the benefit",
          "Fine-tune a small open-source model (Llama 3.1 8B) on a custom dataset using Hugging Face",
          "Prepare a fine-tuning dataset: understand the instruction format — system/user/assistant triples",
          "Evaluate your fine-tuned model vs. the base model on your task — measure the actual improvement",
          "Understand catastrophic forgetting: fine-tuning for one task can degrade performance on others",
        ],
      },
      {
        title: "Unit 5.3 — RLHF & Alignment",
        resource: "Anthropic Model Specification + InstructGPT paper",
        steps: [
          "Read the InstructGPT paper abstract and Section 2 — understand the 3-step RLHF process",
          "Understand SFT (Supervised Fine-Tuning): train on human-written good responses",
          "Understand reward model training: humans rank outputs, train a model to predict rankings",
          "Understand PPO: Proximal Policy Optimization — the RL algorithm used to optimize for the reward model",
          "Learn about DPO: Direct Preference Optimization — simpler RLHF alternative, widely used now",
          "Read Anthropic's model specification — understand Constitutional AI and how Claude is trained",
          "Understand alignment failure modes: reward hacking, sycophancy, specification gaming",
        ],
      },
      {
        title: "Unit 5.4 — Open Source Models & Self-Hosting",
        resource: "Ollama + Hugging Face Model Hub",
        steps: [
          "Install Ollama locally — run Llama 3.1 8B on your machine in 5 minutes",
          "Run Mistral 7B, Qwen 2.5, and Gemma 2 — compare output quality on 5 test prompts",
          "Understand model sizes: 7B vs. 13B vs. 70B — know the hardware requirements for each",
          "Understand quantization: 4-bit quantized 70B model fits on a consumer GPU — understand the tradeoff",
          "Learn vLLM: the fastest open-source inference server — understand PagedAttention",
          "Compare self-hosted vs. API: build a cost model for 1M tokens/day — when does self-hosting win?",
          "Understand the open-source model landscape: Llama (Meta), Mistral, Qwen (Alibaba), Gemma (Google)",
        ],
      },
    ],
  },
  {
    module: "Module 6",
    title: "MLOps, Infrastructure & Production AI",
    duration: "Weeks 19–22",
    accent: "#4ECDC4",
    tag: "PRODUCTION",
    icon: "◆",
    goal: "Ship AI systems that are reliable, observable, and maintainable in production — where most AI courses stop but real engineering begins.",
    units: [
      {
        title: "Unit 6.1 — ML System Design",
        resource: "Chip Huyen: 'Designing Machine Learning Systems' (book)",
        steps: [
          "Read Chip Huyen 'Designing ML Systems' Chapters 1, 2, 3 — system thinking for ML",
          "Understand online vs. batch inference: when does each make sense?",
          "Design a feature store: what data does your model need at inference time? How do you serve it fast?",
          "Understand data pipelines for ML: ingestion → transformation → validation → serving",
          "Learn about training-serving skew: why model performs great offline but poorly in production",
          "Design a model registry: versioning, metadata, lineage tracking — know what deployed where",
          "Study how Uber, Airbnb, Netflix built their ML platforms — read their engineering blog posts",
        ],
      },
      {
        title: "Unit 6.2 — LLM Observability & Monitoring",
        resource: "LangSmith or Langfuse (free tier)",
        steps: [
          "Set up LangSmith or Langfuse — instrument your RAG pipeline with full tracing",
          "Define the metrics you'll monitor: latency (P50/P95/P99), cost per request, error rate, quality score",
          "Build an automated eval pipeline: run 50 golden test cases nightly, alert on regression",
          "Implement output logging: store every LLM input/output pair in a queryable store",
          "Learn about prompt drift: monitor when a prompt's average quality degrades over time",
          "Build a cost dashboard: total spend by model, by feature, by user segment",
          "Implement A/B testing for prompts: route 5% of traffic to new prompt, compare quality metrics",
        ],
      },
      {
        title: "Unit 6.3 — AI Safety & Security in Production",
        resource: "OWASP LLM Top 10 + Anthropic safety documentation",
        steps: [
          "Read OWASP LLM Top 10 — memorize the most critical vulnerabilities",
          "Implement input validation: detect and block prompt injection attempts before they reach the LLM",
          "Implement output filtering: scan LLM responses for PII, harmful content, confidential data",
          "Understand data privacy: what user data is in your prompts? Does it violate GDPR/CCPA?",
          "Design a responsible AI checklist your team runs before any AI feature ships",
          "Understand model bias: how to audit your AI feature for demographic disparities",
          "Build a red-teaming session: systematically try to break your AI system for 2 hours, document findings",
        ],
      },
      {
        title: "Unit 6.4 — Scaling & Cost Optimization",
        resource: "AWS/GCP ML infrastructure documentation",
        steps: [
          "Learn GPU types for inference: A10G, A100, H100 — know cost and throughput tradeoffs",
          "Understand batching: process multiple requests together to improve GPU utilization",
          "Implement semantic caching: if two queries are very similar, return cached answer — save 60%+ cost",
          "Learn speculative decoding: draft model generates candidates, large model verifies — 2–3x faster",
          "Understand KV cache: why stateless inference is expensive, how to reuse computation",
          "Design a cost optimization roadmap: which techniques give highest ROI for your scale?",
          "Build capacity planning model: predict infrastructure needs for 10x traffic growth",
        ],
      },
    ],
  },
  {
    module: "Module 7",
    title: "Specialized AI Domains",
    duration: "Weeks 23–26",
    accent: "#FFC107",
    tag: "SPECIALIZATION",
    icon: "◈",
    goal: "Go deep in the domains most relevant to your career — pick 2 of 4 tracks based on where you want to specialize.",
    units: [
      {
        title: "Track A — Computer Vision",
        resource: "fast.ai Part 1 (image chapters) + PyTorch Vision docs",
        steps: [
          "Understand CNNs: convolutional filters, pooling, feature maps — the building blocks",
          "Learn transfer learning for vision: take ResNet50, freeze early layers, retrain the head",
          "Build an image classifier on a custom dataset using fast.ai in under 50 lines",
          "Understand object detection: YOLO, Faster R-CNN — bounding boxes and class predictions",
          "Learn vision transformers (ViT): how transformers beat CNNs on vision tasks",
          "Understand multimodal models: GPT-4V, LLaVA — combining vision and language",
          "Build one end-to-end vision project: image → structured data extraction pipeline",
        ],
      },
      {
        title: "Track B — AI for Backend/APIs (Recommended for your profile)",
        resource: "Build 3 real projects",
        steps: [
          "Build a semantic API router: user query → classify intent → route to correct microservice",
          "Build an AI-powered code review service: PR diff in → structured feedback out",
          "Build an intelligent caching layer: use embeddings to match semantically similar requests",
          "Build an anomaly detection system: use ML to flag unusual API call patterns in real-time",
          "Build a natural language query interface: 'show me all orders over $500 from last week' → SQL",
          "Build a document intelligence pipeline: PDF → extract tables, entities, key facts → structured JSON",
          "Write a technical blog post about one of these — publish it publicly",
        ],
      },
      {
        title: "Track C — Data Science & Analytics AI",
        resource: "Kaggle Learn + fast.ai tabular",
        steps: [
          "Understand tabular ML: why gradient boosting (XGBoost, LightGBM) still beats deep learning on tables",
          "Learn feature engineering for tabular data: encoding, scaling, interaction features",
          "Complete a Kaggle competition — even finishing is a valuable learning experience",
          "Understand time series forecasting: ARIMA, Prophet, and neural approaches (N-BEATS, Temporal Fusion)",
          "Learn causal inference: the difference between correlation and causation in ML models",
          "Build a churn prediction model end-to-end: data → features → model → deploy → monitor",
          "Learn model explainability: SHAP values — understand why your model made a prediction",
        ],
      },
      {
        title: "Track D — Generative AI & Creative Systems",
        resource: "Hugging Face Diffusers + fast.ai Part 2",
        steps: [
          "Understand diffusion models: forward noising process and reverse denoising — how images are generated",
          "Understand latent diffusion: why Stable Diffusion works in compressed latent space, not pixel space",
          "Learn ControlNet and LoRA for image generation — guided generation with structural control",
          "Understand text-to-speech: how models like ElevenLabs convert text to natural audio",
          "Build a multi-modal pipeline: text → image → caption → refined image (agent loop)",
          "Learn about music generation models: AudioCraft, MusicGen — how they work",
          "Understand the legal landscape: copyright, deepfakes, generated content attribution",
        ],
      },
    ],
  },
  {
    module: "Module 8",
    title: "Capstone — Build & Ship a Real AI System",
    duration: "Weeks 27–30",
    accent: "#00E5FF",
    tag: "CAPSTONE",
    icon: "★",
    goal: "Synthesize everything into one complete, production-quality AI project that demonstrates staff-level engineering across the full stack.",
    units: [
      {
        title: "Week 27 — Project Design & Architecture",
        resource: "Your own knowledge — this is the test",
        steps: [
          "Choose a project: AI-powered code review bot, internal knowledge base chatbot, or AI analytics tool",
          "Write a full architecture doc: components, data flow, failure modes, cost model, eval strategy",
          "Define your eval suite before writing a single line of code: what does 'working correctly' mean?",
          "Choose your stack: which LLM, which vector DB, which framework, which infrastructure",
          "Write the build vs. buy analysis for each major component — justify your choices",
          "Get architecture review from a peer or mentor before proceeding",
        ],
      },
      {
        title: "Week 28–29 — Build & Iterate",
        resource: "Your chosen stack",
        steps: [
          "Build the ingestion pipeline: data in → chunked → embedded → stored",
          "Build the retrieval layer: query → retrieve → rerank → return",
          "Build the generation layer: retrieved context + user query → LLM → structured response",
          "Add observability from day one: tracing, logging, cost tracking",
          "Run your eval suite — iterate on the lowest-scoring steps first",
          "Add error handling for every external dependency (vector DB down, LLM timeout, etc.)",
          "Conduct a security review: test for prompt injection, data leakage, access control gaps",
        ],
      },
      {
        title: "Week 30 — Ship, Document, Reflect",
        resource: "GitHub + your blog / LinkedIn",
        steps: [
          "Deploy to a real environment: Fly.io, Railway, or AWS — not just localhost",
          "Write a README that explains architecture decisions, not just how to run it",
          "Record a 5-minute demo video walking through the system and its design",
          "Write a post-mortem on what you'd do differently — shows engineering maturity",
          "Publish the project publicly — GitHub, HuggingFace Spaces, or a live demo URL",
          "Write a technical post about one architectural decision — publish on LinkedIn or your blog",
          "You can now answer in any interview: 'describe an AI system you built end-to-end in production'",
        ],
      },
    ],
  },
];

export default function App() {
  const [checked, setChecked] = useState({});
  const [activeModule, setActiveModule] = useState(0);
  const [openUnit, setOpenUnit] = useState({ 0: 0 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ai-course-v2");
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (updated) => {
    setChecked(updated);
    try { localStorage.setItem("ai-course-v2", JSON.stringify(updated)); } catch {}
  };

  const toggle = (key) => save({ ...checked, [key]: !checked[key] });

  const modProgress = (mi) => {
    const mod = course[mi];
    const total = mod.units.reduce((a, u) => a + u.steps.length, 0);
    const done = mod.units.reduce(
      (a, u, ui) => a + u.steps.filter((_, si) => checked[`${mi}-${ui}-${si}`]).length, 0
    );
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const totalProg = () => {
    const total = course.reduce((a, m) => a + m.units.reduce((b, u) => b + u.steps.length, 0), 0);
    const done = Object.values(checked).filter(Boolean).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const tp = totalProg();
  const activeMod = course[activeModule];
  const accentColor = activeMod.accent;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F5F0",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#1a1a1a",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
        .mod-pill { transition: all 0.2s ease; cursor: pointer; }
        .mod-pill:hover { transform: translateY(-1px); }
        .unit-hdr { transition: background 0.15s ease; cursor: pointer; }
        .unit-hdr:hover { background: rgba(0,0,0,0.02); }
        .step-row { transition: background 0.1s ease; cursor: pointer; }
        .step-row:hover { background: rgba(0,0,0,0.025); }
        .chk { transition: all 0.15s ease; cursor: pointer; }
        .chk:hover { transform: scale(1.08); }
        .sidebar-item { transition: all 0.15s ease; cursor: pointer; border-left: 3px solid transparent; }
        .sidebar-item:hover { background: rgba(0,0,0,0.03); }
        .sidebar-item.active { border-left-color: var(--accent); background: rgba(0,0,0,0.04); }
      `}</style>

      {/* Top bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e8e4dc",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 32, height: 32,
            background: "#1a1a1a",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 14, fontWeight: 700,
          }}>AI</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>
              Learn AI — Full Course
            </div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>
              8 Modules · 30 Weeks · {tp.total} Steps
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 120, height: 4, background: "#eee", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${tp.pct}%`,
                background: "#1a1a1a",
                borderRadius: 2,
                transition: "width 0.3s ease",
              }} />
            </div>
            <span style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>{tp.pct}%</span>
          </div>
          <div style={{
            background: "#f0ece4",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            color: "#555",
          }}>
            {tp.done}/{tp.total} steps
          </div>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto" }}>

        {/* Sidebar */}
        <div style={{
          width: 240,
          flexShrink: 0,
          position: "sticky",
          top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          borderRight: "1px solid #e8e4dc",
          background: "#faf8f4",
          padding: "20px 0",
        }}>
          {course.map((mod, mi) => {
            const prog = modProgress(mi);
            const isActive = activeModule === mi;
            return (
              <div
                key={mi}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                style={{ "--accent": mod.accent } as any}
                onClick={() => { setActiveModule(mi); setOpenUnit((p) => ({ ...p, [mi]: p[mi] ?? 0 })); }}
              >
                <div style={{
                  padding: "12px 20px",
                  borderLeft: `3px solid ${isActive ? mod.accent : "transparent"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: isActive ? mod.accent : "#bbb",
                      textTransform: "uppercase",
                    }}>{mod.tag}</div>
                    <div style={{
                      fontSize: 10,
                      color: prog.pct === 100 ? mod.accent : "#bbb",
                      fontWeight: 600,
                    }}>{prog.pct}%</div>
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#1a1a1a" : "#666",
                    lineHeight: 1.3,
                  }}>{mod.title}</div>
                  <div style={{ fontSize: 10, color: "#bbb", marginTop: 3 }}>{mod.duration}</div>
                  <div style={{ marginTop: 6, height: 2, background: "#e8e4dc", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${prog.pct}%`, background: mod.accent, transition: "width 0.3s" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "32px 32px 80px", minWidth: 0 }}>

          {/* Module header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                padding: "3px 10px",
                borderRadius: 3,
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}40`,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                color: accentColor,
                textTransform: "uppercase",
              }}>{activeMod.tag}</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>{activeMod.duration}</div>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 1.15,
              color: "#1a1a1a",
              marginBottom: 12,
            }}>
              <span style={{ color: accentColor }}>{activeMod.icon} </span>
              {activeMod.title}
            </h1>

            <p style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#666",
              maxWidth: 600,
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: 14,
            }}>{activeMod.goal}</p>
          </div>

          {/* Progress bar for module */}
          {(() => {
            const prog = modProgress(activeModule);
            return (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                padding: "14px 18px",
                background: "#fff",
                border: "1px solid #e8e4dc",
                borderRadius: 10,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>Module Progress</span>
                    <span style={{ fontSize: 12, color: accentColor, fontWeight: 700 }}>{prog.done}/{prog.total} steps</span>
                  </div>
                  <div style={{ height: 5, background: "#f0ece4", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${prog.pct}%`, background: accentColor, borderRadius: 3, transition: "width 0.4s ease" }} />
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: accentColor,
                  flexShrink: 0,
                }}>{prog.pct}%</div>
              </div>
            );
          })()}

          {/* Units */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activeMod.units.map((unit, ui) => {
              const isOpen = openUnit[activeModule] === ui;
              const unitDone = unit.steps.filter((_, si) => checked[`${activeModule}-${ui}-${si}`]).length;
              const unitPct = Math.round((unitDone / unit.steps.length) * 100);
              const complete = unitPct === 100;

              return (
                <div key={ui} style={{
                  background: "#fff",
                  border: `1px solid ${isOpen ? accentColor + "50" : "#e8e4dc"}`,
                  borderRadius: 10,
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                  boxShadow: isOpen ? `0 2px 12px ${accentColor}15` : "none",
                }}>
                  {/* Unit header */}
                  <div
                    className="unit-hdr"
                    onClick={() => setOpenUnit(p => ({ ...p, [activeModule]: p[activeModule] === ui ? null : ui }))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "16px 20px",
                      background: isOpen ? `${accentColor}06` : "transparent",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: "50%",
                      border: `2px solid ${complete ? accentColor : "#e8e4dc"}`,
                      background: complete ? accentColor : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13,
                      color: complete ? "#fff" : "#ccc",
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}>
                      {complete ? "✓" : unitDone || ""}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: isOpen ? "#1a1a1a" : "#333",
                        marginBottom: 4,
                        lineHeight: 1.3,
                      }}>{unit.title}</div>
                      {unit.resource && (
                        <div style={{ fontSize: 11, color: "#aaa", fontStyle: "italic" }}>
                          📚 {unit.resource}
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                        <div style={{ height: 2, flex: 1, background: "#f0ece4", borderRadius: 1, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${unitPct}%`, background: accentColor, transition: "width 0.3s" }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#bbb", flexShrink: 0 }}>
                          {unitDone}/{unit.steps.length}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      fontSize: 11,
                      color: "#ccc",
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}>▼</div>
                  </div>

                  {/* Steps */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #f0ece4" }}>
                      {unit.steps.map((step, si) => {
                        const key = `${activeModule}-${ui}-${si}`;
                        const done = !!checked[key];
                        return (
                          <div
                            key={si}
                            className="step-row"
                            onClick={() => toggle(key)}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 14,
                              padding: "12px 20px 12px 20px",
                              borderBottom: si < unit.steps.length - 1 ? "1px solid #f7f5f0" : "none",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              className="chk"
                              style={{
                                width: 20, height: 20,
                                borderRadius: 4,
                                border: `1.5px solid ${done ? accentColor : "#ddd"}`,
                                background: done ? accentColor : "#fff",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                marginTop: 2,
                                transition: "all 0.15s ease",
                              }}
                            >
                              {done && <span style={{ fontSize: 12, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                            </div>
                            <span style={{
                              fontSize: 13,
                              lineHeight: 1.65,
                              color: done ? "#bbb" : "#444",
                              textDecoration: done ? "line-through" : "none",
                              transition: "all 0.2s ease",
                            }}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
            {activeModule > 0 && (
              <button
                onClick={() => setActiveModule(m => m - 1)}
                style={{
                  padding: "10px 20px",
                  background: "#fff",
                  border: "1px solid #e8e4dc",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#666",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                ← {course[activeModule - 1].module}
              </button>
            )}
            {activeModule < course.length - 1 && (
              <button
                onClick={() => setActiveModule(m => m + 1)}
                style={{
                  marginLeft: "auto",
                  padding: "10px 20px",
                  background: accentColor,
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {course[activeModule + 1].module} →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
