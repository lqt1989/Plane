var Constant = 
{
    Item:{
        Stone:1,
        Bullet:2,
    },

    //m_type:1.开启科技  2.更改玩家属性  3.特殊判断
    Tech:{
        1:{id:1,name:"机枪激活",icon:"tech_1", x:-180,y:250,  m_type:1,param:[0,1],needId:0},
        2:{id:2,name:"散射1",icon:"tech_2",    x:-60, y:250,  m_type:2,param:[0,2],needId:1},
        3:{id:3,name:"散射2",icon:"tech_3",x:60,  y:250,      m_type:2,param:[0,4],needId:2},
        4:{id:4,name:"散射3",icon:"tech_4", x:180, y:250,     m_type:2,param:[0,6],needId:3},
        5:{id:5,name:"采集",icon:"tech_1", x:-60,  y:150,      m_type:3,param:[],needId:1},
        6:{id:6,name:"扩容",icon:"tech_2",x:60,y:150,        m_type:2,param:[1,300],needId:5},
        7:{id:7,name:"弹药强化",icon:"tech_2",x:180,y:150,     m_type:2,param:[2,3],needId:6},

        8:{id:8,name:"充能炮",icon:"tech_2",x:-180,y:50,      m_type:1,param:[3,30],needId:0},
        9:{id:9,name:"冷却1",icon:"tech_2",x:-60,y:50,       m_type:2,param:[3,20],needId:8},
        10:{id:10,name:"冷却2",icon:"tech_2",x:60,y:50,     m_type:2,param:[3,10],needId:9},
        11:{id:11,name:"急冷",icon:"tech_2",x:180,y:50,      m_type:2,param:[4,0],needId:10},

        12:{id:12,name:"轰炸",icon:"tech_2",x:-180,y:-50,  m_type:3,param:[],needId:0},
        13:{id:13,name:"折跃",icon:"tech_2",x:-60,y:-50,  m_type:3,param:[],needId:12},

        14:{id:14,name:"僚机X1",icon:"tech_2",x:60,y:-50,  m_type:2,param:[5,1],needId:0},
        15:{id:15,name:"僚机X2",icon:"tech_2",x:180,y:-50,  m_type:2,param:[5,2],needId:14},
    },
}
module.exports = Constant