!function(){"use strict";var e,t={255:function(e,t,r){var n=window.wp.blocks,o=window.wp.element,a=window.wp.i18n,i=window.wp.blockEditor,s=window.wp.components,u=window.wp.data,c=window.wp.coreData,l=window.wp.serverSideRender,m=r.n(l);(0,n.registerBlockType)("game-review/review-box",{edit:function(e){let{attributes:t,setAttributes:r}=e;const n=(0,i.useBlockProps)(),l=(0,u.useSelect)((e=>e("core/editor").getCurrentPostType()),[]),[f,w]=(0,c.useEntityProp)("postType",l,"meta"),v=f._shortscore_rating,g=f._shortscore_game,p=f._shortscore_summary,d={icon:t.statusicon};function h(){""!==p&&""!==t.game?(r({status:(0,a.__)("All done.","game-review")}),r({statusicon:"saved"})):(r({status:(0,a.__)("Please fill out all fields.","game-review")}),r({statusicon:"hidden"}))}return r({game:g}),r({rating:String(v)}),h(),(0,o.createElement)("div",n,(0,o.createElement)(s.TextControl,{onChange:function(e){w({...f,_shortscore_game:e.replace(/(<([^>]+)>)/gi,"")}),r({game:e}),h()},className:"game",label:(0,a.__)("Game"),value:g,placeholder:(0,a.__)("Write the name of the game ...","game-review")}),(0,o.createElement)(s.TextareaControl,{onChange:function(e){w({...f,_shortscore_summary:String(e)}),h()},className:"summary",label:(0,a.__)("Summary"),value:p,placeholder:(0,a.__)("Write a short review summary...","game-review")}),(0,o.createElement)(s.RangeControl,{label:"Rating",help:(0,a.__)("Review score from 1 to 10. The higher the better.","game-review"),onChange:function(e){w({...f,_shortscore_rating:String(e)}),r({rating:String(e)}),h()},min:1,max:10,step:.5,value:Number(v)}),(0,o.createElement)("p",{class:"status notice"},(0,o.createElement)(s.Dashicon,d)," ",t.status),(0,o.createElement)(m(),{block:"game-review/review-box",attributes:t}))},save:function(e){let{attributes:t}=e;return null}})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,e=[],n.O=function(t,r,o,a){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var s=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(s=!1,a<i&&(i=a));if(s){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,46:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],u=r[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(u)var l=u(n)}for(t&&t(r);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[i[c]]=0;return n.O(l)},r=self.webpackChunkgame_review=self.webpackChunkgame_review||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[46],(function(){return n(255)}));o=n.O(o)}();