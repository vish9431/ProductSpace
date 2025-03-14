import json
import redis
from app.config import REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, CACHE_EXPIRY, redis_client

def get_cached_jobs(query, location, experience_level):
    if not redis_client:
        return None  
    cache_key = f"jobs:{query}:{location}:{experience_level}"
    
    try:
        cached_data = redis_client.get(cache_key)
        if cached_data:
            return json.loads(cached_data)
    except redis.RedisError as e:
        print(f"Redis get error: {e}")
    
    return None

def cache_jobs(query, location, experience_level, jobs_data):
    if not redis_client:
        return  

    cache_key = f"jobs:{query}:{location}:{experience_level}"
    
    try:
        redis_client.setex(cache_key, CACHE_EXPIRY, json.dumps(jobs_data))
    except redis.RedisError as e:
        print(f"Redis set error: {e}")
