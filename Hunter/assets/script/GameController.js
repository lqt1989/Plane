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
        },

        UpNode:{
            default:null,
            type:cc.Node,
        },

        downNode:{
            default:null,
            type:cc.Node,
        },

        WinHeight:0,
        WinWidth:0,

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

        let windowSize=cc.view.getVisibleSize();
        this.WinHeight = windowSize.height
        this.WinWidth = windowSize.width

        this.UpNode.y = this.WinHeight/2
        this.downNode.y = -this.WinHeight/2

        cc.log("width="+windowSize.width+",height="+windowSize.height);

    },

    start () {
        cc.log("WinHeight="+this.WinHeight+",WinWidth="+this.WinWidth);
    },

    // update (dt) {},
});
