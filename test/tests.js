"use strict";
var pi = Math.PI;
var tests = [
{ title: "origin",
  src: `g2()
 .use("origin",{x:80,y:20,scl:1.5,fs:"silver"})
 .use("origin",{x:130,y:50,w:pi/6,
                ls:"navy",fs:"wheat"})`
},
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
{ title: "node\nsymbols\nscaled",
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
{ title: "bar",
  src: `g2()
 .cartesian()
 .bar({x:25,y:15},{x:125,y:30})
 .bar2({x:25,y:35},{dx:100,dy:15})
 .bar({x:50,y:85},{r:100,w:-pi/12})
 .bar2({x:140,y:10},{r:100,w:pi/3})`
},
{ title: "link",
  src: `g2()
 .cartesian()
 .link([20,60,40,95,60,70])
 .link([20,20,40,55,60,30],true)
 .link2([120,60,140,95,160,70])
 .link2([120,20,140,55,160,30],true)
 `
},
{ title: "beam",
  src: `g2()
 .cartesian()
 .beam([20,70,180,70,180,40])
 .beam2([10,50,160,50,160,20])
 `
},
{ title: "vec",
  src: `g2()
 .cartesian()
 .vec({x:20,y:20},{x:100,y:60},{ls:"red"})
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
 .ground([100,20,180,20,180,80])
`
},
{ title: "label",
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
{ title: "circular\nlabels\nwith\noffset",
  src: `g2()
 .cartesian()
 .cir(100,50,20).label("c")
                .label("s","s",10)
                .label("se","se",10)
                .label("e","e",10)
                .label("ne","ne",10)
                .label("n","n",10)
                .label("nw","nw",10)
                .label("w","w",10)
                .label("sw","sw",10)`
},
{ title: "use\nlabels",
  src: `g2()
 .cartesian()
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
 .cartesian()
 .cir(50,50,15)
    .label("@r","ne")
 .lin(80,50,175,50)
    .label("@len","mid")
 `
},
{ title: "labels\npolygon",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
    .mark("dot",0.6)
    .label("ply",0.6,"left")
 `
},
{ title: "labels\npolygon",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
    .mark("dot",["beg","#2"])
    .label("beg","beg","right")
    .label("#2","#2","left")
 `
},
{ title: "labels\npolygon",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
    .mark("dot","#3")
    .label("#3","#3","right")
 `
},
{ title: "labels\nspline",
  src: `g2()
 .cartesian()
 .spline([50,25,100,25,100,75,150,75,150,25])
    .mark("dot","#2")
    .label("#2","#2",10)
 `
},
{ title: "labels\nspline",
  src: `g2()
 .cartesian()
 .spline([50,25,100,25,100,75,150,75,150,25])
    .mark("dot","#3")
    .label("#3","#3",-10)
 `
},
{ title: "load",
  src: `g2()
 .cartesian()
 .load([40,30,100,70,160,70,160,30],20)
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
{ title: "mark",
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
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("dot",[0.3,0.5,0.7])`
},
{ title: "polygonial\nmarkers,\nindexed\nlocations",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("tick",["#1","#3"],1)
`
},
{ title: "polygonial\nmarkers\nmid",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25])
           .mark("tilde",["mid"],1)
`
},
{ title: "polygonial\nmarkers\nall",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25],
      false,{lw:2})
           .mark("sqr",["all"])
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25],
      false,{lw:2})
           .mark("dot",["beg","end"])
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,25],
      false,{lw:2})
           .mark("tilde","beg", 1)
           .mark("tilde","end", 1)
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,35],
      false,{lw:1})
           .mark("arrowtick","beg", 1)
           .mark("arrowtick","end",-1)
`
},
{ title: "polygonial\nmarkers",
  src: `g2()
 .cartesian()
 .ply([50,25,100,25,100,75,150,75,150,35],
      false,{lw:2})
   .mark("ifo2neg","beg", 1)
   .mark("ifo2pos","end", 1)
`
},
{ title: "spline\nmarkers",
  src: `g2()
 .cartesian()
 .spline([50,25,100,25,100,75,150,75,150,35],
      false,{lw:2})
   .mark("dot",["beg","end"])
`
},
{ title: "spline\nmarkers",
  src: `g2()
 .cartesian()
 .spline([50,25,100,25,100,75,150,75,150,35],
      false,{lw:2})
 .mark("tick","all",1)
`
},
{ title: "spline\nmarkers",
  src: `g2()
 .cartesian()
 .spline([50,25,85,50,100,75,150,75,150,35],
      true,{lw:1.5})
 .mark("dot","all",1)
`
},
{ title: "beam\nmarkers",
  src: `g2()
 .cartesian()
 .beam2([50,50,150,50])
   .mark("ifo2neg","beg", 1)
   .mark("ifo2pos","end", 1)
`
},
{ title: "beam\nmarkers",
  src: `g2()
 .cartesian()
 .beam2([50,75,150,75,150,50])
   .mark("ifo3neg","beg", 1)
   .mark("ifo3pos","end", 1)
`
},
{ title: "pulley",
  src: `g2()
 .cartesian()
 .pulley({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley({x:125,y:50},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "pulley2",
  src: `g2()
 .cartesian()
 .pulley2({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley2({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},20,{x:125,y:50,w:pi/3},0)
 .pulley({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},-20,{x:125,y:50,w:pi/3},0)
 .pulley2({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},0,{x:125,y:50,w:pi/3},30)
 .use("nod",{x:50,y:50})
 .pulley({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},0,{x:125,y:50,w:pi/3},-30)
 .use("nod",{x:50,y:50})
 .pulley2({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},20,{x:125,y:50,w:pi/3},30)
 .pulley({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},20,{x:125,y:50,w:pi/3},-30)
 .pulley2({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley2({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},-20,{x:125,y:50,w:pi/3},30)
 .pulley({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
},
{ title: "rope",
  src: `g2()
 .cartesian()
 .rope({x:50,y:50},-20,{x:125,y:50,w:pi/3},-30)
 .pulley2({x:50,y:50},20)
 .use("nod",{x:50,y:50})
 .pulley2({x:125,y:50,w:pi/3},30)
 .use("nod",{x:125,y:50})
`
}
]

if (typeof module === "object" && module.exports)
   module.exports = tests;