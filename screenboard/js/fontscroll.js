(function (a) {
    a.fn.FontScroll = function (n) {
        var k = {
            time: 3000,
            s: "fontColor",
            num: 1
        };
        var m = a.extend(k, n);
        this.children("ul").addClass("line");
        var b = a(".line").eq(0);
        var e = b.height();
        var c = b.children().eq(0).height();
        var h = c;
        var i = k.time;
        var g = k.s;
        b.clone().insertAfter(b);
        var l = k.num;
        var f = this.find("li");
        var j = f.length;
        f.eq(l).addClass(g);
        var q = setInterval(r, i);
        this.hover(function () {
            clearInterval(q)
        }, function () {
            q = setInterval(r, i)
        });

        function r() {
            b.animate({
                marginTop: "-" + c
            });
            f.removeClass(g);
            l += 1;
            f.eq(l).addClass(g);
            if (e == c) {
                b.animate({
                    marginTop: "-" + c
                }, "normal", p)
            } else {
                c += h
            }
        }

        function p() {
            b.attr("style", "margin-top:0");
            c = h;
            l = 1;
            f.removeClass(g);
            f.eq(l).addClass(g)
        }
    }
})(jQuery);