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
    "A step-by-step learning path for distributed SQL, NoSQL, replication, transactions, and consistency",
  audience:
    "Engineers who want to build a practical and durable understanding of how distributed databases really work.",
  howToUse: [
    "Read this course slowly, one lesson at a time.",
    "Do not just memorize terms. Ask what problem each idea solves.",
    "After every lesson, pause and explain the concept back in simple words.",
    "Whenever possible, connect the topic to a real system such as payments, messaging, content feeds, or analytics.",
    "Use the final revision section for quick review after you complete the course once.",
  ],
  modules: [
    {
      id: "sql-foundations",
      title: "Module 1: Distributed SQL Foundations",
      overview:
        "This module starts with relational database fundamentals and gradually moves into sharding, replication, transactions, and failure handling. The goal is to understand why relational systems are powerful, why they become harder to scale, and how distributed SQL tries to preserve correctness across multiple machines.",
      lessons: [
        {
          id: "sql-1",
          title: "Lesson 1: Why SQL Still Matters",
          goal:
            "Understand why relational databases remain important even in large-scale systems.",
          concepts: [
            "Relational model",
            "Schema",
            "Constraints",
            "ACID transactions",
            "Joins",
          ],
          explanation: [
            "Relational databases are designed around structured data and clear relationships between entities. When a system has users, orders, payments, subscriptions, and invoices, those relationships matter a lot.",
            "One of the biggest strengths of SQL is correctness. A schema defines expected structure, constraints protect data integrity, and transactions allow a group of changes to either succeed together or fail together.",
            "This makes relational databases especially valuable for core business systems where bad data can be expensive. In practice, SQL reduces a lot of complexity that would otherwise move into application code.",
          ],
          keyTakeaways: [
            "SQL is strong when data relationships and correctness matter.",
            "Transactions and constraints reduce the risk of inconsistent state.",
          ],
          checkpoint: [
            "Can I explain why relational modeling is useful?",
            "Can I explain why constraints and transactions matter?",
          ],
        },
        {
          id: "sql-2",
          title: "Lesson 2: Why Scaling SQL Is Hard",
          goal:
            "Learn why relational databases become more complicated when one machine is no longer enough.",
          concepts: [
            "Vertical scaling",
            "Horizontal scaling",
            "Bottlenecks",
            "Coordination",
            "Distributed queries",
          ],
          explanation: [
            "A single-node SQL database is usually easy to understand. All data lives in one place, transactions are local, joins are straightforward, and consistency is simpler to maintain.",
            "As usage grows, one machine eventually runs out of CPU, memory, storage, or network capacity. You can keep buying a larger machine for some time, but that approach has cost and hardware limits.",
            "Once you distribute data across multiple nodes, many operations become harder. Queries may need to talk to several machines, transactions may span multiple partitions, and maintaining a consistent view of data becomes more expensive.",
          ],
          keyTakeaways: [
            "Distributed scale solves capacity problems but introduces coordination problems.",
            "The challenge is not just storing more data, but preserving correctness and performance across nodes.",
          ],
          checkpoint: [
            "Can I explain why distributed SQL is harder than single-node SQL?",
            "Can I explain what kinds of new problems appear after distribution?",
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
            "Hotspots",
            "Resharding",
          ],
          explanation: [
            "Sharding means splitting data into partitions and storing each partition on a different node. This allows storage and traffic to scale horizontally.",
            "The most important design choice is the partition key. A good partition key spreads load well and keeps the most common reads and writes local to a single shard.",
            "Hash-based partitioning usually distributes traffic evenly, which helps avoid hotspots. Range-based partitioning is often better for ordered queries and scans, but it can create skew if newer or popular ranges receive much more traffic.",
            "A bad shard key leads to overloaded nodes, uneven storage growth, and expensive cross-shard queries. That is why access patterns should drive partitioning decisions.",
          ],
          keyTakeaways: [
            "Partitioning is about both scale and locality.",
            "The shard key shapes query efficiency, hotspot risk, and operational complexity.",
          ],
          checkpoint: [
            "Can I compare hash and range partitioning?",
            "Can I explain why partition key choice is so important?",
          ],
        },
        {
          id: "sql-4",
          title: "Lesson 4: Distributed Replication Basics",
          goal:
            "Understand why systems replicate data and what leader-follower replication means.",
          concepts: [
            "Replica",
            "Leader",
            "Follower",
            "Primary",
            "Standby",
            "Replication log",
          ],
          explanation: [
            "A replica is a node that stores a copy of the database or part of it. Replication is used to improve durability, availability, and read scale.",
            "In leader-follower replication, the leader handles writes first. Once the leader commits a change, it forwards the change to follower replicas through a replication log or data-change stream.",
            "Reads may go to the leader or to replicas depending on freshness requirements. This model is simple to reason about because writes flow through one primary source of truth before being copied outward.",
          ],
          keyTakeaways: [
            "Replication creates copies for resilience and scale.",
            "Leader-follower replication is one of the most common replication patterns.",
          ],
          checkpoint: [
            "Can I explain what a leader and follower do?",
            "Can I explain why reads and writes are often handled differently?",
          ],
        },
        {
          id: "sql-5",
          title: "Lesson 5: Synchronous and Asynchronous Replication",
          goal:
            "Learn how replication timing affects durability, latency, and availability.",
          concepts: [
            "Synchronous replication",
            "Asynchronous replication",
            "Acknowledgement",
            "Replica lag",
            "Durability",
          ],
          explanation: [
            "With synchronous replication, the leader waits for one or more replicas to confirm the write before replying success. This gives stronger durability because the data is already copied elsewhere at the time the write is acknowledged.",
            "The downside is latency. Every write must wait for extra network and disk work, so slow or unavailable replicas can delay the whole write path.",
            "With asynchronous replication, the leader acknowledges the client first and sends changes to followers later. This gives lower latency and higher write availability, but a leader failure may lose the latest changes if followers have not caught up.",
            "Many real systems use a mix, such as requiring one close replica synchronously while sending to others asynchronously.",
          ],
          keyTakeaways: [
            "Synchronous replication improves durability but increases write latency.",
            "Asynchronous replication improves write speed but can lose the newest writes during failure.",
          ],
          checkpoint: [
            "Can I explain the tradeoff between synchronous and asynchronous replication?",
            "Can I explain why asynchronous replicas may lag?",
          ],
        },
        {
          id: "sql-6",
          title: "Lesson 6: Setting Up a New Follower",
          goal:
            "Understand how a new replica joins a replication system safely.",
          concepts: [
            "Snapshot",
            "Base copy",
            "Backlog",
            "Catch-up",
            "Replication stream",
          ],
          explanation: [
            "A new follower cannot simply start reading live updates from the leader without first getting a consistent base copy of existing data. Otherwise it would miss earlier records.",
            "The usual process is to take a snapshot from the leader or from an existing replica, copy that snapshot to the new node, and then connect the new follower to the replication stream.",
            "After that, the new follower applies all backlog changes that happened after the snapshot was taken. Once it catches up to the leader's current position, it becomes a normal follower.",
            "This process matters because it allows scaling or recovery without stopping normal database traffic.",
          ],
          keyTakeaways: [
            "A new replica needs both a base snapshot and backlog replay.",
            "Catch-up replication lets new nodes join without full service downtime.",
          ],
          checkpoint: [
            "Can I explain why a snapshot alone is not enough?",
            "Can I explain how a follower catches up after the snapshot?",
          ],
        },
        {
          id: "sql-7",
          title: "Lesson 7: Node Outages and Replica Failure",
          goal:
            "Learn what happens when follower replicas go down and recover later.",
          concepts: [
            "Follower outage",
            "Replication log retention",
            "Recovery",
            "Replay",
            "Catch-up",
          ],
          explanation: [
            "If a follower fails temporarily, the leader usually keeps a log of recent data changes. When the follower comes back, it reconnects and replays the missing changes.",
            "This works only if the missed history is still available. If the follower was down too long and the needed log entries are gone, it may need a fresh snapshot and full catch-up again.",
            "Follower failures are usually less dangerous than leader failures because the system can often continue with reduced redundancy while the follower recovers.",
          ],
          keyTakeaways: [
            "Followers often recover by replaying missed changes from the replication log.",
            "Long outages may require a full reinitialization instead of simple catch-up.",
          ],
          checkpoint: [
            "Can I explain how a failed follower catches up?",
            "Can I explain when a full snapshot is needed again?",
          ],
        },
        {
          id: "sql-8",
          title: "Lesson 8: Leader Failure and Failover",
          goal:
            "Understand how systems detect leader failure and promote a new leader.",
          concepts: [
            "Leader election",
            "Failover",
            "Consensus",
            "Promotion",
            "Reconfiguration",
          ],
          explanation: [
            "Leader failure is more serious because writes normally go through the leader. When the leader goes down, the system must first determine that the failure is real and not just a temporary network issue.",
            "Then it needs to choose a new leader, usually from the most up-to-date followers. This often involves a consensus process so that multiple nodes do not each assume leadership at the same time.",
            "Finally, clients and replicas must reconfigure to send new writes to the promoted leader. Good failover design tries to keep this process safe, fast, and predictable.",
          ],
          keyTakeaways: [
            "Leader failover is both a correctness problem and an availability problem.",
            "Choosing a new leader safely often requires consensus-like coordination.",
          ],
          checkpoint: [
            "Can I explain why leader failure is harder than follower failure?",
            "Can I explain the main steps of failover?",
          ],
        },
        {
          id: "sql-9",
          title: "Lesson 9: Replication Implementation Methods",
          goal:
            "Learn the common ways databases replicate changes from one node to another.",
          concepts: [
            "Statement-based replication",
            "Write-ahead log",
            "Row-based replication",
            "Trigger-based replication",
          ],
          explanation: [
            "Statement-based replication forwards the SQL statements that were executed on the leader to the followers. This is simple to understand, but it can be risky if statements contain non-deterministic functions such as now() or rand().",
            "Write-ahead-log replication copies low-level physical changes from the leader’s storage log. This is efficient and accurate, but it is closely tied to the storage engine format.",
            "Logical row-based replication sends row-level inserts, updates, and deletes. This is more flexible because it describes what changed in logical terms instead of copying raw storage blocks.",
            "Trigger-based replication uses custom database triggers or application logic to capture changes and write them elsewhere. It offers flexibility, but it is usually more fragile and harder to maintain than built-in replication mechanisms.",
          ],
          keyTakeaways: [
            "Different replication methods operate at different levels of abstraction.",
            "Built-in log or row replication is usually safer and more reliable than custom trigger-based replication.",
          ],
          checkpoint: [
            "Can I explain the difference between statement-based and row-based replication?",
            "Can I explain why non-deterministic SQL is risky for statement replication?",
          ],
        },
        {
          id: "sql-10",
          title: "Lesson 10: Distributed Transactions",
          goal:
            "Understand why transactions across nodes are difficult and expensive.",
          concepts: [
            "Single-shard transaction",
            "Cross-shard transaction",
            "Coordinator",
            "Two-phase commit",
            "Atomicity",
          ],
          explanation: [
            "When all data needed for a transaction lives on one node, the database can commit the change locally. That is much easier and usually much faster.",
            "When a transaction touches multiple shards, the system must coordinate across nodes so that either all participants commit or none do. Otherwise the database can end up partially updated.",
            "Two-phase commit is the classic protocol for this. In the first phase, the coordinator asks participants if they are ready. In the second phase, it tells them to commit or abort.",
            "This preserves atomicity, but it adds network hops, coordination overhead, lock holding, and failure complexity. That is why system designers try to keep most transactions local when possible.",
          ],
          keyTakeaways: [
            "Cross-shard transactions preserve correctness but cost more latency and complexity.",
            "Locality is one of the best ways to simplify distributed transaction design.",
          ],
          checkpoint: [
            "Can I explain why two-phase commit is expensive?",
            "Can I explain why keeping transactions local is valuable?",
          ],
        },
      ],
    },
    {
      id: "nosql-foundations",
      title: "Module 2: NoSQL Systems and Replication Models",
      overview:
        "This module explains NoSQL as a family of data models and replication strategies designed for different access patterns, scalability goals, and consistency tradeoffs. The aim is to understand why different systems make different design choices rather than assuming one model fits everything.",
      lessons: [
        {
          id: "nosql-1",
          title: "Lesson 1: What NoSQL Really Means",
          goal:
            "Understand NoSQL as a broad family of systems rather than a single database type.",
          concepts: [
            "Non-relational model",
            "Schema flexibility",
            "Horizontal scaling",
            "Denormalization",
          ],
          explanation: [
            "NoSQL systems are usually built for scale, flexible schemas, or specialized access patterns. They often trade away some relational features in exchange for simpler horizontal growth or higher write throughput.",
            "NoSQL does not mean unstructured chaos. Instead, the data model is often shaped directly around the application's reads and writes.",
            "The key mindset shift is that NoSQL design often starts with access patterns first and normalization second.",
          ],
          keyTakeaways: [
            "NoSQL is about different tradeoffs, not about having no structure.",
            "The data model is usually designed around application access patterns.",
          ],
          checkpoint: [
            "Can I explain what NoSQL means without oversimplifying it?",
            "Can I explain why denormalization is common in NoSQL?",
          ],
        },
        {
          id: "nosql-2",
          title: "Lesson 2: Key-Value, Document, Wide-Column, and Graph Models",
          goal:
            "Understand the main NoSQL categories and the type of problems each one solves.",
          concepts: [
            "Key-value store",
            "Document database",
            "Wide-column store",
            "Graph database",
          ],
          explanation: [
            "Key-value stores are best when the application already knows the key and wants very fast lookup or update. Sessions, carts, feature flags, and simple profile objects are common examples.",
            "Document databases store self-contained JSON-like objects. They work well when an entity and most of its data are usually read together, such as product catalogs or content metadata.",
            "Wide-column stores are often used for high write throughput, event streams, time-series data, and other workloads where access is built around partition keys and ordered clustering.",
            "Graph databases are useful when the main problem is not simple lookup but traversing relationships, such as social graphs, recommendation paths, fraud graphs, or dependency networks.",
          ],
          keyTakeaways: [
            "Different NoSQL models solve different classes of problems.",
            "A strong design begins by matching the data model to the query patterns.",
          ],
          checkpoint: [
            "Can I explain one good use case for each NoSQL category?",
            "Can I explain why one NoSQL model is not automatically good for every problem?",
          ],
        },
        {
          id: "nosql-3",
          title: "Lesson 3: NoSQL Data Modeling",
          goal:
            "Learn how NoSQL schema design begins with the queries the system must support.",
          concepts: [
            "Access-pattern driven design",
            "Denormalization",
            "Precomputation",
            "Materialized view",
          ],
          explanation: [
            "In relational systems, data modeling often begins with entities and relationships. In NoSQL, design often begins with the most important reads and writes.",
            "This leads to denormalization. Data may be copied into multiple places so the system can answer key queries without expensive joins.",
            "Precomputed views and write-time aggregation are common because they move work away from read time. The tradeoff is that writes and updates can become more complex.",
          ],
          keyTakeaways: [
            "NoSQL modeling is query-first.",
            "Denormalization improves read performance but increases update complexity.",
          ],
          checkpoint: [
            "Can I explain why NoSQL systems often duplicate data?",
            "Can I explain why materialized views are useful?",
          ],
        },
        {
          id: "nosql-4",
          title: "Lesson 4: Multi-Leader Replication",
          goal:
            "Understand what happens when more than one node is allowed to accept writes.",
          concepts: [
            "Multi-leader replication",
            "Master-master",
            "Write forwarding",
            "Conflict",
            "Asynchronous propagation",
          ],
          explanation: [
            "In multi-leader replication, more than one node can accept writes. Each leader processes its local write and forwards the change to the other leaders.",
            "This can be useful for geographically distributed systems because users can write to a nearby data center instead of sending every write to one central leader far away.",
            "The main challenge is conflict. If two leaders accept incompatible updates to the same record before they learn about each other, the system must later detect and resolve that conflict.",
          ],
          keyTakeaways: [
            "Multi-leader replication improves write locality and availability.",
            "It also creates a much harder conflict-resolution problem.",
          ],
          checkpoint: [
            "Can I explain why multi-leader replication exists?",
            "Can I explain why conflict handling becomes necessary?",
          ],
        },
        {
          id: "nosql-5",
          title: "Lesson 5: Multi-Data-Center Replication and Topologies",
          goal:
            "Learn how multi-leader systems connect regions and replicate changes between them.",
          concepts: [
            "Data center replication",
            "Circular topology",
            "Star topology",
            "All-to-all topology",
          ],
          explanation: [
            "In a multi-data-center system, each data center may have its own local leader and local clients. Changes from each leader are replicated to leaders in other regions.",
            "There are several ways to connect the leaders. In a circular topology, each node forwards writes to the next node in a ring. In a star topology, a designated root node forwards changes outward. In an all-to-all topology, every leader sends updates directly to every other leader.",
            "Each topology has tradeoffs in latency, fault tolerance, operational simplicity, and message fan-out. All-to-all gives direct propagation but can create more communication overhead as the number of leaders grows.",
          ],
          keyTakeaways: [
            "Replication topology shapes both performance and complexity.",
            "The right topology depends on region count, write patterns, and tolerance for propagation delay.",
          ],
          checkpoint: [
            "Can I explain the difference between circular, star, and all-to-all topologies?",
            "Can I explain why multi-region replication is useful?",
          ],
        },
        {
          id: "nosql-6",
          title: "Lesson 6: Offline Clients and Collaborative Editing",
          goal:
            "Understand why multi-leader ideas are useful for devices that continue working without a network connection.",
          concepts: [
            "Offline-first",
            "Local database",
            "Device sync",
            "Collaborative editing",
            "Asynchronous merge",
          ],
          explanation: [
            "In offline-capable applications, each device may store data locally and continue accepting writes even without network connectivity. In effect, each device temporarily behaves like its own leader.",
            "Later, when connectivity returns, those local changes must be synchronized with the shared system and with other devices. This looks a lot like multi-leader replication because multiple places may have accepted writes independently.",
            "Collaborative editing systems use similar ideas. Different clients may edit the same logical object concurrently, so the system needs a model for merging or reconciling those edits.",
          ],
          keyTakeaways: [
            "Offline sync often behaves like temporary multi-leader replication.",
            "Local write availability creates a need for synchronization and conflict resolution later.",
          ],
          checkpoint: [
            "Can I explain why offline clients naturally create sync conflicts?",
            "Can I explain why collaborative editing is related to multi-leader ideas?",
          ],
        },
        {
          id: "nosql-7",
          title: "Lesson 7: Handling Write Conflicts in Multi-Leader Systems",
          goal:
            "Learn the major ways systems try to avoid or resolve conflicting writes.",
          concepts: [
            "Conflict avoidance",
            "Versioning",
            "Timestamp ordering",
            "Custom conflict resolution",
          ],
          explanation: [
            "One approach is conflict avoidance. For example, always route a particular user's writes to the same leader so that concurrent updates are less likely. This helps, but it breaks down when the preferred leader is unavailable or when writes still race from different sources.",
            "Another approach is to store version or timestamp metadata with each write and decide which version is newer. This is simple, but it can discard information if two updates were both valid but concurrent.",
            "Some systems also support custom conflict handlers. When the database detects conflicting versions, the application is asked to merge or choose the final state based on business logic.",
          ],
          keyTakeaways: [
            "Conflict handling can be pushed into routing, metadata, or application logic.",
            "Simple conflict rules are easy to implement but may lose information.",
          ],
          checkpoint: [
            "Can I explain one way to avoid conflicts and one way to resolve them?",
            "Can I explain why custom resolution may be needed?",
          ],
        },
        {
          id: "nosql-8",
          title: "Lesson 8: Leaderless Replication",
          goal:
            "Understand systems where clients write directly to multiple replicas instead of relying on a single leader.",
          concepts: [
            "Leaderless replication",
            "Coordinator",
            "Replica set",
            "Dynamo-style design",
          ],
          explanation: [
            "In leaderless replication, there is no single primary node for writes. A client or a coordinator node sends writes directly to multiple replicas.",
            "This design can improve availability because the system is less dependent on one designated leader. Even if some replicas are down, the write may still succeed if enough replicas respond.",
            "The tradeoff is that consistency becomes more complicated. Different replicas may temporarily store different versions, and the system must repair or reconcile those versions later.",
          ],
          keyTakeaways: [
            "Leaderless replication removes dependence on one primary writer.",
            "It shifts more complexity into read, write, and repair logic.",
          ],
          checkpoint: [
            "Can I explain how leaderless replication differs from leader-follower?",
            "Can I explain why leaderless systems still need reconciliation logic?",
          ],
        },
      ],
    },
    {
      id: "distributed-consistency",
      title: "Module 3: Consistency, Quorums, and Conflict Resolution",
      overview:
        "This module focuses on what distributed systems promise after reads and writes, what happens during failures, and how replicated databases converge again after nodes disagree. These ideas are central to understanding real distributed data behavior.",
      lessons: [
        {
          id: "consistency-1",
          title: "Lesson 1: What Consistency Means",
          goal:
            "Build a practical understanding of consistency in distributed systems.",
          concepts: [
            "Stale read",
            "Replica lag",
            "Write visibility",
            "Observed state",
          ],
          explanation: [
            "Consistency is about what clients observe after reads and writes. If one client writes a value, what does another client see immediately afterward?",
            "Because distributed systems replicate data across nodes, not all replicas update at the exact same instant. That means different clients may temporarily see different versions of the same data.",
            "A practical way to think about consistency is to ask how much temporary disagreement the product can tolerate and for how long.",
          ],
          keyTakeaways: [
            "Consistency is about user-visible behavior after writes.",
            "Different products need different freshness guarantees.",
          ],
          checkpoint: [
            "Can I explain consistency without using only formal textbook language?",
            "Can I explain what a stale read is?",
          ],
        },
        {
          id: "consistency-2",
          title: "Lesson 2: Strong and Eventual Consistency",
          goal:
            "Understand the central consistency tradeoff in distributed systems.",
          concepts: [
            "Strong consistency",
            "Eventual consistency",
            "Read-after-write",
            "Propagation delay",
          ],
          explanation: [
            "With strong consistency, a successful write is immediately visible to future reads. This is easier to reason about, but it usually requires more coordination and higher latency.",
            "With eventual consistency, replicas may temporarily return older versions, but they eventually converge. This improves availability and scalability, but the system must tolerate temporary divergence.",
            "Many real systems use narrower guarantees such as read-after-write consistency for the same client rather than full strong consistency for every read everywhere.",
          ],
          keyTakeaways: [
            "Strong consistency improves predictability but costs more coordination.",
            "Eventual consistency accepts temporary mismatch in exchange for scale and availability.",
          ],
          checkpoint: [
            "Can I explain when strong consistency is worth the cost?",
            "Can I explain when eventual consistency is acceptable?",
          ],
        },
        {
          id: "consistency-3",
          title: "Lesson 3: CAP and PACELC",
          goal:
            "Understand how distributed systems trade consistency, availability, and latency.",
          concepts: [
            "CAP theorem",
            "Partition tolerance",
            "Availability",
            "Latency",
            "PACELC",
          ],
          explanation: [
            "CAP says that during a network partition, a distributed system must make a tradeoff between consistency and availability. Partition tolerance is effectively required in real distributed systems, so the real question becomes how the system behaves during that failure.",
            "PACELC adds another important point. Even when there is no partition, systems still trade latency against consistency. Stronger cross-node coordination often makes operations slower.",
            "Together, these ideas help explain why no distributed database can optimize all properties at once.",
          ],
          keyTakeaways: [
            "CAP is about behavior during partitions.",
            "PACELC reminds us that coordination costs latency even in healthy systems.",
          ],
          checkpoint: [
            "Can I explain CAP in practical terms?",
            "Can I explain why PACELC is also useful?",
          ],
        },
        {
          id: "consistency-4",
          title: "Lesson 4: Quorums for Reads and Writes",
          goal:
            "Learn how replicated databases use quorums to balance freshness, durability, and availability.",
          concepts: [
            "N replicas",
            "R quorum",
            "W quorum",
            "R + W > N",
          ],
          explanation: [
            "If a value is stored on N replicas, a write may be considered successful after W replicas confirm it, and a read may query R replicas before returning a result.",
            "When R plus W is greater than N, the read and write sets overlap. That overlap makes it more likely that a read sees at least one up-to-date copy of the data.",
            "Larger quorums usually improve consistency but reduce availability and increase latency because more nodes must respond successfully.",
          ],
          keyTakeaways: [
            "Quorums are a practical tool for tuning consistency and availability.",
            "Freshness improves with more overlap, but latency and failure sensitivity also increase.",
          ],
          checkpoint: [
            "Can I explain why R + W > N matters?",
            "Can I explain what gets worse when quorum sizes grow?",
          ],
        },
        {
          id: "consistency-5",
          title: "Lesson 5: Read Repair and Anti-Entropy",
          goal:
            "Understand how leaderless or eventually consistent systems heal divergence after failures.",
          concepts: [
            "Read repair",
            "Anti-entropy",
            "Background repair",
            "Replica convergence",
          ],
          explanation: [
            "Read repair happens when a client reads from multiple replicas and the system notices that one or more copies are stale. The system can then send the newest value back to the stale replicas so they catch up.",
            "Anti-entropy is a background repair process that compares replicas and synchronizes differences even when no client is actively reading that data.",
            "These mechanisms are important because eventually consistent replicas can drift apart after outages, delayed writes, or lost messages. Repair logic helps bring them back to the same state over time.",
          ],
          keyTakeaways: [
            "Read repair fixes stale replicas during reads.",
            "Anti-entropy repairs divergence in the background over time.",
          ],
          checkpoint: [
            "Can I explain the difference between read repair and anti-entropy?",
            "Can I explain why both are useful?",
          ],
        },
        {
          id: "consistency-6",
          title: "Lesson 6: Sloppy Quorums and Hinted Handoff",
          goal:
            "Learn how systems continue operating when some expected replicas are temporarily unavailable.",
          concepts: [
            "Sloppy quorum",
            "Hinted handoff",
            "Temporary replica",
            "Availability under failure",
          ],
          explanation: [
            "Sometimes the system cannot reach the usual home replicas for a key because of a node or data center outage. In that case, it may still accept writes on other reachable nodes instead of rejecting the operation.",
            "This is called a sloppy quorum. The write is stored on temporary nodes so the system stays available even though the ideal replica set was not reachable.",
            "Later, when the original replicas recover, the temporary nodes transfer those writes back to the correct home replicas. This delayed transfer is called hinted handoff.",
            "This design improves availability, but it also increases the chance of temporary inconsistency and delayed convergence.",
          ],
          keyTakeaways: [
            "Sloppy quorums favor availability when the normal replica set is unreachable.",
            "Hinted handoff eventually moves temporary writes back to their intended home replicas.",
          ],
          checkpoint: [
            "Can I explain why sloppy quorum exists?",
            "Can I explain what hinted handoff does after recovery?",
          ],
        },
        {
          id: "consistency-7",
          title: "Lesson 7: Detecting Concurrent Writes",
          goal:
            "Understand how systems identify whether two writes happened in sequence or happened concurrently.",
          concepts: [
            "Concurrent writes",
            "Causality",
            "Last-write-wins",
            "Version vectors",
            "Version clocks",
          ],
          explanation: [
            "If two updates happen to the same record, the system needs to know whether one clearly happened after the other or whether they occurred independently at the same time from different replicas.",
            "A simple strategy is last-write-wins, where the database keeps the value with the newest timestamp and discards the others. This is easy but can silently lose valid updates.",
            "More advanced systems use version vectors or version clocks to track causality between versions. These mechanisms help detect when two versions are concurrent rather than strictly ordered.",
          ],
          keyTakeaways: [
            "Timestamp-based ordering is simple but may lose data.",
            "Version metadata helps detect true concurrency instead of guessing from clocks alone.",
          ],
          checkpoint: [
            "Can I explain why last-write-wins is risky?",
            "Can I explain what version vectors help us detect?",
          ],
        },
        {
          id: "consistency-8",
          title: "Lesson 8: Merging Concurrent Writes and Conflict Resolution",
          goal:
            "Learn the main ways distributed systems resolve conflicting versions after they are detected.",
          concepts: [
            "Merge",
            "Custom conflict resolution",
            "Application-level reconciliation",
            "Deterministic resolution",
          ],
          explanation: [
            "Once concurrent versions are detected, the system must decide how to produce the final state. One option is to discard all but one version using a simple deterministic rule.",
            "Another option is to merge the conflicting versions. For some data types, this is straightforward. For others, the merge requires application logic because only the business layer knows the right answer.",
            "Some systems surface multiple conflicting versions to the application and let the next read or write resolve them explicitly. This preserves information but pushes more responsibility to the developer.",
          ],
          keyTakeaways: [
            "Conflict resolution is a design choice, not a one-size-fits-all rule.",
            "The right resolution strategy depends on the meaning of the data, not just on database mechanics.",
          ],
          checkpoint: [
            "Can I explain when automatic merge is possible?",
            "Can I explain why some conflicts must be resolved by the application?",
          ],
        },
        {
          id: "consistency-9",
          title: "Lesson 9: A Simple Framework for Studying Distributed Databases",
          goal:
            "Build a repeatable way to reason through distributed database design decisions.",
          concepts: [
            "Access patterns",
            "Data model",
            "Partitioning",
            "Replication",
            "Failure recovery",
            "Consistency model",
          ],
          explanation: [
            "Start with access patterns. Ask what the main reads and writes are and which operations must be fast or strongly correct.",
            "Then choose the data model. Decide whether the problem is best served by relational structure or by a NoSQL model optimized for a narrower workload.",
            "After that, design partitioning and replication. Choose where data lives, how it is copied, and what happens when nodes fail.",
            "Finally, define the consistency model. Decide what stale data is acceptable, how conflicts are resolved, and how the system repairs itself after divergence.",
          ],
          keyTakeaways: [
            "Distributed database design becomes clearer when broken into a sequence of decisions.",
            "Every decision should tie back to real reads, writes, failures, and product constraints.",
          ],
          checkpoint: [
            "Can I reason through a distributed database step by step?",
            "Can I connect data model, replication, and consistency into one clear explanation?",
          ],
        },
      ],
    },
  ],
  finalRevision: [
    "Relational systems are strongest when correctness and rich relationships matter.",
    "Sharding scales storage and traffic, but a poor partition key creates hotspots and expensive cross-shard work.",
    "Leader-follower replication is simple and common: writes go to the leader, and followers copy those changes.",
    "Synchronous replication improves durability but slows writes; asynchronous replication speeds writes but can lose the newest changes during failure.",
    "A new follower usually needs a snapshot first and then a backlog of later changes to catch up.",
    "Follower failure is usually recovered by replaying missing logs; leader failure needs failover and safe leader selection.",
    "Replication can be implemented through statement logs, physical write-ahead logs, logical row changes, or custom triggers.",
    "Distributed transactions preserve atomicity across nodes, but they increase latency and coordination cost.",
    "NoSQL is a family of models: key-value, document, wide-column, and graph each fit different access patterns.",
    "Multi-leader replication improves locality and offline capability, but it makes write conflicts unavoidable.",
    "Leaderless replication removes dependence on one leader, but it requires quorum, repair, and conflict handling.",
    "Quorums tune the balance between freshness, availability, and latency.",
    "Read repair and anti-entropy help stale replicas converge after failures.",
    "Sloppy quorums and hinted handoff keep the system available when the normal replica set is down.",
    "Last-write-wins is simple but risky; version vectors and merge logic give more accurate conflict handling.",
    "A strong understanding of distributed databases connects data model, partitioning, replication, transactions, failures, and consistency into one coherent picture.",
  ],
};

export default distributedDatabaseCourse;
