
"use strict";
var pi = Math.PI;
var tests = [
{ title: "origin",
  src: `g2()
 .cartesian()
 .use("origin",{x:80,y:20,scl:1.5,fs:"silver"})
 .use("origin",{x:130,y:50,w:pi/6,
                ls:"navy",fs:"wheat"})`
},
{ title: "nodes",
  src: `g2()
 .cartesian()
 .use("nod",{x:25,y:75})
 .use("dblnod",{x:25,y:25})
 .use("nodfix",{x:75,y:75})
 .use("dblnodfix",{x:75,y:25})
 .use("nodflt",{x:125,y:75})
 .use("dblnodflt",{x:125,y:25})
 .use("pol",{x:175,y:75})
 .use("gnd",{x:175,y:25})`
},
{ title: "arrows",
  src: `g2()
 .cartesian()
 .vec(20,20,80,40)
 .avec(10,90,40,0,-pi/2,{lw:2})
 .dim(120,20,180,40,{ls:"green"})
 .adim(150,50,40,0,2*pi/3,{ls:"red"})
 .dim(90,10,110,10,{pos:"out",ls:"maroon"})
 .adim(100,50,20,pi/6,pi/3,{pos:"out"})`
},
{ title: "elements",
  src: `g2()
 .cartesian()
 .slider(40,50,pi/6)
 .spring(30,20,90,30)
 .damper(50,80,130,80)
 .link([130,40,150,75,170,50])
 .ground([100,20,180,20,180,80])`
},
{ title: "rect\nlabels",
  src: `g2()
 .cartesian()
 .rec(50,30,100,40).label("c")
                   .label("s","s")
                   .label("se","se")
                   .label("e","e")
                   .label("ne","ne")
                   .label("n","n")
                   .label("nw","nw")
                   .label("w","w")
                   .label("sw","sw")`
},
{ title: "circular\nlabels",
  src: `g2()
 .cartesian()
 .cir(100,50,20).label("c")
                .label("s","s")
                .label("se","se")
                .label("e","e")
                .label("ne","ne")
                .label("n","n")
                .label("nw","nw")
                .label("w","w")
                .label("sw","sw")`
},
{ title: "linear\nlabels",
  src: `g2()
 .cartesian()
 .lin(50,30,150,70)
    .label("beg-right","beg")
    .label("beg-left","beg","left")
    .label("mid-right","mid","right")
    .label("mid-left","mid","left")
    .label("end-right","end")
    .label("end-left","end","left")
`
},
{ title: "linear\nlabels\n(2)",
  src: `g2()
 .cartesian()
 .lin(50,30,150,70)
    .label("0-right",0)
    .label("1/3-right",1/3)
    .label("1/3-left",1/3,"left")
    .label("1-right",1)
    .label("1.25-left",1.25,"left")
`
},
{ title: "arc\nlabels",
  src: `g2()
 .cartesian()
 .arc(100,39,45,-pi/6,4/3*pi)
    .label("beg-r","beg")
    .label("beg-l","beg","left")
    .label("mid-r","mid","right")
    .label("mid-l","mid","left")
    .label("end-r","end")
    .label("end-l","end","left")
`
},
{ title: "arc\nlabels\n(2)",
  src: `g2()
 .cartesian()
 .arc(100,39,45,-pi/6,4/3*pi)
    .label("0-r",0)
    .label("0-l","beg","left")
`
},
{ title: "dimensions",
  src: `g2()
 .cartesian()
 .dim(120,20,180,40,{ls:"green"})
    .label("@len")
 .adim(150,50,40,0,2*pi/3,{ls:"red"})
 .dim(90,10,110,10,{pos:"out",ls:"maroon"})
 .adim(100,50,20,pi/6,pi/3,{pos:"out"})`
},
]

if (typeof module === "object" && module.exports)
   module.exports = tests;