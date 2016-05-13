# g2.mec.js #

## g2 extension for mechanical applications ##

### Mechanical Symbols ###

`g2.mec.js` provides some useful mechanical symbols.

![img.symbols.mec](img/symbols.mec.png)

Using these symbols is easily done with the help of the `use` command. While they are available 
through the `g2.symbol` namespace, the bare symbol name is sufficient as the first parameter.
We can translate, rotate and scale the symbols as expected. Please note, that their line width is mostly immune 
against scaling.

```javascript
    g = g2().use(g2.symbol.origin,{x:100,y:50});
    // or alternatively ...
    g = g2().use("origin",{x:100,y:50});
```

### Mechanical Elements ###

`g2.mec.js` also provides some mechanical elements.

![img.elements.mec](img/elements.mec.png)

Element functions have individual arguments.

Element | Meaning
-------- | --------
`vec(p,r,style)` | Linear vector element by start point `p` and end point or direction `r`.
`avec(p,r,w,dw,style)` | Arc vector element by center point `p`, radius `r`, start angle `w` and angular range `dw`. 
`dim(p,r,args)` | Linear dimension element by start point `p` and end point or direction `r`.
`adim(p,r,w,dw,args)` |  Arc dimension element by center point `p`, radius `r`, start angle `w` and angular range `dw`.
`slider(p,w,args)` | Slider element by center point `p` and rotation angle `w`.
`spring(p,r,args)` | Symbolical Spring element by start point `p` and end point or direction `r`.
`damper(p,r,args)` | Symbolical Damper element by start point `p` and end point or direction `r`.
`ground(pts,closed,args)` | Polygonial ground element by points array `pts` and closed flag `closed`.
`bar(p,r)` | Bar element by start point `p` and end point or direction `r`.
`bar2(p,r)` | Alternate Bar2 element by start point `p` and end point or direction `r`.
`link(pts,mode)` | Link element by points array `pts` and mode flag [`true,false,'split'`].
`link2(pts,mode)` | Alternate Link2 element by points array `pts` and mode flag [`true,false,'split'`].


### Mechanical Styles

There are some predefined colors, line styles and other constants. 
You can overwrite them, if you are not comfortable with it.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| State | <code>object</code> |  | `g2` state namespace. |
| State.nodcolor | <code>string</code> | <code>&quot;#333&quot;</code> | node color. |
| State.nodfill | <code>string</code> | <code>&quot;#dedede&quot;</code> | node fill color. |
| State.nodfill2 | <code>string</code> | <code>&quot;#aeaeae&quot;</code> | alternate node fill color, somewhat darker. |
| State.linkcolor | <code>string</code> | <code>&quot;#666&quot;</code> | link color. |
| State.linkfill | <code>string</code> | <code>&quot;rgba(200,200,200,0.5)&quot;</code> | link fill color, semi-transparent. |
| State.solid | <code>array</code> | <code>[]</code> | solid line style. |
| State.dash | <code>array</code> | <code>[15,10]</code> | dashed line style. |
| State.dot | <code>array</code> | <code>[4,4]</code> | dotted line style. |
| State.dashdot | <code>array</code> | <code>[25,6.5,2,6.5]</code> | dashdotted line style. |
| State.labelOffset | <code>number</code> | <code>5</code> | default label offset distance. |
| State.labelSignificantDigits | <code>number</code> | <code>3</code> | default label's significant digits after floating point. |


### Truss Example ###

You can see a simple truss below, composed from mechanical symbols and elements.

![img.truss.mec](img/truss.mec.png)

```js
// g2.mec truss example ...
    var A = {x:50,y:50},  B = {x:250,y:50},
        C = {x:50,y:150}, D = {x:150,y:150},
        E = {x:50,y:250},
        g = g2()
             .cartesian()
             .link2([A,B,E,A,D,C])
             .vec(B,{dx:0,dy:-50},{lw:2,ls:"darkred"})
             .vec(D,{dx:80,dy:0},{lw:2,ls:"darkred"})
             .use("nodfix",A)
             .use("nod",B)
             .use("nod",C)
             .use("nod",D)
             .use("nodflt",{x:E.x,y:E.y,w:-Math.PI/2})
             .exe(document.getElementById("c").getContext("2d"));
```

### Labels

If you want to add text to a geometric element, you can always use the basic `txt` element. However some 
element types support the smarter `label` element, which comes with a more intuitive relative positioning with respect 
to its nearest previous element. 

Element | Meaning
:--------: | :--------:
`label(str,loc,off)` | Label element placing string `str` at location `loc` using offset `off`.

Point like and rectangular elements provide locations according cardinal directions. Linear elements provide parameterized numerical
or named locations.

| Type  | Elements | default | locations | offset | img |
| :-----: | :------: | :-----: | :-----: | :-----: | :-----: |
| Point elements | `cir, use` | `c` |`c`<br>`e,ne,n,nw,w,sw,s,se`<br>angle in [radians] | number | ![img.point-label.mec](img/point-label.mec.png) |
| Rectangular elements | `rec, slider` | `c` |`c`<br>`e,ne,n,nw,w,sw,s,se` | number | ![img.rec-label.mec](img/rec-label.mec.png) |
| Linear elements | `lin, vec, dim`<br>`arc, avec, adim`<br>`spring, damper`<br> `bar, bar2`| `0.5` | `beg, mid, end`<br> normalized numerical parameter | `left, right`<br>number | ![line with labels](img/line-label.mec.png)
| Polygonial elements | `ply, ground`<br>`link, link2` | `0.5` | `beg, end`<br> `#index` <br> normalized numerical parameter | `left, right`<br>number | ![polygon with labels](img/poly-label.mec.png)

If there is no offset distance specified, the global `g2.State.labelOffset`'s value is taken. Please note,
that cardinal locations are not sensitive to transformations.


### Truss Example with Labels###

The truss example above can now be improved by adding labels.

![truss with labels](img/truss-labels.mec.png)

```javascript
  // g2.mec truss example with labels ...
     var A = {x:50,y:50},  B = {x:250,y:50},
         C = {x:50,y:150}, D = {x:150,y:150},
         E = {x:50,y:250},
         g = g2()
              .cartesian()
              .style({foz:12,fof:"cursive",foc:"green"})
              .bar2(A,B).label("1")
              .bar2(A,C).label("2")
              .bar2(A,D).label("3")
              .bar2(B,D).label("4")
              .bar2(C,D).label("5")
              .bar2(C,E).label("6")
              .bar2(D,E).label("7")
              .style({foc:"@nodcolor"})
              .vec(B,{dx:0,dy:-50},{lw:2,ls:"brown"}).label("F","end","left")
              .vec(D,{dx:80,dy:0},{lw:2,ls:"brown"}).label("2F","end")
              .use("nodfix",A).label("A","w")
              .use("nod",B).label("B","se")
              .use("nod",C).label("C","w")
              .use("nod",D).label("D","ne")
              .use("nodflt",{x:E.x,y:E.y,w:-Math.PI/2}).label("E","e")
              .style({ls:"@dimcolor",foc:"@ls"})
              .dim({x:A.x,y:275},{dx:100,dy:0}).label("b")
              .dim({x:D.x,y:275},{dx:100,dy:0}).label("b")
              .dim({x:275,y:E.y},{dx:0,dy:-100}).label("b")
              .dim({x:275,y:D.y},{dx:0,dy:-100}).label("b")
              .exe(document.getElementById("c").getContext("2d"));
```

### Markers

Markers can be placed onto the outline of the nearest previous element.

Element | Meaning
:--------: | :--------:
`mark(type,loc,dir)` | Marker element placing marker symbol `type` at locations `loc` regarding to direction `dir`.

Elements with a unique center and rectangular elements provide locations according cardinal directions.
Linear elements provide parameterized numerical or named locations.

| Type  | Elements | default | locations |dir | img |
| :-----: | :------: | :-----: | :-----: | :-----: | :-----: |
| Centered elements | `cir` | `c` | `c`<br>`e,ne,n,nw,w,sw,s,se`<br>normalized parameter | `-1,0,1` | ![circular markers](img/cir-markers.png) |
| Rectangular elements | `rec, slider` | `c` | `c`<br>`e,ne,n,nw,w,sw,s,se` | `-1,0,1` | ![rectangular markers](img/rec-markers.png) |
| Linear elements | `lin, vec, dim`<br>`arc, avec, adim`<br>`spring, damper`<br> `bar, bar2`| `0.5` | `beg, mid, end`<br> normalized numerical parameter | `-1,0,1` | ![linear markers](img/lin-markers.png)
| Polygonial elements | `ply, ground`<br>`link, link2` | `0.5` | `beg, mid, end`<br> `#index` <br> normalized numerical parameter |`-1,0,1` | ![polygonial markers](img/poly-markers.png)


## API Reference
See the [API Reference](api/readme.md) for details.
