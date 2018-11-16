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
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "EventButton";//这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = this.event;

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    callback (event, customEventData) {
        this.node.dispatchEvent(new cc.Event.EventCustom(this.event, true));
    },

    pause() {

    },

    resume(){

    },

    start () {

    },
    //添加一个冷却计时，计时完成前，点击无效
    addCooldowm(sec){


    },
    //设置填充百分比
    setBarPercent(per){

    },
    // update (dt) {

    // },
});
