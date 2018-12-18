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
    },

    onCollisionEnter: function (other, self) {
            this.node.parent.getComponent("FightLayer").createObject(Constant.Objs.Boom,this.node.x,this.node.y)
    },

    onLoad () {
        this.node.getComponent("Nature").atk = 100
    },

    start () {
        
    },

    setPercent(per){
        var atk = this.node.getComponent("Nature").atk
        this.node.getComponent("Nature").atk = atk*per
        this.node.scaleX = per*0.5 + 0.2
    },

    update (dt) {
        this.node.y += 20
    },
});
