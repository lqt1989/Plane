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
        speed:1,
        addSpeed:0.25,
    },

    onLoad () {
        this.speed = 1
        this.addSpeed = 0.5
        this.idx_type = 0 
    },

    start () {

    },

    destroySelf(){
        this.node.parent.getComponent(FightLayer).destoryObject(this.node,this.idx_type)
    },

    init()
    {
        // log("@@@init!!!")  
        // var finished = cc.callFunc(this.destroySelf, this, null);
        // var seq = cc.sequence(cc.moveBy(0.5, 0,800), finished);
        // this.node.runAction(seq)
    },

    update (dt) {
        this.speed += this.addSpeed
        this.node.y += this.speed;

        if (this.speed > 100)
        {
            this.speed = 1
            this.destroySelf()
        }
    },
});
