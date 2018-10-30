// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Bullet = require("Bullet")
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
        this.missile = new Array();

        this.missilePool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let missile = cc.instantiate(this.star); // 创建节点
            this.missilePool.put(missile); // 通过 putInPool 接口放入对象池
        }
    },

    createrMissile(x,y){
        

        let missile = cc.instantiate(this.star);;
        if (this.missilePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            missile = this.missilePool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            missile = cc.instantiate(this.star);
        }
        
        // missile.getComponent('Bullet').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
        missile.parent = this.node; // 将生成的敌人加入节点树
        missile.x = x
        missile.y = y
        this.missile.push(missile)
        
    },

    destoryMissile(node){
        var index = this.missile.indexOf(node)
        this.missile.splice(index,1)

        this.missilePool.put(node)
 
    }

    // update (dt) {},
});
