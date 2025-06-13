class Target 
{
  constructor(x, y, size) 
  {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  show() 
  {
    fill(255, 0, 0);
    noStroke();
    
    let X = this.x * this.size;
    let Y = this.y * this.size;
    
    square(X, Y, this.size);
  }
}
