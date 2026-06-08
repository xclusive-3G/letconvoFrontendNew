export const CALL_RECORDS=[
  {id:"c001",caller:"Dr. Emeka Obi",number:"+234 803 456 7890",duration:"4:32",time:"2 min ago",status:"completed",sentiment:"positive",transcript:"Caller inquired about appointment availability for Thursday. AI booked 10:30am slot and confirmed via SMS.",recording:true,tags:["appointment","booked"]},
  {id:"c002",caller:"Mrs. Fatima Bello",number:"+234 905 123 4567",duration:"2:14",time:"18 min ago",status:"completed",sentiment:"neutral",transcript:"Caller asked about office hours and location. AI provided full details and offered to schedule a callback.",recording:true,tags:["inquiry","hours"]},
  {id:"c003",caller:"Mr. James Adewale",number:"+234 701 987 6543",duration:"6:01",time:"35 min ago",status:"transferred",sentiment:"positive",transcript:"Complex billing inquiry. AI collected details and transferred to accounts team with full context.",recording:true,tags:["billing","transferred"]},
  {id:"c004",caller:"Unknown",number:"+44 20 7946 0958",duration:"0:45",time:"52 min ago",status:"missed",sentiment:"neutral",transcript:"Caller disconnected before AI could respond. Voicemail left.",recording:false,tags:["missed","voicemail"]},
  {id:"c005",caller:"Chidi Enterprises",number:"+234 812 345 6789",duration:"8:22",time:"1 hr ago",status:"completed",sentiment:"positive",transcript:"New business inquiry. AI qualified lead, collected requirements, and scheduled a demo call for Friday 2pm.",recording:true,tags:["lead","demo","qualified"]},
  {id:"c006",caller:"Dr. Ngozi Adeyemi",number:"+234 803 222 3333",duration:"3:15",time:"2 hrs ago",status:"completed",sentiment:"neutral",transcript:"Follow-up on prescription renewal. AI noted urgency and escalated to duty pharmacist.",recording:true,tags:["follow-up","escalated"]},
  {id:"c007",caller:"Lagos Motors Ltd",number:"+234 701 555 6666",duration:"1:50",time:"3 hrs ago",status:"completed",sentiment:"negative",transcript:"Caller frustrated with wait times. AI apologised, offered priority callback, and escalated to manager.",recording:true,tags:["complaint","escalated"]},
  {id:"c008",caller:"Mr. Tunde Fashola",number:"+234 808 777 8888",duration:"5:40",time:"4 hrs ago",status:"completed",sentiment:"positive",transcript:"Appointment rescheduling request. AI handled smoothly, updated calendar, and sent confirmation.",recording:true,tags:["appointment","rescheduled"]},
  {id:"c009",caller:"Kemi Bakare",number:"+234 905 444 5555",duration:"2:33",time:"5 hrs ago",status:"completed",sentiment:"neutral",transcript:"Asked about service pricing. AI provided full breakdown and sent brochure via WhatsApp.",recording:true,tags:["pricing","inquiry"]},
  {id:"c010",caller:"Zenith Bank Plc",number:"+234 700 100 0000",duration:"0:22",time:"6 hrs ago",status:"missed",sentiment:"neutral",transcript:"Automated IVR call — AI identified and logged. No action required.",recording:false,tags:["spam","logged"]},
  {id:"c011",caller:"Ada Okonkwo",number:"+234 813 222 4444",duration:"4:10",time:"Yesterday",status:"completed",sentiment:"positive",transcript:"New patient registration. AI collected all details, assigned patient ID, and booked intake appointment.",recording:true,tags:["new-patient","booked"]},
  {id:"c012",caller:"GlobalTech Solutions",number:"+234 902 888 9999",duration:"9:05",time:"Yesterday",status:"transferred",sentiment:"positive",transcript:"Partnership inquiry from large tech firm. AI qualified, collected contact details, and routed to BD team.",recording:true,tags:["partnership","BD"]},
];

export const APPOINTMENTS=[
  {id:"a001",name:"Dr. Emeka Obi",time:"10:30 AM",date:"Today",type:"Consultation",status:"confirmed",phone:"+234 803 456 7890",notes:"Returning patient. Prefers Dr. Ahmed."},
  {id:"a002",name:"Mrs. Fatima Bello",time:"11:00 AM",date:"Today",type:"Follow-up",status:"confirmed",phone:"+234 905 123 4567",notes:"Post-surgery review. Bring scan results."},
  {id:"a003",name:"Chidi Enterprises",time:"2:00 PM",date:"Today",type:"Demo Call",status:"pending",phone:"+234 812 345 6789",notes:"Product demo for fleet management solution."},
  {id:"a004",name:"Mr. James Adewale",time:"3:30 PM",date:"Today",type:"Billing Review",status:"confirmed",phone:"+234 701 987 6543",notes:"Resolve outstanding invoice dispute."},
  {id:"a005",name:"Dr. Ngozi Adeyemi",time:"9:00 AM",date:"Tomorrow",type:"Consultation",status:"confirmed",phone:"+234 803 222 3333",notes:"New patient. GP referral letter attached."},
  {id:"a006",name:"Ada Okonkwo",time:"10:00 AM",date:"Tomorrow",type:"Intake",status:"confirmed",phone:"+234 813 222 4444",notes:"New patient registration and initial assessment."},
  {id:"a007",name:"GlobalTech Solutions",time:"2:00 PM",date:"Fri 2 May",type:"Partnership",status:"pending",phone:"+234 902 888 9999",notes:"BD team to lead. AI to send agenda beforehand."},
  {id:"a008",name:"Mr. Tunde Fashola",time:"4:00 PM",date:"Fri 2 May",type:"Consultation",status:"confirmed",phone:"+234 808 777 8888",notes:"Annual check-up. Prefers afternoon slots."},
];

export const STATS={totalCalls:247,callsToday:38,avgDuration:"3:42",appointmentsBooked:19,leadsQualified:14,missedCalls:3,satisfactionScore:4.8,transferRate:"8%"};

export const CHART_DATA={
  weekly:[{day:"Mon",calls:32,booked:12,missed:2},{day:"Tue",calls:28,booked:9,missed:1},{day:"Wed",calls:41,booked:16,missed:3},{day:"Thu",calls:35,booked:13,missed:2},{day:"Fri",calls:38,booked:15,missed:3},{day:"Sat",calls:18,booked:6,missed:1},{day:"Sun",calls:10,booked:3,missed:0}],
  hourly:[{hour:"8am",calls:4},{hour:"9am",calls:12},{hour:"10am",calls:18},{hour:"11am",calls:22},{hour:"12pm",calls:14},{hour:"1pm",calls:8},{hour:"2pm",calls:20},{hour:"3pm",calls:25},{hour:"4pm",calls:16},{hour:"5pm",calls:10}],
};

export const NOTIFICATIONS=[
  {id:"n1",type:"call",text:"New call from +234 701 234 5678",time:"Just now",read:false},
  {id:"n2",type:"appointment",text:"Appointment confirmed: Dr. Obi 10:30am",time:"5 min ago",read:false},
  {id:"n3",type:"lead",text:"New lead qualified: Chidi Enterprises",time:"18 min ago",read:false},
  {id:"n4",type:"transfer",text:"Call transferred to accounts team",time:"35 min ago",read:true},
  {id:"n5",type:"alert",text:"Low minutes balance — 45 mins remaining",time:"1 hr ago",read:true},
];

export const AGENTS=[
  {name:"AI Receptionist",status:"active",calls:247,satisfaction:4.9},
  {name:"Sarah (Human)",status:"online",calls:12,satisfaction:4.7},
  {name:"James (Human)",status:"busy",calls:8,satisfaction:4.6},
  {name:"Overflow Agent",status:"standby",calls:3,satisfaction:4.5},
];

export const BALANCE={minutesUsed:722,minutesTotal:1000,minutesRemaining:278,dollarBalance:47.50,planName:"Growth",planPrice:349,nextBillingDate:"May 31, 2025",autoTopUp:true,autoTopUpThreshold:50,autoTopUpAmount:200};

export const TRANSACTIONS=[
  {id:"t001",date:"May 1, 2025",type:"usage",description:"AI minutes consumed (38 min)",amount:-5.70,balance:47.50,status:"completed"},
  {id:"t002",date:"Apr 30, 2025",type:"usage",description:"AI minutes consumed (41 min)",amount:-6.15,balance:53.20,status:"completed"},
  {id:"t003",date:"Apr 30, 2025",type:"topup",description:"Auto top-up — 200 minutes added",amount:28.00,balance:59.35,status:"completed"},
  {id:"t004",date:"Apr 29, 2025",type:"usage",description:"AI minutes consumed (35 min)",amount:-5.25,balance:31.35,status:"completed"},
  {id:"t005",date:"Apr 28, 2025",type:"usage",description:"AI minutes consumed (29 min)",amount:-4.35,balance:36.60,status:"completed"},
  {id:"t006",date:"Apr 27, 2025",type:"usage",description:"AI minutes consumed (44 min)",amount:-6.60,balance:40.95,status:"completed"},
  {id:"t007",date:"Apr 26, 2025",type:"topup",description:"Manual top-up — 500 minutes added",amount:70.00,balance:47.55,status:"completed"},
  {id:"t008",date:"Apr 25, 2025",type:"usage",description:"AI minutes consumed (31 min)",amount:-4.65,balance:-22.45,status:"completed"},
  {id:"t009",date:"Apr 25, 2025",type:"invoice",description:"Monthly subscription — Growth Plan",amount:-349.00,balance:-17.80,status:"completed"},
  {id:"t010",date:"Apr 24, 2025",type:"payment",description:"Card payment **** 4242",amount:400.00,balance:331.20,status:"completed"},
  {id:"t011",date:"Apr 23, 2025",type:"usage",description:"AI minutes consumed (52 min)",amount:-7.80,balance:-68.80,status:"completed"},
  {id:"t012",date:"Apr 22, 2025",type:"refund",description:"Refund — duplicate charge Apr 18",amount:29.00,balance:-61.00,status:"completed"},
];

export const PLANS_UPGRADE=[
  {name:"Starter",price:149,minutes:300,perMin:0.30,features:["300 minutes/month","Basic call handling","SMS follow-up","Digital call logs"],current:false},
  {name:"Growth",price:349,minutes:1000,perMin:0.22,features:["1,000 minutes/month","Google Calendar booking","Full CRM integration","Advanced analytics","Custom logic scripts"],current:true},
  {name:"Enterprise",price:699,minutes:3000,perMin:0.15,features:["3,000+ minutes/month","Multi-location support","Custom AI voice cloning","White-label dashboard","API access & automations"],current:false},
];

export const PAYMENT_METHODS=[
  {id:"pm1",type:"visa",last4:"4242",expiry:"12/27",default:true},
  {id:"pm2",type:"mastercard",last4:"8888",expiry:"08/26",default:false},
];
