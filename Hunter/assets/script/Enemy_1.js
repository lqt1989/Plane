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
    },

    onLoad () {
        this.maxHp = 50
        this.score = 3   
        this.player = cc.find("Canvas/FightLayer/Player");
    },
    start () {
        //this.init()  
    },
    reuse(){
        this.init()
    },
    init(){
        this.nature = this.node.getComponent("Nature")
        this.nature.init()

        this.hp = 15
        this.mileage = 0
        this.speed =  this.nature.speed
        this.node.zIndex= 9
   
        this.updateState = false
        this.doAction(1)
    },

    doAction(ai)
    {
        switch(ai){
            case 1:
                this.moveToRight()
                break;
            case 2:

            case 3:

            default:
                break;
        }
    },

    moveToPoint(t,x,y)
    {
        var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
        var target_world = this.node.convertToWorldSpaceAR(cc.v2(x,y));
        var temp_vector = target_world.sub(self_world);
        var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
        this.node.rotation -= temp_angleDegrees;
        
        this.node.runAction(cc.moveTo(t,x,y))
        console.log("@@@@player pos is..",this.player.getPosition().x);
        
    },

    moveToRight()
    {
       var action = cc.sequence(cc.callFunc(function(){this.moveToPoint(3,320,500)},this),
                                cc.delayTime(4),
                                cc.callFunc(function(){this.moveToPoint(3,600,700)},this),
                                cc.delayTime(4),
                                cc.callFunc(function(){this.destorySelf()},this))
       this.node.runAction(action)
    },




    onCollisionEnter: function (other, self) {   
        var atk = other.node.getComponent("Nature").atk
        if (atk)
        {
            this.hp -= atk 
            if (this.hp <= 0)
            {
                this.pushScore()
                var Custom_Event = new cc.Event.EventCustom("objCreate",true)
                var data = new Array(2)
                data[0] = 2
                data[1] = this.node.x
                data[2] = this.node.y
                Custom_Event.setUserData(data)
                this.node.dispatchEvent(Custom_Event)
                this.destorySelf()
            }
        }
    },

    pushScore(){
        var Custom_Event = new cc.Event.EventCustom("addScore",true)
        Custom_Event.setUserData(this.score)
        this.node.dispatchEvent(Custom_Event)
    },


    destorySelf(){
        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.nature.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
        this.node.stopAllActions()
        log("@@@destory!!!!!!!!!")
    },

    update (dt) {
        if (this.updateState === true)
        {

        }
    },
});
