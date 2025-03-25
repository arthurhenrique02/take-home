from fastapi import APIRouter
from models.tree import DecisionTree

blueprint_name = "decision_tree"

router = APIRouter(
    prefix=f"/{blueprint_name}",
    tags=[blueprint_name],
    responses={404: {"description": "Not found"}},
)


@router.get("/retrieve")
def retrieve_tree():
    tree = DecisionTree.retrieve()
    return tree.tree


@router.post("/create_or_update")
def create_or_update_tree(data: dict):
    tree = DecisionTree.retrieve()
    if tree:
        tree.tree = data
    else:
        tree = DecisionTree(tree=data)
    tree.save()
    return tree.tree


@router.post("/decision")
def decision(data: dict):
    tree = DecisionTree.retrieve()

    if not tree:
        return {"error": "Decision tree not found!"}, 404

    current_node = tree.tree

    print(current_node)
