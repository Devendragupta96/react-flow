from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'status': 'parsed'}

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    nodes_len = len(nodes)
    edges_len = len(edges)

    adjacency_list = {node.id: [] for node in nodes}
    for edge in edges:
        adjacency_list[edge.source].append(edge.target)

    is_dag = check_if_dag(adjacency_list)

    return {
        "num_nodes": nodes_len,
        "num_edges": edges_len,
        "is_dag": is_dag
    }

def check_if_dag(adjacency_list: Dict[str, List[str]]) -> bool:
    visited = set()
    rec_stack = set()

    def dfs(node: str) -> bool:
        if node in rec_stack:  
            return False
        if node in visited:
            return True

        visited.add(node)
        rec_stack.add(node)

        for neighbor in adjacency_list[node]:
            if not dfs(neighbor):
                return False

        rec_stack.remove(node)
        return True

    for node in adjacency_list:
        if node not in visited:
            if not dfs(node):
                return False

    return True