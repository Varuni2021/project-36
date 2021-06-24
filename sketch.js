var dogImage, happyDog;
var database;
var foodS, foodStock;
var feedDog, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("feed dog");
  feed.position(580,160);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(650,160);
  addFood.mousePressed(addFoods);



  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  food = new Food(200,200,10,10);
}


function draw() {  
  background(46,139,87);

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDog);

  // }

  drawSprites();

  fill("white");
  text("foodStock: " + foodS ,200,200);

  fill("white");
  text("Press the up arrow key to feed the dog", 150, 50);


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: "+ lastFed%12, "PM", 100,120);
  }else if(lastFed == 0){
    text("Last Fed: 12 AM", 100,120);
  }else{
    text("Last Fed: " + lastFed + "AM", 100,125);
  }

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  food.display();
  


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  
database.ref('/').update({
  Food:x

})
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}



