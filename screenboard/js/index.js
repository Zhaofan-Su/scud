$(function () {
    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 300,
        outDuration: 1000,
        loading: false,
        loadingParentElement: "body",
        loadingClass: "animsition-loading",
        unSupportCss: ["animation-duration", "-webkit-animation-duration", "-o-animation-duration"],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "body"
    });
    document.onreadystatechange = q;

    function q() {
        if (document.readyState == "complete") {
            $("#loader").hide()
        }
    }

    function c() {
        var i = new Date();
        var F = i.getFullYear();
        var C = i.getMonth() + 1;
        var E = i.getDate();
        var z = i.getDay();
        var A = i.getHours();
        var B = i.getMinutes();
        var D = i.getSeconds();
        var H = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var G;
        G = F + "-" + b(C) + "-" + b(E) + "&nbsp;&nbsp;" + H[z] + "&nbsp;&nbsp;" + b(A) + ":" + b(B) + ":" + b(D);
        $(".topTime").html(G)
    }

    function b(z) {
        var i;
        if (z < 10) {
            i = "0" + z
        } else {
            i = z
        }
        return i
    }
    setInterval(c, 1000);

    function y(i, A) {
        var z = 0;
        var B;
        var C = i.attr("total");
        if (C) {
            B = setInterval(function () {
                z += A;
                if (z >= C) {
                    z = C;
                    clearInterval(B)
                }
                i.html(z)
            }, 1)
        }
    }

    var k = new AMap.Map("myMap", {
        resizeEnable: true,
        zoom: 17,
        mapStyle: "amap://styles/blue",
        center: [113.963505, 22.587379],
    });
    var n = [
        [113.963988, 22.586715],
        [113.964251, 22.586894],
        [113.963441, 22.586705],
        [113.963231, 22.587072],
        [113.964283, 22.586443],
        [113.964712, 22.586725],
        [113.964750, 22.586636],
        [113.964406, 22.585858]
    ];
    for (var d = 0; d < n.length; d += 1) {
        var g = new AMap.Marker({
            position: n[d],
            map: k,
            icon: "images/favicon.png",
        });
        g.content = "<p>徽章-NS-0128</p><p>当前位置：平山小学</p>";
        g.on("click", h)
    }
    var e = new AMap.InfoWindow({
        offset: new AMap.Pixel(16, -36)
    });

    function h(i) {
        e.setContent(i.target.content);
        e.open(k, i.target.getPosition())
    }
    k.on("click", function () {
        e.close()
    });
    var j = echarts.init(document.getElementById("myChart1"));
    var l = {
        tooltip: {
            trigger: "item",
            formatter: function (i) {
                var z = "上月" + i.name + "小孩子违规次数：" + i.data;
                return z
            }
        },
        grid: {
            top: "5%",
            left: "0%",
            width: "100%",
            height: "95%",
            containLabel: true
        },
        xAxis: {
            data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: "12px",
                    color: "#fff",
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                    width: 1,
                }
            }
        },
        yAxis: {
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: "12px",
                    color: "#fff",
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                    width: 1,
                }
            },
            splitLine: {
                show: false,
            }
        },
        series: {
            name: "",
            type: "bar",
            barWidth: 10,
            data: ["215", "214", "230", "206", "198", "168", "211", "204", "208", "217", "216", "213", "260", "210", "211", "199", "194", "213", "204", "209", "212", "207", "213", "215", "189", "203", "195", "186", "191", "216", "208"],
            itemStyle: {
                normal: {
                    barBorderRadius: [5, 5, 5, 5],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#3876cd"
                    }, {
                        offset: 0.5,
                        color: "#45b4e7"
                    }, {
                        offset: 1,
                        color: "#54ffff"
                    }]),
                },
            },
        },
    };
    $("#FontScroll").FontScroll({
        time: 3000,
        num: 1
    });
    setTimeout(function () {
        $(".progress").each(function (A, z) {
            var B = $(z).attr("progress");
            var C = parseInt(B);
            var F = 0;
            var D = 50;
            var E;
            $(z).find("h4").html(F + "%");
            if (C < 10) {
                $(z).find(".progressBar span").addClass("bg-red");
                $(z).find("h3 i").addClass("color-red")
            } else {
                if (C >= 10 && C < 50) {
                    $(z).find(".progressBar span").addClass("bg-yellow");
                    $(z).find("h3 i").addClass("color-yellow")
                } else {
                    if (C >= 50 && C < 100) {
                        $(z).find(".progressBar span").addClass("bg-blue");
                        $(z).find("h3 i").addClass("color-blue")
                    } else {
                        $(z).find(".progressBar span").addClass("bg-green");
                        $(z).find("h3 i").addClass("color-green")
                    }
                }
            }
            $(z).find(".progressBar span").animate({
                width: B
            }, C * D);
            E = setInterval(function () {
                F++;
                $(z).find("h4").html(F + "%");
                if (F == C) {
                    clearInterval(E)
                }
            }, D)
        });
        y($("#indicator1"), 1);
        y($("#indicator2"), 1);
        y($("#indicator3"), 1);
        y($("#totalNum"), 1000);
        j.setOption(l)
    }, 500);
    var u, v, w, r, t;

    v = echarts.init(document.getElementById("summaryPie2"));
    var A = {
        pieTop: "30%",
        titleSize: 16,
        pieRadius: [60, 64],
        itemSize: 12
    }
    var C = {
        title: {
            x: "center",
            y: "center",
            text: "遵守交规情况",
            textStyle: {
                fontWeight: "normal",
                color: "#32ffc7",
                fontSize: A.titleSize
            },
            subtextStyle: {
                color: "#fff",
            }
        },
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        series: [{
            type: "pie",
            clockWise: false,
            radius: A.pieRadius,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [{
                value: 98.3,
                label: {
                    normal: {
                        formatter: "{d}%",
                        position: "outside",
                        show: true,
                        textStyle: {
                            fontSize: A.itemSize,
                            fontWeight: "normal",
                            color: "#32ffc7"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#32ffc7",
                        shadowColor: "#32ffc7",
                        shadowBlur: 10
                    }
                }
            }, {
                value: 1.7,
                itemStyle: {
                    normal: {
                        color: "rgba(44,59,70,1)",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: "rgba(44,59,70,1)"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#11284e",
                        shadowColor: "#11284e",
                    }
                },
            }]
        }]
    };
    v.setOption(C);


    $(window).resize(function () {
        j.resize();
        try {
            u.resize();
            v.resize();
            w.resize();
            r.resize();
            t.resize()
        } catch (i) {
            return false
        }
    });
    $(".searchBtn").on("click", function () {
        $(this).hide();
        $(".searchInner").addClass("open");
        setTimeout(function () {
            $(".searchInner").find("form").show()
        }, 400)
    });
    $(".search").on("click", function (i) {
        i.stopPropagation()
    });
    $("body").on("click", function () {
        $(".searchInner").find("form").hide();
        $(".searchInner").removeClass("open");
        setTimeout(function () {
            $(".searchBtn").show()
        }, 400)
    });

    var a = [{
        dateLable: "2018-01-01 星期一",
        data: {
            workTime: [{
                start: "07:30",
                end: "13:15"
            }, {
                start: "14:40",
                end: "21:50"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-02 星期二",
        data: {
            workTime: [{
                start: "03:10",
                end: "09:40"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-03 星期三",
        data: {
            workTime: [{
                start: "06:15",
                end: "14:08"
            }, {
                start: "15:53",
                end: "24:00"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-04 星期四",
        data: {
            workTime: [{
                start: "00:00",
                end: "07:32"
            }, {
                start: "12:20",
                end: "19:50"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-05 星期五",
        data: {
            workTime: [{
                start: "06:15",
                end: "17:20"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-06 星期六",
        data: {
            workTime: [{
                start: "14:40",
                end: "22:38"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }, {
        dateLable: "2018-01-07 星期天",
        data: {
            workTime: [{
                start: "06:30",
                end: "12:20"
            }, {
                start: "14:25",
                end: "20:33"
            }],
            standard: [{
                start: "00:00",
                end: "05:00"
            }, {
                start: "08:00",
                end: "12:00"
            }, {
                start: "14:00",
                end: "19:00"
            }]
        }
    }];

    function o() {
        var B = z.eq(0).width();
        var A = 24 * 60;

        function i(F) {
            var E = F.split(":");
            var D = parseInt(E[0]) * 60 + parseInt(E[1]);
            return D
        }

        var C = $(".totalItem");
        C.each(function (E, D) {
            var F = a[E].data.workTime;
            var I = 0;
            for (var G = 0; G < F.length; G++) {
                I += i(F[G].end) - i(F[G].start)
            }
            var H = Math.floor(I / 60);
            $(D).find("span").eq(0).html(H + ":" + (I - H * 60));
            $(D).find("span").eq(1).html(F.length)
        })
    }
    o();
});