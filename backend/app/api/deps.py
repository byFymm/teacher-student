from fastapi import Request

from app.services.platform_store import PlatformStore


def get_platform_store(request: Request) -> PlatformStore:
    return request.app.state.platform_store
