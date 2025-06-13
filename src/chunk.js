class Chunk
{
  constructor(x, y, size, type)
  {
    this.x = x;
    this.y = y;
    
    this.size = size;
    this.type = type;
    
    if (this.type == 'sand')
      this.cost = 1;
    else if (this.type == 'mud')
      this.cost = 5;
    else if (this.type == 'water')
      this.cost = 10;
    else if (this.type == 'mountain')
      this.cost = Infinity;
  }
  
  show()
  {
    if (this.type == 'sand')
      fill(255, 255, 181);
    else if (this.type == 'mud')
      fill(156,89,58);
    else if (this.type == 'water')
      fill(162,225,219);
    else if (this.type == 'mountain')
      fill(105, 105, 105);
    
    noStroke();
        
    let X = this.x * this.size;
    let Y = this.y * this.size;
        
    square(X, Y, this.size);
  }
}
