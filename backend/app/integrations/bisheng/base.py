from collections.abc import AsyncIterator
from dataclasses import dataclass
from typing import Any, Protocol


@dataclass(frozen=True)
class WorkflowRun:
    run_id: str
    status: str
    output: dict[str, Any] | None = None


class BishengAdapter(Protocol):
    async def start_workflow(self, workflow_key: str, payload: dict[str, Any]) -> WorkflowRun:
        ...

    async def get_run_status(self, run_id: str) -> WorkflowRun:
        ...

    async def stream_chat(
        self,
        workflow_key: str,
        payload: dict[str, Any],
    ) -> AsyncIterator[str]:
        ...

    async def handle_callback(self, callback_payload: dict[str, Any]) -> WorkflowRun:
        ...