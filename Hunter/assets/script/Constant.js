var Constant = 
{
    Objs:{
        Bullet_1:1,
        Bullet_2:2,
        Stone:3,
        Boom:4,
        Missile:5,
    },

    //m_type:1.开启科技  2.更改玩家属性  3.特殊判断
    Tech:{
        1:{id:1,name:"机枪激活",icon:"tech_1", x:-195,y:270,  m_type:1,param:[0,1],needId:0},
        2:{id:2,name:"散射1",icon:"tech_2",    x:-65, y:270,  m_type:2,param:[0,3],needId:1},
        3:{id:3,name:"散射2",icon:"tech_3",x:65,  y:270,      m_type:2,param:[0,5],needId:2},
        4:{id:4,name:"散射3",icon:"tech_4", x:195, y:270,     m_type:2,param:[0,7],needId:3},

        5:{id:5,name:"贯通1",icon:"tech_5", x:-195,  y:140,    m_type:2,param:[0,2],needId:1},
        6:{id:6,name:"贯通2",icon:"tech_6",x:-65,y:140,        m_type:2,param:[0,4],needId:5},
        7:{id:7,name:"贯通3",icon:"tech_7",x:65,y:140,       m_type:2,param:[0,6],needId:6},
        8:{id:8,name:"高能弹药",icon:"tech_8",x:195,y:140,      m_type:1,param:[3],needId:0},

        9:{id:9,name:"充能炮",icon:"tech_9",x:-195,y:10,      m_type:1,param:[3,30],needId:0},
        10:{id:10,name:"冷却1",icon:"tech_10",x:-65,y:10,       m_type:2,param:[3,20],needId:9},
        11:{id:11,name:"冷却2",icon:"tech_11",x:65,y:10,     m_type:2,param:[3,10],needId:10},
        12:{id:12,name:"急冷",icon:"tech_12",x:195,y:10,      m_type:2,param:[4,0],needId:11},

        13:{id:13,name:"轰炸",icon:"tech_13",x:-195,y:-120,  m_type:2,param:[6,1],needId:0},
        14:{id:14,name:"折跃",icon:"tech_14",x:-65,y:-120,  m_type:2,param:[6,2],needId:13},

        15:{id:15,name:"僚机X1",icon:"tech_15",x:65,y:-120,  m_type:2,param:[5,1],needId:0},
        16:{id:16,name:"僚机X2",icon:"tech_16",x:195,y:-120,  m_type:2,param:[5,2],needId:15},
    },
}
module.exports = Constant