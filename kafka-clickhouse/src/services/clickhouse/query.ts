import client from './connection.js';

const acceptedAspects = ['browser', 'os', 'device', 'country', 'region', 'city'];

const getAnalyticsByAspect = async (
  code: string,
  aspect: string,
  startDate?: Date,
  endDate?: Date,
): Promise<object[]> => {
  let query = `SELECT 
                    ${aspect},
                    formatReadableQuantity(count()) AS record_count
                FROM eurl_data.click_analytics
                WHERE code = '${code}'`;
  if (startDate && endDate) {
    query += ` AND timestamp >= '${startDate.toISOString()}' AND timestamp <= '${endDate.toISOString()}'`;
  }
  query += ` GROUP BY ${aspect}`;

  const resultSet = await client.query({
    query: query,
    format: 'JSONEachRow',
  });

  return await resultSet.json();
};

const getTotalRequests = async (
  code: string,
  startDate?: Date,
  endDate?: Date,
): Promise<object[]> => {
  let query = `SELECT 
                      formatReadableQuantity(count()) AS record_count
                  FROM eurl_data.click_analytics
                  WHERE code = '${code}'`;
  if (startDate && endDate) {
    query += ` AND timestamp >= '${startDate.toISOString()}' AND timestamp <= '${endDate.toISOString()}'`;
  }

  const resultSet = await client.query({
    query: query,
    format: 'JSONEachRow',
  });

  return await resultSet.json();
};

const getWeeklyTrend = async (
  code: string,
  startDate?: Date,
  endDate?: Date,
): Promise<object[]> => {
  let query = `SELECT 
                        toStartOfWeek(timestamp) AS week_start,
                        formatReadableQuantity(count()) AS record_count
                    FROM eurl_data.click_analytics
                    WHERE code = '${code}'`;
  if (startDate && endDate) {
    query += ` AND timestamp >= '${startDate.toISOString()}' AND timestamp <= '${endDate.toISOString()}'`;
  }
  query += ` GROUP BY week_start
               ORDER BY week_start`;

  const resultSet = await client.query({
    query: query,
    format: 'JSONEachRow',
  });

  return await resultSet.json();
};

export { getAnalyticsByAspect, getTotalRequests, getWeeklyTrend, acceptedAspects };
