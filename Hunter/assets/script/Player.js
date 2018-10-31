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
        winSize:null,

        //速度： 像素/帧
        nowSpeedX:0,
        nowSpeedY:0,
        addSpeedX:0.25,
        addSpeedY:0.25,
        targetSpeedX:0,
        targetSpeedY:0,

        worldSpeed:0,

    },

    start () {
        this.nowSpeedX = 0
        this.nowSpeedY = 0
        this.addSpeedX = 0.25
        this.addSpeedY = 0.25

        this.winSize = cc.view.getVisibleSize();
    },

    setSpeed(x,y){
        this.targetSpeedX = x
        this.targetSpeedY = y    
    },
    setWorldSpeed(speed){
        this.worldSpeed = speed;
    },

    //更新速度
    updateNowSpeed()
    {
        if (this.targetSpeedX > this.nowSpeedX){
            this.nowSpeedX = this.nowSpeedX + this.addSpeedX
        } 
        else if(this.targetSpeedX < this.nowSpeedX){
            this.nowSpeedX = this.nowSpeedX - this.addSpeedX
        }
        if (this.targetSpeedY > this.nowSpeedY){
            this.nowSpeedY += this.addSpeedY
        } 
        else if(this.targetSpeedY < this.nowSpeedY){
            this.nowSpeedY -= this.addSpeedY
        }
    },
    //更新坐标
    updatePos()
    {
        this.node.x += this.nowSpeedX;
        this.node.x = (this.node.x<this.winSize.width) ? this.node.x : 640;
        this.node.x = (this.node.x>0) ? this.node.x : 0;

        this.node.y += (this.nowSpeedY + this.worldSpeed)
        this.node.y = (this.node.y > (180 )) ? this.node.y : (180 );
        this.node.y = (this.node.y < (this.winSize.height) ) ? this.node.y : (this.winSize.height );

     
    },

    update (dt) {
        this.updateNowSpeed();
        this.updatePos();
    },
});
