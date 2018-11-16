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
        techItem:{
            type:cc.Prefab,
            default:null,
        },
        techDes:{
            type:cc.Node, 
            default:null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //m_type:1.开启科技按钮  2.更改玩家属性  3.特殊判断
        this.data = new Array()
        this.data[1] = {des:"机枪激活",icon:"tech_1", x:-180,y:250,  m_type:1,}
        this.data[2] = {des:"火力强化1",icon:"tech_2",x:-60, y:250,  m_type:2,}
        this.data[3] = {des:"火力强化2",icon:"tech_3",x:60,  y:250,  m_type:2,}
        this.data[4] = {des:"弹药收集",icon:"tech_4", x:-60, y:150,  m_type:3,}
        this.data[5] = {des:"弹匣扩容",icon:"tech_1", x:60,  y:150,  m_type:2,}

        this.data[6] = {des:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,}
        this.data[7] = {des:"充能冷却缩减1",icon:"tech_3",x:-60,y:50,m_type:2,}
        this.data[8] = {des:"充能冷却缩减2",icon:"tech_4",x:60,y:50, m_type:2,}
        this.data[9] = {des:"急冷",icon:"tech_1",x:180,y:50,        m_type:2,}

        this.data[10] = {des:"激活护盾",icon:"tech_2",x:-180,y:-50,    m_type:1,}
        this.data[11] = {des:"护盾冷却缩减1",icon:"tech_3",x:-60,y:-50,m_type:2,}
        this.data[12] = {des:"护盾冷却缩减2",icon:"tech_4",x:60,y:-50, m_type:2,}
        this.data[13] = {des:"爆破",icon:"tech_1",x:180,y:-50,        m_type:3,}

        this.data[14] = {des:"激活加速",icon:"tech_2",x:-180,y:-150,   m_type:1,}
        this.data[15] = {des:"燃料收集",icon:"tech_3",x:-60,y:-150,    m_type:3,}

        this.data[16] = {des:"激活修理",icon:"tech_4",x:-180,y:-250,   m_type:1,}
        this.data[17] = {des:"强化装甲",icon:"tech_1",x:-60,y:-250,    m_type:2,}

 
        for (var i = 1;i <= 17;i++){
            var obj = cc.instantiate(this.techItem);
            obj.getComponent("TechItem").setData(this.data[i])
            obj.parent = this.node 
        }

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            this.techDes.active = false
        },this)
        this.node.on("showTech",function(event){
            var data = event.getUserData()
            this.showTechDes(data)
        },this)

        this.techDes.zIndex = 2
    },

    start () {
        this.init()
    },

    init(){
        this.techCount = 0 //已激活科技
        this.techList = new Array()  
    },

    addTech(id){
        if (this.data.hasOwnProperty[id])
        {
            this.techList.push(id)
            if (this.data[id].m_type == 1)
            {
                //刷新科技按钮
            }
        }
    },

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
    }

    // update (dt) {},
});
