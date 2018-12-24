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
        atk:0,
        def:0,
    },

    // onLoad () {},
    initData(idx_type,worldspeed,param1,param2,param3,param4,param5)
    {
        this.idx_type = idx_type
        this.speed = worldspeed
        this.param1 = param1       
        this.param2 = param2
        this.param3 = param3
        this.param4 = param4
        this.param5 = param5
    },

    setWorldSpeed(speed)
    {
        this.speed = speed
    },

    init(){
        this.isPause = false
        this.mileage = 0
    },

    start () {

    },

    pause(){
        this.isPause = true
    },
    resume(){
        this.isPause = false
    },
    
});
