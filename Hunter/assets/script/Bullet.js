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
        this.idx_type = 0 
        this.addSpeed = 0.5
        this.node.getComponent("Nature").atk = 3
    },

    start () {
        this.speed = 1
        this.mileage = 0
    },

    reuse(){
        this.speed = 1
        this.mileage = 0
    },

    onCollisionEnter: function (other, self) {
        //console.log('bullet collision enter',other.node.getComponent("Nature").atk);
        this.node.parent.getComponent("FightLayer").createObject(2,this.node.x,this.node.y)
        this.node.parent.getComponent("FightLayer").destroyObject(this.node,this.idx_type) 
    },

    update (dt) {
        this.speed += this.addSpeed
        this.node.y += this.speed;
        this.mileage += this.speed
    
        if (this.mileage >= 1350)
        {
            this.node.parent.getComponent("FightLayer").destroyObject(this.node,this.idx_type) 
        }
    },
});

