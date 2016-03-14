/**
 * g2.mec (c) 2013-16 Stefan Goessner
 * @license
 * MIT License
 */
/* jshint -W014 */

// origin symbol
g2.symbol.origin = function() {
   var z = 3;
   return g2().beg({lc:"round",lj:"round",lw:1,fs:"@nodfill"})
                .p().m(6*z,0).l(0,0).l(0,6*z).stroke()
                .p().m(10*z,0).l(6*z,3/4*z).a(-Math.PI/3,6*z,-3/4*z).z()
                    .m(0,10*z).l(3/4*z,6*z).a( Math.PI/3,-3/4*z,6*z).z().drw()
                .cir(0,0,z)
              .end();
}();

// mechanical symbols style ...
g2.State.nodcolor = "#333";
g2.State.nodfill  = "#dedede";
g2.State.nodfill2 = "#aeaeae";
g2.State.linkcolor = "#666";
g2.State.linkfill = "rgba(176,176,176,0.5)";

// mechanical line styles ...
g2.State.solid = [];
g2.State.dash = [15,10];
g2.State.dot = [4,4];
g2.State.dashdot = [25,6.5,2,6.5];

// mechanical symbols ...
g2.symbol.nod =    g2().cir(0,0,5,{ls:"@nodcolor",fs:"@nodfill"});
g2.symbol.dblnod = g2().cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill"}).cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill2"});
g2.symbol.nodfix = g2().p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                       .drw({ls:"@nodcolor",fs:"@nodfill2"})
                       .cir(0,0,5,{ls:"@nodcolor",fs:"@nodfill"});
g2.symbol.dblnodfix = g2().p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                       .drw({ls:"@nodcolor",fs:"@nodfill2"})
                       .cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill"})
                       .cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill2"});
g2.symbol.nodflt = g2().style({ls:"@nodcolor",fs:"@nodfill"})
                       .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                         .z()
                       .drw({fs:"@nodfill2"})
                       .cir(0,0,5,{fs:"@nodfill"})
                       .lin(-9,-19,9,-19,{ls:"@nodfill2",lw:5,lwnosc:false})
                       .lin(-9,-15.5,9,-15.5,{ls:"@nodcolor",lw:2,lwnosc:false});
g2.symbol.dblnodflt = g2().style({ls:"@nodcolor",fs:"@nodfill"})
                       .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                         .z()
                       .drw({fs:"@nodfill2"})
                       .cir(0,0,6,{fs:"@nodfill"})
                       .cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill2"})
                       .lin(-9,-19,9,-19,{ls:"@nodfill2",lw:5,lwnosc:false})
                       .lin(-9,-15.5,9,-15.5,{ls:"@nodcolor",lw:2,lwnosc:false});
g2.symbol.gnd =    g2().cir(0,0,5,{ls:"@nodcolor",fs:"@nodfill"})
                       .p().m(0,5).a(-Math.PI/2,5,0).l(-5,0).a(Math.PI/2,0,-5).z().fill({fs:"@nodcolor"});
g2.symbol.pol =    g2().cir(0,0,5,{ls:"@nodcolor",fs:"@nodfill"})
                       .cir(0,0,2,{ls:"@nodcolor",fs:"@nodcolor"});

/**
 * Draw vector arrow.
 * @method
 * @returns {object} g2
 * @param {float} x1 Start x coord
 * @param {float} y1 Start y coord
 * @param {float} x2 End x coord
 * @param {float} y2 End y coord
 * @param {object} style Style object.
 */
g2.prototype.vec = function vec(x1,y1,x2,y2,style) {
   var x, y, dx = x2-x1, dy = y2-y1, len = Math.hypot(dx,dy), 
       ux = len>0 ? dx/len : 0, uy = len>0 ? dy/len : 0,
       sty = Object.assign({ls:"@nodcolor",lw:1},style,{fs:"@ls",lc:"round",lj:"round"});
   if (len > 12)
      this.p()
            .m(x1,y1)
            .l(x=x2,y=y2)
            .m(x,y)
            .l(x+=-12*ux-2.5*uy,y+=-12*uy+2.5*ux)
            .a(-Math.PI/3,x+5*uy,y-5*ux)
            .z()
          .drw(sty);
   else
      this.lin(x1,y1,x2,y2,sty);
   return this.proxy(g2.prototype.lin.proxy,[x1,y1,x2,y2,style]);
};

/**
 * Angular vector
 * @param {float} x X-value center
 * @param {float} y Y-value center
 * @param {float} r Radius
 * @param {float} w Start angle (in radian) [default 0]
 * @param {float} dw Angular range in radian. In case of positive values it is running clockwise with
 *                left handed default coordinate system. [default 2*pi]
 */
g2.prototype.avec = function avec(x,y,r,w,dw,style) {
   var wa = dw >= 0 ? -12/r : 12/r,
       c2 = Math.cos(w+dw+wa), s2 = Math.sin(w+dw+wa);
   return this.beg(Object.assign({ls:"@nodcolor",lw:1},style,{fs:"@ls",lc:"round",lj:"round"}))
                .arc(x,y,r,w,dw,{fs:"transparent"})
                .p()
                .m(x+r*Math.cos(w+dw),y+r*Math.sin(w+dw))
                .l(x+(r-2.5)*c2,y+(r-2.5)*s2)
                .a(Math.PI/3,x+(r+2.5)*c2,y+(r+2.5)*s2)
                .z()
                .drw()
              .end()
              .proxy(g2.prototype.arc.proxy,[x,y,r,w,dw,style]);
};

/**
 * Linear dimension
 * @param {coord} x1 start x coord
 * @param {coord} y1 Start y coord
 * @param {coord} x2 End x coord
 * @param {coord} y2 End y coord
 * @param {object} args Arguments object.
 * @param {float} [args.pos="in"] Draw dimension arrows between ticks ('in') or outside of ticks ('out').
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.dim = function dim(x1,y1,x2,y2,args) {
   var x, y, dx = x2-x1, dy = y2-y1, len = Math.hypot(dx,dy), 
       inside = args && args.pos === "out" ? -1 : 1,
       ux = inside*(len>0 ? dx/len : 0), uy = inside*(len>0 ? dy/len : 0);
   return this.p().m(x1,y1).l(x2,y2)
                .m(x=x1,y=y1)
                .l(x+=12*ux-2.5*uy,y+=12*uy+2.5*ux)
                .a(Math.PI/3,x+=5*uy,y+=-5*ux)
                .z()
                .m(x1+3*uy,y1-3*ux).l(x1-3*uy,y1+3*ux).z()
                .m(x=x2,y=y2)
                .l(x+=-12*ux-2.5*uy,y+=-12*uy+2.5*ux)
                .a(-Math.PI/3,x+=5*uy,y+=-5*ux)
                .z()
                .m(x2+3*uy,y2-3*ux).l(x2-3*uy,y2+3*ux).z()
              .drw(Object.assign({ls:"@nodcolor"},args,{fs:"@ls",lc:"round",lj:"round"}))
              .proxy(g2.prototype.lin.proxy,[x1,y1,x2,y2,args]);
};

/**
 * Angular dimension
 * @param {float} x X-value center
 * @param {float} y Y-value center
 * @param {float} r Radius
 * @param {float} w Start angle (in radian) [default 0]
 * @param {float} dw Angular range in radian. In case of positive values it is running clockwise with
 *                left handed default coordinate system. [default 2*pi]
 * @param {object} args Arguments object.
 * @param {float} [args.pos="in"] Draw dimension arrows between ticks ('in') or outside of ticks ('out').
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.adim = function adim(x,y,r,w,dw,args) {
   var inside = args && args.pos === "out" ? -1 : 1, wm = inside*(dw >= 0 ? 12/r : -12/r),
       ri = r - 2.5, ra = r + 2.5,
       c1  = Math.cos(w), s1 = Math.sin(w),
       c2  = Math.cos(w+dw), s2 = Math.sin(w+dw),
       c1m = Math.cos(w+wm), s1m = Math.sin(w+wm),
       c2m = Math.cos(w+dw-wm), s2m = Math.sin(w+dw-wm);
   return this.beg(Object.assign({ls:"@nodcolor"},args,{fs:"@ls",lc:"round",lj:"round"}))
                .arc(x,y,r,w,dw,{fs:"transparent"})
                .p()
                .m(x+r*c1,y+r*s1)
                .l(x+ri*c1m,y+ri*s1m)
                .a(inside*Math.PI/3,x+ra*c1m,y+ra*s1m)
                .z()
                .m(x+ri*c1,y+ri*s1)
                .l(x+ra*c1,y+ra*s1)
                .m(x+r*c2,y+r*s2)
                .l(x+ri*c2m,y+ri*s2m)
                .a(-inside*Math.PI/3,x+ra*c2m,y+ra*s2m)
                .z()
                .m(x+ri*c2,y+ri*s2)
                .l(x+ra*c2,y+ra*s2)
                .drw()
              .end()
              .proxy(g2.prototype.arc.proxy,[x,y,r,w,dw]);
};

/**
 * Draw slider.
 * @param {coord} x Center x coord
 * @param {coord} y Center y coord
 * @param {angle} w Rotation angle [rad]
 * @param {object} args Arguments object.
 * @param {float} [args.b=32] Slider breadth.
 * @param {float} [args.h=16] Slider height.
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.slider = function slider(x,y,w,args) {
   var b = args && args.b || 32, h = args && args.h || 16;
   return this.beg(Object.assign({x:x,y:y,w:w||0,ls:"@nodcolor",fs:"@linkfill",lw:1},args,{lj:"round"}))
                .rec(-b/2,-h/2,b,h)
              .end()
              .proxy(g2.prototype.rec.proxy,[x,y,b,h,args]);
};

/**
 * Draw linear spring
 * @param {coord} x1 Start x coord
 * @param {coord} y1 Start y coord
 * @param {coord} x2 End x coord
 * @param {coord} y2 End y coord
 * @param {object} args Arguments object.
 * @param {float} [args.h=16] Spring height.
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.spring = function(x1,y1,x2,y2,args) {
   var len = Math.hypot(x2-x1,y2-y1), h = args && args.h || 16;
   if (len <= h)
      return this.lin(x1,y1,x2,y2,{ls:"@nodcolor"},args,{lc:"round",lj:"round"});
   else {
      var l = {x1:x1,y1:y1,x2:x2,y2:y2,ux:(x2-x1)/len,uy:(y2-y1)/len},
          xm = (x1+x2)/2, ym = (y1+y2)/2;
      return this.p()
                 .m(l.x1,l.y1)
                 .l(xm-l.ux*h/2,ym-l.uy*h/2)
                 .l(xm+(-l.ux/6+l.uy/2)*h,ym+(-l.uy/6-l.ux/2)*h)
                 .l(xm+( l.ux/6-l.uy/2)*h,ym+( l.uy/6+l.ux/2)*h)
                 .l(xm+l.ux*h/2,ym+l.uy*h/2)
                 .l(l.x2,l.y2)
                 .stroke(Object.assign({ls:"@nodcolor"},args,{fs:"transparent",lc:"round",lj:"round"}))
                 .proxy(g2.prototype.lin.proxy,[x1,y1,x2,y2,args]);
   }
};

/**
 * Draw line with centered square damper symbol.
 * @param {coord} x1 Start x coord
 * @param {coord} y1 Start y coord
 * @param {coord} x2 End x coord
 * @param {coord} y2 End y coord
 * @param {object} args Arguments object.
 * @param {float} [args.h=16] Spring height.
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.damper = function(x1,y1,x2,y2,args) {
   var len = Math.hypot(x2-x1,y2-y1), h = args && args.h || 16;
   if (len <= h)
      return this.lin(x1,y1,x2,y2,{ls:"@nodcolor"},args,{lc:"round",lj:"round"});
   else {
      var l = {x1:x1,y1:y1,x2:x2,y2:y2,ux:(x2-x1)/len,uy:(y2-y1)/len},
          xm = (x1+x2)/2, ym = (y1+y2)/2;
      return this.p()
                 .m(l.x1,l.y1)
                 .l(xm-l.ux*h/2,ym-l.uy*h/2)
                 .m(xm+( l.ux-l.uy)*h/2,ym+( l.uy+l.ux)*h/2)
                 .l(xm+(-l.ux-l.uy)*h/2,ym+(-l.uy+l.ux)*h/2)
                 .l(xm+(-l.ux+l.uy)*h/2,ym+(-l.uy-l.ux)*h/2)
                 .l(xm+( l.ux+l.uy)*h/2,ym+( l.uy-l.ux)*h/2)
                 .m(xm,ym)
                 .l(l.x2,l.y2)
                 .stroke(Object.assign({ls:"@nodcolor"},args,{fs:"transparent",lc:"round",lj:"round"}))
                 .proxy(g2.prototype.lin.proxy,[x1,y1,x2,y2,args]);
   }
};

/**
 * Draw polygonial link.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points.
 * @param {bool|'split'} [mode = false] true:closed, false:non-closed, 'split:intermittend lines.
 * @param {object} [style] Style object.
 */
g2.prototype.link = function(pts,style) {
   return this.ply(pts,true,Object.assign({fs:"@linkfill",ls:"@linkcolor",},style,{lw:5,lc:"round",lj:"round"}))
              .proxy(g2.prototype.ply.proxy,[pts,style]);
}

/**
 * Draw bar.
 * @method
 * @returns {object} this
 * @param {v2} [p] Start point.
 * @param {v2} [r] Bar vector.
 * @param {object} [style] Style object.
 */
g2.prototype.bar = function bar(p,r,style) {
   var x = p && p.x || 0, dx = r && (r.x || r.r && r.r*Math.cos(r.w||0)) || 10,
       y = p && p.y || 0, dy = r && (r.y || r.r && r.r*Math.sin(r.w||0)) ||  0;
   this.cmds.push({c:bar,a:[x,y,dx,dy,Object.assign({fs:"@linkfill",ls:"@linkcolor",},style,{lw:5,lc:"round",lj:"round"})]});
   return this;
}

g2.prototype.bar.c2d = function bar_c2d(x,y,dx,dy,style) {
   var len = Math.hypot(dx,dy), b_2 = 8/len/2,
       gradient = this.createLinearGradient(x+dy*b_2,y-dx*b_2,x-dy*b_2,y+dx*b_2),
       ls;
   this.save();
   this.g2_owner.state.save().add(style);
   ls = this.g2_owner.state.get("ls");
   gradient.addColorStop(0,ls);
   gradient.addColorStop(0.5,this.g2_owner.state.get("fs"));
   gradient.addColorStop(1,ls);
   this.strokeStyle = gradient;
   this.lineWidth = b_2*len*2;
   this.lineCap = "round";
   this.beginPath();
   this.moveTo(x,y);
   this.lineTo(x+dx,y+dy);
   this.stroke();
   this.g2_owner.state.restore();
   this.restore();
}

/**
 * Piston.
 * @method
 * @returns {object} this
 * @param {v2} [p] Center point.
 * @param {float} [b] Breadth.
 * @param {float} [h] Height.
 * @param {float} [w] Angle.
 * @param {object} [style] Style object.
 */
g2.prototype.piston = function piston(p,b,h,w,style) {
   this.cmds.push({c:bar,a:[p.x,p.y,b,h,w,Object.assign({fs:"@linkfill",ls:"@linkcolor",},style,{lw:5,lc:"round",lj:"round"})]});
   return this;
}

g2.prototype.piston.c2d = function piston_c2d(x,y,b,h,w,style) {
   var dx = w && Math.cos(w)||0, dy = w && Math.sin(w)||0, b_2 = b/2, h_2 = h/2,
       gradient = this.createLinearGradient(x+dy*b_2,y-dx*b_2,x-dy*b_2,y+dx*b_2),
       ls = this.g2_owner.state.save().add(style).get("ls");
   gradient.addColorStop(0,ls);
   gradient.addColorStop(0.5,this.g2_owner.state.get("fs"));
   gradient.addColorStop(1,ls);
   this.save();
   this.fillStyle = gradient;
   this.strokeStyle = ls;
   this.beginPath();
   this.moveTo(x+dx*b_2,y+dy*h_2);
   this.lineTo(x-dx*b_2,y+dy*h_2);
   this.lineTo(x-dx*b_2,y-dy*h_2);
   this.lineTo(x+dx*b_2,y-dy*h_2);
   this.closePath();
   this.fill();
   this.stroke();
   this.restore();
   this.g2_owner.state.restore();
}

/**
 * Polygon ground.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points
 * @param {bool} [closed=false] Closed polygon.
 * @param {object} [args] Arguments object.
 * @param {float} [args.h] Ground shade line width. { h:<line width>,sign:<left(1) | right(-1)>}
 * @param {string} [args.pos='right'] Ground shade position ["left","right"].
 */
g2.prototype.ground = function ground(pts,closed,args) {
   var i=0, p0, pp, pn, p, e0, dx, dy, ep, en, len, lam, eq = [],
       h = args && args.h || 4,
       sign = args && args.pos === "left" ? 1 : -1,
       itr =  g2.prototype.ply.itrOf(pts,args);
   p0 = pp = itr(pts,i=0);
   eq.push(p0);
   p = itr(pts,i=1);
   dx = p.x-pp.x; dy = p.y-pp.y; len = Math.hypot(dx,dy) || 1;
   e0 = ep = {x:dx/len,y:dy/len};
   for (pn = itr(pts,++i); !pn.done; pn = itr(pts,++i)) {
      dx = pn.x-p.x; dy = pn.y-p.y; len = Math.hypot(dx,dy) || 1;
      en = {x:dx/len,y:dy/len};
      lam = (1 - en.x*ep.x - en.y*ep.y) / (ep.y*en.x - ep.x*en.y);
      eq.push({x:p.x+sign*(h+1)*(lam*ep.x - ep.y), y:p.y+sign*(h+1)*(lam*ep.y + ep.x)});
      ep = en;
      pp = p;
      p = pn;
   }
   if (closed) {
      dx = p0.x-p.x; dy = p0.y-p.y; len = Math.hypot(dx,dy) || 1;
      en = {x:dx/len,y:dy/len};
      lam = (1 - en.x*ep.x - en.y*ep.y) / (ep.y*en.x - ep.x*en.y);
      eq.push({x:p.x+sign*(h+1)*(lam*ep.x - ep.y), y:p.y+sign*(h+1)*(lam*ep.y + ep.x)});
      lam = (1 - e0.x*en.x - e0.y*en.y) / (en.y*e0.x - en.x*e0.y);
      eq[0] = {x:p0.x+sign*(h+1)*(-lam*e0.x - e0.y), y:p0.y+sign*(h+1)*(-lam*e0.y + e0.x)};
   }
   else {
      eq[0] = {x:p0.x-sign*(h+1)*e0.y, y:p0.y+sign*(h+1)*e0.x};
      eq.push({x:p.x -sign*(h+1)*ep.y, y:p.y +sign*(h+1)*ep.x});
   }
   return this.beg(Object.assign({x:-0.5,y:-0.5,ls:"@nodcolor",fs:"transparent",lw:2},args,{fs:"transparent",lc:"butt",lj:"miter"}))
                 .ply(pts,closed,args)
                 .ply(eq,closed,{ls:"@nodfill2",lw:2*h})
              .end()
};


// marker symbols ...
g2.symbol.dot = g2().cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill"});
g2.symbol.sqr = g2().rec(-3,-3,6,6,{ls:"@nodcolor",fs:"@nodfill"});
g2.symbol.tilde = g2().p().m(0,4).a(Math.PI/2,0,0).a(-Math.PI/2,0,-4).stroke({lc:"round"});
g2.symbol.arrow = g2().p().m(0,0).l(-7,-2).a(Math.PI/3,-7,2).z().drw({lj:"round"});
g2.symbol.tick = g2().p().m(0,-3).l(0,3).stroke({lc:"round"});
g2.symbol.arrowtick = g2().p().m(0,-3).l(0,3).m(0,0).l(-7,-2).a(Math.PI/3,-7,2).z().drw({lj:"round",lc:"round"});

/*
 * Draw markers to line element.
 * @method
 * @returns {object} g2
 * @param {object | string} mrk  Marker name or g2 object. 
 * @param {real | string | array(real | string)} loc
 *                    line parameters [0..1]
 *                    line location ['beg','end','mid',..]
 *                    array of line parameters or strings.
 * @param {int} dir  Direction 
 *                   -1 : negative tangent direction
 *                    0 : no orientation (rotation)
 *                    1 : positive tangent direction
 * @example
 *
 *   g2().lin(10,10,100,10).marks("cir",0,[0,0.5,1])
 *       .arc(100,100,50,3.14).marks("rec",1,['beg','end']);
 * ![Example](img/line.png "Example")
 */
g2.prototype.mark = function mark(mrk,loc,dir) {
   var idx = this.findCmdIdx(g2.prototype._hasProxy);
   if (mrk && idx !== false) {
      var cmd = this.cmds[idx],
          proxy = cmd && (cmd.proxy || cmd.c && cmd.c.proxy),
          obj = proxy && proxy.apply(this,cmd.a), p={}, w;
      loc = [].concat(loc || obj.loc && obj.loc(loc)); // convert and append number or string or array to array.
      for (var i=0; i<loc.length && !p.done; i++) {
         p = obj.p(loc[i]);
         w = dir < 0 ? Math.atan2(p.dy,p.dx)-Math.PI 
           : dir > 0 ? Math.atan2(p.dy,p.dx) 
           : 0;
         this.use(mrk,{x:p.x,y:p.y,w:w,scl:(obj.style && obj.style.lw || "@lw"),
                       ls:(obj.style && obj.style.ls || "@ls"),fs:"@ls"});
      }
   }
   return this;
};

/**
 * Add label to certain elements. 
 * See element for support and meaning of arguments.
 * @method
 * @returns {object} g2
 * @param {string} str Label text
 * @param {float || string} [loc='p'] Label location.
 *                     'c': centered, wrt. rec, cir, arc
 *                     'beg','mid', 'end', wrt. lin
 *                     'n', 'ne', 'e', 'se', 's', 'sw', 'w', or 'nw': cardinal directions
 *                     'p': strict positional.
 * @param {float} off  Offset distance [optional].
 * @example 
 *	
 *	g2().use("nod",{x:25,y:25}).label("A","se")
 *	    .exe(ctx);
 */
g2.prototype.label = function label(str,loc,off) {
   var idx = this.findCmdIdx(g2.prototype._hasProxy);
   if (idx !== false) {
      var cmd = this.cmds[idx],
          proxy = cmd && (cmd.proxy || cmd.c && cmd.c.proxy),
          obj = proxy && proxy.apply(this,cmd.a),
          p = obj && obj.p(loc) || {x:0,y:0,dx:0,dy:0},
          offset = (off+0 === off) ? (off || 1) // isnumeric ...
                 : (off === "left" ? -1 : 1)*g2.State.labelOffset,   // left of ... ?
          xoff = p.dy*offset, yoff = -p.dx*offset;
      p.x += xoff;
      p.y += yoff;
      if (str[0] === "@" && obj[str.substr(1)])
         str = ""+obj[str.substr(1)]();
      return this.txt(str,p.x,p.y,0,{thal:(xoff>0 ? "left" : xoff<0 ? "right" : "center"), tval:(yoff>0 ? "bottom" : yoff<0 ? "top" : "middle")});
   }
   return this;
};
g2.State.labelOffset = 5;

/*
 * Helper method for being called by 'g2.prototype.findCmdIdx'.
 * Test command object for providing proxy function.
 * @method
 * @returns {bool} Command object provides proxy function or not.
 * @param {object} cmd  Command object.
 */
g2.prototype._hasProxy = function(cmd) { return cmd.proxy || cmd.c.proxy; }
/*
 * Helper command for being found by 'g2.prototype.findCmdIdx'.
 * Mimicking another command.
 * @method
 * @returns {object} g2
 * @param {function} fnc Proxy function for mimicking.
 * @param {array} args  Arguments array.
 */
g2.prototype.proxy = function proxy(fnc,args) {
   this.cmds.push({proxy:fnc,a:args,c:function(){}});
   return this;
};

g2.prototype.rec.proxy = function(x,y,b,h) {
   var sq2 = Math.sqrt(2);
   var d = this.state.cartesian
         ? { c:[0,0,1],e:[1,0,1],ne:[1,1,sq2],n:[0,1,1],nw:[-1,1,sq2],w:[-1,0,1],sw:[-1,-1,sq2],s:[0,-1,1],se:[1,-1,sq2] }
         : { c:[0,0,1],e:[1,0,1],ne:[1,-1,sq2],n:[0,-1,1],nw:[-1,-1,sq2],w:[-1,0,1],sw:[-1,1,sq2],s:[0,1,1],se:[1,1,sq2] };
   return {
      p: function(loc) {
         var q = d[loc || "c"];
         return { x: x + (1 + q[0])*b/2,
                  y: y + (1 + q[1])*h/2,
                  dx: -q[1]/q[2],
                  dy:  q[0]/q[2]
         };
      }
   };
};

g2.prototype.cir.proxy = function(x,y,r) {
   var sq2 = Math.sqrt(2)/2;
   var d = this.state.cartesian
         ? { p:[0,0],c:[0,0],e:[1,0],ne:[sq2, sq2],n:[0, 1],nw:[-sq2, sq2],w:[-1,0],sw:[-sq2,-sq2],s:[0,-1],se:[sq2,-sq2] }
         : { p:[0,0],c:[0,0],e:[1,0],ne:[sq2,-sq2],n:[0,-1],nw:[-sq2,-sq2],w:[-1,0],sw:[-sq2, sq2],s:[0, 1],se:[sq2, sq2] };
   return {
      p: function(loc) {
            var q = (loc+0 === loc) ? [Math.cos(loc*2*Math.PI),Math.sin(loc*2*Math.PI)] 
                  : d[loc || "c"];
            return { x: x + q[0]*r,
                     y: y + q[1]*r,
                     dx: -q[1], 
                     dy:  q[0] };
         },
      len: function() { return 2*Math.PI*r; },
      radius: function() { return r; },
      diameter: function() { return 2*r; }
   };
};

g2.prototype.lin.proxy = function(x1,y1,x2,y2,style) {
   var ax = x2 - x1, ay = y2 - y1, len = Math.hypot(ax,ay),
       dx = len > 0 ? ax/len : 0, dy = len > 0 ? ay/len : 0,
       du = len < 40  ? 1/2 : 1 / Math.floor(len/20),
       slip = len < 20 ? 1/20*len : 1;

   return {
      get style() { return style; },
      p: function(loc) {
         var t = loc==="beg" ? 0 
               : loc==="end" ? 1 
               : (loc==="mid" || loc === "c") ? 0.5 
               : (loc+0 === loc) ? loc 
               : 0.5;
         return { x: x1 + ax*t,
                  y: y1 + ay*t,
                  dx: dx, 
                  dy: dy
         };
      },
      len: function() { return len; },
      du: function() { return du; },
      slip: function() { return slip; },
//      s: function(u) { var uuu = u*u*u; return 10*uuu - 15*uuu*u + 6*uuu*u*u; }
      s: function(u) { var uu = u*u; return 3*uu - 2*u*uu; }
   };
};

g2.prototype.arc.proxy = function(x0,y0,r,w,dw) {
   var len = Math.abs(r*dw),
       du = len < 30 ? 1/Math.max(3,Math.floor(Math.abs(dw)*2+0.5))
                     : 1 / Math.floor(len/10),
       slip = len <  30 ? 1/120*len
            : len < 100 ? 1/4
            : len < 200 ? 1/2
            : 1;
   return {
      p: function(loc) {
         var t = loc==="beg" ? 0 
               : loc==="end" ? 1 
               : loc==="mid" ? 0.5 
               : loc+0 === loc ? loc 
               : 0.5;
         var t = loc==="beg" ? 0 : loc==="end" ? 1  : loc==="mid" ? 0.5 : loc;
         return { x: x0 + r*Math.cos(w+t*dw),
                  y: y0 + r*Math.sin(w+t*dw),
                  dx: -Math.sin(w+t*dw), 
                  dy:  Math.cos(w+t*dw)
         };
      },
      len: function() { return len; },
      du: function() { return du; },
      slip: function() { return slip; },
      s: dw*dw >= Math.PI*Math.PI
       ? function(u) { return u; }
       : function(u) { var uu = u*u; return 3*uu - 2*u*uu; }
   };
};

g2.prototype.ply.proxy = function(pts,mode,args) {
   var itr = g2.prototype.ply.itr, n = itr(pts).count, len = 0;
   return {
      loc: function(q) {
         return q==="beg" ? "#0"
              : q==="end" ? "#"+Math.max(n-1,0)
              : q==="mid" ? function(){var a=[];for(var i=1;i<n-1;i++)a.push("#"+i);return a;}()
              : q;
      },
      p: function(loc) {
         if (typeof loc === "string" && loc[0] === "#")
             return this.pIdx(+loc.substr(1));
         else
             return this.pPar(loc);
      },
      pIdx: function(j) {
         var i = Math.max(j-1,0), k = Math.min(j+1,n-1),
             pi = itr(pts,i), pj = itr(pts,j), pk = itr(pts,k),
             dx = pk.x - pi.x, dy = pk.y - pi.y, dd = Math.hypot(dx,dy);
         return { x: pj.x,
                  y: pj.y,
                  dx: dx/dd, 
                  dy: dy/dd
         };
      },
      pPar: function(u) {
         return itr(pts,0);
      },
      length: function() {
         if (len === 0) {
            var i,j,pi=itr(pts,0),pj;
            for (i=0,j=1; i<(closed ? n : n-1); i++,j=(i+1)%n) {
               pj = itr(pts,j);
               len += Math.hypot(pj.x-pi.x, pj.y-pi.y);
               pi = pj;
            }
         }
         return len;
      }
   };
};

g2.prototype.use.proxy = function(g,args) {
   return g2.prototype.cir.proxy.call(this,args.x,args.y,5,args);
};

g2.prototype.end.proxy = function(begidx) {
   var begcmd = this.myBeg();
   return g2.prototype.cir.proxy.call(this,begcmd.a[1]||0,begcmd.a[2]||0,3);
};