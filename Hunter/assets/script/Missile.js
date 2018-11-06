// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var FightLayer = require("FightLayer")
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.idx_type = 0 
    },

    start () {
        log("@@start")
        this.speed = 1
        this.mileage = 0
    },

    reuse(){
        log("@@reuse")
        this.speed = 1
        this.mileage = 0
    },

    update (dt) {
        this.speed += this.addSpeed
        this.node.y += this.speed;
        this.mileage += this.speed

        console.log("@@age is >>>",this.mileage);
        
        if (this.mileage >= 350)
        {
            this.node.parent.getComponent(FightLayer).createObject(2,this.node.x,this.node.y)
            this.node.parent.getComponent(FightLayer).destroyObject(this.node,this.idx_type) 
        }
    },
});
