-- Create a new database named 'eurl_data'
create database eurl_data;

-- Switch to the 'eurl_data' database to ensure all subsequent operations are performed within this database
use eurl_data;

-- Create a table named 'eurl_kafka' to consume data from a Kafka topic
-- The table schema includes columns for code, browser, os, device, country, region, and city
-- The LowCardinality type is used for columns with a limited number of unique values to optimize storage
-- The table uses the Kafka engine with settings specified for the Kafka broker, topic, consumer group, message format, and error handling
CREATE TABLE eurl_kafka
(
    `code` String,
    `browser` LowCardinality(String),
    `os` LowCardinality(String),
    `device` LowCardinality(String),
    `country` LowCardinality(String),
    `region` String,
    `city` String
)
ENGINE = Kafka
SETTINGS kafka_broker_list = 'serverless.aws.ap-southeast-1.warpstream.com:9092',
kafka_topic_list = 'click_analytics',
kafka_group_name = 'clickhouse',
kafka_format = 'JSONEachRow',
kafka_handle_error_mode='stream';

-- Create a Materialized View named 'kafka_errors' to capture and store error messages from the Kafka topic
-- The view schema includes columns for topic, partition, offset, raw message, and error
-- The view uses the MergeTree engine for efficient storage and querying, ordered by topic, partition, and offset
-- The view selects messages from 'eurl_kafka' where there is an error, filtering on the length of the error string
CREATE MATERIALIZED VIEW kafka_errors
(
    `topic` String,
    `partition` Int64,
    `offset` Int64,
    `raw` String,
    `error` String
)
ENGINE = MergeTree
ORDER BY (topic, partition, offset)
SETTINGS index_granularity = 8192 AS
SELECT
    _topic AS topic,
    _partition AS partition,
    _offset AS offset,
    _raw_message AS raw,
    _error AS error
FROM eurl_kafka
WHERE length(_error) > 0;

-- Create a table named 'click_analytics' to store processed click analytics data
-- The table schema includes columns for code, browser, os, device, country, region, and city
-- The LowCardinality type is used for certain columns to optimize storage
-- The table uses the MergeTree engine for efficient storage and querying, ordered by code, browser, os, device, and country
CREATE TABLE click_analytics (
    `code` String,
    `browser` LowCardinality(String),
    `os` LowCardinality(String),
    `device` LowCardinality(String),
    `country` LowCardinality(String),
    `region` String,
    `city` String
)
ENGINE = MergeTree()
ORDER BY (code, browser, os, device, country);

-- Create a Materialized View named 'click_analytics_consumer' to transfer data from the Kafka table to the ClickHouse table
-- The view selects all columns from 'eurl_kafka' and inserts them into the 'click_analytics' table
CREATE MATERIALIZED VIEW click_analytics_consumer TO click_analytics AS
SELECT * FROM eurl_kafka;
