var Constant = 
{
    Item:{
        Stone:1,
        Bullet:2,
    },

    //m_type:1.开启科技按钮  2.更改玩家属性  3.特殊判断
    Tech:{
        1:{id:1,name:"机枪激活",icon:"tech_1", x:-180,y:250,  m_type:1,needId:0},
        2:{id:2,name:"散射1",icon:"tech_2",x:-60, y:250,  m_type:2,needId:1},
        3:{id:3,name:"散射2",icon:"tech_3",x:60,  y:250,  m_type:2,needId:2},
        4:{id:4,name:"散射3",icon:"tech_4", x:-60, y:150,  m_type:3,needId:3},
        5:{id:5,name:"采集",icon:"tech_1", x:60,  y:150,  m_type:2,needId:4},
        6:{id:6,name:"无尽",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        7:{id:7,name:"弹药强化",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},

        8:{id:8,name:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        9:{id:9,name:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        10:{id:10,name:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        11:{id:11,name:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},

        12:{id:12,name:"轰炸",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        13:{id:13,name:"激活充能炮",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},

        14:{id:14,name:"护盾",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
        15:{id:15,name:"爆破",icon:"tech_2",x:-180,y:50,  m_type:1,needId:0},
    },
}
module.exports = Constant