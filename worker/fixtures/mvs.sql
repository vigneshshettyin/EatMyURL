-- Create a materialized view for total visits per code
CREATE MATERIALIZED VIEW public.total_visits_per_code AS
SELECT
    code,
    COUNT(*) AS total_visits
FROM
    public."ClickAnalytics"
GROUP BY
    code;

-- Optional: Create an index on the materialized view for faster lookups
CREATE INDEX idx_total_visits_per_code ON public.total_visits_per_code (code);


CREATE OR REPLACE FUNCTION refresh_total_visits_per_code()
RETURNS TRIGGER AS $$
BEGIN
    -- Refresh the materialized view
    PERFORM pg_notify('refresh_total_visits', 'Refreshing total visits view');
    REFRESH MATERIALIZED VIEW public.total_visits_per_code;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER refresh_view_on_clickanalytics_update
AFTER INSERT OR UPDATE OR DELETE ON public."ClickAnalytics"
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_total_visits_per_code();
