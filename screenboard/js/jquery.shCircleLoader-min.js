/*
 * SunHater Circle Loader v0.2 (2013-12-28)
 * jQuery plugin
 * Copyright (c) 2014 Pavel Tzonkov <sunhater@sunhater.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://opensource.org/licenses/MIT
 * http://www.gnu.org/licenses/gpl.html
 */
(function(b){b.fn.shCircleLoader=function(w,s){var A="shcl",q=1,r=b(this);if(w==="destroy"){r.find("."+A).detach();return}else{if((w==="progress")&&(typeof s!=="undefined")){r.each(function(){var e=b(this),c=e.find("."+A);if(!c.get(0)){return}if(!e.find("span").get(0)){c.append("<span></span>")}var d=c.find("span").last();d.html(s).css({position:"absolute",display:"block",left:Math.round((c.width()-d.width())/2)+"px",top:Math.round((c.height()-d.height())/2)+"px"})});return}}o={namespace:A,radius:"auto",dotsRadius:"auto",color:"auto",dots:12,duration:1,clockwise:true,externalCss:false,keyframes:"0%{{prefix}transform:scale(1)}80%{{prefix}transform:scale(.3)}100%{{prefix}transform:scale(1)}",uaPrefixes:["o","ms","webkit","moz",""]};b.extend(o,w);var B=o.color,z=o.namespace,y=o.dots,t=o.externalCss,a=o.uaPrefixes,C=function(c){return c.replace(/(.*)px$/i,"$1")},x=function(f){var d,e,c="";for(d=0;d<a.length;d++){e=a[d].length?("-"+a[d]+"-"):"";c+=f.replace(/\{prefix\}/g,e)}return c},v=function(g,f){var c={};if(!g.substr){b.each(g,function(i,h){b.extend(c,v(i,h))})}else{var d,e;for(d=0;d<a.length;d++){e=a[d].length?("-"+a[d]+"-"):"";c[e+g]=f}}return c};while(b("#"+z+q).get(0)){q++}if(!t){var u=o.keyframes.replace(/\s+$/,"").replace(/^\s+/,"");if(!/(\;|\{)\s*visibility\s*\:/gi.test(u)){u=/^(0+\%|from)\s*\{/i.test(u)?u.replace(/^((0+\%|from)\s*\{)(.*)$/i,"$1visibility:visible;$3"):(/\s+(0+\%|from)\s*\{/i.test(u)?u.replace(/(\s+(0+\%|from)\s*\{)/i,"$1visibility:visible;"):("0%{visibility:visible}"+u))}b(b("head").get(0)?"head":"body").append('<style id="'+z+q+'" type="text/css">'+x("@{prefix}keyframes "+z+q+"_bounce{"+u+"}")+"</style>")}r.each(function(){var i,l,p,j,f,h,g,c,n,e,d={},k=b(this),m=k.find("."+A);if(m.get(0)){m.shCircleLoader("destroy")}k.html('<div class="'+z+((z!=A)?(" "+A):"")+'"></div>');if(t){k=k.find("div")}h=k.innerWidth()-C(k.css("padding-left"))-C(k.css("padding-right"));g=k.innerHeight()-C(k.css("padding-top"))-C(k.css("padding-bottom"));i=(o.radius=="auto")?((h<g)?(h/2):(g/2)):o.radius;if(!t){i--;if(o.dotsRadius=="auto"){l=Math.abs(Math.sin(Math.PI/(1*y)))*i;l=(l*i)/(l+i)-1}else{l=o.dotsRadius}k=k.find("div");p=Math.ceil(i*2);e={position:"relative",width:p+"px",height:p+"px"};if(p<h){e.marginLeft=Math.round((h-p)/2)}if(p<g){e.marginTop=Math.round((g-p)/2)}k.css(e);p=Math.ceil(l*2)+"px";d={position:"absolute",visibility:"hidden",width:p,height:p};if(B!==null){d.background=(B=="auto")?k.css("color"):B}b.extend(d,v({"border-radius":Math.ceil(l)+"px","animation-name":z+q+"_bounce","animation-duration":o.duration+"s","animation-iteration-count":"infinite","animation-direction":"normal"}))}for(p=0;p<y;p++){k.append("<div></div>");if(t&&(typeof l==="undefined")){l=(C(k.find("div").css("width"))/2)}j=k.find("div").last();c=(o.duration/y)*p;f=(2*Math.PI*p)/y;n=i-l;h=n*Math.sin(f);g=n*Math.cos(f);if(o.clockwise){g=-g}e={left:Math.round(h+n)+"px",top:Math.round(g+n)+"px"};if(c){b.extend(e,v("animation-delay",c+"s"))}b.extend(e,d);j.css(e)}})}})(jQuery);