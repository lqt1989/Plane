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
require("Bullet_3")
require("Boom")
require("Stone")
require("Gold")

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
        bullet3:{
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
        enemy1:{
            type:cc.Prefab,
            default:null,
        },
        charge:{
            type:cc.Prefab,
            default:null,
        },
        gold:{
            type:cc.Prefab,
            default:null,
        },
        bullet4:{
            type:cc.Prefab,
            default:null,
        },
        enemy2:
        {
            type:cc.Prefab,
            default:null,
        },
        bullet5:{
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
            3:{prefab:this.bullet3,script:"Bullet_3",poolIndex:3,poolSize:30},
            4:{prefab:this.stone,script:"Stone",poolIndex:4,poolSize:10},
            5:{prefab:this.boom,script:"Boom",poolIndex:5,poolSize:20},
            6:{prefab:this.missile,script:"Missile",poolIndex:null,poolSize:null},
            7:{prefab:this.gold,script:"Gold",poolIndex:6,poolSize:10},
            8:{prefab:this.enemy1,script:"Enemy_1",poolIndex:7,poolSize:15},
            9:{prefab:this.bullet4,script:"Bullet_4",poolIndex:8,poolSize:30},
            10:{prefab:this.enemy2,script:"Enemy_2",poolIndex:9,poolSize:10},
            11:{prefab:this.bullet5,script:"Bullet_4",poolIndex:10,poolSize:30},
        }

        var arr = Object.keys(this.Objs);
        this.objPool = new Array();
        this.objList = new Array();
        for(var i = 1; i <= arr.length; i++)
        {
            this.objList[i] = new Array()
            var cfg = this.Objs[i]
            var poolInx = cfg.poolIndex
            if ( !this.objPool.hasOwnProperty(poolInx))
            {                
                this.objPool[poolInx] = new cc.NodePool(cfg.script)
                for (let j = 0; j < cfg.poolSize; ++j)
                {
                    let obj = cc.instantiate(cfg.prefab); // 创建节点
                    this.objPool[poolInx].put(obj); // 通过 putInPool 接口放入对象池
                }
            }
        }

        var graphics=this.getComponent(cc.Graphics);

        let color = cc.Color.BLUE;//声明一个颜色变量
        color.a=100;//添加透明度
        graphics.fillColor=color;//填充
        graphics.strokeColor = color;
        graphics.lineWidth = 2;
        graphics.moveTo(200, 0);
        graphics.lineTo(200, 960);
        graphics.stroke(); 
        graphics.moveTo(200, 400);
        graphics.lineTo(640, 400);
        graphics.stroke();          

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
            this.objList[idx_type].push(obj)   
            obj.getComponent("Nature").initData(idx_type,this.worldSpeed,param)
            obj.getComponent(cfg.script).onCreate()
        }
    },

    destroyObject(node,idx_type){
        var cfg = this.Objs[idx_type]
        if (cfg.poolIndex === null)
        {             
            var index = this.objList[idx_type].indexOf(node)
            this.objList[idx_type].splice(index,1)
            node.destroy()
        }
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
        for (var t = 1;t <= arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]
                obj.getComponent("Nature").pause()
            }
        }
    },

    resume(){
        var arr = Object.keys(this.Objs);
        for (var t = 1;t <= arr.length; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]             
                obj.getComponent("Nature").resume()
            }
        }
    },

    setWorldSpeed(sp){
        this.worldSpeed = sp
        var arr = Object.keys(this.Objs);
        for (var t = 1;t <= arr.length; t++)
        {
            if (this.objList.hasOwnProperty(t)) {
                for ( var i = 0; i <this.objList[t].length; i++){
                    var obj = this.objList[t][i]   
                    obj.getComponent("Nature").setWorldSpeed(sp)               
                }
            }
        }
    },
    getWorldSpeed(){
        return this.worldSpeed
    },

    // update (dt) {},
});
