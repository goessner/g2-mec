# g2.mec.js #

## g2 extension for mechanical contents ##

### Mechanical Symbols ###

`g2.mec.js` provides some useful mechanical symbols.

![img.symbols.mec]

Using these symbols is easily done with the help of the `use` command. While they are available 
through the `g2.symbol` namespace, the bare symbol name is sufficient as the first parameter.
We can translate, rotate and scale the symbols as expected. Please note, that their line width is mostly immune 
against scaling.

```javascript
    g = g2().use(g2.symbol.origin);
    // or alternatively ...
    g = g2().use("origin");
```

### Mechanical Elements ###

`g2.mec.js` also provides some few mechanical elements.

![img.elements.mec]

Element functions have different arguments. See the reference for details.


### Truss Example ###

You can see a simple truss below, composed from mechanical symbols and elements.

![img.truss.mec]

```javascript
    // g2.mec truss example ...
    var xA = 50, yA = 50,  xB = 250, yB = 50,
        xC = 50, yA =150,  xD = 150, yD =150,
        xE = 50, yE =250,
        g = g2({cartesian:true,pan:{dx:10,dy:10}})
              .style({lw:3,ls:"@nodcolor"})
              .ply([xA,yA,xB,yB,xE,yE,xA,yA,xD,yD,xC,yC]
              .style({lw:2,ls:"orange"})
              .vec(xB,yB,xB,yB-50)
              .vec(xD,yD,xD+80,yD)
              .style({lw:1,ls:"@nodcolor"})
              .use("nodfix",xA,yA)
              .use("nod",xB,yB)
              .use("nod",xC,yC)
              .use("nod",xD,xD)
              .use("nodflt",xE,yE,-Math.PI/2)
              .exe(document.getElementById("c").getContext("2d"));
```

### Labels ###

If you want to add a textual label to a geometric element, you can always use the `txt` element. However some 
element types support the smarter `label` element, which comes with a more intuitive, relative positioning with respect 
to its previous element. 

Elements  | Label positions
 ------------- | :-------------: |
Centric `point` elements | ![img.point-label.mec]
Linear `line` elements  | ![img.line-label.mec]

The dotted lines indicate the labels offset distance, which is set by the style property `style({labelOffset:<val>})`.


### Truss Example with Labels###

We can now improve our truss example by adding useful labels.

![img.truss-labels.mec]

```javascript
    // g2.mec truss example with labels ...
    var xA = 50, yA = 50,  xB = 250, yB = 50,
        xC = 50, yA =150,  xD = 150, yD =150,
        xE = 50, yE =250,
        g = g2({cartesian:true,pan:{dx:10,dy:10}})
              .style({lw:3,ls:"@nodcolor",foz:12,fof:"cursive",foc:"green",thal:"center",tval:"middle",labelOffset:3})
              .lin(xA,yA,xB,yB).label("1")
              .lin(xA,yA,xC,yC).label("2")
              .lin(xA,yA,xD,yD).label("3")
              .lin(xB,yB,xD,yD).label("4")
              .lin(xC,yC,xD,yD).label("5")
              .lin(xC,yC,xE,yE).label("6")
              .lin(xD,yD,xE,yE).label("7")
              .style({lw:2,ls:"orange",foc:"@nodcolor"})
              .vec(xB,yB,xB,yB-50).label("F","end","left")
              .vec(xD,yD,xD+80,yD).label("2F","mid")
              .style({ls:"@nodcolor",lw:1})
              .use("nodfix",xA,yA).label("A","w")
              .use("nod",xB,yB).label("B","e")
              .use("nod",xC,yC).label("C","w")
              .use("nod",xD,xD).label("D","ne")
              .use("nodflt",xE,yE,-Math.PI/2).label("E","e")
              .style({ls:"#999",lw:1})
              .dim(xA,275,xD,275).label("b")
              .dim(xD,275,xB,275).label("b")
              .dim(275,yE,275,yD).label("b")
              .dim(275,yD,275,yA).label("b")
              .exe(document.getElementById("c").getContext("2d"));
```

[img.symbols.mec]: ./img/symbols.mec.png "mechanical symbols"
[img.elements.mec]: ./img/elements.mec.png "mechanical elements"
[img.truss.mec]: ./img/truss.mec.png "truss"
[img.point-label.mec]: ./img/point-label.mec.png "centric point label"
[img.line-label.mec]: ./img/line-label.mec.png "linear line label"
[img.truss-labels.mec]: ./img/truss-labels.mec.png "truss with labels"
