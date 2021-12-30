const isVisited = (visitado, x, y) => {
    for(let i = 0; i < visitado.length; i++) {
        const [cx, cy] = visitado[i]
        
        if(cx === x && cy === y){
            return true
        }
            
    }
    return false
}

let queue = []
let visited = []
let path = []

const load = (start_x, start_y) => {
    queue = []
    visited = []
    path = []

    queue.push([start_x, start_y])
}

const breadth_step = (grid, finish_x, finish_y) => {
    const x_v = [0, 0, -1, 1]
    const y_v = [-1, 1, 0, 0]
    
    if(queue.length > 0) {
        const [current_x, current_y] = queue.shift()
        if(current_x === finish_x && current_y === finish_y) return [true, [current_x, current_y], visited, path]
        
        visited.push([current_x, current_y])
        
        for(let i = 0; i < 4; i++) {
            const new_x = current_x + x_v[i]
            const new_y = current_y + y_v[i]

            if(new_x < 0 || new_x >= grid[current_y].length) continue
            if(new_y < 0 || new_y >= grid.length) continue
            if(grid[new_y][new_x] === '#') continue
            if(isVisited(visited, new_x, new_y)) continue

            queue.push([new_x, new_y])

            let achou = false
            for(let j = 0; j < path.length; j++) {
                const [a, b, c, d] = path[j]
                if(a === current_x && b === current_y) {
                    path[j][2] = new_x
                    path[j][3] = new_y
                    achou = true
                }
            }
            if(!achou)
                path.push([current_x, current_y, new_x, new_y])
        }
        return [false, [current_x, current_y], visited, path]
    }
    return []
}

export { load, breadth_step, isVisited }