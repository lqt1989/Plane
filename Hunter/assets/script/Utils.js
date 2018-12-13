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
        cooldown:{
            type:cc.Prefab,
            default:null,
        }
    },

    // onLoad () {},

    start () {

    },

    pause(){

    },
    resume(){

    },

    addSelect(pnode){
       cc.loader.loadRes("img_select", cc.SpriteFrame, function (err, spriteFrame) {
            var node = new cc.Node();
            node.name = "select"
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame
            node.x = 25
            node.y = 25
            node.parent = pnode
        })
    },
    removeSelect(pnode)
    {
        if (pnode != null)
        {
            var node = pnode.getChildByName("select")
            if (node != null)
            node.destroy()
        }
    },
  
    addCoolDown(node,time,img,callback)
    {
        var sp = new cc.SpriteFrame(img)
        var cooldown = cc.instantiate(this.cooldown)
        cooldown.getChildByName("bar").getComponent(cc.Sprite).spriteFrame = sp
        cooldown.parent = node

        cooldown.getComponent("Cooldown").setDelayCallback(time,callback,node)
              
    },

});
