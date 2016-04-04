
var HelloWorldLayer = cc.Layer.extend({
    player1:null,    
    player2:null,    
    ball:null,    
    points1:null,
    points2:null,
    score1:0,
    score2:0,
    MOVX:0,
    MOVY:0,
    speedBall:0,
    
    initializer:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        var white = cc.color(255,255,255);
        this.MOVX = this.random(1,3);
        this.MOVY = this.random(1,3);
        this.speedBall = this.random(0.0001,0.001);
        
        this.player1 = new cc.Sprite(res.player_png);
        this.player1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.player1, 1);

        this.player2 = new cc.Sprite(res.player_png);
        this.player2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.player2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.ball = new cc.Sprite(res.ball_png);
        this.ball.setPosition(size.width / 2, this.random(15, size.height - 80));
        //this.ball.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.ball, 1);

        this.points1 = new cc.LabelTTF("0","Arial",24);
        this.points1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.points1,0);
        
        this.points2 = new cc.LabelTTF("0","Arial",24);
        this.points2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.points2,0);
    },
    
    
    moveControls: function(keyCode, event){
        
        var target = event.getCurrentTarget();
        var size = cc.winSize;
            
        // Botton W
        if(keyCode == cc.KEY.w){
            if(target.player1.getPositionY() + 40 < size.height - 80)
                target.player1.setPosition(target.player1.getPositionX(), target.player1.getPositionY() + 40);
        }
        
        // Botton S
        if(keyCode == cc.KEY.s){
            if(target.player1.getPositionY() - 40 > size.height/2 - size.height/2 + 40)
                target.player1.setPosition(target.player1.getPositionX(), target.player1.getPositionY() - 40);
        }
        
        // Botton Up
        if(keyCode == cc.KEY.up){
            if(target.player2.getPositionY() + 40 < size.height - 80)
                target.player2.setPosition(target.player2.getPositionX(), target.player2.getPositionY() + 40);
        }
        
        // Botton down
        if(keyCode == cc.KEY.down){
            if(target.player2.getPositionY() - 40 > size.height/2 - size.height/2 +40)
                target.player2.setPosition(target.player2.getPositionX(), target.player2.getPositionY() - 40);
        }
    },
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    resetBall:function(){
        var size = cc.winSize;
        this.speedBall = this.random(0.0001,0.001);
        this.ball.setPosition(size.width / 2, this.random(0, size.height - 80));
        this.MOVX = this.random(1,3);
        this.MOVY = this.random(1,3);
        this.points1.setString(this.score1);
        this.points2.setString(this.score2);
    },
    
    // Method to moves the ball
    moveBall: function(){
        
        var position = this.ball.getPosition();
        
        if(position.y <= 20 || position.y >= cc.winSize.height - 40){
            this.MOVY *= -1;
            
        } else if(position.x <= 0 ){
            this.score2++;
            this.resetBall();
        } else if(position.x >= cc.winSize.width){
            this.score1++;
            this.resetBall();
        } else if (cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player1.getBoundingBox())){
            cc.log("collision");
            this.MOVX *= -1;
        }
        
        else if(cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player2.getBoundingBox())){
            cc.log("collision");
            this.MOVX *= -1;       
        }
        
        var newX = this.ball.getPosition().x + this.MOVX;
        var newY = this.ball.getPosition().y + this.MOVY;
        
        this.ball.setPosition(newX, newY);
        /*
        // Adding the Movement
        this.directionX = this.ball.getPositionX() + 2;
        this.directionY = this.ball.getPositionY() + 3;
        
        var size = cc.winSize;
        //(size.height);
        //Borders collisions
        if(this.ball.y > size.height - 40){
            this.directionY = this.directionY*(-1);
        }
        
        if(this.ball.y  < size.height/2 - size.height/2 -40){
            this.directionY = this.directionY*(-1);
        }
        
        if(this.ball.x > 960){
            this.directionX = this.directionX*(-1);
        }
        if(this.ball.x < 0){
            this.directionX = this.directionX*(-1);
        }
        */
        /*if(cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player1.getBoundingBox())){
            this.directionX *= -1;       
        }*/
        /*
		var moveto = cc.moveTo(0, this.directionX, this.directionY);
		this.ball.runAction(moveto);
        */
    },
    
    collisions: function(){
        
        
    },
    
    ctor:function () {
        this._super();
        this.initializer();
        
        // Schedule Moveball
        this.schedule(this.moveBall, this.speedBall);
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.moveControls
		}, this);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

