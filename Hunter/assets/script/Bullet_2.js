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

    onLoad () {
    },
    start () {
        this.init()
    },
    reuse(){
        this.init()
    },
    init(){
        this.nature = this.node.getComponent("Nature")
        this.nature.atk = 1
        this.rotation = this.nature.param
        this.speed = 16
        this.mileage = 0
        this.nature.init();
    },

    onCollisionEnter: function (other, self) {
        var Custom_Event = new cc.Event.EventCustom("objCreate",true)
        var data = new Array(2)
        data[0] = Constant.Objs.Boom
        data[1] = this.node.x
        data[2] = this.node.y
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
        this.destorySelf()
    },

    update (dt) {
        if ( this.nature.isPause === false)
        {
            var x = this.speed*Math.sin(2*Math.PI/360*this.rotation)
            var y = this.speed*Math.cos(2*Math.PI/360*this.rotation)
            this.node.y += y;
            this.node.x += x;
            this.mileage += this.speed      
            if (this.mileage >= 1350)
            {
                this.destorySelf()
            }
        }
    },

    destorySelf(){
        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.nature.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
    },
});

