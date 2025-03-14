import json
import redis
from app.config import REDIS_HOST, REDIS_PORT, REDIS_DB, CACHE_EXPIRY

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

def get_cached_jobs(query, location, experience_level):
    cache_key = f"jobs:{query}:{location}:{experience_level}"
    cached_data = redis_client.get(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    return None

def cache_jobs(query, location, experience_level, jobs_data):
    cache_key = f"jobs:{query}:{location}:{experience_level}"
    redis_client.setex(
        cache_key,
        CACHE_EXPIRY,
        json.dumps(jobs_data)
    )