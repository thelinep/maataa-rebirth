export const DEMO_PRODUCTION = {
  productions:[
    {id:"prod-01",name:"Feature Film Demo",status:"pre-production",shootDays:24,scenes:86,budget:40000000},
    {id:"prod-02",name:"Brand Film Demo",status:"production",shootDays:3,scenes:14,budget:2200000}
  ],
  scenes:[
    {id:"scene-001",productionId:"prod-01",number:"12A",location:"Mountain Road",dayNight:"DAY",pages:2.5,status:"scheduled"},
    {id:"scene-002",productionId:"prod-01",number:"18",location:"Village House",dayNight:"NIGHT",pages:4,status:"breakdown"},
    {id:"scene-003",productionId:"prod-01",number:"23",location:"River Bank",dayNight:"SUNSET",pages:1.25,status:"ready"}
  ],
  crew:[
    {id:"crew-01",name:"Demo Director",department:"Direction",status:"confirmed"},
    {id:"crew-02",name:"Demo DOP",department:"Camera",status:"confirmed"},
    {id:"crew-03",name:"Demo Production Designer",department:"Art",status:"hold"}
  ]
} as const;
