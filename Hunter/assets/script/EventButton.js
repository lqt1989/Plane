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
        startEvent:"",
        endEvent:"",      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.node.getComponent(cc.Button).interactable === true)
            {
            this.node.dispatchEvent(new cc.Event.EventCustom(this.startEvent, true));
            }
        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this.node.getComponent(cc.Button).interactable === true)
            {

            }
        },this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this.node.getComponent(cc.Button).interactable === true)
            {
            this.node.dispatchEvent(new cc.Event.EventCustom(this.endEvent, true));
            }
        },this);

    },

    // callback (event, customEventData) {
    //     this.node.dispatchEvent(new cc.Event.EventCustom(this.event, true));
    // },

    // update (dt) {

    // },
});
