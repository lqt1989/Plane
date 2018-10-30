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
var WorldCamera = require("WorldCamera");

cc.Class({
    extends: cc.Component,

    properties: {
        WinHeight:0,
        WinWidth:0,
        UpNode:{
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
        //主摄像机
        m_camera:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("return",function(event){
            cc.director.loadScene("LoginScene");
        },this)

        //触摸滑动
        this.node.on("createBullet",function(event){
            var data = event.getUserData()
            this.fightLayer.createrMissile(data[1],data[2]+this.m_camera.y);
        },this)

        //重力感应
        this.node.on("speedupdate",function(event){
            var data = event.getUserData()           
            this.player.getComponent(Player).setSpeed(-Math.floor(data.x*20),-Math.floor((data.y-0.5)*20))
        },this)

        //屏幕适配
        let windowSize=cc.view.getVisibleSize();
        this.WinHeight = windowSize.height
        this.WinWidth = windowSize.width
        this.UpNode.y = this.WinHeight/2
        this.downNode.y = -this.WinHeight/2
    },

    start () {
        this.setWorldSpeed(1);
    },
    pasue () {
        
    },
    resume() {

    },

    setWorldSpeed(speed){
        this.m_camera.getComponent(WorldCamera).setWorldSpeed(speed);
        this.player.getComponent(Player).setWorldSpeed(speed);
    },

    update (dt) {
        //检索坐标按批次生成敌人
    },
});
