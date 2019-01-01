var Constant = require("Constant")
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.maxHp = 6
        this.score = 3   
        this.player = cc.find("Canvas/FightLayer/Player");
    },
    start () {
        //this.init()  
    },
    reuse(){
        this.init()
    },
    init(){
        this.hp = 6
        this.mileage = 0
        this.node.zIndex= 9
        
        //this.updateState = false
    },

    onCreate(){
        this.nature = this.node.getComponent("Nature")
        this.nature.init()
        this.speed =  300
        this.actionType =  this.nature.param[0]    
        this.direction = this.nature.param[1]       //1左向右 2,右向左
        this.hard = this.nature.param[2]
        this.index = this.nature.param[3]
        //this.param = this.nature.param
        this.actionEnd = false

        
        //this.doAction(this.actionType)
        this.fixedPoint()
    },

    // doAction(type)
    // {
    //     switch(type){
    //         case 1:
    //             this.breakAngle()
    //             break;
    //         case 2:
    //             this.straightLine()
    //             break;
    //         case 3:
    //             this.drift()
    //             break;
    //         case 4:
    //             this.fixedPoint()
    //             break;
    //         default:
    //             break;
    //     }
    // },


    //定点
    fixedPoint(){
        var y = Math.random()*400 + 350
        var x;
        if(this.direction === 1)
        {
            x = Math.random()*160 + 50
        }
        if (this.direction === 2)
        {
            x = Math.random()*160 + 400
        }
        var action = cc.sequence(cc.callFunc(function(){this.moveToPoint(1.5,x,y)},this),cc.delayTime(0.5),
        cc.callFunc(function(){this.actionEnd = true},this),cc.delayTime(1),
        cc.callFunc(function(){this.runShoot()},this))
        this.node.runAction(action)
    },

    moveToPoint(t,x,y)
    {
        var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
        var target_world = this.node.convertToWorldSpaceAR(cc.v2(x,y));
        var temp_vector = target_world.sub(self_world);
        var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
        this.node.rotation -= temp_angleDegrees;   
        if (this.actionType === 4)
        {
            this.node.runAction(cc.moveTo(t,x,y))  
        } 
        else 
        {
            if(this.actionType === 3)
            {
                this.speed += 80               
            }
            var disX = x - this.node.x
            var disY = y - this.node.y
            var dis = Math.sqrt(disX*disX + disY*disY) 
            var t = dis/this.speed
            this.node.runAction(cc.moveTo(t,x,y))  
        }       
    },

    runShoot()
    {
        var action = cc.repeatForever(cc.sequence(cc.callFunc(function(){
            this.doShoot()
        },this),cc.delayTime(2)))
        this.node.runAction(action)
    },


    doShoot()
    {   
        var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
        var target_world = this.node.convertToWorldSpaceAR(this.player.getPosition())
        var temp_vector = target_world.sub(self_world);
        var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
        var target = this.node.rotation - temp_angleDegrees;  

        var Custom_Event = new cc.Event.EventCustom("objCreate",true)
        var data = new Array(4)
        data[0] = Constant.Objs.Bullet_4
        data[1] = this.node.x-(10*Math.sin(2*Math.PI/360*(target-90)))       
        data[2] = this.node.y-(10*Math.cos(2*Math.PI/360*(target-90)))
        data[3] = target
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)

        var Custom_Event2 = new cc.Event.EventCustom("objCreate",true)
        var data2 = new Array(4)
        data2[0] = Constant.Objs.Bullet_4
        data2[1] = this.node.x+(10*Math.sin(2*Math.PI/360*(target-90)))
        data2[2] = this.node.y+(10*Math.cos(2*Math.PI/360*(target-90)))
        data2[3] = target
        Custom_Event2.setUserData(data2)
        this.node.dispatchEvent(Custom_Event2)
    },


    onCollisionEnter: function (other, self) {   
        var atk = other.node.getComponent("Nature").atk
        if (atk)
        {
            this.hp -= atk 
            if (this.hp <= 0)
            {
                this.pushScore()
                var Custom_Event = new cc.Event.EventCustom("objCreate",true)
                var data = new Array(2)
                data[0] = 2
                data[1] = this.node.x
                data[2] = this.node.y
                Custom_Event.setUserData(data)
                this.node.dispatchEvent(Custom_Event)
                this.destorySelf()
            }
        }
    },

    pushScore(){
        var Custom_Event = new cc.Event.EventCustom("addScore",true)
        Custom_Event.setUserData(this.score)
        this.node.dispatchEvent(Custom_Event)
    },


    destorySelf(){
        var i = Math.random()*100
        
        if (i < 30)
        {
            var Custom_Event2 = new cc.Event.EventCustom("objCreate",true)
            var data2 = new Array(2)
            data2[0] = Constant.Objs.GoldIcon
            data2[1] = this.node.x
            data2[2] = this.node.y
            Custom_Event2.setUserData(data2)
            this.node.dispatchEvent(Custom_Event2)
        }

        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.nature.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
        this.node.stopAllActions()
    },

    updateRotation()
    {
        var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
        var target_world = this.node.convertToWorldSpaceAR(this.player.getPosition())
        var temp_vector = target_world.sub(self_world);
        var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
        var target = this.node.rotation - temp_angleDegrees;  
        if (this.node.rotation > target)
        {this.node.rotation-=2}
        else if(this.node.rotation < target)
        {this.node.rotation+=2}
    },
    updatePos()
    {
        this.node.y -= 1
    },

    update (dt) {
        if (this.actionEnd === true)
        {
            this.updateRotation()         
        }
    },
});
