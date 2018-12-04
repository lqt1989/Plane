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
        },
        btn_shield:{
            type:cc.Node,
            default:null,
        },
        btn_shoot:{
            type:cc.Node,
            default:null,
        },
        btn_charge:{
            type:cc.Node,
            default:null,
        },
        btn_speed:{
            type:cc.Node,
            default:null, 
        },

        shield:{
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

        this.btn_shield.getComponent(cc.Button).enableAutoGrayEffect  = true
        this.btn_charge.getComponent(cc.Button).enableAutoGrayEffect = true

        //科技激活的属性
        this.tech = new Array();
        this.tech[0] = 1     //发射的子弹数量
        this.tech[1] = 150     //子弹存储上限
        this.tech[2] = 2     //单发子弹伤害
        this.tech[3] = 30     //大炮冷却时间
        this.tech[4] = 0      //护盾开启状态，0未开，1开启
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

    update (dt) {
        if (this.isPause === false)
        {
            this.updateNowSpeed();
            this.updatePos();
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
        this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score
    },

    onShoot(){
       if (this.shootState === 0){
            this.schedule(function() {
                if (this.isPause === false)
                {
                    // this.node.parent.getComponent("FightLayer").createObject(0,this.node.x+20,this.node.y)
                    // this.node.parent.getComponent("FightLayer").createObject(0,this.node.x-20,this.node.y)
                    
                    for(var i = 1;i <= this.tech[0]; i++)
                    {
                        var x = 0
                        if (this.tech[0] !== 1)
                            x = (i - (this.tech[0]+1)/2) * 20
                        this.node.parent.getComponent("FightLayer").createObject(0,this.node.x + x,this.node.y)
                    }

                }
            }, 0.2);
            this.shootState = 1
            var action = cc.repeatForever(cc.rotateBy(0.6,360))
            this.btn_shoot.runAction(action)
        }
        else if (this.shootState === 1){
            this.unscheduleAllCallbacks()
            this.shootState = 0
            this.btn_shoot.stopAllActions()
        }
    },

    // onAddHp(){
    //     //log("@@hpadd player")
    //     this.hp += 20
    //     this.lbl_hp.getComponent(cc.Label).string = "HP:" + this.hp
    //     this.btn_addhp.getComponent(cc.Button).interactable = false
    //     this.node.getComponent("Utils").addCoolDown(this.btn_addhp,5,"btn_2")
    // },

    showShield()
    {
        this.shield.active = true
        var action = cc.sequence(cc.delayTime(3),cc.callFunc(function(){
            this.shield.active = false
        },this))
        this.shield.runAction(action)
    },
    onShield(){
        this.btn_shield.getComponent(cc.Button).interactable = false
        this.node.getComponent("Utils").addCoolDown(this.btn_shield,15,"btn_1")
        this.showShield()
    },  
    onSpeedUp(){
    },
    onChargeStart(){
    },
    onChargeEnd(){
        this.btn_charge.getComponent(cc.Button).interactable = false
        this.node.getComponent("Utils").addCoolDown(this.btn_charge,15,"btn_4")
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
