// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rightSpeed:0,
        leftSpeed:0,

        //速度： 像素/帧
        nowSpeedX:0,
        nowSpeedY:0,
        addSpeedX:0.25,
        addSpeedY:0.25,
        targetSpeedX:0,
        targetSpeedY:0,
    },

    start () {
        this.nowSpeedX = 0
        this.nowSpeedY = 0

        this.addSpeedX = 0.25
        this.addSpeedY = 0.25
    },

    goLeft(){
        this.speed = -5
    },
    goRight(){   
        this.speed = 5
    },
    stopLeft(){
        this.leftSpeed = 0
    },
    stopRight(){
        this.rightSpeed = 0
    },
    stopAll(){

        this.speed = 0
    },

    setSpeed(x,y){

        this.targetSpeedX = x
        this.targetSpeedY = y

    },

    update (dt) {
        if (this.targetSpeedX > this.nowSpeedX){
            this.nowSpeedX = this.nowSpeedX + this.addSpeedX
        } 
        else if(this.targetSpeedX < this.nowSpeedX){
            this.nowSpeedX = this.nowSpeedX - this.addSpeedX
        }
        //console.log("@@@nowSpeedX x is >>>>>",this.nowSpeedX);

        if (this.targetSpeedY > this.nowSpeedY){
            this.nowSpeedY += this.addSpeedY
        } 
        else if(this.targetSpeedY < this.nowSpeedY){
            this.nowSpeedY -= this.addSpeedY
        }

        this.node.x += this.nowSpeedX;
        this.node.x = (this.node.x<640) ? this.node.x : 640;
        this.node.x = (this.node.x>0) ? this.node.x : 0;

        this.node.y += this.nowSpeedY;
        this.node.y = (this.node.y<960) ? this.node.y : 960;
        this.node.y = (this.node.y>0) ? this.node.y : 0;

        // this.node.y += this.speedY
        // this.node.y = (this.node.y>480)?480:this.node.y;
        // this.node.y = (this.node.y<-480)?-480:this.node.y;

    },
});
