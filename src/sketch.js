let world;

function setup()
{
  width = height = 640;
  createCanvas(width, height);

  let chunkSize = 32; // TO DO: dimuir esse tamanho
  let rows = ceil(height / chunkSize);
  let cols = ceil(width / chunkSize);

  world = new World(rows, cols, chunkSize);
}

function draw()
{
  world.run();
}

function keyPressed()
{
  const searchKeys = ['b', 'd', 'u', 'g', 'a'];
  
  if (searchKeys.includes(key))
  {
    world.setSearch(key);
  }
  
  if (key == 'r')
  {
    world.reset();
    world.searchType = null;
  }
}
