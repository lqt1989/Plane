// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Missile = require("Missile")
cc.Class({
    extends: cc.Component,

    properties: {
        missile:{
            type:cc.Prefab,
            default:null,
        },
        stone:{
            type:cc.Prefab,
            default:null, 
        }

    },

    onLoad () {
    },
    
    start () {

        this.objType = [
            this.missile,
            this.stone,
        ]
        this.objPool = new Array();
        this.objList = new Array();
        for (let i = 0; i < 4; ++i){
            this.objList[i] = new Array()
            this.objPool[i] = new cc.NodePool()
            for (let j = 0; j < 15; ++j) {
                let obj = cc.instantiate(this.objType[i]); // 创建节点
                this.objPool[i].put(obj); // 通过 putInPool 接口放入对象池
            }         
        }
    },

    createObject(idx_type,x,y){
        let obj = null
        if (this.objPool[idx_type].size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            obj = this.objPool[idx_type].get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            obj = cc.instantiate(this.objType[idx_type]);
        }     
        //missile.getComponent('Missile').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
        obj.parent = this.node; // 将生成的敌人加入节点树
        obj.x = x
        obj.y = y
        this.objList[idx_type].push(obj)   
    },
    destoryObject(node,idx_type){
        var index = this.objList[idx_type].indexOf(node)
        this.missileList.splice(index,1)
        this.missilePool.put(node)
    }

    // update (dt) {},
});
