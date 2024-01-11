class Ext {
}
Ext.data = {SimpleStore: function(config){}};

TS = {
    escapeRe: function(s) {
        return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
    },
    type: function(o) {
        if (o === undefined || o === null) {
            return false;
        }
        if (o.htmlElement) {
            return 'element';
        }
        var t = typeof o;
        if (t == 'object' && o.nodeName) {
            switch (o.nodeType) {
            case 1:
                return 'element';
            case 3:
                return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
            }
        }
        if (t == 'object' || t == 'function') {
            switch (o.constructor) {
            case Array:
                return 'array';
            case RegExp:
                return 'regexp';
            }
            if (typeof o.length == 'number' && typeof o.item == 'function') {
                return 'nodelist';
            }
        }
        return t;
    },
    applyIf: function(o, c) {
        if (o && c) {
            for (var p in c) {
                if (typeof o[p] == "undefined") {
                    o[p] = c[p];
                }
            }
        }
        return o;
    }
};
TS.apply = function(o, c, defaults) {
    if (defaults) {
        TS.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
};
TS.applyIf(String, {
    escape: function(string) {
        return string.replace(/('|\\)/g, "\\$1");
    },
    leftPad: function(val, size, ch) {
        var result = new String(val);
        if (!ch) {
            ch = " ";
        }
        while (result.length < size) {
            result = ch + result;
        }
        return result.toString();
    },
    format: function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }
});
String.prototype.toggle = function(value, other) {
    return this == value ? other : value;
}
;
String.prototype.trim = function() {
    var re = /^\s+|\s+$/g;
    return function() {
        return this.replace(re, "");
    }
    ;
}();
TS.applyIf(Number.prototype, {
    constrain: function(min, max) {
        return Math.min(Math.max(this, min), max);
    }
});
TS.applyIf(Array.prototype, {
    indexOf: function(o) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] == o)
                return i;
        }
        return -1;
    },
    remove: function(o) {
        var index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
        return this;
    }
});
Date.prototype.getElapsed = function(date) {
    return Math.abs((date || new Date()).getTime() - this.getTime());
}
;
TS.override = function(origclass, overrides) {
    if (overrides) {
        var p = origclass.prototype;
        for (var method in overrides) {
            p[method] = overrides[method];
        }
    }
};
(function() {

    // create private copy of Ext's String.format() method
    // - to remove unnecessary dependency
    // - to resolve namespace conflict with M$-Ajax's implementation
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }
    
    
    // private
    Date.formatCodeToRegex = function(character, currentGroup) {
        // Note: currentGroup - position in regex result array (see notes for Date.parseCodes below)
        var p = Date.parseCodes[character];
    
        if (p) {
          p = TS.type(p) == 'function'? p() : p;
          Date.parseCodes[character] = p; // reassign function result to prevent repeated execution
        }
    
        return p? TS.applyIf({
          c: p.c? xf(p.c, currentGroup || "{0}") : p.c
        }, p) : {
            g:0,
            c:null,
            s:TS.escapeRe(character) // treat unrecognised characters as literals
        }
    }
    
    // private shorthand for Date.formatCodeToRegex since we'll be using it fairly often
    var $f = Date.formatCodeToRegex;
    
    TS.apply(Date, {
        // private
        parseFunctions: {count:0},
        parseRegexes: [],
        formatFunctions: {count:0},
        daysInMonth : [31,28,31,30,31,30,31,31,30,31,30,31],
        y2kYear : 50,
    
        
        MILLI : "ms",
    
        
        SECOND : "s",
    
        
        MINUTE : "mi",
    
        
        HOUR : "h",
    
        
        DAY : "d",
    
        
        MONTH : "mo",
    
        
        YEAR : "y",
    
        
        dayNames : [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
    
        
        monthNames : [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
    
        
        monthNumbers : {
            Jan:0,
            Feb:1,
            Mar:2,
            Apr:3,
            May:4,
            Jun:5,
            Jul:6,
            Aug:7,
            Sep:8,
            Oct:9,
            Nov:10,
            Dec:11
        },
    
        
        getShortMonthName : function(month) {
            return Date.monthNames[month].substring(0, 3);
        },
    
        
        getShortDayName : function(day) {
            return Date.dayNames[day].substring(0, 3);
        },
    
        
        getMonthNumber : function(name) {
            // handle camel casing for english month names (since the keys for the Date.monthNumbers hash are case sensitive)
            return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },
    
        
        formatCodes : {
            d: "String.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())", // get localised short day name
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "String.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "String.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())", // get localised short month name
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "String.leftPad(this.getHours(), 2, '0')",
            i: "String.leftPad(this.getMinutes(), 2, '0')",
            s: "String.leftPad(this.getSeconds(), 2, '0')",
            u: "String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function() { // ISO-8601 -- GMT format
                for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    var e = c.charAt(i);
                    code.push(e == "T" ? "'T'" : Date.getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },
            
            U: "Math.round(this.getTime() / 1000)"
        },
    
        
        parseDate : function(input, format) {
            var p = Date.parseFunctions;
            if (p[format] == null) {
                Date.createParser(format);
            }
            var func = p[format];
            return Date[func](input);
        },
    
        // private
        getFormatCode : function(character) {
            var f = Date.formatCodes[character];
    
            if (f) {
              f = TS.type(f) == 'function'? f() : f;
              Date.formatCodes[character] = f; // reassign function result to prevent repeated execution
            }
    
            // note: unknown characters are treated as literals
            return f || ("'" + String.escape(character) + "'");
        },
    
        // private
        createNewFormat : function(format) {
            var funcName = "format" + Date.formatFunctions.count++,
                code = "Date.prototype." + funcName + " = function(){return ",
                special = false,
                ch = '';
    
            Date.formatFunctions[format] = funcName;
    
            for (var i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                }
                else if (special) {
                    special = false;
                    code += "'" + String.escape(ch) + "' + ";
                }
                else {
                    code += Date.getFormatCode(ch) + " + ";
                }
            }
            eval(code.substring(0, code.length - 3) + ";}");
        },
    
        // private
        createParser : function() {
            var code = [
                "Date.{0} = function(input){",
                    "var y, m, d, h = 0, i = 0, s = 0, ms = 0, o, z, u, v;",
                    "input = String(input);",
                    "d = new Date();",
                    "y = d.getFullYear();",
                    "m = d.getMonth();",
                    "d = d.getDate();",
                    "var results = input.match(Date.parseRegexes[{1}]);",
                    "if(results && results.length > 0){",
                        "{2}",
                        "if(u){",
                            "v = new Date(u * 1000);", // give top priority to UNIX time
                        "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){",
                            "v = new Date(y, m, d, h, i, s, ms);",
                        "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){",
                            "v = new Date(y, m, d, h, i, s);",
                        "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){",
                            "v = new Date(y, m, d, h, i);",
                        "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){",
                            "v = new Date(y, m, d, h);",
                        "}else if (y >= 0 && m >= 0 && d > 0){",
                            "v = new Date(y, m, d);",
                        "}else if (y >= 0 && m >= 0){",
                            "v = new Date(y, m);",
                        "}else if (y >= 0){",
                            "v = new Date(y);",
                        "}",
                    "}",
                    "return (v && (z != null || o != null))?" // favour UTC offset over GMT offset
                        + " (TS.type(z) == 'number' ? v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - z) :" // reset to UTC, then add offset
                        + " v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn))) : v;", // reset to GMT, then add offset
                "}"
            ].join('\n');
    
            return function(format) {
                var funcName = "parse" + Date.parseFunctions.count++,
                    regexNum = Date.parseRegexes.length,
                    currentGroup = 1,
                    calc = "",
                    regex = "",
                    special = false,
                    ch = "";
    
                Date.parseFunctions[format] = funcName;
    
                for (var i = 0; i < format.length; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    }
                    else if (special) {
                        special = false;
                        regex += String.escape(ch);
                    }
                    else {
                        var obj = $f(ch, currentGroup);
                        currentGroup += obj.g;
                        regex += obj.s;
                        if (obj.g && obj.c) {
                            calc += obj.c;
                        }
                    }
                }
    
                Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$", "i");
                eval(xf(code, funcName, regexNum, calc));
            }
        }(),
    
        // private
        parseCodes : {
            
            d: {
                g:1,
                c:"d = parseInt(results[{0}], 10);\n",
                s:"(\\d{2})" // day of month with leading zeroes (01 - 31)
            },
            j: {
                g:1,
                c:"d = parseInt(results[{0}], 10);\n",
                s:"(\\d{1,2})" // day of month without leading zeroes (1 - 31)
            },
            D: function() {
                for (var a = [], i = 0; i < 7; a.push(Date.getShortDayName(i)), ++i); // get localised short day names
                return {
                    g:0,
                    c:null,
                    s:"(?:" + a.join("|") +")"
                }
            },
            l: function() {
                return {
                    g:0,
                    c:null,
                    s:"(?:" + Date.dayNames.join("|") + ")"
                }
            },
            N: {
                g:0,
                c:null,
                s:"[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            S: {
                g:0,
                c:null,
                s:"(?:st|nd|rd|th)"
            },
            w: {
                g:0,
                c:null,
                s:"[0-6]" // javascript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g:0,
                c:null,
                s:"(?:\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g:0,
                c:null,
                s:"(?:\\d{2})" // ISO-8601 week number (with leading zero)
            },
            F: function() {
                return {
                    g:1,
                    c:"m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n", // get localised month number
                    s:"(" + Date.monthNames.join("|") + ")"
                }
            },
            M: function() {
                for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i); // get localised short month names
                return TS.applyIf({
                    s:"(" + a.join("|") + ")"
                }, $f("F"));
            },
            m: {
                g:1,
                c:"m = parseInt(results[{0}], 10) - 1;\n",
                s:"(\\d{2})" // month number with leading zeros (01 - 12)
            },
            n: {
                g:1,
                c:"m = parseInt(results[{0}], 10) - 1;\n",
                s:"(\\d{1,2})" // month number without leading zeros (1 - 12)
            },
            t: {
                g:0,
                c:null,
                s:"(?:\\d{2})" // no. of days in the month (28 - 31)
            },
            L: {
                g:0,
                c:null,
                s:"(?:1|0)"
            },
            o: function() {
                return $f("Y");
            },
            Y: {
                g:1,
                c:"y = parseInt(results[{0}], 10);\n",
                s:"(\\d{4})" // 4-digit year
            },
            y: {
                g:1,
                c:"var ty = parseInt(results[{0}], 10);\n"
                    + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n", // 2-digit year
                s:"(\\d{1,2})"
            },
            a: {
                g:1,
                c:"if (results[{0}] == 'am') {\n"
                    + "if (h == 12) { h = 0; }\n"
                    + "} else { if (h < 12) { h += 12; }}",
                s:"(am|pm)"
            },
            A: {
                g:1,
                c:"if (results[{0}] == 'AM') {\n"
                    + "if (h == 12) { h = 0; }\n"
                    + "} else { if (h < 12) { h += 12; }}",
                s:"(AM|PM)"
            },
            g: function() {
                return $f("G");
            },
            G: {
                g:1,
                c:"h = parseInt(results[{0}], 10);\n",
                s:"(\\d{1,2})" // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: function() {
                return $f("H");
            },
            H: {
                g:1,
                c:"h = parseInt(results[{0}], 10);\n",
                s:"(\\d{2})" //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g:1,
                c:"i = parseInt(results[{0}], 10);\n",
                s:"(\\d{2})" // minutes with leading zeros (00 - 59)
            },
            s: {
                g:1,
                c:"s = parseInt(results[{0}], 10);\n",
                s:"(\\d{2})" // seconds with leading zeros (00 - 59)
            },
            u: {
                g:1,
                c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s:"(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g:1,
                c:[
                    "o = results[{0}];",
                    "var sn = o.substring(0,1);", // get + / - sign
                    "var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);", // get hours (performs minutes-to-hour conversion also, just in case)
                    "var mn = o.substring(3,5) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+\-]\\d{4})" // GMT offset in hrs and mins
            },
            P: {
                g:1,
                c:[
                    "o = results[{0}];",
                    "var sn = o.substring(0,1);", // get + / - sign
                    "var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);", // get hours (performs minutes-to-hour conversion also, just in case)
                    "var mn = o.substring(4,6) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+\-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g:0,
                c:null,
                s:"[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars
            },
            Z: {
                g:1,
                c:"z = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
                      + "z = (-43200 <= z && z <= 50400)? z : null;\n",
                s:"([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
            },
            c: function() {
                var calc = [],
                    arr = [
                        $f("Y", 1), // year
                        $f("m", 2), // month
                        $f("d", 3), // day
                        $f("h", 4), // hour
                        $f("i", 5), // minute
                        $f("s", 6), // second
                        {c:"ms = (results[7] || '.0').substring(1); ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                        {c:[ // allow both "Z" (i.e. UTC) and "+08:00" (i.e. UTC offset) time zone delimiters
                            "if(results[9] == 'Z'){",
                                "z = 0;",
                            "}else{",
                                $f("P", 9).c,
                            "}"
                        ].join('\n')}
                    ];
    
                for (var i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }
    
                return {
                    g:1,
                    c:calc.join(""),
                    s:arr[0].s + "-" + arr[1].s + "-" + arr[2].s + "T" + arr[3].s + ":" + arr[4].s + ":" + arr[5].s
                          + "((\.|,)\\d+)?" // decimal fraction of a second (e.g. ",998465" or ".998465")
                          + "(Z|([+\-]\\d{2}:\\d{2}))" // "Z" (UTC) or "+08:00" (UTC offset)
                }
            },
            U: {
                g:1,
                c:"u = parseInt(results[{0}], 10);\n",
                s:"(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
            }
        }
    });
    
    }());
    $.fn.applyProperties = function(){
        let originalObject = this[0];
        let newProperties = arguments[0];
        TS.apply(originalObject, newProperties);
    }
    TS.override(Date, {
        // private
        dateFormat : function(format) {
            if (Date.formatFunctions[format] == null) {
                Date.createNewFormat(format);
            }
            var func = Date.formatFunctions[format];
            return this[func]();
        },
    
        
        getTimezone : function() {
            // the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
            //
            // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
            // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
            // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
            // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
            // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
            //
            // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
            // step 1: (?:\((.*)\) -- find timezone in parentheses
            // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
            // step 3: remove all non uppercase characters found in step 1 and 2
            return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
        },
    
        
        getGMTOffset : function(colon) {
            return (this.getTimezoneOffset() > 0 ? "-" : "+")
                + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0")
                + (colon ? ":" : "")
                + String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0");
        },
    
        
        getDayOfYear : function() {
            var num = 0;
            Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
            for (var i = 0; i < this.getMonth(); ++i) {
                num += Date.daysInMonth[i];
            }
            return num + this.getDate() - 1;
        },
    
        
        getWeekOfYear : function() {
            // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
            var ms1d = 864e5, // milliseconds in a day
                ms7d = 7 * ms1d; // milliseconds in a week
    
            return function() { // return a closure so constants get calculated only once
                var DC3 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / ms1d, // an Absolute Day Number
                    AWN = Math.floor(DC3 / 7), // an Absolute Week Number
                    Wyr = new Date(AWN * ms7d).getUTCFullYear();
    
                return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
            }
        }(),
    
        
        isLeapYear : function() {
            var year = this.getFullYear();
            return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
        },
    
        
        getFirstDayOfMonth : function() {
            var day = (this.getDay() - (this.getDate() - 1)) % 7;
            return (day < 0) ? (day + 7) : day;
        },
    
        
        getLastDayOfMonth : function() {
            var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
            return (day < 0) ? (day + 7) : day;
        },
    
    
        
        getFirstDateOfMonth : function() {
            return new Date(this.getFullYear(), this.getMonth(), 1);
        },
    
        
        getLastDateOfMonth : function() {
            return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
        },
    
        
        getDaysInMonth : function() {
            Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
            return Date.daysInMonth[this.getMonth()];
        },
    
        
        getSuffix : function() {
            switch (this.getDate()) {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        },
    
        
        clone : function() {
            return new Date(this.getTime());
        },
    
        
        clearTime : function(clone){
            if(clone){
                return this.clone().clearTime();
            }
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);
            return this;
        },
    
        
        add : function(interval, value){
            var d = this.clone();
            if (!interval || value === 0) return d;
    
            switch(interval.toLowerCase()){
                case Date.MILLI:
                    d.setMilliseconds(this.getMilliseconds() + value);
                    break;
                case Date.SECOND:
                    d.setSeconds(this.getSeconds() + value);
                    break;
                case Date.MINUTE:
                    d.setMinutes(this.getMinutes() + value);
                    break;
                case Date.HOUR:
                    d.setHours(this.getHours() + value);
                    break;
                case Date.DAY:
                    d.setDate(this.getDate() + value);
                    break;
                case Date.MONTH:
                    var day = this.getDate();
                    if(day > 28){
                        day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
                    }
                    d.setDate(day);
                    d.setMonth(this.getMonth() + value);
                    break;
                case Date.YEAR:
                    d.setFullYear(this.getFullYear() + value);
                    break;
            }
            return d;
        },
    
        
        between : function(start, end){
            var t = this.getTime();
            return start.getTime() <= t && t <= end.getTime();
        }
    });