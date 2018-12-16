var Constant = 
{
    Objs:{
        Bullet_1:1,
        Bullet_2:2,
        Stone:3,
        Boom:4,
        Missile:5,
        GoldIcon:6,
    },

    //m_type:1.开启科技  2.更改玩家属性  3.特殊判断
    Tech:{
        1:{id:1,name:"机枪激活",icon:"tech_1", x:-195,y:205,  m_type:1,param:[0,1],needId:[0],repel:null,},
        2:{id:2,name:"散射1",icon:"tech_2",    x:-65, y:270,  m_type:2,param:[0,3],needId:[1],repel:null,},
        3:{id:3,name:"散射2",icon:"tech_3",x:65,  y:270,      m_type:2,param:[0,5],needId:[2],repel:null,},
        4:{id:4,name:"散射3",icon:"tech_4", x:195, y:270,     m_type:2,param:[0,7],needId:[3],repel:null,},

        5:{id:5,name:"贯通1",icon:"tech_5", x:-65,  y:140,    m_type:2,param:[0,2],needId:[1],repel:null,},
        6:{id:6,name:"贯通2",icon:"tech_6",x:65,y:140,        m_type:2,param:[0,4],needId:[5],repel:null,},
        7:{id:7,name:"贯通3",icon:"tech_7",x:195,y:140,       m_type:2,param:[0,6],needId:[6],repel:null,},
        //8:{id:8,name:"高能弹药",icon:"tech_8",x:195,y:140,      m_type:1,param:[3],needId:[4,7],repel:null,},

        8:{id:8,name:"充能炮",icon:"tech_9",x:-195,y:10,      m_type:1,param:[3,30],needId:[0],repel:null,},
        9:{id:9,name:"冷却1",icon:"tech_10",x:-65,y:10,       m_type:2,param:[3,20],needId:[8],repel:null,},
        10:{id:10,name:"冷却2",icon:"tech_11",x:65,y:10,     m_type:2,param:[3,10],needId:[9],repel:null,},
        11:{id:11,name:"急冷",icon:"tech_12",x:195,y:10,      m_type:2,param:[4,0],needId:[10],repel:null,},

        12:{id:12,name:"轰炸",icon:"tech_13",x:-195,y:-120,  m_type:2,param:[6,1],needId:[0],repel:null,},
        13:{id:13,name:"折跃",icon:"tech_14",x:-65,y:-120,  m_type:2,param:[6,2],needId:[12],repel:null,},

        14:{id:14,name:"僚机X1",icon:"tech_15",x:65,y:-120,  m_type:2,param:[5,1],needId:[0],repel:null,},
        15:{id:15,name:"僚机X2",icon:"tech_16",x:195,y:-120,  m_type:2,param:[5,2],needId:[14],repel:null,},
    },

    Golds:{
        1:{count:3,startx:10},
        2:{count:2,startx:210},
        3:{count:4,startx:150},
        4:{count:1,startx:610},
        5:{count:3,startx:410},
        6:{count:2,startx:110},
    }


}
module.exports = Constant