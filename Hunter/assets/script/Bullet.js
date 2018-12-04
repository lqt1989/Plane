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
        this.idx_type = 0 
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
    setWorldSpeed(sp){
        //this.speed = sp
    },
    onCollisionEnter: function (other, self) {
        if (other.node.getComponent("Nature").idx_type != this.idx_type)
        {
           // this.node.parent.getComponent("FightLayer").createObject(2,this.node.x,this.node.y)
            var Custom_Event = new cc.Event.EventCustom("objCreate",true)
            var data = new Array(2)
            data[0] = 2
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
});

