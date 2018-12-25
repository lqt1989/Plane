// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Constant = require("Constant")
cc.Class({
    extends: cc.Component,

    properties: {

    },


    start () {

    },

    init (){
        this.createSequeue = new Array();
        this.createPos = {
            1:{x:-10,y:500},
            2:{x:650,y:500},
        }
    },


    createEnemySequence(index,hard){
        log("@@@@@@@@@@@@@+================createEnemySequence!!!!========================")
        switch(index){
            case 1:
                this.createEnemy1(1,1,hard);
                break;
            case 2:
                this.createEnemy1(1,2,hard);
                break;
            case 3:

                break;
            default:
                break;
        }

    },

    getRefreshPoint(direction)
    {
        var x
        var y = Math.random()*350 + 350
        if(direction === 1)
        {
            x = -60
        }
        else{
            x = 700
        }
        return cc.p(x,y)
    },

    //direction:1左2右
    //小型敌人
    createEnemy1(actionType,direction,hard){
        var p = this.getRefreshPoint(direction)
        var count = Math.floor(hard/2) + 4    
        var t = new Array();

        var x1 = Math.random() * 150 - 75 + 320
        var y1 = Math.random() * 550 + 250
        var p1 = cc.p(x1,y1)

        var x2 = 700
        var y2 = Math.random() * 350 + 350
        var p2 = cc.p(x2,y2)

        for(var i = 0; i < count ; i ++)
        {          
           var action1 = cc.callFunc(function(){this.createEnemy(Constant.Objs.Enemy_1,p.x,p.y,actionType,direction,hard,p1,p2)},this)
            t.push(action1)
            var action2 = cc.delayTime(1)
            t.push(action2)
        }
        var action = cc.sequence(t)
        this.node.runAction(action)
    },



     //传参：1.类型 2.顺位 3.难度
     createEnemy(index,x,y,actionType,direction,hard,p1,p2){
        var Custom_Event = new cc.Event.EventCustom("objCreate",true)
        var param = new Array(5)
        param[0] = actionType
        param[1]= direction
        param[2]= hard
        param[3]= p1
        param[4] = p2

        var data = new Array(8)
        data[0] = index
        data[1] = x
        data[2] = y
        data[3] = param

        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)
    }, 


});
