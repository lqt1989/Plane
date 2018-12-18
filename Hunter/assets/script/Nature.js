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
    initData(idx_type,worldspeed,param)
    {
        this.idx_type = idx_type
        this.speed = worldspeed
        this.param = param
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
    

    // update (dt) {},
});
