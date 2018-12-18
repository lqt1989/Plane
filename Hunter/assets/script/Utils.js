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

    canSelect(pnode)
    {
        cc.loader.loadRes("img_rect", cc.SpriteFrame, function (err, spriteFrame) {
            var node = pnode.getChildByName("rect");
            node.getComponent(cc.Sprite).spriteFrame= spriteFrame
        })

        cc.loader.loadRes("img_arrow2", cc.SpriteFrame, function (err, spriteFrame) {
            var node = pnode.getChildByName("line").getChildByName("arrow")
            node.getComponent(cc.Sprite).spriteFrame= spriteFrame
        })
    },


    addSelect(pnode){
       cc.loader.loadRes("img_rect2", cc.SpriteFrame, function (err, spriteFrame) {
            var node = pnode.getChildByName("rect");
           node.getComponent(cc.Sprite).spriteFrame= spriteFrame
        })
        cc.loader.loadRes("img_arrow2", cc.SpriteFrame, function (err, spriteFrame) {
            var node = pnode.getChildByName("line").getChildByName("arrow")
            node.getComponent(cc.Sprite).spriteFrame= spriteFrame
        })
    },
    removeSelect(pnode)
    {
        if (pnode != null)
        {
            cc.loader.loadRes("img_rect", cc.SpriteFrame, function (err, spriteFrame) {
                var node = pnode.getChildByName("rect");
                node.getComponent(cc.Sprite).spriteFrame= spriteFrame
            })
            cc.loader.loadRes("img_arrow1", cc.SpriteFrame, function (err, spriteFrame) {
                var node = pnode.getChildByName("line").getChildByName("arrow")
                node.getComponent(cc.Sprite).spriteFrame= spriteFrame
            })
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
