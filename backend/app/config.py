import os
import redis

REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD", None)

CACHE_EXPIRY = 86400  

CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
SCRAPE_DELAY = 2  

USE_SSL = REDIS_HOST.endswith("upstash.io")

try:
    redis_client = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        ssl=USE_SSL  
    )
    redis_client.ping() 
    print("Connected to Upstash Redis")
except redis.ConnectionError:
    print("Redis connection failed. Running without cache.")
    redis_client = None 
