(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{ySTC:function(e,t,n){"use strict";n.d(t,"a",(function(){return z})),n.d(t,"b",(function(){return P})),n.d(t,"c",(function(){return A})),n.d(t,"d",(function(){return S})),n.d(t,"e",(function(){return Y})),n.d(t,"f",(function(){return R})),n.d(t,"g",(function(){return F}));var r=n("mXGw"),i=n.n(r),o=n("w0VL"),a=n("5QYd"),l=n("qsVS"),s=n("ibHE"),c=n("ZZWI"),u=n("W0B4"),d=n.n(u);function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){var t=e.bandwidth();if(0===t)return e;var n=t/2;return e.round()&&(n=Math.round(n)),function(t){var r;return(null!==(r=e(t))&&void 0!==r?r:0)+n}},g={millisecond:[l.e,l.v],second:[l.k,l.A],minute:[l.f,l.w],hour:[l.d,l.u],day:[l.a,l.s],week:[l.p,l.F],sunday:[l.l,l.B],monday:[l.g,l.x],tuesday:[l.n,l.D],wednesday:[l.o,l.E],thursday:[l.m,l.C],friday:[l.c,l.t],saturday:[l.j,l.z],month:[l.h,l.y],year:[l.r,l.G]},v=Object.keys(g),x=new RegExp("^every\\s*(\\d+)?\\s*(".concat(v.join("|"),")s?$"),"i"),h=function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},b=function(e,t){if(Array.isArray(t))return t;if("ticks"in e){if(void 0===t)return e.ticks();if(h(t))return e.ticks(t);if("string"==typeof t&&"useUTC"in e){var n=t.match(x);if(n){var r=g[n[2]][e.useUTC?1:0];if(void 0===n[1])return e.ticks(r);var i=r.every(Number(n[1]));if(i)return e.ticks(i)}throw new Error("Invalid tickValues: ".concat(t))}}return e.domain()},k=function(e){var t,n=e.axis,r=e.scale,i=e.ticksPosition,o=e.tickValues,l=e.tickSize,s=e.tickPadding,c=e.tickRotation,u=e.engine,d=void 0===u?"svg":u,f=b(r,o),m=a.ib[d],g="bandwidth"in r?y(r):r,v={lineX:0,lineY:0},x={textX:0,textY:0},h="object"==typeof document&&"rtl"===document.dir,k=m.align.center,O=m.baseline.center;return"x"===n?(t=function(e){var t;return{x:null!==(t=g(e))&&void 0!==t?t:0,y:0}},v.lineY=l*("after"===i?1:-1),x.textY=(l+s)*("after"===i?1:-1),O="after"===i?m.baseline.top:m.baseline.bottom,0===c?k=m.align.center:"after"===i&&c<0||"before"===i&&c>0?(k=m.align[h?"left":"right"],O=m.baseline.center):("after"===i&&c>0||"before"===i&&c<0)&&(k=m.align[h?"right":"left"],O=m.baseline.center)):(t=function(e){var t;return{x:0,y:null!==(t=g(e))&&void 0!==t?t:0}},v.lineX=l*("after"===i?1:-1),x.textX=(l+s)*("after"===i?1:-1),k="after"===i?m.align.left:m.align.right),{ticks:f.map((function(e){return p(p(p({key:"number"==typeof e||"string"==typeof e?e:"".concat(e),value:e},t(e)),v),x)})),textAlign:k,textBaseline:O}},O=function(e,t){if(void 0===e||"function"==typeof e)return e;if("time"===t.type){var n=Object(s.a)(e);return function(e){return n(e instanceof Date?e:new Date(e))}}return Object(c.a)(e)},j=function(e){var t,n=e.width,r=e.height,i=e.scale,o=e.axis,a=e.values,l=(t=a,Array.isArray(t)?a:void 0),s=h(a)?a:void 0,c=l||b(i,s),u="bandwidth"in i?y(i):i;return"x"===o?c.map((function(e){var t,n;return{key:"".concat(e),x1:null!==(t=u(e))&&void 0!==t?t:0,x2:null!==(n=u(e))&&void 0!==n?n:0,y1:0,y2:r}})):c.map((function(e){var t,r;return{key:"".concat(e),x1:0,x2:n,y1:null!==(t=u(e))&&void 0!==t?t:0,y2:null!==(r=u(e))&&void 0!==r?r:0}}))},C=function(e){var t,n=e.value,l=e.format,s=e.lineX,c=e.lineY,u=e.onClick,d=e.textBaseline,f=e.textAnchor,m=e.animatedProps,y=Object(a.sb)(),g=null!==(t=null==l?void 0:l(n))&&void 0!==t?t:n,v=Object(r.useMemo)((function(){var e={opacity:m.opacity};return u?{style:p(p({},e),{},{cursor:"pointer"}),onClick:function(e){return u(e,g)}}:{style:e}}),[m.opacity,u,g]);return i.a.createElement(o.animated.g,Object.assign({transform:m.transform},v),i.a.createElement("line",{x1:0,x2:s,y1:0,y2:c,style:y.axis.ticks.line}),i.a.createElement(o.animated.text,{dominantBaseline:d,textAnchor:f,transform:m.textTransform,style:y.axis.ticks.text},g))},w=Object(r.memo)(C),T=function(e){var t=e.axis,n=e.scale,l=e.x,s=void 0===l?0:l,c=e.y,u=void 0===c?0:c,d=e.length,f=e.ticksPosition,m=e.tickValues,y=e.tickSize,g=void 0===y?5:y,v=e.tickPadding,x=void 0===v?5:v,h=e.tickRotation,b=void 0===h?0:h,j=e.format,C=e.renderTick,T=void 0===C?w:C,P=e.legend,q=e.legendPosition,S=void 0===q?"end":q,E=e.legendOffset,z=void 0===E?0:E,B=e.onClick,V=e.ariaHidden,A=Object(a.sb)(),R=Object(r.useMemo)((function(){return O(j,n)}),[j,n]),Y=k({axis:t,scale:n,ticksPosition:f,tickValues:m,tickSize:g,tickPadding:x,tickRotation:b}),F=Y.ticks,X=Y.textAlign,M=Y.textBaseline,D=null;if(void 0!==P){var W,I=0,N=0,H=0;"y"===t?(H=-90,I=z,"start"===S?(W="start",N=d):"middle"===S?(W="middle",N=d/2):"end"===S&&(W="end")):(N=z,"start"===S?W="start":"middle"===S?(W="middle",I=d/2):"end"===S&&(W="end",I=d)),D=i.a.createElement("text",{transform:"translate(".concat(I,", ").concat(N,") rotate(").concat(H,")"),textAnchor:W,style:p({dominantBaseline:"central"},A.axis.legend.text)},P)}var G=Object(a.qb)(),Z=G.animate,Q=G.config,J=Object(o.useSpring)({transform:"translate(".concat(s,",").concat(u,")"),lineX2:"x"===t?d:0,lineY2:"x"===t?0:d,config:Q,immediate:!Z}),L=Object(o.useTransition)(F,{keys:function(e){return e.key},initial:function(e){return{opacity:1,transform:"translate(".concat(e.x,",").concat(e.y,")"),textTransform:"translate(".concat(e.textX,",").concat(e.textY,") rotate(").concat(b,")")}},from:function(e){return{opacity:0,transform:"translate(".concat(e.x,",").concat(e.y,")"),textTransform:"translate(".concat(e.textX,",").concat(e.textY,") rotate(").concat(b,")")}},enter:function(e){return{opacity:1,transform:"translate(".concat(e.x,",").concat(e.y,")"),textTransform:"translate(".concat(e.textX,",").concat(e.textY,") rotate(").concat(b,")")}},update:function(e){return{opacity:1,transform:"translate(".concat(e.x,",").concat(e.y,")"),textTransform:"translate(".concat(e.textX,",").concat(e.textY,") rotate(").concat(b,")")}},leave:{opacity:0},config:Q,immediate:!Z});return i.a.createElement(o.animated.g,{transform:J.transform,"aria-hidden":V},L((function(e,t,n,r){return i.a.createElement(T,p(p({tickIndex:r,format:R,rotate:b,textBaseline:M,textAnchor:X,animatedProps:e},t),B?{onClick:B}:{}))})),i.a.createElement(o.animated.line,{style:A.axis.domain.line,x1:0,x2:J.lineX2,y1:0,y2:J.lineY2}),D)},P=Object(r.memo)(T),q={ticksPosition:d.a.oneOf(["before","after"]),tickValues:d.a.oneOfType([d.a.number,d.a.arrayOf(d.a.oneOfType([d.a.number,d.a.string,d.a.instanceOf(Date)])),d.a.string]),tickSize:d.a.number,tickPadding:d.a.number,tickRotation:d.a.number,format:d.a.oneOfType([d.a.func,d.a.string]),renderTick:d.a.func,legend:d.a.node,legendPosition:d.a.oneOf(["start","middle","end"]),legendOffset:d.a.number,ariaHidden:d.a.bool},S=d.a.shape(q),E=["top","right","bottom","left"],z=Object(r.memo)((function(e){var t=e.xScale,n=e.yScale,r=e.width,o=e.height,a={top:e.top,right:e.right,bottom:e.bottom,left:e.left};return i.a.createElement(i.a.Fragment,null,E.map((function(e){var l=a[e];if(!l)return null;var s="top"===e||"bottom"===e,c="top"===e||"left"===e?"before":"after";return i.a.createElement(P,Object.assign({key:e},l,{axis:s?"x":"y",x:"right"===e?r:0,y:"bottom"===e?o:0,scale:s?t:n,length:s?r:o,ticksPosition:c}))})))})),B=Object(r.memo)((function(e){var t=e.animatedProps,n=Object(a.sb)();return i.a.createElement(o.animated.line,Object.assign({},t,n.grid.line))})),V=Object(r.memo)((function(e){var t=e.lines,n=Object(a.qb)(),r=n.animate,l=n.config,s=Object(o.useTransition)(t,{keys:function(e){return e.key},initial:function(e){return{opacity:1,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2}},from:function(e){return{opacity:0,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2}},enter:function(e){return{opacity:1,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2}},update:function(e){return{opacity:1,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2}},leave:{opacity:0},config:l,immediate:!r});return i.a.createElement("g",null,s((function(e,t){return i.a.createElement(B,Object.assign({},t,{key:t.key,animatedProps:e}))})))})),A=Object(r.memo)((function(e){var t=e.width,n=e.height,o=e.xScale,a=e.yScale,l=e.xValues,s=e.yValues,c=Object(r.useMemo)((function(){return!!o&&j({width:t,height:n,scale:o,axis:"x",values:l})}),[o,l,t,n]),u=Object(r.useMemo)((function(){return!!a&&j({width:t,height:n,scale:a,axis:"y",values:s})}),[n,t,a,s]);return i.a.createElement(i.a.Fragment,null,c&&i.a.createElement(V,{lines:c}),u&&i.a.createElement(V,{lines:u}))})),R=function(e,t){var n,r=t.axis,i=t.scale,o=t.x,l=void 0===o?0:o,s=t.y,c=void 0===s?0:s,u=t.length,d=t.ticksPosition,f=t.tickValues,m=t.tickSize,p=void 0===m?5:m,y=t.tickPadding,g=void 0===y?5:y,v=t.tickRotation,x=void 0===v?0:v,h=t.format,b=t.legend,O=t.legendPosition,j=void 0===O?"end":O,C=t.legendOffset,w=void 0===C?0:C,T=t.theme,P=k({axis:r,scale:i,ticksPosition:d,tickValues:f,tickSize:p,tickPadding:g,tickRotation:x,engine:"canvas"}),q=P.ticks,S=P.textAlign,E=P.textBaseline;e.save(),e.translate(l,c),e.textAlign=S,e.textBaseline=E,e.font="".concat(T.axis.ticks.text.fontSize,"px ").concat(T.axis.ticks.text.fontFamily),(null!==(n=T.axis.domain.line.strokeWidth)&&void 0!==n?n:0)>0&&(e.lineWidth=Number(T.axis.domain.line.strokeWidth),e.lineCap="square",T.axis.domain.line.stroke&&(e.strokeStyle=T.axis.domain.line.stroke),e.beginPath(),e.moveTo(0,0),e.lineTo("x"===r?u:0,"x"===r?0:u),e.stroke());var z="function"==typeof h?h:function(e){return"".concat(e)};if(q.forEach((function(t){var n;(null!==(n=T.axis.ticks.line.strokeWidth)&&void 0!==n?n:0)>0&&(e.lineWidth=Number(T.axis.ticks.line.strokeWidth),e.lineCap="square",T.axis.ticks.line.stroke&&(e.strokeStyle=T.axis.ticks.line.stroke),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.lineX,t.y+t.lineY),e.stroke());var r=z(t.value);e.save(),e.translate(t.x+t.textX,t.y+t.textY),e.rotate(Object(a.E)(x)),T.axis.ticks.text.fill&&(e.fillStyle=T.axis.ticks.text.fill),e.fillText(String(r),0,0),e.restore()})),void 0!==b){var B=0,V=0,A=0,R="center";"y"===r?(A=-90,B=w,"start"===j?(R="start",V=u):"middle"===j?(R="center",V=u/2):"end"===j&&(R="end")):(V=w,"start"===j?R="start":"middle"===j?(R="center",B=u/2):"end"===j&&(R="end",B=u)),e.translate(B,V),e.rotate(Object(a.E)(A)),e.font="".concat(T.axis.legend.text.fontWeight?"".concat(T.axis.legend.text.fontWeight," "):"").concat(T.axis.legend.text.fontSize,"px ").concat(T.axis.legend.text.fontFamily),T.axis.legend.text.fill&&(e.fillStyle=T.axis.legend.text.fill),e.textAlign=R,e.textBaseline="middle",e.fillText(b,0,0)}e.restore()},Y=function(e,t){var n=t.xScale,r=t.yScale,i=t.width,o=t.height,a=t.top,l=t.right,s=t.bottom,c=t.left,u=t.theme,d={top:a,right:l,bottom:s,left:c};E.forEach((function(t){var a=d[t];if(!a)return null;var l="top"===t||"bottom"===t,s="top"===t||"left"===t?"before":"after",c=l?n:r,f=O(a.format,c);R(e,p(p({},a),{},{axis:l?"x":"y",x:"right"===t?i:0,y:"bottom"===t?o:0,scale:c,format:f,length:l?i:o,ticksPosition:s,theme:u}))}))},F=function(e,t){var n=t.width,r=t.height,i=t.scale,o=t.axis,a=t.values;j({width:n,height:r,scale:i,axis:o,values:a}).forEach((function(t){e.beginPath(),e.moveTo(t.x1,t.y1),e.lineTo(t.x2,t.y2),e.stroke()}))}},zoQ5:function(e,t,n){"use strict";n.r(t);var r=n("mXGw"),i=n.n(r),o=n("NYG6"),a=n.n(o),l=n("Izya"),s=n("6zZa"),c=n("ZS2m"),u=n("HMBA"),d=n.n(u),f=n("Eo5u"),m=n("RQLE"),p=[{key:"data",group:"Base",help:"Chart data.",description:"\n            Chart data, which must conform to this structure:\n            ```\n            Array<{\n                id:        {string|number}\n                title?:    {ReactNode}\n                subtitle?: {ReactNode}\n                data: Array<{\n                    ranges:   number[]\n                    measures: number[]\n                    markers?: number[]\n                }>\n            }>\n            ```\n\n            If `title` is `undefined`, `id` will be used for\n            `title`.\n        ",type:"object[]",required:!0},{key:"width",enableControlForFlavors:["api"],group:"Base",help:"Chart width.",description:"not required if using `ResponsiveBullet`.",type:"number",required:!0,controlType:"range",controlOptions:{unit:"px",min:100,max:1e3,step:5}},{key:"height",enableControlForFlavors:["api"],group:"Base",help:"Chart height.",description:"not required if using `ResponsiveBullet`.",type:"number",required:!0,controlType:"range",controlOptions:{unit:"px",min:100,max:1e3,step:5}},{key:"layout",group:"Base",help:"How to display items.",type:"string",required:!1,defaultValue:l.c.layout,controlType:"radio",controlOptions:{choices:[{label:"horizontal",value:"horizontal"},{label:"vertical",value:"vertical"}]}},{key:"reverse",group:"Base",help:"Reverse chart.",description:"\n            Reverse chart, starts on top instead of bottom\n            for vertical layout and right instead of left\n            for horizontal one.\n        ",type:"boolean",required:!1,defaultValue:l.c.reverse,controlType:"switch"},{key:"margin",help:"Chart margin.",type:"object",required:!1,controlType:"margin",group:"Base"},{key:"spacing",help:"define spacing between items.",type:"number",required:!1,defaultValue:l.c.spacing,controlType:"range",group:"Base",controlOptions:{unit:"px",min:0,max:100}},{key:"measureSize",help:"define size of measure related to item size, expressed as a ratio.",type:"number",required:!1,defaultValue:l.c.measureSize,controlType:"range",group:"Base",controlOptions:{min:0,max:1,step:.05}},{key:"markerSize",help:"define size of markers related to item size, expressed as a ratio.",type:"number",required:!1,defaultValue:l.c.markerSize,controlType:"range",group:"Base",controlOptions:{min:0,max:2,step:.05}},m.f,{key:"rangeComponent",flavors:["svg"],group:"Style",help:"Custom component for ranges.",type:"Function",required:!1},{key:"rangeColors",help:"Ranges colors",description:"\n            Defines colors for ranges,\n            you can either use categorical colors:\n            `greens` or sequential form: `seq:green`.\n        ",type:"string | Function | string[]",required:!1,defaultValue:l.c.rangeColors,controlType:"colors",group:"Style",controlOptions:{includeSequential:!0}},{key:"measureComponent",flavors:["svg"],group:"Style",help:"Custom component for measures.",type:"Function",required:!1},{key:"measureColors",help:"Measures colors.",description:"\n            Defines colors for measures,\n            you can either use categorical colors:\n            `greens` or sequential form: `seq:green`.\n        ",type:"string | Function | string[]",required:!1,defaultValue:l.c.measureColors,controlType:"colors",group:"Style",controlOptions:{includeSequential:!0}},{key:"markerComponent",flavors:["svg"],group:"Style",help:"Custom component for markers.",type:"Function",required:!1},{key:"markerColors",help:"Markers colors.",description:"\n            Defines colors for markers,\n            you can either use categorical colors:\n            `greens` or sequential form: `seq:green`.\n        ",type:"string | Function| string[]",required:!1,defaultValue:l.c.markerColors,controlType:"colors",group:"Style",controlOptions:{includeSequential:!0}},{key:"axisPosition",help:"Where to put axis.",type:"string",required:!1,defaultValue:l.c.axisPosition,controlType:"radio",group:"Axes",controlOptions:{choices:[{label:"before",value:"before"},{label:"after",value:"after"}]}},{key:"titlePosition",help:"Where to put title.",type:"string",required:!1,defaultValue:l.c.titlePosition,controlType:"radio",group:"Title",controlOptions:{choices:[{label:"before",value:"before"},{label:"after",value:"after"}]}},{key:"titleAlign",help:"title alignment.",type:"string",required:!1,defaultValue:l.c.titleAlign,controlType:"choices",group:"Title",controlOptions:{choices:[{label:"start",value:"start"},{label:"middle",value:"middle"},{label:"end",value:"end"}]}},{key:"titleOffsetX",help:"title x offset from bullet edge.",type:"number",required:!1,defaultValue:l.c.titleOffset,controlType:"range",group:"Title",controlOptions:{min:-100,max:100,unit:"px"}},{key:"titleOffsetY",help:"title y offset from bullet edge.",type:"number",required:!1,defaultValue:l.c.titleOffset,controlType:"range",group:"Title",controlOptions:{min:-100,max:100,unit:"px"}},{key:"titleRotation",help:"title rotation.",type:"number",required:!1,defaultValue:l.c.titleRotation,controlType:"angle",group:"Title",controlOptions:{start:90,min:-360,max:360,step:5}},{key:"onRangeClick",flavors:["svg"],type:"(range, event) => void",group:"Interactivity",required:!1,help:"onClick handler for ranges.",description:"\n            onClick handler for ranges, will receive range\n            data as first argument & event as second one.\n\n            The data has the following shape:\n            ```\n            {\n                id:    string,\n                v0:    number,\n                v1:    number,\n                index: number,\n                color: string,\n            }\n            ```\n\n            `v1` is the value of the range while\n            `v0` is the value of previous range.\n        "},{key:"onMeasureClick",flavors:["svg"],type:"(measure, event) => void",group:"Interactivity",required:!1,help:"onClick handler for measures.",description:"\n            onClick handler for measures, will receive measure\n            data as first argument & event as second one.\n\n            The data has the following shape:\n            ```\n            {\n                id:    string,\n                v0:    number,\n                v1:    number,\n                index: number,\n                color: string,\n            }\n            ```\n\n            `v1` is the value of the measure while\n            `v0` is the value of previous measure.\n        "},{key:"onMarkerClick",flavors:["svg"],type:"(marker, event) => void",group:"Interactivity",required:!1,help:"onClick handler for markers.",description:"\n            onClick handler for markers, will receive marker\n            data as first argument & event as second one.\n\n            The data has the following shape:\n            ```\n            {\n                id:    string,\n                value: number,\n                index: number,\n                color: string,\n            }\n            ```\n        "}].concat(Object(f.a)(Object(m.e)(["svg"],l.c,"react-spring"))),y=Object(m.d)(p),g=function(){return[Object(s.a)("temp.",a()([100,120,140])[0]),Object(s.a)("power",2,{float:!0,measureCount:2}),Object(s.a)("volume",a()([40,60,80])[0],{rangeCount:8}),Object(s.a)("cost",5e5,{measureCount:2}),Object(s.a)("revenue",a()([9,11,13])[0],{markerCount:2})]},v={margin:{top:50,right:90,bottom:50,left:90},layout:l.c.layout,reverse:l.c.reverse,spacing:46,titlePosition:l.c.titlePosition,titleAlign:"start",titleOffsetX:-70,titleOffsetY:l.c.titleOffsetY,titleRotation:l.c.titleRotation,measureSize:.2,markerSize:.6,axisPosition:l.c.axisPosition,rangeColors:l.c.rangeColors,measureColors:l.c.measureColors,markerColors:l.c.markerColors,animate:l.c.animate,motionConfig:l.c.motionConfig};t.default=function(){return i.a.createElement(c.a,{name:"Bullet",meta:d.a.Bullet,icon:"bullet",flavors:d.a.flavors,currentFlavor:"svg",properties:y,initialProperties:v,defaultProperties:l.c,generateData:g},(function(e,t,n,r){return i.a.createElement(l.b,Object.assign({data:t},e,{theme:n,onRangeClick:function(e){r({type:"click",label:"[range] "+e.id+": ["+e.v0+", "+e.v1+"]",color:e.color,data:e})},onMeasureClick:function(e){r({type:"click",label:"[measure] "+e.id+": ["+e.v0+", "+e.v1+"]",color:e.color,data:e})},onMarkerClick:function(e){r({type:"click",label:"[marker] "+e.id+": "+e.value,color:e.color,data:e})}}))}))}}}]);
//# sourceMappingURL=component---src-pages-bullet-index-js-13cdd19adb228a63f194.js.map