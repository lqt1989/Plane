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
        lbl_hp:{
            type:cc.Node,
            default:null,
        },
        lbl_score:{
            type:cc.Node,
            default:null,
        },
        lbl_finalscore:{
            type:cc.Node,
            default:null,
        }
    },

    onLoad(){
        this.addSpeedX = 0.25
        this.addSpeedY = 0.25

        this.idx_type = -1
        this.node.getComponent("Nature").atk = 30
        this.node.getComponent("Nature").idx_type =  this.idx_type
    },

    start () {
        this.nowSpeedX = 0
        this.nowSpeedY = 0
        this.targetSpeedX = 0
        this.targetSpeedY = 0
        this.worldSpeed = 0

        this.winSize = cc.view.getVisibleSize();

        this.hp = 100
        this.score = 0
     
        this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
        this.lbl_score.getComponent(cc.Label).string = "Score:" + this.score
        this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score

        this.shootState = 0   //0关闭，1开启
        this.isPause = false

        this.node.y = 150
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

        // this.node.y += this.nowSpeedY + this.worldSpeed
        // this.node.y = (this.node.y > 100) ? this.node.y : 100;
        // this.node.y = (this.node.y < (this.winSize.height-100)) ? this.node.y : (this.winSize.height -100);
    },

    update (dt) {
        if (this.isPause === false)
        {
            this.updateNowSpeed();
            this.updatePos();
        }
    },

    onCollisionEnter: function (other, self) {
        var atk = other.node.getComponent("Nature").atk
        this.hp -= atk 
        this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
        
        this.node.parent.getComponent("FightLayer").createObject(2,this.node.x,this.node.y)

        if (this.hp <= 0)
        {
            var Custom_Event = new cc.Event.EventCustom("gameover",true)
            this.node.dispatchEvent(Custom_Event)  
        }
    },

    addScore(value){ 
        this.score += value
        this.lbl_score.getComponent(cc.Label).string = "Score:" + this.score
        this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score
    },

    onShoot(){
       if (this.shootState === 0){
            this.schedule(function() {
                if (this.isPause === false)
                {
                    this.node.parent.getComponent("FightLayer").createObject(0,this.node.x+20,this.node.y)
                    this.node.parent.getComponent("FightLayer").createObject(0,this.node.x-20,this.node.y)
                }
            }, 0.2);
            this.shootState = 1
        }
        else if (this.shootState === 1){
            this.unscheduleAllCallbacks()
            this.shootState = 0
        }
    },

    onAddHp(){
        //log("@@hpadd player")
        this.hp += 20
        this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
    },
    onShield(){
        //log("@shield player")
    },
    onSpeedUp(){
        //log("@speed player")
    },
    onCharge(){
        //log("@charge player")
    },

    pause(){
        this.isPause = true
    },
    resume(){
        this.isPause = false
    },
    reStart(){
        this.unscheduleAllCallbacks()
        this.start()
    },
});
