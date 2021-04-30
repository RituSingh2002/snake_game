function init(){
canvas=document.getElementById('mycanvas');
W=H= canvas.width=canvas.height=1000;
pen=canvas.getContext('2d');
cs=50;
 game_over=false;
 score=5;
 //create an image object for food
 food_img=new Image();
 food_img.src="apple4.jpg";
 trophy =new Image();
 trophy.src="trophy.jpg";
 trophy.fillStyle="text-align: center";
 food=getRandomFood();
snake={
    init_len:5,
    color:"blue",
    cells:[],
    direction:"right",
    createSnake: function(){
        for(var i=this.init_len;i>0;i--){
            this.cells.push({x:i,y:0});
        }

    },
    drawsnake:function(){
        for(var i=0;i<this.cells.length;i++){
            pen.fillStyle=this.color;
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
    },
    //console.log("updating snake accordig to the direction");
    //check if the snake has eaten food, increae the length of the snake
    updateSnake:function(){
        console.log("updating snake");
        var headx=this.cells[0].x;
        var heady=this.cells[0].y;
        if(headx==food.x && heady==food.y){
            console.log("food eaten");
            food=getRandomFood();
            score++;
        }
        else
        {
        this.cells.pop();
        }
        
        var naxtX,nextY;
        if(this.direction=='right'){
            nextX=headx+1;
            nextY=heady;
        }
       if(this.direction=='left'){
           nextX=headx-1;
           nextY=heady;
       }
       if(this.direction=='up'){
           nextX=headx;
           nextY=heady-1;
       }
       if(this.direction=='down'){
           nextX=headx;
           nextY=heady+1;

       }
        
this.cells.unshift({x:nextX,y:nextY});
//write a logic that prevents snake from going out
var last_x=Math.round(W/cs);
var last_y=Math.round(H/cs);
if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
    game_over=true;
}

    }
};
snake.createSnake();
//Add a event listener on a document
document.addEventListener('keydown',call);
function call(e){
console.log("press key");
if(e.key=='ArrowRight'){
    snake.direction="right";
}
else if(e.key=='ArrowLeft'){
    snake.direction="left";
}
else if(e.key=="ArrowDown"){
    snake.direction="down";
}
else{
    snake.direction="up";
}
console.log(snake.direction);

}
    
   
    
}
function draw(){
//console.log("in draw");
//erase the old frame
pen.clearRect(0,0,W,H);

snake.drawsnake();
pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,30,30,cs,cs);
pen.font="30px Roboto"
pen.fillStyle="blue";
pen.fillText(score,50,50);

}
function update(){
//console.log("in update");

snake.updateSnake();






}
function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-cs)/cs);
    var foodY=Math.round(Math.random()*(H-cs)/cs);
    var food ={
        x:foodX,
        y:foodY,
        color:'red',
    }
    return food;

}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
        //alert("Game over");
        var pr=prompt(" Game over : Press Y for Play Again either press anything");
        if(pr=='Y'||pr=='y')
        location.reload();
        else{
            window.close();
        }
    }
    draw();
    update();
}
init();
var f=setInterval(gameloop,100);

//gameloop();



