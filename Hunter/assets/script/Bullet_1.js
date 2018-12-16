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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addSpeed = 0.5
        this.node.getComponent("Nature").atk = 1
        this.node.getComponent("Nature").idx_type = this.idx_type
    },
    start () {
        this.init()
    },
    reuse(){
        this.init()
    },
    init(){
        this.speed = 16
        this.mileage = 0
        this.isPause = false
    },

    initData (idx){
        this.idx_type = idx
        this.node.getComponent("Nature").idx_type = this.idx_type
    },
    setWorldSpeed(sp){
        //this.speed = sp
    },
    onCollisionEnter: function (other, self) {
        if (other.node.getComponent("Nature").idx_type != this.idx_type &&
        other.node.getComponent("Nature").idx_type != Constant.Objs.GoldIcon)
        {
            var Custom_Event = new cc.Event.EventCustom("objCreate",true)
            var data = new Array(2)
            data[0] = Constant.Objs.Boom
            data[1] = this.node.x
            data[2] = this.node.y
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)

            this.destorySelf()
        }
    },

    update (dt) {
        if (this.isPause === false)
        {
            //this.speed += this.addSpeed
            this.node.y += this.speed;
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
        data[1] = this.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
    },
    pause(){
        this.isPause = true
    },
    resume(){
        this.isPause = false
    },

    //1:散弹 2.贯通
    setType(t,index,total){
        if(t === 1)
        {

        }
        else if(t === 2)
        {

        }
    },
});

