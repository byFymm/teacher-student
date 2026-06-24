# 教育智能体平台

`D:\TEACHER` 是教育智能体平台的单仓库工程。第一期采用 FastAPI 后端、React/Vite 前端、Docker Compose 基础设施，并通过适配层对接毕昇工作流平台。

## 目录

```text
backend/   FastAPI API、业务服务、数据库迁移、毕昇适配层
frontend/  React + TypeScript 前端工作台
infra/     PostgreSQL、Redis、MinIO 本地 Compose
scripts/   Windows 本地开发脚本
docs/      设计、计划和开发文档
```

## 快速开始

1. 复制 `.env.example` 为 `.env`，按需调整本地配置。
2. 安装后端依赖：`python -m venv .venv`，然后 `.\.venv\Scripts\python.exe -m pip install -e "backend[dev]"`。
3. 安装前端依赖：`npm --prefix frontend install`。
4. 启动后端：`npm run dev:backend`。
5. 启动前端：`npm run dev:frontend`。

本地基础服务使用 `infra/docker-compose.yml`。如果已安装 Docker，可在 `infra` 目录运行 `docker compose up -d`。