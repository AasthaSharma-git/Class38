class Game{
   
    constructor(){}


     getState(){

         var gameStateRef=database.ref('gameState');
         gameStateRef.on("value",function(data){
         gameState= data.val();
          
            
         });

    }

     async start(){

        if(gameState===0){

           player=new Player();
       
           var playerCountRef=await database.ref('playerCount').once("value");
           if(playerCountRef.exists()){
              
                 player.getCount();
           
            }
           form=new Form();
           form.display();

        }

        
     }

     play(){

        form.disappear();
        textSize(40);
        text('Game Start!',120,100);
        Player.getPlayerInfo();
        var pos=150;
        if(allPlayers!==undefined){

            for(var i=1;i<=playerCount;i++){
                var playerIndex="player"+i;
                if(i===player.index){
                    fill('red');
                }
                else{
                    fill('black');
                }
                textSize(20);
                text(allPlayers[playerIndex].name+" : "+allPlayers[playerIndex].distance,120,pos);
              
                pos=pos+20;

                }
        }
         if(keyIsDown(UP_ARROW) ){
            player.distance=player.distance+50;
            player.update();
         }

            
    }

    update(state){
        gameState=state;
        database.ref('/').update({
            gameState:state
        });
    }

  



}