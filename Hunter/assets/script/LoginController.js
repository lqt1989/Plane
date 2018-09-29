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
        help:{
            type:cc.Node,
            default:null,
        },
        btn:{
            type:cc.Node,
            default:null,
        },
        name:"logunctrl"
    },

    // LIFE-CYCLE CALLBACKS:

    addLabel(parent,str){
        var node = new cc.Node('Label');
        var lbl = node.addComponent(cc.Label);
        lbl.string = str
        lbl.fontSize = 32
        node.anchorY = 0.5
        node.parent = parent
    },

    onLoad () {
        this.node.on("start",function(event){
            cc.director.loadScene("GameScene");
        })

        this.node.on("help",function(event){
            this.help.active = true
        },this)

        this.node.on("understand",function(event){
            this.help.active = false
        },this)



    },

    start () {
        



    },

    // update (dt) {},
});
