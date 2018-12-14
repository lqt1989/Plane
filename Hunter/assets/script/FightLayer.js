// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
require("Bullet_1")
require("Bullet_2")
require("Boom")
require("Stone")


cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            type:cc.Node,
            default:null,
        },

        bullet1:{
            type:cc.Prefab,
            default:null,
        },
        bullet2:{
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
        },
        missile:{
            type:cc.Prefab,
            default:null,
        },
        enemy_1:{
            type:cc.Prefab,
            default:null,
        },
        charge:{
            type:cc.Prefab,
            default:null,
        },

    },

    onLoad () {
        this.player.zIndex = 10
        this.worldSpeed = 1
        this.node.on("createCharge",function(event){
            var p = event.getUserData()
            this.createCharge(p)
        },this)
    },
    
    start () {
        this.init()
    },

    reStart() {
        this.clear()
        this.setWorldSpeed(1)
    },

    init(){
        this.Objs = {
            1:{prefab:this.bullet1,script:"Bullet_1",poolIndex:1,poolSize:30},
            2:{prefab:this.bullet2,script:"Bullet_2",poolIndex:2,poolSize:30},
            3:{prefab:this.stone,script:"Stone",poolIndex:3,poolSize:10},
            4:{prefab:this.boom,script:"Boom",poolIndex:4,poolSize:20},
            5:{prefab:this.missile,script:"Missile",poolIndex:null,poolSize:null},
        }

        var arr = Object.keys(this.Objs);
        console.log(arr.length)
        this.objPool = new Array();
        this.objList = new Array();
        for(var i = 1; i <= arr.length; i++)
        {
            this.objList[i] = new Array()
            var cfg = this.Objs[i]
            var poolInx = cfg.poolIndex
            if ( !this.objPool.hasOwnProperty(poolInx))
            {
                console.log("@crea poll idx is",poolInx);
                
                this.objPool[poolInx] = new cc.NodePool(cfg.script)
                for (let j = 0; j < cfg.poolSize; ++j)
                {
                    let obj = cc.instantiate(cfg.prefab); // 创建节点
                    this.objPool[poolInx].put(obj); // 通过 putInPool 接口放入对象池
                }
            }
        }
    },

    clear(){
        var arr = Object.keys(this.Objs);
        for (var t = 1;t <= arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]   
                var idx =  this.Objs[t].poolIndex      
                this.objPool[idx].put(obj)
            }
            this.objList[t] = []
        }
    },

    createObject(idx_type,x,y,param){   
        var obj = null
        var cfg = this.Objs[idx_type]
        if (cfg.poolIndex === null)
        {
            obj = cc.instantiate(cfg.prefab);
        }
        else 
        {
            if (this.objPool[cfg.poolIndex].size() > 0)
            {
                obj = this.objPool[cfg.poolIndex].get()}
            else{
                obj = cc.instantiate(cfg.prefab)}
        }
        if (obj != null)
        {
            obj.parent = this.node; 
            obj.x = x
            obj.y = y
            obj.getComponent(cfg.script).initData(idx_type,param)
            obj.getComponent(cfg.script).setWorldSpeed(this.worldSpeed)
            this.objList[idx_type].push(obj)   
        }
    },

    destroyObject(node,idx_type){
        var cfg = this.Objs[idx_type]
        if (cfg.poolIndex === null)
        { node.destroy()}
        else 
        {
            var index = this.objList[idx_type].indexOf(node)
            this.objList[idx_type].splice(index,1)
            this.objPool[cfg.poolIndex].put(node)
        }
    },

    createCharge(percent)
    {
        var cha = cc.instantiate(this.charge)
        cha.parent = this.node
        cha.x = this.player.x 
        cha.y = this.player.y 
        var atk = cha.getComponent("Nature").atk
        cha.getComponent("Charge").setPercent(percent)
    },

    pause(){
        var arr = Object.keys(this.Objs);
        for (var t = 1;t < arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]
                obj.getComponent(this.Objs[t].script).pause()
            }
        }
    },

    resume(){
        var arr = Object.keys(this.Objs);
        for (var t = 1;t < arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]
                console.log("i is ",i);
                console.log("@@script scriptis",this.Objs[t].script);
                
                obj.getComponent(this.Objs[t].script).resume()
            }
        }
    },

    setWorldSpeed(sp){
        this.worldSpeed = sp
        // for (var i = 0; i < this.objList[1].length;i++){
        //     var obj = this.objList[1][i]
        //     obj.getComponent(this.Objs[i].script).setWorldSpeed(sp)
        // }
        var arr = Object.keys(this.Objs);
        for (var t = 1;t < arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]              
                obj.getComponent(this.Objs[t].script).setWorldSpeed(sp)
            }
        }
    },
    getWorldSpeed(){
        return this.worldSpeed
    },

    // update (dt) {},
});
