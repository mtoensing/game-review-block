!function(){"use strict";var e,t={499:function(e,t,r){var n=window.wp.blocks,o=window.wp.element,a=window.wp.i18n,i=window.wp.blockEditor,c=window.wp.components,s=window.wp.coreData,l=window.wp.serverSideRender,u=r.n(l);(0,n.registerBlockType)("game-review/review-box",{edit:function(e){let{attributes:t,setAttributes:r,context:{postType:n,postId:l}}=e;const m=(0,i.useBlockProps)(),[v,f]=(0,s.useEntityProp)("postType",n,"meta");if(!l&&!n)return(0,o.createElement)("div",m,(0,o.createElement)("p",null," ",(0,a.__)("The review block works only in a post context.","game-review-block")," "));const w=v._shortscore_rating,g=v._shortscore_game,p=v._shortscore_summary,_={icon:t.statusicon};function h(){""!==p&&""!==t.game?(r({status:(0,a.__)("All done.","game-review-block")}),r({statusicon:"saved"})):(r({status:(0,a.__)("Please fill out all fields.","game-review-block")}),r({statusicon:"hidden"}))}return r({game:g}),r({rating:String(w)}),h(),(0,o.createElement)("div",m,(0,o.createElement)(c.TextControl,{onChange:function(e){f({...v,_shortscore_game:e.replace(/(<([^>]+)>)/gi,"")}),r({game:e}),h()},className:"game",label:(0,a.__)("Game title","game-review-block"),value:g,placeholder:(0,a.__)("The name of the game.","game-review-block")}),(0,o.createElement)(c.TextareaControl,{onChange:function(e){f({...v,_shortscore_summary:String(e)}),h()},className:"summary",label:(0,a.__)("Summary","game-review-block"),value:p,placeholder:(0,a.__)("A short summary of the review.","game-review-block")}),(0,o.createElement)(c.RangeControl,{label:(0,a.__)("Rating score","game-review-block"),help:(0,a.__)("Review score from 1 to 10. The higher the better.","game-review-block"),onChange:function(e){f({...v,_shortscore_rating:String(e)}),r({rating:String(e)}),h()},min:1,max:10,step:.5,value:Number(w)}),(0,o.createElement)("p",{className:"status notice"},(0,o.createElement)(c.Dashicon,_)," ",t.status),(0,o.createElement)(u(),{block:"game-review/review-box",attributes:t}))},save:function(){return null}})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,e=[],n.O=function(t,r,o,a){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var c=!0,s=0;s<r.length;s++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(c=!1,a<i&&(i=a));if(c){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],c=r[1],s=r[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(s)var u=s(n)}for(t&&t(r);l<i.length;l++)a=i[l],n.o(e,a)&&e[a]&&e[a][0](),e[i[l]]=0;return n.O(u)},r=self.webpackChunkgame_review=self.webpackChunkgame_review||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[431],(function(){return n(499)}));o=n.O(o)}();