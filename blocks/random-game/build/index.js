!function(){"use strict";var e,n={431:function(e,n,t){var r=window.wp.blocks,o=window.wp.element,i=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.serverSideRender,u=t.n(a),c=window.wp.components;(0,r.registerBlockType)("game-review/random-game",{edit:function(e){let{attributes:n,setAttributes:t}=e;const r=(0,l.useBlockProps)();return(0,o.createElement)("div",r,(0,o.createElement)(l.InspectorControls,null,(0,o.createElement)(c.Panel,null,(0,o.createElement)(c.PanelBody,null,(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.FontSizePicker,{fontSizes:[{name:(0,i.__)("Small"),slug:"small",size:26},{name:(0,i.__)("Big"),slug:"big",size:40}],value:parseInt(n.fontsize),fallbackFontSize:26,onChange:e=>t({fontsize:e}),withSlider:!0})),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,i.__)("Use cache","game-review"),help:(0,i.__)("Cache the result for one hour","game-review"),checked:n.use_cache,onChange:()=>t({use_cache:!n.use_cache})}))))),(0,o.createElement)(u(),{block:"game-review/random-game",attributes:n}))},save:function(e){let{attributes:n}=e;return null}})}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,e=[],r.O=function(n,t,o,i){if(!t){var l=1/0;for(s=0;s<e.length;s++){t=e[s][0],o=e[s][1],i=e[s][2];for(var a=!0,u=0;u<t.length;u++)(!1&i||l>=i)&&Object.keys(r.O).every((function(e){return r.O[e](t[u])}))?t.splice(u--,1):(a=!1,i<l&&(l=i));if(a){e.splice(s--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[t,o,i]},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,{a:n}),n},r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={826:0,46:0};r.O.j=function(n){return 0===e[n]};var n=function(n,t){var o,i,l=t[0],a=t[1],u=t[2],c=0;if(l.some((function(n){return 0!==e[n]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(u)var s=u(r)}for(n&&n(t);c<l.length;c++)i=l[c],r.o(e,i)&&e[i]&&e[i][0](),e[l[c]]=0;return r.O(s)},t=self.webpackChunkgame_review=self.webpackChunkgame_review||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var o=r.O(void 0,[46],(function(){return r(431)}));o=r.O(o)}();