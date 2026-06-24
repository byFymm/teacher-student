# Backend

FastAPI 后端负责教育业务、多租户权限、资料/题库/学习过程数据，以及毕昇工作流适配层。

## 本地运行

```powershell
python -m pip install -e "backend[dev]"
npm run dev:backend
```

健康检查：

```text
GET http://localhost:8000/health
GET http://localhost:8000/api/v1/health
```