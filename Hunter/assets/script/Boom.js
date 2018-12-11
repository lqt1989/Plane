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
        
        this.node.zIndex = 11
    },

    start () {
        var anim = this.getComponent(cc.Animation);
        anim.play('boom_1');

    },

    initData (idx){
        this.idx_type = idx
    },

    reuse(){
        var anim = this.getComponent(cc.Animation);
        anim.play('boom_1');
    },
    setWorldSpeed(sp){
        this.speed = sp
    },
    onAniCompleted(string) {
        //console.log('onAnimCompleted: param1[%s]',string);
        this.destorySelf()
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
    // update (dt) {},
});
