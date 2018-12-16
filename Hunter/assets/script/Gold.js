// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Constant = require("Constant")
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    initData (idx){
        this.idx_type = idx
        this.node.getComponent("Nature").idx_type =  this.idx_type  
    },
    setWorldSpeed(sp){
        this.speed = sp 
    },
    start () {
        this.init()  
    },
    reuse(){
        this.init()
    },

    pause(){
        log("@@@@@@@@pause!!!!!!")
        this.isPause = true
    },
    resume(){
        this.isPause = false
    },
    init(){
        this.isPause = false
    },

    update (dt) {
        if (this.isPause === false)
        {
            this.node.y -= this.speed
            this.mileage += this.speed
            if (this.mileage >= 1800)
            {
                this.destorySelf()
            }
        }
    },

    onCollisionEnter: function (other, self) {  
        //this.node.getComponent(cc.ProgressBar).progress = this.hp/this.maxHp
        if (other.node.getComponent("Nature").idx_type != Constant.Objs.Bullet_1 &&
        other.node.getComponent("Nature").idx_type != Constant.Objs.Bullet_2)    
        this.destorySelf()   
    },

    destorySelf(){
        this.node.stopAllActions()
        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
    },

});
