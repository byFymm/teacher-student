from collections.abc import AsyncIterator
from typing import Any
from uuid import uuid4

from app.integrations.bisheng.base import WorkflowRun


class FakeBishengAdapter:
    async def start_workflow(self, workflow_key: str, payload: dict[str, Any]) -> WorkflowRun:
        return WorkflowRun(
            run_id=f"fake-{uuid4().hex}",
            status="succeeded",
            output={"workflow_key": workflow_key, "echo": payload},
        )

    async def get_run_status(self, run_id: str) -> WorkflowRun:
        return WorkflowRun(
            run_id=run_id,
            status="succeeded",
            output={"adapter": "fake"},
        )

    async def stream_chat(
        self,
        workflow_key: str,
        payload: dict[str, Any],
    ) -> AsyncIterator[str]:
        question = payload.get("question", "")
        yield f"[{workflow_key}] 已收到问题：{question}"
        yield "这是 FakeBishengAdapter 的本地模拟回答。"

    async def handle_callback(self, callback_payload: dict[str, Any]) -> WorkflowRun:
        run_id = str(callback_payload.get("run_id", f"fake-{uuid4().hex}"))
        status = str(callback_payload.get("status", "succeeded"))
        return WorkflowRun(run_id=run_id, status=status, output=callback_payload)