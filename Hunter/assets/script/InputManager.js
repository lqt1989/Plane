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
        state:0,         //状态：0停止 1左 2右
        eventList:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);

        //触摸事件用数组保存
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            // console.log("@111111",event.getID())
            // console.log("@111111",event.getLocationX())
            var Custom_Event = new cc.Event.EventCustom("bulltea",true)
            var data = new Array(3)
            data[0]=event.getID()
            data[1]=event.getLocationX()
            data[2]=event.getLocationY()
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)


        },this);
        this.node.on("touchmove",function(event){
            console.log("@222")
        },this)
        this.node.on("touchend",function(event){
            console.log("@333")
        },this)

    },

    onDeviceMotionEvent (event) {

        var Custom_Event = new cc.Event.EventCustom("speedupdate",true)
        Custom_Event.setUserData(event.acc)
        this.node.dispatchEvent(Custom_Event)
    },

    onKeyUp(event){
        switch(event.keyCode) {
            case cc.KEY.a:
                //this.node.dispatchEvent(new cc.Event.EventCustom("stopleft", true));
                var Custom_Event = new cc.Event.EventCustom("stopleft",true)
                Custom_Event.setUserData(123)
                this.node.dispatchEvent(Custom_Event)
                break;
            case cc.KEY.d:
                this.node.dispatchEvent(new cc.Event.EventCustom("stopright", true));
                break;      
        }
    },

    onKeyDown(event){
        switch(event.keyCode) {
            case cc.KEY.a:
                this.node.dispatchEvent(new cc.Event.EventCustom("goleft", true));
                break;
            case cc.KEY.d:
                this.node.dispatchEvent(new cc.Event.EventCustom("goright", true));
                break;          
        }
    },

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }, 


    start () {

    },

    // update (dt) {},
});
