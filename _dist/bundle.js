!function(t){var e={};function r(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(s,n,function(e){return t[e]}.bind(null,n));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),function(t){r.d(e,"µColor",function(){return u});const s=/^(?:(rgb|hsl)a?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0\.\d+))?\s*\)$/i,n=document.createElement("div");n.style.setProperty("display","none");class u{constructor(t){this.values={rgb:[0,0,0],hsl:[0,0,0],a:1};const[e,r,s,n]=this.string2rgba(t||u.from(document.body).toString());this.updateRGB(e,r,s),this.values.a=n}static from(t,e="color"){return new u(window.getComputedStyle(t).getPropertyValue(e))}updateRGB(...t){this.values.rgb=t,this.values.hsl=this.rgb2hsl(...t)}updateHSL(...t){this.values.hsl=t,this.values.rgb=this.hsl2rgb(...t)}string2rgba(t){["(",")"].every(e=>t.includes(e))||(document.body.appendChild(n),n.style.setProperty("color",t),t=window.getComputedStyle(n).getPropertyValue("color"),document.body.removeChild(n));const e=t.match(s);if(!e)return[0,0,0,1];const[,r,u="0",o="0",a="0",i="1"]=e,l="hsl"===r.substr(0,3),h=[u,o,a].map(t=>parseInt(t,10));return[...l?this.hsl2rgb(...h):h,parseFloat(i)]}hsl2rgb(t,e,r){const[s,n]=[e,r].map(t=>t/100),u=s*Math.min(n,1-n),o=(e,r=(e+t/30)%12)=>n-u*Math.max(Math.min(r-3,9-r,1),-1);return[o(0),o(8),o(4)].map(t=>Math.floor(255*t))}rgb2hsl(t,e,r){const[s,n,u]=[t,e,r].map(t=>t/255),o=Math.max(s,n,u),a=o-Math.min(s,n,u),i=1-Math.abs(o+o-a-1),l=a&&(o==s?(n-u)/a:o==n?2+(u-s)/a:4+(s-n)/a);return[60*(l<0?l+6:l),100*(i?a/i:0),(o+o-a)/2*100]}toString(t){if(t){const[t,e,r,s]=this.hsla;return 1===s?`hsl(${t}, ${e}%, ${r}%)`:`hsla(${t}, ${e}%, ${r}%, ${s})`}{const[t,e,r,s]=this.rgba;return 1===s?`rgb(${t}, ${e}, ${r})`:`rgba(${t}, ${e}, ${r}, ${s})`}}get rgb(){return this.values.rgb}get rgba(){return[...this.values.rgb,this.values.a]}get hsl(){return this.values.hsl}get hsla(){return[...this.values.hsl,this.values.a]}get alpha(){return this.values.a}set alpha(t){this.values.a=t}get red(){return this.rgb[0]}set red(t){const[,e,r]=this.rgba;this.updateRGB(t,e,r)}get green(){return this.rgb[1]}set green(t){const[e,,r]=this.rgba;this.updateRGB(e,t,r)}get blue(){return this.rgb[2]}set blue(t){const[e,r]=this.rgba;this.updateRGB(e,r,t)}get hue(){return this.hsl[0]}set hue(t){const[,e,r]=this.hsla;this.updateHSL(t,e,r)}get saturation(){return this.hsl[1]}set saturation(t){const[e,,r]=this.hsla;this.updateHSL(e,t,r)}get lightness(){return this.hsl[2]}set lightness(t){const[e,r]=this.hsla;this.updateHSL(e,r,t)}}t.µColor=u}.call(this,r(1))},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r}]);
//# sourceMappingURL=bundle.js.map