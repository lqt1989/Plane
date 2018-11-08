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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;

        //触摸滑动
        this.node.on("createBullet",function(event){
            if (this.isPause == false){
            var data = event.getUserData()
            this.fightLayer.createObject(3,data[1],data[2]);}
        },this)

        //重力感应
        this.node.on("speedupdate",function(event){
            if (this.isPause == false){
            var data = event.getUserData()           
            this.player.getComponent(Player).setSpeed(-Math.floor(data.x*20),-Math.floor((data.y-0.5)*20))}
        },this)

        //物体销毁
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
        this.node.on("addhp",function(event){
            if (this.isPause == false){
            this.player.getComponent(Player).onAddHp()}
        },this)
        this.node.on("shield",function(event){
            if (this.isPause == false){
            this.player.getComponent(Player).onShield()}
        },this)
        this.node.on("speedup",function(event){
            if (this.isPause == false)
            {
                this.player.getComponent(Player).onSpeedUp()}
                this.worldSpeed += 1
                this.fightLayer.setWorldSpeed(this.worldSpeed)
        },this)
        this.node.on("charge",function(event){
            if (this.isPause == false){
            this.player.getComponent(Player).onCharge()}
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
        this.worldSpeed = 1;
        //里程
        this.mileage = 0;
        //刷怪循环次数
        this.loopTimes = 1;
        this.countPerLoop = 6;
        this.batchList = new Array(0,0,0,0,0,0)
        //this.setWorldSpeed(0);
        this.mapHeight = 1280
        //初始化地图位置
        this.map1.y = (this.mapHeight - this.winHeight)/2      
        this.map2.y = this.winHeight/2+this.mapHeight/2+(this.mapHeight - this.winHeight)
        this.isPause = false
    },

    clear(){
        //重置玩家位置

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

    setWorldSpeed(speed){
        //this.m_camera.getComponent(WorldCamera).setWorldSpeed(speed);
        //this.player.getComponent(Player).setWorldSpeed(speed);
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
        var batch = Math.floor(this.mileage/350)
        batch = batch-((this.loopTimes-1) *this.countPerLoop)
        //console.log("@@@batch is >>>",batch);
        
        if (this.batchList.hasOwnProperty(batch)) 
        {   
            if(this.batchList[batch] !== this.loopTimes)
            {
                var x = Math.floor(Math.random()*440) + 100
                var y = Math.floor(Math.random()*200)
                this.fightLayer.createObject(1,x,this.winHeight+y);
                this.batchList[batch] = this.loopTimes
            }
        }
        else
        {
            this.loopTimes += 1;
        }
    },

    update (dt) {
       if (this.isPause === false){
            this.updateMapLayer()
            this.updateMileage()
       }
    },
});
