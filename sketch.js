//Create variables here
var dog;
var happydog;
var database;
var foods;
var foodStock;
var foodObj;
var dogImg,doghappy;
var Fedtime,lastFed,feed,addFood;

function preload()
{
	//load images here
  dogImg=loadImage("images/dog1.png");
 doghappy=loadImage("images/dog2.png");

}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);

   foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  Fedtime=database.ref('Feedtime');
  Fedtime.on("value",function(data){
    lastFed=data.val();

  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12AM",350,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30)
  }

  
  

  drawSprites();
  
  
  

}
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);

}
function feedDog(){
  dog.addImage(doghappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food: foods
  })
}




