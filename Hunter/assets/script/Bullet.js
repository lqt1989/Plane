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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 1
        this.addSpeed = 0.5
    },

    start () {

    },

    destroy(){
        this.node.parent.getComponent(FightLayer).destoryMissile(this.node)
    },

    init()
    {
        log("@@@init!!!")

    },

    update (dt) {
        this.speed += this.addSpeed
        this.node.y += this.speed;

        if (this.speed > 100)
        {
            this.speed = 1
            this.destroy()
        }
    },
});
