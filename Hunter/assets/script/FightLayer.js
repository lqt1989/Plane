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
        player:{
            type:cc.Node,
            default:null,
        },
        bullet:{
            type:cc.Prefab,
            default:null,
        },
        stone:{
            type:cc.Prefab,
            default:null, 
        },
        boom:{
            type:cc.Prefab,
            default:null,
        }

    },

    onLoad () {
        this.player.zIndex = 10
    },
    
    start () {

        this.objType = [
            this.bullet,
            this.stone,
            this.boom,
        ]
        this.objName = [
            "Bullet",
            "Stone",
            "Boom",
        ]
        this.objPool = new Array();
        this.objList = new Array();
        for (let i = 0; i < 3; ++i){
            this.objList[i] = new Array()
            this.objPool[i] = new cc.NodePool(this.objName[i])
            for (let j = 0; j < 15; ++j) {
                let obj = cc.instantiate(this.objType[i]); // 创建节点
                this.objPool[i].put(obj); // 通过 putInPool 接口放入对象池
            }         
        }
    },

    createObject(idx_type,x,y){   
        var obj = null
        if (this.objPool[idx_type].size() > 0) { 
            obj = this.objPool[idx_type].get();
        } else { 
            obj = cc.instantiate(this.objType[idx_type]);
        }     
        //obj.getComponent(this.objName[idx_type]).init(); 
        obj.parent = this.node; 
        obj.x = x
        obj.y = y
        this.objList[idx_type].push(obj)   
    },
    destroyObject(node,idx_type){
        var index = this.objList[idx_type].indexOf(node)
        this.objList[idx_type].splice(index,1)
        this.objPool[idx_type].put(node)
    }

    // update (dt) {},
});
