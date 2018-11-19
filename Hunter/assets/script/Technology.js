// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Utils = require("Utils")
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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //m_type:1.开启科技按钮  2.更改玩家属性  3.特殊判断
        this.data = new Array()
        this.data[1] = {id:1,des:"机枪激活",icon:"tech_1", x:-180,y:250,  m_type:1,needId:0}
        this.data[2] = {id:2,des:"火力强化1",icon:"tech_2",x:-60, y:250,  m_type:2,needId:1}
        this.data[3] = {id:3,des:"火力强化2",icon:"tech_3",x:60,  y:250,  m_type:2,needId:2}
        this.data[4] = {id:4,des:"弹药收集",icon:"tech_4", x:-60, y:150,  m_type:3,needId:3}
        this.data[5] = {id:5,des:"弹匣扩容",icon:"tech_1", x:60,  y:150,  m_type:2,needId:4}

        this.data[6] = {id:6,des:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0}
        this.data[7] = {id:7,des:"充能冷却缩减1",icon:"tech_3",x:-60,y:50,m_type:2,needId:6}
        this.data[8] = {id:8,des:"充能冷却缩减2",icon:"tech_4",x:60,y:50, m_type:2,needId:7}
        this.data[9] = {id:9,des:"急冷",icon:"tech_1",x:180,y:50,        m_type:2,needId:8}

        this.data[10] = {id:10,des:"激活护盾",icon:"tech_2",x:-180,y:-50,    m_type:1,needId:0}
        this.data[11] = {id:11,des:"护盾冷却缩减1",icon:"tech_3",x:-60,y:-50,m_type:2,needId:10}
        this.data[12] = {id:12,des:"护盾冷却缩减2",icon:"tech_4",x:60,y:-50, m_type:2,needId:11}
        this.data[13] = {id:13,des:"爆破",icon:"tech_1",x:180,y:-50,        m_type:3,needId:12}

        this.data[14] = {id:14,des:"激活加速",icon:"tech_2",x:-180,y:-150,   m_type:1,needId:0}
        this.data[15] = {id:15,des:"燃料收集",icon:"tech_3",x:-60,y:-150,    m_type:3,needId:14}

        this.data[16] = {id:16,des:"激活修理",icon:"tech_4",x:-180,y:-250,   m_type:1,needId:0}
        this.data[17] = {id:17,des:"强化装甲",icon:"tech_1",x:-60,y:-250,    m_type:2,needId:16}

 
        this.techItemList = new Array()  
        for (var i = 1;i <= 17;i++){
            var obj = cc.instantiate(this.techItem);
            obj.getComponent("TechItem").setData(this.data[i])
            obj.parent = this.node 
            this.techItemList[i] = obj
        }

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
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
        this.techCount = 0 //已激活科技
        this.techList = new Array()  

        this.refreshTech()
    },
    //刷新科技
    refreshTechItem(id){

        var obj = this.techItemList[id]
        if (this.isActiveTech(id))
        {
            obj.getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL)
           //obj.getComponent("TechItem").setSelect()
            Utils.addSelect(obj)
        }
        else
        {
            Utils.removeSelect(obj)
            //obj.getComponent("TechItem").setSelect()
            if (this.canBeActiveTech(id) === 2)
            {obj.getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL)}
            else{
                obj.getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY)
            }
        }
    },
    //刷新科技树
    refreshTech(){
        for(var i = 1;i <= 17; i ++)
        {
            this.refreshTechItem(i)
        }
    },
    //激活某个科技
    activeTech(id){
        if (this.data.hasOwnProperty(id))
        {
            this.techList[id] = true
            if (this.data[id].m_type == 1)
            {
                //刷新科技按钮
            }

            this.refreshTech()
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
    //科技可否激活： 1.已激活 2.可激活 3.不可激活
    canBeActiveTech(id){
        if (this.isActiveTech(id))
        {
            return 1
        }
        else{
            var needId = this.data[id].needId
            if (needId === 0 || this.isActiveTech(needId))
            {
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
        this.lbl_des.getComponent(cc.Label).string = data.des
    }

    // update (dt) {},
});
