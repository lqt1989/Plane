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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            event.stopPropagation();
            this.sendata()
        },this)
    },

    start () {
        
    },

    sendata(){
        var Custom_Event = new cc.Event.EventCustom("showTech",true)
        Custom_Event.setUserData(this.data)
        this.node.dispatchEvent(Custom_Event)  
    },

    setData(data){
        this.data = data 
        
        this.node.x = this.data.x 
        this.node.y = this.data.y
        //this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.data.icon)
        if (this.data.needId[0] === 0)
        {
            this.node.getChildByName("line").active = false
        }
        else{
            this.node.getChildByName("line").active = true
            if (this.data.id === 5)
            {this.node.getChildByName("line").height = 100
            this.node.getChildByName("line").rotation = -60
            this.node.getChildByName("line").getChildByName("arrow").y = 75
                }
            else if(this.data.id === 2)
            {this.node.getChildByName("line").height = 100
            this.node.getChildByName("line").rotation = -120
            this.node.getChildByName("line").getChildByName("arrow").y = 75}
            else
            {
            this.node.getChildByName("line").rotation = -90
            this.node.getChildByName("line").getChildByName("arrow").y = 65
            }

        }

        var self = this
        cc.loader.loadRes(this.data.icon, cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
    },

    setSelect(){
        var self = this
        cc.loader.loadRes("img_3", cc.SpriteFrame, function (err, spriteFrame) {
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame
            node.parent = self.node
        })
    }
    // update (dt) {},
});
