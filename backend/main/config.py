from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.tree import router as tree_router


def configure_cors(application: FastAPI) -> None:
    origins = ["http://localhost:5173"]
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=origins,
        allow_headers=origins,
    )


def configure_routes(application: FastAPI) -> None:
    application.include_router(tree_router)
