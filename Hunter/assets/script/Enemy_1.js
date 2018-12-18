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
    moveToRight()
    {
       var action = cc.sequence(cc.moveBy(6,cc.v2(600,0)),cc.delayTime(2),cc.callFunc(function(){this.destorySelf},this))
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
        this.node.stopAllActions()
        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.nature.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
    },

    update (dt) {

    },
});
