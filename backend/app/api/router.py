from fastapi import APIRouter

from app.api.routes import health, overview, platform

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(overview.router)
api_router.include_router(platform.router)
