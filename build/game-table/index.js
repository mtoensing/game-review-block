(()=>{"use strict";var e,r={413:(e,r,o)=>{const t=window.wp.blocks,n=window.React,a=window.wp.i18n,l=window.wp.blockEditor,i=window.wp.serverSideRender;var c=o.n(i);const s=window.wp.components;(0,t.registerBlockType)("game-review/game-table",{edit:function({attributes:e,setAttributes:r}){const o=(0,l.useBlockProps)();return(0,n.createElement)("div",{...o},(0,n.createElement)(l.BlockControls,null,(0,n.createElement)(s.ToolbarGroup,null,(0,n.createElement)(s.ToolbarButton,{className:"components-icon-button components-toolbar__control",label:(0,a.__)("Update game table","game-review-block"),onClick:()=>r({updated:Date.now()}),icon:"update"}))),(0,n.createElement)(c(),{block:"game-review/game-table",attributes:e}))},save:function(){return null}})}},o={};function t(e){var n=o[e];if(void 0!==n)return n.exports;var a=o[e]={exports:{}};return r[e](a,a.exports,t),a.exports}t.m=r,e=[],t.O=(r,o,n,a)=>{if(!o){var l=1/0;for(u=0;u<e.length;u++){for(var[o,n,a]=e[u],i=!0,c=0;c<o.length;c++)(!1&a||l>=a)&&Object.keys(t.O).every((e=>t.O[e](o[c])))?o.splice(c--,1):(i=!1,a<l&&(l=a));if(i){e.splice(u--,1);var s=n();void 0!==s&&(r=s)}}return r}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,n,a]},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={510:0,546:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var n,a,[l,i,c]=o,s=0;if(l.some((r=>0!==e[r]))){for(n in i)t.o(i,n)&&(t.m[n]=i[n]);if(c)var u=c(t)}for(r&&r(o);s<l.length;s++)a=l[s],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(u)},o=globalThis.webpackChunkgame_review_block=globalThis.webpackChunkgame_review_block||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var n=t.O(void 0,[546],(()=>t(413)));n=t.O(n)})();