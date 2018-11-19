// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Utils = {
    extends: cc.Component,

    properties: {
            },

    // onLoad () {},
        
    start:function() {

    },

    addSelect(pnode){
       cc.loader.loadRes("img_3", cc.SpriteFrame, function (err, spriteFrame) {
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame
            node.parent = pnode
        })
    },
    removeSelect(pnode)
    {
        pnode.destroyAllChildren()
    }
  
};
//Utils.addSelect();
module.exports = Utils;
