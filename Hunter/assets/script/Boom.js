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
        this.idx_type = 2
        this.node.zIndex = 11
    },

    start () {
        var anim = this.getComponent(cc.Animation);
        anim.play('boom_1');

    },

    reuse(){
        var anim = this.getComponent(cc.Animation);
        anim.play('boom_1');
    },

    onAniCompleted(string) {
        //console.log('onAnimCompleted: param1[%s]',string);
        this.node.parent.getComponent("FightLayer").destroyObject(this.node,this.idx_type)
    }

    // update (dt) {},
});
