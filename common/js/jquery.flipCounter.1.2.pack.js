(function ($) {
    $.fn.flipCounter = function (j) {
        var k = false;
        var l = {
            number: 0,
            numIntegralDigits: 1,
            numFractionalDigits: 0,
            digitClass: "counter-digit",
            counterFieldName: "counter-value",
            //digitHeight: 40,
            //digitWidth: 30,
            imagePath: "img/flipCounter-medium.png",
            easing: false,
            duration: 1E4,
            onAnimationStarted: false,
            onAnimationStopped: false,
            onAnimationPaused: false,
            onAnimationResumed: false,
            formatNumberOptions: false
        };
        var m = {
            init: function (e) {
                return this.each(function () {
                    k = $(this);
                    var c = $.extend(l, e);
                    var d = k.data("flipCounter");
                    e = $.extend(d, c);
                    k.data("flipCounter", e);
                    if (e.number === false || e.number == 0) {
                        _getCounterValue() !== false ? e.number = _getCounterValue() : e.number = 0;
                        _setOption("number", e.number)
                    }
                    _setOption("animating", false);
                    _setOption("start_time", false);
                    k.bind("startAnimation", function (a, b) {
                        _startAnimation(b)
                    });
                    k.bind("pauseAnimation", function (a) {
                        _pauseAnimation()
                    });
                    k.bind("resumeAnimation", function (a) {
                        _resumeAnimation()
                    });
                    k.bind("stopAnimation", function (a) {
                        _stopAnimation()
                    });
                    k.htmlClean();
                    _renderCounter()
                })
            },
            renderCounter: function (a) {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    _setOption("number", a);
                    _renderCounter()
                })
            },
            setNumber: function (a) {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    _setOption("number", a);
                    _renderCounter()
                })
            },
            getNumber: function () {
                var a = false;
                this.each(a = function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    a = _getOption("number");
                    return a
                });
                return a
            },
            startAnimation: function (a) {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    k.trigger("startAnimation", a)
                })
            },
            stopAnimation: function () {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    k.trigger("stopAnimation")
                })
            },
            pauseAnimation: function () {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    k.trigger("pauseAnimation")
                })
            },
            resumeAnimation: function () {
                return this.each(function () {
                    k = $(this);
                    if (!_isInitialized()) {
                        $(this).flipCounter()
                    }
                    k.trigger("resumeAnimation")
                })
            }
        };
        if (m[j]) {
            return m[j].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof j === "object" || !j) {
                return m.init.apply(this, arguments)
            } else {
                $.error("Method " + j + " does not exist on jQuery.flipCounter")
            }
        }

        function _isInitialized() {
            var a = k.data("flipCounter");
            if (typeof a == "undefined") {
                return false
            }
            return true
        }

        function _getOption(a) {
            var b = k.data("flipCounter");
            var c = b[a];
            if (typeof c !== "undefined") {
                return c
            }
            return false
        }

        function _setOption(a, b) {
            var c = k.data("flipCounter");
            c[a] = b;
            k.data("flipCounter", c)
        }

        function _setupCounter() {
            if (k.children('[name="' + _getOption("counterFieldName") + '"]').length < 1) {
                k.append('<input type="hidden" name="' + _getOption("counterFieldName") + '" value="' + _getOption("number") + '" /> ')
            }
            var a = _getDigitsLength();
            var b = _getNumberFormatted().length;
            if (b > a) {
                for (i = 0; i < b - a; i++) {
                    var c = $('<span class="' + _getOption("digitClass") + '" style="' + _getDigitStyle("0") + '" > </span><span>  </span> ');
                    k.prepend(c)
                }
            } else {
                if (b < a) {
                    for (i = 0; i < a - b; i++) {
                        k.children("." + _getOption("digitClass")).first().remove()
                    }
                }
            }
            k.find("." + _getOption("digitClass")).each(function () {
                if (0 == $(this).find("span").length) {
                    $(this).append('<span style="visibility:hidden">0</span>')
                }
            })
        }

        function _renderCounter() {
            _setupCounter();
            var c = _getNumberFormatted();
            var d = _getDigits();
            var e = 0;
            $.each(d, function (a, b) {
                digit = c.toString().charAt(e);
                $(this).attr("style", _getDigitStyle(digit));
                $(this).find("span").text(digit.replace(" ", "&nbsp;").toString());
                e++
            });
            _setCounterValue()
        }

        function _getDigits() {
            return k.children("." + _getOption("digitClass"))
        }

        function _getDigitsLength() {
            return _getDigits().length
        }

        function _getCounterValue() {
            var a = parseFloat(k.children('[name="' + _getOption("counterFieldName") + '"]').val());
            if (a == a == false) {
                return false
            }
            return a
        }

        function _setCounterValue() {
            k.children('[name="' + _getOption("counterFieldName") + '"]').val(_getOption("number"))
        }

        function _getNumberFormatted() {
            var a = _getOption("number");
            if (typeof a !== "number") {
                $.error("Attempting to render non-numeric value.");
                return "0"
            }
            var b = "";
            if (_getOption("formatNumberOptions")) {
                if ($.formatNumber) {
                    b = $.formatNumber(a, _getOption("formatNumberOptions"))
                } else {
                    $.error("The numberformatter jQuery plugin is not loaded. This plugin is required to use the formatNumberOptions setting.")
                }
            } else {
                if (a >= 0) {
                    var c = _getOption("numIntegralDigits");
                    var d = c - a.toFixed().toString().length;
                    for (var i = 0; i < d; i++) {
                        b += "0"
                    }
                    b += a.toFixed(_getOption("numFractionalDigits"))
                } else {
                    b = "-" + Math.abs(a.toFixed(_getOption("numFractionalDigits")))
                }
            }
            return b
        }

        function _getDigitStyle(a) {
            var b = "height:" + _getOption("digitHeight") + "px; width:" + _getOption("digitWidth") + "px; display:inline-block; background-image:url('" + _getOption("imagePath") + "'); background-repeat:no-repeat; ";
            //var b = "height:" + _getOption("digitHeight") + "px; width:109px; display:inline-block; background-image:url('" + _getOption("imagePath") + "'); background-repeat:no-repeat; ";

            //if (_getOption("imagePath") == "img/flipCounter-medium.png") {

            //    b = "height:19px; width:109px; display:inline-block; background-image:url('img/flipCounter-medium.png'); background-repeat:no-repeat; background-position : 0px 0px; ";

            //}

            var c = new Array;
            c["1"] = _getOption("digitWidth") * 0;
            c["2"] = _getOption("digitWidth") * -1;
            c["3"] = _getOption("digitWidth") * -2;
            c["4"] = _getOption("digitWidth") * -3;
            c["5"] = _getOption("digitWidth") * -4;
            c["6"] = _getOption("digitWidth") * -5;
            c["7"] = _getOption("digitWidth") * -6;
            c["8"] = _getOption("digitWidth") * -7;
            c["9"] = _getOption("digitWidth") * -8;
            c["0"] = _getOption("digitWidth") * -9;
            c["."] = _getOption("digitWidth") * -10;
            c["-"] = _getOption("digitWidth") * -11;
            c[","] = _getOption("digitWidth") * -12;
            c[" "] = _getOption("digitWidth") * -13;
            if (a in c) {
                if (_getOption("imagePath") == "img/flipCounter-medium.png") {

                    //5°³
                    //b = "height:19px; width:110px; display:inline-block; background-image:url('img/flipCounter-medium.png'); background-repeat:no-repeat;";
                    //6°³
                    b = "height:19px; width:133px; display:inline-block; background-image:url('img/flipCounter-medium.png'); background-repeat:no-repeat;";

                    return b + "background-position: 0px 0px;"

                } else {

                    return b + "background-position: " + c[a] + "px 0px;"

                }
            }
            return b
        }

        function _startAnimation(a) {
            if (true == _getOption("animating")) {
                _stopAnimation()
            }
            if (typeof a !== "undefined") {
                a = $.extend(k.data("flipCounter"), a);
                k.data("flipCounter", a)
            } else {
                a = k.data("flipCounter")
            }
            if (false == _getOption("start_time")) {
                _setOption("start_time", (new Date).getTime())
            }
            if (false == _getOption("time")) {
                _setOption("time", 0)
            }
            if (false == _getOption("elapsed")) {
                _setOption("elapsed", "0.0")
            }
            if (false == _getOption("start_number")) {
                _setOption("start_number", _getOption("number"));
                if (false == _getOption("start_number")) {
                    _setOption("start_number", 0)
                }
            }
            _doAnimation();
            var b = _getOption("onAnimationStarted");
            if (typeof b == "function") {
                b.call(k, k)
            }
        }

        function _doAnimation() {
            var c = _getOption("start_time");
            var d = _getOption("time");
            var e = _getOption("elapsed");
            var f = _getOption("start_number");
            var g = _getOption("end_number") - _getOption("start_number");
            if (g == 0) {
                return false
            }
            var h = _getOption("duration");
            var i = _getOption("easing");
            _setOption("animating", true);

            function animation_step() {
                d += 10;
                e = Math.floor(d / 10) / 10;
                if (Math.round(e) == e) {
                    e += ".0"
                }
                _setOption("elapsed", e);
                var a = (new Date).getTime() - c - d;
                var b = 0;
                if (typeof i == "function") {
                    b = i.apply(k, [false, d, f, g, h])
                } else {
                    b = _noEasing(false, d, f, g, h)
                }
                _setOption("number", b);
                _setOption("time", d);
                _renderCounter();
                if (d < h) {
                    _setOption("interval", window.setTimeout(animation_step, 10 - a))
                } else {
                    _stopAnimation()
                }
            }
            window.setTimeout(animation_step, 10)
        }

        function _stopAnimation() {
            if (false == _getOption("animating")) {
                return false
            }
            clearTimeout(_getOption("interval"));
            _setOption("start_time", false);
            _setOption("start_number", false);
            _setOption("end_number", false);
            _setOption("time", 0);
            _setOption("animating", false);
            _setOption("paused", false);
            var a = _getOption("onAnimationStopped");
            if (typeof a == "function") {
                a.call(k, k)
            }
        }

        function _pauseAnimation() {
            if (false == _getOption("animating") || true == _getOption("paused")) {
                return false
            }
            clearTimeout(_getOption("interval"));
            _setOption("paused", true);
            var a = _getOption("onAnimationPaused");
            if (typeof a == "function") {
                a.call(k, k)
            }
        }

        function _resumeAnimation() {
            if (false == _getOption("animating") || false == _getOption("paused")) {
                return false
            }
            _setOption("paused", false);
            _doAnimation();
            var a = _getOption("onAnimationResumed");
            if (typeof a == "function") {
                a.call(k, k)
            }
        }

        function _noEasing(x, t, b, c, d) {
            return t / d * c + b
        }
    }
})(jQuery);
jQuery.fn.htmlClean = function () {
    this.contents().filter(function () {
        if (this.nodeType != 3) {
            $(this).htmlClean();
            return false
        } else {
            return !/\S/.test(this.nodeValue)
        }
    }).remove()
};