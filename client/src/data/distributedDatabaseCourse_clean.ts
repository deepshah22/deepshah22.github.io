export type Lesson = {
  id: string;
  title: string;
  goal: string;
  concepts: string[];
  explanation: string[];
  keyTakeaways: string[];
  checkpoint: string[];
};

export type Module = {
  id: string;
  title: string;
  overview: string;
  lessons: Lesson[];
};

export type Course = {
  title: string;
  subtitle: string;
  audience: string;
  howToUse: string[];
  modules: Module[];
  finalRevision: string[];
};

export const distributedDatabaseCourse: Course = {
  title: "Distributed Databases Course",
  subtitle:
    "A step-by-step learning path for SQL, NoSQL, and distributed consistency",
  audience:
    "Engineers who want to build a strong and practical understanding of distributed data systems.",
  howToUse: [
    "Read one lesson at a time instead of trying to absorb everything together.",
    "After each lesson, pause and explain the topic in your own words.",
    "Focus on tradeoffs: what the concept solves, why it exists, and what it costs.",
    "Revisit the final revision section whenever you want a fast refresher.",
  ],
  modules: [
    {
      id: "sql-foundations",
      title: "Module 1: All About SQL in Distributed Systems",
      overview:
        "This module starts from relational database basics and builds toward sharding, replication, and distributed transactions. The goal is to understand why SQL becomes harder in distributed environments and how designers manage those tradeoffs.",
      lessons: [
        {
          id: "sql-1",
          title: "Lesson 1: Why SQL Still Matters",
          goal:
            "Understand why relational databases are still heavily used even in large-scale distributed systems.",
          concepts: [
            "Relational model",
            "Schema",
            "ACID transactions",
            "Joins",
            "Strong consistency",
          ],
          explanation: [
            "SQL databases are best when the data is highly structured and relationships between entities matter. Examples include payments, orders, inventory, ledgers, subscriptions, and business workflows.",
            "The biggest strength of SQL is correctness. You get transactional guarantees, constraints, and a clear schema. That makes it easier to preserve business rules even when multiple updates happen at the same time.",
            "It is useful to think of SQL not as old technology, but as the right tool when integrity, multi-row changes, or relational queries are central to the product.",
          ],
          keyTakeaways: [
            "SQL fits well when consistency and relational modeling matter more than extreme schema flexibility.",
            "Transactions and constraints reduce complexity in the application layer.",
          ],
          checkpoint: [
            "Can I explain when SQL is a better choice than NoSQL?",
            "Can I explain why transactions are valuable in product design?",
          ],
        },
        {
          id: "sql-2",
          title: "Lesson 2: SQL Challenges at Scale",
          goal:
            "Learn why scaling a relational database becomes difficult once one machine is no longer enough.",
          concepts: [
            "Vertical scaling",
            "Horizontal scaling",
            "Storage bottlenecks",
            "Read/write bottlenecks",
            "Cross-node coordination",
          ],
          explanation: [
            "A single SQL database is simple to operate at first. But as traffic, data volume, and availability needs grow, one machine becomes a bottleneck for CPU, memory, disk, and network.",
            "You can scale up for some time by using a bigger machine, but that has limits and becomes expensive. Eventually you need to distribute data across nodes.",
            "Once data lives on multiple nodes, queries, transactions, and joins become harder because the database must coordinate across machines.",
          ],
          keyTakeaways: [
            "Distribution solves scale problems but introduces coordination complexity.",
            "The main challenge is not just storing more data, but preserving correctness and query performance across nodes.",
          ],
          checkpoint: [
            "Do I understand why a single-node SQL database is easier than a distributed one?",
            "Can I name the new complexity introduced by horizontal scale?",
          ],
        },
        {
          id: "sql-3",
          title: "Lesson 3: Distributed Sharding",
          goal:
            "Understand how relational data is partitioned across multiple machines.",
          concepts: [
            "Sharding",
            "Partition key",
            "Hash partitioning",
            "Range partitioning",
            "Hot partitions",
            "Rebalancing",
          ],
          explanation: [
            "Sharding means splitting data into smaller partitions and placing each partition on a different node. This allows the system to store more data and handle more traffic in parallel.",
            "The most important design choice is the shard key. If most reads and writes are by userId, then userId may be a strong shard key. If the shard key is poorly chosen, one shard may get much more traffic than others, creating a hotspot.",
            "Hash-based sharding spreads load more evenly but makes range scans harder. Range-based sharding supports ordered queries better but may create skew if recent or popular ranges get too much traffic.",
            "A good way to evaluate a shard key is to connect it directly to the access patterns of the system.",
          ],
          keyTakeaways: [
            "Choose the shard key so most reads, writes, and transactions stay local to one shard.",
            "Always think about hotspot risk, resharding, and operational rebalancing.",
          ],
          checkpoint: [
            "Can I compare hash vs range sharding?",
            "Can I explain what makes a good shard key?",
          ],
        },
        {
          id: "sql-4",
          title: "Lesson 4: Distributed Replication",
          goal:
            "Learn how SQL systems copy data across replicas for reliability and scale.",
          concepts: [
            "Replication",
            "Leader-follower",
            "Read replicas",
            "Synchronous replication",
            "Asynchronous replication",
            "Failover",
          ],
          explanation: [
            "Replication means maintaining copies of the same data on multiple nodes. Replication improves durability, availability, and read scale.",
            "In leader-follower replication, the leader accepts writes and followers copy the changes. Followers may serve reads depending on the consistency requirement.",
            "Synchronous replication provides stronger durability but increases write latency. Asynchronous replication lowers latency but may lose the latest writes during failure.",
            "If the leader fails, a follower can be promoted. This improves resilience, though recovery time and risk of data loss depend on the replication strategy.",
          ],
          keyTakeaways: [
            "Leader-follower replication is a common way to scale reads and improve fault tolerance.",
            "Replication improves availability, but consistency tradeoffs still remain.",
          ],
          checkpoint: [
            "Can I explain why read replicas are useful?",
            "Do I understand the difference between synchronous and asynchronous replication?",
          ],
        },
        {
          id: "sql-5",
          title: "Lesson 5: Distributed Transactions",
          goal:
            "Understand why transactions across shards are complex and expensive.",
          concepts: [
            "Single-shard transaction",
            "Cross-shard transaction",
            "Two-phase commit",
            "Coordinator",
            "Atomicity across nodes",
            "Failure handling",
          ],
          explanation: [
            "Transactions are easy to reason about on a single machine. In a distributed system, a transaction may involve multiple shards, each on different nodes.",
            "To commit safely, the database needs coordination. Two-phase commit is the classic protocol: first ask each participant if it can commit, then instruct all participants to commit. This preserves atomicity but adds latency and coordination overhead.",
            "If the coordinator or a participant fails at the wrong moment, the system may have to hold locks or wait for recovery, which hurts availability and throughput.",
            "That is why well-designed systems often try to keep most transactions inside one shard whenever possible.",
          ],
          keyTakeaways: [
            "Two-phase commit preserves atomicity, but it is expensive.",
            "Keeping data local reduces coordination cost and improves performance.",
          ],
          checkpoint: [
            "Can I explain why cross-shard transactions are slower?",
            "Can I explain why locality reduces coordination cost?",
          ],
        },
        {
          id: "sql-6",
          title: "Lesson 6: Joins, Indexes, and Query Planning in Distributed SQL",
          goal:
            "Learn why queries that are simple on one node become more expensive when data is distributed.",
          concepts: [
            "Local join",
            "Distributed join",
            "Secondary index",
            "Scatter-gather query",
            "Query planner",
          ],
          explanation: [
            "On a single database node, joins and indexes are straightforward. In a distributed SQL system, joins may require fetching data from multiple shards, which increases latency and network cost.",
            "A secondary index may not be colocated with the data. That means even index lookup can become a distributed operation.",
            "A scatter-gather query sends requests to many shards and merges the results. This is often slower and less predictable than local queries.",
            "A practical design goal is to colocate related data so the most common queries stay efficient.",
          ],
          keyTakeaways: [
            "Cross-shard joins are expensive and should be minimized.",
            "Schema design and partitioning shape query performance as much as the engine does.",
          ],
          checkpoint: [
            "Can I explain why joins become expensive across shards?",
            "Can I explain why distributed indexing is harder than local indexing?",
          ],
        },
        {
          id: "sql-7",
          title: "Lesson 7: When to Choose Distributed SQL",
          goal:
            "Build judgment for when distributed SQL is the right system choice.",
          concepts: [
            "Relational data",
            "Transactional integrity",
            "Strong consistency",
            "Operational cost",
          ],
          explanation: [
            "Choose distributed SQL when the application needs relational structure, transactions, constraints, and correctness across important business operations.",
            "Typical examples include banking, billing, order management, identity systems, and enterprise workflows.",
            "Distributed SQL gives powerful semantics, but those semantics become costly to maintain as scale and geo-distribution increase.",
          ],
          keyTakeaways: [
            "Distributed SQL is a strong fit when correctness and data relationships are central.",
            "Stronger guarantees usually mean more coordination overhead.",
          ],
          checkpoint: [
            "Can I state one good use case for distributed SQL?",
            "Can I explain its main cost?",
          ],
        },
      ],
    },
    {
      id: "nosql-foundations",
      title: "Module 2: All About NoSQL",
      overview:
        "This module explains the NoSQL world as a family of database models built for specific access patterns, scale goals, and flexibility needs. The point is not that NoSQL is better, but that it optimizes different tradeoffs.",
      lessons: [
        {
          id: "nosql-1",
          title: "Lesson 1: What NoSQL Really Means",
          goal:
            "Understand that NoSQL is a broad category, not a single database type.",
          concepts: [
            "Schema flexibility",
            "Horizontal scale",
            "High throughput",
            "Denormalization",
          ],
          explanation: [
            "NoSQL generally refers to non-relational data systems designed for scale, flexibility, or specialized access patterns. These systems often relax some relational guarantees in exchange for simpler horizontal growth.",
            "NoSQL is commonly used when the data model changes often, when the traffic is extremely high, or when the application mostly performs simple access by key or document.",
            "It is important to remember that NoSQL does not mean no structure. It means the structure is often shaped around application access patterns instead of relational normalization.",
          ],
          keyTakeaways: [
            "NoSQL is about different design tradeoffs, not about replacing SQL entirely.",
            "NoSQL often pushes some complexity into the data model or application layer.",
          ],
          checkpoint: [
            "Can I define NoSQL without oversimplifying it?",
            "Do I understand why NoSQL often denormalizes data?",
          ],
        },
        {
          id: "nosql-2",
          title: "Lesson 2: Key-Value Stores",
          goal:
            "Learn the simplest NoSQL model and when it is ideal.",
          concepts: [
            "Key-value lookup",
            "O(1) style retrieval",
            "Session store",
            "Cache-backed design",
          ],
          explanation: [
            "A key-value store maps a unique key to a value blob or object. It is the simplest distributed data model and usually scales very well.",
            "This is a strong fit when the application already knows the key, such as session storage, user settings, feature flags, carts, or profile objects.",
            "The limitation is that complex querying is weak. If you need filtering by many fields, joining entities, or rich analytics, a pure key-value model is not enough.",
          ],
          keyTakeaways: [
            "This model is ideal for simple and very fast get and put operations.",
            "Primary-key access is easy, but flexible querying is limited.",
          ],
          checkpoint: [
            "Can I give two strong use cases for a key-value store?",
            "Can I explain its main limitation?",
          ],
        },
        {
          id: "nosql-3",
          title: "Lesson 3: Document Databases",
          goal:
            "Understand how document stores help when data is naturally grouped into JSON-like objects.",
          concepts: [
            "Document model",
            "JSON",
            "Nested fields",
            "Flexible schema",
          ],
          explanation: [
            "Document databases store records as self-contained documents, often in JSON-like format. They work well when an entity and its related fields are usually read together.",
            "This model is useful for user profiles, content metadata, product catalogs, and application objects that evolve over time.",
            "Because the data is usually denormalized into one document, reads can be very efficient. But duplicate data across documents may make updates more complicated.",
          ],
          keyTakeaways: [
            "Document databases optimize for object-shaped reads.",
            "Denormalization speeds reads but can increase update complexity.",
          ],
          checkpoint: [
            "Can I explain why a document store is often a good fit for product catalogs or profiles?",
            "Can I explain the downside of duplicating data across documents?",
          ],
        },
        {
          id: "nosql-4",
          title: "Lesson 4: Wide-Column Stores",
          goal:
            "Learn why wide-column systems are often used for large-scale write-heavy workloads.",
          concepts: [
            "Partition key",
            "Clustering key",
            "Write-heavy workload",
            "Time-series access",
            "Append-friendly design",
          ],
          explanation: [
            "Wide-column databases are designed for massive scale and high write throughput. They are often used for event streams, logs, telemetry, metrics, recommendation signals, and time-series style workloads.",
            "The data model is optimized around partition keys and sorted clustering within partitions. That makes some reads very efficient when they match the storage layout.",
            "These systems perform best when queries are known in advance. If you ask for access patterns that do not align with the partitioning model, performance may be poor.",
          ],
          keyTakeaways: [
            "Wide-column stores are strong for append-heavy and time-series workloads.",
            "Query-first modeling is critical in these systems.",
          ],
          checkpoint: [
            "Can I explain why time-series data often fits wide-column stores?",
            "Can I explain why bad partition design hurts performance?",
          ],
        },
        {
          id: "nosql-5",
          title: "Lesson 5: Graph Databases",
          goal:
            "Understand where graph-oriented databases are the right choice.",
          concepts: [
            "Nodes",
            "Edges",
            "Traversal",
            "Relationship-heavy queries",
          ],
          explanation: [
            "Graph databases are built for problems where relationships are the main query target, such as social graphs, fraud detection, dependency maps, recommendation paths, and network topology.",
            "A graph system is useful when queries ask questions like: what is connected to this node, how many hops away is another node, or which path is most relevant.",
            "These systems are usually chosen for relationship traversal, not for generic high-volume key-value traffic.",
          ],
          keyTakeaways: [
            "Graph databases are best when traversals are central to the problem.",
            "They solve a different class of problems than simple lookup stores.",
          ],
          checkpoint: [
            "Can I identify a problem where graph is better than relational or key-value?",
            "Can I explain what graph databases optimize for?",
          ],
        },
        {
          id: "nosql-6",
          title: "Lesson 6: NoSQL Data Modeling",
          goal:
            "Learn how NoSQL modeling starts from queries instead of normalization.",
          concepts: [
            "Access-pattern driven design",
            "Denormalization",
            "Materialized view",
            "Precomputed data",
          ],
          explanation: [
            "In NoSQL, the first question is often: what queries must be fast? The schema is then designed to support those exact reads and writes efficiently.",
            "That is why denormalization is common. You may copy some data into multiple documents or tables so each service can read what it needs without expensive joins.",
            "This can improve performance and scale, but it means updates may need to touch multiple records, which shifts complexity into application logic or asynchronous pipelines.",
          ],
          keyTakeaways: [
            "NoSQL modeling is query-first, not entity-first.",
            "Denormalization and precomputation are deliberate design choices.",
          ],
          checkpoint: [
            "Can I explain how NoSQL schema design begins from access patterns?",
            "Do I understand why denormalization is common?",
          ],
        },
        {
          id: "nosql-7",
          title: "Lesson 7: Replication and Availability in NoSQL",
          goal:
            "Understand how many NoSQL systems prioritize availability and scale.",
          concepts: [
            "Peer-to-peer replication",
            "Leaderless design",
            "Quorum reads",
            "Quorum writes",
            "Repair",
          ],
          explanation: [
            "Many NoSQL systems are designed to continue serving requests even during partial failures. Some use leaderless or decentralized replication models where multiple replicas can accept requests.",
            "To manage consistency, these systems may rely on quorum reads and writes. For example, if there are N replicas, the client may write to W replicas and read from R replicas, aiming for overlap between read and write quorums.",
            "This design improves resilience and write availability, but it often introduces eventual consistency and conflict-resolution challenges.",
          ],
          keyTakeaways: [
            "Quorum and leaderless replication are common ideas in highly available NoSQL systems.",
            "Higher availability often comes with more complex consistency behavior.",
          ],
          checkpoint: [
            "Can I explain what quorum reads and writes do?",
            "Can I explain why leaderless systems may still return stale data?",
          ],
        },
        {
          id: "nosql-8",
          title: "Lesson 8: When to Choose NoSQL",
          goal:
            "Build judgment for when NoSQL is the better fit.",
          concepts: [
            "Scale",
            "Schema evolution",
            "Simple access patterns",
            "Latency optimization",
          ],
          explanation: [
            "Choose NoSQL when the application needs flexible schema, simple and high-scale access patterns, or extreme write or read throughput with horizontal growth.",
            "Typical examples include user feeds, product catalogs, content metadata, profile stores, analytics signals, sessions, and event-heavy systems.",
            "The key is to know the tradeoff: NoSQL may improve scale and speed for targeted workloads, but you may give up some transactional simplicity and relational expressiveness.",
          ],
          keyTakeaways: [
            "NoSQL is often a better fit when flexibility and scale matter more than rich relational guarantees.",
            "The choice should always connect back to the real read and write patterns.",
          ],
          checkpoint: [
            "Can I name one case where NoSQL clearly wins?",
            "Can I name one case where SQL is still a better choice?",
          ],
        },
      ],
    },
    {
      id: "distributed-consistency",
      title: "Module 3: Distributed Consistency",
      overview:
        "This module is the heart of distributed database design. It explains what consistency means, what breaks during failures, and how systems choose between correctness, latency, and availability.",
      lessons: [
        {
          id: "consistency-1",
          title: "Lesson 1: What Consistency Means",
          goal:
            "Build a practical understanding of consistency in distributed systems.",
          concepts: [
            "Single source of truth",
            "Stale reads",
            "Write visibility",
            "Replica lag",
          ],
          explanation: [
            "Consistency is about what different clients observe after reads and writes. If one user writes new data, does another user immediately see that same value?",
            "In a distributed system, data is copied across replicas. Because replication takes time and failures happen, different nodes may temporarily disagree.",
            "A good way to understand consistency is to think about what the user experiences when the system is under load or recovering from failure.",
          ],
          keyTakeaways: [
            "Consistency should be understood in terms of user-visible behavior, not only formal definitions.",
            "Consistency requirements depend on the business domain and product expectations.",
          ],
          checkpoint: [
            "Can I explain consistency from a product point of view?",
            "Can I explain what stale read means?",
          ],
        },
        {
          id: "consistency-2",
          title: "Lesson 2: Strong vs Eventual Consistency",
          goal:
            "Learn the most common consistency tradeoff in distributed systems.",
          concepts: [
            "Strong consistency",
            "Eventual consistency",
            "Read-after-write",
            "Propagation delay",
          ],
          explanation: [
            "With strong consistency, once a write succeeds, future reads return the latest committed value. This is easier for correctness but often increases coordination cost and latency.",
            "With eventual consistency, replicas may temporarily return older values, but over time they converge to the same state. This improves scalability and availability but requires the application to tolerate temporary mismatch.",
            "Many real systems use something in between, such as read-after-write consistency for the same user or stronger guarantees on critical paths only.",
          ],
          keyTakeaways: [
            "Eventual consistency is not automatically bad; it is often a valid tradeoff.",
            "Different product flows may need different consistency levels.",
          ],
          checkpoint: [
            "Can I explain when strong consistency is necessary?",
            "Can I explain when eventual consistency is acceptable?",
          ],
        },
        {
          id: "consistency-3",
          title: "Lesson 3: CAP Theorem in Practice",
          goal:
            "Understand how to use CAP correctly in real systems.",
          concepts: [
            "Consistency",
            "Availability",
            "Partition tolerance",
            "Network partition",
          ],
          explanation: [
            "CAP says that when a network partition occurs, a distributed system must choose whether to prioritize consistency or availability. Partition tolerance is not optional in real distributed systems, so the real tradeoff is consistency versus availability under partition.",
            "This matters because partitions are not hypothetical. They happen due to link failures, node isolation, packet loss, or regional issues.",
            "A practical way to use CAP is to ask what the system should do during a partition. Some systems reject requests to preserve correctness, while others continue serving and reconcile later.",
          ],
          keyTakeaways: [
            "CAP is most useful when thinking about behavior during network partitions.",
            "The right choice depends on the consequences of stale or rejected operations.",
          ],
          checkpoint: [
            "Can I explain CAP without sounding memorized?",
            "Can I give one example where consistency should win and one where availability should win?",
          ],
        },
        {
          id: "consistency-4",
          title: "Lesson 4: PACELC",
          goal:
            "Go beyond CAP and understand the latency tradeoff even when there is no partition.",
          concepts: [
            "PACELC",
            "Latency",
            "Coordination cost",
            "Normal operation tradeoff",
          ],
          explanation: [
            "PACELC says that if there is a partition, you trade availability versus consistency, else under normal operation you still trade latency versus consistency.",
            "This is a more useful design lens than CAP alone because distributed systems pay coordination cost even when everything is healthy.",
            "For example, synchronously committing across distant regions gives stronger consistency but increases latency for every write.",
          ],
          keyTakeaways: [
            "Stronger guarantees often cost more latency even when the system is healthy.",
            "PACELC is especially helpful when reasoning about cross-region designs.",
          ],
          checkpoint: [
            "Can I explain PACELC in plain English?",
            "Can I connect it to cross-region writes?",
          ],
        },
        {
          id: "consistency-5",
          title: "Lesson 5: Quorums",
          goal:
            "Understand how replicated systems balance read correctness and write durability.",
          concepts: [
            "N replicas",
            "R read quorum",
            "W write quorum",
            "R + W > N",
          ],
          explanation: [
            "In quorum-based systems, writes go to W replicas and reads query R replicas out of N total replicas. If the read and write sets overlap, the system is more likely to return the latest value.",
            "For example, with N = 3, a design of W = 2 and R = 2 often gives better consistency than W = 1 and R = 1.",
            "But stronger quorums increase latency and reduce availability during failures because more replicas must respond successfully.",
          ],
          keyTakeaways: [
            "Quorums are a tunable tradeoff between consistency, latency, and availability.",
            "Larger quorum sizes improve read freshness but increase request cost.",
          ],
          checkpoint: [
            "Can I explain why R + W > N matters?",
            "Can I explain the cost of larger quorum sizes?",
          ],
        },
        {
          id: "consistency-6",
          title: "Lesson 6: Ordering, Clocks, and Conflict Resolution",
          goal:
            "Learn why it is hard to decide which write is latest in a distributed system.",
          concepts: [
            "Wall-clock skew",
            "Logical clocks",
            "Version vectors",
            "Last-write-wins",
            "Conflict resolution",
          ],
          explanation: [
            "Distributed systems do not share one perfect clock. Machines can disagree on time, messages can arrive late, and writes may race across regions.",
            "Because of that, determining order is difficult. Some systems use logical clocks or version metadata instead of trusting physical timestamps.",
            "When conflicts happen, systems need a resolution policy. Simple systems may use last-write-wins, while others merge values or push conflicts to the application layer.",
          ],
          keyTakeaways: [
            "Conflict resolution is part of consistency design, not an afterthought.",
            "Physical timestamps alone are often not enough to reason safely about order.",
          ],
          checkpoint: [
            "Can I explain why physical timestamps alone are risky?",
            "Can I name one conflict resolution strategy?",
          ],
        },
        {
          id: "consistency-7",
          title: "Lesson 7: Consistency Patterns Used in Products",
          goal:
            "Connect theory to real product design decisions.",
          concepts: [
            "Read-your-writes",
            "Monotonic reads",
            "Causal consistency",
            "Idempotency",
            "Compensating actions",
          ],
          explanation: [
            "Not every system needs full strong consistency everywhere. Often products need narrower guarantees, such as a user seeing their own latest update or the application preserving action order within one session.",
            "Read-your-writes makes interfaces feel correct to the same user. Monotonic reads prevent users from seeing time move backward. Causal consistency preserves cause-and-effect relationships better than eventual consistency alone.",
            "Application-level patterns also help. Idempotency prevents duplicate writes during retries, and compensating actions help recover when fully atomic distributed updates are too expensive.",
          ],
          keyTakeaways: [
            "Consistency can be scoped to what users actually need.",
            "Application-level patterns are often essential in distributed systems.",
          ],
          checkpoint: [
            "Can I explain read-your-writes in a user-facing example?",
            "Can I explain why idempotency matters with retries?",
          ],
        },
        {
          id: "consistency-8",
          title: "Lesson 8: A Simple Framework for Studying Distributed Databases",
          goal:
            "Build a repeatable way to think through distributed database design.",
          concepts: [
            "Access patterns",
            "Data model",
            "Partitioning",
            "Replication",
            "Consistency model",
            "Failure plan",
          ],
          explanation: [
            "Start with access patterns. What are the main reads and writes? Are they point lookups, range scans, joins, graph traversals, or analytics queries?",
            "Then choose the data model: distributed SQL for strong relational guarantees, or the right NoSQL model for scale and targeted access patterns.",
            "Next explain partitioning, replication, and consistency. What is the shard key? How many replicas? What happens during failure? What stale reads are acceptable?",
            "Finally cover operational tradeoffs such as rebalancing, failover, backups, cross-region deployment, and cost of coordination.",
          ],
          keyTakeaways: [
            "The best way to learn distributed databases is to connect data model, partitioning, replication, consistency, and failures into one story.",
            "Every design choice should be tied back to real reads, writes, and system constraints.",
          ],
          checkpoint: [
            "Can I reason through a distributed database design in a structured way?",
            "Can I clearly justify a SQL or NoSQL choice and the consistency model behind it?",
          ],
        },
      ],
    },
  ],
  finalRevision: [
    "Distributed SQL is about preserving relational integrity at scale, but coordination becomes expensive.",
    "Sharding helps scale storage and throughput, but shard key choice determines query efficiency and hotspot risk.",
    "Replication improves availability and read scale, but introduces lag and consistency tradeoffs.",
    "Distributed transactions preserve atomicity across nodes, but they cost latency and operational complexity.",
    "NoSQL is not one database type; it includes key-value, document, wide-column, and graph systems.",
    "NoSQL data modeling is driven by access patterns, which often leads to denormalization.",
    "Consistency is about what users observe after writes, not just a formal definition.",
    "Strong consistency improves correctness, while eventual consistency often improves scale and availability.",
    "CAP matters during partitions, while PACELC reminds us that latency versus consistency also matters when the system is healthy.",
    "A strong understanding of distributed databases connects data model, partitioning, replication, consistency, and product requirements into one clear picture.",
  ],
};

export default distributedDatabaseCourse;
