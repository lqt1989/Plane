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

        this.node.on("speedupdate",function(event){
            var data = event.getUserData()
            this.player.getComponent(Player).setSpeed(Math.floor(data.x*5),Math.floor(data.y*5))
        },this)

        this.node.on("bulltea",function(event){
            var data = event.getUserData()
            this.fightLayer.createrButtle(data[1],data[2]);

        },this)

        //摇杆开始
        this.node.on("recker_start",function(event){
            var data = event.getUserData()
            var speedX = data[1]/8
            var speedY = data[2]/8
            console.log("@@@data is >>===================>>".data[1],data[2]);
            console.log("@@@x y is >>===================>>".speedX,speedY);
            
            this.player.getComponent(Player).setSpeed(speedX,speedY)
        },this)
        this.node.on("recker_move",function(event){

        })
        this.node.on("recker_end",function(event){

        })
    },

    start () {

    },

    // update (dt) {},
});
