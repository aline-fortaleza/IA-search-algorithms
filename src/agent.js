class Agent 
{
  constructor(x, y, size) // Construtor to initialize the agent's position and size
  {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  update(x, y) // Method to update the agent's position
  {
    this.x = x
    this.y = y
  }

  show() 
  {
    fill(203, 170, 203);
    noStroke();
    
    let X = this.x * this.size;
    let Y = this.y * this.size;
    
    square(X, Y, this.size);
  }
}
