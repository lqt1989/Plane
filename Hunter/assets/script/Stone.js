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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.maxHp = 50
        this.score = 3   
    },
    start () {
        this.init()  
    },
    reuse(){
        this.init()
    },
    init(){
        this.speed =  1

        this.mileage = 0
        this.hp = 50 * this.node.scale
        //this.node.getComponent(cc.ProgressBar).progress = this.hp/this.maxHp
        
        
        var time = this.node.scale * 20
        var action = cc.repeatForever(cc.rotateBy(time,180))
        this.node.runAction(action)
    },
    onCreate(){
        this.nature = this.node.getComponent("Nature")
        this.nature.init()
        this.node.scale = this.nature.param
        
    },

    onCollisionEnter: function (other, self) {   
        var atk = other.node.getComponent("Nature").atk
        if (atk)
        {
            this.hp -= atk 
           // this.node.getComponent(cc.ProgressBar).progress = this.hp/this.maxHp
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
        if ( this.nature.isPause === false)
        {
            this.node.y -= this.speed
            this.mileage += this.speed
            if (this.mileage >= 1800)
            {
                this.destorySelf()
            }
        }
    },
});
