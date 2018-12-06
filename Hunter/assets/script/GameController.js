// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Player = require("Player");
var FightLayer = require("FightLayer");
var Item = require("Constant").Item
cc.Class({
    extends: cc.Component,
    properties: {
        upNode:{
            default:null,
            type:cc.Node,
        },
        downNode:{
            default:null,
            type:cc.Node,
        },
        fightLayer:{
            default:null,
            type:FightLayer,
        },
        //玩家飞船
        player:{
            default:null,
            type:cc.Node,
        },
        //地图背景长度
        map1:{
            default:null, 
            type:cc.Node,
        },
        map2:{
            default:null,
            type:cc.Node,
        },

        tech:{
            default:null, 
            type:cc.Node,
        },

        gameover:{
            default:null,
            type:cc.Node,
        },

        reocker:{
            default:null,
            type:cc.Node,
        },
        pp:{
           default:null,
           type:cc.Node, 
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;

        this.node.on("touchStart",function(event){
            var data = event.getUserData()           
            this.reocker.x = data.x-320
            this.reocker.y = data.y

        },this)

        this.node.on("touchMove",function(event){
            var data = event.getUserData()    
            var location = this.reocker.convertToNodeSpaceAR(data)
            var x = location.x
            var y = location.y
            var r = Math.sqrt(x*x + y*y)
            if (r >= 80)
            {
                x = x*80/r
                y = y*80/r
            }

            this.pp.setPosition(x,y)    
            this.player.getComponent(Player).setSpeed(x/15,y/15)
        },this)

        this.node.on("touchEnd",function(event){
            this.pp.setPosition(0,0)    
            this.player.getComponent(Player).setSpeed(0,0)
        },this)

        this.node.on("createBullet",function(event){
            if (this.isPause == false){
            var data = event.getUserData()
            this.fightLayer.createObject(3,data[1],data[2]);}
        },this)

        this.node.on("setSpeed",function(event){
            if (this.isPause == false){
                var data = event.getUserData() 
                this.player.getComponent(Player).setSpeed(data[1],data[2])
            }
        },this)

        this.node.on("objCreate",function(event){
            var data = event.getUserData()
            this.fightLayer.createObject(data[0],data[1],data[2],data[3])           
        },this)

        this.node.on("objDestory",function(event){
            var data = event.getUserData()
            this.fightLayer.destroyObject(data[0],data[1])
        },this)

        this.node.on("addScore",function(event){
            var data = event.getUserData()
            this.player.getComponent(Player).addScore(data)
        },this)
        this.node.on("shoot",function(event){
            if (this.isPause == false){
                this.player.getComponent(Player).onShoot()}
        },this)

        this.node.on("shield",function(event){
            if (this.isPause == false){
            this.player.getComponent(Player).onShield()}
        },this)

        this.node.on("speedup",function(event){
            if (this.isPause == false)
            {
                this.worldSpeedState = 2
                this.player.getComponent(Player).onSpeedUp()}
        },this)
        this.node.on("speeddown",function(event){
            if (this.isPause == false)
            {
                this.worldSpeedState = 1
                this.player.getComponent(Player).onSpeedUp()}
        },this)

        this.node.on("chargestart",function(event){
            this.player.getComponent(Player).onChargeStart()
        },this)

        this.node.on("chargeend",function(event){
            this.player.getComponent(Player).onChargeEnd()
        },this)

        //科技界面
        this.node.on("tech_open",function(event){
            this.tech.active = true
            this.pause()
        },this)
        this.node.on("tech_close",function(event){
            this.tech.active = false
            this.resume()
        },this)
        this.node.on("openBtn",function(event){

        },this)

        this.node.on("gameover",function(event){
            this.gameover.active = true
            this.pause()
        },this)

        this.node.on("restart",function(event){
            this.gameover.active = false
            this.reStart()
        },this)

        //屏幕适配
        let windowSize=cc.view.getVisibleSize();
        this.winHeight = windowSize.height
        this.winWidth = windowSize.width
        this.upNode.y = this.winHeight/2
        this.downNode.y = -this.winHeight/2
    },

    start () {
        this.init()
    },
    reStart(){
        this.clear()
        this.init()
    },

    init () {
        //世界速度
        this.worldSpeed = 2;
        this.worldSpeedState = 1;

        //里程
        this.mileage = 0;
        //刷怪循环次数
        this.loopTimes = 1;
        this.countPerLoop = 6;
        this.batchList = new Array(0,0,0,0,0,0)
        this.mapHeight = 1280
        //陨石批次
        this.stoneBatch = 0
        //初始化地图位置
        this.map1.y = (this.mapHeight - this.winHeight)/2      
        this.map2.y = this.winHeight/2+this.mapHeight/2+(this.mapHeight - this.winHeight)

        this.isPause = true
        this.tech.active =  true
    },

    clear(){
        //重置玩家位置
        this.player.getComponent(Player).reStart()
        //清空战斗层
        this.fightLayer.reStart()
        //清空科技界面
    },

    pause () {
        this.isPause = true
        this.fightLayer.pause()
        this.player.getComponent(Player).pause()
    },
    resume() {
        this.isPause = false
        this.fightLayer.resume()
        this.player.getComponent(Player).resume()
    },

    //更新背景
    updateMapLayer()
    {
        this.map1.y -= this.worldSpeed
        this.map2.y -= this.worldSpeed
        if (this.map1.y <= (-this.winHeight/2 -this.mapHeight/2))
        {
            this.map1.y = this.winHeight/2+this.mapHeight/2+(this.mapHeight - this.winHeight)
        }
        if (this.map2.y <= (-this.winHeight/2-this.mapHeight/2))
        {
            this.map2.y = this.winHeight/2+this.mapHeight/2+(this.mapHeight - this.winHeight)
        }
    },
    //更新里程，刷怪，每350整像素检测一次刷怪
    updateMileage()
    {
        this.mileage += this.worldSpeed
        var batch = Math.floor(this.mileage/300) + 1
        //batch = batch-((this.loopTimes-1) *this.countPerLoop)
        if (this.stoneBatch !== batch)
        {
            this.stoneBatch = batch
            var count =  Math.floor(Math.random()*4) + 1
            console.log("@@@count is UUU>>>",count);
            
            for(var i = 1;i < count;i++)
            {
                var x = Math.floor(Math.random()*440) + 100
                var y = Math.floor(Math.random()*400) + 50
                var scale = (10 - Math.floor(Math.random()*7))/10
                this.fightLayer.createObject(Item.Stone,x,this.winHeight+y,scale);
                this.batchList[batch] = this.loopTimes
            }
        }
    },
    //更新世界速度
    updateWorldSpeed()
    {
        if (this.worldSpeedState == 1)
        {
            this.worldSpeed -= 0.05
            this.worldSpeed = this.worldSpeed < 2 ? 2 : this.worldSpeed
        }
        else if(this.worldSpeedState == 2)
        {
            this.worldSpeed += 0.05
            this.worldSpeed = this.worldSpeed >10 ? 10 : this.worldSpeed
        }
        this.fightLayer.setWorldSpeed(this.worldSpeed)    
    },

    update (dt) {
       if (this.isPause === false){
            this.updateMapLayer()
            this.updateMileage()
            this.updateWorldSpeed()
       }
    },
});
