function getIndex(parentNode: Node, targetNode: Node) {
    const { childNodes } = parentNode

    for (const k in childNodes) {
        if (childNodes[k] === targetNode) {
            return Number(k);
        }
    }

    return null;
}

export function buildPathToWrapper(startNode: Node, wrapperNode: Node) {
    const path = [];
    let currentNode = startNode;

    while (currentNode !== wrapperNode) {
        const parentNode = currentNode.parentNode;

        if (!parentNode) {
            return null;
        }

        const index = getIndex(parentNode, currentNode);

        if (index === null) {
            return null;
        }

        path.push(index);
        currentNode = parentNode;
    }

    return path.reverse();
}

export function findNodeFromPath(path: number[], wrapperNode: Node) {
    let currentNode = wrapperNode;

    for (const index of path) {
        const nextNode = currentNode.childNodes[index];

        if (!currentNode.childNodes[index]) {
            return null;
        }

        currentNode = nextNode;
    }

    return currentNode;
}