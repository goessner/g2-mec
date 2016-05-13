<a name="g2"></a>
## g2 : <code>object</code>
Mechanical extensions.

**Kind**: global namespace  

* [g2](#g2) : <code>object</code>
  * _instance_
    * [.mark(mrk, loc, [dir])](#g2+mark) ⇒ <code>object</code>
    * [.label(str, [loc], off)](#g2+label) ⇒ <code>object</code>
    * [.vec([p], [r])](#g2+vec) ⇒ <code>object</code>
    * [.avec([p], r, [w], [dw])](#g2+avec) ⇒ <code>object</code>
    * [.dim([p], [r], args)](#g2+dim) ⇒ <code>object</code>
    * [.adim([p], r, [w], [dw], args)](#g2+adim) ⇒ <code>object</code>
    * [.slider([p], w, args)](#g2+slider) ⇒ <code>object</code>
    * [.spring([p], [r], args)](#g2+spring) ⇒ <code>object</code>
    * [.damper([p], [r], args)](#g2+damper) ⇒ <code>object</code>
    * [.link(pts, [mode], [style])](#g2+link) ⇒ <code>object</code>
    * [.link2(pts, [mode], [style])](#g2+link2) ⇒ <code>object</code>
    * [.bar([p], [r], [style])](#g2+bar) ⇒ <code>object</code>
    * [.bar2([p], [r], [style])](#g2+bar2) ⇒ <code>object</code>
    * [.ground(pts, [closed], [args])](#g2+ground) ⇒ <code>object</code>
  * _static_
    * [.State](#g2.State) : <code>object</code>
    * [.symbol](#g2.symbol) : <code>object</code>

<a name="g2+mark"></a>
### g2.mark(mrk, loc, [dir]) ⇒ <code>object</code>
Draw markers on line element.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mrk | <code>object</code> &#124; <code>string</code> |  | `g2` object or Marker name. |
| loc | <code>number</code> &#124; <code>string</code> &#124; <code>array</code> |  | line parameters [0..1]<br>                    line location ['beg','end','mid',..]<br>                    array of line parameters or strings. |
| [dir] | <code>int</code> | <code>0</code> | Direction:<br>                   -1 : negative tangent direction<br>                    0 : no orientation (rotation)<br>                    1 : positive tangent direction |

**Example**  
```js
g2().lin(10,10,100,10).mark("tick",[0,0.5,1],1)    .arc(100,100,50,3.14).mark("sqr",1,['beg','end']);
```
<a name="g2+label"></a>
### g2.label(str, [loc], off) ⇒ <code>object</code>
Add label to certain elements. See element for support and meaning of arguments.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | Label text |
| [loc] | <code>float</code> &#124; <code>string</code> | <code>&#x27;c&#x27;</code> | Label location depending on referenced element.<br>                     'c': centered, wrt. rec, cir, arc<br>                     'beg','mid', 'end', wrt. lin<br>                     'n', 'ne', 'e', 'se', 's', 'sw', 'w', or 'nw': cardinal directions |
| off | <code>float</code> |  | Offset distance [optional]. |

<a name="g2+vec"></a>
### g2.vec([p], [r]) ⇒ <code>object</code>
Draw vector arrow.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>object</code> | <code>{dx:10,dy:0}</code> | End point / direction vector in:<br>                                  {x,y} absolute coordinates<br>                                   {dx,dy} relative coordinates<br>                                  {r,w} polar coordinates |

<a name="g2+avec"></a>
### g2.avec([p], r, [w], [dw]) ⇒ <code>object</code>
Angular vector

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Center point. |
| r | <code>float</code> |  | Radius |
| [w] | <code>float</code> | <code>0</code> | Start angle (in radian). |
| [dw] | <code>float</code> | <code>Math.PI/2</code> | Angular range in radian. In case of positive values it is running clockwise with                left handed default coordinate system. |

<a name="g2+dim"></a>
### g2.dim([p], [r], args) ⇒ <code>object</code>
Linear dimension

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>object</code> | <code>{dx:10,dy:0}</code> | Dimension end point / direction vector in:<br>                                  {x,y} absolute coordinates<br>                                   {dx,dy} relative coordinates<br>                                  {r,w} polar coordinates |
| args | <code>object</code> |  | Arguments object holding style properties. See 'g2.prototype.style' for details. |
| [args.pos] | <code>string</code> | <code>&quot;in&quot;</code> | Draw dimension arrows:<br>                                 'in':  between ticks<br>                                 'out': outside of ticks |

<a name="g2+adim"></a>
### g2.adim([p], r, [w], [dw], args) ⇒ <code>object</code>
Angular dimension

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Center point. |
| r | <code>float</code> |  | Radius |
| [w] | <code>float</code> | <code>0</code> | Start angle (in radian). |
| [dw] | <code>float</code> | <code>Math.PI/2</code> | Angular range in radian. In case of positive values it is running clockwise with                left handed default coordinate system. |
| args | <code>object</code> |  | Arguments object holding style properties. See 'g2.prototype.style' for details. |
| [args.pos] | <code>string</code> | <code>&quot;in&quot;</code> | Draw dimension arrows:<br>                                 'in':  between ticks<br>                                 'out': outside of ticks |

<a name="g2+slider"></a>
### g2.slider([p], w, args) ⇒ <code>object</code>
Draw slider.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Center point. |
| w | <code>angle</code> |  | Rotation angle [rad] |
| args | <code>object</code> |  | Arguments object holding style properties. See 'g2.prototype.style' for details. |
| [args.b] | <code>float</code> | <code>32</code> | Slider breadth. |
| [args.h] | <code>float</code> | <code>16</code> | Slider height. |

<a name="g2+spring"></a>
### g2.spring([p], [r], args) ⇒ <code>object</code>
Draw linear spring

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>object</code> | <code>{dx:10,dy:0}</code> | Spring end point / direction vector in:<br>                                  {x,y} absolute coordinates<br>                                   {dx,dy} relative coordinates<br>                                  {r,w} polar coordinates |
| args | <code>object</code> |  | Arguments object holding style properties. See 'g2.prototype.style' for details. |
| [args.h] | <code>float</code> | <code>16</code> | Spring height. |

<a name="g2+damper"></a>
### g2.damper([p], [r], args) ⇒ <code>object</code>
Draw line with centered square damper symbol.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - g2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>object</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>object</code> | <code>{dx:10,dy:0}</code> | Damper end point / direction vector in:<br>                                  {x,y} absolute coordinates<br>                                   {dx,dy} relative coordinates<br>                                  {r,w} polar coordinates |
| args | <code>object</code> |  | Arguments object. |
| [args.h] | <code>float</code> | <code>16</code> | Spring height. |
| [args.style] | <code>any</code> |  | Style property. See 'g2.prototype.style' for details. |

<a name="g2+link"></a>
### g2.link(pts, [mode], [style]) ⇒ <code>object</code>
Draw polygonial link.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pts | <code>array</code> |  | Array of points. |
| [mode] | <code>bool</code> &#124; <code>&#x27;split&#x27;</code> | <code>false</code> | true:closed<br> false:non-closed<br> 'split':intermittend lines. |
| [style] | <code>object</code> |  | Style object. |

<a name="g2+link2"></a>
### g2.link2(pts, [mode], [style]) ⇒ <code>object</code>
Draw alternate glossy polygonial link.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pts | <code>array</code> |  | Array of points. |
| [mode] | <code>bool</code> &#124; <code>&#x27;split&#x27;</code> | <code>false</code> | true:closed, false:non-closed, 'split:intermittend lines. |
| [style] | <code>object</code> |  | Style object. |

<a name="g2+bar"></a>
### g2.bar([p], [r], [style]) ⇒ <code>object</code>
Draw bar.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>v2</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>v2</code> | <code>{dx:10,dy:0}</code> | Bar vector in absolute {x,y}, relative {dx,dy} or polar {r,w} coordinates. |
| [style] | <code>object</code> |  | Style object. |

<a name="g2+bar2"></a>
### g2.bar2([p], [r], [style]) ⇒ <code>object</code>
Draw bar.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [p] | <code>v2</code> | <code>{x:0,y:0}</code> | Start point. |
| [r] | <code>v2</code> | <code>{dx:10,dy:0}</code> | Bar end point in absolute {x,y} or vector in relative {dx,dy} or polar {r,w} coordinates. |
| [style] | <code>object</code> |  | Style object. |

<a name="g2+ground"></a>
### g2.ground(pts, [closed], [args]) ⇒ <code>object</code>
Polygon ground.

**Kind**: instance method of <code>[g2](#g2)</code>  
**Returns**: <code>object</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pts | <code>array</code> |  | Array of points |
| [closed] | <code>bool</code> | <code>false</code> | Closed polygon. |
| [args] | <code>object</code> |  | Arguments object. |
| [args.h] | <code>float</code> | <code>4</code> | Ground shade line width. |
| [args.pos] | <code>string</code> | <code>&quot;right&quot;</code> | Ground shade position ["left","right"]. |

<a name="g2.State"></a>
### g2.State : <code>object</code>
Mechanical style values.Not really meant to get overwritten. But if you actually want, proceed.<br>Theses styles can be referenced using the comfortable '@' syntax.

**Kind**: static namespace of <code>[g2](#g2)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| State | <code>object</code> |  | `g2` state namespace. |
| State.nodcolor | <code>string</code> | <code>&quot;#333&quot;</code> | node color. |
| State.nodfill | <code>string</code> | <code>&quot;#dedede&quot;</code> | node fill color. |
| State.nodfill2 | <code>string</code> | <code>&quot;#aeaeae&quot;</code> | alternate node fill color, somewhat darker. |
| State.linkcolor | <code>string</code> | <code>&quot;#666&quot;</code> | link color. |
| State.linkfill | <code>string</code> | <code>&quot;rgba(200,200,200,0.5)&quot;</code> | link fill color, semi-transparent. |
| State.dimcolor | <code>string</code> | <code>&quot;darkslategray&quot;</code> | dimension color. |
| State.solid | <code>array</code> | <code>[]</code> | solid line style. |
| State.dash | <code>array</code> | <code>[15,10]</code> | dashed line style. |
| State.dot | <code>array</code> | <code>[4,4]</code> | dotted line style. |
| State.dashdot | <code>array</code> | <code>[25,6.5,2,6.5]</code> | dashdotted line style. |
| State.labelOffset | <code>number</code> | <code>5</code> | default label offset distance. |
| State.labelSignificantDigits | <code>number</code> | <code>3</code> | default label's significant digits after floating point. |

<a name="g2.symbol"></a>
### g2.symbol : <code>object</code>
Mechanical symbols and line markers as individual `g2` instances. Use them via `use` command.<br>

**Kind**: static namespace of <code>[g2](#g2)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>object</code> | `g2` symbol namespace. |
| symbol.origin | <code>object</code> | origin symbol. |
| symbol.nod | <code>object</code> | node symbol. |
| symbol.dblnod | <code>object</code> | double-node symbol. |
| symbol.nodfix | <code>object</code> | fixed node / bearing symbol. |
| symbol.dblnodfix | <code>object</code> | fixed double-node / bearing symbol. |
| symbol.nodflt | <code>object</code> | floating node / bearing symbol. |
| symbol.dblnodfix | <code>object</code> | floating double-node / bearing symbol. |
| symbol.gnd | <code>object</code> | ground node symbol. |
| symbol.pol | <code>object</code> | pole symbol. |
| symbol.dot | <code>object</code> | dot marker symbol. |
| symbol.sqr | <code>object</code> | square marker symbol. |
| symbol.tilde | <code>object</code> | tilde marker symbol. |
| symbol.arrow | <code>object</code> | arrow marker symbol. |
| symbol.tick | <code>object</code> | tick marker symbol. |
| symbol.arrowtick | <code>object</code> | arrow-tick marker symbol. |

