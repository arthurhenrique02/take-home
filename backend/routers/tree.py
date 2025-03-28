import typing

from fastapi import APIRouter
from fastapi.responses import JSONResponse
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

    if not tree:
        return JSONResponse(content={"error": "Tree not found"}, status_code=404)

    return JSONResponse(content=tree.tree, status_code=200)


@router.post("/create_or_update")
def create_or_update_tree(data: dict):
    tree = DecisionTree.retrieve()
    if tree:
        tree.tree = data
    else:
        tree = DecisionTree(tree=data)
    tree.save()
    return JSONResponse(content=tree.tree, status_code=200)


@router.post("/execute")
def execute(data: typing.List[typing.Dict]):
    data_as_dict = {item.get("name"): item.get("value") for item in data}

    tree = DecisionTree.retrieve()

    if not tree:
        return JSONResponse(
            content={"error": "Decision tree not found!"}, status_code=404
        )

    operations = {
        "=": lambda a, b: a == b,
        ">": lambda a, b: a > b,
        "<": lambda a, b: a < b,
        ">=": lambda a, b: a >= b,
        "<=": lambda a, b: a <= b,
    }

    current_node = tree.tree

    while current_node and current_node.get("type") != "end":
        splitted_label = current_node.get("label").split(" ")

        if len(splitted_label) != 3:
            return JSONResponse(
                content={
                    "error": "Conditional must contain a field, a condition and a value"
                },
                status_code=400,
            )

        # get the field, condition and value from the label
        # check if fields/values are numbers and convert them to numbers
        item_to_comp, condition, value = splitted_label

        var_from_dict = data_as_dict.get(item_to_comp, "")
        item_to_comp = (
            float(var_from_dict) if var_from_dict.isdigit() else var_from_dict
        )
        value = float(value) if value.isdigit() else value

        result = operations.get(condition, lambda a, b: None)(item_to_comp, value)

        # if None, the condition was not passed correctly
        if result is None:
            return JSONResponse(content={"error": "Invalid condition"}, status_code=400)

        current_node = current_node.get("right" if result else "left")

    # if not end node found or node label is empty
    if not current_node or current_node.get("label") in ["", None, "end"]:
        return JSONResponse(content={"decision": "Result not defined"}, status_code=200)

    return JSONResponse(
        content={"decision": current_node.get("label")}, status_code=200
    )
