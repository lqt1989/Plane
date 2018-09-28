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
        player:{
            default:null,
            type:cc.Node,
        },
        fightLayer:{
            default:null,
            type:FightLayer,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("return",function(event){
            cc.director.loadScene("LoginScene");
        },this)

        //触摸滑动
        this.node.on("createBullet",function(event){
            var data = event.getUserData()
            this.fightLayer.createrButtle(data[1],data[2]);
        },this)

        //重力感应
        this.node.on("speedupdate",function(event){
            var data = event.getUserData()           
            this.player.getComponent(Player).setSpeed(-Math.floor(data.x*20),-Math.floor((data.y-0.5)*20))
        },this)

        //摇杆输入命令
        this.node.on("rocker_start",function(event){
        },this)
        this.node.on("rocker_move",function(event){
            var data = event.getUserData()
            var speedX = data[1]/8
            var speedY = data[2]/8          
            this.player.getComponent(Player).setSpeed(speedX,speedY)
        },this)
        this.node.on("rocker_end",function(event){
            this.player.getComponent(Player).setSpeed(0,0)
        },this)
    },

    start () {

    },

    // update (dt) {},
});
