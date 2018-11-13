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
        this.data = new Array()
        this.data[1] = {des:"John",icon:"tech_1",x:-180,y:250}
        this.data[2] = {des:"John",icon:"tech_2",x:-60,y:250}
        this.data[3] = {des:"John",icon:"tech_3",x:60,y:250}
        this.data[4] = {des:"John",icon:"tech_4",x:180,y:250}

        this.data[5] = {des:"John",icon:"tech_1",x:-180,y:150}
        this.data[6] = {des:"John",icon:"tech_2",x:-60,y:150}
        this.data[7] = {des:"John",icon:"tech_3",x:60,y:150}
        this.data[8] = {des:"John",icon:"tech_4",x:180,y:150}

        this.data[9] = {des:"John",icon:"tech_1",x:-180,y:50}
        this.data[10] = {des:"John",icon:"tech_2",x:-60,y:50}
        this.data[11] = {des:"John",icon:"tech_3",x:60,y:50}
        this.data[12] = {des:"John",icon:"tech_4",x:180,y:50}

        this.data[13] = {des:"John",icon:"tech_1",x:-180,y:-50}
        this.data[14] = {des:"John",icon:"tech_2",x:-60,y:-50}
        this.data[15] = {des:"John",icon:"tech_3",x:60,y:-50}
        this.data[16] = {des:"John",icon:"tech_4",x:180,y:-50}

        this.data[17] = {des:"John",icon:"tech_1",x:-180,y:-150}
        this.data[18] = {des:"John",icon:"tech_2",x:-60,y:-150}
        this.data[19] = {des:"John",icon:"tech_3",x:60,y:-150}
        this.data[20] = {des:"John",icon:"tech_4",x:180,y:-150}

        this.data[21] = {des:"John",icon:"tech_1",x:-180,y:-250}
        this.data[22] = {des:"John",icon:"tech_2",x:-60,y:-250}
        this.data[23] = {des:"John",icon:"tech_3",x:60,y:-250}
        this.data[24] = {des:"John",icon:"tech_4",x:180,y:-250}
 
        for (var i = 1;i <= 24;i++){
            var obj = cc.instantiate(this.techItem);
            obj.getComponent("TechItem").setData(this.data[i])
            obj.parent = this.node 
        }

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            log("@@techview touch end!!")
            this.techDes.active = false
        },this)
        this.node.on("showTech",function(event){
            var data = event.getUserData()
            this.showTechDes(data)
        },this)

        this.techDes.zIndex = 2
    },

    start () {
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
        // this.techDes.anchorX = archx
        // this.techDes.anchorY = archy
        this.techDes.position = new cc.Vec2(data.x + archx*180,data.y + archy*240)
        console.log("@@x y is >>>",archx,archy);
    }

    // update (dt) {},
});
