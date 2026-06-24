from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Teacher Agent Platform"
    api_prefix: str = "/api/v1"
    environment: str = "local"
    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])

    database_url: str = "postgresql+asyncpg://teacher:teacher@localhost:5432/teacher"
    redis_url: str = "redis://localhost:6379/0"

    minio_endpoint: str = "localhost:9000"
    minio_access_key: str = "teacher"
    minio_secret_key: str = "teacher-secret"

    bisheng_adapter: str = "fake"
    bisheng_base_url: str | None = None
    bisheng_api_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="TEACHER_",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()