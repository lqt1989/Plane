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
        this.objType = [
            this.bullet,
            this.stone,
            this.boom,
            this.missile,
            this.enemy_1,
        ]
        this.objName = [
            "Bullet",
            "Stone",
            "Boom",
            "Missile",

            "Enemy_1",
        ]

        this.Objs = {
            1:{prefab:this.bullet,script:"Bullet",poolIndex:1,poolSize:30},
            2:{prefab:this.bullet,script:"Bullet",poolIndex:1,poolSize:30},
            3:{prefab:this.bullet,script:"Bullet",poolIndex:1,poolSize:30},
            4:{prefab:this.bullet,script:"Bullet",poolIndex:1,poolSize:30},
        }

        var arr = Object.keys(Objs);
        console.log(arr.length)

        this.objPool = new Array();
        this.objList = new Array();
        for (let i = 0; i < 4; ++i){
            this.objList[i] = new Array()
            this.objPool[i] = new cc.NodePool(this.objName[i])
            for (let j = 0; j < 15; ++j) {
                let obj = cc.instantiate(this.objType[i]); // 创建节点
                this.objPool[i].put(obj); // 通过 putInPool 接口放入对象池
            }         
        }
    },

    clear(){
        for (var t = 0;t < 4; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]          
                this.objPool[t].put(obj)
            }
            this.objList[t] = []
        }
    },

    createObject(idx_type,x,y,scale){   
        var obj = null
        if (this.objPool[idx_type].size() > 0) { 
            obj = this.objPool[idx_type].get();
        } else { 
            obj = cc.instantiate(this.objType[idx_type]);
        }     
        //obj.getComponent(this.objName[idx_type]).init(); 
        if (scale)
        {obj.scale = scale}
        else
        {obj.scale = 1}
        obj.parent = this.node; 
        obj.x = x
        obj.y = y
        obj.getComponent(this.objName[idx_type]).setWorldSpeed(this.worldSpeed)
        this.objList[idx_type].push(obj)   
    },

    destroyObject(node,idx_type){
        var index = this.objList[idx_type].indexOf(node)
        this.objList[idx_type].splice(index,1)
        this.objPool[idx_type].put(node)
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
        for (var t = 0;t < 4; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]
                obj.getComponent(this.objName[t]).pause()
            }
        }
    },

    resume(){
        for (var t = 0;t < 4; t++)
        {
            for ( var i = 0; i <this.objList[t].length; i++){
                var obj = this.objList[t][i]
                obj.getComponent(this.objName[t]).resume()
            }
        }
    },

    setWorldSpeed(sp){
        this.worldSpeed = sp
        for (var i = 0; i < this.objList[1].length;i++){
            var obj = this.objList[1][i]
            obj.getComponent(this.objName[1]).setWorldSpeed(sp)
        }
    },
    getWorldSpeed(){
        return this.worldSpeed
    },

    // update (dt) {},
});
