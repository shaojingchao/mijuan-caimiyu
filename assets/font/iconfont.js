(function(window){var svgSprite='<svg><symbol id="tx-right" viewBox="0 0 1024 1024"><path d="M726.4 534.4l-384 384c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L659.2 512 297.6 150.4c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l384 384c6.4 6.4 9.6 16 9.6 22.4C736 521.6 732.8 528 726.4 534.4z"  ></path></symbol><symbol id="tx-right1" viewBox="0 0 1024 1024"><path d="M822.464 265.344a28.256 28.256 0 0 0-43.072 1.312l-352.96 417.664-181.92-212.992a28.288 28.288 0 0 0-43.104-1.088 37.12 37.12 0 0 0-0.96 48.256l204.096 238.944c5.76 6.752 13.696 10.56 22.016 10.56h0.096a29.088 29.088 0 0 0 22.048-10.656L823.68 313.6c11.52-13.728 11.008-35.328-1.216-48.256"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)