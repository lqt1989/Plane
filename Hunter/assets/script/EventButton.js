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
        event:"",      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "EventButton";//这个是代码文件名
        // clickEventHandler.handler = "callback";
        // clickEventHandler.customEventData = this.event;

        // var button = this.node.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);


        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log("TOUCH_START")
            this.node.dispatchEvent(new cc.Event.EventCustom(this.event, true));
        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log("TOUCH_MOVE")
        },this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log("TOUCH_END")
        },this);

    },

    // callback (event, customEventData) {
    //     this.node.dispatchEvent(new cc.Event.EventCustom(this.event, true));
    // },

    // update (dt) {

    // },
});
