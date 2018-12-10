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
        lbl_hp:{
            type:cc.Node,
            default:null,
        },
        lbl_score:{
            type:cc.Node,
            default:null,
        },


        shield:{
            type:cc.Node,
            default:null,
        },

        bar_power:{
            type:cc.ProgressBar,
            default:null,
        }


    },

    onLoad(){
        this.addSpeedX = 0.25
        this.addSpeedY = 0.25

        this.idx_type = -1
        this.node.getComponent("Nature").atk = 30
        this.node.getComponent("Nature").idx_type =  this.idx_type


        //科技激活的属性
        this.tech = new Array();
        this.tech[0] = 0     //发射的子弹数量
        this.tech[1] = 150     //子弹存储上限
        this.tech[2] = 2     //子弹类型：1普通 2强化
        this.tech[3] = 0     //大炮冷却时间
        this.tech[4] = 15     //过载惩罚
        this.tech[5] = 0      //僚机数量
    },

    start () {
        this.nowSpeedX = 0
        this.nowSpeedY = 0
        this.targetSpeedX = 0
        this.targetSpeedY = 0
        this.worldSpeed = 0

        this.bulletCount = 150 //当前子弹数量

        //充能
        this.chargeTime = 0;
        this.chargeState = 1;

        this.winSize = cc.view.getVisibleSize();

        this.hp = 100
        this.score = 0
     
        this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
        this.lbl_score.getComponent(cc.Label).string = "Score:" + this.score
        //this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score

        this.shootState = 0   //0关闭，1开启
        this.isPause = false

        this.node.y = 480 - 200
    },

    setSpeed(x,y){
        this.targetSpeedX = x
        this.targetSpeedY = y    
    },
    setWorldSpeed(speed){
        this.worldSpeed = speed;
    },
    //
    setTechValue(key,value)
    {

        this.tech[key] = value
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

        this.node.y += this.nowSpeedY + this.worldSpeed
        this.node.y = (this.node.y > 100) ? this.node.y : 100;
        this.node.y = (this.node.y < (this.winSize.height-100)) ? this.node.y : (this.winSize.height -100);
    },

    updateCharge()
    {
        if (this.chargeState == 1)
        {
            var pro = this.bar_power.progress
            if (pro > 0)
            {
                pro -= 0.05
            }
            this.bar_power.progress = pro
        }
        else if (this.chargeState == 2)
        {
            var nowDate = new Date();
            var pro = (nowDate.getTime() - this.chargeTime)/2000
            this.bar_power.progress = pro
            if (this.bar_power.progress > 1)
            {
                this.chargeState = 1
                this.player.getComponent(Player).onOverLoad()
            }
        }
        
    },

    update (dt) {
        if (this.isPause === false)
        {
            this.updateNowSpeed();
            this.updatePos();
            this.updateCharge();
        }
    },

    onCollisionEnter: function (other, self) {
        if (this.shield.active === false)
        {
            var atk = other.node.getComponent("Nature").atk
            this.hp -= atk 
            this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
            
            this.node.parent.getComponent("FightLayer").createObject(2,this.node.x,this.node.y)

            if (this.hp <= 0)
            {
                var Custom_Event = new cc.Event.EventCustom("gameover",true)
                this.node.dispatchEvent(Custom_Event)  
            }
        }
    },

    addScore(value){ 
        this.score += value
        this.lbl_score.getComponent(cc.Label).string = "Score:" + this.score
        //this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score
    },

    onShoot(){
        if(this.tech[0] == 0)
        {
            log("@@@ 先 激活！！！")
        }
        else{
            if (this.shootState === 0){
                this.schedule(function() {
                    if (this.isPause === false)
                    {
                        // this.node.parent.getComponent("FightLayer").createObject(0,this.node.x+20,this.node.y)
                        // this.node.parent.getComponent("FightLayer").createObject(0,this.node.x-20,this.node.y)
                        if (this.bulletCount > 0)
                        {
                            for(var i = 1;i <= this.tech[0]; i++)
                            {
                                var x = 0
                                if (this.tech[0] !== 1)
                                    x = (i - (this.tech[0]+1)/2) * 20
                                this.node.parent.getComponent("FightLayer").createObject(0,this.node.x + x,this.node.y)
                            }
                            this.bulletCount -= 1
                        }
                    }
                }, 0.2);
                this.shootState = 1
                var action = cc.repeatForever(cc.rotateBy(0.6,360))
 
            }
            else if (this.shootState === 1){
                this.unscheduleAllCallbacks()
                this.shootState = 0

            }
        }
    },

    // onAddHp(){
    //     //log("@@hpadd player")
    //     this.hp += 20
    //     this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
    //     this.btn_addhp.getComponent(cc.Button).interactable = false
    //     this.node.getComponent("Utils").addCoolDown(this.btn_addhp,5,"btn_2")
    // },


    onSpeedUp(){
    },
    onChargeStart(){
        if (this.tech[3] == 0)
        {
            log("@@先激活大炮！")
        }
        else{
        if (this.isPause == false){
            this.chargeState = 2      
            var nowDate = new Date();
            this.chargeTime = nowDate.getTime()       
        }}
    },
    onChargeEnd(){
        if (this.tech[3] == 0)
        {
            log("@@先激活大炮！")
        }
        else{
        if (this.isPause == false){      
            if (this.chargeState == 2)
            {
                this.chargeState = 1  


                //this.fightLayer.createCharge(this.chargeBar.progress)
                var Custom_Event = new cc.Event.EventCustom("createCharge",true)
                Custom_Event.setUserData(this.bar_power.progress)
                this.node.dispatchEvent(Custom_Event)  
            }
        }}
    },
    onOverLoad(){
        if(this.tech[3] == 0)
        {
            log("@@先激活大炮！")
        }
        else{

        }
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
