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
        mapHeight:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("return",function(event){
            cc.director.loadScene("LoginScene");
        },this)

        //触摸滑动
        this.node.on("createBullet",function(event){
            var data = event.getUserData()
            this.fightLayer.createrMissile(data[1],data[2]);
        },this)

        //重力感应
        this.node.on("speedupdate",function(event){
            var data = event.getUserData()           
            this.player.getComponent(Player).setSpeed(-Math.floor(data.x*20),-Math.floor((data.y-0.5)*20))
        },this)

        //屏幕适配
        let windowSize=cc.view.getVisibleSize();
        this.WinHeight = windowSize.height
        console.log("@@@winheight is >>>>",this.WinHeight);
        this.upNode.y = this.WinHeight/2
        this.downNode.y = -this.WinHeight/2
    },

    start () {
        this.worldSpeed = 1;
        this.mileage = 0;
        //this.setWorldSpeed(0);
        
        //初始化地图位置
        this.map1.y = (this.mapHeight - this.WinHeight)/2      
        this.map2.y = this.WinHeight/2+this.mapHeight/2+(this.mapHeight - this.WinHeight)
    },
    pasue () {
        
    },
    resume() {

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
        if (this.map1.y <= (-this.WinHeight/2 -this.mapHeight/2))
        {
            this.map1.y = this.WinHeight/2+this.mapHeight/2+(this.mapHeight - this.WinHeight)
        }
        if (this.map2.y <= (-this.WinHeight/2-this.mapHeight/2))
        {
            this.map2.y = this.WinHeight/2+this.mapHeight/2+(this.mapHeight - this.WinHeight)
        }
    },
    //更新里程，刷怪，每100整像素检测一次刷怪
    updateMileage()
    {
        this.mileage += this.worldSpeed
    },

    update (dt) {
       this.updateMapLayer()
    },
});
