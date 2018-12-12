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
        eventList:[],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);

        //1.上 2.下
        this.direction = 0
    
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            this.eventList[event.getID()] = event.getLocation()

            var Custom_Event = new cc.Event.EventCustom("touchStart",true)
                var location = event.getLocation() 
                Custom_Event.setUserData(location)
                this.node.dispatchEvent(Custom_Event)
        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            var Custom_Event = new cc.Event.EventCustom("touchMove",true)
            var location = event.getLocation() 
            Custom_Event.setUserData(location)
            this.node.dispatchEvent(Custom_Event)

            var y = event.getLocationY() 
            var p = this.eventList[event.getID()]
            if (this.direction === 0)
            {
                if (y - p.y > 0)
                {
                    this.direction = 1
                }
                else if(y - p.y < 0)
                {
                    this.direction = 2
                    var Custom_Event = new cc.Event.EventCustom("chargestart",true)
                    this.node.dispatchEvent(Custom_Event)
                }
            }
        },this)

        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            var y = event.getLocationY() 
            var p = this.eventList[event.getID()]

            if (this.direction === 1)
            {
                if (y - p.y > 50) {
                    var Custom_Event = new cc.Event.EventCustom("createMissile",true)
                    var data = new Array(3)
                    data[0] = event.getID()
                    data[1] = p.x
                    data[2] = p.y           
                    Custom_Event.setUserData(data)
                    this.node.dispatchEvent(Custom_Event)
                }
            }
            else if(this.direction === 2)
            {
                var Custom_Event = new cc.Event.EventCustom("chargeend",true)
                this.node.dispatchEvent(Custom_Event)
            }

            var Custom_Event2 = new cc.Event.EventCustom("touchEnd",true)
            this.node.dispatchEvent(Custom_Event2)
            this.direction = 0
        },this)

    },

    onDeviceMotionEvent (event) {
        if (cc.sys.isMobile)
        {
            var Custom_Event = new cc.Event.EventCustom("speedupdate",true)
            Custom_Event.setUserData(event.acc)
            this.node.dispatchEvent(Custom_Event)
        }
    },

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }, 


    start () {

    },

    // update (dt) {},
});
