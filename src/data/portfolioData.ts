import { Project, SQLQuery, PipelineStep, RoadmapMilestone, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Moyinoluwa Adio',
  role: 'Aspiring Data Engineer',
  tagline: 'Learning data engineering one project at a time.',
  bio: "Hi, I’m Moyinoluwa Adio. I'm building strong foundations in data engineering—learning how to ingest, structure, and query data with PostgreSQL, SQL, and Python. Driven by curiosity and a commitment to writing clean, maintainable data systems.",
  location: 'Open to Remote & Global Opportunities',
  email: 'adiomoyinoluwa6@gmail.com',
  github: 'https://github.com/Adio05',
  linkedin: 'https://www.linkedin.com/in/moyinoluwaadio/',
  portraitUrl: `${import.meta.env.BASE_URL}profile.jpeg`,
  stats: [
    { label: 'Relational Database', value: 'PostgreSQL' },
    { label: 'Primary Focus', value: 'ETL & SQL Modeling' },
    { label: 'Query Performance', value: 'Indexed & Optimized' },
    { label: 'Growth Mindset', value: '100% Daily Practice' }
  ]
};

export const SQL_QUERIES: SQLQuery[] = [
  {
    id: 'sales-revenue',
    title: 'Product Revenue Breakdown',
    filename: 'sales_revenue.sql',
    description: 'Calculates gross revenue grouped by product with descending financial totals and item counts.',
    sql: `-- Revenue by product aggregated with transaction volume
SELECT 
    product,
    COUNT(id) AS total_orders,
    SUM(amount) AS revenue,
    ROUND(AVG(amount), 2) AS avg_ticket
FROM sales
GROUP BY product
ORDER BY revenue DESC;`,
    executionTime: '3.4 ms',
    rowsCount: 4,
    columns: ['product', 'total_orders', 'revenue', 'avg_ticket'],
    sampleData: [
      { product: 'Backpack', total_orders: 14, revenue: '$630.00', avg_ticket: '$45.00' },
      { product: 'Water Bottle', total_orders: 22, revenue: '$396.00', avg_ticket: '$18.00' },
      { product: 'Notebook', total_orders: 28, revenue: '$336.00', avg_ticket: '$12.00' },
      { product: 'Desk Pen Set', total_orders: 15, revenue: '$135.00', avg_ticket: '$9.00' }
    ],
    notes: 'Uses GROUP BY and aggregate functions (SUM, COUNT, AVG) with ORDER BY for high-value product prioritization.'
  },
  {
    id: 'daily-trends',
    title: 'Daily Sales Run-Rate',
    filename: 'daily_trends.sql',
    description: 'Tracks day-by-day order volume and revenue to observe sales velocity across weekdays.',
    sql: `-- Daily transaction velocity & running totals
SELECT 
    sale_date::DATE AS day,
    COUNT(id) AS daily_transactions,
    SUM(amount) AS daily_revenue,
    SUM(SUM(amount)) OVER (ORDER BY sale_date::DATE) AS running_total
FROM sales
GROUP BY sale_date::DATE
ORDER BY day ASC;`,
    executionTime: '4.1 ms',
    rowsCount: 4,
    columns: ['day', 'daily_transactions', 'daily_revenue', 'running_total'],
    sampleData: [
      { day: '2026-11-01', daily_transactions: 12, daily_revenue: '$216.00', running_total: '$216.00' },
      { day: '2026-11-02', daily_transactions: 18, daily_revenue: '$342.00', running_total: '$558.00' },
      { day: '2026-11-03', daily_transactions: 25, daily_revenue: '$498.00', running_total: '$1,056.00' },
      { day: '2026-11-04', daily_transactions: 24, daily_revenue: '$441.00', running_total: '$1,497.00' }
    ],
    notes: 'Implements PostgreSQL window functions (OVER ORDER BY) to calculate cumulative running metrics.'
  },
  {
    id: 'data-quality-audit',
    title: 'Data Integrity & Null Check',
    filename: 'integrity_audit.sql',
    description: 'Validates table constraints, flags anomalous negative sales values, and detects null records.',
    sql: `-- Pipeline data validation & hygiene inspection
SELECT 
    COUNT(*) AS total_records,
    COUNT(CASE WHEN amount IS NULL THEN 1 END) AS missing_amounts,
    COUNT(CASE WHEN amount <= 0 THEN 1 END) AS invalid_amounts,
    COUNT(CASE WHEN product IS NULL THEN 1 END) AS null_products
FROM sales;`,
    executionTime: '2.8 ms',
    rowsCount: 1,
    columns: ['total_records', 'missing_amounts', 'invalid_amounts', 'null_products'],
    sampleData: [
      { total_records: 79, missing_amounts: 0, invalid_amounts: 0, null_products: 0 }
    ],
    notes: 'Essential ETL pre-load hygiene query ensuring relational integrity before committing to downstream models.'
  }
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'step-extract',
    stepNumber: '01',
    title: 'Raw Data Ingestion & Extraction',
    category: 'Source Layer',
    description: 'Extracting transaction feeds from batch CSV files and simulated API webhooks using Python requests and file handlers.',
    tools: ['Python 3', 'Requests', 'OS & Glob'],
    codePreview: `# Python extraction worker
import csv, os
def load_raw_feed(filepath):
    with open(filepath, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return [row for row in reader]`,
    keyOutputs: ['Unstructured CSVs parsed', 'Header integrity verified', 'File batch hashes tracked']
  },
  {
    id: 'step-transform',
    stepNumber: '02',
    title: 'Data Cleaning & Validation',
    category: 'Transformation Layer',
    description: 'Normalizing currency fields, parsing ISO timestamps, discarding corrupted records, and applying strict typing.',
    tools: ['Python', 'Pandas', 'Pydantic'],
    codePreview: `# Cleaning & type normalization
def transform_sales(raw_records):
    cleaned = []
    for r in raw_records:
        if float(r['amount']) > 0:
            cleaned.append({
                'product': r['product'].strip().title(),
                'amount': round(float(r['amount']), 2),
                'sale_date': r['sale_date']
            })
    return cleaned`,
    keyOutputs: ['Zero null amounts', 'Standardized product strings', 'Normalized numeric floats']
  },
  {
    id: 'step-load',
    stepNumber: '03',
    title: 'PostgreSQL Staging & Upsert',
    category: 'Database Layer',
    description: 'Connecting to PostgreSQL via psycopg2, structuring schemas with appropriate constraints, and executing transactional batch inserts.',
    tools: ['PostgreSQL', 'psycopg2', 'VS Code'],
    codePreview: `-- PostgreSQL table schema definition
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    product VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    keyOutputs: ['ACID compliant storage', 'Primary key indexing', 'Check constraint protections']
  },
  {
    id: 'step-serve',
    stepNumber: '04',
    title: 'Analytics & Consumption Views',
    category: 'Serving Layer',
    description: 'Building aggregated SQL views, materialized summaries, and export-ready outputs for business intelligence and reporting.',
    tools: ['SQL Views', 'Window Functions', 'CSV Exports'],
    codePreview: `-- Consumption view for stakeholders
CREATE OR REPLACE VIEW v_product_performance AS
SELECT 
    product,
    SUM(amount) AS gross_revenue,
    COUNT(id) AS units_sold
FROM sales
GROUP BY product;`,
    keyOutputs: ['Pre-calculated aggregates', 'Zero query lag', 'Business-ready metrics']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'sales-db',
    title: 'PostgreSQL Sales Analytics Database',
    subtitle: 'Relational data modeling, schema design, and aggregated queries',
    category: 'SQL & Database',
    description: 'Designed and deployed a local PostgreSQL database schema to track retail sales transactions. Wrote structured SQL DDL scripts to create relational tables, defined data types with CHECK constraints, populated synthetic sales data, and engineered aggregation queries for product revenue performance.',
    keyHighlights: [
      'Created normalized sales schema with PRIMARY KEY and CHECK constraints',
      'Engineered multi-column aggregation queries using GROUP BY, SUM, and ORDER BY',
      'Connected VS Code to PostgreSQL for streamlined local database management and query execution',
      'Configured index strategies for high-frequency queries'
    ],
    technologies: ['PostgreSQL', 'SQL', 'VS Code', 'psycopg2', 'Git'],
    githubUrl: 'https://github.com/Adio05',
    sqlSnippet: `CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product VARCHAR(80) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Top performing products
SELECT product, SUM(amount) AS total_revenue
FROM sales
GROUP BY product
ORDER BY total_revenue DESC;`,
    schemaDetails: {
      tableName: 'sales',
      columns: [
        { name: 'id', type: 'SERIAL PRIMARY KEY', description: 'Unique identifier for each transaction' },
        { name: 'product', type: 'VARCHAR(80)', description: 'Product name, indexed for reporting' },
        { name: 'amount', type: 'DECIMAL(10,2)', description: 'Transaction monetary value' },
        { name: 'sale_date', type: 'TIMESTAMPTZ', description: 'Timestamp when purchase was recorded' }
      ]
    },
    metrics: [
      { label: 'Database Engine', value: 'PostgreSQL 16' },
      { label: 'Query Latency', value: '< 5ms avg' },
      { label: 'Data Quality', value: '100% Non-null' }
    ]
  },
  {
    id: 'python-etl',
    title: 'Automated Python Ingestion Pipeline',
    subtitle: 'Batch data extractor and PostgreSQL loader script',
    category: 'Python ETL',
    description: 'An end-to-end Python script that reads raw data feeds, cleans and standardizes currency and date formats, filters out invalid negative records, and loads the sanitized dataset directly into PostgreSQL with automated error handling and logging.',
    keyHighlights: [
      'Built automated file ingestion handlers reading raw CSV inputs',
      'Implemented robust input validation and datatype coercion in Python',
      'Used psycopg2 connection pooling for safe database transactions',
      'Added execution logging to capture row count stats and pipeline run duration'
    ],
    technologies: ['Python 3', 'Pandas', 'psycopg2', 'Logging', 'PostgreSQL'],
    githubUrl: 'https://github.com/Adio05',
    sqlSnippet: `import psycopg2
from datetime import datetime

def batch_load_records(records, conn_string):
    with psycopg2.connect(conn_string) as conn:
        with conn.cursor() as cur:
            cur.executemany(
                """INSERT INTO sales (product, amount, sale_date)
                   VALUES (%s, %s, %s);""",
                records
            )
        conn.commit()`,
    metrics: [
      { label: 'Language', value: 'Python 3.11' },
      { label: 'Ingestion Mode', value: 'Batch Upsert' },
      { label: 'Handling', value: 'Transaction Safe' }
    ]
  },
  {
    id: 'data-quality-suite',
    title: 'SQL Data Quality & Validation Tests',
    subtitle: 'Automated relational assertion tests for pipeline health',
    category: 'Data Modeling',
    description: 'A suite of repeatable SQL audit assertions designed to run after ETL jobs. Detects orphaned records, identifies duplicate transaction keys, confirms non-negative totals, and flags data drift before reports are served to end users.',
    keyHighlights: [
      'Wrote defensive SQL assertions inspired by dbt test methodologies',
      'Ensured relational foreign-key consistency and primary key uniqueness',
      'Captured automated validation logs for auditing and debugging',
      'Structured modular SQL test scripts easy to invoke via shell or Python'
    ],
    technologies: ['SQL', 'PostgreSQL', 'Bash', 'Git'],
    githubUrl: 'https://github.com/Adio05',
    sqlSnippet: `-- Assertion: Verify zero duplicate transaction records
SELECT product, sale_date, amount, COUNT(*)
FROM sales
GROUP BY product, sale_date, amount
HAVING COUNT(*) > 1;`,
    metrics: [
      { label: 'Test Coverage', value: 'Schema & Values' },
      { label: 'Audit Run', value: 'Post-ETL Check' },
      { label: 'False Positives', value: '0%' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Databases & Querying',
    description: 'Designing normalized schemas, indexing, and querying relational data.',
    skills: [
      { name: 'PostgreSQL', status: 'Core Skill', highlight: 'Schema design, constraints, local instance management' },
      { name: 'SQL (DDL / DML)', status: 'Core Skill', highlight: 'CREATE, ALTER, INSERT, UPDATE, DELETE' },
      { name: 'Aggregations & Grouping', status: 'Core Skill', highlight: 'SUM, AVG, COUNT, MIN/MAX with GROUP BY & HAVING' },
      { name: 'Window Functions', status: 'Actively Using', highlight: 'OVER, PARTITION BY, running cumulative totals' },
      { name: 'Table Joins', status: 'Core Skill', highlight: 'INNER, LEFT, RIGHT, FULL OUTER relational links' }
    ]
  },
  {
    title: 'Programming & Data Processing',
    description: 'Writing scripts to extract, clean, transform, and load data.',
    skills: [
      { name: 'Python 3', status: 'Actively Using', highlight: 'Data structures, file I/O, modular scripting' },
      { name: 'Pandas', status: 'Actively Using', highlight: 'DataFrame manipulation, cleaning, and formatting' },
      { name: 'psycopg2', status: 'Core Skill', highlight: 'PostgreSQL database adapter for Python' },
      { name: 'Data Validation', status: 'Actively Using', highlight: 'Null checks, regex sanitization, schema typing' }
    ]
  },
  {
    title: 'Developer Tools & Workflows',
    description: 'Modern developer environment and version control.',
    skills: [
      { name: 'VS Code', status: 'Core Skill', highlight: 'SQL tools, database extensions, Python debugging' },
      { name: 'Git & GitHub', status: 'Core Skill', highlight: 'Version control, branch management, repo hosting' },
      { name: 'Bash & Terminal', status: 'Actively Using', highlight: 'CLI navigation, psql commands, script execution' },
      { name: 'pgAdmin & DBeaver', status: 'Actively Using', highlight: 'Database inspection and ERD visualization' }
    ]
  },
  {
    title: 'On My Roadmap',
    description: 'Actively studying to expand pipeline engineering capabilities.',
    skills: [
      { name: 'Apache Airflow', status: 'Currently Learning', highlight: 'DAG orchestration and automated scheduled pipelines' },
      { name: 'Docker', status: 'Currently Learning', highlight: 'Containerizing databases and ETL worker scripts' },
      { name: 'dbt (data build tool)', status: 'Next on Roadmap', highlight: 'Modular SQL transformations and automated testing' },
      { name: 'Cloud Warehouses', status: 'Next on Roadmap', highlight: 'BigQuery / Snowflake architecture patterns' }
    ]
  }
];

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    number: '01',
    title: 'PostgreSQL and SQL basics',
    status: 'Completed',
    period: 'Completed · First steps',
    summary: 'Set up PostgreSQL, connected it to VS Code, created a sales table, added sample data, and queried the results.',
    keyLearnings: ['Creating a table', 'Adding sample records', 'Running queries to inspect data'],
    toolsUsed: ['PostgreSQL', 'SQL', 'VS Code']
  },
  {
    number: '02',
    title: 'Python foundations',
    status: 'Upcoming',
    period: 'Next · Learning',
    summary: 'Build Python basics and practice using Python to load data into a database automatically.',
    keyLearnings: ['Python fundamentals', 'Working with data files', 'Connecting Python to PostgreSQL'],
    toolsUsed: ['Python', 'PostgreSQL']
  }
];

