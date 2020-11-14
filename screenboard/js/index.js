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
        center: [113.969232, 22.59172],
    });
    var n = [
        [113.967832, 22.592314],
        [113.9695, 22.592829],
        [113.970493, 22.59062],
        [113.969484, 22.591388],
        [113.967826, 22.590665],
        [113.967446, 22.592473],
        [113.967285, 22.592007],
        [113.970959, 22.592161]
    ];
    var f;
    for (var d = 0; d < n.length; d += 1) {
        var g = new AMap.Marker({
            position: n[d],
            map: k,
            icon: "images/s_ico4.png",
        });
        g.content = "<p>SIGS-001</p><p>当前位置：信息楼</p><p>待处理任务：10</p><p>满载率：95%</p><p>已使用时间：2小时15分</p>";
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
                var z = "上月" + i.name + "号运单数：" + i.data;
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
    var m;

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
            text: "用户满意度",
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

    function p() {
        u = echarts.init(document.getElementById("summaryPie1"));
        v = echarts.init(document.getElementById("summaryPie2"));
        w = echarts.init(document.getElementById("summaryPie3"));
        var E = $(window).width();
        var A;
        if (E > 1600) {
            A = {
                pieTop: "40%",
                pieTop2: "36%",
                titleSize: 20,
                pieRadius: [80, 85],
                itemSize: 32
            }
        } else {
            A = {
                pieTop: "30%",
                pieTop2: "26%",
                titleSize: 16,
                pieRadius: [60, 64],
                itemSize: 28
            }
        }
        var B = {
            title: {
                x: "center",
                y: A.pieTop,
                text: "司机",
                textStyle: {
                    fontWeight: "normal",
                    color: "#ffd325",
                    fontSize: A.titleSize,
                },
                subtext: "总数：100人\n今日工作：25人",
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
                    value: 25,
                    label: {
                        normal: {
                            formatter: "{d}%",
                            position: "outside",
                            show: true,
                            textStyle: {
                                fontSize: A.itemSize,
                                fontWeight: "normal",
                                color: "#ffd325"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ffd325",
                            shadowColor: "#ffd325",
                            shadowBlur: 10
                        }
                    }
                }, {
                    value: 75,
                    name: "未工作",
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
        var C = {
            title: {
                x: "center",
                y: A.pieTop,
                text: "车辆",
                textStyle: {
                    fontWeight: "normal",
                    color: "#32ffc7",
                    fontSize: A.titleSize
                },
                subtext: "总数：100辆\n今日工作：75辆人",
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
                    value: 75,
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
                    value: 25,
                    name: "未工作",
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
        var D = {
            title: {
                x: "center",
                y: A.pieTop2,
                text: "运单",
                textStyle: {
                    fontWeight: "normal",
                    color: "#1eb6fe",
                    fontSize: A.titleSize
                },
                subtext: "总数：100单\n正常单：50单\n异常单：50单",
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
                    value: 50,
                    label: {
                        normal: {
                            formatter: "{d}%",
                            position: "outside",
                            show: true,
                            textStyle: {
                                fontSize: A.itemSize,
                                fontWeight: "normal",
                                color: "#1eb6fe"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#1eb6fe",
                            shadowColor: "#1eb6fe",
                            shadowBlur: 10
                        }
                    }
                }, {
                    value: 50,
                    name: "未工作",
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
        r = echarts.init(document.getElementById("summaryBar"));
        var i = {
            tooltip: {
                trigger: "item",
                formatter: function (F) {
                    var G = "本月" + F.name + "号运单数：" + F.data;
                    return G
                }
            },
            grid: {
                top: "20%",
                left: "15%",
                width: "80%",
                height: "80%",
                containLabel: true
            },
            xAxis: {
                data: ["美的南沙分厂", "美的商业空调事业部", "佛山信华"],
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
                barWidth: 20,
                data: ["15", "13", "17"],
                itemStyle: {
                    normal: {
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
        t = echarts.init(document.getElementById("summaryLine"));
        var z = {
            tooltip: {
                trigger: "item",
                formatter: function (F) {
                    var G = "本月" + F.name + "号运单数：" + F.data;
                    return G
                }
            },
            grid: {
                top: "20%",
                left: "0%",
                width: "100%",
                height: "80%",
                containLabel: true
            },
            xAxis: {
                data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: "12px",
                        color: "#3e70b0",
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#0e2c52",
                        width: 1,
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: "12px",
                        color: "#3e70b0",
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#0e2c52",
                        width: 1,
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#0e2c52",
                        width: 1,
                    }
                }
            },
            series: {
                name: "",
                type: "line",
                data: ["5", "14", "3", "6", "8", "18", "11", "4", "8", "7", "16", "13", "6", "10", "11", "9", "19", "13", "4", "20", "12", "7", "13", "15", "8", "3", "9", "16", "11", "16", "8"],
                areaStyle: {
                    normal: {
                        color: "rgba(79,237,247,0.3)",
                    }
                },
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#00dafb",
                            width: 1,
                        },
                        color: "#00dafb",
                    },
                },
            },
        };
        u.setOption(B);
        v.setOption(C);
        w.setOption(D);
        r.setOption(i);
        t.setOption(z)
    }


    $(".summaryBtn").on("click", function () {
        $(".filterbg").show();
        $(".popup").show();
        $(".popup").width("3px");
        $(".popup").animate({
            height: "76%"
        }, 400, function () {
            $(".popup").animate({
                width: "82%"
            }, 400)
        });
        setTimeout(x, 800)
    });
    $(".popupClose").on("click", function () {
        $(".popupClose").css("display", "none");
        $(".summary").hide();
        u.clear();
        v.clear();
        w.clear();
        r.clear();
        t.clear();
        $(".popup").animate({
            width: "3px"
        }, 400, function () {
            $(".popup").animate({
                height: 0
            }, 400)
        });
        setTimeout(s, 800)
    });

    function x() {
        $(".popupClose").css("display", "block");
        $(".summary").show();
        p()
    }

    function s() {
        $(".filterbg").hide();
        $(".popup").hide();
        $(".popup").width(0)
    }
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
    $(".stateUl").niceScroll({
        cursorcolor: "#045978",
        cursoropacitymax: 0.6,
        touchbehavior: false,
        cursorwidth: "4px",
        cursorborder: "0",
        cursorborderradius: "4px",
        autohidemode: false
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
        var z = $(".dataBox");
        var B = z.eq(0).width();
        var A = 24 * 60;

        function i(F) {
            var E = F.split(":");
            var D = parseInt(E[0]) * 60 + parseInt(E[1]);
            return D
        }
        z.each(function (F, E) {
            var G = a[F];

            function D(J, H) {
                for (var I = 0; I < H.length; I++) {
                    var K, P, Q, M, O, N, L;
                    K = i(H[I].start) / A * 100 + "%";
                    P = (i(H[I].end) - i(H[I].start)) / A * 100 + "%";
                    M = G.dateLable;
                    O = H[I].start;
                    N = H[I].end;
                    L = i(H[I].end) - i(H[I].start);
                    Q = '<span style="width: ' + P + ";left: " + K + '" sDate="' + M + '" sStart="' + O + '" sEnd="' + N + '" sConsume="' + L + '"></span>';
                    J.append(Q)
                }
            }
            D($(E).find(".workTime"), G.data.workTime);
            D($(E).find(".standard"), G.data.standard)
        });
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
    $(".workTime").on("mouseenter", "span", function (i) {
        var G = i.clientX;
        var H = i.clientY;
        var B, F, C, A, z, D, E;
        B = $(this).attr("sDate");
        F = $(this).attr("sStart");
        C = $(this).attr("sEnd");
        A = $(this).attr("sConsume");
        D = Math.floor(A / 60);
        E = A - D * 60;
        z = '<div class="workTimeInfo" style="left:' + G + "px;top:" + H + 'px"><p>日期：' + B + "</p><p>开始时间：" + F + "</p><p>结束时间：" + C + "</p><p>总用时：" + D + "小时" + E + "分钟</p></div>";
        $("body").append(z)
    });
    $(".workTime").on("mouseout", function () {
        $(".workTimeInfo").remove()
    });
    $(".infoBtn").on("click", function () {
        $(".filterbg").show();
        $(".carInfo").show();
        $(".carInfo").width("3px");
        $(".carInfo").animate({
            height: "76%"
        }, 400, function () {
            $(".carInfo").animate({
                width: "82%"
            }, 400)
        });
        setTimeout(function () {
            $(".infoBox").show();
            $(".carClose").css("display", "block")
        }, 800)
    });
    $(".carClose").on("click", function () {
        $(".carClose").css("display", "none");
        $(".infoBox").hide();
        $(".carInfo").animate({
            width: "3px"
        }, 400, function () {
            $(".carInfo").animate({
                height: 0
            }, 400)
        });
        setTimeout(function () {
            $(".filterbg").hide();
            $(".carInfo").hide();
            $(".carInfo").width(0)
        }, 800)
    })
});