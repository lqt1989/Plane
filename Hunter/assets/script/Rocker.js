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
        PP:{
            type:cc.Node,
            default:null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            var Custom_Event = new cc.Event.EventCustom("rocker_start",true)
            var location = this.node.convertToNodeSpaceAR(event.getLocation() )
            this.PP.setPosition(location.x,location.y)

            var data = new Array(2)
            data[1]=location.x
            data[2]=location.y
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)
            
        },this);
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            var Custom_Event = new cc.Event.EventCustom("setSpeed",true)
            var location = this.node.convertToNodeSpaceAR(event.getLocation() )

            // var x;
            // if (location.x >= -80 && location.x <= 80) 
            // {
            //     x = location.x
            // }
            // else if(location.x < -80)
            // {
            //     x = -80
            // }
            // else if(location.x > 80)
            // {
            //     x = 80
            // }

            // var y;
            // if (location.y >= -80 && location.y <= 80) 
            // {
            //     y = location.y
            // }
            // else if(location.y < -80)
            // {
            //     y = -80
            // }
            // else if(location.y > 80)
            // {
            //     y = 80
            // }

            var x = location.x
            var y = location.y
            var r = Math.sqrt(x*x + y*y)
            if (r >= 80)
            {
                x = x*80/r
                y = y*80/r
            }



            this.PP.setPosition(x,y)    

            var data = new Array(2)
            data[1]=x/15
            data[2]=y/15
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)
                       
        },this);
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            this.PP.setPosition(0,0) 
            var Custom_Event = new cc.Event.EventCustom("setSpeed",true)
            var data = new Array(2)
            data[1]=0
            data[2]=0
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)             
        },this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            this.PP.setPosition(0,0)   
            var Custom_Event = new cc.Event.EventCustom("setSpeed",true)
            var data = new Array(2)
            data[1]=0
            data[2]=0
            Custom_Event.setUserData(data)
            this.node.dispatchEvent(Custom_Event)                     
        },this);

    },

    start () {

    },

    // update (dt) {},
});
