# 本地开发说明

## 依赖

- Python 3.12
- Node.js 22+
- npm 11+
- Docker Desktop 或兼容的 Docker Compose（本机当前未检测到 Docker 命令）

## 后端

```powershell
cd D:\TEACHER
python -m pip install -e "backend[dev]"
npm run dev:backend
```

健康检查：

```text
http://localhost:8000/health
http://localhost:8000/api/v1/health
```

## 前端

```powershell
cd D:\TEACHER
npm --prefix frontend install
npm run dev:frontend
```

默认访问：

```text
http://localhost:5173
```

## 基础服务

```powershell
cd D:\TEACHER\infra
docker compose up -d
```

服务端口：

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `localhost:9000`
- MinIO Console: `localhost:9001`

## 检查命令

```powershell
npm run lint:frontend
npm run typecheck:frontend
npm run lint:backend
npm run test:backend
```