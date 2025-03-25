from fastapi import FastAPI

from .config import configure_cors, configure_routes


def create_app() -> FastAPI:
    app = FastAPI()
    configure_cors(app)
    configure_routes(app)
    return app


if __name__ == "__main__":
    app = create_app()
