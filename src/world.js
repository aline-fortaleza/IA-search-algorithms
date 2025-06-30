class World
{
  constructor(rows, cols, chunkSize)
  {
    this.rows = rows;
    this.cols = cols;
    this.chunkSize = chunkSize;

    this.world = this.generateWorld();
    this.agent = this.generateAgent();
    this.target = this.generateTarget();

    this.searchType = null;
    this.start = this.world[this.agent.y][this.agent.x];
    this.goal = this.world[this.target.y][this.target.x];

    this.frontier = [];
    this.frontier.push(this.start);
    
    this.reached = new Set();
    this.reached.add(this.start);

    this.cameFrom = new Map();
    this.cameFrom.set(this.start, null);

    this.costSoFar = new Map();
    this.costSoFar.set(this.start, 0);

    this.goalFound = false;
    this.path = [];
    
    this.updated = false;
    this.lastUpdated = 0;
    this.current = this.start;

    this.score = 0;
    this.font = loadFont('../res/font/Game_Paused_DEMO.otf');
  }

  generateWorld()
  {
    let world = new Array(this.rows);

    for (let y = 0; y < this.rows; y++)
    {
      world[y] = new Array(this.cols);

      for (let x = 0; x < this.cols; x++)
      {
        let type = this.randomTerrain(x, y);
        world[y][x] = new Chunk(x, y, this.chunkSize, type);
      }
    }

    return world;
  }

  generateAgent()
  {
    let x = floor(random(0, this.cols));
    let y = floor(random(0, this.rows));

    while (this.world[y][x].type == 'mountain') // garante que o agente não comece em uma montanha
    {
      x = floor(random(0, this.cols));
      y = floor(random(0, this.rows));
    }

    return new Agent(x, y, this.chunkSize);
  }

  generateTarget()
  {
    let x = floor(random(0, this.cols));
    let y = floor(random(0, this.rows));

    while (this.world[y][x].type == 'mountain')
    {
      x = floor(random(0, this.cols));
      y = floor(random(0, this.rows));
    }

    return new Target(x, y, this.chunkSize);
  }

  randomTerrain(x, y)
  {
    let zoomX = map(this.cols, 1, width, 1, 200); // ajusta o zoom para o tamanho do mundo
    let zoomY = map(this.rows, 1, height, 1, 200);

    let noiseX = x / zoomX;
    let noiseY = y / zoomY;
    let noiseVal = noise(noiseX, noiseY); // usar para criar padrões de terreno

    if (noiseVal < 0.4)
      return 'water';
    else if (noiseVal < 0.5)
      return 'mud';
    else if (noiseVal < 0.6)
      return 'sand';
    else
      return 'mountain';
  }

  neighbors(chunk)
  {
    let neighbors = [];

    let x = chunk.x;
    let y = chunk.y;

    //Checa os vizinhos de cima e de baixo, esquerda e direita. Além disso, verifica se não é montanha
    if (x < this.cols - 1 && this.world[y][x + 1].cost != Infinity)
      neighbors.push(this.world[y][x + 1]);
    if (y < this.rows - 1 && this.world[y + 1][x].cost != Infinity)
      neighbors.push(this.world[y + 1][x]);

    if (x > 0 && this.world[y][x - 1].cost != Infinity)
      neighbors.push(this.world[y][x - 1]);
    if (y > 0 && this.world[y - 1][x].cost != Infinity)
      neighbors.push(this.world[y - 1][x]);

    return neighbors
  }

  setPath()
  {
    this.path = [];
    let current = this.goal;

    while (current != this.start)
    {
      this.path.push(current);
      current = this.cameFrom.get(current);
    }

    this.path.push(this.start);
    this.path.reverse();
  }

  bfs()
  {
    if (!this.goalFound && this.frontier.length > 0)
    {
      let current = this.frontier.shift();

      if (current == this.goal)
      {
        this.goalFound = true;
        this.setPath();
      }

      for (let next of this.neighbors(current))
      {
        if (!this.reached.has(next))
        {
          this.frontier.push(next);
          this.reached.add(next);
          this.cameFrom.set(next, current);
        }
      }
    }
  }

  dfs()
  {
    if (!this.goalFound && this.frontier.length > 0)
    {
      let current = this.frontier.pop();

      if (current == this.goal)
      {
        this.goalFound = true;
        this.setPath();
      }

      for (let next of this.neighbors(current))
      {
        if (!this.reached.has(next))
        {
          this.frontier.push(next);
          this.reached.add(next);
          this.cameFrom.set(next, current);
        }
      }
    }
  }

  heuristic(a, b)
  {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  greedy(){
    if (!this.goalFound && this.frontier.length > 0)
    {
      let current = this.frontier.shift();

      if (current == this.goal)
      {
        this.goalFound = true;
        this.setPath();
      }

      for (let next of this.neighbors(current))
      {
        if (!this.reached.has(next))
        {
          let heuristic = this.heuristic(next, this.goal);
          next.cost = heuristic; // custo é a heurística

          this.frontier.push(next);
          this.reached.add(next);
          this.cameFrom.set(next, current);
        }
      }

      // Ordena a fronteira pela heurística
      this.frontier.sort((a, b) => a.cost - b.cost);
    }
  }

  ucs() {
    if (!this.goalFound && this.frontier.length > 0) {
      // Simular a priority queue (menor custo primeiro)
      this.frontier.sort((a, b) => this.costSoFar.get(a) - this.costSoFar.get(b));
      let current = this.frontier.shift();
  
      if (current === this.goal) {
        this.goalFound = true;
        this.setPath();
        return;
      }
  
      for (let next of this.neighbors(current)) {
        let newCost = this.costSoFar.get(current) + next.cost;
        
        if (!this.costSoFar.has(next) || newCost < this.costSoFar.get(next)) {
          this.costSoFar.set(next, newCost);
          this.cameFrom.set(next, current);
          
          if (!this.reached.has(next)) {
            this.frontier.push(next);
            this.reached.add(next);
          }
        }
      }
    }
  }

  astar() {
    if (!this.goalFound && this.frontier.length > 0) {
        this.frontier.sort((a, b) => {
        const fA = this.costSoFar.get(a) + this.heuristic(a, this.goal);
        const fB = this.costSoFar.get(b) + this.heuristic(b, this.goal);
        return fA - fB;
      });

      let current = this.frontier.shift();

      if (current == this.goal) {
        this.goalFound = true;
        this.setPath();
      }

      for (let next of this.neighbors(current)) {
        let newCost = this.costSoFar.get(current) + next.cost;
        if (!this.costSoFar.has(next) || newCost < this.costSoFar.get(next)) {
          this.costSoFar.set(next, newCost);
          this.frontier.push(next);
          this.cameFrom.set(next, current);
        }
      }
    }
  }
  


  search()
  {
    if (this.searchType == 'bfs')
      this.bfs();
    else if (this.searchType == 'dfs')
      this.dfs();
    else if (this.searchType == 'ucs')
      this.ucs();
    else if (this.searchType == 'greedy')
      this.greedy();
    else if (this.searchType == 'astar')
      this.astar();
  }

  setSearch(key)
  {
    if (key == 'b')
      this.searchType = 'bfs';
    else if (key == 'd')
      this.searchType = 'dfs';
    else if (key == 'u')
      this.searchType = 'ucs';
    else if (key == 'g')
      this.searchType = 'greedy';
    else if (key == 'a')
      this.searchType = 'astar';

    this.reset();
  }

  showFrontier()
  {
    for (let chunk of this.frontier)
    {
      fill(255, 100);
      noStroke();

      let X = chunk.x * this.chunkSize;
      let Y = chunk.y * this.chunkSize;

      square(X, Y, this.chunkSize);
    }
  }
  
  showReached()
  {
    for (let chunk of this.reached)
    {
      fill(0, 100);
      noStroke();

      let X = chunk.x * this.chunkSize;
      let Y = chunk.y * this.chunkSize;

      square(X, Y, this.chunkSize);
    }
  }

  showPath()
  {
    for (let chunk of this.path)
    {
      fill(0, 0, 255);
      noStroke();

      let X = chunk.x * this.chunkSize;
      let Y = chunk.y * this.chunkSize;

      square(X, Y, this.chunkSize);
    }
  }

  seekTarget()
  {
    if (this.path.length != 0)
    {
      const delay = 20;

      if (!this.updated)
      {
        this.current = this.path.shift();

        this.agent.update(this.current.x,this.current.y);
        this.updated = true;

        this.lastUpdated = millis();
      }
      else if (millis() - this.lastUpdated > delay * this.current.cost)
      {
          this.updated = false;
      }
    }
  }

  targetReached()
  {
    return this.agent.x == this.target.x && this.agent.y == this.target.y;
  }
  
  manageScore()
  {
    if (this.targetReached())
    {
      this.score += 1;
      this.target = this.generateTarget();
      this.reset();
    }

    textSize(32);
    textFont(this.font);

    fill('black');
    text(`SCORE: ${this.score}`, 5, 30);
  }

  showOptions()
  {
    textSize(32);
    textFont(this.font);

    fill('black');
    text('BFS: B', 5, height - 5);

    text('DFS: D', 5, height - 35);
    text('UCS: U', 5, height - 65);

    text('GREEDY: G', 5, height - 95);
    text('A-STAR: A', 5, height - 125);
    
    text('RESET: R', 5, height - 155);
  }

  show()
  {
    for (let y = 0; y < this.rows; y++)
    {
      for (let x = 0; x < this.cols; x++)
      {
        this.world[y][x].show();
      }
    }
  }

  run()
  {
    this.search();
    this.show();

    this.showFrontier();
    this.showReached();
    this.showPath();

    this.agent.show();
    this.target.show();

    this.seekTarget();
    this.manageScore();
    this.showOptions();
  }

  reset()
  {
    this.start = this.world[this.agent.y][this.agent.x];
    this.goal = this.world[this.target.y][this.target.x];

    this.frontier = [];
    this.frontier.push(this.start);

    this.reached = new Set();
    this.reached.add(this.start);

    this.cameFrom = new Map();
    this.cameFrom.set(this.start, null);

    this.costSoFar = new Map();
    this.costSoFar.set(this.start, 0);

    this.goalFound = false;
    this.path = [];

    this.updated = false;
    this.current = this.start;
  }
}
