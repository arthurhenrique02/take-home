from unittest.mock import patch

from fastapi.testclient import TestClient
from main.app import app
from models.tree import DecisionTree

client = TestClient(app)


@patch.object(DecisionTree, "retrieve", return_value=None)
def test_retrieve_tree_not_found(mock_retrieve):
    response = client.get("/decision_tree/retrieve")
    assert response.status_code == 404
    assert response.json() == {"error": "Tree not found"}


def test_create_or_update_tree():
    data = {
        "label": "root",
        "type": "conditional",
        "left": {"label": "left", "type": "end"},
        "right": {"label": "right", "type": "end"},
    }

    response = client.post("/decision_tree/create_or_update", json=data)
    assert response.status_code == 200
    assert response.json() == data


@patch.object(DecisionTree, "retrieve", return_value=None)
def test_execute_tree_not_found(mock_retrieve):
    response = client.post("/decision_tree/execute", json=[])
    assert response.status_code == 404
    assert response.json() == {"error": "Decision tree not found!"}


def test_execute_tree():
    data = {
        "label": "value > 10",
        "type": "conditional",
        "left": {"label": "left", "type": "end"},
        "right": {"label": "right", "type": "end"},
    }
    client.post("/decision_tree/create_or_update", json=data)

    response = client.post(
        "/decision_tree/execute", json=[{"name": "value", "value": "15"}]
    )
    assert response.status_code == 200
    assert response.json() == {"decision": "right"}

    response = client.post(
        "/decision_tree/execute", json=[{"name": "value", "value": "5"}]
    )
    assert response.status_code == 200
    assert response.json() == {"decision": "left"}


def test_invalid_condition():
    data = {
        "label": "value ? 10",
        "type": "conditional",
        "left": {"label": "left", "type": "end"},
        "right": {"label": "right", "type": "end"},
    }
    client.post("/decision_tree/create_or_update", json=data)

    response = client.post(
        "/decision_tree/execute", json=[{"name": "value", "value": "15"}]
    )
    assert response.status_code == 400
    assert response.json() == {"error": "Invalid condition"}
