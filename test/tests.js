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
{ title: "node\nsymbols",
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
{ title: "scaled\nnode\nsymbols",
  src: `g2()
 .cartesian()
 .use("nod",{x:25,y:85,scl:1.5})
 .use("dblnod",{x:25,y:35,scl:1.5})
 .use("nodfix",{x:75,y:85,scl:1.5})
 .use("dblnodfix",{x:75,y:35,scl:1.5})
 .use("nodflt",{x:125,y:85,scl:1.5})
 .use("dblnodflt",{x:125,y:35,scl:1.5})
 .use("pol",{x:175,y:85,scl:1.5})
 .use("gnd",{x:175,y:35,scl:1.5})`
},
{ title: "bars",
  src: `g2()
 .cartesian()
 .bar({x:25,y:15},{x:125,y:30})
 .bar2({x:25,y:35},{dx:100,dy:15})
 .bar({x:50,y:85},{r:100,w:-pi/12})
 .bar2({x:140,y:10},{r:100,w:pi/3})`
},
{ title: "links",
  src: `g2()
 .cartesian()
 .link([20,60,40,95,60,70])
 .link([20,20,40,55,60,30],true)
 .link2([120,60,140,95,160,70])
 .link2([120,20,140,55,160,30],true)
 `
},
{ title: "arrows",
  src: `g2()
 .cartesian()
 .vec({x:20,y:20},{x:100,y:60})
 .avec({x:10,y:90},30,0,-pi/2,{lw:2})
 .dim({x:120,y:20},{x:180,y:40},{ls:"green"})
 .adim({x:150,y:50},40,0,2*pi/3,{ls:"red"})
 .dim({x:90,y:10},{dx:20,dy:0},
      {pos:"out",ls:"maroon"})
 .adim({x:100,y:50},20,pi/6,pi/3,{pos:"out"})`
},
{ title: "elements",
  src: `g2()
 .cartesian()
 .slider({x:40,y:50},pi/6)
 .spring({x:30,y:20},{x:90,y:30})
 .damper({x:50,y:80},{dx:80,dy:0})
 .ground([100,20,180,20,180,80])`
},
{ title: "rect\nlabels\ncartesian",
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
{ title: "rect\nlabels",
  src: `g2()
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
{ title: "circular\nlabels\ncartesian",
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
{ title: "use\nlabels",
  src: `g2()
 .use("pol",{x:100,y:50}).label("s","s")
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
 .lin(50,30,150,70)
    .label("beg-right","beg")
    .label("beg-left","beg","left")
    .label("mid-right","mid","right")
    .label("mid-left","mid","left")
    .label("end-right","end")
    .label("end-left","end","left")
`
},
{ title: "linear\nlabels\ncartesian",
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
    .label("0-l","beg","left")`
},
{ title: "labels\nevaluate",
  src: `g2()
 .cir(50,50,15)
    .label("@r","ne")
 .lin(80,50,175,50)
    .label("@len","mid")
 `
},
{ title: "dimensions",
  src: `g2()
 .cartesian()
 .dim({x:120,y:20},{x:180,y:40},{ls:"green"})
    .label("@len")
 .adim({x:150,y:50},40,0,2*pi/3,{ls:"red"})
    .label("@angle")
 .dim({x:30,y:20},{dx:20,dy:0},
      {pos:"out",ls:"maroon"})
    .label("a")
 .adim({x:50,y:80},20,pi/6,pi/3,{pos:"out"})
    .label("@angle","c")`
},
{ title: "line\nmarkers",
  src: `g2()
 .cartesian()
 .lin(20,20,150,20,{ls:"red"})
    .mark("dot",["beg","mid","end"])
 .lin(20,40,150,50)
    .mark("arrow",[0,1/3,2/3,1],1)
 .lin(40,90,170,70)
    .mark("arrow",1,1)
    .mark("tick",[1/4,1/2,3/4],1)`
},
{ title: "polygonial\nmarkers,\nparameter\nlocations",
  src: `g2()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("dot",[0.3,0.5,0.7])`
},
{ title: "polygonial\nmarkers,\nindexed\nlocations\ncartesian",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("tick",["#1","#3"],1)
`
},
{ title: "polygonial\nmarkers\nmid",
  src: `g2()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("tilde",["mid"],1)
`
},
{ title: "polygonial\nmarkers\nall",
  src: `g2()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("sqr",["all"])
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("dot",["beg","end"])
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("arrowtick","beg", 1)
           .mark("arrowtick","end",-1)
`
}
]

if (typeof module === "object" && module.exports)
   module.exports = tests;