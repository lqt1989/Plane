// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var TechData = require("Constant").Tech
var Player = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
        techItem:{
            type:cc.Prefab,
            default:null,
        },
        techDes:{
            type:cc.Node, 
            default:null,
        },
        lbl_des:{
            type:cc.Node,
            default:null 
        },
        lbl_active:{
            type:cc.Node,
            default:null,
        },
        btn_active:{
            type:cc.Node,
            default:null
        },
        lbl_surplus:{
            type:cc.Label,
            default:null,
        },
        player:{
            type:Player,
            default:null,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.techItemList = new Array()  
        for (var i = 1;i <= 16;i++){
            var obj = cc.instantiate(this.techItem);
            obj.getComponent("TechItem").setData(TechData[i])
            obj.parent = this.node 
            this.techItemList[i] = obj
        }

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            log("@@11111")
            this.techDes.active = false
        },this)
        this.node.on("showTech",function(event){
            var data = event.getUserData()
            this.showTechDes(data)
        },this)
        this.node.on("tech_active_id",function(event){
            this.activeTech(this.selectId)
            this.techDes.active = false
        },this)

        this.techDes.zIndex = 2
    },

    start () {
        this.init()
    },

    init(){
        this.techCount = 10   //剩余科技点
        this.techList = new Array()  

        this.refreshTech()
        this.lbl_surplus.string = "当前剩余科技点："+this.techCount
    },
    //刷新科技
    refreshTechItem(id){
        var obj = this.techItemList[id]
        if (this.isActiveTech(id))
        {
            obj.getChildByName("icon").getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL)
           //obj.getComponent("TechItem").setSelect()
           this.node.getComponent("Utils").addSelect(obj)
        }
        else
        {
            this.node.getComponent("Utils").removeSelect(obj)
            //obj.getComponent("TechItem").setSelect()
            if (this.canBeActiveTech(id) === 2)
            {obj.getChildByName("icon").getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL)}
            else{
                obj.getChildByName("icon").getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY)
            }
        }
    },
    //刷新科技树
    refreshTech(){
        for(var i = 1;i <= 16; i ++)
        {
            this.refreshTechItem(i)
        }
    },
    //激活某个科技
    activeTech(id){
        if (TechData.hasOwnProperty(id))
        {
            this.techList[id] = true
            if (TechData[id].m_type == 1)
            {
                //刷新科技按钮
                var Custom_Event = new cc.Event.EventCustom("openBtn",true)
                this.node.dispatchEvent(Custom_Event)  

                var param = TechData[id].param
                this.player.setTechValue(param[0],param[1])
                
            }
            else if(TechData[id].m_type == 2)
            {
                //设置玩家属性
                var param = TechData[id].param
                this.player.setTechValue(param[0],param[1])
            }
            else if(TechData[id].m_type == 3)
            {

            }
            this.refreshTech()

            this.techCount -= 1
            this.lbl_surplus.string = "当前剩余科技点："+this.techCount
        }
    },
    //科技是否激活
    isActiveTech(id){
        if (this.techList.hasOwnProperty(id))
        {
            return true
        }
        else 
        {
            return false 
        }
    },
    //科技可否激活： 1.已激活 2.可激活 3.不可激活 4.被斥
    canBeActiveTech(id){
        if (this.isActiveTech(id))
        {
            return 1
        }
        else{
            var needId = TechData[id].needId
            if (needId[0] === 0 || this.isActiveTech(needId[0])|| this.isActiveTech(needId[1]))
            {
                // if (TechData[id].repel === null ||  !this.isActiveTech(TechData[id].repel))
                //     return 2
                // else 
                //     return 4
                return 2
            }
            else
            {
                return 3
            }
        }

    },
    //显示科技说明
    showTechDes(data){
        var archx
        if (data.x < 0)
            {archx = 1}
        else 
            {archx = -1}
        var archy 
        if (data.y <0)
           {archy = 1}
        else 
            {archy = -1}
  
        this.techDes.active = true
        this.techDes.position = new cc.Vec2(data.x + archx*180,data.y + archy*240)

        this.selectId = data.id
        var state = this.canBeActiveTech(this.selectId)

        if (this.techCount <= 0)
        {
            this.btn_active.active= false 
            this.lbl_active.active = true
            this.lbl_active.getComponent(cc.Label).string = "当前科技点不足"
        }
        else 
        {
            if (state === 1){
                this.lbl_active.active = true
                this.lbl_active.getComponent(cc.Label).string = "已激活"
                this.btn_active.active = false
            }else if (state === 2){
                this.btn_active.active = true
                this.lbl_active.active = false 
            }else if (state === 3){
                this.btn_active.active= false 
                this.lbl_active.active = true
                this.lbl_active.getComponent(cc.Label).string = "需激活前置科技"
            }
            else if (state === 4){
                this.btn_active.active= false 
                this.lbl_active.active = true
                this.lbl_active.getComponent(cc.Label).string = "互斥科技已激活"
            }
        }
        this.lbl_des.getComponent(cc.Label).string = data.name
    },

    reStart(){
        this.start()
    },
    // update (dt) {},
});
