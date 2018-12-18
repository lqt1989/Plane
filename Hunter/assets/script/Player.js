// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Constant = require("Constant")
cc.Class({
    extends: cc.Component,
    properties: {
        lbl_score:{
            type:cc.Node,
            default:null,
        },

        bar_power:{
            type:cc.ProgressBar,
            default:null,
        },

        wing_1:{
            type:cc.Node,
            default:null,
        },
        wing_2:{
            type:cc.Node,
            default:null,
        },

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


        //充能
        this.chargeTime = 0;
        this.chargeState = 1;

        this.winSize = cc.view.getVisibleSize();

        this.hp = 100
        this.score = 0
     
        this.lbl_score.getComponent(cc.Label).string = "Score:" + this.score
        //this.lbl_finalscore.getComponent(cc.Label).string = "本次得分：" + this.score

        this.isPause = false

        this.node.y = 480 - 200
        this.rotate_1 = 0
        this.rotate_2 = 180

        this.initTech()

        this.onShoot()
    },

    initTech()
    {
        //科技激活的属性
        this.tech = new Array();
        this.tech[0] = 0     //发射的子弹数量
        this.tech[1] = 150     //子弹存储上限
        this.tech[2] = 2     //子弹类型：1普通 2强化
        this.tech[3] = 0     //大炮冷却时间
        this.tech[4] = 15     //过载惩罚
        this.tech[5] = 0      //僚机数量
        this.tech[6] = 0      //1自身坐标 2.触点
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

    addWingPlane(index)
    {
        if (index === 1)
        {
            this.wing_1.active = true
        }
        else if(index === 2)
        {
            this.wing_2.active = true
        }
    },

    //更新僚机坐标
    updateWingPos()
    {
        
        
        this.rotate_1 += 5
        this.rotate_2 -= 5

        this.rotate_1 = this.rotate_1 > 360 ? 0 : this.rotate_1
        this.rotate_2 = this.rotate_2 < -180 ? 180 : this.rotate_2

        var y1 = Math.sin(2*Math.PI/360*this.rotate_1) * 180
        var x1 = Math.cos(2*Math.PI/360*this.rotate_1) * 180
        
        var y2 = Math.sin(2*Math.PI/360*this.rotate_2) * 180
        var x2 = Math.cos(2*Math.PI/360*this.rotate_2) * 180
        
        this.wing_1.x = x1 
        this.wing_1.y = y1 

        this.wing_2.x = x2 
        this.wing_2.y = y2

        if (this.tech[5] === 0)
        {   this.wing_1.active = false
            this.wing_2.active = false}
        else if(this.tech[5] === 1)
        {   this.wing_1.active = true
            this.wing_2.active = false
            if (this.rotate_1%180 == 0)
            {
                this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_1,this.node.x + x1/2,this.node.y +y1)
            }
        }
        else
        {   this.wing_1.active = true
            this.wing_2.active = true
            if (this.rotate_1%180 == 0)
            {
                this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_1,this.node.x +x1/2,this.node.y +y1)
                this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_1,this.node.x +x2/2,this.node.y +y2)
            }
        }
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
            this.updateWingPos();
        }
    },

    onCollisionEnter: function (other, self) {       
        if (other.node.getComponent("Nature").idx_type != Constant.Objs.GoldIcon)    
        {
            this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Boom,this.node.x,this.node.y)          
            if (this.tech[5] > 0)
            {
                this.tech[5] -= 1
                this.node.runAction(cc.sequence(cc.delayTime(10),cc.callFunc(function(){this.tech[5]+=1},this)))
            }
            else 
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
        this.schedule(function() {
            if (this.isPause === false)
            {
                if (this.tech[0] !== 0)
                {
                    if (this.tech[0] === 1)
                        {this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_1,this.node.x,this.node.y)}
                    else{
                        if (this.tech[0]%2 === 0) //贯通
                        {                                  
                            var startX = -((this.tech[0] -1) *10/2)                                                       
                            for(var i = 1;i <= this.tech[0]; i++)
                            {
                                var x = startX + (i-1) * 10
                                var x = i%2 *20 -10
                                var y = Math.ceil(i/2) * 5                 
                                this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_1,this.node.x + x,this.node.y + y)
                            }}
                        else                      //散弹
                        {                 
                            var stratr = -(this.tech[0]-1)*15/2
                            for(var i = 1;i <= this.tech[0]; i++)
                            {
                                var r = stratr + (i-1)*15                                
                                this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Bullet_2,this.node.x,this.node.y,r)
                            }}
                        }
                }
            }
        }, 0.2);
        var action = cc.repeatForever(cc.rotateBy(0.6,360))     
    },

    onCreateMissile(x,y){
        if (this.tech[6] === 0){return}
        else if(this.tech[6] === 1){
            this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Missile,this.node.x,this.node.y)
        }else if(this.tech[6] === 2){
            this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Missile,x,y)
        }
    },

    onChargeStart(){
        if (this.tech[3] == 0)
        {
            //log("@@先激活大炮！")
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
            //log("@@先激活大炮！")
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
            //log("@@先激活大炮！")
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
