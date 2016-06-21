/**
 * g2.mec (c) 2013-16 Stefan Goessner
 * @file mechanical extensions to `g2`.
 * @author Stefan Goessner
 * @license MIT License
 */
/* jshint -W014 */

/**
 * Mechanical extensions.
 * @namespace
 */
var g2 = g2 || { prototype:{} };  // for jsdoc only ...

/**
 * Draw markers on line element.
 * @method
 * @returns {object} g2
 * @param {object | string} mrk  `g2` object or Marker name. 
 * @param {number | string | array} loc
 *                    line parameters [0..1]<br>
 *                    line location ['beg','end','mid',..]<br>
 *                    array of line parameters or strings.
 * @param {int} [dir=0]  Direction:<br>
 *                   -1 : negative tangent direction<br>
 *                    0 : no orientation (rotation)<br>
 *                    1 : positive tangent direction
 * @example
 * g2().lin(10,10,100,10).mark("tick",[0,0.5,1],1)
 *     .arc(100,100,50,3.14).mark("sqr",1,['beg','end']);<br>
 * [Example](https://goessner.github.io/g2-mec/test/index.html#mark)
 * 
 */
g2.prototype.mark = function mark(mrk,loc,dir) {
   var idx = this.findCmdIdx(function(cmd) { return "len" in cmd && "p" in cmd; });
   if (mrk && idx !== false) {
      var cmd = this.cmds[idx], p={}, w,
          q = cmd.loc ? cmd.loc([].concat(loc)) : [].concat(loc); // convert and append number or string or array to array.
      for (var i=0; i < q.length && !p.done; i++) {
         p = cmd.p(q[i]);
         w = dir < 0 ? Math.atan2(-p.dy,-p.dx) // -Math.PI 
           : dir > 0 ? Math.atan2( p.dy, p.dx) 
           : 0;
//         console.log("lw="+(cmd.style && cmd.style.lw || 1))
         this.use(mrk,{x:p.x,y:p.y,w:w,scl:(cmd.style && cmd.style.lw || "@lwOwner"),
                       ls:(cmd.style && cmd.style.ls || "@ls"),
                       fs:"@ls"});
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
 * @param {float | string} [loc='c'] Label location depending on referenced element.<br>
 *                     'c': centered, wrt. rec, cir, arc<br>
 *                     'beg','mid', 'end', wrt. lin<br>
 *                     'n', 'ne', 'e', 'se', 's', 'sw', 'w', or 'nw': cardinal directions
 * @param {float} off  Offset distance [optional].
 */
g2.prototype.label = function label(str,loc,off) {
   var idx = this.findCmdIdx(function(cmd) { return "p" in cmd; });
   if (idx !== false) {
      loc = loc === "mid" ? 0.5 : loc;
      var cmd = this.cmds[idx],
          p = cmd.p(cmd.loc ? cmd.loc(loc) : loc),
          offset = (off+0 === off) ? (off || 1) // isnumeric ...
                 : (loc === "c") ? 0
                 : (off === "left" ? -1 : 1)*this.state.get("labelOffset"),   // left of is negative ... ?
          xoff = p.dy*offset, yoff = -p.dx*offset;
      p.x += xoff;
      p.y += yoff;
      if (str[0] === "@" && (s=cmd[str.substr(1)]))  // expect 's' as string convertable to a number ...
         str = "" + Number(s).toFixed(Math.max(g2.State.labelSignificantDigits-Math.log10(s),0))  // use at least 3 significant digits after decimal point.
                  + (str.substr(1) === "angle" ? "°" : "");
      return this.txt(str,p.x,p.y,0,{thal: (xoff > 0 ? "left"   : xoff < 0  ? "right"  : "center"), 
                                     tval: this.state.cartesian ? (yoff > 0 ? "bottom" : yoff < 0 ? "top" : "middle")
                                                                : (yoff < 0 ? "bottom" : yoff > 0 ? "top" : "middle")});
   }
   return this;
};

/**
 * Draw vector arrow.
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Start point.
 * @param {object} [r={dx:10,dy:0}] End point / direction vector in:<br>
 *                                  {x,y} absolute coordinates<br> 
 *                                  {dx,dy} relative coordinates<br>
 *                                  {r,w} polar coordinates
 */
g2.prototype.vec = function vec(p,r,style) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1,
       len = Math.hypot(x2-x1,y2-y1);

   if (len > 0)
      this.lin(x1,y1,x2,y2,style);
   if (len > 12)
      this.mark("arrow","end",1);
   return this.proxy(g2.prototype.lin,[x1,y1,x2,y2,style]);
};

/**
 * Angular vector
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Center point.
 * @param {float} r Radius
 * @param {float} [w=0] Start angle (in radian).
 * @param {float} [dw=Math.PI/2] Angular range in radian. In case of positive values it is running clockwise with
 *                left handed default coordinate system.
 */
g2.prototype.avec = function avec(p,r,w,dw,style) {
   w = w || 0; dw = dw || Math.PI/2;
   var x = p.x||0, y = p.y||0, wa = dw >= 0 ? -12/r : 12/r,
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
              .proxy(g2.prototype.arc,[x,y,r,w,dw]);
};
/**
 * Linear dimension
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Start point.
 * @param {object} [r={dx:10,dy:0}] Dimension end point / direction vector in:<br>
 *                                  {x,y} absolute coordinates<br> 
 *                                  {dx,dy} relative coordinates<br>
 *                                  {r,w} polar coordinates
 * @param {object} args Arguments object holding style properties. See 'g2.prototype.style' for details.
 * @param {string} [args.pos=in] Draw dimension arrows:<br>
 *                                 'in':  between ticks<br>
 *                                 'out': outside of ticks
 */
g2.prototype.dim = function dim(p,r,args) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1,
       x, y, dx = x2-x1, dy = y2-y1, len = Math.hypot(dx,dy), 
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
              .drw(Object.assign({ls:"@dimcolor"},args,{fs:"@ls",lc:"round",lj:"round"}))
              .proxy(g2.prototype.lin,[x1,y1,x2,y2,args]);
};

/**
 * Angular dimension
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Center point.
 * @param {float} r Radius
 * @param {float} [w=0] Start angle (in radian).
 * @param {float} [dw=Math.PI/2] Angular range in radian. In case of positive values it is running clockwise with
 *                left handed default coordinate system.
 * @param {object} args Arguments object holding style properties. See 'g2.prototype.style' for details.
 * @param {string} [args.pos=in] Draw dimension arrows:<br>
 *                                 'in':  between ticks<br>
 *                                 'out': outside of ticks
 */
g2.prototype.adim = function adim(p,r,w,dw,args) {
   w = w || 0; dw = dw || Math.PI/2;
   var x = p.x||0, y = p.y||0, inside = args && args.pos === "out" ? -1 : 1, wm = inside*(dw >= 0 ? 12/r : -12/r),
       ri = r - 2.5, ra = r + 2.5,
       c1  = Math.cos(w), s1 = Math.sin(w),
       c2  = Math.cos(w+dw), s2 = Math.sin(w+dw),
       c1m = Math.cos(w+wm), s1m = Math.sin(w+wm),
       c2m = Math.cos(w+dw-wm), s2m = Math.sin(w+dw-wm);
   return this.beg(Object.assign({},args,{fs:"@ls",lc:"round",lj:"round"}))
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
              .proxy(g2.prototype.arc,[x,y,r,w,dw]);
};

/**
 * Draw slider.
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0,w:0}] Center point.
 * @param {angle} w Rotation angle [rad]
 * @param {object} args Arguments object holding style properties. See 'g2.prototype.style' for details.
 * @param {float} [args.b=32] Slider breadth.
 * @param {float} [args.h=16] Slider height.
 */
g2.prototype.slider = function slider(p,w,args) {
   var x = p.x||0, y = p.y||0, b = args && args.b || 32, h = args && args.h || 16;
   return this.beg(Object.assign({x:x,y:y,w:w||0,ls:"@nodcolor",fs:"@linkfill",lw:1},args,{lj:"round"}))
                .rec(-b/2,-h/2,b,h)
              .end()
              .proxy(g2.prototype.rec,[x,y,b,h,args]);
};

/**
 * Draw linear spring
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Start point.
 * @param {object} [r={dx:10,dy:0}] Spring end point / direction vector in:<br>
 *                                  {x,y} absolute coordinates<br> 
 *                                  {dx,dy} relative coordinates<br>
 *                                  {r,w} polar coordinates
 * @param {object} args Arguments object holding style properties. See 'g2.prototype.style' for details.
 * @param {float} [args.h=16] Spring height.
 */
g2.prototype.spring = function spring(p,r,args) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1,
       len = Math.hypot(x2-x1,y2-y1), h = args && args.h || 16;
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
                 .proxy(g2.prototype.lin,[x1,y1,x2,y2,args]);
   }
};

/**
 * Draw line with centered square damper symbol.
 * @method
 * @returns {object} g2
 * @param {object} [p={x:0,y:0}] Start point.
 * @param {object} [r={dx:10,dy:0}] Damper end point / direction vector in:<br>
 *                                  {x,y} absolute coordinates<br> 
 *                                  {dx,dy} relative coordinates<br>
 *                                  {r,w} polar coordinates
 * @param {object} args Arguments object.
 * @param {float} [args.h=16] Spring height.
 * @param {any} [args.style] Style property. See 'g2.prototype.style' for details.
 */
g2.prototype.damper = function(p,r,args) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1,
       len = Math.hypot(x2-x1,y2-y1), h = args && args.h || 16;
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
                 .proxy(g2.prototype.lin,[x1,y1,x2,y2,args]);
   }
};

/**
 * Draw polygonial link.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points.
 * @param {bool} [closed = false] true:closed<br> false:non-closed.
 * @param {object} [style] Style object.
 */
g2.prototype.link = function link(pts,closed,style) {
   return this.ply(pts,closed,Object.assign({fs:(closed===true?"@linkfill":"transparent"),ls:"@linkcolor",lw:5,lc:"round",lj:"round"},style))
              .proxy(g2.prototype.ply,[pts]);
}
/**
 * Draw alternate glossy polygonial link.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points.
 * @param {bool} [closed = false] true:closed<br> false:non-closed.
 */
g2.prototype.link2 = function link2(pts,closed) {
    return this.cpy(closed===true ? this.ply(pts,closed,{ls:"transparent",fs:"@linkfill",lw:7,lc:"round",lj:"round"}) : this)
               .ply(pts,closed,{ls:"@nodcolor",lw:7,lc:"round",lj:"round",fs:"transparent"})
               .ply(pts,closed,{ls:"@nodfill2",lw:4.5,lc:"round",lj:"round",fs:"transparent"})
               .ply(pts,closed,{ls:"@nodfill",lw:2,lc:"round",lj:"round",fs:"transparent"})
               .proxy(g2.prototype.ply,[pts]);
}
/**
 * Draw polygonial beam.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points.
 */
g2.prototype.beam = function beam(pts) {
   return this.ply(pts,false,{fs:"transparent",ls:"@linkcolor",lw:5,lc:"butt",lj:"round"})
              .proxy(g2.prototype.ply,[pts,false,null,{lw:2}]);
}
/**
 * Draw alternate glossy polygonial beam.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points.
 */
g2.prototype.beam2 = function beam2(pts) {
    return this.ply(pts,false,{ls:"@nodcolor",lw:7,lc:"butt",lj:"round",fs:"transparent"})
               .ply(pts,false,{ls:"@nodfill2",lw:4.5,lc:"butt",lj:"round",fs:"transparent"})
               .ply(pts,false,{ls:"@nodfill",lw:2,lc:"butt",lj:"round",fs:"transparent"})
               .proxy(g2.prototype.ply,[pts,false,null,{lw:2}]);
}
/**
 * Draw bar.
 * @method
 * @returns {object} this
 * @param {v2} [p={x:0,y:0}] Start point.
 * @param {v2} [r={dx:10,dy:0}] Bar vector in absolute {x,y}, relative {dx,dy} or polar {r,w} coordinates.
 * @param {object} [style] Style object.
 */
g2.prototype.bar = function bar(p,r,style) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1;
   return this.lin(x1,y1,x2,y2,Object.assign({ls:"@linkcolor",lw:6,lc:"round"},style))
              .proxy(g2.prototype.lin,[x1,y1,x2,y2]);
}

/**
 * Draw bar.
 * @method
 * @returns {object} this
 * @param {v2} [p={x:0,y:0}] Start point.
 * @param {v2} [r={dx:10,dy:0}] Bar end point in absolute {x,y} or vector in relative {dx,dy} or polar {r,w} coordinates.
 */
g2.prototype.bar2 = function bar2(p,r) {
   var x1 = p && p.x || 0, x2 = typeof r === "object" ? ("x" in r ? r.x : "dx" in r ? (x1 + r.dx) : "r" in r ? (x1 + r.r*Math.cos(r.w||0)) : 0) : (x1+10),
       y1 = p && p.y || 0, y2 = typeof r === "object" ? ("y" in r ? r.y : "dy" in r ? (y1 + r.dy) : "r" in r ? (y1 + r.r*Math.sin(r.w||0)) : 0) : y1;
   return this.lin(x1,y1,x2,y2, {ls:"@nodcolor",lw:7,lc:"round"})
              .lin(x1,y1,x2,y2, {ls:"@nodfill2",lw:4.5,lc:"round"})
              .lin(x1,y1,x2,y2, {ls:"@nodfill",lw:2,lc:"round"})
              .proxy(g2.prototype.lin,[x1,y1,x2,y2]);
}

/**
 * Draw pulley.
 * @method
 * @returns {object} this
 * @param {v2} [p={x:0,y:0}] Center point.
 * @param {float} [r=25] Radius.
 */
g2.prototype.pulley = function pulley(p,r) {
   r = r || 25;
   return this.cir(p.x,p.y,r,{ls:"@nodcolor",fs:"#e6e6e6",lw:1})
              .cir(p.x,p.y,r-5,{ls:"@nodcolor",fs:"#e6e6e6",lw:1})
              .cir(p.x,p.y,r-6,{ls:"#8e8e8e",fs:"transparent",lw:2})
              .cir(p.x,p.y,r-8,{ls:"#aeaeae",fs:"transparent",lw:2})
              .cir(p.x,p.y,r-10,{ls:"#cecece",fs:"transparent",lw:2})
              .proxy(g2.prototype.cir,[p.x,p.y,r]);
}
/**
 * Draw alternate pulley.
 * @method
 * @returns {object} this
 * @param {object} [pos={x:0,y:0,w:0}] Center point position and rotation angle.
 * @param {float} [r=25] Radius.
 */
g2.prototype.pulley2 = function pulley2(pos,r) {
   r = r || 25;
   return this.beg(pos)
                .bar2({x:0,y:r-4},{x:0,y:-r+4})
                .bar2({x:r-4,y:0},{x:-r+4,y:0})
                .cir(0,0,r-2.5,{ls:"#e6e6e6",fs:"transparent",lw:5})
                .cir(0,0,r,{ls:"@nodcolor",fs:"transparent",lw:1})
                .cir(0,0,r-5,{ls:"@nodcolor",fs:"transparent",lw:1})
              .end()
              .proxy(g2.prototype.cir,[pos.x,pos.y,r]);
}
/**
 * Draw rope. Amount of pulley radii must be greater than 10 units. They are forced to zero otherwise.
 * @method
 * @returns {object} this
 * @param {v2} [p1={x:0,y:0}] Start pulley center.
 * @param {float} [r1=20] Start pulley radius. With positive radius the rope leaves the 
 *                        pulley in counterclockwise direction. Negative radius 
 *                        forces the rope to leave in clockwise direction (cartesian rule).
 * @param {v2} [p2={x:0,y:0}] End pulley center.
 * @param {float} [r2=20] End pulley radius. With positive radius the rope leaves the 
 *                        pulley in counterclockwise direction. Negative radius 
 *                        forces the rope to leave in clockwise direction (cartesian rule).
 */
g2.prototype.rope = function rope(p1,r1,p2,r2,style) {
   var Rmin = 10,
       R1 = r1 >  Rmin ? r1 - 2.5 
          : r1 < -Rmin ? r1 + 2.5
          : 0,
       R2 = r2 >  Rmin ? r2 - 2.5 
          : r2 < -Rmin ? r2 + 2.5
          : 0,
       dx = p2.x-p1.x, dy = p2.y-p1.y, dd = dx*dx + dy*dy,
       R12 = R1+R2, l = Math.sqrt(dd - R12*R12),
       cpsi = (R12*dx + l*dy)/dd,
       spsi = (R12*dy - l*dx)/dd,
       x1 = p1.x + cpsi*R1,
       y1 = p1.y + spsi*R1,
       x2 = p2.x - cpsi*R2,
       y2 = p2.y - spsi*R2;
   return this.lin(x1,y1,x2,y2,Object.assign({ls:"#888",lw:4},style))
              .proxy(g2.prototype.lin,[x1,y1,x2,y2]);
}
/**
 * Polygon ground.
 * @method
 * @returns {object} this
 * @param {array} pts Array of points
 * @param {bool} [closed=false] Closed polygon.
 * @param {object} [args] Arguments object.
 * @param {float} [args.h=4] Ground shade line width.
 * @param {string} [args.pos=right] Ground shade position ["left","right"].
 */
g2.prototype.ground = function ground(pts,closed,args) {
   var i, p0, pp, pn, p, e0, dx, dy, ep, en, len, lam, eq = [],
       h = args && args.h || 4,
       sign = args && args.pos === "left" ? 1 : -1,
       itr =  g2.prototype.ply.itrOf(pts,args);
   p0 = pp = itr(i=0);
   eq.push(p0);
   p = itr(i=1);
   dx = p.x-pp.x; dy = p.y-pp.y; len = Math.hypot(dx,dy) || 1;
   e0 = ep = {x:dx/len,y:dy/len};
   for (pn = itr(++i); i < itr.len; pn = itr(++i)) {
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
   return this.beg(Object.assign({x:-0.5,y:-0.5,ls:"@linkcolor",lw:2},args,{fs:"transparent",lc:"butt",lj:"miter"}))
                 .ply(eq,closed,{ls:"@nodfill2",lw:2*h})
                 .ply(pts,closed,args)
              .end()
};

/**
 * Polygonial line load. The first and last point define the base line onto which
 * the load is acting orthogonal.
 * @method
 * @returns {object} this
 * @param {array} pts Array of load contour points.
 * @param {real} spacing Spacing of the vectors drawn as a positive real number, interprete as<br>
 *                       * spacing &lt; 1: spacing = 1/m with a partition of m.<br>
 *                       * spacing &gt; 1: length of spacing.
 * @param {object} [style] Arguments object.
 */
g2.prototype.load = function load(pts,spacing,style) {
   function iterator(p,dlambda) {
      var ux = pn.x - p0.x, uy = pn.y - p0.y, uu = ux*ux + uy*uy,
          lam = [], dlam, lambda = -dlambda;

      for (var i = 0; i < n; i++)  // build array of projection parameters of polypoints onto base line.
         lam[i] = ((pitr(p,i).x - p0.x)*ux + (pitr(p,i).y - p0.y)*uy)/uu;

      return {
         next: function() {
            lambda += dlambda;
            for (var i = 0; i < n; i++) {
               dlam = lam[i+1] - lam[i];
               if (dlam > 0 && lam[i] <= lambda && lambda <= lam[i+1]) {
                  var mu = (lambda - lam[i])/dlam;
                  return {
                     value: {
                        p1: {x:p0.x + lambda*ux,y:p0.y + lambda*uy},
                        p2: {x:pitr(p,i).x + mu*(pitr(p,i+1).x-pitr(p,i).x),y:pitr(p,i).y + mu*(pitr(p,i+1).y-pitr(p,i).y)}
                     }
                  }
               }
            }
            return { done: true };
         }
      };
   }

   var pitr = g2.prototype.ply.itrOf(pts), n = pitr(pts).count, p0 = pitr(pts,0), pn = pitr(pts,n-1),
       dlambda = spacing < 1 ? spacing : spacing/Math.hypot(pn.x-p0.x,pn.y-p0.y),
       itr = iterator(pts,dlambda), val;
   this.ply(pts,false,Object.assign({fs:"@linkfill"},style,{ls:"transparent"}));

   while (!(val = itr.next()).done)
      this.vec(val.value.p2,val.value.p1,style);

   this.proxy(g2.prototype.ply,[pts,false]);

   return this;
}

/**
 * Mechanical style values.
 * Not really meant to get overwritten. But if you actually want, proceed.<br>
 * Theses styles can be referenced using the comfortable '@' syntax.
 * @namespace
 * @property {object} State  `g2` state namespace.
 * @property {string} [State.nodcolor=#333]    node color.
 * @property {string} [State.nodfill=#dedede]   node fill color.
 * @property {string} [State.nodfill2=#aeaeae]    alternate node fill color, somewhat darker.
 * @property {string} [State.linkcolor=#666]   link color.
 * @property {string} [State.linkfill=rgba(200,200,200,0.5)]   link fill color, semi-transparent.
 * @property {string} [State.dimcolor=darkslategray]   dimension color.
 * @property {array} [State.solid=[]]   solid line style.
 * @property {array} [State.dash=[15,10]]   dashed line style.
 * @property {array} [State.dot=[4,4]]   dotted line style.
 * @property {array} [State.dashdot=[25,6.5,2,6.5]]   dashdotted line style.
 * @property {number} [State.labelOffset=5]    default label offset distance.
 * @property {number} [State.labelSignificantDigits=3]   default label's significant digits after floating point.
 */
g2.State = g2.State || {};
g2.State.nodcolor = "#333";
g2.State.nodfill  = "#dedede";
g2.State.nodfill2 = "#aeaeae";
g2.State.linkcolor = "#666";
g2.State.linkfill = "rgba(200,200,200,0.5)";
g2.State.dimcolor = "darkslategray";
g2.State.solid = [];
g2.State.dash = [15,10];
g2.State.dot = [4,4];
g2.State.dashdot = [25,6.5,2,6.5];
g2.State.labelOffset = 5;
g2.State.labelSignificantDigits = 3;  //  0.1234 => 0.123,  0.01234 => 0.0123, 1.234 => 1.23, 12.34 => 12.3, 123.4 => 123, 1234 => 1234

/**
 * Mechanical symbols and line markers as individual `g2` instances. Use them via `use` command.<br>
 * @namespace
 * @property {object} symbol    `g2` symbol namespace.
 * @property {object} symbol.origin   origin symbol.
 * @property {object} symbol.nod   node symbol.
 * @property {object} symbol.dblnod   double-node symbol.
 * @property {object} symbol.nodfix  fixed node / bearing symbol.
 * @property {object} symbol.dblnodfix  fixed double-node / bearing symbol.
 * @property {object} symbol.nodflt  floating node / bearing symbol.
 * @property {object} symbol.dblnodfix  floating double-node / bearing symbol.
 * @property {object} symbol.gnd  ground node symbol.
 * @property {object} symbol.pol  pole symbol.
 * @property {object} symbol.dot  dot marker symbol.
 * @property {object} symbol.sqr  square marker symbol.
 * @property {object} symbol.tilde  tilde marker symbol.
 * @property {object} symbol.arrow  arrow marker symbol.
 * @property {object} symbol.tick  tick marker symbol.
 * @property {object} symbol.arrowtick  arrow-tick marker symbol.
 */
g2.symbol = g2.symbol || {};
g2.symbol.origin = function() {
   var z = 3.5;
   return g2().beg({lc:"round",lj:"round",lw:1,fs:"@nodfill"})
                .p().m(6*z,0).l(0,0).l(0,6*z).stroke()
                .p().m(10*z,0).l(6*z,3/4*z).a(-Math.PI/3,6*z,-3/4*z).z()
                    .m(0,10*z).l(3/4*z,6*z).a( Math.PI/3,-3/4*z,6*z).z().drw()
                .cir(0,0,z)
              .end();
}();
g2.symbol.nod =    g2().cir(0,0,4,{ls:"@nodcolor",fs:"@nodfill",lwnosc:true});
g2.symbol.dblnod = g2().cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill"}).cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill2",lwnosc:true});
g2.symbol.nodfix = g2().style({ls:"@nodcolor",fs:"@nodfill",lwnosc:true})
                       .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                       .drw({fs:"@nodfill2"})
                       .cir(0,0,4);
g2.symbol.dblnodfix = g2().style({ls:"@nodcolor",fs:"@nodfill",lwnosc:true})
                         .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                       .drw({ls:"@nodcolor",fs:"@nodfill2"})
                       .cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill"})
                       .cir(0,0,3,{ls:"@nodcolor",fs:"@nodfill2"});
g2.symbol.nodflt = g2().style({ls:"@nodcolor",fs:"@nodfill",lwnosc:true})
                       .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                         .z()
                       .drw({fs:"@nodfill2"})
                       .cir(0,0,4,{fs:"@nodfill"})
                       .lin(-9,-19,9,-19,{ls:"@nodfill2",lw:5,lwnosc:false})
                       .lin(-9,-15.5,9,-15.5,{ls:"@nodcolor",lw:2,lwnosc:false});
g2.symbol.dblnodflt = g2().style({ls:"@nodcolor",fs:"@nodfill2",lwnosc:true})
                       .p()
                         .m(-8,-12)
                         .l(0,0)
                         .l(8,-12)
                         .z()
                       .drw()
                       .cir(0,0,6,{fs:"@nodfill"})
                       .cir(0,0,3)
                       .lin(-9,-19,9,-19,{ls:"@nodfill2",lw:5,lwnosc:false})
                       .lin(-9,-15.5,9,-15.5,{lw:2,lwnosc:false});
g2.symbol.gnd =    g2().cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill",lwnosc:true})
                       .p().m(0,6).a(-Math.PI/2,6,0).l(-6,0).a(Math.PI/2,0,-6).z().fill({fs:"@nodcolor"});
g2.symbol.pol =    g2().cir(0,0,6,{ls:"@nodcolor",fs:"@nodfill",lwnosc:true})
                       .cir(0,0,2.5,{ls:"@nodcolor",fs:"@nodcolor"});
                       
g2.symbol.dot = g2().cir(0,0,1.5,{fs:"@ls",lwnosc:true});
g2.symbol.sqr = g2().rec(-1.5,-1.5,3,3,{fs:"@ls",lwnosc:true});
g2.symbol.tilde = g2().p().m(0,2).a(Math.PI/2,0,0).a(-Math.PI/2,0,-2).stroke({lc:"round"});
g2.symbol.arrow = g2().p().m(0,0).l(-7,-2).a(Math.PI/3,-7,2).z().drw({fs:"@ls",lj:"round",lwnosc:true});
g2.symbol.tick = g2().p().m(0,-2).l(0,2).stroke({lc:"round"});
g2.symbol.arrowtick = g2().p().m(0,-2).l(0,2).m(0,0).l(-7,-2).a(Math.PI/3,-7,2).z().drw({lj:"round",lc:"round"});
g2.symbol.ifo2pos = g2().style({ls:"@nodcolor",lc:"round",fs:"@ls",lw:1,lwnosc:true})
                        .p().m(0,2).a(-Math.PI/2,0,0).a(Math.PI/2,0,-2)
                            .m(6,-6).a(Math.PI/2,6,6).stroke()
                        .p().m(3,6).l(3,-2).m(3,-6).l(4,-2).a(-Math.PI/3,2,-2).z()
                            .m(7,3).a(-Math.PI/3,8.5,4).l(6,6).z()
                        .drw();
g2.symbol.ifo2neg = g2().style({ls:"@nodcolor",lj:"miter",fs:"@ls",lw:1,lwnosc:true})
                         .p().m(0,2).a(Math.PI/2,0,0).a(-Math.PI/2,0,-2)
                             .m(-6,-6).a(-Math.PI/2,-6,6).stroke()
                         .p().m(-3,-6).l(-3,5).m(-3,6).l(-4,3).a(-Math.PI/3,-2,3).z()
                             .m(-7,3).a(Math.PI/3,-8.5,4).l(-6,6).z()
                        .drw();
g2.symbol.ifo3pos = g2().style({ls:"@nodcolor",lc:"round",fs:"@ls",lw:1,lwnosc:true})
                        .p().m(0,2).a(-Math.PI/2,0,0).a(Math.PI/2,0,-2)
                            .m(6,-6).a(Math.PI/2,6,6).stroke()
                        .p().m(3,6).l(3,-2).m(3,-6).l(4,-2).a(-Math.PI/3,2,-2).z()
                            .m(7,3).a(-Math.PI/3,8.5,4).l(6,6).z()
                            .m(4,0).l(10,0).m(14,0).l(10,-1).a(Math.PI/3,10,1).z()
                        .drw();
g2.symbol.ifo3neg = g2().style({ls:"@nodcolor",lc:"round",fs:"@ls",lw:1,lwnosc:true})
                        .p().m(0,2).a(Math.PI/2,0,0).a(-Math.PI/2,0,-2)
                            .m(-6,-6).a(-Math.PI/2,-6,6).stroke()
                        .p().m(-3,-6).l(-3,5).m(-3,6).l(-4,3).a(-Math.PI/3,-2,3).z()
                            .m(-7,3).a(Math.PI/3,-8.5,4).l(-6,6).z()
                            .m(-4,0).l(-10,0).m(-14,0).l(-10,-1).a(-Math.PI/3,-10,1).z()
                        .drw();

// ======================

g2.prototype.lin.proto = {
   get x1() { return this.a[0]; },
   get y1() { return this.a[1]; },
   get dx() { return this.a[2] - this.a[0]; },
   get dy() { return this.a[3] - this.a[1]; },
   get len() { return Math.hypot(this.dx,this.dy); },
   get style() { return this.a[4]; },
   p: function(loc) {
      var t = loc==="beg" ? 0 
            : loc==="end" ? 1 
            : (loc+0 === loc) ? loc
            : 0.5,
          len = this.g2.state.cartesian ? this.len : -this.len; // correct left/right side ...
      return { x: this.x1 + this.dx*t,
               y: this.y1 + this.dy*t,
               dx: this.dx/len,
               dy: this.dy/len
      };
   },
};

g2.prototype.rec.proto = {
   dir: { c:[0,0,1],e:[1,0,1],ne:[1,-1,Math.SQRT2],n:[0,-1,1],nw:[-1,-1,Math.SQRT2],w:[-1,0,1],sw:[-1,1,Math.SQRT2],s:[0,1,1],se:[1,1,Math.SQRT2] },
   get x() { return this.a[0]; },
   get y() { return this.a[1]; },
   get b() { return this.a[2]; },
   get h() { return this.a[3]; },
   get len() { return 2*(this.b+this.h); },
   get style() { return this.a[4]; },
   p: function(loc) {
      var q = this.dir[loc || "c"] || this.dir['c'],
          nx = q[0], ny = this.g2.state.cartesian ? -q[1] : q[1];
      return { x: this.x + (1 + nx)*this.b/2,
               y: this.y + (1 + ny)*this.h/2,
               dx: -ny/q[2],
               dy:  nx/q[2]
      };
   }
};

g2.prototype.cir.proto = {
   dir: { c:[0,0],e:[1,0],ne:[Math.SQRT2/2,Math.SQRT2/2],n:[0,1],nw:[-Math.SQRT2/2,Math.SQRT2/2],w:[-1,0],sw:[-Math.SQRT2/2,-Math.SQRT2/2],s:[0,-1],se:[Math.SQRT2/2,-Math.SQRT2/2] },
   get x() { return this.a[0]; },
   get y() { return this.a[1]; },
   get r() { return this.a[2]; },
   get len() { return 2*Math.PI*this.r; },
   get style() { return this.a[3]; },
   p: function(loc) {
      var q = (loc+0 === loc) ? [Math.cos(loc*2*Math.PI),Math.sin(loc*2*Math.PI)] 
                              : this.dir[loc || "c"],
          nx = q[0], ny = this.g2.state.cartesian ? q[1] : -q[1];
      return { x: this.x + nx*this.r,
               y: this.y + ny*this.r,
               dx: -ny, 
               dy:  nx 
      };
   }
};

g2.prototype.arc.proto = {
   get x() { return this.a[0]; },
   get y() { return this.a[1]; },
   get r() { return this.a[2]; },
   get w() { return this.a[3]; },
   get dw() { return this.a[4]; },
   get len() { return Math.abs(this.r*this.dw); },
   get angle() { return this.dw/Math.PI*180; },
   get style() { return this.a[5]; },
   p: function(loc) {
      var t = loc==="beg" ? 0 
            : loc==="end" ? 1 
            : loc==="mid" ? 0.5 
            : loc+0 === loc ? loc 
            : 0.5,
          ang = this.w+t*this.dw, cang = Math.cos(ang), sang = Math.sin(ang), r = loc === "c" ? 0 : this.r;
      return { x: this.x + r*cang,
               y: this.y + r*sang,
               dx: -sang, 
               dy:  cang
      };
   }
};

// a:[pts,mode,itr,style]
g2.prototype.ply.proto = {
   get pts() { return this.a[0]; },
   get itr() { return this.a[2] || g2.prototype.ply.itrOf(this.a[0],this.a[3]); },
   get n() { return this.itr.len; },
   get closed() { return this.a[1] === true; },
   get style() { return this.a[3]; },
   get len() {  // cannot cache polygon length, as points might be dynamically modified ...
      var i, j, itr = this.itr, pi = itr(0), pj, n = this.n, closed = this.closed, len = 0;
      for (i=0, j=1; i < (closed ? n : n-1); i++, j=(i+1)%n) {
         pj = itr(j);
         len += Math.hypot(pj.x-pi.x, pj.y-pi.y);
         pi = pj;
      }
      return len;
   },
   // substitute locations in array 'q'.
   loc: function(q) {
      function idxarr(m,n) { var a=[]; for(var i=m;i < n;i++) a.push("#"+i); return a; }
      for (var i=0; i<q.length; i++) {
         if      (q[i] === "beg") q[i] = "#0";
         else if (q[i] === "end") q[i] = "#"+Math.max(this.n-1,0);
         else if (q[i] === "mid") q = q.splice(i,1) && q.concat(idxarr(1,Math.max(1,this.n-1)));
         else if (q[i] === "all") q = q.splice(i,1) && q.concat(idxarr(0,Math.max(1,this.n)));
         else if (q === undefined) q[i] = 0.5;
      }
      return q;
   },
   p: function(loc) {
      if (typeof loc === "string" && loc[0] === "#")
          return this.pIdx(+loc.substr(1));
      else
          return this.pPar(loc);
   },
   pIdx: function(j) {
      var i = Math.max(j-1,0), k = Math.min(j+1,this.n-1), itr = this.itr,
          pi = itr(i), pj = itr(j), pk = itr(k),
          dx = pk.x - pi.x, dy = pk.y - pi.y, 
          dd = this.g2.state.cartesian ? Math.hypot(dx,dy) : -Math.hypot(dx,dy);
      return { x: pj.x,
               y: pj.y,
               dx: dx/dd, 
               dy: dy/dd
      };
   },
   pPar: function(u) {
      var i, j, itr = this.itr, pi = itr(0), pj, n = this.n, len = this.len, 
          closed = this.closed, s = 0, dx, dy, ds, su, ui, 
          sgn = this.g2.state.cartesian ? 1 : -1;
      if (len > 0) {
         u = Math.max(0,Math.min(1,u));  // 0 <= u <= 1
         su = u*len;
         for (i=0, j=1; i <= (closed ? n : n-1); i++, j=(i+1)%n) {
            pj = itr(j);
            dx = pj.x-pi.x; 
            dy = pj.y-pi.y;
            ds = Math.hypot(dx,dy);
            if (s + ds >= su) {
               ui = (u - s/len)*len/ds;
               return { x: pi.x + ui*dx,
                        y: pi.y + ui*dy,
                        dx: sgn*dx/ds, 
                        dy: sgn*dy/ds
               };
            }
            s += ds;
            pi = pj;
        }
      }
      return itr(0);
   },
};

g2.prototype.use.proto = {
   dir: g2.prototype.cir.proto.dir,
   get x() { return this.a[1].x; },
   get y() { return this.a[1].y; },
   get r() { return 5; },
   p: g2.prototype.cir.proto.p
};

/*
   hatch: function hatch(val) {
      var ctx = document.createElement('canvas').getContext('2d'), 
          sz = +val[3] || 10, sz2 = (sz+1)*0.5;
      ctx.canvas.width = ctx.canvas.height = sz;
      ctx.fillStyle = val[1] || "white";
      ctx.fillRect(0,0,sz,sz);
      ctx.strokeStyle = val[0] || "black";
      ctx.lineWidth = +val[2] || 1;
      ctx.lineCap = "square";
      ctx.beginPath();
      ctx.moveTo(sz2,0.5);
      ctx.lineTo(sz+0.5,sz2);
      ctx.moveTo(0.5,sz2);
      ctx.lineTo(sz2,sz+0.5);
      ctx.stroke();
      return ctx.createPattern(ctx.canvas,'repeat');
   }
*/

/**
 * Debug helper method.
 * Convert g2 command queue to JSON formatted string.
 * @param {string} [space] Number of spaces to use for indenting JSON output.
 * @return {string} JSON string of command queue.
 */
/*
g2.prototype.dump = function(space) {
   function trace(obj) {
      var out = [],o,cmd,a,c,args;
      for (var i=0, n=obj.cmds.length; i < n; i++) {
         args = [];
         cmd = obj.cmds[i];
         a = cmd.a;
         for (var j=0,m=a && a.length || 0; j < m; j++) {
            if (typeof a[j] === "object" && a[j] instanceof g2) {
               if (a[j] !== obj) args.push(trace(a[j]));
            }
            else if (a[j] !== undefined)
               args.push(a[j]);
         }
         c = /\W*function\s+([\w\$]+)\(/.exec(cmd.c.toString())[1];
         if (args.length) {
            o = {};
            o[c] = args;
         }
         else
            o = c;
         out.push(o);
      }
      return out;
   }
   return JSON.stringify(trace(this), undefined, space);
};
*/
