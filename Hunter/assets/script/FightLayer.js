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
        star:{
            type:cc.Prefab,
            default:null,
        }
        //玩家子弹

        //玩家飞弹

        //敌人

        //敌人子弹

        //陨石

    },

    // onLoad () {},
    start () {
        

    },

    createrButtle(x,y){
        var star = cc.instantiate(this.star);
        star.x = x;
        star.y = y;
        star.parent = this.node;
    }

    // update (dt) {},
});
