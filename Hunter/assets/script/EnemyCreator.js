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

    checkCreateSequeue(){
        

    },

    //传参：1.类型 2.顺位 3.难度
    createEnemy(index,x,y,ai){
        var Custom_Event = new cc.Event.EventCustom("objCreate",true)
        var data = new Array(3)
        data[0] = index
        data[1] = x
        data[2] = y
        data[3] = ai
        Custom_Event.setUserData(data)
        this.node.dispatchEvent(Custom_Event)

    },

    createEnemySequence(index,num){
        log("@@@@@==================create star!!!!!")
        switch(index){
            case 1:
                this.leftToRight(num);
            case 2:

            case 3:

            default:
                break;
        }

    },

    leftToRight(count)
    {
        var t = new Array();     
        if(count >= 1)
        { 
            for(var i = 0; i < count ; i ++)
            {
                var action1 = cc.callFunc(function(){this.createEnemy(Constant.Objs.Enemy_1,-10,650,1)},this)
                t.push(action1)
                var action2 = cc.delayTime(0.5)
                t.push(action2)
            }
            var action = cc.sequence(t)
            this.node.runAction(action)
        }
    }

});
