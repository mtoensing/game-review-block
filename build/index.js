!function(){"use strict";var e,r={273:function(){var e=window.wp.blocks,r=window.wp.element,n=window.wp.i18n,t=window.wp.blockEditor;(0,e.registerBlockType)("create-block/game-review",{edit:function(){return(0,r.createElement)("p",(0,t.useBlockProps)(),(0,n.__)("Game Review – hello from the editor!","game-review"))},save:function(){return(0,r.createElement)("p",t.useBlockProps.save(),(0,n.__)("Game Review – hello from the saved content!","game-review"))}})}},n={};function t(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=function(r,n,o,i){if(!n){var u=1/0;for(l=0;l<e.length;l++){n=e[l][0],o=e[l][1],i=e[l][2];for(var c=!0,a=0;a<n.length;a++)(!1&i||u>=i)&&Object.keys(t.O).every((function(e){return t.O[e](n[a])}))?n.splice(a--,1):(c=!1,i<u&&(u=i));if(c){e.splice(l--,1);var f=o();void 0!==f&&(r=f)}}return r}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[n,o,i]},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e={826:0,46:0};t.O.j=function(r){return 0===e[r]};var r=function(r,n){var o,i,u=n[0],c=n[1],a=n[2],f=0;if(u.some((function(r){return 0!==e[r]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(a)var l=a(t)}for(r&&r(n);f<u.length;f++)i=u[f],t.o(e,i)&&e[i]&&e[i][0](),e[u[f]]=0;return t.O(l)},n=self.webpackChunkgame_review=self.webpackChunkgame_review||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))}();var o=t.O(void 0,[46],(function(){return t(273)}));o=t.O(o)}();