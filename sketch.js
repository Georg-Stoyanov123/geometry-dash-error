//Keeps the engine, world, bodies and body variables as constants which means that they can't be changed later in the program
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//Gives 2 variables (var): backgroundImg and backgroundSprite to be used and defined, later in the program
var backgroundImg, backgroundSprite;


//Gives 2 more variables (var): characterImg and characterSprite later to be used and defined in the program
var characterImg, characterSprite;

//Gives another 2 variables (var): spikeImg, later to be used and defined in the program
var spikeImg;


//Gives 2 more variables (including the one under) called backgroundSound and the ground, later used to be defined in the program

var backgroundSound;
var spike1, spike2, spike3, spike4;
var ground;
var barrier;
var blockImg, blockSprite1;
var blockSprite2;
var blockSprite3;
var blockSprite4;
var blockSprite5;
var a;

var block1, block2;


var body1, body2, body3;

//Function preload is used to load the images and sounds in this case but can also load JSON and animations (spritesheets) and much more but just images and sounds in this case
function preload() {
  backgroundImg = loadImage("Images/background.png")
  characterImg = loadImage("Images/gdcharacter.png")
  spikeImg = loadImage("Images/spike.png")
  backgroundSound = loadSound("Sounds/bgsound.mp3")
  blockImg = loadImage("Images/blockimg.JPG")
}
//Function set up used to set things up just like the canvas, engine, world, sprites and adding the sprites to the world. Also to log some stuff ones but not repetitive unlike in the function draw

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  characterSprite = Bodies.rectangle(10, height - 50, 70, 70, {restitution: 0.02});
  ground = Bodies.rectangle(0, height - 20, width*5, 10, {isStatic: true})
  World.add(engine.world, characterSprite)
  World.add(engine.world, ground);
  console.log("Window width: " + windowWidth + " Window height: " + windowHeight)
  backgroundSound.setVolume(0.5)
  backgroundSound.play()
  barrier = Matter.Bodies.rectangle(0, height - 100, width * 2, 10)
  spike2 = Bodies.rectangle(500, 710, 30, 30, {isStatic: true})
  spike3 = Bodies.rectangle(540, 710, 30, 30, {isStatic: true})
  spike4 = Bodies.rectangle(580, 710, 30, 30, {isStatic: true})
  blockSprite1 = Bodies.rectangle(650, 600, 30, 30)
  blockSprite2 = Bodies.rectangle(750, 500, 30, 30)
  block1 = Bodies.rectangle(height - 400, height - 100, 30, 30, {isStatic: true})
  block2 = Bodies.rectangle(750, height - 230, 30, 30, {isStatic: true})
  body1 = Bodies.rectangle(500, height - 50, 30, 30, {isStatic: true})
  body2 = Bodies.rectangle(540, height - 50, 30, 30, {isStatic: true})
  body3 = Bodies.rectangle(580, height - 50, 30, 30, {isStatic: true})
  World.add(engine.world, spike2)
  World.add(engine.world, spike3)
  World.add(engine.world, spike4)
  World.add(engine.world, blockSprite1)
  World.add(engine.world, blockSprite2)
  World.add(engine.world, block1)
  World.add(engine.world, block2)
  World.add(engine.world, body1)
  World.add(engine.world, body2)
  World.add(engine.world, body3)
  engine.world.gravity.x = 1.2
  if (characterSprite.x < height) {
    engine.world.gravity.y = 10
  }else{
    engine.world.gravity.y = 2
  }
}
/*Creates a function draw which makes the background 51 (a number that represents a colour) and constantly updates the engine, since it is in the function draw
Creates a rectangle in the position of the body and adds an image to represent it*/
function draw() 
{ 
  if(collide(characterSprite, spike1)) {
    characterSprite.position.x = 100
  }
  if(collide(characterSprite, spike2)) {
    characterSprite.position.x = 100
  }
  if(collide(characterSprite, spike3)) {
    characterSprite.position.x = 100
  }
  if(collide(characterSprite, body1)) {
    characterSprite.position.x = 100
  }
  if(collide(characterSprite, body2)) {
    characterSprite.position.x = 100
  }
  if(collide(characterSprite, body3)) {
    characterSprite.position.x = 100
  }
  //Decreases the gravity x by 0.005, repetitively because it automatically speeds up so this is used to slow it down, since it is in the function draw
  engine.world.gravity.x -= 0.00005
  //Calls the jump function, defined at the very bottom if the keycode 32 aka space is pressed
  if (keyCode === 32 && characterSprite.position.y >= ground.position.y - 110) {
    jump()
  }
  if (keyCode === 39 && characterSprite.position.y >= ground.position.y - 110) {
    start()
  }
  if (keyCode === 37 && characterSprite.position.y >= ground.position.y - 110) {
    revstart()
  }
  /*if (Matter.SAT.collides(characterSprite, spike1)) {
    reset()
  }*/
  background(backgroundImg);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width, 10)
  image(characterImg, characterSprite.position.x, characterSprite.position.y, 100, 50)
  image(spikeImg, 500, height - 50, 30, 30)
  image(spikeImg, 540, height - 50, 30, 30)
  image(spikeImg, 580, height - 50, 30, 30)
  image(blockImg, height - 400, height - 100, 30, 30)
  image(blockImg, 750, height - 230, 30, 30)
}

//Creates a function called jump which defines the amount of force you want to apply when the space key is pressed (keycode 32)
function jump() {

  //Applies the force on the character sprite. The first curly braces define the x and y offset then the second curly braces define the x force and y force which can be defined by numbers.
  Matter.Body.applyForce(characterSprite, {x:-10, y:0}, {x:0.005, y:0.0001})
}
function start() {
  Matter.Body.applyForce(characterSprite, {x:-10, y:0}, {x:0.009, y:-0.1});
}
function revstart() {
  Matter.Body.applyForce(characterSprite, {x:10, y:0}, {x:-0.012, y:-0.1});
}
function reset() {
  characterSprite.position.x = 100
  characterSprite.position.y = height - 100
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d=0)
            {
              World.remove(engine.world,characterSprite);
               characterSprite = null;
               return true; 
            }
            else{
              return false;
            }
         }
}