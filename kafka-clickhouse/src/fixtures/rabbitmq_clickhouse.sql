-- Create a new database named 'eurl_data'
CREATE DATABASE IF NOT EXISTS eurl_data;

-- Switch to the 'eurl_data' database to ensure all subsequent operations are performed within this database
USE eurl_data;

-- ===========================
-- TABLE: 'click_analytics_rq'
-- ===========================
-- Create a table named 'click_analytics_rq' to consume data from a RabbitMQ queue
-- The table schema includes columns for code, browser, os, device, country, region, and city
-- LowCardinality is used for columns with a limited number of unique values to optimize storage
-- The table uses the RabbitMQ engine, with settings specified for the RabbitMQ broker, routing key, exchange name, and message format

CREATE TABLE IF NOT EXISTS eurl_data.click_analytics_rq (
    `code` String,                              -- A unique code representing the click analytics data
    `browser` LowCardinality(String),           -- The browser type (e.g., Chrome, Firefox) with LowCardinality to optimize storage
    `os` LowCardinality(String),                -- The operating system (e.g., Windows, Linux), optimized with LowCardinality
    `device` LowCardinality(String),            -- The type of device (e.g., Desktop, Mobile), optimized with LowCardinality
    `country` LowCardinality(String),           -- The country of the user, optimized with LowCardinality
    `region` String,                            -- The region or state where the user is located
    `city` String                               -- The city where the user is located
) ENGINE = RabbitMQ                              -- Use RabbitMQ as the table engine for real-time data ingestion
SETTINGS
    rabbitmq_host_port = '172.18.0.9:5672',      -- RabbitMQ broker address
    rabbitmq_routing_key_list = 'eurl_click_analytics', -- RabbitMQ routing key for message filtering
    rabbitmq_exchange_name = 'exchange',         -- The RabbitMQ exchange name where messages are published
    rabbitmq_format = 'JSONEachRow';             -- Format for incoming messages from RabbitMQ (JSON format, one message per row)

-- =======================
-- TABLE: 'click_analytics'
-- =======================
-- Create a table named 'click_analytics' to store processed click analytics data
-- The table schema includes columns for code, browser, os, device, country, region, city, and a timestamp for the event
-- The MergeTree engine is used for high-performance OLAP queries
-- Data is partitioned by month and ordered by multiple columns for efficient querying

CREATE TABLE IF NOT EXISTS eurl_data.click_analytics
(
    `code` String,                              -- A unique code representing the click analytics data
    `browser` LowCardinality(String),           -- Browser type (Chrome, Firefox), optimized with LowCardinality
    `os` LowCardinality(String),                -- Operating system (Windows, macOS), optimized with LowCardinality
    `device` LowCardinality(String),            -- Type of device (Desktop, Mobile), optimized with LowCardinality
    `country` LowCardinality(String),           -- The country where the user is located, optimized with LowCardinality
    `region` String,                            -- The region or state of the user
    `city` String,                              -- The city of the user
    `timestamp` Date DEFAULT toDate(now())      -- A timestamp for the event, defaulting to the current date
)
ENGINE = MergeTree                             -- Use MergeTree for efficient OLAP queries
PARTITION BY toYYYYMM(timestamp)               -- Partition data by month (YYYYMM) based on the timestamp
ORDER BY (code, timestamp, browser, os, device, country)  -- Order data by multiple columns to speed up queries
SETTINGS index_granularity = 8192;             -- Set the granularity of the primary key index for efficient data access

-- =======================================
-- MATERIALIZED VIEW: 'click_analytics_mv'
-- =======================================
-- Create a materialized view to automatically transfer data from the RabbitMQ table to the analytics table
-- The materialized view watches the 'click_analytics_rq' table and inserts the data into 'click_analytics' as it arrives

CREATE MATERIALIZED VIEW IF NOT EXISTS eurl_data.click_analytics_mv
TO eurl_data.click_analytics                    -- Target table where processed data will be stored
AS
SELECT * FROM eurl_data.click_analytics_rq;      -- Select all data from the RabbitMQ table for insertion into the analytics table
