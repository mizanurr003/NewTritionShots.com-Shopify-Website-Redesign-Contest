(function() {
    var AvNs = {
        SIGNATURE: "7D8B79A2-8974-4D7B-A76A-F4F29624C06BRfDMBPXAL2oP7BojDR8lTLDkl-ChOjnc8ptZ_xJ7IrqNO8t9Ih-ac7MKssE9f7qlP9oiWENTRW8njpReuwgpug",
        PREFIX: "https://gc.kis.v2.scr.kaspersky-labs.com/",
        INJECT_ID: "FD126C42-EBFA-4E12-B309-BB3FDD723AC1",
        RESOURCE_ID: "E3E8934C-235A-4B0E-825A-35A08381A191",
        IsWebExtension: function() {
            return false;
        }
    };
    var AvNs = (function IeJsonMain(context) {
        function GetClass(obj) {
            if (typeof obj === "undefined")
                return "undefined";
            if (obj === null)
                return "null";
            return Object.prototype.toString.call(obj)
                .match(/^\[object\s(.*)\]$/)[1];
        }
        var exports = {},
            undef;

        function ObjectToJson(object) {
            if (object === null || object === Infinity || object === -Infinity || object === undef)
                return "null";
            var className = GetClass(object);
            if (className === "Boolean") {
                return "" + object;
            } else if (className === "Number") {
                return window.isNaN(object) ? "null" : "" + object;
            } else if (className === "String") {
                var escapedStr = "" + object;
                return "\"" + escapedStr.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"") + "\"";
            }
            if (typeof object === "object") {
                if (!ObjectToJson.check) ObjectToJson.check = [];
                for (var i = 0, chkLen = ObjectToJson.check.length; i < chkLen; ++i) {
                    if (ObjectToJson.check[i] === object) {
                        throw new TypeError();
                    }
                }
                ObjectToJson.check.push(object);
                var str = '';
                if (className === "Array" || className === "Array Iterator") {
                    for (var index = 0, length = object.length; index < length; ++index) {
                        str += ObjectToJson(object[index]) + ',';
                    }
                    ObjectToJson.check.pop();
                    return "[" + str.slice(0, -1) + "]";
                } else {
                    for (var property in object) {
                        if (object.hasOwnProperty(property)) {
                            str += '"' + property + '":' + ObjectToJson(object[property]) + ',';
                        }
                    }
                    ObjectToJson.check.pop();
                    return "{" + str.slice(0, -1) + "}";
                }
            }
            return undef;
        }
        exports.stringify = function stringify(source) {
            return ObjectToJson(source);
        };
        var parser = {
            source: null,
            grammar: /^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/,
            ThrowError: function ThrowError() {
                throw new SyntaxError('JSON syntax error');
            },
            NextToken: function NextToken(token) {
                this.source = token.input.slice(token[0].length);
                return this.grammar.exec(this.source);
            },
            ParseArray: function ParseArray() {
                var token = this.grammar.exec(this.source),
                    parseItem = token && token[1] !== ']',
                    result = [];
                for (;; token = this.NextToken(token)) {
                    if (!token)
                        this.ThrowError();
                    if (parseItem) {
                        result.push(this.ParseValue(token));
                        token = this.grammar.exec(this.source);
                    } else {
                        if (token[1]) {
                            if (token[1] === ']') {
                                break;
                            } else if (token[1] !== ',') {
                                this.ThrowError();
                            }
                        } else {
                            this.ThrowError();
                        }
                    }
                    parseItem = !parseItem;
                }
                return result;
            },
            ParseObject: function ParseObject() {
                var propertyName, parseProperty = true,
                    result = {};
                for (var token = this.grammar.exec(this.source);; token = this.NextToken(token)) {
                    if (!token)
                        this.ThrowError();
                    if (parseProperty) {
                        if (token[1] && token[1] === '}') {
                            break;
                        } else if (token[1] || token[2] || !token[3]) {
                            this.ThrowError();
                        }
                        propertyName = token[3];
                        token = this.NextToken(token);
                        if (!token || !token[1] || token[1] !== ':')
                            this.ThrowError();
                        parseProperty = false;
                    } else {
                        if (!propertyName)
                            this.ThrowError();
                        result[propertyName] = this.ParseValue(token);
                        token = this.NextToken(this.grammar.exec(this.source));
                        if (token[1]) {
                            if (token[1] === '}') {
                                break;
                            } else if (token[1] !== ',') {
                                this.ThrowError();
                            }
                        } else {
                            this.ThrowError();
                        }
                        propertyName = undef;
                        parseProperty = true;
                    }
                }
                return result;
            },
            ParseValue: function ParseValue(token) {
                if (token[1]) {
                    switch (token[1]) {
                        case '[':
                            this.source = this.source.slice(token[0].length);
                            return this.ParseArray();
                        case '{':
                            this.source = this.source.slice(token[0].length);
                            return this.ParseObject();
                        case 'true':
                            return true;
                        case 'false':
                            return false;
                        case 'null':
                            return null;
                        default:
                            this.ThrowError();
                    }
                } else if (token[2]) {
                    return +token[2];
                }
                return token[3].replace(/\\(?:u(.{4})|(["\\\/'bfnrt]))/g, function replaceCallback(substr, utfCode, esc) {
                    if (utfCode) {
                        return AvNs.StringFromCharCode(parseInt(utfCode, 16));
                    } else {
                        switch (esc) {
                            case 'b':
                                return '\b';
                            case 'f':
                                return '\f';
                            case 'n':
                                return '\n';
                            case 'r':
                                return '\r';
                            case 't':
                                return '\t';
                            default:
                                return esc;
                        }
                    }
                });
            },
            Parse: function Parse(str) {
                if ('String' !== GetClass(str))
                    throw new TypeError();
                this.source = str;
                var token = this.grammar.exec(this.source);
                if (!token)
                    this.ThrowError();
                return this.ParseValue(token);
            }
        };
        exports.parse = function parse(source) {
            return parser.Parse(source);
        };
        if (window.JSON) {
            var originStringify = JSON.stringify;

            function StringifyWrapper(source) {
                if (Array.prototype.toJSON || String.prototype.toJSON)
                    return exports.stringify(source);
                return originStringify(source);
            }
            context["JSONStringify"] = JSON.stringify ? StringifyWrapper : exports.stringify;
            context["JSONParse"] = JSON.parse || exports.parse;
        } else {
            context["JSONStringify"] = exports.stringify;
            context["JSONParse"] = exports.parse;
        }
        return context;
    })(AvNs || {});
    (function CommonMain(ns) {
        ns.XMLHttpRequest = window.XMLHttpRequest;
        ns.XDomainRequest = window.XDomainRequest;
        ns.XMLHttpRequestOpen = window.XMLHttpRequest && window.XMLHttpRequest.prototype.open;
        ns.XMLHttpRequestSend = window.XMLHttpRequest && window.XMLHttpRequest.prototype.send;
        ns.XMLHttpRequestAbort = window.XMLHttpRequest && window.XMLHttpRequest.prototype.abort;
        ns.XMLHttpRequestSetRequestHeader = window.XMLHttpRequest && window.XMLHttpRequest.prototype.setRequestHeader;
        var originalCreateTreeWalker = document.createTreeWalker;
        ns.CreateTreeWalker = function CreateTreeWalker(root, whatToShow, filter, entityReferenceExpansion) {
            if (typeof(originalCreateTreeWalker) !== "function")
                throw new Error("document.createTreeWalker not implemented");
            return originalCreateTreeWalker.call(document, root, whatToShow, filter, entityReferenceExpansion);
        };
        ns.ObjectHasOwnProperty = Object.prototype.hasOwnProperty;
        ns.ElementSetAttribute = Element.prototype.setAttribute;
        ns.ElementAttachShadow = Element.prototype.attachShadow;
        ns.documentCreateTextNode = document.createTextNode;
        ns.documentStyleSheets = document.styleSheets;
        ns.StringSplit = String.prototype.split;
        ns.StringFromCharCode = String.fromCharCode;
        ns.EmptyFunc = function EmptyFunc() {};
        ns.IsStringEqualIgnoreCase = function IsStringEqualIgnoreCase(left, right) {
            if (typeof left !== "string" || typeof right !== "string")
                return false;
            return left.toLowerCase() === right.toLowerCase();
        };
        ns.MaxRequestDelay = 2000;
        ns.Log = ns.EmptyFunc;
        ns.SessionLog = ns.Log;
        ns.SessionError = ns.Log;

        function GetHostAndPort(url) {
            if (!url)
                return "";
            var urlString = typeof url !== "string" ? url.toString() : url;
            var hostBeginPos = urlString.indexOf("//");
            if (hostBeginPos === -1) {
                urlString = document.baseURI || "";
                hostBeginPos = urlString.indexOf("//");
                if (hostBeginPos === -1)
                    return "";
            }
            hostBeginPos += 2;
            var hostEndPos = urlString.indexOf("/", hostBeginPos);
            if (hostEndPos === -1)
                hostEndPos = urlString.length;
            var originParts = ns.StringSplit.call(urlString.substring(0, hostEndPos), "@");
            var origin = originParts.length > 1 ? originParts[1] : originParts[0];
            return origin[0] === "/" ? document.location.protocol + origin : origin;
        }
        ns.IsCorsRequest = function IsCorsRequest(url, initiator) {
            try {
                var urlOrigin = GetHostAndPort(url);
                var initiatorOrigin = GetHostAndPort(initiator);
                return Boolean(urlOrigin) && Boolean(initiatorOrigin) && urlOrigin !== initiatorOrigin;
            } catch (e) {
                ns.SessionLog("Error check CORS request, url: " + url + " , initiator: " + initiator + ", error: " + e.message);
                return false;
            }
        };
        ns.TryCreateUrl = function TryCreateUrl(url) {
            try {
                var replacedUrl = url.replace(/(https?:\/\/)\.(?=[0-9xa-fA-F])/i, "$1");
                return new URL(replacedUrl);
            } catch (e) {
                ns.SessionLog("Can't create URL from " + url);
                return null;
            }
        };
        ns.TrySendMessage = function TrySendMessage(port, message) {
            try {
                port.postMessage(message);
            } catch (e) {
                if (e.message && e.message.startsWith("Attempt to postMessage on disconnected port"))
                    ns.SessionLog("Attempt to postMessage on disconnected port: " + JSON.stringify(message));
                else
                    ns.SessionError(e, "nms_back");
            }
        };
        ns.HasValue = function HasValue(value) {
            return value && value.length !== 0;
        };
        ns.GetResourceSrc = function GetResourceSrc(resourceName) {
            return ns.GetBaseUrl() + ns.RESOURCE_ID + resourceName;
        };
        ns.IsRelativeTransport = function IsRelativeTransport() {
            return ns.PREFIX === "/";
        };
        ns.GetBaseUrl = function GetBaseUrl() {
            if (!ns.IsRelativeTransport())
                return ns.PREFIX;
            return document.location.protocol + "//" + document.location.host + "/";
        };
        var originalAddEventListener = document.addEventListener;
        var originalWindowAddEventListener = window.addEventListener;
        ns.AddEventListener = function AddEventListener(element, name, func, pluginId) {
            if (typeof originalAddEventListener === "function") {
                var callingFunction = element === window ? originalWindowAddEventListener : originalAddEventListener;
                callingFunction.call(element,
                    name,
                    function EventListenerCallback(e) {
                        try {
                            func(e || window.event);
                        } catch (ex) {
                            ns.SessionError(ex, pluginId);
                        }
                    },
                    true);
            } else {
                element.attachEvent("on" + name,
                    function EventListenerCallback(e) {
                        try {
                            func.call(element, e || window.event);
                        } catch (ex) {
                            ns.SessionError(ex, pluginId);
                        }
                    });
            }
        };
        ns.AddRemovableEventListener = function AddRemovableEventListener(element, name, func) {
            if (originalAddEventListener) {
                var callingFunction = element === window ? originalWindowAddEventListener : originalAddEventListener;
                callingFunction.call(element, name, func, true);
            } else {
                element.attachEvent("on" + name, func);
            }
        };
        ns.RemoveElement = function RemoveElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element);
        };
        var originalDocumentCreateElement = document.createElement;
        ns.DocumentCreateElement = function DocumentCreateElement(elementType) {
            return originalDocumentCreateElement.call(document, elementType);
        };
        var originalDocumentQuerySelectorAll = document.querySelectorAll;
        ns.HasDocumentQuerySelectorAll = function HasDocumentQuerySelectorAll() {
            return Boolean(originalDocumentQuerySelectorAll);
        };
        ns.DocumentQuerySelectorAll = function DocumentQuerySelectorAll(selector) {
            return originalDocumentQuerySelectorAll.call(document, selector);
        };
        var originalElementQuerySelectorAll = Element.prototype.querySelectorAll;
        ns.HasElementQuerySelectorAll = function HasElementQuerySelectorAll() {
            return Boolean(originalElementQuerySelectorAll);
        };
        ns.ElementQuerySelectorAll = function ElementQuerySelectorAll(element, selector) {
            return originalElementQuerySelectorAll.call(element, selector);
        };
        ns.RunModule = function RunModule(func, timeout) {
            if (document.readyState === "loading") {
                if (timeout)
                    ns.SetTimeout(func, timeout);
                var delayFunc = function DelayFunc() {
                    ns.SetTimeout(func, 0);
                };
                if (document.addEventListener)
                    ns.AddEventListener(document, "DOMContentLoaded", delayFunc);
                ns.AddEventListener(window, "load", delayFunc);
            } else {
                ns.SetTimeout(func, 0);
            }
        };
        ns.RemoveEventListener = function RemoveEventListener(element, name, func) {
            if (element.removeEventListener)
                element.removeEventListener(name, func, true);
            else
                element.detachEvent("on" + name, func);
        };
        var oldSetTimeout = setTimeout;
        var oldClearTimeout = clearTimeout;
        ns.SetTimeout = function SetTimeout(func, timeout, pluginId) {
            return oldSetTimeout(function TimerCallback() {
                    try {
                        func();
                    } catch (e) {
                        ns.SessionError(e, pluginId);
                    }
                },
                timeout);
        };
        ns.ClearTimeout = function ClearTimeout(id) {
            oldClearTimeout(id);
        };
        var oldSetInterval = setInterval;
        var oldClearInterval = clearInterval;
        ns.SetInterval = function SetInterval(func, interval, pluginId) {
            return oldSetInterval(function IntervalCallback() {
                    try {
                        func();
                    } catch (e) {
                        ns.SessionError(e, pluginId);
                    }
                },
                interval);
        };
        ns.ClearInterval = function ClearInterval(id) {
            return oldClearInterval(id);
        };
        ns.GetOwnerNode = function GetOwnerNode(element) {
            return element.ownerNode || element.owningElement;
        };

        function InsertStyleRule(style, rule) {
            try {
                if (style.styleSheet) {
                    style.styleSheet.cssText += rule + "\n";
                } else {
                    style.appendChild(ns.documentCreateTextNode.call(document, rule));
                    ns.SetTimeout(function TimerCallback() {
                        if (!style.sheet)
                            return;
                        var rules = style.sheet.cssRules || style.sheet.rules;
                        if (rules && rules.length === 0)
                            style.sheet.insertRule(rule);
                    }, 500);
                }
            } catch (e) {
                if (e.message === "can't access dead object")
                    ns.SessionLog("Trying to set css for dead object");
                else
                    throw e;
            }
        }

        function FindStyle(document, style) {
            for (var i = 0; i < ns.documentStyleSheets.length; ++i) {
                var ownerNode = ns.GetOwnerNode(ns.documentStyleSheets[i]);
                if (ownerNode && ownerNode.className === "abn_style" && ownerNode.textContent === style.textContent)
                    return ownerNode;
            }
            return null;
        }

        function GetHead() {
            var headElements = document.getElementsByTagName("head");
            return headElements.length !== 0 ? headElements[0] : null;
        }

        function AddDocumentStyles(document, rules) {
            if (typeof rules !== "object" || rules.constructor !== Array)
                return [];
            var styles = [];
            for (var i = 0, len = rules.length; i < len;) {
                var style = ns.DocumentCreateElement("style");
                style.type = "text/css";
                style.className = "abn_style";
                style.setAttribute("nonce", ns.ContentSecurityPolicyNonceAttribute);
                for (var n = 0; n < 4 && i < len; ++n, ++i) {
                    var rule = rules[i];
                    if (originalDocumentQuerySelectorAll) {
                        InsertStyleRule(style, rule);
                    } else {
                        var styleBegin = rule.lastIndexOf("{");
                        if (styleBegin === -1)
                            continue;
                        var styleText = rule.substr(styleBegin);
                        var selectors = ns.StringSplit.call(rule.substr(0, styleBegin), ",");
                        if (style.styleSheet) {
                            var cssText = "";
                            for (var j = 0; j !== selectors.length; ++j)
                                cssText += selectors[j] + styleText + "\n";
                            style.styleSheet.cssText += cssText;
                        } else {
                            for (var k = 0; k !== selectors.length; ++k)
                                style.appendChild(ns.documentCreateTextNode.call(document, selectors[k] + styleText));
                        }
                    }
                }
                var inserted = FindStyle(document, style);
                if (inserted && inserted.parentNode)
                    inserted.parentNode.removeChild(inserted);
                if (document.head && typeof document.head.appendChild === "function") {
                    document.head.appendChild(style);
                } else {
                    var head = GetHead();
                    if (head) {
                        head.appendChild(style);
                    } else {
                        ns.AddEventListener(document, "load", function AddStyle() {
                            var element = document.head || GetHead();
                            if (!element)
                                return;
                            for (var l = 0; l !== styles.length; ++l)
                                element.appendChild(styles[l]);
                        });
                    }
                }
                styles.push(style);
            }
            return styles;
        }
        ns.AddStyles = function AddStyles(rules) {
            return AddDocumentStyles(document, rules);
        };
        var originalDate = Date;
        var originalGetTime = Date.prototype.getTime;
        var originalToIsoString = Date.prototype.toISOString;
        ns.GetCurrentIsoDate = function GetCurrentIsoDate() {
            return originalToIsoString.call(new originalDate());
        };
        ns.GetCurrentTime = function GetCurrentTime() {
            try {
                var date = new originalDate();
                if (date && originalGetTime)
                    return originalGetTime.call(date);
                throw new Error("Cannot call getTime for date: " + date);
            } catch (e) {
                ns.SessionError(e);
                return 0;
            }
        };
        ns.GetPageScroll = function GetPageScroll() {
            var documentScrollLeft = 0;
            var documentScrollTop = 0;
            if (document.documentElement) {
                documentScrollLeft = document.documentElement.scrollLeft;
                documentScrollTop = document.documentElement.scrollTop;
            }
            var bodyScrollLeft = 0;
            var bodyScrollTop = 0;
            if (document.body) {
                bodyScrollLeft = document.body.scrollLeft;
                bodyScrollTop = document.body.scrollTop;
            }
            return {
                left: documentScrollLeft || bodyScrollLeft || 0,
                top: documentScrollTop || bodyScrollTop || 0
            };
        };
        ns.GetPageHeight = function GetPageHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        };
        ns.GetPageWidth = function GetPageWidth() {
            return document.documentElement.clientWidth || document.body.clientWidth;
        };
        ns.IsDefined = function IsDefined(variable) {
            return typeof variable !== "undefined";
        };
        ns.StopProcessingEvent = function StopProcessingEvent(evt) {
            if (evt.preventDefault)
                evt.preventDefault();
            else
                evt.returnValue = false;
            if (evt.stopPropagation)
                evt.stopPropagation();
            if (ns.IsDefined(evt.cancelBubble))
                evt.cancelBubble = true;
        };

        function Base64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return ns.StringFromCharCode("0x" + p1);
                }));
        }
        ns.ToBase64 = function ToBase64(value) {
            try {
                if (ns.IsDefined(window.btoa))
                    return Base64EncodeUnicode(value);
                var Base64Alphabit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var plain = value;
                var padLength = 0;
                if (plain.length % 3) {
                    padLength = 3 - (plain.length % 3);
                    for (var j = 0; j < padLength; ++j)
                        plain += "\0";
                }
                var result = "";
                for (var i = 0; i < plain.length; i += 3) {
                    var byte1 = plain.charCodeAt(i);
                    var byte2 = plain.charCodeAt(i + 1);
                    var byte3 = plain.charCodeAt(i + 2);
                    var temp = (byte1 << 16) | (byte2 << 8) | byte3;
                    var sixBit1 = (temp >> 18) & 0x3f;
                    var sixBit2 = (temp >> 12) & 0x3f;
                    var sixBit3 = (temp >> 6) & 0x3f;
                    var sixBit4 = temp & 0x3f;
                    result += Base64Alphabit.charAt(sixBit1) + Base64Alphabit.charAt(sixBit2) + Base64Alphabit.charAt(sixBit3) + Base64Alphabit.charAt(sixBit4);
                }
                if (padLength > 0) {
                    result = result.slice(0, result.length - padLength);
                    for (var k = 0; k < padLength; ++k)
                        result += "=";
                }
                return result;
            } catch (e) {
                ns.SessionError("Cannot convert to Base64: " + e.message, "common");
            }
            return "";
        };
        ns.StartLocationHref = document.location.href;
        ns.IsTopLevel = window && window === window.top;
        ns.IsElementVisibleCheckApplicable = function IsElementVisibleCheckApplicable() {
            return window && window.getComputedStyle;
        };
        ns.IsElementVisible = function IsElementVisible(element) {
            return window.getComputedStyle(element).visibility === "visible";
        };
        ns.IsElementDisplayed = function IsElementDisplayed(element) {
            var style = (ns.IsElementVisibleCheckApplicable() && element instanceof Element) ? window.getComputedStyle(element) : element.currentStyle;
            return style.display !== "none";
        };
        ns.DisableElementById = function DisableElementById(id) {
            const el = document.getElementById(id);
            if (el)
                el.classList.add("disabled");
        };
        ns.GetPageStartTime = function GetPageStartTime() {
            return window && window.performance && window.performance.timing && window.performance.timing.domContentLoadedEventStart ?
                window.performance.timing.domContentLoadedEventStart :
                0;
        };
        ns.GetPageStartNavigationTime = function GetPageStartNavigationTime() {
            return window && window.performance && window.performance.timing && window.performance.timing.navigationStart ?
                window.performance.timing.navigationStart :
                0;
        };
        ns.TryGetTagName = function TryGetTagName(element) {
            try {
                return element.tagName;
            } catch (e) {
                return "";
            }
        };
        var historyChangeSubscribers = [];

        function NotifyHistoryChanged() {
            try {
                for (var i = 0; i < historyChangeSubscribers.length; ++i) {
                    try {
                        historyChangeSubscribers[i].notify();
                    } catch (e) {
                        ns.SessionError(e, historyChangeSubscribers[i].injector);
                    }
                }
            } catch (e) {
                ns.SessionError(e, "common");
            }
        }
        ns.SubscribeHistoryChanged = function SubscribeHistoryChanged(injector, callback) {
            historyChangeSubscribers.push({
                injector: injector,
                notify: callback
            });
        };
        ns.UnsubscribeHistoryChanged = function UnsubscribeHistoryChanged(injector) {
            for (var i = 0; i < historyChangeSubscribers.length; ++i) {
                if (historyChangeSubscribers[i].injector === injector) {
                    historyChangeSubscribers.splice(i, 1);
                    return;
                }
            }
        };
        if (window.history) {
            var oldWindowHistory = window.history;
            var oldBack = window.history.back;
            var oldForward = window.history.forward;
            var oldGo = window.history.go;
            var oldPushState = window.history.pushState;
            var oldReplaceState = window.history.replaceState;
            window.history.back = function WrapperBack() {
                oldBack.apply(oldWindowHistory);
                NotifyHistoryChanged();
            };
            window.history.forward = function WrapperForward() {
                oldForward.apply(oldWindowHistory);
                NotifyHistoryChanged();
            };
            window.history.go = function WrapperGo() {
                oldGo.apply(oldWindowHistory, arguments);
                NotifyHistoryChanged();
            };
            window.history.pushState = function WrapperPushState() {
                oldPushState.apply(oldWindowHistory, arguments);
                NotifyHistoryChanged();
            };
            window.history.replaceState = function WrapperReplaceState() {
                oldReplaceState.apply(oldWindowHistory, arguments);
                NotifyHistoryChanged();
            };
            ns.WindowHistoryPushState = function PushStateExecutor() {
                oldPushState.apply(oldWindowHistory, arguments);
            };
        } else {
            ns.WindowHistoryPushState = ns.EmptyFunc;
        }
        return ns;
    })(AvNs);
    (function CommonMutation(ns) {
        function IsElementNode(node) {
            return node.nodeType === 1;
        }

        function IsNodeContainsElementWithTag(node, observeTag) {
            try {
                return observeTag === "*" || (IsElementNode(node) && (ns.IsStringEqualIgnoreCase(node.tagName, observeTag) || node.getElementsByTagName(observeTag).length > 0));
            } catch (e) {
                return false;
            }
        }

        function MutationChangeObserver(observeTag, pluginId) {
            var m_observer = null;
            var m_callback = null;
            var m_functionCheckInteresting = observeTag ? function functionCheckInteresting(node) {
                return IsNodeContainsElementWithTag(node, observeTag);
            } : IsElementNode;

            function ProcessNodeList(nodeList) {
                for (var i = 0; i < nodeList.length; ++i) {
                    if (m_functionCheckInteresting(nodeList[i]))
                        return true;
                }
                return false;
            }

            function ProcessDomChange(records) {
                try {
                    if (!m_callback)
                        return;
                    for (var i = 0; i < records.length; ++i) {
                        var record = records[i];
                        if ((record.addedNodes.length && ProcessNodeList(record.addedNodes)) ||
                            (record.removedNodes.length && ProcessNodeList(record.removedNodes))) {
                            m_callback();
                            return;
                        }
                    }
                } catch (e) {
                    ns.SessionError(e, pluginId);
                }
            }
            this.Start = function Start(callback) {
                m_callback = callback;
                m_observer = new MutationObserver(ProcessDomChange);
                m_observer.observe(document, {
                    childList: true,
                    subtree: true
                });
            };
            this.Stop = function Stop() {
                if (m_observer)
                    m_observer.disconnect();
                m_observer = null;
                m_callback = null;
            };
        }

        function DomEventsChangeObserver(observeTag, pluginId) {
            var m_callback = null;
            var m_functionCheckInteresting = observeTag ? function functionCheckInteresting(node) {
                return IsNodeContainsElementWithTag(node, observeTag);
            } : IsElementNode;

            function ProcessEvent(event) {
                try {
                    if (!m_callback)
                        return;
                    if (m_functionCheckInteresting(event.target))
                        m_callback();
                } catch (e) {
                    ns.SessionError(e, pluginId);
                }
            }
            this.Start = function Start(callback) {
                ns.AddRemovableEventListener(window, "DOMNodeInserted", ProcessEvent);
                ns.AddRemovableEventListener(window, "DOMNodeRemoved", ProcessEvent);
                m_callback = callback;
            };
            this.Stop = function Stop() {
                ns.RemoveEventListener(window, "DOMNodeInserted", ProcessEvent);
                ns.RemoveEventListener(window, "DOMNodeRemoved", ProcessEvent);
                m_callback = null;
            };
        }

        function TimeoutChangeObserver(observeTag) {
            var m_interval = null;
            var m_callback = null;
            var m_tagCount = 0;
            var m_attribute = "klot_" + ns.GetCurrentTime();

            function IsChangesOccure(nodeList) {
                for (var i = 0; i < nodeList.length; ++i) {
                    if (!nodeList[i][m_attribute])
                        return true;
                }
                return false;
            }

            function FillTagInfo(nodeList) {
                m_tagCount = nodeList.length;
                for (var i = 0; i < m_tagCount; ++i)
                    nodeList[i][m_attribute] = true;
            }

            function TimeoutProcess() {
                if (!m_callback)
                    return;
                var nodeList = observeTag ? document.getElementsByTagName(observeTag) : document.getElementsByTagName("*");
                if (nodeList.length !== m_tagCount || IsChangesOccure(nodeList)) {
                    FillTagInfo(nodeList);
                    m_callback();
                }
            }
            this.Start = function Start(callback) {
                m_callback = callback;
                FillTagInfo(document.getElementsByTagName(observeTag));
                m_interval = ns.SetInterval(TimeoutProcess, 10 * 1000);
                if (document.readyState !== "complete")
                    ns.AddEventListener(window, "load", TimeoutProcess);
            };
            this.Stop = function Stop() {
                ns.ClearInterval(m_interval);
                m_callback = null;
            };
        }
        ns.GetDomChangeObserver = function GetDomChangeObserver(observeTag, pluginId) {
            var observeTagLowerCase = observeTag ? observeTag.toLowerCase() : observeTag;
            if (window.MutationObserver && document.documentMode !== 11)
                return new MutationChangeObserver(observeTagLowerCase, pluginId);
            if (window.addEventListener)
                return new DomEventsChangeObserver(observeTagLowerCase, pluginId);
            return new TimeoutChangeObserver(observeTagLowerCase);
        };
        return ns;
    })(AvNs);
    (function Md5Main(ns) {
        function repeatElem(e, t) {
            var r = [];
            for (var i = 0; i < t; i++)
                r = r.concat(e);
            return r;
        }
        var S = repeatElem([7, 12, 17, 22], 4);
        S = S.concat(repeatElem([5, 9, 14, 20], 4));
        S = S.concat(repeatElem([4, 11, 16, 23], 4));
        S = S.concat(repeatElem([6, 10, 15, 21], 4));
        var K = [
            0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
            0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
            0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
            0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
            0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
            0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
            0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
            0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
            0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
            0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
            0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
            0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
        ];
        var A0 = 0x67452301;
        var B0 = 0xefcdab89;
        var C0 = 0x98badcfe;
        var D0 = 0x10325476;

        function RotateLeft(i, s) {
            return ((i << s) | (i >>> (32 - s)));
        }

        function UnsignedSum(x, y) {
            return (x + y) & 0xFFFFFFFF;
        }

        function toHexString(v) {
            var s = "";
            for (var i = 0; i < 4; i++)
                s += ((v >>> ((i * 8) + 4)) & 0x0f).toString(16) + ((v >>> (i * 8)) & 0x0f).toString(16);
            return s;
        }

        function dataPrepare(inData) {
            var d = inData;
            var l = d.length;
            var res = [];
            d += ns.StringFromCharCode(0x80);
            while (d.length % 4) d += ns.StringFromCharCode(0x0);
            for (var i = 0; i < d.length; i += 4)
                res.push((d.charCodeAt(i)) | (d.charCodeAt(i + 1) << 8) | (d.charCodeAt(i + 2) << 16) | (d.charCodeAt(i + 3) << 24));
            while (res.length % 16 !== 14) res.push(0x0);
            res.push(l << 3);
            res.push(l >>> 29);
            return res;
        }
        ns.md5 = function md5(data) {
            var words = dataPrepare(data);
            var A = A0;
            var B = B0;
            var C = C0;
            var D = D0;
            for (var i = 0; i < words.length; i += 16) {
                var a = A;
                var b = B;
                var c = C;
                var d = D;
                var block = words.slice(i, i + 16);
                for (var j = 0; j < 64; j++) {
                    var f = 0;
                    var g = 0;
                    switch (Math.floor(j / 16)) {
                        case 0:
                            f = (b & c) | ((~b) & d);
                            g = j;
                            break;
                        case 1:
                            f = (d & b) | ((~d) & c);
                            g = (5 * j) + 1;
                            break;
                        case 2:
                            f = b ^ c ^ d;
                            g = (3 * j) + 5;
                            break;
                        case 3:
                            f = c ^ (b | (~d));
                            g = 7 * j;
                            break;
                        default:
                    }
                    g -= 16 * Math.floor(g / 16);
                    f = UnsignedSum(UnsignedSum(f, a), UnsignedSum(K[j], block[g]));
                    a = d;
                    d = c;
                    c = b;
                    b = UnsignedSum(b, RotateLeft(f, S[j]));
                }
                A = UnsignedSum(A, a);
                B = UnsignedSum(B, b);
                C = UnsignedSum(C, c);
                D = UnsignedSum(D, d);
            }
            var digest = toHexString(A) + toHexString(B) + toHexString(C) + toHexString(D);
            return digest;
        };
    })(AvNs);
    (function AjaxTransportMain(ns) {
        var ajaxRequestProvider = (function ajaxRequestProvider() {
            return {
                GetAsyncRequest: function GetAsyncRequest() {
                    var xmlhttp = ns.XDomainRequest ? new ns.XDomainRequest() : new ns.XMLHttpRequest();
                    if (!ns.XDomainRequest) {
                        xmlhttp.open = ns.XMLHttpRequestOpen;
                        xmlhttp.send = ns.XMLHttpRequestSend;
                        xmlhttp.abort = ns.XMLHttpRequestAbort;
                        xmlhttp.setRequestHeader = ns.XMLHttpRequestSetRequestHeader;
                    }
                    xmlhttp.onprogress = ns.EmptyFunc;
                    return xmlhttp;
                }
            };
        })();
        var restoreSessionCallback = ns.EmptyFunc;
        var PingPongCallReceiver = function PingPongCallReceiver(caller) {
            var m_caller = caller;
            var m_isProductConnected = false;
            var m_pingWaitResponse = false;
            var m_requestDelay = ns.MaxRequestDelay;
            var m_requestTimer = null;
            var m_callCallback = ns.EmptyFunc;
            var m_errorCallback = ns.EmptyFunc;
            var m_updateCallback = ns.EmptyFunc;
            var m_pluginId = "ajax";
            var m_waitRequestsCount = 0;
            var m_stopped = false;

            function SendRequest() {
                try {
                    m_waitRequestsCount++;
                    m_caller.Call(
                        "from",
                        null,
                        null,
                        function CallCallback(result, parameters, method) {
                            m_pingWaitResponse = false;
                            m_isProductConnected = true;
                            if (parameters === "undefined" || method === "undefined") {
                                m_errorCallback("AJAX pong is not received. Product is deactivated");
                                m_waitRequestsCount--;
                                return;
                            }
                            if (method) {
                                ns.SetTimeout(function TimerCallback() {
                                    SendRequest();
                                }, 0, m_pluginId);
                                m_callCallback(method, parameters);
                            }
                            m_waitRequestsCount--;
                        },
                        function ErrorCallback(error) {
                            m_pingWaitResponse = false;
                            m_isProductConnected = false;
                            restoreSessionCallback();
                            m_errorCallback(error);
                            m_waitRequestsCount--;
                        }
                    );
                    m_pingWaitResponse = true;
                } catch (e) {
                    m_errorCallback("Ajax send ping exception: " + (e.message || e));
                }
            }

            function Ping() {
                try {
                    if (m_stopped)
                        return;
                    if (m_pingWaitResponse) {
                        m_requestTimer = ns.SetTimeout(Ping, 100, m_pluginId);
                        return;
                    }
                    m_requestDelay = m_updateCallback();
                    if (typeof(m_requestDelay) === "undefined")
                        return;
                    SendRequest();
                    m_requestTimer = ns.SetTimeout(Ping, m_requestDelay, m_pluginId);
                } catch (e) {
                    m_errorCallback("Send ping request: " + (e.message || e));
                }
            }
            this.StartReceive = function StartReceive(callCallback, errorCallback, updateCallback) {
                m_isProductConnected = true;
                m_callCallback = callCallback;
                m_errorCallback = errorCallback;
                m_updateCallback = updateCallback;
                m_requestDelay = m_updateCallback();
                m_requestTimer = ns.SetTimeout(Ping, m_requestDelay, m_pluginId);
                m_stopped = false;
            };
            this.ForceReceive = function ForceReceive() {
                ns.ClearTimeout(m_requestTimer);
                m_requestTimer = ns.SetTimeout(Ping, 0, m_pluginId);
            };
            this.StopReceive = function StopReceive() {
                m_stopped = true;
                if (m_requestTimer) {
                    ns.ClearTimeout(m_requestTimer);
                    m_requestTimer = null;
                }
                m_callCallback = ns.EmptyFunc;
                m_errorCallback = ns.EmptyFunc;
                m_updateCallback = ns.EmptyFunc;
            };
            this.IsStarted = function IsStarted() {
                return m_requestTimer !== null;
            };
            this.IsProductConnected = function IsProductConnected() {
                return m_isProductConnected;
            };
            this.GetWaitRequests = function GetWaitRequests() {
                if (m_requestTimer) {
                    ns.ClearTimeout(m_requestTimer);
                    m_requestTimer = null;
                }
                return m_waitRequestsCount;
            };
        };
        var LongPoolingReceiver = function LongPoolingReceiver(caller) {
            var m_caller = caller;
            var m_isProductConnected = false;
            var m_isStarted = false;
            var m_callCallback = ns.EmptyFunc;
            var m_errorCallback = ns.EmptyFunc;
            var m_pluginId = "long_pooling";

            function SendRequest(onResponseCallback) {
                try {
                    m_isProductConnected = true;
                    m_caller.Call(
                        "longpooling",
                        null,
                        null,
                        onResponseCallback,
                        function ErrorCallback(error) {
                            m_isProductConnected = false;
                            restoreSessionCallback();
                            m_errorCallback(error);
                        },
                        true
                    );
                } catch (e) {
                    ns.SessionError(e, "ajax_longpooling");
                    m_errorCallback("Ajax send ping exception: " + (e.message || e));
                }
            }

            function OnResponse(result, parameters, method) {
                if (!ns.IsDefined(parameters) || !ns.IsDefined(method)) {
                    m_errorCallback("AJAX pong is not received. Product is deactivated");
                    return;
                }
                ns.SetTimeout(function TimerCallback() {
                    SendRequest(OnResponse);
                }, 0, m_pluginId);
                if (method)
                    m_callCallback(method, parameters);
            }
            this.StartReceive = function StartReceive(callCallback, errorCallback) {
                m_isStarted = true;
                m_callCallback = callCallback;
                m_errorCallback = errorCallback;
                SendRequest(OnResponse);
            };
            this.ForceReceive = ns.EmptyFunc;
            this.StopReceive = function StopReceive() {
                m_isStarted = false;
                m_callCallback = ns.EmptyFunc;
                m_errorCallback = ns.EmptyFunc;
            };
            this.IsStarted = function IsStarted() {
                return m_isStarted;
            };
            this.IsProductConnected = function IsProductConnected() {
                return m_isProductConnected;
            };
            this.GetWaitRequests = function GetWaitRequests() {
                return 0;
            };
        };
        var AjaxCallerImpl = function AjaxCallerImpl(onLongPoolingEnable) {
            var m_path = ns.GetBaseUrl() + ns.SIGNATURE;
            var m_longPoolingRequest = null;
            var m_pluginId = "ajax_caller";

            function NoCacheParameter() {
                return "&nocache=" + Math.floor((1 + Math.random()) * 0x10000).toString(16);
            }

            function PrepareRequestObject(command, commandAttribute, isPost, isSecondCall) {
                var request = ajaxRequestProvider.GetAsyncRequest();
                if (request) {
                    var urlPath = m_path + "/" + command;
                    if (commandAttribute)
                        urlPath += "/" + commandAttribute;
                    var timestampArgument = "tm=" + encodeURIComponent(ns.GetCurrentIsoDate());
                    if (isPost) {
                        urlPath += ((urlPath.indexOf("?") === -1) ? "?" : "&");
                        urlPath += timestampArgument;
                        if (isSecondCall)
                            urlPath += "&second=true";
                        request.open("POST", urlPath);
                    } else {
                        if (urlPath.indexOf("?") === -1)
                            urlPath += "?get";
                        urlPath += NoCacheParameter();
                        urlPath += "&" + timestampArgument;
                        request.open("GET", urlPath, true);
                    }
                    if (request.setRequestHeader && ns.IsRelativeTransport())
                        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                return request;
            }

            function ClearRequest(request) {
                request.onerror = ns.EmptyFunc;
                request.onload = ns.EmptyFunc;
            }

            function GetResponseText(request) {
                try {
                    if (!ns.IsDefined(request.status) || request.status === 200)
                        return request.responseText.toString();
                } catch (e) {
                    ns.SessionLog(e);
                }
                return "";
            }

            function AsyncCall(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall, isSecondCall) {
                try {
                    var request = PrepareRequestObject(command, commandAttribute, Boolean(data), isSecondCall);
                    if (!request) {
                        callbackError && callbackError("Cannot create AJAX request!");
                        return;
                    }
                    request.onerror = function onerror() {
                        ClearRequest(request);
                        if (!ns.IsDefined(isSecondCall))
                            AsyncCall(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall, true);
                        else
                            callbackError && callbackError("AJAX request error for calling " + command + "/" + commandAttribute);
                    };
                    request.onload = function onload() {
                        try {
                            ClearRequest(request);
                            if (ns.IsDefined(request.status) && request.status === 403) {
                                callbackError && callbackError("Forbidden", {
                                    forbidden: true
                                });
                                return;
                            }
                            if (callbackResult) {
                                var responseText = GetResponseText(request);
                                if (responseText) {
                                    callbackResult(responseText);
                                    return;
                                }
                                if (!ns.IsDefined(isSecondCall)) {
                                    AsyncCall(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall, true);
                                    return;
                                }
                                if (callbackError)
                                    callbackError("AJAX request with unsupported url type!");
                            }
                        } catch (e) {
                            ns.SessionError(e, m_pluginId);
                        }
                    };
                    if (isLongPoolingCall)
                        m_longPoolingRequest = request;
                    request.send(data);
                } catch (e) {
                    if (callbackError)
                        callbackError("AJAX request " + command + "/" + commandAttribute + " exception: " + (e.message || e));
                }
            }
            this.Start = function Start(callbackSuccess) {
                callbackSuccess();
            };
            this.SendLog = function SendLog(message) {
                AsyncCall("log?" + encodeURIComponent(message));
            };
            this.SendResult = function SendResult(methodName, data) {
                AsyncCall("callResult", methodName, data);
            };

            function TryJsonParse(str) {
                try {
                    return ns.JSONParse(str);
                } catch (e) {
                    return null;
                }
            }
            this.Call = function Call(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall) {
                AsyncCall(
                    command,
                    commandAttribute,
                    data,
                    function CallCallback(responseText) {
                        var commandResponse = TryJsonParse(responseText);
                        if (!commandResponse) {
                            callbackError && callbackError("Wrong body of call command. Body is: '" + responseText +
                                "', command is " + command + " command attribute is " + commandAttribute);
                            return;
                        }
                        if (commandResponse.result === -1610612735) {
                            AsyncCall(
                                command,
                                commandAttribute,
                                data,
                                function callCallback(response) {
                                    if (!callbackResult)
                                        return;
                                    commandResponse = ns.JSONParse(response);
                                    callbackResult(commandResponse.result, commandResponse.parameters, commandResponse.method);
                                },
                                callbackError,
                                isLongPoolingCall
                            );
                        } else if (callbackResult) {
                            callbackResult(commandResponse.result, commandResponse.parameters, commandResponse.method);
                        }
                    },
                    callbackError,
                    isLongPoolingCall
                );
            };
            this.SessionErrorCall = function SessionErrorCall(message) {
                AsyncCall("logerr", null, message);
            };
            this.UnhandledExceptionCall = function UnhandledExceptionCall(message) {
                AsyncCall("except", null, message);
            };
            this.Shutdown = function Shutdown() {
                if (m_longPoolingRequest) {
                    if (m_longPoolingRequest.abort)
                        m_longPoolingRequest.abort();
                    ClearRequest(m_longPoolingRequest);
                    m_longPoolingRequest = null;
                }
            };
            this.InitCall = function InitCall(initData, callbackResult, callbackError) {
                restoreSessionCallback = callbackError;
                if (ns.StartLocationHref === "data:text/html,chromewebdata")
                    return callbackError();
                AsyncCall(
                    "init?data=" + encodeURIComponent(ns.ToBase64(ns.JSONStringify(initData))),
                    null,
                    null,
                    function AsyncCallCallback(responseText) {
                        try {
                            var initSettings = ns.JSONParse(responseText);
                            m_path = ns.GetBaseUrl() + initSettings.ajaxId + "/" + initSettings.sessionId;
                            if (initSettings.longPooling)
                                onLongPoolingEnable();
                            callbackResult(initSettings);
                        } catch (e) {
                            restoreSessionCallback && restoreSessionCallback("Error " + e.name + ": " + e.message);
                        }
                    },
                    callbackError
                );
            };
        };
        ns.Caller = function AjaxCaller() {
            var m_switchToLongPooling = false;
            var m_caller = new AjaxCallerImpl(OnLongPoolingEnable);
            var m_receiver = new PingPongCallReceiver(m_caller);
            var m_callCallback = ns.EmptyFunc;
            var m_errorCallback = ns.EmptyFunc;

            function StartLongPooling(needRestartReceive) {
                m_receiver = new LongPoolingReceiver(m_caller);
                if (needRestartReceive)
                    m_receiver.StartReceive(m_callCallback, m_errorCallback);
                ns.SessionLog("Switch to longpooling, receiver restarted: " + needRestartReceive);
            }

            function RestartReceiver() {
                var requestsCount = m_receiver.GetWaitRequests();
                if (requestsCount !== 0) {
                    ns.SessionLog("Wait requests count: " + requestsCount);
                    ns.SetTimeout(RestartReceiver, 100, "ajax_caller");
                } else {
                    m_receiver.StopReceive();
                    StartLongPooling(true);
                }
            }

            function SwitchToLongPooling() {
                var needRestartReceive = m_receiver.IsStarted();
                if (needRestartReceive)
                    RestartReceiver();
                else
                    StartLongPooling(false);
            }

            function OnLongPoolingEnable() {
                if (document.readyState === "complete")
                    SwitchToLongPooling();
                else
                    m_switchToLongPooling = true;
            }
            this.Start = function Start(callbackSuccess) {
                m_caller.Start(callbackSuccess);
            };
            this.SendLog = function SendLog(message) {
                m_caller.SendLog(message);
            };
            this.SendResult = function SendResult(methodName, data) {
                m_caller.SendResult(methodName, data);
            };
            this.Call = function Call(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall) {
                m_caller.Call(command, commandAttribute, data, callbackResult, callbackError, isLongPoolingCall);
            };
            this.SessionErrorCall = function SessionErrorCall(message) {
                m_caller.SessionErrorCall(message);
            };
            this.UnhandledExceptionCall = function UnhandledExceptionCall(message) {
                m_caller.UnhandledExceptionCall(message);
            };
            this.Shutdown = function Shutdown() {
                m_caller.Shutdown();
            };
            this.InitCall = function InitCall(initData, callbackResult, callbackError) {
                return m_caller.InitCall(initData, callbackResult, callbackError);
            };
            this.GetReceiver = function GetReceiver() {
                return this;
            };
            this.StartReceive = function StartReceive(callCallback, errorCallback, updateCallback) {
                m_callCallback = callCallback;
                m_errorCallback = errorCallback;
                m_receiver.StartReceive(callCallback, errorCallback, updateCallback);
            };
            this.ForceReceive = function ForceReceive() {
                m_receiver.ForceReceive();
            };
            this.StopReceive = function StopReceive() {
                m_receiver.StopReceive();
            };
            this.IsStarted = function IsStarted() {
                return m_receiver.IsStarted();
            };
            this.IsProductConnected = function IsProductConnected() {
                return m_receiver.IsProductConnected();
            };
            ns.AddEventListener(window, "load", function onLoad() {
                if (m_switchToLongPooling)
                    SwitchToLongPooling();
            }, "ajax_caller");
        };
        return ns;
    })(AvNs);
    var avSessionInstance = null;
    (function SessionMain(ns) {
        var runners = {};
        var lastPostponedInitTime = ns.GetCurrentTime();
        var postponedInitTimeout = null;
        var enableTracing = false;
        var initPending = false;
        var restartInterval = 0;
        var sessionMarkedForbidden = false;
        var ajaxId = "";
        var sessionId = "";
        if (ns.WORK_IDENTIFIERS) {
            var workIdentifiers = ns.StringSplit.call(ns.WORK_IDENTIFIERS, ",");
            for (var id = 0; id < workIdentifiers.length; ++id) {
                if (window[workIdentifiers[id]]) {
                    ns.AddRunner = ns.EmptyFunc;
                    ns.AddRunner2 = ns.EmptyFunc;
                    return;
                }
                window[workIdentifiers[id]] = true;
            }
        }
        var currentScriptPath = "";

        function removeThisScriptElement(injectId) {
            var pattern = injectId.toLowerCase();
            for (var i = 0, scriptsCount = document.scripts.length; i < scriptsCount; ++i) {
                var tag = document.scripts[i];
                if (typeof tag.src === "string" && tag.src.length > 45 &&
                    tag.src.toLowerCase().indexOf(pattern) > 0 &&
                    (/\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/main.js/).test(tag.src)) {
                    currentScriptPath = tag.src;
                    tag.parentElement.removeChild(tag);
                    break;
                }
            }
        }
        if (ns.INJECT_ID)
            removeThisScriptElement(ns.INJECT_ID);
        var CallReceiver = function CallReceiver(caller) {
            var m_plugins = {};
            var m_receiver = caller.GetReceiver();
            var m_caller = caller;
            var m_selfMethods = {};

            function GetPluginIdFromMethodName(methodName) {
                if (methodName) {
                    var names = ns.StringSplit.call(methodName, ".", 2);
                    if (names.length === 2)
                        return names[0];
                }
                return null;
            }

            function GetPluginMethods(pluginId) {
                var plugin = m_plugins[pluginId];
                return plugin ? plugin.methods : null;
            }

            function CheckCommonMethodName(methodName) {
                if (methodName) {
                    var names = ns.StringSplit.call(methodName, ".", 2);
                    if (names.length === 1 && names[0] === methodName)
                        return true;
                }
                return false;
            }
            this.RegisterMethod = function RegisterMethod(methodName, callback) {
                var pluginId = GetPluginIdFromMethodName(methodName);
                if (pluginId) {
                    var methods = GetPluginMethods(pluginId);
                    if (methods) {
                        if (methods[methodName])
                            return;
                        methods[methodName] = callback;
                    } else {
                        throw new Error("Cannot registered " + methodName);
                    }
                } else if (CheckCommonMethodName(methodName)) {
                    if (m_selfMethods[methodName])
                        throw new Error("Already registered method " + methodName);
                    m_selfMethods[methodName] = callback;
                }
            };

            function CallPluginMethod(pluginId, methodName, args) {
                var callback = null;
                if (pluginId) {
                    var methods = GetPluginMethods(pluginId);
                    if (methods)
                        callback = methods[methodName];
                } else {
                    callback = m_selfMethods[methodName];
                }
                if (callback) {
                    var result = {};
                    try {
                        if (args)
                            callback(ns.JSONParse(args));
                        else
                            callback();
                        result.success = true;
                        m_caller.SendResult(methodName, ns.JSONStringify(result));
                        return true;
                    } catch (e) {
                        result.success = false;
                        m_caller.SendResult(methodName, ns.JSONStringify(result));
                        ns.SessionError(e, (pluginId ? pluginId : "common"));
                        return false;
                    }
                }
                ns.SessionLog("Cannot call " + methodName + " for plugin " + (pluginId ? pluginId : "common"));
                return false;
            }

            function CallMethod(methodName, args) {
                var pluginId = GetPluginIdFromMethodName(methodName);
                if (pluginId || CheckCommonMethodName(methodName))
                    CallPluginMethod(pluginId, methodName, args);
            }

            function ReportPluginError(pluginId, status) {
                var onError = m_plugins[pluginId].onError;
                if (onError)
                    onError(status);
            }

            function ReportError(status) {
                for (var pluginId in m_plugins) {
                    if (ns.ObjectHasOwnProperty.call(m_plugins, pluginId))
                        ReportPluginError(pluginId, status);
                }
            }

            function UpdateDelay() {
                var newDelay = ns.MaxRequestDelay;
                var currentTime = ns.GetCurrentTime();
                for (var pluginId in m_plugins) {
                    if (!ns.ObjectHasOwnProperty.call(m_plugins, pluginId))
                        continue;
                    try {
                        var onPing = m_plugins[pluginId].onPing;
                        if (onPing) {
                            var delay = onPing(currentTime);
                            if (delay < newDelay && delay > 0 && delay < ns.MaxRequestDelay)
                                newDelay = delay;
                        }
                    } catch (e) {
                        ReportPluginError(pluginId, "UpdateDelay: " + (e.message || e));
                    }
                }
                return newDelay;
            }
            this.RegisterPlugin = function RegisterPlugin(pluginId, callbackPing, callbackError, callbackShutdown) {
                if (m_plugins[pluginId])
                    return;
                var plugin = {
                    onError: callbackError,
                    onPing: callbackPing,
                    onShutdown: callbackShutdown,
                    methods: {}
                };
                m_plugins[pluginId] = plugin;
                if (!m_receiver.IsStarted())
                    m_receiver.StartReceive(CallMethod, ReportError, UpdateDelay);
            };

            function IsPluginListEmpty() {
                for (var key in m_plugins) {
                    if (ns.ObjectHasOwnProperty.call(m_plugins, key))
                        return false;
                }
                return true;
            }
            this.UnregisterPlugin = function UnregisterPlugin(pluginId) {
                delete m_plugins[pluginId];
                if (IsPluginListEmpty())
                    m_receiver.StopReceive();
            };
            this.ForceReceive = function ForceReceive() {
                m_receiver.ForceReceive();
            };
            this.StopReceive = function StopReceive() {
                m_receiver.StopReceive();
            };
            this.UnregisterAll = function UnregisterAll() {
                if (IsPluginListEmpty())
                    return;
                for (var key in m_plugins) {
                    if (ns.ObjectHasOwnProperty.call(m_plugins, key))
                        m_plugins[key].onShutdown();
                }
                m_plugins = {};
            };
            this.IsEmpty = IsPluginListEmpty;
            this.IsProductConnected = function IsProductConnected() {
                return m_receiver.IsProductConnected();
            };
        };

        function LocalizationObjectFromDictionary(dictionary) {
            var object = {};
            if (dictionary) {
                for (var i = 0; i < dictionary.length; i++)
                    object[dictionary[i].name] = dictionary[i].value;
            }
            return object;
        }

        function SettingsObjectFromSettingsJson(settingsJson) {
            var object = {};
            if (settingsJson)
                object = ns.JSONParse(settingsJson);
            return object;
        }
        var AvSessionClass = function AvSessionClass(caller) {
            var self = this;
            var m_caller = caller;
            var m_callReceiver = new CallReceiver(caller);

            function BeaconSend(command, commandAttribute, data) {
                try {
                    var maxBeaconPackageSize = 64 * 1024;
                    var size = maxBeaconPackageSize;
                    if (typeof window.TextEncoder === "function")
                        size = data ? (new TextEncoder("utf-8").encode(data)).length : 0;
                    if (navigator && navigator.sendBeacon && size < maxBeaconPackageSize) {
                        var urlPath = ns.GetBaseUrl() + ajaxId + "/" + sessionId + "/" + command + "/" + commandAttribute + "?tm=" + encodeURIComponent(ns.GetCurrentIsoDate());
                        return navigator.sendBeacon(urlPath, data);
                    }
                } catch (e) {
                    ns.Log("Error on beacon send " + e);
                }
                return false;
            }

            function Call(methodName, argsObj, callbackResult, callbackError) {
                if (!m_callReceiver.IsProductConnected())
                    return;
                var callback = function callback(result, args, method) {
                    if (callbackResult)
                        callbackResult(result, args ? ns.JSONParse(args) : null, method);
                };
                var data = (argsObj) ?
                    ns.JSONStringify({
                        result: 0,
                        method: methodName,
                        parameters: ns.JSONStringify(argsObj)
                    }) :
                    null;
                m_caller.Call("to", methodName, data, callback, callbackError);
            }

            function OnUnloadCall(methodName, arrayOfArgs) {
                var data = (arrayOfArgs) ?
                    ns.JSONStringify({
                        result: 0,
                        method: methodName,
                        parameters: ns.JSONStringify(arrayOfArgs)
                    }) :
                    null;
                return BeaconSend("to", methodName, data);
            }

            function StopImpl(reason) {
                try {
                    m_callReceiver.UnregisterAll();
                    if (m_callReceiver.IsProductConnected()) {
                        if (!BeaconSend("shutdown", reason))
                            m_caller.Call("shutdown", reason);
                    }
                    m_callReceiver.StopReceive();
                    if (m_caller.Shutdown)
                        m_caller.Shutdown();
                } catch (e) {}
            }

            function DeactivatePlugin(pluginId) {
                m_callReceiver.UnregisterPlugin(pluginId);
                if (m_callReceiver.IsEmpty())
                    StopImpl();
            }

            function ActivatePlugin(pluginId, callbackPing, callbackError, callbackShutdown) {
                m_callReceiver.RegisterPlugin(
                    pluginId,
                    callbackPing,
                    function RegisterPluginOnError(e) {
                        callbackError && callbackError(e);
                        m_callReceiver.UnregisterPlugin(pluginId);
                        if (m_callReceiver.IsEmpty())
                            StopImpl();
                    },
                    function RegisterPluginOnShutdown() {
                        try {
                            callbackShutdown && callbackShutdown();
                        } catch (ex) {
                            ns.SessionError(ex, pluginId);
                        }
                    }
                );
            }

            function RegisterMethod(methodName, callback) {
                m_callReceiver.RegisterMethod(methodName, callback);
            }

            function ReloadImpl() {
                if (ns.StartLocationHref !== document.location.href)
                    ns.WindowHistoryPushState(0, document.title, ns.StartLocationHref);
                window.location.reload(true);
            }

            function ServiceWorkerAllowed() {
                try {
                    return navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated";
                } catch (e) {
                    ns.SessionLog("Service worker not allowed. Error: " + e.message);
                    return false;
                }
            }

            function Redirect(param) {
                document.location.href = param.targetUrl;
            }

            function ReloadPage() {
                if (ServiceWorkerAllowed()) {
                    ns.SetTimeout(ReloadImpl, 1000);
                    navigator.serviceWorker.getRegistrations()
                        .then(function getRegistrationsThen(regs) {
                            var countUnregistered = 0;
                            var rest = function rest() {
                                ++countUnregistered;
                                if (countUnregistered === regs.length)
                                    ReloadImpl();
                            };
                            for (var i = 0; i < regs.length; ++i) {
                                regs[i].unregister()
                                    .then(rest, rest);
                            }
                        }, ReloadImpl);
                } else {
                    ns.SetTimeout(ReloadImpl, 300);
                }
            }

            function OnStartError(injectorName) {
                try {
                    var connectionErrorCallback = runners[injectorName].onConnectionError;
                    if (connectionErrorCallback)
                        connectionErrorCallback();
                } catch (e) {
                    ns.Log(e);
                }
            }

            function StartInjector(param) {
                var pluginStartData = {};
                var runner = runners[param.injectorName];
                if (runner && runner.getParameters)
                    pluginStartData = {
                        plugin: runner,
                        parameters: ns.JSONStringify(runner.getParameters())
                    };
                var startData = {
                    url: ns.StartLocationHref,
                    plugins: param.injectorName,
                    data: {
                        data: pluginStartData
                    },
                    isTopLevel: ns.IsTopLevel,
                    pageStartTime: ns.GetPageStartTime(),
                    navigationStartTime: ns.GetPageStartNavigationTime()
                };
                m_caller.StartCall(
                    startData,
                    function StartCallCallback(plugin) {
                        if (runner && plugin) {
                            var settings = ns.IsDefined(plugin.settingsJson) ? SettingsObjectFromSettingsJson(plugin.settingsJson) : plugin.settings;
                            var localization = ns.IsDefined(plugin.localizationDictionary) ? LocalizationObjectFromDictionary(plugin.localizationDictionary) : {};
                            runner.runner(AvNs, avSessionInstance, settings, localization);
                        }
                    },
                    function StartCallOnError() {
                        OnStartError(param.injectorName);
                    }
                );
            }

            function OnStopError(injectorName) {
                ns.Log("Stop " + injectorName + "injector failed");
            }

            function StopInjector(param) {
                var runner = runners[param.injectorName];
                m_caller.StopCall(
                    param.injectorName,
                    function StopCallCallback(plugin) {
                        try {
                            if (runner && plugin && runner.stop)
                                runner.stop(AvNs, avSessionInstance);
                        } catch (e) {
                            ns.SessionError(e, plugin);
                        }
                    },
                    function StopCallOnError() {
                        OnStopError(param.injectorName);
                    }
                );
            }

            function GetErrorMessage(error) {
                var msg = "";
                if (error instanceof Error) {
                    msg = error.message;
                    if (error.stack)
                        msg += "\r\n" + error.stack;
                } else if (error instanceof Object) {
                    msg = ns.JSONStringify(error);
                } else {
                    msg = String(error);
                }
                return msg.length <= 2048 ? msg : (msg.substring(0, 2048) + "<...>");
            }

            function ExtractStackWithRegexp(stack, regexp) {
                var match = regexp.exec(stack);
                var result = [];
                while (match !== null) {
                    result.push(match[1]);
                    match = regexp.exec(stack);
                }
                return result;
            }

            function ExtractChromeStack(stack) {
                var chromeStackRegexp = /at ([\w\s.]*) \([\w-]*:\/\/[\w.-]*((?:\/[\w.\-\d]*)*)/g;
                return ExtractStackWithRegexp(stack, chromeStackRegexp);
            }

            function ExtractMozillaStack(stack) {
                var firefoxStackRegexp = /([\w.]*)@[\w-]*:\/\/[\w.-]*((?:\/[\w.-]*)*)/g;
                return ExtractStackWithRegexp(stack, firefoxStackRegexp);
            }

            function ExtractStack(error) {
                if (!error.stack)
                    return "";
                var extractedChromeStack = ExtractChromeStack(error.stack);
                if (extractedChromeStack)
                    return extractedChromeStack.join("\n");
                var extractedFirefoxStack = ExtractMozillaStack(error.stack);
                if (extractedFirefoxStack)
                    return extractedFirefoxStack.join("\n");
                return error.stack;
            }
            RegisterMethod("redirect", Redirect);
            RegisterMethod("reload", ReloadPage);
            RegisterMethod("start", StartInjector);
            RegisterMethod("stop", StopInjector);
            this.Reload = function Reload() {
                ReloadPage();
            };
            this.Log = function Log(error) {
                try {
                    if (!(this.IsProductConnected() && enableTracing))
                        return;
                    m_caller.SendLog(GetErrorMessage(error));
                } catch (e) {
                    ns.Log(e.message || e);
                }
            };
            this.LogError = function LogError(error, injector) {
                try {
                    if (!m_callReceiver.IsProductConnected())
                        return;
                    if (!injector)
                        injector = "common";
                    var result = {
                        injector: injector
                    };
                    var details = {
                        topLevel: ns.IsTopLevel
                    };
                    if (typeof error === "object") {
                        result.error2 = error.message ? error.message : "unknown";
                        result.stack = ExtractStack(error);
                        details.errorDetails = error.details;
                        result.error = result.error2;
                        if (details.errorDetails) {
                            result.error += "\n" + (typeof details.errorDetails === "object") ?
                                ns.JSONStringify(details.errorDetails) :
                                details.errorDetails;
                        }
                        if (result.stack)
                            result.error += "\n" + result.stack;
                    } else {
                        result.error = error;
                        var m = ns.StringSplit.call(error, "\n");
                        result.error2 = m[0];
                        details.errorDetails = m.slice(1).join("\n");
                    }
                    result.details = ns.JSONStringify(details);
                    m_caller.SessionErrorCall(ns.JSONStringify(result));
                } catch (e) {
                    ns.Log(e.message || e);
                }
            };

            function IsScriptletsException(message) {
                var match = message.match(/^([\w]*\s)?ReferenceError:\s([a-z\d]{7,9})$/);
                return match && match[2] && (match[2].length === 7 || match[2].length === 9);
            }

            function IsKnownError(message) {
                var knownErrors = [/^NetworkError[\s\W]/];
                return knownErrors.some(
                    function MatchPattern(pattern) {
                        return message.match(pattern);
                    }
                );
            }

            function IsNeedSkipError(e) {
                if (!m_callReceiver.IsProductConnected())
                    return true;
                if (!e.filename || !currentScriptPath)
                    return true;
                if (e.filename.indexOf(currentScriptPath) === -1)
                    return true;
                if (!e.message || typeof e.message !== "string")
                    return false;
                return IsScriptletsException(e.message) || IsKnownError(e.message);
            }
            this.UnhandledException = function UnhandledException(e) {
                try {
                    if (IsNeedSkipError(e))
                        return;
                    var errInfo = {};
                    errInfo.error = e.message && e.message.length > 1024 ? (e.message.substring(0, 1019) + "<...>") : e.message;
                    errInfo.script = e.filename && e.filename.length > 1024 ? (e.filename.substring(0, 1019) + "<...>") : e.filename;
                    errInfo.line = e.lineno;
                    errInfo.column = e.colno;
                    if (e.error)
                        errInfo.stack = e.error.stack && e.error.stack.length > 2048 ? (e.error.stack.substring(0, 2043) + "<...>") : e.error.stack;
                    m_caller.UnhandledExceptionCall(ns.JSONStringify(errInfo));
                    return;
                } catch (ex) {
                    ns.Log(ex.message || ex);
                }
            };
            this.ForceReceive = function ForceReceive() {
                m_callReceiver.ForceReceive();
            };
            this.IsProductConnected = function IsProductConnected() {
                return m_callReceiver.IsProductConnected();
            };
            this.InitializePlugin = function InitializePlugin(init) {
                init(
                    function OnInitActivatePlugin() {
                        ActivatePlugin.apply(self, arguments);
                    },
                    function OnInitRegisterMethod() {
                        RegisterMethod.apply(self, arguments);
                    },
                    function OnInitCall() {
                        Call.apply(self, arguments);
                    },
                    function OnInitDeactivatePlugin() {
                        DeactivatePlugin.apply(self, arguments);
                    },
                    function OnInitOnUnloadCall() {
                        return OnUnloadCall.apply(self, arguments);
                    }
                );
            };
            this.GetResource = function GetResource(resourcePostfix, callbackSuccess, callbackError) {
                if (!m_caller.ResourceCall)
                    throw new Error("Not implemented on transport GetResource");
                m_caller.ResourceCall(resourcePostfix, callbackSuccess, callbackError);
            };
            this.Stop = function Stop(reason) {
                StopImpl(reason);
            };
        };
        ns.AddRunner = function AddRunner(pluginName, runnerFunc, initParameters, onConnectionError) {
            var options = {
                name: pluginName,
                runner: runnerFunc
            };
            if (initParameters)
                options.getParameters = function getParameters() {
                    return initParameters;
                };
            if (onConnectionError)
                options.onConnectionError = onConnectionError;
            ns.AddRunner2(options);
        };
        ns.AddRunner2 = function AddRunner2(options) {
            var runnerItem = {
                runner: options.runner
            };
            if (options.stop)
                runnerItem.stop = options.stop;
            if (options.onConnectionError)
                runnerItem.onConnectionError = options.onConnectionError;
            if (options.getParameters)
                runnerItem.getParameters = options.getParameters;
            if (options.reject)
                runnerItem.reject = options.reject;
            runners[options.name] = runnerItem;
        };
        ns.SessionLog = function SessionLog(e) {
            if (avSessionInstance) {
                avSessionInstance.Log(e);
                return;
            }
            ns.Log(e);
        };
        ns.SessionError = function SessionError(e, injector) {
            if (avSessionInstance && avSessionInstance.IsProductConnected())
                avSessionInstance.LogError(e, injector);
            else
                ns.Log(e);
        };
        ns.AddEventListener(window, "error", function onError(e) {
            if (avSessionInstance)
                avSessionInstance.UnhandledException(e);
            else
                ns.Log(e);
        });
        ns.ContentSecurityPolicyNonceAttribute = ns.CSP_NONCE;

        function Init() {
            if (initPending || sessionMarkedForbidden)
                return;
            if (avSessionInstance && avSessionInstance.IsProductConnected())
                return;
            initPending = true;
            var caller = new ns.Caller();
            caller.Start(
                function StartCallback() {
                    var injectors = "";
                    var pluginsInitData = [];
                    var injectorNames = [];
                    for (var runner in runners) {
                        if (!ns.ObjectHasOwnProperty.call(runners, runner))
                            continue;
                        if (injectors)
                            injectors += "&";
                        injectors += runner;
                        injectorNames.push(runner);
                        if (runners[runner].getParameters)
                            pluginsInitData.push({
                                plugin: runner,
                                parameters: ns.JSONStringify(runners[runner].getParameters())
                            });
                    }
                    var initData = {
                        url: ns.StartLocationHref,
                        plugins: injectors,
                        data: {
                            data: pluginsInitData
                        },
                        isTopLevel: ns.IsTopLevel,
                        pageStartTime: ns.GetPageStartTime(),
                        navigationStartTime: ns.GetPageStartNavigationTime()
                    };
                    caller.InitCall(
                        initData,
                        function InitCallCallback(initSettings) {
                            ns.IsRtl = initSettings.rtl;
                            enableTracing = ns.IsDefined(initSettings.enableTracing) ? initSettings.enableTracing : true;
                            ajaxId = initSettings.ajaxId;
                            sessionId = initSettings.sessionId;
                            ns.GetCommandSrc = function GetCommandSrc() {
                                return ns.GetBaseUrl() + initSettings.ajaxId + "/" + initSettings.sessionId;
                            };
                            avSessionInstance = new AvSessionClass(caller);
                            var plugins = initSettings.plugins || [];
                            for (var i = 0, pluginsCount = plugins.length; i < pluginsCount; ++i) {
                                try {
                                    var plugin = plugins[i];
                                    var runnerItem = runners[plugin.name];
                                    if (runnerItem) {
                                        var settings = ns.IsDefined(plugin.settingsJson) ? SettingsObjectFromSettingsJson(plugin.settingsJson) : plugin.settings;
                                        var localization = ns.IsDefined(plugin.localizationDictionary) ?
                                            LocalizationObjectFromDictionary(plugin.localizationDictionary) :
                                            plugin.localization;
                                        runnerItem.runner(AvNs, avSessionInstance, settings, localization);
                                    }
                                } catch (e) {
                                    e.message = "Init error: " + e.message;
                                    ns.SessionError(e, plugins[i].name);
                                }
                            }
                            for (var j = 0; j < injectorNames.length; ++j) {
                                try {
                                    var injectorName = injectorNames[j];
                                    var runnerItemHolder = runners[injectorName];
                                    if (!IsInjectorInActiveList(plugins, injectorName) && runnerItemHolder.reject)
                                        runnerItemHolder.reject();
                                } catch (e) {
                                    ns.SessionError(e);
                                }
                            }
                            initPending = false;
                            ns.SessionLog("Session: " + initSettings.sessionId + " initialization complete time: " + ns.GetCurrentIsoDate() +
                                " document.readyState is " + document.readyState);
                        },
                        OnInitError
                    );
                },
                OnInitError
            );
        }

        function IsInjectorInActiveList(plugins, injectorName) {
            for (var i = 0; i < plugins.length; ++i) {
                if (plugins[i].name === injectorName)
                    return true;
            }
            return false;
        }

        function PostponeInit() {
            var nowPostponeTime = ns.GetCurrentTime();
            var postponeDelay = (nowPostponeTime - lastPostponedInitTime) > 5000 ? 200 : 60 * 1000;
            lastPostponedInitTime = nowPostponeTime;
            ns.ClearTimeout(postponedInitTimeout);
            postponedInitTimeout = ns.SetTimeout(Init, postponeDelay);
        }

        function OnInitError(message, details) {
            if (details && details.forbidden) {
                ns.ClearInterval(restartInterval);
                restartInterval = 0;
                sessionMarkedForbidden = true;
            } else {
                PostponeInit();
            }
            for (var runner in runners) {
                if (!ns.ObjectHasOwnProperty.call(runners, runner))
                    continue;
                try {
                    var connectionErrorCallback = runners[runner].onConnectionError;
                    if (connectionErrorCallback)
                        connectionErrorCallback();
                } catch (e) {
                    ns.Log(e);
                }
            }
            initPending = false;
        }
        ns.StartSession = function StartSession() {
            ns.ClearInterval(restartInterval);
            restartInterval = ns.SetInterval(PostponeInit, 30000);
            ns.AddEventListener(document, "DOMContentLoaded", PostponeInit);
            ns.AddEventListener(window, "load", PostponeInit);
            Init();
        };
        ns.StopSession = function StopSession(reason) {
            if (avSessionInstance)
                avSessionInstance.Stop(reason);
        };
        if ("onpageshow" in window) {
            ns.AddEventListener(
                window,
                "pageshow",
                function onPageShow(event) {
                    if (event.persisted)
                        ns.StartSession();
                }
            );
        }
        ns.AddEventListener(
            window,
            ("onpagehide" in window) ? "pagehide" : "unload",
            function onShutdownEvent(evt) {
                ns.StopSession(evt.type);
            }
        );
    })(AvNs);
    (function AbpProcessor(ns) {
        function QuerySelectorAll(obj, selector) {
            return (obj === document) ? ns.DocumentQuerySelectorAll(selector) : ns.ElementQuerySelectorAll(obj, selector);
        }

        function ProcessSelector(selector) {
            const trimmed = selector.trim();
            var str = ((trimmed[0] === ">") ? ":scope " : "* ") + trimmed;
            var selectorEnding = str.slice(-1);
            if (selectorEnding === ">" || selectorEnding === "+" || selectorEnding === "~")
                str += "*";
            return str;
        }

        function AddSelectorProcessor(selector, processors, isPseudoSelector) {
            if (!selector)
                return;
            var str = !isPseudoSelector ? ProcessSelector(selector) : "";
            processors.push(function pusher(objects) {
                var resultObjects = [];
                for (var i = 0; i < objects.length; ++i) {
                    if (isPseudoSelector) {
                        if (objects[i].matches(selector))
                            Array.prototype.push.apply(resultObjects, [objects[i]]);
                    } else {
                        var list = QuerySelectorAll(objects[i], str);
                        Array.prototype.push.apply(resultObjects, list);
                    }
                }
                return resultObjects;
            });
        }

        function GetTextInsideBracket(queryParts) {
            var result = "";
            for (var parentheses = 1; queryParts.index < queryParts.parts.length; ++queryParts.index) {
                if (!queryParts.parts[queryParts.index])
                    continue;
                var part = queryParts.parts[queryParts.index];
                if (part === ")") {
                    --parentheses;
                    if (!parentheses)
                        break;
                } else if (part === "(") {
                    ++parentheses;
                }
                result += part;
            }
            return result;
        }

        function GetQuotedText(queryParts) {
            var result = "";
            for (; queryParts.index < queryParts.parts.length; ++queryParts.index) {
                if (!queryParts.parts[queryParts.index])
                    continue;
                var part = queryParts.parts[queryParts.index];
                if (part === "\"")
                    break;
                result += part;
            }
            return result;
        }

        function RemoveChilds(objects) {
            for (var i = 0; i < objects.length;) {
                if (objects.some(
                        function checker(element) {
                            var object = objects[i];
                            if (element === object)
                                return false;
                            return element.contains(object);
                        }
                    ))
                    objects.splice(i, 1);
                else
                    i++;
            }
        }

        function PreprocessProperties(properties) {
            if (properties.length >= 2 && properties[0] === "/" && properties[properties.length - 1] === "/")
                return properties.substring(1, properties.length - 1);
            var props = properties.replace(/\*+/g, "*");
            props = props.replace(/\^\|$/, "^");
            props = props.replace(/\W/g, "\\$&");
            props = props.replace(/\\\*/g, ".*");
            props = props.replace(/^\\\|/, "^");
            return props.replace(/\\\|$/, "$");
        }

        function GetMatcherFromText(inputText) {
            try {
                var expression = "";
                var flags = "";
                var execResult = (/^\/(.*)\/([imu]*)$/).exec(inputText);
                if (execResult) {
                    expression = execResult[1];
                    if (execResult[2])
                        flags = execResult[2];
                } else {
                    expression = inputText.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                }
                return new RegExp(expression, flags);
            } catch (e) {
                return null;
            }
        }

        function GetMatchedStylesheetSelectors(stylesheet, propertiesMatcher) {
            var selectors = [];
            try {
                for (var i = 0; i < stylesheet.cssRules.length; ++i) {
                    var rule = stylesheet.cssRules[i];
                    if (rule.type !== rule.STYLE_RULE)
                        continue;
                    var properties = "";
                    for (var j = 0; j < rule.style.length; j++) {
                        var propertyName = rule.style.item(j);
                        properties += propertyName + ": " + rule.style.getPropertyValue(propertyName) + ";";
                    }
                    if (!propertiesMatcher.test(properties))
                        continue;
                    selectors.push(rule.selectorText);
                }
            } catch (e) {
                return [];
            }
            return selectors;
        }

        function GetDomStylesStrings(propertiesMatcher) {
            var matcher = new RegExp(propertiesMatcher, "i");
            var selectorsGroup = "";
            for (var i = 0; i < this.document.styleSheets.length; ++i) {
                var matchedSelectors = GetMatchedStylesheetSelectors(this.document.styleSheets[i], matcher);
                for (var selectorIndex = 0; selectorIndex < matchedSelectors.length; ++selectorIndex)
                    selectorsGroup += matchedSelectors[selectorIndex] + ", ";
            }
            if (selectorsGroup.length)
                selectorsGroup = selectorsGroup.substring(0, selectorsGroup.length - 2);
            return selectorsGroup;
        }

        function AbpHasProcessorFactory(queryParts, queryParser) {
            var innerSelectorsProcessor = queryParser(queryParts);
            return function AbpHasProcessor(objects) {
                var resultObjects = [];
                for (var i = 0; i < objects.length; ++i) {
                    if (innerSelectorsProcessor([objects[i]]).length)
                        resultObjects.push(objects[i]);
                }
                return resultObjects;
            };
        }

        function AbpContainsProcessorFactory(queryParts) {
            var textInsideBracket = GetTextInsideBracket(queryParts);
            var matcher = GetMatcherFromText(textInsideBracket);
            return function AbpContainsProcessor(objects) {
                var resultObjects = [];
                if (!matcher)
                    return resultObjects;
                RemoveChilds(objects);
                for (var i = 0; i < objects.length; ++i) {
                    if (matcher.test(objects[i].textContent))
                        resultObjects.push(objects[i]);
                }
                return resultObjects;
            };
        }

        function IsObjectPropertiesMatch(object, selectors) {
            var parent = object.parentNode || document;
            if (object === document)
                return false;
            var selectedObjects = Array.from(QuerySelectorAll(parent, selectors));
            return selectedObjects.some(function checker(item) {
                return item === object;
            });
        }

        function AbpPopertiesProcessorFactory(queryParts) {
            var textInsideBracket = GetTextInsideBracket(queryParts);
            var selectorRegexp = PreprocessProperties(textInsideBracket);
            var selectorsGroup = GetDomStylesStrings(selectorRegexp);
            return function AbpPopertiesProcessor(objects) {
                var resultObjects = [];
                if (!selectorsGroup)
                    return resultObjects;
                for (var i = 0; i < objects.length; ++i) {
                    var object = objects[i];
                    if (IsObjectPropertiesMatch(object, selectorsGroup))
                        resultObjects.push(object);
                }
                return resultObjects;
            };
        }

        function NotFactory(queryParts, queryParser) {
            var innerSelectorsProcessor = queryParser(queryParts, true);
            return function NotSelectorProcessor(objects) {
                var resultObjects = [];
                for (var i = 0; i < objects.length; ++i) {
                    if (!innerSelectorsProcessor([objects[i]]).length)
                        resultObjects.push(objects[i]);
                }
                return resultObjects;
            };
        }

        function ParseQuery(queryParts, isPseudoSelector) {
            var functions = [];
            var collectedPart = "";
            for (; queryParts.index < queryParts.parts.length; ++queryParts.index) {
                if (!queryParts.parts[queryParts.index])
                    continue;
                var part = queryParts.parts[queryParts.index];
                if (part === ")")
                    break;
                var processorFactory = void 0;
                if (part === ":-abp-has(" || part === ":has(")
                    processorFactory = AbpHasProcessorFactory;
                else if (part === ":-abp-contains(")
                    processorFactory = AbpContainsProcessorFactory;
                else if (part === ":-abp-properties(")
                    processorFactory = AbpPopertiesProcessorFactory;
                else if (part === ":not(")
                    processorFactory = NotFactory;
                if (processorFactory) {
                    ++queryParts.index;
                    AddSelectorProcessor(collectedPart, functions, isPseudoSelector);
                    collectedPart = "";
                    functions.push(processorFactory(queryParts, ParseQuery));
                    continue;
                }
                if (part === "(") {
                    ++queryParts.index;
                    part += GetTextInsideBracket(queryParts);
                    if (queryParts.index < queryParts.parts.length)
                        part += queryParts.parts[queryParts.index];
                }
                if (part === "\"") {
                    ++queryParts.index;
                    part += GetQuotedText(queryParts);
                    if (queryParts.index < queryParts.parts.length)
                        part += queryParts.parts[queryParts.index];
                }
                collectedPart += part;
            }
            AddSelectorProcessor(collectedPart, functions, isPseudoSelector);
            return function parser(objects) {
                var outputObjects = objects;
                for (var i = 0; i < functions.length; ++i) {
                    var tempObjects = functions[i](outputObjects);
                    outputObjects = tempObjects;
                }
                return outputObjects;
            };
        }
        ns.FindElementsByAbpRule = function FindElementsByAbpRule(abpRule) {
            var result = [];
            var partsValues = null;
            var splitRegExp = /(:has\()|(:-abp-has\()|(:-abp-contains\()|(:-abp-properties\()|(\()|(\))|(:not\()|(")/g;
            try {
                partsValues = ns.StringSplit.call(abpRule, splitRegExp).filter(function FilterSplitResult(el) {
                    return el;
                });
                var operation = ParseQuery({
                    parts: partsValues,
                    index: 0
                });
                result = operation([document]);
            } catch (e) {
                var details = {
                    rule: abpRule,
                    originalMessage: e.message,
                    partsValues: partsValues,
                    splitBy: splitRegExp.source
                };
                ns.SessionError({
                    message: "ERR processing abp rule",
                    details: ns.JSONStringify(details)
                }, "ab_abp");
                return [];
            }
            return result;
        };
        return ns;
    })(AvNs);

    function GetCommonLink() {
        var commonLink = AvNs.GetResourceSrc("/abn/main.css");
        if (!AvNs.IsRelativeTransport())
            return commonLink;
        return "/" + commonLink.substr(AvNs.GetBaseUrl().length);
    }

    function FindCommonLink() {
        if (document.querySelector)
            return document.querySelector("link[href^=\"" + GetCommonLink() + "\"]");
        for (var i = 0; i < AvNs.documentStyleSheets.length; ++i) {
            var currentStyleSheet = AvNs.documentStyleSheets[i];
            if (currentStyleSheet.href && currentStyleSheet.href.indexOf(GetCommonLink()) !== -1)
                return AvNs.documentStyleSheets[i].ownerNode || AvNs.documentStyleSheets[i].owningElement;
        }
        return null;
    }
    var abnRunner = function abnRunner(ns, session, settings) {
        function AntiBanner() {
            var m_callFunction = ns.EmptyFunc;
            var m_usingStyles = [];
            var m_deferredProcess = null;
            var m_processedIdentifier = "kl_abn_" + ns.GetCurrentTime();
            var m_firstRun = true;
            var m_randColorAttribute = settings.randomColor;
            var m_randBackgroundColorAttribute = settings.randomBackgroundColor;
            var m_observer = null;
            var m_abpRulesApplyTimeout = null;
            var m_pluginId = "abn";

            function OnPing() {
                return ns.MaxRequestDelay;
            }

            function GetStyleSheetFromNode(node) {
                return node.sheet || node.styleSheet;
            }

            function AddAntiBannerStyleSheet(styleSheet) {
                if (!styleSheet)
                    return;
                m_usingStyles.push(styleSheet);
            }

            function AddUsingStyle(sheetNodes) {
                for (var i = 0; i < ns.documentStyleSheets.length; ++i) {
                    var ownerNode = ns.GetOwnerNode(ns.documentStyleSheets[i]);
                    if (sheetNodes.indexOf(ownerNode) !== -1)
                        AddAntiBannerStyleSheet(ns.documentStyleSheets[i]);
                }
            }

            function SendAntibannerStat(newProcessedCount) {
                if (m_firstRun || newProcessedCount !== 0) {
                    m_callFunction("abn.statInfo", {
                        count: newProcessedCount
                    });
                    m_firstRun = false;
                }
            }

            function ApplyAbpRulesDelay(rule) {
                ns.SetTimeout(function ApplyAbpRulesTimerCallback() {
                    var elements = ns.FindElementsByAbpRule(rule);
                    var newProcessedCount = 0;
                    for (var i = 0; i < elements.length; ++i) {
                        if (!elements[i][m_processedIdentifier]) {
                            elements[i][m_processedIdentifier] = true;
                            elements[i].style.display = "none";
                            ++newProcessedCount;
                        }
                    }
                    if (newProcessedCount)
                        SendAntibannerStat(newProcessedCount);
                }, 0, m_pluginId);
            }

            function ApplyAbpRules(rules) {
                if (!ns.FindElementsByAbpRule) {
                    ns.SessionError("Function for abp rules is not defined", m_pluginId);
                    return;
                }
                for (var i = 0; i < rules.length; i++)
                    ApplyAbpRulesDelay(rules[i]);
            }

            function CalculateNewProcessedItemsBySelector(selector) {
                var newProcessedCount = 0;
                var elementList = ns.DocumentQuerySelectorAll(selector);
                for (var i = 0; i < elementList.length; ++i) {
                    if (!elementList[i][m_processedIdentifier]) {
                        elementList[i][m_processedIdentifier] = true;
                        ++newProcessedCount;
                    }
                }
                return newProcessedCount;
            }

            function CheckSelectors(selector) {
                try {
                    var selectorsArray = ns.StringSplit.call(selector, ",");
                    for (var i = 0; i < selectorsArray.length; ++i) {
                        try {
                            document.querySelector(selectorsArray[i]);
                        } catch (e) {
                            var detailsObject = {
                                cssRule: selectorsArray[i],
                                originalMessage: e.message
                            };
                            var errorObject = {
                                message: "Wrong selector",
                                details: JSON.stringify(detailsObject),
                                stack: e.stack
                            };
                            ns.SessionError(errorObject, m_pluginId);
                        }
                    }
                } catch (err) {
                    ns.SessionError(err, m_pluginId);
                }
            }

            function DeferredProcessCssRules(rules, i) {
                try {
                    if (!rules[i].selectorText) {
                        ns.SessionLog("Ignore rule " + i + " cause it empty");
                        return;
                    }
                    SendAntibannerStat(CalculateNewProcessedItemsBySelector(rules[i].selectorText));
                } catch (e) {
                    if (e.message && (e.message === "SyntaxError" || (e.message.includes && e.message.includes("is not a valid selector"))))
                        CheckSelectors(rules[i].selectorText);
                    else
                        ns.SessionError(e);
                }
            }

            function GetDeferredHandler(rules, i) {
                return function GetDeferredHandlerImpl() {
                    DeferredProcessCssRules(rules, i);
                };
            }

            function ProcessCssRules(rules) {
                for (var i = 0; i < rules.length; ++i)
                    ns.SetTimeout(GetDeferredHandler(rules, i), 0, m_pluginId);
            }

            function CalculateNewProcessedItemsByStyle() {
                var newProcessedCount = 0;
                var elementList = document.getElementsByTagName("*");
                for (var i = 0; i < elementList.length; ++i) {
                    if (!elementList[i][m_processedIdentifier] &&
                        elementList[i].currentStyle.color === m_randColorAttribute &&
                        elementList[i].currentStyle.backgroundColor === m_randBackgroundColorAttribute) {
                        elementList[i][m_processedIdentifier] = true;
                        ++newProcessedCount;
                    }
                }
                return newProcessedCount;
            }

            function CalculateNewProcessedItems() {
                if (ns.HasDocumentQuerySelectorAll()) {
                    var atLeastOneStyleExist = false;
                    for (var i = 0; i < m_usingStyles.length; ++i) {
                        try {
                            var cssRules = m_usingStyles[i].cssRules || m_usingStyles[i].rules;
                            if (cssRules && cssRules.length) {
                                ProcessCssRules(cssRules);
                                atLeastOneStyleExist = true;
                            }
                        } catch (e) {
                            ns.SessionLog(e);
                        }
                    }
                    if (!atLeastOneStyleExist) {
                        SendAntibannerStat(0);
                        ns.SessionLog("No one style exist. Count of using styles nodes: " + m_usingStyles.length);
                    }
                } else {
                    SendAntibannerStat(CalculateNewProcessedItemsByStyle());
                }
            }

            function ScheduleCalculateProcessedItems() {
                ns.ClearTimeout(m_deferredProcess);
                m_deferredProcess = ns.SetTimeout(CalculateNewProcessedItems, 500, m_pluginId);
            }

            function SetCss(rules) {
                if (rules.rules) {
                    var sheetNodes = ns.AddStyles(rules.rules);
                    ns.SetTimeout(function SetCssTimerCallback() {
                        AddUsingStyle(sheetNodes);
                    }, 0, m_pluginId);
                }
                if (rules.abpRules && rules.abpRules.length) {
                    var applyRulesFunc = function ApplyAbpRulesFunc() {
                        ApplyAbpRules(rules.abpRules);
                    };
                    applyRulesFunc();
                    ns.AddEventListener(window, "load", applyRulesFunc, m_pluginId);
                    if (m_observer)
                        m_observer.Stop();
                    m_observer = ns.GetDomChangeObserver("*", m_pluginId);
                    m_observer.Start(function AntiBannerMutationObserver() {
                        ns.ClearTimeout(m_abpRulesApplyTimeout);
                        m_abpRulesApplyTimeout = ns.SetTimeout(applyRulesFunc, 2000, m_pluginId);
                    });
                }
                ns.SessionLog("Calculate processed items when setting css");
                ScheduleCalculateProcessedItems();
            }

            function OnLoadCommonCss(arg, secondChance) {
                var target = arg.target || arg.srcElement;
                var processLoadedSheetNode = function processLoadedSheetNode(sheetNode) {
                    AddAntiBannerStyleSheet(sheetNode);
                    ns.SessionLog("Calculate processed items when loading common css");
                    ScheduleCalculateProcessedItems();
                };
                var sheetNode = GetStyleSheetFromNode(target);
                if (sheetNode) {
                    processLoadedSheetNode(sheetNode);
                } else if (secondChance) {
                    ns.SessionError("OnLoadCommonCss fail with not exist sheet", m_pluginId);
                } else {
                    ns.SessionLog("Sheet doesn't exist for link element. Second try after one second");
                    ns.SetTimeout(function SecondChanceForLoadCss() {
                        OnLoadCommonCss(arg, true);
                    }, 1000, m_pluginId);
                }
            }
            session.InitializePlugin(
                function InitializePluginABN(activatePlugin, registerMethod, callFunction) {
                    m_callFunction = callFunction;
                    activatePlugin(m_pluginId, OnPing);
                }
            );
            var commonLink = FindCommonLink();
            if (commonLink) {
                ns.AddEventListener(commonLink, "load", OnLoadCommonCss, m_pluginId);
                var sheetNode = GetStyleSheetFromNode(commonLink);
                if (sheetNode)
                    AddAntiBannerStyleSheet(sheetNode);
            } else {
                ns.SessionLog("Not found inserted common link", m_pluginId);
            }
            if (settings.insertCommonLink) {
                var link = ns.DocumentCreateElement("link");
                ns.ElementSetAttribute.call(link, "type", "text/css");
                ns.ElementSetAttribute.call(link, "rel", "stylesheet");
                ns.ElementSetAttribute.call(link, "href", ns.GetResourceSrc("/abn/main.css"));
                ns.ElementSetAttribute.call(link, "crossorigin", "anonymous");
                ns.AddEventListener(link, "load", OnLoadCommonCss, m_pluginId);
                if (document.head)
                    document.head.appendChild(link);
                else
                    document.getElementsByTagName("head")[0].appendChild(link);
            }
            SetCss(settings);
        }
        var instance = null;
        ns.RunModule(function RunModuleAB() {
            if (!instance)
                instance = new AntiBanner();
        });
    };
    var abnOptions = {
        name: "abn",
        runner: abnRunner,
        getParameters: function getParameters() {
            return {
                isCssUrlInjected: Boolean(FindCommonLink())
            };
        }
    };
    AvNs.AddRunner2(abnOptions);
    let ShadowRootProcessor = () => false;
    let ShadowRoots = [];

    function GetCommonLinkForShadow() {
        const commonLink = AvNs.GetResourceSrc("/abn/main.css");
        if (!AvNs.IsRelativeTransport())
            return commonLink;
        return "/" + commonLink.substr(AvNs.GetBaseUrl().length);
    }

    function FindCommonLinkForShadow() {
        if (document.querySelector)
            return document.querySelector(`link[href^="${GetCommonLinkForShadow()}"]`);
        for (const currentStyleSheet of AvNs.documentStyleSheets) {
            if (currentStyleSheet.href && currentStyleSheet.href.indexOf(GetCommonLinkForShadow()) !== -1)
                return currentStyleSheet.ownerNode || currentStyleSheet.owningElement;
        }
        return null;
    }
    if (AvNs.ElementAttachShadow) {
        const originalToString = Element.prototype.attachShadow.toString();
        Element.prototype.attachShadow = function AttachShadowProxy(param) {
            var shadowRoot = AvNs.ElementAttachShadow.call(this, param);
            try {
                if (param.mode === "closed" && !ShadowRootProcessor(shadowRoot))
                    ShadowRoots.push(shadowRoot);
            } catch (e) {
                AvNs.SessionError(e, "abn_shadow");
            }
            return shadowRoot;
        };
        Element.prototype.attachShadow.toString = () => originalToString;
    }
    const shadowAbnRunner = (ns, session) => {
        function ShadowAntiBanner() {
            const m_usingStyles = [];
            const m_pluginId = "abn_shadow";

            function OnPing() {
                return ns.MaxRequestDelay;
            }

            function FillStyleElement(style) {
                for (const abnStyle of m_usingStyles) {
                    if (abnStyle.disabled)
                        continue;
                    const rules = abnStyle.cssRules || abnStyle.rules;
                    for (const rule of rules)
                        style.appendChild(document.createTextNode(rule.cssText));
                }
            }

            function AddSelectorsToShadowRoot(shadowRoot) {
                try {
                    ns.SessionLog("Process new shadow root");
                    const style = ns.DocumentCreateElement("style");
                    style.type = "text/css";
                    if (ns.ContentSecurityPolicyNonceAttribute)
                        ns.ElementSetAttribute.call(style, "nonce", ns.ContentSecurityPolicyNonceAttribute);
                    ns.SetTimeout(() => {
                        FillStyleElement(style, shadowRoot);
                    }, 100, m_pluginId);
                    shadowRoot.appendChild(style);
                } catch (e) {
                    ns.SessionError(e, m_pluginId);
                }
                return true;
            }

            function AddAntiBannerStyleSheet(styleSheet) {
                if (!styleSheet)
                    return;
                m_usingStyles.push(styleSheet);
            }

            function OnLoadCommonCss(arg) {
                const processLoadedSheetNode = () => {
                    if (arg)
                        AddAntiBannerStyleSheet(arg.target.sheet);
                    ShadowRootProcessor = AddSelectorsToShadowRoot;
                    for (const shadowRoot of ShadowRoots)
                        AddSelectorsToShadowRoot(shadowRoot);
                    ShadowRoots = [];
                };
                if (arg && arg.target && arg.target.sheet)
                    processLoadedSheetNode();
                else
                    ns.SetTimeout(processLoadedSheetNode, 500, m_pluginId);
            }
            session.InitializePlugin(activatePlugin => {
                activatePlugin(m_pluginId, OnPing);
            });
            const commonLink = FindCommonLinkForShadow();
            if (commonLink) {
                if (commonLink.sheet) {
                    AddAntiBannerStyleSheet(commonLink.sheet);
                    OnLoadCommonCss({
                        target: commonLink
                    });
                } else {
                    ns.AddEventListener(commonLink, "load", OnLoadCommonCss, m_pluginId);
                }
            } else {
                ns.SessionLog("Not found inserted common link");
            }
        }
        let instance = null;
        ns.RunModule(function RunModuleShadowAntiBanner() {
            if (!instance)
                instance = new ShadowAntiBanner();
        });
    };
    const shadowAbnOptions = {
        name: "abn_shadow",
        runner: shadowAbnRunner,
        getParameters: () => ({
            isCssUrlInjected: Boolean(FindCommonLinkForShadow())
        })
    };
    AvNs.AddRunner2(shadowAbnOptions);
    var oldFetch = window.fetch;
    var xhrProxyEnabled = true;
    var processPostAjaxInSession = AvNs.EmptyFunc;
    var functionBind = Function.prototype.bind;
    var objectToString = Object.prototype.toString;
    var objectKeys = Object.keys;
    var arrayMap = Array.prototype.map;

    function NormalizeUrl(url) {
        var e = AvNs.DocumentCreateElement("a");
        e.href = url;
        return e.href;
    }

    function IsInternalUrl(url) {
        return AvNs.IsRelativeTransport() ? false : url.indexOf(AvNs.PREFIX) === 0;
    }
    var oldRequest = void 0;

    function GetEntries(obj) {
        var arr = objectKeys(obj);
        return arrayMap.call(arr, function ObjectToArray(key) {
            return [key, obj[key]];
        });
    }

    function CopyHeadersValue(initObject, value) {
        if (objectToString.call(value) === "[object Headers]") {
            var headersObject = new Headers(value);
            headersObject.set(AvNs.RequestCustomHeader, "Ajax_Request");
            initObject.headers = headersObject;
        } else if (objectToString.call(value) === "[object Array]") {
            var headersCopy = JSON.parse(JSON.stringify(value));
            headersCopy.push([AvNs.RequestCustomHeader, "Ajax_Request"]);
            initObject.headers = headersCopy;
        } else if (value !== null && typeof value === "object") {
            var headers = GetEntries(value);
            for (var j in headers) {
                if (!AvNs.ObjectHasOwnProperty.call(headers, j))
                    continue;
                var headerKey = headers[j][0];
                var headerValue = headers[j][1];
                initObject.headers[headerKey] = headerValue;
            }
        } else {
            initObject.headers = value;
        }
    }

    function GetLocationHref() {
        if (document.location)
            return document.location.href;
        return null;
    }

    function fetchCallImpl() {
        var args = [].slice.call(arguments);
        try {
            if (typeof args[0] === "string") {
                var fetchArguments = [];
                fetchArguments.push(args[0]);
                if (xhrProxyEnabled && AvNs.IsDefined(args[0]) && !AvNs.IsCorsRequest(args[0], GetLocationHref())) {
                    var initObject = {};
                    initObject.headers = {};
                    initObject.headers[AvNs.RequestCustomHeader] = "Ajax_Request";
                    if (args.length > 1 && args[1] !== null && typeof args[1] === "object") {
                        var entries = GetEntries(args[1]);
                        for (var i in entries) {
                            if (!AvNs.ObjectHasOwnProperty.call(entries, i))
                                continue;
                            var key = entries[i][0];
                            var value = entries[i][1];
                            if (AvNs.IsStringEqualIgnoreCase(key, "headers"))
                                CopyHeadersValue(initObject, value);
                            else
                                initObject[key] = value;
                        }
                    }
                    fetchArguments.push(initObject);
                } else if (args.length > 1) {
                    fetchArguments.push(args[1]);
                }
                args = [].slice.call(fetchArguments);
            } else if (args.length !== 0) {
                var clsNew = function clsNewFunc(Cls) {
                    return new(functionBind.apply(Cls, arguments))();
                };
                var clone = [].slice.call(arguments);
                clone.unshift(oldRequest);
                var request = clsNew.apply(this, clone);
                if (xhrProxyEnabled && AvNs.IsDefined(request.url) && !AvNs.IsCorsRequest(request.url, GetLocationHref()))
                    request.headers.append(AvNs.RequestCustomHeader, "Ajax_Request");
                args = [request];
            }
        } catch (e) {
            AvNs.SessionError(e, "xhr");
        }
        return oldFetch.apply(this, args);
    }
    if (oldFetch) {
        oldRequest = Request;
        var oldFunctionToString = Function.prototype.toString;
        window.fetch = function fetch() {
            return fetchCallImpl.apply(this, [].slice.call(arguments));
        };
        window.fetch.toString = function toString() {
            return oldFunctionToString.apply(oldFetch, [].slice.call(arguments));
        };
    }
    var m_requests = {};
    var m_idCounter = 0;

    function addDescriptor(requestDescriptor) {
        var id = ++m_idCounter;
        AvNs.SetTimeout(function TimerCallback() {
            delete m_requests[id];
        }, 60 * 1000, "xhr");
        m_requests[id] = requestDescriptor;
    }

    function findRequestDescriptor(request) {
        for (var index in m_requests) {
            if (!AvNs.ObjectHasOwnProperty.call(m_requests, index))
                continue;
            if (m_requests[index].request === request)
                return m_requests[index];
        }
        return null;
    }

    function deleteDescriptor(request) {
        for (var index in m_requests) {
            if (!AvNs.ObjectHasOwnProperty.call(m_requests, index))
                continue;
            if (m_requests[index].request === request)
                delete m_requests[index];
        }
    }

    function xhrAbortProcessor() {
        this.m_isAborted = true;
        AvNs.XMLHttpRequestAbort.apply(this, [].slice.call(arguments));
    }

    function xhrOpenProcessor() {
        try {
            this.m_isAborted = false;
            if (xhrProxyEnabled && arguments.length > 1 && typeof(arguments[0]) === "string" && AvNs.IsDefined(arguments[1])) {
                var requestDescriptor = {
                    request: this,
                    isCORS: AvNs.IsCorsRequest(arguments[1], GetLocationHref())
                };
                if (requestDescriptor.isCORS && AvNs.IsStringEqualIgnoreCase(arguments[0], "post") && !IsInternalUrl(NormalizeUrl(arguments[1]))) {
                    var sendCallback = processPostAjaxInSession.apply(this, [].slice.call(arguments));
                    if (sendCallback)
                        requestDescriptor.RequestSend = sendCallback;
                }
                addDescriptor(requestDescriptor);
            }
        } catch (e) {
            AvNs.SessionError(e, "xhr");
        }
        AvNs.XMLHttpRequestOpen.apply(this, [].slice.call(arguments));
    }

    function xhrSetRequestHeaderProcessor() {
        try {
            if (arguments.length && typeof arguments[0] === "string" && arguments[0].toLowerCase().indexOf(AvNs.RequestCustomHeader.toLowerCase()) === 0) {
                var requestDescriptor = findRequestDescriptor(this);
                if (requestDescriptor) {
                    requestDescriptor.headerSet = true;
                    delete requestDescriptor.RequestSend;
                } else {
                    requestDescriptor = {
                        request: this,
                        headerSet: true
                    };
                    addDescriptor(requestDescriptor);
                }
            }
        } catch (e) {
            AvNs.SessionError(e, "xhr");
        }
        return AvNs.XMLHttpRequestSetRequestHeader.apply(this, [].slice.call(arguments));
    }

    function xhrSendProcessor() {
        try {
            var requestDescriptor = findRequestDescriptor(this);
            if (xhrProxyEnabled && requestDescriptor) {
                deleteDescriptor(this);
                if (!requestDescriptor.isCORS && !requestDescriptor.headerSet)
                    AvNs.XMLHttpRequestSetRequestHeader.apply(this, [AvNs.RequestCustomHeader, "Ajax_Request"]);
                if (requestDescriptor.RequestSend) {
                    requestDescriptor.RequestSend.apply(this, [].slice.call(arguments));
                    return;
                }
            }
        } catch (e) {
            AvNs.SessionError(e, "xhr");
        }
        AvNs.XMLHttpRequestSend.apply(this, [].slice.call(arguments));
    }
    if (AvNs.XMLHttpRequestSend) {
        window.XMLHttpRequest.prototype.open = function open() {
            return xhrOpenProcessor.apply(this, [].slice.call(arguments));
        };
        window.XMLHttpRequest.prototype.send = function send() {
            xhrSendProcessor.apply(this, [].slice.call(arguments));
        };
        window.XMLHttpRequest.prototype.setRequestHeader = function setRequestHeader() {
            return xhrSetRequestHeaderProcessor.apply(this, [].slice.call(arguments));
        };
        window.XMLHttpRequest.prototype.abort = function abort() {
            return xhrAbortProcessor.apply(this, [].slice.call(arguments));
        };
    }
    AvNs.AddRunner("xhr_content", function AddRunnerXhrContent(ns, session) {
        var m_callFunction = null;

        function OnPing() {
            return ns.MaxRequestDelay;
        }

        function OnError() {
            xhrProxyEnabled = false;
        }

        function Initialize() {
            xhrProxyEnabled = true;
            session.InitializePlugin(function InitializePluginXhrContent(activatePlugin, registerMethod, callFunction) {
                m_callFunction = callFunction;
                activatePlugin("xhr_content", OnPing, OnError);
                processPostAjaxInSession = function processPostAjaxInSession() {
                    var sendArguments = "";
                    var request = null;
                    var notifyComplete = false;
                    var async = arguments.length < 3 || typeof arguments[2] !== "boolean" || arguments[2];
                    var callback = function callback() {
                        if (request) {
                            try {
                                if (request.m_isAborted)
                                    return;
                                AvNs.XMLHttpRequestSend.apply(request, sendArguments);
                            } catch (e) {
                                ns.SessionLog("Failed origin send + " + e.toString());
                            }
                        } else {
                            notifyComplete = true;
                        }
                    };
                    var remoteFunctionName = "xhr.ajaxRequestNotify";
                    var targetUrl = NormalizeUrl(arguments[1]);
                    var remoteFunctionArguments = {
                        url: ns.ToBase64(targetUrl),
                        urlEncrypted: true
                    };
                    var result = m_callFunction(remoteFunctionName, remoteFunctionArguments, callback, callback, async);
                    if (!result && !async) {
                        m_callFunction(remoteFunctionName, remoteFunctionArguments, callback, callback);
                        notifyComplete = true;
                    }
                    return function processPostAjax() {
                        if (notifyComplete) {
                            AvNs.XMLHttpRequestSend.apply(this, [].slice.call(arguments));
                        } else {
                            sendArguments = arguments.length > 0 ?
                                [arguments[0] && arguments[0].slice ? arguments[0].slice() : arguments[0]] :
                                [];
                            request = this;
                        }
                    };
                };
            });
        }
        Initialize();
    }, {
        referrer: document.referrer
    });
    (function XhrTrackerConstants(ns) {
        ns.RequestCustomHeader = "X-KL-saas-Ajax-Request";
    })(AvNs || {});
    AvNs.StartSession();
})();