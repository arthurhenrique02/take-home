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
    tree = DecisionTree.query.first()
    return tree.tree


@router.post("/create_or_update")
def create_or_update_tree(tree: dict):
    tree = DecisionTree.query.first()
    if tree:
        tree.tree = tree
    else:
        tree = DecisionTree(tree=tree)
    tree.save()
    return tree.tree


@router.post("/decision")
def decision(data: dict):
    tree = DecisionTree.query.first()

    if not tree:
        return {"error": "Decision tree not found!"}, 404

    current_node = tree.tree

    print(current_node)
