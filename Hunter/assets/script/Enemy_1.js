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

    onLoad () {
        this.maxHp = 50
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
        this.hp = 15
        this.mileage = 0
        this.node.zIndex= 9
        
        //this.updateState = false
    },

    onCreate(){
        this.nature = this.node.getComponent("Nature")
        this.nature.init()
        this.speed =  this.nature.speed
        this.actionType =  this.nature.param[0]    
        this.direction = this.nature.param[1]
        this.hard = this.nature.param[2]
        //this.param = this.nature.param
        console.log("@@@actionType is",this.actionType);
        
        this.doAction(this.actionType)

    },

    doAction(type)
    {
        switch(type){
            case 1:
                this.drift()
                break;
            case 2:
                this.drift()
                break;
            case 3:
                this.drift()
                break;
            case 4:
                this.fixedPoint()
                break;
            default:
                break;
        }
    },

    //折角
    breakAngle(direction,hard){
        var x1 = this.nature.param[3].x
        var y1 = this.nature.param[3].y
        var x2 = this.nature.param[4].x
        var y2 = this.nature.param[4].y
              
        var action = cc.sequence(cc.callFunc(function(){this.moveToPoint(1.5,x1,y1)},this),
        cc.delayTime(2),
        cc.callFunc(function(){this.moveToPoint(1.5,x2,y2)},this),
        cc.delayTime(2),
        cc.callFunc(function(){this.destorySelf()},this))
        this.node.runAction(action)
    },
    //直线
    straightLine(direction,hard){
        var x2 = this.nature.param[4].x
        var y2 = this.nature.param[4].y
        var action = cc.sequence(cc.callFunc(function(){this.moveToPoint(3.5,x2,y2)},this),cc.delayTime(4),cc.callFunc(function(){this.destorySelf()},this))
        this.node.runAction(action)
    },
    //漂移进场
    drift(direction,hard){
        var x2 = 600
        var y2 = this.nature.param[4].y
        var action = cc.sequence(cc.callFunc(function(){this.moveToPoint(3.5,x2,y2)},this),cc.delayTime(4),cc.callFunc(function(){this.destorySelf()},this))
        this.node.runAction(action)
    },
    //定点
    fixedPoint(direction,hard){

    },

    moveToPoint(t,x,y)
    {
        var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
        var target_world = this.node.convertToWorldSpaceAR(cc.v2(x,y));
        var temp_vector = target_world.sub(self_world);
        var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
        this.node.rotation -= temp_angleDegrees;       
        this.node.runAction(cc.moveTo(t,x,y))  
    },

    doShoot()
    {
        var action = cc.repeatForever(cc.sequence(cc.delayTime(2),cc.callFunc(function(){

        },this)))
        this.node.runAction(action)
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
        var Custom_Event = new cc.Event.EventCustom("objDestory",true)
        var data = new Array(2)
        data[0] = this.node
        data[1] = this.nature.idx_type
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
        this.node.stopAllActions()
        log("@@@destory!!!!!!!!!")
    },

    update (dt) {
        // if (this.updateState === true)
        // {
            if(this.actionType === 3)
            {
                var self_world = this.node.convertToWorldSpaceAR(this.node.getPosition());
                var target_world = this.node.convertToWorldSpaceAR(this.player.getPosition())
                var temp_vector = target_world.sub(self_world);
                var temp_angleDegrees = temp_vector.signAngle(cc.v2(0,1)) / Math.PI * 180;
                this.node.rotation -= temp_angleDegrees; 
            }
        //}
    },
});
