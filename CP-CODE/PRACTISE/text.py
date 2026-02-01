import heapq
import matplotlib.pyplot as plt
import numpy as np

# Warehouse grid: 0 = free, 1 = obstacle
warehouse = np.zeros((10, 15), dtype=int)
warehouse[3:7, 5] = 1   # vertical shelf
warehouse[6, 8:13] = 1  # horizontal shelf

start = (0, 0)
goal = (9, 14)

def heuristic(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])  # Manhattan distance

def astar(grid, start, goal):
    rows, cols = grid.shape
    open_set = []
    heapq.heappush(open_set, (0+heuristic(start,goal), 0, start, [start]))
    visited = set()

    while open_set:
        f, g, node, path = heapq.heappop(open_set)
        if node in visited:
            continue
        visited.add(node)

        if node == goal:
            return path

        r, c = node
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr,nc] == 0:
                heapq.heappush(open_set, (g+1+heuristic((nr,nc),goal), g+1, (nr,nc), path+[(nr,nc)]))
    return None

path = astar(warehouse, start, goal)

# Visualization
fig, ax = plt.subplots()
ax.imshow(warehouse, cmap="gray_r")

# Plot path
if path:
    for r,c in path:
        ax.plot(c, r, "go", markersize=4)
ax.plot(start[1], start[0], "bo", markersize=10, label="Start")
ax.plot(goal[1], goal[0], "ro", markersize=10, label="Goal")
ax.legend()
plt.show()
