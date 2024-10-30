# ref: https://yandex.cloud/en/docs/tutorials/dataplatform/fetch-data-from-rabbitmq?utm_referrer=https%3A%2F%2Fwww.google.com%2F&utm_referrer=about%3Ablank

rabbitmqctl set_permissions -p / <username> ".*" ".*" ".*"
rabbitmqctl set_topic_permissions -p / <username> amq.topic "eurl_click_analytics" "eurl_click_analytics"
