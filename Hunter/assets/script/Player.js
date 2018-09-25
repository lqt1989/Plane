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
        speedX:0,
        speedY:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    goLeft(){
        console.log("@@@left!!!!!!!!!");
        this.speed = -5
    },
    goRight(){
        console.log("@@@right!!!!!!!!!");       
        this.speed = 5
    },
    stopLeft(){
        this.leftSpeed = 0
    },
    stopRight(){
        this.rightSpeed = 0
    },
    stopAll(){
        console.log("@@@stop!!!!!");
        this.speed = 0
    },

    setSpeed(x,y){
        // if (x > 2)
        // {
        //     this.speedX = -5
        // }
        // else if(x < -2)
        // {
        //     this.speedX = 5
        // }
        // else
        // {
        //     this.speedX = 0
        // }
        this.speedX = -x
        this.speedY = -y
    },

    update (dt) {
        this.node.x += this.speedX;
        this.node.x = (this.node.x<230) ? this.node.x : 230;
        this.node.x = (this.node.x>-230) ? this.node.x : -230;

        // this.node.y += this.speedY
        // this.node.y = (this.node.y>480)?480:this.node.y;
        // this.node.y = (this.node.y<-480)?-480:this.node.y;

    },
});
