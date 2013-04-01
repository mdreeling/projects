define("components/flight/lib/utils", [], function() {
	function c(a, b, c) {
		var d;
		return function() {
			var e = this, f = arguments, g = function() {
				d = null, a.apply(e, f)
			};
			d && c && clearTimeout(d);
			if (c || !d)
				d = setTimeout(g, b)
		}
	}

	var a = [], b = 100, d = {
		isDomObj : function(a) {
			return !!a.nodeType || a === window
		},
		toArray : function(b, c) {
			return a.slice.call(b, c)
		},
		merge : function() {
			var a = this.toArray(arguments);
			return a.unshift({}), a[a.length - 1] === !0 && (a.pop(), a.unshift(!0)), $.extend.apply(undefined, a)
		},
		push : function(a, b, c) {
			return a && Object.keys(b || {}).forEach(function(d) {
				if (a[d] && c)
					throw Error("utils.push attempted to overwrite '" + d + "' while running in protected mode");
				typeof a[d] == "object" && typeof b[d] == "object" ? this.push(a[d], b[d]) : a[d] = b[d]
			}, this), a
		},
		isEnumerable : function(a, b) {
			return Object.keys(a).indexOf(b) > -1
		},
		compose : function() {
			var a = arguments;
			return function() {
				var b = arguments;
				for (var c = a.length - 1; c >= 0; c--)
					b = [a[c].apply(this, b)];
				return b[0]
			}
		},
		uniqueArray : function(a) {
			var b = {}, c = [];
			for (var d = 0, e = a.length; d < e; ++d) {
				if (b.hasOwnProperty(a[d]))
					continue;
				c.push(a[d]), b[a[d]] = 1
			}
			return c
		},
		debounce : function(a, c, d) {
			typeof c != "number" && ( c = b);
			var e, f;
			return function() {
				var b = this, g = arguments, h = function() {
					e = null, d || ( f = a.apply(b, g))
				}, i = d && !e;
				return clearTimeout(e), e = setTimeout(h, c), i && ( f = a.apply(b, g)), f
			}
		},
		throttle : function(a, c) {
			typeof c != "number" && ( c = b);
			var d, e, f, g, h, i, j = this.debounce(function() {
				h = g = !1
			}, c);
			return function() {
				d = this, e = arguments;
				var b = function() {
					f = null, h && ( i = a.apply(d, e)), j()
				};
				return f || ( f = setTimeout(b, c)), g ? h = !0 : ( g = !0, i = a.apply(d, e)), j(), i
			}
		},
		countThen : function(a, b) {
			return function() {
				if (!--a)
					return b.apply(this, arguments)
			}
		},
		delegate : function(a) {
			return function(b, c) {
				var d = $(b.target), e;
				Object.keys(a).forEach(function(f) {
					if (( e = d.closest(f)).length)
						return c = c || {}, c.el = e[0], a[f].apply(this, [b, c])
				}, this)
			}
		}
	};
	return d
})
define("components/flight/lib/registry", ["./utils"], function(a) {
	function b(b, c) {
		var d, e, f;
		return c = a.toArray(c), typeof c[c.length - 1] == "function" && ( f = c.pop()), typeof c[c.length - 1] == "object" && c.pop(), c.length == 2 ? ( d = c[0], e = c[1]) : ( d = b.node, e = c[0]), {
			element : d,
			type : e,
			callback : f
		}
	}

	function c(a, b) {
		return a.element == b.element && a.type == b.type && (b.callback == null || a.callback == b.callback)
	}

	function d() {
		function e(a) {
			this.component = a, this.instances = [], this.addInstance = function(a) {
				this.throwIfInstanceExistsOnNode(a);
				var b = new f(a);
				return this.instances.push(b), b
			}, this.throwIfInstanceExistsOnNode = function(a) {
				this.instances.forEach(function(b) {
					if (b.instance.$node[0] === a.$node[0])
						throw new Error("Instance of " + a.constructor + " already exists on node " + a.$node[0])
				})
			}, this.removeInstance = function(a) {
				var b = this.instances.filter(function(b){return b.instance==a})[0], c = this.instances.indexOf(b);
				c > -1 && this.instances.splice(c, 1), this.instances.length || d.removeComponentInfo(this)
			}
		}

		function f(a) {
			this.instance = a, this.events = [], this.addTrigger = function() {
			}, this.addBind = function(a) {
				this.events.push(a), d.events.push(a)
			}, this.removeBind = function(a) {
				for (var b = 0, d; d = this.events[b]; b++)
					c(d, a) && this.events.splice(b, 1)
			}
		}

		var d = this;
		(this.reset = function() {
			this.components = [], this.allInstances = [], this.events = []
		}).call(this), this.addInstance = function(a) {
			var b = this.findComponentInfo(a);
			b || ( b = new e(a.constructor), this.components.push(b));
			var c = b.addInstance(a);
			return this.allInstances.push(c), b
		}, this.removeInstance = function(a) {
			var b, c = this.findInstanceInfo(a), d = this.findComponentInfo(a);
			d.removeInstance(a);
			var b = this.allInstances.indexOf(c);
			b > -1 && this.allInstances.splice(b, 1)
		}, this.removeComponentInfo = function(a) {
			var b = this.components.indexOf(a);
			b > -1 && this.components.splice(b, 1)
		}, this.findComponentInfo = function(a) {
			var b = a.attachTo ? a : a.constructor;
			for (var c = 0, d; d = this.components[c]; c++)
				if (d.component === b)
					return d;
			return null
		}, this.findInstanceInfo = function(a) {
			var b;
			a.node ? b = function(b) {
				return b.instance === a
			} : b = function(b) {
				return b.instance.node === a
			};
			var c = this.allInstances.filter(b);
			return c.length ? a.node ? c[0] : c : a.node ? null : []
		}, this.trigger = function() {
			var a = b(this, arguments), c = d.findInstanceInfo(this);
			c && c.addTrigger(a)
		}, this.on = function(c) {
			var e = a.toArray(arguments, 1), f = d.findInstanceInfo(this), g;
			if (f) {
				g = c.apply(null, e), g && (e[e.length - 1] = g);
				var h = b(this, e);
				f.addBind(h)
			}
		}, this.off = function(a, c, e) {
			var f = b(this, arguments), g = d.findInstanceInfo(this);
			g && g.removeBind(f)
		}, this.teardown = function() {
			d.removeInstance(this)
		}, this.withRegistration = function() {
			this.before("initialize", function() {
				d.addInstance(this)
			}), this.after("trigger", d.trigger), this.around("on", d.on), this.after("off", d.off), this.after("teardown", {
				obj : d,
				fnName : "teardown"
			})
		}
	}
	return new d
})
define("components/flight/lib/debug", ["./registry", "./utils"], function(a, b) {
	function d(a, b, c) {
		var c = c || {}, e = c.obj || window, g = c.path || (e == window ? "window" : ""), h = Object.keys(e);
		h.forEach(function(c) {
			(f[a] || a)(b, e, c) && console.log([g, ".", c].join(""), "->", ["(", typeof e[c], ")"].join(""), e[c]), Object.prototype.toString.call(e[c]) == "[object Object]" && e[c] != e && g.split(".").indexOf(c) == -1 && d(a, b, {
				obj : e[c],
				path : [g, c].join(".")
			})
		})
	}

	function e(a, b, c, e) {
		!b || typeof c == b ? d(a, c, e) : console.error([c, "must be", b].join(" "))
	}

	function g(a, b) {
		e("name", "string", a, b)
	}

	function h(a, b) {
		e("nameContains", "string", a, b)
	}

	function i(a, b) {
		e("type", "function", a, b)
	}

	function j(a, b) {
		e("value", null, a, b)
	}

	function k(a, b) {
		e("valueCoerced", null, a, b)
	}

	function l(a, b) {
		d(a, null, b)
	}

	function n() {
		var a = [].slice.call(arguments, 0);
		c.eventNames.length || (c.eventNames = "all"), c.actions = a.length ? a : "all"
	}

	function o() {
		var a = [].slice.call(arguments, 0);
		c.actions.length || (c.actions = "all"), c.eventNames = a.length ? a : "all"
	}

	function p() {
		c.actions = [], c.eventNames = []
	}

	function q() {
		c.actions = "all", c.eventNames = "all"
	}

	var c, f = {
		name : function(a, b, c) {
			return a == c
		},
		nameContains : function(a, b, c) {
			return c.indexOf(a) > -1
		},
		type : function(a, b, c) {
			return b[c] instanceof a
		},
		value : function(a, b, c) {
			return b[c] === a
		},
		valueCoerced : function(a, b, c) {
			return b[c] == a
		}
	}, m = document.cookie && document.cookie.indexOf("swift_event_logging=all") == -1 ? [] : "all";
	return c = {
		actions : m,
		eventNames : m
	}, {
		enable : function(a) {
			this.enabled = !!a, a && window.console && (console.info("Booting in DEBUG mode"), console.info("You can filter event logging with DEBUG.events.logAll/logNone/logByName/logByAction"))
		},
		find : {
			byName : g,
			byNameContains : h,
			byType : i,
			byValue : j,
			byValueCoerced : k,
			custom : l
		},
		events : {
			logFilter : c,
			logByAction : n,
			logByName : o,
			logAll : q,
			logNone : p
		}
	}
})
define("components/flight/lib/compose", ["./utils", "./debug"], function(a, b) {
	function f(a, b) {
		if (!c)
			return;
		var e = Object.create(null);
		Object.keys(a).forEach(function(c) {
			if (d.indexOf(c) < 0) {
				var f = Object.getOwnPropertyDescriptor(a, c);
				f.writable = b, e[c] = f
			}
		}), Object.defineProperties(a, e)
	}

	function g(a, b, d) {
		var e;
		if (!c || !a.hasOwnProperty(b)) {
			d.call(a);
			return
		}
		e = Object.getOwnPropertyDescriptor(a, b).writable, Object.defineProperty(a, b, {
			writable : !0
		}), d.call(a), Object.defineProperty(a, b, {
			writable : e
		})
	}

	function h(a, b) {
		a.mixedIn = a.hasOwnProperty("mixedIn") ? a.mixedIn : [], b.forEach(function(b) {
			a.mixedIn.indexOf(b) == -1 && (f(a, !1), b.call(a), a.mixedIn.push(b))
		}), f(a, !0)
	}

	var c = b.enabled && !a.isEnumerable(Object, "getOwnPropertyDescriptor"), d = ["mixedIn"];
	if (c)
		try {
			Object.getOwnPropertyDescriptor(Object, "keys")
		} catch(e) {
			c = !1
		}
	return {
		mixin : h,
		unlockProperty : g
	}
})
define("components/flight/lib/advice", ["./utils", "./compose"], function(a, b) {
	var c = {
		around : function(b, c) {
			return function() {
				var d = a.toArray(arguments);
				return c.apply(this, [b.bind(this)].concat(d))
			}
		},
		before : function(b, c) {
			return this.around(b, function() {
				var b = a.toArray(arguments), d = b.shift(), e;
				return e = typeof c == "function" ? c : c.obj[c.fnName], e.apply(this, b), d.apply(this, b)
			})
		},
		after : function(b, c) {
			return this.around(b, function() {
				var b = a.toArray(arguments), d = b.shift(), e, f = (d.unbound || d).apply(this, b);
				return e = typeof c == "function" ? c : c.obj[c.fnName], e.apply(this, b), f
			})
		},
		withAdvice : function() {
			["before", "after", "around"].forEach(function(a) {
				this[a] = function(d, e) {
					b.unlockProperty(this, d, function() {
						return typeof this[d] == "function" ? this[d] = c[a](this[d], e) : this[d] = e
					})
				}
			}, this)
		}
	};
	return c
})
define("components/flight/lib/component", ["./advice", "./utils", "./compose", "./registry"], function(a, b, c, d) {
	function e(a) {
		a.events.slice().forEach(function(a) {
			var b = [a.type];
			a.element && b.unshift(a.element), typeof a.callback == "function" && b.push(a.callback), this.off.apply(this, b)
		}, a.instance)
	}

	function f() {
		e(d.findInstanceInfo(this)), this.trigger("componentTornDown")
	}

	function g() {
		var a = d.findComponentInfo(this);
		a && a.instances.slice().forEach(function(a) {
			a.instance.teardown()
		})
	}

	function h() {
		this.trigger = function() {
			var a, c, d, e = b.toArray(arguments);
			typeof e[e.length - 1] != "string" && ( d = e.pop()), a = e.length == 2 ? $(e.shift()) : this.$node, c = e[0];
			if (window.DEBUG && window.postMessage)
				try {
					window.postMessage(d, "*")
				} catch(f) {
					throw console.log("unserializable data for event", c, ":", d), new Error(["The event", event.type, "on component", this.describe, "was triggered with non-serializable data"].join(" "))
				}
			return typeof this.attr.eventData == "object" && ( d = $.extend(!0, {}, this.attr.eventData, d)), a.trigger(c, d)
		}, this.on = function() {
			var a, c, d, e, f = b.toArray(arguments);
			typeof f[f.length - 1] == "object" ? e = b.delegate(this.resolveDelegateRules(f.pop())) : e = f.pop(), d = e && e.bind(this), d.target = e, a = f.length == 2 ? $(f.shift()) : this.$node, c = f[0];
			if ( typeof d == "undefined")
				throw new Error("Unable to bind to '" + c + "' because the given callback is undefined");
			return a.on(c, d), e.guid = d.guid, d
		}, this.off = function() {
			var a, c, d, e = b.toArray(arguments);
			return typeof e[e.length - 1] == "function" && ( d = e.pop()), a = e.length == 2 ? $(e.shift()) : this.$node, c = e[0], a.off(c, d)
		}, this.resolveDelegateRules = function(a) {
			var b = {};
			return Object.keys(a).forEach(function(c) {
				if (!this.attr.hasOwnProperty(c))
					throw new Error('Component "' + this.describe + '" wants to listen on "' + c + '" but no such attribute was defined.');
				b[this.attr[c]] = a[c]
			}, this), b
		}, this.defaultAttrs = function(a) {
			b.push(this.defaults, a, !0) || (this.defaults = a)
		}, this.select = function(a) {
			return this.$node.find(this.attr[a])
		}, this.initialize = $.noop, this.teardown = f
	}

	function i(a) {
		if (!a)
			throw new Error("Component needs to be attachTo'd a jQuery object, native node or selector string");
		var c = b.merge.apply(b, b.toArray(arguments, 1));
		$(a).each( function(a, b) {
			new this(b, c)
		}.bind(this))
	}

	function j() {
		function f(a, c) {
			var d = {}, e = 0;
			if (!a)
				throw new Error("Component needs a node");
			a.jquery ? (this.node = a[0], this.$node = a) : (this.node = a, this.$node = $(a)), this.describe = this.constructor.describe, this.bind = function(a) {
				var c;
				if (a.uuid && ( c = d[a.uuid]))
					return c;
				var f = b.toArray(arguments, 1);
				return f.unshift(this), c = a.bind.apply(a, f), c.target = a, a.uuid = e++, d[a.uuid] = c, c
			}, this.attr = b.merge(this.defaults, c), this.initialize.call(this, c || {}), this.trigger("componentInitialized")
		}

		var e = b.toArray(arguments);
		return f.toString = function() {
			var a = e.map(function(a) {
				if ($.browser.msie) {
					var b = a.toString().match(/function (.*?)\s?\(/);
					return b && b[1] ? b[1] : ""
				}
				return a.name
			}).join(", ").replace(/\s\,/g, "");
			return a
		}, f.describe = f.toString(), f.attachTo = i, f.teardownAll = g, e.unshift(h, a.withAdvice, d.withRegistration), c.mixin(f.prototype, e), f
	}
	return j.teardownAll = function() {
		d.components.slice().forEach(function(a) {
			a.component.teardownAll()
		}), d.reset()
	}, j
})
define("core/component", ["module", "require", "exports", "components/flight/lib/component"], function(module, require, exports) {
	var flightComponent = require("components/flight/lib/component");
	module.exports = flightComponent
});
define("core/registry", ["module", "require", "exports", "components/flight/lib/registry"], function(module, require, exports) {
	var flightRegistry = require("components/flight/lib/registry");
	module.exports = flightRegistry
});
provide("core/clock", function(a) {
	using("core/component", "core/registry", function(b, c) {
		function h() {
		}

		function i() {
			this.timers = [], this.clockComponent = function() {
				if (!this.currentClock || !c.findInstanceInfo(this.currentClock))
					this.reset(), this.currentClock = new d(document);
				return this.currentClock
			}, this.trigger = function(a, b) {
				this.clockComponent().trigger(a, b)
			}, this.reset = function() {
				this.timers = []
			}, this.tick = function() {
				this.timers.forEach(function(a) {
					a.tick(f)
				})
			}, this.setTicker = function() {
				this.pause(), this.ticker = window.setInterval(this.tick.bind(this), f)
			}, this.init = function() {
				this.clockComponent(), this.ticker || this.setTicker()
			}, this.clear = function(a) {
				a && this.timers.splice(this.timers.indexOf(a), 1)
			}, this.setTimeoutEvent = function(a, b, c) {
				if ( typeof a != "string")
					return console.error("clock.setTimeoutEvent was passed a function instead of a string.");
				this.init();
				var d = new k(a, b, c);
				return this.timers.push(d), d
			}, this.clearTimeout = function(a) {
				a instanceof k && this.clear(a)
			}, this.setIntervalEvent = function(a, b, c) {
				if ( typeof a != "string")
					return console.error("clock.setIntervalEvent was passed a function instead of a string.");
				this.init();
				var d = new m(a, b, c);
				return this.timers.push(d), d
			}, this.clearInterval = function(a) {
				a instanceof m && this.clear(a)
			}, this.resume = this.restart = this.setTicker, this.pause = function(a, b) {
				clearInterval(this.ticker || 0)
			}
		}

		function j() {
			this.callback = function() {
				e.trigger(this.eventName, this.data)
			}, this.clear = function() {
				e.clear(this)
			}, this.pause = function() {
				this.paused = !0
			}, this.resume = function() {
				this.paused = !1
			}, this.tickUnlessPaused = this.tick, this.tick = function() {
				if (this.paused)
					return;
				this.tickUnlessPaused.apply(this, arguments)
			}
		}

		function k(a, b, c) {
			this.countdown = b, this.eventName = a, this.data = c
		}

		function m(a, b, c) {
			this.countdown = this.interval = this.maxInterval = this.initialInterval = b, this.backoffFactor = g, this.eventName = a, this.data = c
		}

		var d = b(h), e = new i, f = 1e3, g = 2, l = function() {
			this.tick = function(a) {
				this.countdown -= a, this.countdown <= 0 && (this.clear(), this.callback())
			}
		};
		l.call(k.prototype), j.call(k.prototype);
		var n = function() {
			this.tick = function(a) {
				this.countdown -= a;
				if (this.countdown <= 0) {
					this.callback();
					if (this.interval < this.maxInterval) {
						var b = Math.ceil(this.interval * this.backoffFactor / f) * f;
						this.interval = Math.min(b, this.maxInterval)
					}
					this.countdown = this.interval
				}
			}, this.backoff = function(a, b) {
				this.maxInterval = a, this.backoffFactor = b || g, this.interval > this.maxInterval && (this.interval = a)
			}, this.cancelBackoff = function() {
				this.countdown = this.interval = this.maxInterval = this.initialInterval, this.resume()
			}
		};
		n.call(m.prototype), j.call(m.prototype), a(e)
	})
})
define("core/compose", ["module", "require", "exports", "components/flight/lib/compose"], function(module, require, exports) {
	var flightCompose = require("components/flight/lib/compose");
	module.exports = flightCompose
});
define("core/advice", ["module", "require", "exports", "components/flight/lib/advice"], function(module, require, exports) {
	var flightAdvice = require("components/flight/lib/advice");
	module.exports = flightAdvice
});
provide("core/parameterize", function(a) {
	function c(a, c, d) {
		return c ? a.replace(b, function(a, b) {
			if (b) {
				if (c[b])
					return c[b];
				if (d)
					throw new Error("Cannot parameterize string, no replacement found for " + b);
				return ""
			}
			return a
		}) : a
	}

	var b = /\{\{(.+?)\}\}/g;
	a(c)
})
provide("core/i18n", function(a) {
	using("core/parameterize", function(b) {
		a(b)
	})
})
define("components/flight/lib/logger", ["./compose", "./utils"], function(a, b) {
	function d(a) {
		var b = a.tagName ? a.tagName.toLowerCase() : a.toString(), c = a.className ? "." + a.className : "", d = b + c;
		return a.tagName ? ["'", "'"].join(d) : d
	}

	function e(a, b, e) {
		var f, g, h, i, j, k, l, m;
		typeof e[e.length - 1] == "function" && ( h = e.pop(), h = h.unbound || h), typeof e[e.length - 1] == "object" && e.pop(), e.length == 2 ? ( g = e[0], f = e[1]) : ( g = b.$node[0], f = e[0]), window.DEBUG && ( j = DEBUG.events.logFilter, l = j.actions == "all" || j.actions.indexOf(a) > -1, k = function(a) {
			return a.test ? a : new RegExp("^" + a.replace(/\*/g, ".*") + "$")
		}, m = j.eventNames == "all" || j.eventNames.some(function(a) {
			return k(a).test(f)
		}), l && m && console.info(c[a], a, "[" + f + "]", d(g), b.constructor.describe, h && ( i = h.name || h.displayName) && "->  " + i))
	}

	function f() {
		this.before("trigger", function() {
			e("trigger", this, b.toArray(arguments))
		}), this.before("on", function() {
			e("on", this, b.toArray(arguments))
		}), this.before("off", function(a) {
			e("off", this, b.toArray(arguments))
		})
	}

	var c = {
		on : "<-",
		trigger : "->",
		off : "x "
	};
	return f
})
define("core/logger", ["module", "require", "exports", "components/flight/lib/logger"], function(module, require, exports) {
	var flightLogger = require("components/flight/lib/logger");
	module.exports = flightLogger
});
define("core/utils", ["module", "require", "exports", "components/flight/lib/utils"], function(module, require, exports) {
	var flightUtils = require("components/flight/lib/utils");
	module.exports = flightUtils
});
define("debug/debug", ["module", "require", "exports", "components/flight/lib/debug"], function(module, require, exports) {
	var flightDebug = require("components/flight/lib/debug");
	module.exports = flightDebug
});
provide("app/utils/querystring", function(a) {
	function b(a) {
		return encodeURIComponent(a).replace(/\+/g, "%2B")
	}

	function c(a) {
		return decodeURIComponent(a)
	}

	function d(a) {
		var c = [];
		for (var d in a)a[d] !== null && typeof a[d] != "undefined" && c.push(b(d) + "=" + b(a[d]));
		return c.sort().join("&")
	}

	function e(a) {
		var b = {}, d, e, f, g;
		if (a) {
			d = a.split("&");
			for ( g = 0; f = d[g]; g++)
				e = f.split("="), e.length == 2 && (b[c(e[0])] = c(e[1]))
		}
		return b
	}

	a({
		decode : e,
		encode : d,
		encodePart : b,
		decodePart : c
	})
})
define("app/utils/params", ["module", "require", "exports", "app/utils/querystring"], function(module, require, exports) {
	var qs = require("app/utils/querystring"), fromQuery = function(a) {
		var b = a.search.substr(1);
		return qs.decode(b)
	}, fromFragment = function(a) {
		var b = a.href, c = b.indexOf("#"), d = c < 0 ? "" : b.substring(c + 1);
		return qs.decode(d)
	}, combined = function(a) {
		var b = {}, c = fromQuery(a), d = fromFragment(a);
		for (var e in c)c.hasOwnProperty(e) && (b[e] = c[e]);
		for (var e in d)d.hasOwnProperty(e) && (b[e] = d[e]);
		return b
	};
	module.exports = {
		combined : combined,
		fromQuery : fromQuery,
		fromFragment : fromFragment
	}
});
provide("app/utils/auth_token", function(a) {
	var b;
	a({
		get : function() {
			if (!b)
				throw new Error("authToken should have been set!");
			return b
		},
		set : function(a) {
			b = a
		},
		addTo : function(a, c) {
			return a.authenticity_token = b, c && (a.post_authenticity_token = b), a
		}
	})
})
define("app/data/scribe_transport", ["module", "require", "exports"], function(module, require, exports) {
	function ScribeTransport(a) {
		this.SESSION_BUFFER_KEY = "ScribeTransport", this.SCRIBE_API_ENDPOINT = "/i/jot", this.options = {}, a && (this.updateOptions(a), this.registerEventHandlers(a))
	}
	ScribeTransport.prototype = {
		flush : function(a, b) {
			if (!a || !a.length)
				return;
			b === undefined && ( b = !!this.options.sync), this.options.useAjax ? $.ajax({
				url : this.options.url,
				data : this.ajaxParams(a),
				type : "POST",
				async : !b
			}) : (new Image).src = this.options.url + "/?q=" + (+(new Date)).toString().slice(-4) + "&" + this.imageParams(a), this.reset()
		},
		ajaxParams : function(a) {
			if ( typeof a == "string")
				return {
					log : "[" + a + "]"
				};
			var b = this.options.encodeParameters;
			return b && typeof b == "function" ? b.apply(this, arguments) : {
				log : JSON.stringify(a)
			}
		},
		imageParams : function(a) {
			if ( typeof a == "string")
				return "log=%5B" + a + "%5D";
			var b = this.options.encodeParameters;
			return b && typeof b == "function" ? b.apply(this, arguments) : "log=" + encodeURIComponent(JSON.stringify(a))
		},
		reset : function() {
			this.options.bufferEvents && (this.skipUnloadFlush = !1, sessionStorage.removeItem(this.options.bufferKey))
		},
		getBuffer : function() {
			return sessionStorage.getItem(this.options.bufferKey) || ""
		},
		send : function(a, b, c) {
			if (!b || !a || this.options.bufferSize < 0)
				return;
			a._category_ = b;
			if (c || !this.options.bufferEvents || !this.options.bufferSize)
				this.flush([a], c);
			else {
				var d = JSON.stringify(a);
				this.options.useAjax || ( d = encodeURIComponent(d));
				var e = this.getBuffer(), f = e + ( e ? this.SEPARATOR + d : d);
				this.options.bufferSize && this.fullBuffer(f) ? this.options.useAjax ? this.flush(f) : (this.flush(e), sessionStorage.setItem(this.options.bufferKey, d)) : sessionStorage.setItem(this.options.bufferKey, f)
			}
			this.postToConsole(a), this.options.metrics && a.event_info != "debug" && $(document).trigger("debugscribe", a)
		},
		fullBuffer : function(a) {
			return a.length >= (this.options.useAjax ? this.options.bufferSize * 2083 : 2050 - this.options.url.length)
		},
		updateOptions : function(a) {
			this.options = $.extend({}, this.options, a), this.options.flushOnUnload === undefined && (this.options.flushOnUnload = !0), this.options.bufferKey || (this.options.bufferKey = this.SESSION_BUFFER_KEY), this.options.bufferSize === 0 && (this.options.bufferEvents = !1), this.options.useAjax === undefined && (this.options.useAjax = !0);
			if (this.options.bufferEvents || this.options.bufferEvents == undefined)
				try {
					sessionStorage.setItem(this.SESSION_BUFFER_KEY + ".init", "test");
					var b = sessionStorage.getItem(this.SESSION_BUFFER_KEY + ".init") == "test";
					sessionStorage.removeItem(this.SESSION_BUFFER_KEY + ".init"), this.options.bufferEvents = b
				} catch(c) {
					this.options.bufferEvents = !1
				}
			var d = window.location.protocol === "https:" ? "https:" : "http:";
			this.options.url === undefined ? this.options.useAjax ? this.options.url = this.SCRIBE_API_ENDPOINT : this.options.url = "https://twitter.com" + this.SCRIBE_API_ENDPOINT : this.options.url = this.options.url.replace(/^[a-z]+:/g, d).replace(/\/$/, ""), this.options.bufferEvents && this.options.bufferSize === undefined && (this.options.bufferSize = 20)
		},
		appHost : function() {
			return window.location.host
		},
		registerEventHandlers : function() {
			var a = this, b = $(document);
			if (this.options.bufferEvents) {
				b.on("flushscribe." + a.options.bufferKey, function(b) {
					a.flush(a.getBuffer(), !0)
				});
				if (this.options.flushOnUnload) {
					var c = function(b) {
						a.skipUnloadFlush = !b || !b.match(/http/) || !!b.match(new RegExp("^https?://" + a.appHost(), "gi")), a.skipUnloadFlush && window.setTimeout(function() {
							a.skipUnloadFlush = !1
						}, 3e3)
					};
					b.on("mouseup." + this.options.bufferKey, "a", function(a) {
						if (this.getAttribute("target") || a.button || a.metaKey || a.shiftKey || a.altKey || a.ctrlKey)
							return;
						c(this.getAttribute("href"))
					}), b.on("submit." + this.options.bufferKey, "form", function(a) {
						c(this.getAttribute("action"))
					}), b.on("uiNavigate." + this.options.bufferKey, function(a, b) {
						c(b.url)
					}), $(window).on("unload." + this.options.bufferKey, function() {
						a.skipUnloadFlush || a.flush(a.getBuffer(), !0), a.skipUnloadFlush = !1
					})
				}
			}
			this.options.debug && window.postMessage && $(document).keypress(function(a) {
				if (a.charCode == 205 && a.shiftKey && a.altKey) {
					var b = "menubar=no,toolbar=no,personalbar=no,location=no,resizable=yes,status=no,dependent=yes,height=600,width=600,screenX=100,screenY=100,scrollbars=yes", c = window.location.host;
					if (!c || !c.match(/^(staging[0-9]+\.[^\.]+\.twitter.com|twitter\.com|localhost\.twitter\.com\:[0-9]+)$/))
						c = "twitter.com";
					window.scribeConsole = window.open(window.location.protocol + "//" + c + "/scribe/console", "scribe_console", b)
				}
			}), this.SEPARATOR = this.options.useAjax ? "," : encodeURIComponent(",")
		},
		postToConsole : function(a) {
			if (this.options.debug && window.scribeConsole && window.scribeConsole.postMessage) {
				var b = window.location.protocol + "//" + window.location.host;
				try {
					window.scribeConsole.postMessage(a, b)
				} catch(c) {
					var d = "ScribeTransport.postToConsole - Scribe Console error or unserializable data [" + a._category_ + "]";
					console.error(d, a)
				}
			}
		},
		destroy : function() {
			this.flush(this.getBuffer()), $(document).off("flushscribe." + this.options.bufferKey), $(window).off("unload." + this.options.bufferKey), $(document).off("mouseup." + this.options.bufferKey), $(document).off("submit." + this.options.bufferKey), $(document).off("uiNavigate." + this.options.bufferKey)
		}
	}, module.exports = new ScribeTransport
});
define("app/data/client_event", ["module", "require", "exports", "app/data/scribe_transport"], function(module, require, exports) {
	function ClientEvent(a) {
		this.scribeContext = {}, this.scribeData = {}, this.scribe = function(b, c) {
			var d = a || window.scribeTransport;
			if (!d)
				throw new Error("You must create a global scribeTransport variable or pass one into this constructor.");
			if (!b || typeof b != "object" || c && typeof c != "object")
				throw new Error("Invalid terms or data hash argument when calling ClientEvent.scribe().");
			if (this.scribeContext) {
				var e = typeof this.scribeContext == "function" ? this.scribeContext() : this.scribeContext;
				b = $.extend({}, e, b)
			}
			for (var f in b)
			b[f] = b[f] && ("" + b[f]).toLowerCase().replace(/_?[^a-z0-9_]+_?/g, "_");
			d.options.debug && $.each(["client", "page", "section", "action"], function(a, c) {
				if (!b[c])
					throw new Error("You must specify a " + c + " term in your client_event.")
			});
			var c = $.extend({}, c);
			if (this.scribeData) {
				var g = typeof this.scribeData == "function" ? this.scribeData() : this.scribeData;
				c = $.extend({}, g, c)
			}
			c.event_namespace = b, c.triggered_on = c.triggered_on || +(new Date), c.format_version = 1, d.send(c, "client_event")
		}
	}

	var scribeTransport = require("app/data/scribe_transport");
	module.exports = new ClientEvent(scribeTransport)
});
define("app/data/with_scribe", ["module", "require", "exports", "app/data/client_event", "core/utils"], function(module, require, exports) {
	function withScribe() {
		function a(a) {
			if (!a)
				return;
			a = a.sourceEventData ? a.sourceEventData : a;
			if (a.scribeContext || a.scribeData)
				return a
		}
		this.scribe = function() {
			var b = Array.prototype.slice.call(arguments), c, d, e, f, g;
			c = typeof b[0] == "string" ? {
				action : b[0]
			} : b[0], b.shift();
			if (b[0]) {
				e = b[0], e.sourceEventData && ( e = e.sourceEventData);
				if (e.scribeContext || e.scribeData)
					f = e.scribeContext, g = e.scribeData;
				(b[0].scribeContext || b[0].scribeData || b[0].sourceEventData || b.length === 2) && b.shift()
			}
			c = utils.merge({}, f, c), d = typeof b[0] == "function" ? b[0].bind(this)(e) : b[0], d = utils.merge({
				format_version : 1,
				triggered_on : +(new Date)
			}, g, d), this.transport(c, d)
		}, this.scribeOnEvent = function(b, c, d) {
			this.on(b, function(a, b) {
				b = b || {}, this.scribe(c, b.sourceEventData || b, d)
			})
		}, this.transport = function(b, c) {
			clientEvent.scribe(b, c)
		}
	}

	var clientEvent = require("app/data/client_event"), utils = require("core/utils");
	module.exports = withScribe
});
define("app/data/with_auth_token", ["module", "require", "exports", "app/utils/auth_token", "core/utils"], function(module, require, exports) {
	function withAuthToken() {
		this.addAuthToken = function(b) {
			if (!authToken.get())
				throw "addAuthToken requires a formAuthenticityToken";
			return b = b || {}, utils.merge(b, {
				authenticity_token : authToken.get()
			})
		}, this.addPHXAuthToken = function(b) {
			if (!authToken.get())
				throw "addPHXAuthToken requires a formAuthenticityToken";
			return b = b || {}, utils.merge(b, {
				post_authenticity_token : authToken.get()
			})
		}, this.getAuthToken = function() {
			return this.attr.formAuthenticityToken
		}
	}

	var authToken = require("app/utils/auth_token"), utils = require("core/utils");
	module.exports = withAuthToken
});
define("app/utils/storage/core", ["module", "require", "exports", "core/compose", "core/advice"], function(module, require, exports) {
	function localStorage() {
		this.initialize = function(a) {
			this.namespace = a, this.prefix = ["__", this.namespace, "__:"].join(""), this.matcher = new RegExp("^" + this.prefix)
		}, this.getItem = function(a) {
			return this.decode(window.localStorage.getItem(this.prefix + a))
		}, this.setItem = function(a, b) {
			return window.localStorage.setItem(this.prefix + a, this.encode(b))
		}, this.removeItem = function(a) {
			return window.localStorage.removeItem(this.prefix + a)
		}, this.keys = function() {
			var a = [];
			for (var b = 0, c = window.localStorage.length, d; b < c; b++)
				d = window.localStorage.key(b), d.match(this.matcher) && a.push(d.replace(this.matcher, ""));
			return a
		}, this.clear = function() {
			this.keys().forEach(function(a) {
				this.removeItem(a)
			}, this)
		}, this.clearAll = function() {
			window.localStorage.clear()
		}
	}

	function userData() {
		function b(b, c) {
			var d = c.xmlDocument.documentElement;
			a[b] = {};
			while (d.firstChild)
			d.removeChild(d.firstChild);
			c.save(b)
		}

		function c(a) {
			return document.getElementById("__storage_" + a)
		}

		var a = {};
		this.initialize = function(b) {
			this.namespace = b, (this.dataStore = c(this.namespace)) || this.createStorageElement(), this.xmlDoc = this.dataStore.xmlDocument, this.xmlDocEl = this.xmlDoc.documentElement, a[this.namespace] = a[this.namespace] || {}
		}, this.createStorageElement = function() {
			this.dataStore = document.createElement("div"), this.dataStore.id = "__storage_" + this.namespace, this.dataStore.style.display = "none", document.appendChild(this.dataStore), this.dataStore.addBehavior("#default#userData"), this.dataStore.load(this.namespace)
		}, this.getNodeByKey = function(b) {
			var c = this.xmlDocEl.childNodes, d;
			if ( d = a[this.namespace][b])
				return d;
			for (var e = 0, f = c.length; e < f; e++) {
				d = c.item(e);
				if (d.getAttribute("key") == b)
					return a[this.namespace][b] = d, d
			}
			return null
		}, this.getItem = function(a) {
			var b = this.getNodeByKey(a), c = null;
			return b && ( c = b.getAttribute("value")), this.decode(c)
		}, this.setItem = function(b, c) {
			var d = this.getNodeByKey(b);
			return d ? d.setAttribute("value", this.encode(c)) : ( d = this.xmlDoc.createNode(1, "item", ""), d.setAttribute("key", b), d.setAttribute("value", this.encode(c)), this.xmlDocEl.appendChild(d), a[this.namespace][b] = d), this.dataStore.save(this.namespace), c
		}, this.removeItem = function(b) {
			var c = this.getNodeByKey(b);
			c && (this.xmlDocEl.removeChild(c),
			delete a[this.namespace][b]), this.dataStore.save(this.namespace)
		}, this.keys = function() {
			var a = this.xmlDocEl.childNodes.length, b = [];
			for (var c = 0; c < a; c++)
				b.push(this.xmlDocEl.childNodes[c].getAttribute("key"));
			return b
		}, this.clear = function() {
			b(this.namespace, this.dataStore)
		}, this.clearAll = function() {
			for (var d in a)b(d, c(d)), a[d] = {}
		}
	}

	function noStorage() {
		this.initialize = $.noop, this.getNodeByKey = function(a) {
			return null
		}, this.getItem = function(a) {
			return null
		}, this.setItem = function(a, b) {
			return b
		}, this.removeItem = function(a) {
			return null
		}, this.keys = function() {
			return []
		}, this.clear = $.noop, this.clearAll = $.noop
	}

	function memory() {
		this.initialize = function(a) {
			this.namespace = a, memoryStore[this.namespace] || (memoryStore[this.namespace] = {}), this.store = memoryStore[this.namespace]
		}, this.getItem = function(a) {
			return this.store[a] ? this.decode(this.store[a]) : undefined
		}, this.setItem = function(a, b) {
			return this.store[a] = this.encode(b)
		}, this.removeItem = function(a) {
			delete this.store[a]
		}, this.keys = function() {
			return Object.keys(this.store)
		}, this.clear = function() {
			this.store = memoryStore[this.namespace] = {}
		}, this.clearAll = function() {
			memoryStore = {}
		}
	}

	function browserStore() {
		supportsLocalStorage() ? localStorage.call(this) : document.documentElement.addBehavior ? noStorage.call(this) : memory.call(this)
	}

	function supportsLocalStorage() {
		if (doesLocalStorage === undefined)
			try {
				window.localStorage.setItem("~~~~", 1), window.localStorage.removeItem("~~~~"), doesLocalStorage = !0
			} catch(a) {
				doesLocalStorage = !1
			}
		return doesLocalStorage
	}

	function encoding() {
		this.encode = function(a) {
			return a === undefined && ( a = null), JSON.stringify(a)
		}, this.decode = function(a) {
			return JSON.parse(a)
		}
	}

	function CoreStorage() {
		arguments.length && this.initialize.apply(this, arguments)
	}

	var compose = require("core/compose"), advice = require("core/advice"), memoryStore = {}, doesLocalStorage;
	compose.mixin(CoreStorage.prototype, [encoding, browserStore, advice.withAdvice]), CoreStorage.clearAll = CoreStorage.prototype.clearAll, module.exports = CoreStorage
});
deferred('$lib/gibberish-aes.js', function() {
	/*! Gibberish-AES (c) 2008 Mark Percival https://github.com/mdp/gibberish-aes License: MIT */
	(function(a) {
		var b = function() {
			var a = 14, c = 8, d = !1, e = function(a) {
				try {
					return unescape(encodeURIComponent(a))
				} catch(b) {
					throw "Error on UTF-8 encode"
				}
			}, f = function(a) {
				try {
					return decodeURIComponent(escape(a))
				} catch(b) {
					throw "Bad Key"
				}
			}, g = function(a) {
				var b = [], c, d;
				a.length < 16 && ( c = 16 - a.length, b = [c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c]);
				for ( d = 0; d < a.length; d++)
					b[d] = a[d];
				return b
			}, h = function(a, b) {
				var c = "", d, e;
				if (b) {
					d = a[15];
					if (d > 16)
						throw "Decryption error: Maybe bad key";
					if (d == 16)
						return "";
					for ( e = 0; e < 16 - d; e++)
						c += String.fromCharCode(a[e])
				} else
					for ( e = 0; e < 16; e++)
						c += String.fromCharCode(a[e]);
				return c
			}, i = function(a) {
				var b = "", c;
				for ( c = 0; c < a.length; c++)
					b += (a[c] < 16 ? "0" : "") + a[c].toString(16);
				return b
			}, j = function(a) {
				var b = [];
				return a.replace(/(..)/g, function(a) {
					b.push(parseInt(a, 16))
				}), b
			}, k = function(a) {
				a = e(a);
				var b = [], c;
				for ( c = 0; c < a.length; c++)
					b[c] = a.charCodeAt(c);
				return b
			}, l = function(b) {
				switch(b) {
					case 128:
						a = 10, c = 4;
						break;
					case 192:
						a = 12, c = 6;
						break;
					case 256:
						a = 14, c = 8;
						break;
					default:
						throw "Invalid Key Size Specified:" + b
				}
			}, m = function(a) {
				var b = [], c;
				for ( c = 0; c < a; c++)
					b = b.concat(Math.floor(Math.random() * 256));
				return b
			}, n = function(d, e) {
				var f = a >= 12 ? 3 : 2, g = [], h = [], i = [], j = [], k = d.concat(e), l;
				i[0] = b.Hash.MD5(k), j = i[0];
				for ( l = 1; l < f; l++)
					i[l] = b.Hash.MD5(i[l - 1].concat(k)), j = j.concat(i[l]);
				return g = j.slice(0, 4 * c), h = j.slice(4 * c, 4 * c + 16), {
					key : g,
					iv : h
				}
			}, o = function(a, b, c) {
				b = x(b);
				var d = Math.ceil(a.length / 16), e = [], f, h = [];
				for ( f = 0; f < d; f++)
					e[f] = g(a.slice(f * 16, f * 16 + 16));
				a.length % 16 === 0 && (e.push([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]), d++);
				for ( f = 0; f < e.length; f++)
					e[f] = f === 0 ? w(e[f], c) : w(e[f], h[f - 1]), h[f] = q(e[f], b);
				return h
			}, p = function(a, b, c, d) {
				b = x(b);
				var e = a.length / 16, g = [], i, j = [], k = "";
				for ( i = 0; i < e; i++)
					g.push(a.slice(i * 16, (i + 1) * 16));
				for ( i = g.length - 1; i >= 0; i--)
					j[i] = r(g[i], b), j[i] = i === 0 ? w(j[i], c) : w(j[i], g[i - 1]);
				for ( i = 0; i < e - 1; i++)
					k += h(j[i]);
				return k += h(j[i], !0), d ? k : f(k)
			}, q = function(b, c) {
				d = !1;
				var e = v(b, c, 0), f;
				for ( f = 1; f < a + 1; f++)
					e = s(e), e = t(e), f < a && ( e = u(e)), e = v(e, c, f);
				return e
			}, r = function(b, c) {
				d = !0;
				var e = v(b, c, a), f;
				for ( f = a - 1; f > -1; f--)
					e = t(e), e = s(e), e = v(e, c, f), f > 0 && ( e = u(e));
				return e
			}, s = function(a) {
				var b = d ? B : A, c = [], e;
				for ( e = 0; e < 16; e++)
					c[e] = b[a[e]];
				return c
			}, t = function(a) {
				var b = [], c = d ? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3] : [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11], e;
				for ( e = 0; e < 16; e++)
					b[e] = a[c[e]];
				return b
			}, u = function(a) {
				var b = [], c;
				if (!d)
					for ( c = 0; c < 4; c++)
						b[c * 4] = D[a[c * 4]] ^ E[a[1 + c * 4]] ^ a[2 + c * 4] ^ a[3 + c * 4], b[1 + c * 4] = a[c * 4] ^ D[a[1 + c * 4]] ^ E[a[2 + c * 4]] ^ a[3 + c * 4], b[2 + c * 4] = a[c * 4] ^ a[1 + c * 4] ^ D[a[2 + c * 4]] ^ E[a[3 + c * 4]], b[3 + c * 4] = E[a[c * 4]] ^ a[1 + c * 4] ^ a[2 + c * 4] ^ D[a[3 + c * 4]];
				else
					for ( c = 0; c < 4; c++)
						b[c * 4] = I[a[c * 4]] ^ G[a[1 + c * 4]] ^ H[a[2 + c * 4]] ^ F[a[3 + c * 4]], b[1 + c * 4] = F[a[c * 4]] ^ I[a[1 + c * 4]] ^ G[a[2 + c * 4]] ^ H[a[3 + c * 4]], b[2 + c * 4] = H[a[c * 4]] ^ F[a[1 + c * 4]] ^ I[a[2 + c * 4]] ^ G[a[3 + c * 4]], b[3 + c * 4] = G[a[c * 4]] ^ H[a[1 + c * 4]] ^ F[a[2 + c * 4]] ^ I[a[3 + c * 4]];
				return b
			}, v = function(a, b, c) {
				var d = [], e;
				for ( e = 0; e < 16; e++)
					d[e] = a[e] ^ b[c][e];
				return d
			}, w = function(a, b) {
				var c = [], d;
				for ( d = 0; d < 16; d++)
					c[d] = a[d] ^ b[d];
				return c
			}, x = function(b) {
				var d = [], e = [], f, g, h, i = [], j;
				for ( f = 0; f < c; f++)
					g = [b[4 * f], b[4 * f + 1], b[4 * f + 2], b[4 * f + 3]], d[f] = g;
				for ( f = c; f < 4 * (a + 1); f++) {
					d[f] = [];
					for ( h = 0; h < 4; h++)
						e[h] = d[f-1][h];
					f % c === 0 ? ( e = y(z(e)), e[0] ^=C[f / c - 1]) : c > 6 && f % c == 4 && ( e = y(e));
					for ( h = 0; h < 4; h++)
						d[f][h] = d[f-c][h] ^ e[h]
				}
				for ( f = 0; f < a + 1; f++) {
					i[f] = [];
					for ( j = 0; j < 4; j++)
						i[f].push(d[f*4+j][0], d[f*4+j][1], d[f*4+j][2], d[f*4+j][3])
				}
				return i
			}, y = function(a) {
				for (var b = 0; b < 4; b++)
					a[b] = A[a[b]];
				return a
			}, z = function(a) {
				var b = a[0], c;
				for ( c = 0; c < 4; c++)
					a[c] = a[c + 1];
				return a[3] = b, a
			}, A = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], B = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125], C = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145], D = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 27, 25, 31, 29, 19, 17, 23, 21, 11, 9, 15, 13, 3, 1, 7, 5, 59, 57, 63, 61, 51, 49, 55, 53, 43, 41, 47, 45, 35, 33, 39, 37, 91, 89, 95, 93, 83, 81, 87, 85, 75, 73, 79, 77, 67, 65, 71, 69, 123, 121, 127, 125, 115, 113, 119, 117, 107, 105, 111, 109, 99, 97, 103, 101, 155, 153, 159, 157, 147, 145, 151, 149, 139, 137, 143, 141, 131, 129, 135, 133, 187, 185, 191, 189, 179, 177, 183, 181, 171, 169, 175, 173, 163, 161, 167, 165, 219, 217, 223, 221, 211, 209, 215, 213, 203, 201, 207, 205, 195, 193, 199, 197, 251, 249, 255, 253, 243, 241, 247, 245, 235, 233, 239, 237, 227, 225, 231, 229], E = [0, 3, 6, 5, 12, 15, 10, 9, 24, 27, 30, 29, 20, 23, 18, 17, 48, 51, 54, 53, 60, 63, 58, 57, 40, 43, 46, 45, 36, 39, 34, 33, 96, 99, 102, 101, 108, 111, 106, 105, 120, 123, 126, 125, 116, 119, 114, 113, 80, 83, 86, 85, 92, 95, 90, 89, 72, 75, 78, 77, 68, 71, 66, 65, 192, 195, 198, 197, 204, 207, 202, 201, 216, 219, 222, 221, 212, 215, 210, 209, 240, 243, 246, 245, 252, 255, 250, 249, 232, 235, 238, 237, 228, 231, 226, 225, 160, 163, 166, 165, 172, 175, 170, 169, 184, 187, 190, 189, 180, 183, 178, 177, 144, 147, 150, 149, 156, 159, 154, 153, 136, 139, 142, 141, 132, 135, 130, 129, 155, 152, 157, 158, 151, 148, 145, 146, 131, 128, 133, 134, 143, 140, 137, 138, 171, 168, 173, 174, 167, 164, 161, 162, 179, 176, 181, 182, 191, 188, 185, 186, 251, 248, 253, 254, 247, 244, 241, 242, 227, 224, 229, 230, 239, 236, 233, 234, 203, 200, 205, 206, 199, 196, 193, 194, 211, 208, 213, 214, 223, 220, 217, 218, 91, 88, 93, 94, 87, 84, 81, 82, 67, 64, 69, 70, 79, 76, 73, 74, 107, 104, 109, 110, 103, 100, 97, 98, 115, 112, 117, 118, 127, 124, 121, 122, 59, 56, 61, 62, 55, 52, 49, 50, 35, 32, 37, 38, 47, 44, 41, 42, 11, 8, 13, 14, 7, 4, 1, 2, 19, 16, 21, 22, 31, 28, 25, 26], F = [0, 9, 18, 27, 36, 45, 54, 63, 72, 65, 90, 83, 108, 101, 126, 119, 144, 153, 130, 139, 180, 189, 166, 175, 216, 209, 202, 195, 252, 245, 238, 231, 59, 50, 41, 32, 31, 22, 13, 4, 115, 122, 97, 104, 87, 94, 69, 76, 171, 162, 185, 176, 143, 134, 157, 148, 227, 234, 241, 248, 199, 206, 213, 220, 118, 127, 100, 109, 82, 91, 64, 73, 62, 55, 44, 37, 26, 19, 8, 1, 230, 239, 244, 253, 194, 203, 208, 217, 174, 167, 188, 181, 138, 131, 152, 145, 77, 68, 95, 86, 105, 96, 123, 114, 5, 12, 23, 30, 33, 40, 51, 58, 221, 212, 207, 198, 249, 240, 235, 226, 149, 156, 135, 142, 177, 184, 163, 170, 236, 229, 254, 247, 200, 193, 218, 211, 164, 173, 182, 191, 128, 137, 146, 155, 124, 117, 110, 103, 88, 81, 74, 67, 52, 61, 38, 47, 16, 25, 2, 11, 215, 222, 197, 204, 243, 250, 225, 232, 159, 150, 141, 132, 187, 178, 169, 160, 71, 78, 85, 92, 99, 106, 113, 120, 15, 6, 29, 20, 43, 34, 57, 48, 154, 147, 136, 129, 190, 183, 172, 165, 210, 219, 192, 201, 246, 255, 228, 237, 10, 3, 24, 17, 46, 39, 60, 53, 66, 75, 80, 89, 102, 111, 116, 125, 161, 168, 179, 186, 133, 140, 151, 158, 233, 224, 251, 242, 205, 196, 223, 214, 49, 56, 35, 42, 21, 28, 7, 14, 121, 112, 107, 98, 93, 84, 79, 70], G = [0, 11, 22, 29, 44, 39, 58, 49, 88, 83, 78, 69, 116, 127, 98, 105, 176, 187, 166, 173, 156, 151, 138, 129, 232, 227, 254, 245, 196, 207, 210, 217, 123, 112, 109, 102, 87, 92, 65, 74, 35, 40, 53, 62, 15, 4, 25, 18, 203, 192, 221, 214, 231, 236, 241, 250, 147, 152, 133, 142, 191, 180, 169, 162, 246, 253, 224, 235, 218, 209, 204, 199, 174, 165, 184, 179, 130, 137, 148, 159, 70, 77, 80, 91, 106, 97, 124, 119, 30, 21, 8, 3, 50, 57, 36, 47, 141, 134, 155, 144, 161, 170, 183, 188, 213, 222, 195, 200, 249, 242, 239, 228, 61, 54, 43, 32, 17, 26, 7, 12, 101, 110, 115, 120, 73, 66, 95, 84, 247, 252, 225, 234, 219, 208, 205, 198, 175, 164, 185, 178, 131, 136, 149, 158, 71, 76, 81, 90, 107, 96, 125, 118, 31, 20, 9, 2, 51, 56, 37, 46, 140, 135, 154, 145, 160, 171, 182, 189, 212, 223, 194, 201, 248, 243, 238, 229, 60, 55, 42, 33, 16, 27, 6, 13, 100, 111, 114, 121, 72, 67, 94, 85, 1, 10, 23, 28, 45, 38, 59, 48, 89, 82, 79, 68, 117, 126, 99, 104, 177, 186, 167, 172, 157, 150, 139, 128, 233, 226, 255, 244, 197, 206, 211, 216, 122, 113, 108, 103, 86, 93, 64, 75, 34, 41, 52, 63, 14, 5, 24, 19, 202, 193, 220, 215, 230, 237, 240, 251, 146, 153, 132, 143, 190, 181, 168, 163], H = [0, 13, 26, 23, 52, 57, 46, 35, 104, 101, 114, 127, 92, 81, 70, 75, 208, 221, 202, 199, 228, 233, 254, 243, 184, 181, 162, 175, 140, 129, 150, 155, 187, 182, 161, 172, 143, 130, 149, 152, 211, 222, 201, 196, 231, 234, 253, 240, 107, 102, 113, 124, 95, 82, 69, 72, 3, 14, 25, 20, 55, 58, 45, 32, 109, 96, 119, 122, 89, 84, 67, 78, 5, 8, 31, 18, 49, 60, 43, 38, 189, 176, 167, 170, 137, 132, 147, 158, 213, 216, 207, 194, 225, 236, 251, 246, 214, 219, 204, 193, 226, 239, 248, 245, 190, 179, 164, 169, 138, 135, 144, 157, 6, 11, 28, 17, 50, 63, 40, 37, 110, 99, 116, 121, 90, 87, 64, 77, 218, 215, 192, 205, 238, 227, 244, 249, 178, 191, 168, 165, 134, 139, 156, 145, 10, 7, 16, 29, 62, 51, 36, 41, 98, 111, 120, 117, 86, 91, 76, 65, 97, 108, 123, 118, 85, 88, 79, 66, 9, 4, 19, 30, 61, 48, 39, 42, 177, 188, 171, 166, 133, 136, 159, 146, 217, 212, 195, 206, 237, 224, 247, 250, 183, 186, 173, 160, 131, 142, 153, 148, 223, 210, 197, 200, 235, 230, 241, 252, 103, 106, 125, 112, 83, 94, 73, 68, 15, 2, 21, 24, 59, 54, 33, 44, 12, 1, 22, 27, 56, 53, 34, 47, 100, 105, 126, 115, 80, 93, 74, 71, 220, 209, 198, 203, 232, 229, 242, 255, 180, 185, 174, 163, 128, 141, 154, 151], I = [0, 14, 28, 18, 56, 54, 36, 42, 112, 126, 108, 98, 72, 70, 84, 90, 224, 238, 252, 242, 216, 214, 196, 202, 144, 158, 140, 130, 168, 166, 180, 186, 219, 213, 199, 201, 227, 237, 255, 241, 171, 165, 183, 185, 147, 157, 143, 129, 59, 53, 39, 41, 3, 13, 31, 17, 75, 69, 87, 89, 115, 125, 111, 97, 173, 163, 177, 191, 149, 155, 137, 135, 221, 211, 193, 207, 229, 235, 249, 247, 77, 67, 81, 95, 117, 123, 105, 103, 61, 51, 33, 47, 5, 11, 25, 23, 118, 120, 106, 100, 78, 64, 82, 92, 6, 8, 26, 20, 62, 48, 34, 44, 150, 152, 138, 132, 174, 160, 178, 188, 230, 232, 250, 244, 222, 208, 194, 204, 65, 79, 93, 83, 121, 119, 101, 107, 49, 63, 45, 35, 9, 7, 21, 27, 161, 175, 189, 179, 153, 151, 133, 139, 209, 223, 205, 195, 233, 231, 245, 251, 154, 148, 134, 136, 162, 172, 190, 176, 234, 228, 246, 248, 210, 220, 206, 192, 122, 116, 102, 104, 66, 76, 94, 80, 10, 4, 22, 24, 50, 60, 46, 32, 236, 226, 240, 254, 212, 218, 200, 198, 156, 146, 128, 142, 164, 170, 184, 182, 12, 2, 16, 30, 52, 58, 40, 38, 124, 114, 96, 110, 68, 74, 88, 86, 55, 57, 43, 37, 15, 1, 19, 29, 71, 73, 91, 85, 127, 113, 99, 109, 215, 217, 203, 197, 239, 225, 243, 253, 167, 169, 187, 181, 159, 145, 131, 141], J = function(a, b, c) {
				var d = m(8), e = n(k(b), d), f = e.key, g = e.iv, h, i = [[83, 97, 108, 116, 101, 100, 95, 95].concat(d)];
				return c || ( a = k(a)), h = o(a, f, g), h = i.concat(h), M.encode(h)
			}, K = function(a, b, c) {
				var d = M.decode(a), e = d.slice(8, 16), f = n(k(b), e), g = f.key, h = f.iv;
				return d = d.slice(16, d.length), a = p(d, g, h, c), a
			}, L = function(a) {
				function b(a, b) {
					return a << b | a >>> 32 - b
				}

				function c(a, b) {
					var c, d, e, f, g;
					return e = a & 2147483648, f = b & 2147483648, c = a & 1073741824, d = b & 1073741824, g = (a & 1073741823) + (b & 1073741823), c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
				}

				function d(a, b, c) {
					return a & b | ~a & c
				}

				function e(a, b, c) {
					return a & c | b & ~c
				}

				function f(a, b, c) {
					return a ^ b ^ c
				}

				function g(a, b, c) {
					return b ^ (a | ~c)
				}

				function h(a, e, f, g, h, i, j) {
					return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
				}

				function i(a, d, f, g, h, i, j) {
					return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
				}

				function j(a, d, e, g, h, i, j) {
					return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
				}

				function k(a, d, e, f, h, i, j) {
					return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
				}

				function l(a) {
					var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = (e + 1) * 16, g = [], h = 0, i = 0;
					while (i < c) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a[i] << h, i++;
					return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
				}

				function m(a) {
					var b, c, d = [];
					for ( c = 0; c <= 3; c++)
						b = a >>> c * 8 & 255, d = d.concat(b);
					return d
				}

				var n = [], o, p, q, r, s, t, u, v, w, x = 7, y = 12, z = 17, A = 22, B = 5, C = 9, D = 14, E = 20, F = 4, G = 11, H = 16, I = 23, J = 6, K = 10, L = 15, M = 21;
				n = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878;
				for ( o = 0; o < n.length; o += 16)
					p = t, q = u, r = v, s = w, t = h(t, u, v, w, n[o + 0], x, 3614090360), w = h(w, t, u, v, n[o + 1], y, 3905402710), v = h(v, w, t, u, n[o + 2], z, 606105819), u = h(u, v, w, t, n[o + 3], A, 3250441966), t = h(t, u, v, w, n[o + 4], x, 4118548399), w = h(w, t, u, v, n[o + 5], y, 1200080426), v = h(v, w, t, u, n[o + 6], z, 2821735955), u = h(u, v, w, t, n[o + 7], A, 4249261313), t = h(t, u, v, w, n[o + 8], x, 1770035416), w = h(w, t, u, v, n[o + 9], y, 2336552879), v = h(v, w, t, u, n[o + 10], z, 4294925233), u = h(u, v, w, t, n[o + 11], A, 2304563134), t = h(t, u, v, w, n[o + 12], x, 1804603682), w = h(w, t, u, v, n[o + 13], y, 4254626195), v = h(v, w, t, u, n[o + 14], z, 2792965006), u = h(u, v, w, t, n[o + 15], A, 1236535329), t = i(t, u, v, w, n[o + 1], B, 4129170786), w = i(w, t, u, v, n[o + 6], C, 3225465664), v = i(v, w, t, u, n[o + 11], D, 643717713), u = i(u, v, w, t, n[o + 0], E, 3921069994), t = i(t, u, v, w, n[o + 5], B, 3593408605), w = i(w, t, u, v, n[o + 10], C, 38016083), v = i(v, w, t, u, n[o + 15], D, 3634488961), u = i(u, v, w, t, n[o + 4], E, 3889429448), t = i(t, u, v, w, n[o + 9], B, 568446438), w = i(w, t, u, v, n[o + 14], C, 3275163606), v = i(v, w, t, u, n[o + 3], D, 4107603335), u = i(u, v, w, t, n[o + 8], E, 1163531501), t = i(t, u, v, w, n[o + 13], B, 2850285829), w = i(w, t, u, v, n[o + 2], C, 4243563512), v = i(v, w, t, u, n[o + 7], D, 1735328473), u = i(u, v, w, t, n[o + 12], E, 2368359562), t = j(t, u, v, w, n[o + 5], F, 4294588738), w = j(w, t, u, v, n[o + 8], G, 2272392833), v = j(v, w, t, u, n[o + 11], H, 1839030562), u = j(u, v, w, t, n[o + 14], I, 4259657740), t = j(t, u, v, w, n[o + 1], F, 2763975236), w = j(w, t, u, v, n[o + 4], G, 1272893353), v = j(v, w, t, u, n[o + 7], H, 4139469664), u = j(u, v, w, t, n[o + 10], I, 3200236656), t = j(t, u, v, w, n[o + 13], F, 681279174), w = j(w, t, u, v, n[o + 0], G, 3936430074), v = j(v, w, t, u, n[o + 3], H, 3572445317), u = j(u, v, w, t, n[o + 6], I, 76029189), t = j(t, u, v, w, n[o + 9], F, 3654602809), w = j(w, t, u, v, n[o + 12], G, 3873151461), v = j(v, w, t, u, n[o + 15], H, 530742520), u = j(u, v, w, t, n[o + 2], I, 3299628645), t = k(t, u, v, w, n[o + 0], J, 4096336452), w = k(w, t, u, v, n[o + 7], K, 1126891415), v = k(v, w, t, u, n[o + 14], L, 2878612391), u = k(u, v, w, t, n[o + 5], M, 4237533241), t = k(t, u, v, w, n[o + 12], J, 1700485571), w = k(w, t, u, v, n[o + 3], K, 2399980690), v = k(v, w, t, u, n[o + 10], L, 4293915773), u = k(u, v, w, t, n[o + 1], M, 2240044497), t = k(t, u, v, w, n[o + 8], J, 1873313359), w = k(w, t, u, v, n[o + 15], K, 4264355552), v = k(v, w, t, u, n[o + 6], L, 2734768916), u = k(u, v, w, t, n[o + 13], M, 1309151649), t = k(t, u, v, w, n[o + 4], J, 4149444226), w = k(w, t, u, v, n[o + 11], K, 3174756917), v = k(v, w, t, u, n[o + 2], L, 718787259), u = k(u, v, w, t, n[o + 9], M, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
				return m(t).concat(m(u), m(v), m(w))
			}, M = function() {
				var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b = a.split(""), c = function(a, c) {
					var d = [], e = "", f, g;
					totalChunks = Math.floor(a.length * 16 / 3);
					for ( f = 0; f < a.length * 16; f++)
						d.push(a[Math.floor(f/16)][f % 16]);
					for ( f = 0; f < d.length; f += 3)
						e += b[d[f] >> 2], e += b[(d[f] & 3) << 4 | d[f + 1] >> 4], d[f + 1] !== undefined ? e += b[(d[f + 1] & 15) << 2 | d[f + 2] >> 6] : e += "=", d[f + 2] !== undefined ? e += b[d[f + 2] & 63] : e += "=";
					g = e.slice(0, 64) + "\n";
					for ( f = 1; f < Math.ceil(e.length / 64); f++)
						g += e.slice(f * 64, f * 64 + 64) + (Math.ceil(e.length / 64) == f + 1 ? "" : "\n");
					return g
				}, d = function(b) {
					b = b.replace(/\n/g, "");
					var c = [], d = [], e = [], f;
					for ( f = 0; f < b.length; f += 4)
						d[0] = a.indexOf(b.charAt(f)), d[1] = a.indexOf(b.charAt(f + 1)), d[2] = a.indexOf(b.charAt(f + 2)), d[3] = a.indexOf(b.charAt(f + 3)), e[0] = d[0] << 2 | d[1] >> 4, e[1] = (d[1] & 15) << 4 | d[2] >> 2, e[2] = (d[2] & 3) << 6 | d[3], c.push(e[0], e[1], e[2]);
					return c = c.slice(0, c.length - c.length % 16), c
				};
				return typeof Array.indexOf == "function" && ( a = b), {
					encode : c,
					decode : d
				}
			}();
			return {
				size : l,
				h2a : j,
				expandKey : x,
				encryptBlock : q,
				decryptBlock : r,
				Decrypt : d,
				s2a : k,
				rawEncrypt : o,
				dec : K,
				openSSLKey : n,
				a2h : i,
				enc : J,
				Hash : {
					MD5 : L
				},
				Base64 : M
			}
		}();
		a.GibberishAES = b
	})(window)
});
provide("app/utils/crypto/aes", function(a) {
	using("$lib/gibberish-aes.js", function() {
		var b = GibberishAES;
		window.GibberishAES = null, a(b)
	})
})
define("app/utils/storage/with_crypto", ["module", "require", "exports", "app/utils/crypto/aes"], function(module, require, exports) {
	function withCrypto() {
		this.after("initialize", function(a, b) {
			this.secret = b
		}), this.around("getItem", function(a, b) {
			try {
				return a(b)
			} catch(c) {
				return this.removeItem(b), null
			}
		}), this.around("decode", function(a, b) {
			return a(aes.dec(b, this.secret))
		}), this.around("encode", function(a, b) {
			return aes.enc(a(b), this.secret)
		})
	}

	var aes = require("app/utils/crypto/aes");
	module.exports = withCrypto
});
define("app/utils/storage/with_expiry", ["module", "require", "exports", "app/utils/storage/core"], function(module, require, exports) {
	function withExpiry() {
		this.now = function() {
			return (new Date).getTime()
		}, this.isExpired = function(a) {
			var b = this.ttl.getItem(a);
			return typeof b == "number" && this.now() > b ? !0 : !1
		}, this.updateTTL = function(a, b) {
			typeof b == "number" && this.ttl.setItem(a, this.now() + b)
		}, this.getCacheAge = function(a, b) {
			var c = this.ttl.getItem(a);
			if (c == null)
				return -1;
			var d = c - b, e = this.now() - d;
			return e < 0 ? -1 : Math.floor(e / 36e5)
		}, this.after("initialize", function() {
			this.ttl = new Storage(this.namespace + "_ttl")
		}), this.around("setItem", function(a, b, c, d) {
			return typeof d == "number" ? this.ttl.setItem(b, this.now() + d) : this.ttl.removeItem(b), a(b, c)
		}), this.around("getItem", function(a, b) {
			var c = this.ttl.getItem(b);
			return typeof c == "number" && this.now() > c && this.removeItem(b), a(b)
		}), this.after("removeItem", function(a) {
			this.ttl.removeItem(a)
		}), this.after("clear", function() {
			this.ttl.clear()
		})
	}

	var Storage = require("app/utils/storage/core");
	module.exports = withExpiry
});
define("app/utils/storage/array/with_array", ["module", "require", "exports"], function(module, require, exports) {
	function withArray() {
		this.getArray = function(a) {
			return this.getItem(a) || []
		}, this.push = function(a, b) {
			var c = this.getArray(a), d = c.push(b);
			return this.setItem(a, c), d
		}, this.pushAll = function(a, b) {
			var c = this.getArray(a);
			return c.push.apply(c, b), this.setItem(a, c), c
		}
	}
	module.exports = withArray
});
define("app/utils/storage/array/with_max_elements", ["module", "require", "exports", "core/compose", "app/utils/storage/array/with_array"], function(module, require, exports) {
	function withMaxElements() {
		compose.mixin(this, [withArray]), this.maxElements = {}, this.getMaxElements = function(a) {
			return this.maxElements[a] || 0
		}, this.setMaxElements = function(a, b) {
			this.maxElements[a] = b
		}, this.before("push", function(a, b) {
			this.makeRoomFor(a, 1)
		}), this.around("pushAll", function(a, b, c) {
			return c = c || [], this.makeRoomFor(b, c.length), a(b, c.slice(Math.max(0, c.length - this.getMaxElements(b))))
		}), this.makeRoomFor = function(a, b) {
			var c = this.getArray(a), d = c.length + b - this.getMaxElements(a);
			d > 0 && (c.splice(0, d), this.setItem(a, c))
		}
	}

	var compose = require("core/compose"), withArray = require("app/utils/storage/array/with_array");
	module.exports = withMaxElements
});
define("app/utils/storage/array/with_unique_elements", ["module", "require", "exports", "core/compose", "app/utils/storage/array/with_array"], function(module, require, exports) {
	function withUniqueElements() {
		compose.mixin(this, [withArray]), this.before("push", function(a, b) {
			var c = this.getArray(a);
			this.deleteElement(c, b) && this.setItem(a, c)
		}), this.around("pushAll", function(a, b, c) {
			c = c || [];
			var d = this.getArray(b), e = !1, f = [], g = {};
			return c.forEach(function(a) {
				g[a] || ( e = this.deleteElement(d, a) || e, g[a] = !0, f.push(a))
			}, this), e && this.setItem(b, d), a(b, f)
		}), this.deleteElement = function(a, b) {
			var c = -1;
			return ( c = a.indexOf(b)) >= 0 ? (a.splice(c, 1), !0) : !1
		}
	}

	var compose = require("core/compose"), withArray = require("app/utils/storage/array/with_array");
	module.exports = withUniqueElements
});
define("app/utils/storage/custom", ["module", "require", "exports", "core/compose", "app/utils/storage/core", "app/utils/storage/with_crypto", "app/utils/storage/with_expiry", "app/utils/storage/array/with_array", "app/utils/storage/array/with_max_elements", "app/utils/storage/array/with_unique_elements"], function(module, require, exports) {
	function storageConstr(a) {
		var b = Object.keys(a).filter(function(b) {
			return a[b]
		}).sort().join(","), c;
		if ( c = lookup[b])
			return c;
		c = function() {
			CoreStorage.apply(this, arguments)
		}, c.prototype = new CoreStorage;
		var d = [];
		return a.withCrypto && d.push(withCrypto), a.withExpiry && d.push(withExpiry), a.withArray && d.push(withArray), a.withUniqueElements && d.push(withUniqueElements), a.withMaxElements && d.push(withMaxElements), d.length > 0 && compose.mixin(c.prototype, d), lookup[b] = c, c
	}

	var compose = require("core/compose"), CoreStorage = require("app/utils/storage/core"), withCrypto = require("app/utils/storage/with_crypto"), withExpiry = require("app/utils/storage/with_expiry"), withArray = require("app/utils/storage/array/with_array"), withMaxElements = require("app/utils/storage/array/with_max_elements"), withUniqueElements = require("app/utils/storage/array/with_unique_elements"), lookup = {};
	module.exports = storageConstr
});
define("app/data/with_data", ["module", "require", "exports", "core/compose", "core/i18n", "app/data/with_auth_token", "app/utils/storage/custom"], function(module, require, exports) {
	function withData() {
		compose.mixin(this, [withAuthToken]);
		var a = [];
		this.composeData = function(a, b) {
			return a = a || {}, b.eventData && (a.sourceEventData = b.eventData), a
		}, this.callSuccessHandler = function(a, b, c) {
			typeof a == "function" ? a(b) : this.trigger(a, b)
		}, this.callErrorHandler = function(a, b, c) {
			typeof a == "function" ? a(b) : this.trigger(a, b)
		}, this.createSuccessHandler = function(b, c) {
			return function(d, e, f) {
				a.slice(a.indexOf(f), 1), d = this.composeData(d, c), c.cache_ttl && storage.setItem(encodeURIComponent(c.url), {
					data : d,
					time : (new Date).getTime()
				}, c.cache_ttl), this.callSuccessHandler(b, d, c), d.debug && this.trigger("dataSetDebugData", d.debug)
			}.bind(this)
		}, this.createErrorHandler = function(b, c) {
			return function(d) {
				a.slice(a.indexOf(d), 1);
				var e;
				try {
					e = JSON.parse(d.responseText), e && e.message && !this.attr.noShowError && this.trigger("uiShowError", e)
				} catch(f) {
					e = {
						xhr : {}
					}, d && d.statusText && (e.xhr.statusText = d.statusText)
				}
				e.message || (e.message = _('Internal server error.')), e = this.composeData(e, c), this.callErrorHandler(b, e, c)
			}.bind(this)
		}, this.sortData = function(a) {
			if (!a || typeof a != "object")
				return a;
			var b = {}, c = Object.keys(a).sort();
			return c.forEach(function(c) {
				b[c] = a[c]
			}), b
		}, this.JSONRequest = function(b, c) {
			var d;
			if (b.cache_ttl) {
				storage || ( storage = new StorageConstr("with_data")), d = storage.getItem(encodeURIComponent(b.url));
				if (d && new Date - d.time <= b.cache_ttl) {
					b.success && this.callSuccessHandler(b.success, d.data);
					return
				}
			}
			var e = c == "POST" || c == "DELETE";
			e && b.isMutation === !1 && ( e = !1),
			delete b.isMutation, this.trigger && e && this.trigger("dataPageMutated"), ["url"].forEach(function(a) {
				if (!b.hasOwnProperty(a))
					throw new Error("getJSONRequest called without required option: " + a, arguments)
			});
			var f = b.data || {}, g = b.headers;
			["GET", "POST"].indexOf(c) < 0 && ( f = $.extend({
				_method : c
			}, f), c = "POST"), c == "POST" && ( f = this.addAuthToken(f), g && g["X-PHX"] && ( f = this.addPHXAuthToken(f)));
			var h = window.location.search.match(/[?&]lang=([^&]+)/);
			h && ( f = $.extend({
				lang : decodeURIComponent(h)
			}, f)), b.success && (b.success = this.createSuccessHandler(b.success, b)), b.error && (b.error = this.createErrorHandler(b.error, b));
			var i = $.ajax($.extend(b, {
				url : b.url,
				data : this.sortData(f),
				dataType : b.dataType || "json",
				type : c
			}));
			return b.noAbortOnNavigate || a.push(i), i
		}, this.get = function(a) {
			return this.JSONRequest(a, "GET")
		}, this.post = function(a) {
			return this.JSONRequest(a, "POST")
		}, this.destroy = function(a) {
			return this.JSONRequest(a, "DELETE")
		}, this.abortAllXHR = function() {
			a.forEach(function(a) {
				a && a.abort && a.abort()
			}), a = []
		}, this.after("initialize", function() {
			this.on(document, "dataBeforeNavigate", this.abortAllXHR)
		})
	}

	var compose = require("core/compose"), _ = require("core/i18n"), withAuthToken = require("app/data/with_auth_token"), customStorage = require("app/utils/storage/custom"), StorageConstr = customStorage({
		withExpiry : !0
	}), storage;
	module.exports = withData
});
define("app/data/scribe_monitor", ["module", "require", "exports", "core/component", "app/data/scribe_transport", "app/data/client_event", "app/data/with_scribe", "core/utils", "app/data/with_data"], function(module, require, exports) {
	function scribeMonitor() {
		this.bufferedScribeDebug = function(a, b) {
			this.scribe(utils.merge({
				component : "buffered"
			}, a), {
				event_info : "debug",
				event_initiator : 2
			})
		}, this.imageScribeDebug = function(a, b) {
			b.event_namespace = utils.merge({
				component : "image_beacon"
			}, a), b.event_initiator = 2, (new Image).src = window.location.protocol + "//" + window.location.host + "/scribe/?ts=" + +(new Date) + "&log%5B%5D=" + encodeURIComponent(JSON.stringify(b))
		}, this.asyncAjaxScribeDebug = function(a, b) {
			this.ajaxScribeDebug(a, b, !0)
		}, this.syncAjaxScribeDebug = function(a, b) {
			this.ajaxScribeDebug(a, b, !1)
		}, this.ajaxScribeDebug = function(a, b, c) {
			b.event_namespace = utils.merge({
				component : c ? "asynchronous_ajax" : "synchronous_ajax"
			}, a), b.event_initiator = 2, this.post({
				url : "/scribe",
				data : {
					log : [JSON.stringify(b)]
				},
				isMutation : !1,
				async : c
			})
		};
		var a = ["bufferedScribeDebug", "imageScribeDebug", "syncAjaxScribeDebug", "asyncAjaxScribeDebug"];
		this.after("initialize", function() {
			if (Math.random() <= this.attr.userFraction) {
				this.scribe({
					component : "buffered_page_impression",
					action : "debug"
				}, {
					event_info : "debug",
					event_initiator : 2
				});
				var b = {
					event_namespace : {
						client : "web",
						page : clientEvent.scribeContext.page,
						section : clientEvent.scribeContext.section,
						component : "ajax_page_impression",
						action : "debug"
					},
					event_info : "debug",
					event_initiator : 2,
					_category_ : "client_event"
				};
				this.post({
					url : "/scribe",
					data : {
						log : [JSON.stringify(b)]
					}
				})
			}
			this.attr.userFraction && this.on("debugscribe", function(b, c) {
				if (c["_category_"] == "client_event") {
					c.event_info = "debug";
					var d = {
						client : "web",
						page : c.event_namespace.page,
						section : c.event_namespace.section,
						action : "debug"
					};
					this[a[Math.floor(Math.random()*4)]](d, c)
				}
			}), this.attr.scribesForScribeConsole && this.on("uiSwiftLoaded uiPageChanged", function(a, b) {
				(a.type == "uiSwiftLoaded" || !b.fromCache) && this.attr.scribesForScribeConsole.forEach(function(a) {
					a._category_ = "client_event", scribeTransport.postToConsole(a)
				})
			})
		})
	}

	var defineComponent = require("core/component"), scribeTransport = require("app/data/scribe_transport"), clientEvent = require("app/data/client_event"), withScribe = require("app/data/with_scribe"), utils = require("core/utils"), withData = require("app/data/with_data");
	module.exports = defineComponent(scribeMonitor, withScribe, withData)
});
define("app/data/ddg", ["module", "require", "exports", "app/data/client_event"], function(module, require, exports) {
	function DDG(a, b) {
		this.experiments = a || {}, this.impressions = {}, this.scribeExperiment = function(a, c, d) {
			var e = $.extend({
				page : "ddg",
				section : a.experiment_key,
				component : "",
				element : ""
			}, c);
			d = d || {}, d.experiment_key = a.experiment_key, d.bucket = a.bucket, d.version = a.version, (b || window.clientEvent).scribe(e, d)
		}, this.impression = function(a) {
			var b = this.experiments[a];
			b && ( a = b.experiment_key, this.impressions[a] || (this.scribeExperiment(b, {
				action : "experiment"
			}), this.impressions[a] = !0))
		}, this.track = function(a, b, c) {
			if (!b)
				throw new Error("You must specify an event name to track custom DDG events. Event names should be lower-case, snake_cased strings.");
			var d = this.experiments[a];
			d && this.scribeExperiment(d, {
				element : b,
				action : "track"
			}, c)
		}, this.bucket = function(a) {
			var b = this.experiments[a];
			return b ? b.bucket : ""
		}
	}

	var clientEvent = require("app/data/client_event");
	module.exports = new DDG({}, clientEvent)
});
define("app/ui/with_interaction_data", ["module", "require", "exports", "core/utils"], function(module, require, exports) {
	function withInteractionData() {
		this.defaultAttrs({
			expandoItemSelector : ".simple-tweet",
			expandoContainerSelector : ".replies-to, .in-reply-to, .js-expando-content",
			streamItemContainerSelector : ".js-stream-item",
			activityTargetSelector : ".activity-truncated-tweet .js-actionable-tweet, .js-activity-list_member_added [data-list-id]",
			activityItemSelector : ".js-activity",
			itemAvatarSelector : ".js-action-profile-avatar, .avatar.size48",
			itemSmallAvatarSelector : ".avatar.size24, .avatar.size32",
			itemMentionSelector : ".twitter-atreply",
			discoveryStoryItemSelector : ".js-story-item",
			discoveryStoryHeadlineSelector : ".js-news-headline a",
			originalTweetSelector : ".js-original-tweet[data-tweet-id]",
			promotedBadgeSelector : ".js-promoted-badge",
			elementContextSelector : "[data-element-context]",
			componentContextSelector : "[data-component-context]",
			scribeContextSelector : "[data-scribe-context]"
		});
		var a = {
			feedbackToken : "data-feedback-token",
			impressionId : "data-impression-id",
			disclosureType : "data-disclosure-type",
			impressionCookie : "data-impression-cookie",
			relevanceType : "data-relevance-type",
			associatedTweetId : "data-associated-tweet-id"
		}, b = utils.merge({
			tweetId : "data-tweet-id",
			retweetId : "data-retweet-id",
			isReplyTo : "data-is-reply-to"
		}, a), c = utils.merge({
			activityType : "data-activity-type",
			itemKey : "data-item-key"
		}, b), d = utils.merge({
			storyType : "data-story-type",
			query : "data-query",
			url : "data-url",
			storySource : "data-source",
			storyMediaType : "data-card-media-type",
			itemKey : "data-item-key"
		}, b);
		this.interactionData = function(a, b) {
			var c = {}, d = {}, e = a.target ? $(a.target) : $(a);
			b = b || {}, this.attr.eventData && ( c = this.attr.eventData.scribeContext, d = this.attr.eventData.scribeData);
			var f = utils.merge(this.getEventData(e), b), g = e.closest(this.attr.scribeContextSelector).data("scribe-context");
			g && ( d = utils.merge(g, d)), c = utils.merge({}, c, this.getScribeContext(e, f));
			if (this.attr.itemType == "tweet" && (c.component == "replies" || c.component == "conversation")) {
				var h = e.closest(this.attr.streamItemContainerSelector).find(this.attr.originalTweetSelector);
				h.length && (f.conversationOriginTweetId = h.attr("data-tweet-id"))
			}
			return utils.merge({
				scribeContext : c,
				scribeData : d
			}, f)
		}, this.getScribeContext = function(a, b) {
			var c = {}, d = a.closest(this.attr.componentContextSelector).attr("data-component-context");
			d && (c.component = d);
			var e = a.closest(this.attr.elementContextSelector).attr("data-element-context");
			e && (c.element = e);
			if (c.element || c.component)
				return c
		}, this.getInteractionItemPosition = function(a, b) {
			if (b && b.position >= 0)
				return b.position;
			var c = this.getItemPosition && this.getItemPosition(a);
			return c >= 0 ? c : ( c = this.getExpandoPosition(a), c != -1 ? c : a.attr("data-is-tweet-proof") === "true" ? this.getTweetProofPosition(a) : this.getStreamPosition(a))
		}, this.getExpandoPosition = function(a) {
			var b = a.closest(this.attr.expandoContainerSelector);
			return b.length ? b.find(this.attr.expandoItemSelector).index(a.closest(this.attr.expandoItemSelector)) : -1
		}, this.getTweetProofPosition = function(a) {
			var b = a.closest(this.attr.trendItemSelector).index();
			return b != -1 ? b : -1
		}, this.getStreamPosition = function(a) {
			var b = a.closest(this.attr.genericItemSelector).index();
			if (b != -1)
				return b
		}, this.getEventData = function(c) {
			var d;
			switch(this.attr.itemType) {
				case"activity":
					return this.getActivityEventData(c);
				case"story":
					return this.getStoryEventData(c);
				case"user":
					return this.getDataAttrs(c, a);
				case"tweet":
					return this.getDataAttrs(c, b);
				case"list":
					return this.getDataAttrs(c, a);
				case"trend":
					return this.getDataAttrs(c, b);
				default:
					return console.warn('You must configure your UI component with an "itemType" attribute of activity, story, user, tweet, list, or trend in order for it to scribe properly.'), {}
			}
		}, this.getActivityEventData = function(a) {
			var b = a.closest(this.attr.activityItemSelector).find(this.attr.activityTargetSelector);
			b.length || ( b = a);
			var d = this.getDataAttrs(a, c, b);
			return d.activityType === "list_member_added" && (d.activityType = "list"), d.activityType || (d.isReplyTo ? d.activityType = "reply" : d.activityType = d.retweetId ? "retweet" : "mention"), d
		}, this.getStoryEventData = function(a) {
			var b = this.getDataAttrs(a, d), c = a.closest(this.attr.discoveryStoryItemSelector), e = c.find(this.attr.discoveryStoryHeadlineSelector).text();
			return b.storyTitle = e.replace(/^\s+|\s+$/g, ""), b
		}, this.getDataAttrs = function(a, b, c) {
			var d = {};
			return c = c || a, $.each(b, function(a, b) {
				c.is("[" + b + "]") ? d[a] = c.attr(b) : d[a] = c.closest("[" + b + "]").attr(b)
			}), d.isReplyTo = d.isReplyTo === "true", d = utils.merge(d, {
				position : this.getInteractionItemPosition(a, d),
				isMentionClick : a.closest(this.attr.itemMentionSelector).length > 0,
				isPromotedBadgeClick : a.closest(this.attr.promotedBadgeSelector).length > 0,
				itemType : this.attr.itemType
			}), a.is(this.attr.itemAvatarSelector) ? d.profileClickTarget = "avatar" : a.is(this.attr.itemSmallAvatarSelector) ? d.profileClickTarget = "mini_avatar" : d.profileClickTarget = "screen_name", d.userId = a.closest("[data-user-id]").attr("data-user-id"), d
		}
	}

	var utils = require("core/utils");
	module.exports = withInteractionData
});
define("app/utils/scribe_item_types", ["module", "require", "exports"], function(module, require, exports) {
	module.exports = {
		tweet : 0,
		promotedTweet : 1,
		popularTweet : 2,
		retweet : 10,
		user : 3,
		promotedUser : 4,
		message : 6,
		story : 7,
		trend : 8,
		promotedTrend : 9,
		popularTrend : 15,
		list : 11,
		search : 12,
		savedSearch : 13,
		peopleSearch : 14
	}
});
define("app/utils/scribe_association_types", ["module", "require", "exports"], function(module, require, exports) {
	module.exports = {
		associatedTweet : 1,
		platformCardPublisher : 2,
		platformCardCreator : 3,
		conversationOrigin : 4
	}
});
define("app/data/with_interaction_data_scribe", ["module", "require", "exports", "core/compose", "app/data/with_scribe", "app/utils/scribe_item_types", "app/utils/scribe_association_types", "core/utils"], function(module, require, exports) {
	function withInteractionDataScribe() {
		compose.mixin(this, [withScribe]), this.scribeInteraction = function(a, b, c) {
			var d = [], e = [], f = [], g = {};
			if (!a || !b)
				return;
			typeof a == "string" && ( a = {
				action : a
			});
			if (!a.action)
				return;
			b = utils.merge(b, b.sourceEventData), this.insertInteractionData(b, a, d, e, f, g), a = this.getInteractionScribeContext(a, b), c = utils.merge({
				item_ids : d.length ? d : null,
				item_names : e.length ? e : null,
				tokens : f.length ? f : null,
				item_count : 1,
				item_details : g,
				url : b.url,
				query : b.query,
				promoted : !!b.impressionId,
				message : b.storyTitle
			}, c, b.scribeData), b.conversationOriginTweetId && (c.associations = c.associations || {}, c.associations[associationTypes.conversationOrigin] = {
				association_id : b.conversationOriginTweetId,
				association_type : itemTypes.tweet
			}), this.scribe(a, b, c)
		}, this.insertInteractionData = function(a, b, c, d, e, f, g) {
			var h, i, j, k, l;
			switch(a.itemType) {
				case"user":
					c.push(a.userId), i = itemTypes.user, l = a.userId;
					break;
				case"tweet":
					c.push(a.tweetId), i = itemTypes.tweet, l = a.tweetId;
					break;
				case"activity":
					a.activityType === "follow" ? (c.push(a.userId), i = itemTypes.user) : a.listId ? (c.push(a.listId), i = itemTypes.list) : (c.push(a.tweetId), i = itemTypes.tweet), a.itemKey && d.push(a.itemKey), k = a.activityType, l = a.itemKey;
					break;
				case"story":
					a.tweetId || a.userId ? (c.push(a.tweetId || a.userId), i = a.tweetId ? itemTypes.tweet : itemTypes.user) : i = itemTypes.story, a.itemKey && d.push(a.itemKey), k = a.storyType, l = a.itemKey
			}
			a.itemType === "user" || this.isUserTarget(b.action) ? ( h = a.userId, j = itemTypes.user) : a.listId ? ( h = a.listId, j = itemTypes.list) : a.retweetId ? ( i = itemTypes.retweet, h = a.retweetId, j = itemTypes.tweet) : a.tweetId ? ( h = a.tweetId, j = itemTypes.tweet) : j = i, (a.feedbackToken || a.storySource) && e.push(a.feedbackToken || a.storySource), a.impressionId && (i === itemTypes.tweet || i === itemTypes.user) && (h === c[0] && j === i && j++, i++), a.relevanceType && i === itemTypes.tweet && ( i = itemTypes.popularTweet, j === itemTypes.tweet && ( j = itemTypes.popularTweet));
			if (l) {
				if (g && this.isMundaneType(a, i, j))
					return;
				f[l] = {
					item_type : i,
					target_id : h,
					target_type : j,
					item_position : a.position,
					item_token : a.impressionId,
					item_description : k
				}
			}
		}, this.isMundaneType = function(a, b, c) {
			return (a.itemType === "user" || a.itemType === "tweet") && (b === itemTypes.user || b === itemTypes.tweet) && (c === itemTypes.user || c === itemTypes.tweet)
		}, this.isUserTarget = function(a) {
			return ["mention_click", "profile_click", "follow", "unfollow", "block", "unblock", "report_as_spam", "add_to_list", "dm"].indexOf(a) != -1
		}, this.getInteractionScribeContext = function(a, b) {
			return a.action == "profile_click" && a.element === undefined && (a.element = b.isPromotedBadgeClick ? "promoted_badge" : b.profileClickTarget), a
		}, this.scribeInteractiveResults = function(a, b, c, d) {
			var e = [], f = [], g = [], h = !1, i = {};
			typeof a == "string" && ( a = {
				action : a
			});
			if (!a.action || !b)
				return;
			b.length || (a.action = "no_results"), b.forEach( function(b) {
				h || ( h = !!b.impressionId), this.insertInteractionData(b, a, e, f, g, i, !0)
			}.bind(this)), a = this.getInteractionScribeContext(a, c), d = utils.merge({
				item_ids : e.length ? e : null,
				item_names : f.length ? f : null,
				tokens : g.length ? g : null,
				item_count : b.length,
				item_details : i,
				promoted : h
			}, d), this.scribe(a, c, d)
		}
	}

	var compose = require("core/compose"), withScribe = require("app/data/with_scribe"), itemTypes = require("app/utils/scribe_item_types"), associationTypes = require("app/utils/scribe_association_types"), utils = require("core/utils");
	module.exports = withInteractionDataScribe
});
define("app/data/tweet_actions_scribe", ["module", "require", "exports", "core/component", "core/utils", "app/ui/with_interaction_data", "app/data/with_interaction_data_scribe"], function(module, require, exports) {
	function tweetActionsScribe() {
		this.scribeTweet = function(a) {
			return function(b, c) {
				this.scribeInteraction({
					action : a
				}, utils.merge(c, c.sourceEventData))
			}.bind(this)
		}, this.after("initialize", function() {
			this.on("uiReplyButtonTweetSuccess", this.scribeTweet("reply")), this.on("uiDidRetweetSuccess", this.scribeTweet("retweet")), this.on("uiDidDeleteTweet", this.scribeTweet("delete")), this.on("dataDidFavoriteTweet", this.scribeTweet("favorite")), this.on("dataDidUnfavoriteTweet", this.scribeTweet("unfavorite")), this.on("dataDidUnretweet", this.scribeTweet("unretweet")), this.on("uiPermalinkClick", this.scribeTweet("permalink")), this.on("uiDidShareViaEmailSuccess", this.scribeTweet("share_via_email"))
		})
	}

	var defineComponent = require("core/component"), utils = require("core/utils"), withInteractionData = require("app/ui/with_interaction_data"), withInteractionDataScribe = require("app/data/with_interaction_data_scribe");
	module.exports = defineComponent(tweetActionsScribe, withInteractionData, withInteractionDataScribe)
});
define("app/data/user_actions_scribe", ["module", "require", "exports", "core/component", "app/utils/scribe_item_types", "app/utils/scribe_association_types", "app/data/with_interaction_data_scribe"], function(module, require, exports) {
	function userActionsScribe() {
		function a(a) {
			var b = a && a.associatedTweetId, c = {};
			if (!b)
				return;
			return c[associationTypes.associatedTweet] = {
				association_type : itemTypes.tweet,
				association_id : b
			}, {
				associations : c
			}
		}
		this.defaultAttrs({
			urlToActionMap : {
				"/i/user/follow" : "follow",
				"/i/user/unfollow" : "unfollow",
				"/i/user/block" : "block",
				"/i/user/unblock" : "unblock",
				"/i/user/report_spam" : "report_as_spam",
				"/i/user/hide" : "dismiss"
			},
			userActionToActionMap : {
				uiMentionAction : "reply",
				uiDmAction : "dm",
				uiListAction : "add_to_list"
			}
		}), this.handleUserEvent = function(b, c) {
			this.scribeInteraction(this.attr.urlToActionMap[c.requestUrl], c, a(c.sourceEventData))
		}, this.handleAction = function(b, c) {
			this.scribeInteraction(this.attr.userActionToActionMap[b.type], c, a(c))
		}, this.after("initialize", function() {
			this.on(document, "dataFollowStateChange dataUserActionSuccess", this.handleUserEvent), this.on(document, "uiMentionAction uiListAction uiDmAction", this.handleAction)
		})
	}

	var defineComponent = require("core/component"), itemTypes = require("app/utils/scribe_item_types"), associationTypes = require("app/utils/scribe_association_types"), withInteractionDataScribe = require("app/data/with_interaction_data_scribe");
	module.exports = defineComponent(userActionsScribe, withInteractionDataScribe)
});
define("app/data/with_card_metadata", ["module", "require", "exports", "core/compose", "app/utils/scribe_association_types", "app/data/with_interaction_data_scribe", "app/utils/scribe_item_types"], function(module, require, exports) {
	function withCardMetadata() {
		compose.mixin(this, [withInteractionDataScribe]), this.cardAssociationsForData = function(a) {
			var b = {
				associations : {}
			};
			return b.associations[associationTypes.platformCardPublisher] = {
				association_id : a.publisherUserId,
				association_type : itemTypes.user
			}, b.associations[associationTypes.platformCardCreator] = {
				association_id : a.creatorUserId,
				association_type : itemTypes.user
			}, b.message = a.cardUrl, b
		}, this.getCardDataFromTweet = function(a) {
			var b = {}, c = a.closest(".tweet");
			b.tweetHasCard = c.hasClass("has-cards"), b.interactionInsideCard = !1;
			if (b.tweetHasCard) {
				var d = c.find(".cards-base");
				b.cardType = d.data("card-type"), b.cardUrl = d.data("card-url"), b.publisherUserId = this.getUserIdFromElement(d.find(".source .js-user-profile-link")), b.creatorUserId = this.getUserIdFromElement(d.find(".byline .js-user-profile-link")), b.interactionInsideCard = this.interactionInsideCard(a)
			}
			return b
		}, this.interactionInsideCard = function(a) {
			return !!a.closest(".cards-base").length
		}, this.scribeCardInteraction = function(a, b) {
			var c = this.cardAssociationsForData(b);
			this.scribeInteraction({
				element : "platform_" + b.cardType + "_card",
				action : a
			}, b, c)
		}, this.getUserIdFromElement = function(a) {
			return a.length ? a.attr("data-user-id") : null
		}
	}

	var compose = require("core/compose"), associationTypes = require("app/utils/scribe_association_types"), withInteractionDataScribe = require("app/data/with_interaction_data_scribe"), itemTypes = require("app/utils/scribe_item_types");
	module.exports = withCardMetadata
});
define("app/data/item_actions_scribe", ["module", "require", "exports", "core/component", "app/data/with_interaction_data_scribe", "app/utils/scribe_association_types", "app/data/with_card_metadata", "app/utils/scribe_item_types"], function(module, require, exports) {
	function itemActionsScribe() {
		this.handleNewerTimelineItems = function(a, b) {
			this.scribeInteractiveResults({
				element : "newer",
				action : "results"
			}, b.items, b)
		}, this.handleProfilePopup = function(a, b) {
			var c = b.sourceEventData, d = c.isMentionClick ? "mention_click" : "profile_click";
			c.userId = b.user_id, c.interactionInsideCard ? this.scribeCardAction(d, a, c) : this.scribeInteraction(d, c)
		}, this.scribeItemAction = function(a, b, c) {
			this.scribeInteraction(a, c)
		}, this.scribeSearchTagClick = function(a, b) {
			var c = a.type == "uiCashtagClick" ? "cashtag" : "hashtag";
			this.scribeInteraction({
				element : c,
				action : "search"
			}, b)
		}, this.scribeLinkClick = function(a, b) {
			var c = {};
			b.tcoUrl && (c.message = b.tcoUrl), b.text && b.text.indexOf("pic.twitter.com") == 0 && (b.url = "http://" + b.text), this.scribeInteraction("open_link", b, c)
		}, this.scribeCardAction = function(a, b, c) {
			c && c.tweetHasCard && this.scribeCardInteraction(a, c)
		}, this.after("initialize", function() {
			this.on(document, "uiHasInjectedNewTimeline", this.handleNewerTimelineItems), this.on(document, "dataProfilePopupSuccess", this.handleProfilePopup), this.on(document, "uiItemSelected", this.scribeItemAction.bind(this, "select")), this.on(document, "uiItemDeselected", this.scribeItemAction.bind(this, "deselect")), this.on(document, "uiHashtagClick uiCashtagClick", this.scribeSearchTagClick), this.on(document, "uiItemLinkClick", this.scribeLinkClick), this.on(document, "uiItemSelected", this.scribeCardAction.bind(this, "show")), this.on(document, "uiItemDeselected", this.scribeCardAction.bind(this, "hide")), this.on(document, "uiMapShow", this.scribeItemAction.bind(this, "show")), this.on(document, "uiMapClick", this.scribeItemAction.bind(this, "click")), this.on(document, "uiShareViaEmailDialogOpened", this.scribeItemAction.bind(this, "open"))
		})
	}

	var defineComponent = require("core/component"), withInteractionDataScribe = require("app/data/with_interaction_data_scribe"), associationTypes = require("app/utils/scribe_association_types"), withCardMetadata = require("app/data/with_card_metadata"), itemTypes = require("app/utils/scribe_item_types");
	module.exports = defineComponent(itemActionsScribe, withInteractionDataScribe, withCardMetadata)
});
define("app/data/navigation_scribe", ["module", "require", "exports", "core/component", "app/data/client_event", "app/data/with_scribe"], function(module, require, exports) {
	function navigationScribe() {
		this.scribeNav = function(a, b) {
			this.scribe("navigate", b, {
				url : b.url
			})
		}, this.scribeCachedImpression = function(a, b) {
			b.fromCache && this.scribe("impression")
		}, this.setInternalReferer = function(a, b) {
			var c = (window.location.protocol + "//" + window.location.host).length;
			clientEvent.internalReferer = window.location.href.substring(c)
		}, this.after("initialize", function() {
			this.on("uiNavigate", this.setInternalReferer), this.on("uiNavigationLinkClick", this.scribeNav), this.on("uiPageChanged", this.scribeCachedImpression)
		})
	}

	var defineComponent = require("core/component"), clientEvent = require("app/data/client_event"), withScribe = require("app/data/with_scribe");
	module.exports = defineComponent(navigationScribe, withScribe)
});
define("app/boot/scribing", ["module", "require", "exports", "app/data/scribe_transport", "app/data/scribe_monitor", "app/data/client_event", "app/data/ddg", "app/data/tweet_actions_scribe", "app/data/user_actions_scribe", "app/data/item_actions_scribe", "app/data/navigation_scribe"], function(module, require, exports) {
	function initialize(a) {
		var b = {
			useAjax : !0,
			bufferEvents : !0,
			flushOnUnload : a.environment != "selenium",
			metrics : a.scribeMetrics / 1e4,
			bufferSize : a.environment == "selenium" ? 1e3 * a.scribeBufferSize : a.scribeBufferSize,
			debug : a.environment != "production"
		};
		a.useNewScribeEndpoint || (b.url = "/scribe"), scribeTransport.updateOptions(b), scribeTransport.registerEventHandlers(), clientEvent.scribeContext = {
			client : "web",
			page : a.pageName,
			section : a.sectionName
		}, clientEvent.scribeData = {
			internal_referer : clientEvent.internalReferer || a.internalReferer,
			client_version : "swift"
		},
		delete clientEvent.internalReferer, a.loggedIn || (clientEvent.scribeData.user_id = 0), ddg.experiments = a.experiments, (a.scribeMetrics || a.scribesForScribeConsole) && ScribeMonitor.attachTo(document, {
			userFraction : (a.scribeMetrics || 0) / 1e4,
			scribesForScribeConsole : a.scribesForScribeConsole
		}), TweetActionsScribe.attachTo(document), UserActionsScribe.attachTo(document), ItemActionsScribe.attachTo(document), NavigationScribe.attachTo(document, a)
	}

	var scribeTransport = require("app/data/scribe_transport"), ScribeMonitor = require("app/data/scribe_monitor"), clientEvent = require("app/data/client_event"), ddg = require("app/data/ddg"), TweetActionsScribe = require("app/data/tweet_actions_scribe"), UserActionsScribe = require("app/data/user_actions_scribe"), ItemActionsScribe = require("app/data/item_actions_scribe"), NavigationScribe = require("app/data/navigation_scribe");
	module.exports = initialize
});
define("app/utils/full_path", ["module", "require", "exports"], function(module, require, exports) {
	function fullPath() {
		return [location.pathname, location.search].join("")
	}
	module.exports = fullPath
});
define("app/ui/navigation", ["module", "require", "exports", "core/component", "core/utils", "core/clock", "core/registry", "app/utils/full_path"], function(module, require, exports) {
	function navigation() {
		this.routes = {
			home : "/",
			activity : "/activity",
			connect : "/i/connect",
			mentions : "/mentions",
			discover : "/i/discover",
			profile : "/",
			favorites : "/favorites",
			settings : "/settings/account",
			lists : "/lists"
		}, this.defaultAttrs({
			spinnerContainer : "body",
			pushStateSelector : "a.js-nav",
			pageContainer : "#page-container",
			docContainer : "#doc",
			viewContainer : "#page-container",
			spinnerClass : "pushing-state"
		}), this.navigate = function(a) {
			var b, c;
			if (a.shiftKey || a.ctrlKey || a.metaKey || a.which != undefined && a.which > 1)
				return;
			b = $(a.target), c = b.closest(this.attr.pushStateSelector), c.length && !a.isDefaultPrevented() && (this.trigger(c, "uiNavigate", {
				href : c.attr("href")
			}), a.preventDefault(), a.stopImmediatePropagation())
		}, this.reloadPage = function() {
			location.reload()
		}, this.updatePage = function(a, b, c) {
			b.init_data.pushState || this.reloadPage(), this.trigger("uiBeforePageChanged", b), this.trigger("uiTeardown", b), $("body").attr("class", b.body_class_names), this.select("docContainer").attr("class", b.doc_class_names), this.select("pageContainer").attr("class", b.page_container_class_names), this.select("viewContainer").html(b.page), b.isPopState || $("html, body").scrollTop(0), using(b.module, function(a) {
				a(b.init_data), this.trigger("uiPageChanged", b)
			}.bind(this))
		}, this.navigateTo = function(a) {
			return function() {
				this.trigger("uiNavigate", {
					href : this.routes[a]
				})
			}
		}, this.showSpinner = function(a, b) {
			this.select("spinnerContainer").addClass(this.attr.spinnerClass)
		}, this.hideSpinner = function(a, b) {
			this.select("spinnerContainer").removeClass(this.attr.spinnerClass)
		}, this.onUiNavigate = function(a, b) {
			b.href != fullPath() && (location.href = b.href)
		}, this.after("initialize", function() {
			this.attr.pushState ? (this.on("click", this.navigate), this.on("dataPageRefresh", this.updatePage), this.on("dataPageFetch", this.showSpinner), this.on("dataPageRefresh", this.hideSpinner)) : this.on("uiNavigate", this.onUiNavigate), this.on("uiShortcutNavigateHome", this.navigateTo("home")), this.on("uiShortcutNavigateActivity", this.navigateTo("activity")), this.on("uiShortcutNavigateConnect", this.navigateTo("connect")), this.on("uiShortcutNavigateMentions", this.navigateTo("mentions")), this.on("uiShortcutNavigateDiscover", this.navigateTo("discover")), this.on("uiShortcutNavigateProfile", this.navigateTo("profile")), this.on("uiShortcutNavigateFavorites", this.navigateTo("favorites")), this.on("uiShortcutNavigateSettings", this.navigateTo("settings")), this.on("uiShortcutNavigateLists", this.navigateTo("lists")), this.attr.routes && utils.push(this.routes, this.attr.routes)
		})
	}

	var component = require("core/component"), utils = require("core/utils"), clock = require("core/clock"), registry = require("core/registry"), fullPath = require("app/utils/full_path"), Navigation = component(navigation);
	module.exports = Navigation
});
provide("app/utils/time", function(a) {
	function b(a) {
		this.ms = a
	}

	function c(a) {
		var c = {
			seconds : new b(a * 1e3),
			minutes : new b(a * 1e3 * 60),
			hours : new b(a * 1e3 * 60 * 60),
			days : new b(a * 1e3 * 60 * 60 * 24)
		};
		return c.second = c.seconds, c.minute = c.minutes, c.hour = c.hours, c.day = c.days, c
	}
	c.now = function() {
		return (new Date).getTime()
	}, b.prototype.fromNow = function() {
		return new Date(c.now() + this.ms)
	}, b.prototype.ago = function() {
		return new Date(c.now() - this.ms)
	}, b.prototype.getTime = b.prototype.valueOf = function() {
		return this.ms
	}, a(c)
})
define("app/data/navigation", ["module", "require", "exports", "core/component", "core/utils", "app/utils/time", "app/utils/full_path", "app/data/with_data"], function(module, require, exports) {
	function navigationData() {
		this.defaultAttrs({
			viewContainer : "#page-container"
		});
		var a, b, c;
		this.navigate = function(a, b) {
			var d = fullPath();
			c = b.href;
			if (b.href == d && this.pageCache[d])
				return;
			this.trigger("dataBeforeNavigate"), this.attr.initialState && this.createInitialState(), this.getPageData(b.href)
		}, this.sweepPageCache = function() {
			var a = time.now();
			for (var b in this.pageCacheTTLs)a > this.pageCacheTTLs[b] && (
			delete this.pageCache[b],
			delete this.pageCacheTTLs[b])
		}, this.getPageData = function(a) {
			var b, d = this.attr.viewContainer;
			this.sweepPageCache(), this.trigger("uiBeforeNewPageLoad"), ( b = this.pageCache[a]) ? (b.fromCache = !0, this.pageDataReceived(a, b)) : (this.trigger("dataPageFetch"), this.get({
				url : a,
				success : function(b) {
					if (b.init_data && b.page && b.module) {
						b.init_data.assetsBasePath != this.attr.assetsBasePath && (location.href = a);
						if (b.init_data.viewContainer != d) {
							location.href = a;
							return
						}
						var e = b.init_data.href;
						b.href = e, this.cacheState(e, b);
						if (c != a)
							return;
						this.pageDataReceived(e, b)
					} else
						location.href = b.href || a
				}.bind(this),
				error : function(b) {
					location.href = a
				}
			}))
		}, this.updatePageState = function() {
			var b = this.pageCache[a];
			b && (b.page = this.select("viewContainer").html(), b.page.length > this.attr.pushStatePageLimit && (
			delete this.pageCache[a],
			delete this.pageCacheTTLs[a]))
		}, this.pageDataReceived = function(a, c) {
			!b && a != fullPath() && history.pushState({}, c.title, a), c.isPopState = b, this.trigger("dataPageRefresh", c)
		}, this.doTeardown = function(b, c) {
			component.teardownAll(), c.href != a && this.updatePageState()
		}, this.cacheState = function(a, b) {
			this.pageCache[a] = b, this.pageCacheTTLs[a] = time(b.cache_ttl).seconds.fromNow().getTime()
		}, this.onPopState = function(a) {
			if (this.handledPopstate)
				return;
			a.originalEvent.state && (this.attr.initialState && !this.handledPopstate && (this.handledPopstate = !0), b = !0, c = fullPath(), this.getPageData(c))
		}, this.createInitialState = function() {
			var a = fullPath(), b = utils.merge({}, this.attr.initialState, !0);
			b.page = this.select("viewContainer").html(), b.init_data = utils.merge({}, this.attr, !0),
			delete b.init_data.initialState, this.cacheState(a, b), history.replaceState({}, this.title, a)
		}, this.resetPageCache = function(a, b) {
			this.pageCache = pageCache = {}, this.pageCacheTTLs = pageCacheTTLs = {}
		}, this.removePageFromCache = function(a, b) {
			var c = b.href;
			this.pageCache[c] && (
			delete this.pageCache[c],
			delete this.pageCacheTTLs[c])
		}, this.after("initialize", function() {
			this.pageCache = pageCache, this.pageCacheTTLs = pageCacheTTLs, this.on(window, "popstate", this.onPopState), this.on("uiNavigate", this.navigate), this.on("uiTeardown", this.doTeardown), this.on(document, "dataPageMutated", this.resetPageCache), this.on(document, "uiPromotedLinkClick", this.removePageFromCache), a = fullPath(), b = !1
		})
	}

	var component = require("core/component"), utils = require("core/utils"), time = require("app/utils/time"), fullPath = require("app/utils/full_path"), withData = require("app/data/with_data"), NavigationData = component(navigationData, withData), pageCache = {}, pageCacheTTLs = {};
	module.exports = NavigationData
});
define("app/ui/with_dropdown", ["module", "require", "exports"], function(module, require, exports) {
	function withDropdown() {
		this.toggleDisplay = function(a) {
			this.$node.toggleClass("open"), this.$node.hasClass("open") && (this.activeEl = document.activeElement, this.trigger("uiDropdownOpened")), a && a.preventDefault()
		}, this.ignoreCloseEvent = !1, this.closeDropdown = function() {
			this.$node.removeClass("open")
		}, this.onKeyDown = function(a) {
			a.keyCode == 27 && (this.closeDropdown(), this.activeEl && (this.activeEl.focus(), this.activeEl = null))
		}, this.close = function(a) {
			var b = $(this.attr.toggler);
			if ((a.target === this.$node || this.$node.has(a.target).length > 0) && !this.isItemClick(a))
				return;
			if (this.isItemClick(a) && this.ignoreCloseEvent)
				return;
			this.closeDropdown()
		}, this.isItemClick = function(a) {
			return !this.attr.itemSelector || !a ? !1 : $(a.target).closest(this.attr.itemSelector).length > 0
		}, this.after("initialize", function() {
			this.on(this.attr.toggler, "click", this.toggleDisplay), this.on(document, "click", this.close), this.on(document, "uiCloseDropdowns uiNavigate", this.closeDropdown), this.on(document, "keydown", this.onKeyDown)
		})
	}
	module.exports = withDropdown
});
define("app/ui/language_dropdown", ["module", "require", "exports", "core/component", "app/ui/with_dropdown"], function(module, require, exports) {
	function languageDropdown() {
		this.defaultAttrs({
			toggler : ".dropdown-toggle"
		})
	}

	var defineComponent = require("core/component"), withDropdown = require("app/ui/with_dropdown"), LanguageDropdown = defineComponent(languageDropdown, withDropdown);
	module.exports = LanguageDropdown
});
define("app/ui/google", ["module", "require", "exports", "core/component"], function(module, require, exports) {
	function googleAnalytics() {
		this.defaultAttrs({
			gaPageName : window.location.pathname
		}), this.initGoogle = function() {
			window._gaq = window._gaq || [], window._gaq.push(["_setAccount", "UA-30775-6"], ["_trackPageview", this.attr.gaPageName], ["_setDomainName", "twitter.com"]);
			var a = document.getElementsByTagName("script")[0], b = document.createElement("script");
			b.async = !0, b.src = (document.location.protocol == "https:" ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js", a.parentNode.insertBefore(b, a), this.off("uiSwiftLoaded", this.initGoogle)
		}, this.trackPageChange = function(a, b) {
			b = b.init_data, window._gaq.push(["_trackPageview", b && b.gaPageName || window.location.pathname])
		}, this.after("initialize", function() {
			this.on("uiSwiftLoaded", this.initGoogle), this.on("uiPageChanged", this.trackPageChange)
		})
	}

	var defineComponent = require("core/component"), GoogleAnalytics = defineComponent(googleAnalytics);
	module.exports = GoogleAnalytics
});
define("app/utils/cookie", ["module", "require", "exports"], function(module, require, exports) {
	module.exports = function(b, c, d) {
		var e = $.extend({}, d);
		if (arguments.length > 1 && String(c) !== "[object Object]") {
			if (c === null || c === undefined)
				e.expires = -1, c = "";
			if ( typeof e.expires == "number") {
				var f = e.expires, g = new Date((new Date).getTime() + f * 24 * 60 * 60 * 1e3);
				e.expires = g
			}
			return c = String(c), document.cookie = [encodeURIComponent(b), "=", e.raw ? c : encodeURIComponent(c), e.expires ? "; expires=" + e.expires.toUTCString() : "", "; path=" + (e.path || "/"), e.domain ? "; domain=" + e.domain : "", e.secure ? "; secure" : ""].join("")
		}
		e = c || {};
		var h, i = e.raw ? function(a) {
			return a
		} : decodeURIComponent;
		return ( h = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? i(h[1]) : null
	}
});
define("app/ui/impression_cookies", ["module", "require", "exports", "core/component", "app/utils/cookie"], function(module, require, exports) {
	function impressionCookies() {
		this.defaultAttrs({
			sendImpressionCookieSelector : "a[data-send-impression-cookie]",
			link : "a"
		}), this.setCookie = function(a, b) {
			cookie("ic", a, {
				expires : b
			})
		}, this.sendImpressionCookie = function(a, b) {
			var c = b.el;
			if (!c || c.hostname != window.location.hostname || !c.pathname || c.pathname.indexOf("/#!/") == 0)
				return;
			var d = $(c), e = d.closest("[data-impression-cookie]").attr("data-impression-cookie");
			if (!e)
				return;
			this.trigger("uiPromotedLinkClick", {
				href : d.attr("href")
			});
			var f = new Date, g = 6e4, h = new Date(f.getTime() + g);
			this.setCookie(e, h)
		}, this.after("initialize", function(a) {
			this.on("click", {
				sendImpressionCookieSelector : this.sendImpressionCookie
			}), this.on("uiShowProfileNewWindow", {
				link : this.sendImpressionCookie
			})
		})
	}

	var defineComponent = require("core/component"), cookie = require("app/utils/cookie");
	module.exports = defineComponent(impressionCookies)
});
define("app/data/promoted_logger", ["module", "require", "exports", "core/component", "app/data/with_data"], function(module, require, exports) {
	function promotedLogger() {
		this.defaultAttrs({
			tweetHashtagLinkSelector : ".tweet .twitter-hashtag",
			tweetLinkSelector : ".tweet .twitter-timeline-link"
		}), this.logEvent = function(a, b) {
			this.get({
				url : "/i/promoted_content/log.json",
				data : a,
				eventData : {},
				headers : {
					"X-PHX" : !0
				},
				success : "dataLogEventSuccess",
				error : "dataLogEventError",
				async : !b,
				noAbortOnNavigate : !0
			})
		}, this.isEarnedMedia = function(a) {
			return a == "earned"
		}, this.logPromotedTrendImpression = function(a, b) {
			var c = b.items, d = b.source;
			if (d == "clock")
				return;
			var e = c.filter(function(a) {
				return !!a.promotedTrendId
			});
			if (!e.length)
				return;
			this.logEvent({
				event : "i",
				promoted_trend_id : e[0].promotedTrendId
			})
		}, this.logPromotedTrendClick = function(a, b) {
			if (!b.promotedTrendId)
				return;
			this.logEvent({
				event : "c",
				promoted_trend_id : b.promotedTrendId
			}, !0)
		}, this.logPromotedTweetImpression = function(a, b) {
			var c = b.tweets.filter(function(a) {
				return a.impressionId
			});
			c.forEach( function(a) {
				this.logEvent({
					event : "impression",
					impression_id : a.impressionId,
					earned : this.isEarnedMedia(a.disclosureType)
				})
			}.bind(this))
		}, this.logPromotedTweetLinkClick = function(a) {
			var b = $(a.target).closest("[data-impression-id]").attr("data-impression-id"), c = $(a.target).closest("[data-impression-id]").attr("data-disclosure-type");
			if (!b)
				return;
			this.logEvent({
				event : "url_click",
				impression_id : b,
				earned : this.isEarnedMedia(c)
			}, !0)
		}, this.logPromotedTweetHashtagClick = function(a) {
			var b = $(a.target).closest("[data-impression-id]").attr("data-impression-id"), c = $(a.target).closest("[data-impression-id]").attr("data-disclosure-type");
			if (!b)
				return;
			this.logEvent({
				event : "hashtag_click",
				impression_id : b,
				earned : this.isEarnedMedia(c)
			}, !0)
		}, this.logPromotedUserImpression = function(a, b) {
			var c = b.users.filter(function(a) {
				return a.impressionId
			});
			c.forEach( function(a) {
				this.logEvent({
					event : "impression",
					impression_id : a.impressionId
				})
			}.bind(this))
		}, this.logPromotedUserClick = function(a, b) {
			var c = b.impressionId;
			if (!c)
				return;
			var d = this.isEarnedMedia(b.disclosureType);
			b.profileClickTarget === "avatar" ? this.logEvent({
				event : "profile_image_click",
				impression_id : c,
				earned : d
			}) : b.isMentionClick ? this.logEvent({
				event : "user_mention_click",
				impression_id : c,
				earned : d
			}) : b.isPromotedBadgeClick ? this.logEvent({
				event : "footer_profile",
				impression_id : c,
				earned : d
			}) : this.logEvent({
				event : "screen_name_click",
				impression_id : c,
				earned : d
			})
		}, this.logPromotedUserDismiss = function(a, b) {
			var c = b.impressionId;
			if (!c)
				return;
			this.logEvent({
				event : "dismiss",
				impression_id : c
			})
		}, this.logPromotedTweetDismiss = function(a, b) {
			var c = b.impressionId, d = b.disclosureType;
			if (!c)
				return;
			this.logEvent({
				event : "dismiss",
				impression_id : c,
				earned : this.isEarnedMedia(d)
			})
		}, this.logPromotedTweetDetails = function(a, b) {
			var c = b.impressionId, d = b.disclosureType;
			if (!c)
				return;
			this.logEvent({
				event : "view_details",
				impression_id : c,
				earned : this.isEarnedMedia(d)
			})
		}, this.after("initialize", function() {
			this.on("uiTrendsDisplayed", this.logPromotedTrendImpression), this.on("uiTrendSelected", this.logPromotedTrendClick), this.on("uiTweetsDisplayed", this.logPromotedTweetImpression), this.on("click", {
				tweetLinkSelector : this.logPromotedTweetLinkClick,
				tweetHashtagLinkSelector : this.logPromotedTweetHashtagClick
			}), this.on("uiHasExpandedTweet", this.logPromotedTweetDetails), this.on("uiTweetDismissed", this.logPromotedTweetDismiss), this.on("uiUsersDisplayed", this.logPromotedUserImpression), this.on("uiDismissUserRecommendation", this.logPromotedUserDismiss), this.on("uiShowProfilePopup uiShowProfileNewWindow", this.logPromotedUserClick)
		})
	}

	var defineComponent = require("core/component"), withData = require("app/data/with_data"), PromotedLogger = defineComponent(promotedLogger, withData);
	module.exports = PromotedLogger
});
define("app/ui/message_drawer", ["module", "require", "exports", "core/component"], function(module, require, exports) {
	function messageDrawer() {
		this.defaultAttrs({
			fadeTimeout : 2e3,
			closeSelector : ".dismiss",
			textSelector : ".message-text",
			bannersSelector : "#banners",
			topOffset : 47
		});
		var a = function() {
			this.$node.css("opacity", 1).animate({
				opacity : 0
			}, 1e3, function() {
				this.closeMessage()
			}.bind(this))
		};
		this.showMessage = function(b, c) {
			this.$node.css({
				opacity : 1,
				top : this.attr.topOffset + $(this.attr.bannersSelector).height()
			}), this.select("textSelector").html(c.message), this.select("closeSelector").hide(), this.$node.removeClass("hidden"), clearTimeout(this.messageTimeout), this.$node.stop(), this.messageTimeout = setTimeout(a.bind(this), this.attr.fadeTimeout)
		}, this.showError = function(a, b) {
			this.$node.css("opacity", 1), this.select("textSelector").html(b.message), this.select("closeSelector").show(), this.$node.removeClass("hidden")
		}, this.closeMessage = function(a) {
			a && a.preventDefault(), this.$node.addClass("hidden")
		}, this.after("initialize", function() {
			this.on(document, "uiShowMessage", this.showMessage), this.on(document, "uiShowError", this.showError), this.on(this.attr.closeSelector, "click", this.closeMessage), this.on(document, "uiBeforePageChanged", this.closeMessage)
		})
	}

	var defineComponent = require("core/component"), MessageDrawer = defineComponent(messageDrawer);
	module.exports = MessageDrawer
});
deferred('$lib/bootstrap_tooltip.js', function() {
	/*! bootstrap-tooltip.js v2.0.2 (c) 2012 Twitter, Inc. http://www.apache.org/licenses/LICENSE-2.0 */! function($) {"use strict";
		var a = function(a, b) {
			this.init("tooltip", a, b)
		};
		a.prototype = {
			constructor : a,
			init : function(a, b, c) {
				var d, e;
				this.type = a, this.$element = $(b), this.options = this.getOptions(c), this.enabled = !0, this.options.trigger != "manual" && ( d = this.options.trigger == "hover" ? "mouseenter" : "focus", e = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(d, this.options.selector, $.proxy(this.enter, this)), this.$element.on(e, this.options.selector, $.proxy(this.leave, this))), this.options.selector ? this._options = $.extend({}, this.options, {
					trigger : "manual",
					selector : ""
				}) : this.fixTitle()
			},
			getOptions : function(a) {
				return a = $.extend({}, $.fn[this.type].defaults, a, this.$element.data()), a.delay && typeof a.delay == "number" && (a.delay = {
					show : a.delay,
					hide : a.delay
				}), a
			},
			enter : function(a) {
				var b = $(a.currentTarget)[this.type](this._options).data(this.type);
				!b.options.delay || !b.options.delay.show ? b.show() : (b.hoverState = "in", setTimeout(function() {
					b.hoverState == "in" && b.show()
				}, b.options.delay.show))
			},
			leave : function(a) {
				var b = $(a.currentTarget)[this.type](this._options).data(this.type);
				!b.options.delay || !b.options.delay.hide ? b.hide() : (b.hoverState = "out", setTimeout(function() {
					b.hoverState == "out" && b.hide()
				}, b.options.delay.hide))
			},
			show : function() {
				var a, b, c, d, e, f, g;
				if (this.hasContent() && this.enabled) {
					a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.remove().css({
						top : 0,
						left : 0,
						display : "block"
					}).appendTo( b ? this.$element : document.body), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight;
					switch(b?f.split(" ")[1]:f) {
						case"bottom":
							g = {
								top : c.top + c.height,
								left : c.left + c.width / 2 - d / 2
							};
							break;
						case"top":
							g = {
								top : c.top - e,
								left : c.left + c.width / 2 - d / 2
							};
							break;
						case"left":
							g = {
								top : c.top + c.height / 2 - e / 2,
								left : c.left - d
							};
							break;
						case"right":
							g = {
								top : c.top + c.height / 2 - e / 2,
								left : c.left + c.width
							}
					}
					a.css(g).addClass(f).addClass("in")
				}
			},
			setContent : function() {
				var a = this.tip();
				a.find(".tooltip-inner").html(this.getTitle()), a.removeClass("fade in top bottom left right")
			},
			hide : function() {
				function c() {
					var a = setTimeout(function() {
						b.off($.support.transition.end).remove()
					}, 500);
					b.one($.support.transition.end, function() {
						clearTimeout(a), b.remove()
					})
				}

				var a = this, b = this.tip();
				b.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? c() : b.remove()
			},
			fixTitle : function() {
				var a = this.$element;
				(a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
			},
			hasContent : function() {
				return this.getTitle()
			},
			getPosition : function(a) {
				return $.extend({}, a ? {
					top : 0,
					left : 0
				} : this.$element.offset(), {
					width : this.$element[0].offsetWidth,
					height : this.$element[0].offsetHeight
				})
			},
			getTitle : function() {
				var a, b = this.$element, c = this.options;
				return a = b.attr("data-original-title") || ( typeof c.title == "function" ? c.title.call(b[0]) : c.title), a = (a || "").toString().replace(/(^\s*|\s*$)/, ""), a
			},
			tip : function() {
				return this.$tip = this.$tip || $(this.options.template)
			},
			validate : function() {
				this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
			},
			enable : function() {
				this.enabled = !0
			},
			disable : function() {
				this.enabled = !1
			},
			toggleEnabled : function() {
				this.enabled = !this.enabled
			},
			toggle : function() {
				this[this.tip().hasClass("in")?"hide":"show"]()
			}
		}, $.fn.tooltip = function(b) {
			return this.each(function() {
				var c = $(this), d = c.data("tooltip"), e = typeof b == "object" && b;
				d || c.data("tooltip", d = new a(this, e)), typeof b == "string" && d[b]()
			})
		}, $.fn.tooltip.Constructor = a, $.fn.tooltip.defaults = {
			animation : !0,
			delay : 0,
			selector : !1,
			placement : "top",
			trigger : "hover",
			title : "",
			template : '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		}
	}(window.jQuery)
});
define("app/ui/tooltips", ["module", "require", "exports", "core/component", "$lib/bootstrap_tooltip.js"], function(module, require, exports) {
	function tooltips() {
		this.defaultAttrs({
			tooltipSelector : ".js-tooltip"
		}), this.hide = function() {
			this.select("tooltipSelector").tooltip("hide")
		}, this.after("initialize", function() {
			this.$node.tooltip({
				selector : this.attr.tooltipSelector
			}), this.on(document, "uiBeforePageChanged", this.hide)
		})
	}

	var defineComponent = require("core/component");
	require("$lib/bootstrap_tooltip.js"), module.exports = defineComponent(tooltips)
});
define("app/data/ttft_navigation", ["module", "require", "exports", "core/component", "app/data/scribe_transport"], function(module, require, exports) {
	function ttftNavigate() {
		this.beforeNewPageLoad = function(a, b) {
			this.log("beforeNewPageLoad", a, b), time = {
				beforeNewPageLoad : +(new Date),
				source : {
					page : this.attr.pageName,
					action : this.attr.sectionName,
					path : window.location.pathname
				}
			}
		}, this.afterPageChanged = function(a, b) {
			this.log("afterPageChanged", a, b), time.afterPageChanged = +(new Date), this.fromCache = !!b.fromCache, this.hookTimelineListener(!0), this.timelineListener = setTimeout( function() {
				this.hookTimelineListener(!1), this.report()
			}.bind(this), 1), time.ajaxCount = this.ajaxCountdown = $.active, $.active && this.hookAjaxListener(!0)
		}, this.timelineRefreshRequest = function(a, b) {
			clearTimeout(this.timelineListener), this.hookTimelineListener(!1), b.navigated && (this.listeningForTimeline = !0, this.hookTimelineResults(!0))
		}, this.timelineSuccess = function(a, b) {
			this.log("timelineSuccess", a, b), this.listeningForTimeline = !1, this.hookTimelineResults(!1), time.timelineSuccess = +(new Date), this.report()
		}, this.timelineError = function(a, b) {
			this.log("timelineError", a, b), this.listeningForTimeline = !1, this.hookTimelineResults(!1), this.report()
		}, this.ajaxComplete = function(a, b) {
			--this.ajaxCountdown || (this.log("ajaxComplete", a, b), this.hookAjaxListener(!1), time.ajaxComplete = +(new Date), this.report())
		}, this.report = function() {
			if (this.ajaxCountdown && time.ajaxCount)
				return;
			if (this.listeningForTimeline && !time.timelineSuccess)
				return;
			var a = {
				event_name : "route_time",
				source_page : time.source.page,
				source_action : time.source.action,
				source_path : time.source.path,
				dest_page : this.attr.pageName,
				dest_action : this.attr.sectionName,
				dest_path : window.location.pathname,
				cached : this.fromCache,
				start_time : time.beforeNewPageLoad,
				stream_switch_time : time.afterPageChanged,
				stream_complete_time : time.timelineSuccess || time.afterPageChanged,
				ajax_count : time.ajaxCount
			};
			time.ajaxCount && (a.ajax_complete_time = time.ajaxComplete), this.scribeTransport.send(a, "route_timing"), this.log(a)
		}, this.log = function() {
		}, this.time = function() {
			return time
		}, this.scribeTransport = scribeTransport, this.hookAjaxListener = function(a) {
			this[a?"on":"off"]("ajaxComplete", this.ajaxComplete)
		}, this.hookTimelineListener = function(a) {
			this[a?"on":"off"]("uiTimelineShouldRefresh", this.timelineRefreshRequest)
		}, this.hookTimelineResults = function(a) {
			this[a?"on":"off"]("dataGotMoreTimelineItems", this.timelineSuccess), this[a?"on":"off"]("dataGotMoreTimelineItemsError", this.timelineError)
		}, this.after("initialize", function() {
			this.on("uiBeforeNewPageLoad", this.beforeNewPageLoad), this.on("uiPageChanged", this.afterPageChanged)
		})
	}

	var component = require("core/component"), scribeTransport = require("app/data/scribe_transport");
	module.exports = component(ttftNavigate);
	var time = {}
});
define("app/boot/common", ["module", "require", "exports", "app/utils/params", "app/utils/auth_token", "app/boot/scribing", "app/ui/navigation", "app/data/navigation", "app/ui/language_dropdown", "app/ui/google", "app/ui/impression_cookies", "app/data/promoted_logger", "app/ui/message_drawer", "app/ui/tooltips", "app/data/ttft_navigation", "app/utils/cookie", "app/utils/querystring"], function(module, require, exports) {
	function shimConsole(a) {
		window.console || (window.console = {}), LOG_METHODS.forEach(function(b) {
			if (a || !console[b])
				console[b] = NO_OP
		})
	}

	function getLoginTime() {
		return parseInt(querystring.decode(cookie("twll")).l, 10) || 0
	}

	function verifySession() {
		getLoginTime() !== initialLoginTime && window.location.reload(!0)
	}

	var params = require("app/utils/params"), authToken = require("app/utils/auth_token"), scribing = require("app/boot/scribing"), Navigation = require("app/ui/navigation"), NavigationData = require("app/data/navigation"), LanguageDropdown = require("app/ui/language_dropdown"), GoogleAnalytics = require("app/ui/google"), ImpressionCookies = require("app/ui/impression_cookies"), PromotedLogger = require("app/data/promoted_logger"), MessageDrawer = require("app/ui/message_drawer"), Tooltips = require("app/ui/tooltips"), TTFTNavigation = require("app/data/ttft_navigation");
	cookie = require("app/utils/cookie"), querystring = require("app/utils/querystring");
	var ttftNavigationEnabled = !1, LOG_METHODS = ["log", "warn", "debug", "info"], NO_OP = function() {
	}, initialLoginTime = 0;
	module.exports = function(b) {
		var c = b.environment, d = ["production", "preflight"].indexOf(c) > -1;
		shimConsole(d), authToken.set(b.formAuthenticityToken), ImpressionCookies.attachTo(document), GoogleAnalytics.attachTo(document), scribing(b), PromotedLogger.attachTo(document);
		var e = b.pushState && window.history && history.pushState;
		Navigation.attachTo(document, {
			pushState : e,
			routes : b.routes,
			viewContainer : b.viewContainer
		}), e && NavigationData.attachTo(document, b), Tooltips.attachTo(document), MessageDrawer.attachTo("#message-drawer"), b.loggedIn || LanguageDropdown.attachTo(".js-language-dropdown"), b.initialState && b.initialState.ttft_navigation && ( ttftNavigationEnabled = !0), ttftNavigationEnabled && TTFTNavigation.attachTo(document, {
			pageName : b.pageName,
			sectionName : b.sectionName
		}), b.loggedIn && ( initialLoginTime = getLoginTime(), setInterval(verifySession, 1e4))
	}
});
define("app/ui/with_position", ["module", "require", "exports"], function(module, require, exports) {
	function Position() {
		this.adjacent = function(a, b, c) {
			var d, e;
			c = c || {}, d = e = b.offset(), e.gravity = c.gravity, e.weight = c.weight;
			var f = {
				height : b.outerHeight(),
				width : b.outerWidth()
			}, g = {
				height : a.outerHeight(),
				width : a.outerWidth()
			}, h = {
				height : $(window).height(),
				width : $(window).width()
			}, i = {
				height : $("body").height(),
				width : $("body").width()
			};
			return e.gravity || (e.gravity = "vertical"), "vertical,north,south".indexOf(e.gravity) != -1 && ("right,left,center".indexOf(e.weight) == -1 && (e.weight = d.left > h.width / 2 ? "right" : "left"), e.gravity == "vertical" && (e.gravity = d.top + g.height > $(window).scrollTop() + h.height ? "south" : "north"), c.position == "relative" && ( d = {
				left : 0,
				top : 0
			}, e.left = 0), e.weight == "right" ? e.left = d.left - g.width + f.width : e.weight == "center" && (e.left = d.left - (g.width - f.width) / 2), e.top = e.gravity == "north" ? d.top + f.height : d.top - g.height), "horizontal,east,west".indexOf(e.gravity) != -1 && ("top,bottom,center".indexOf(e.weight) == -1 && (d.top - g.height / 2 < 0 ? e.weight = "top" : d.top + g.height / 2 > Math.max(h.height, i.height) ? e.weight = "bottom" : e.weight = "center"), e.gravity == "horizontal" && (e.gravity = d.left + f.width / 2 > h.width / 2 ? "east" : "west"), c.position == "relative" && ( d = {
				left : 0,
				top : 0
			}, e.top = 0), e.weight == "center" ? e.top = d.top + f.height / 2 - g.height / 2 : e.weight == "bottom" && (e.top = d.top - g.height + f.height), e.left = e.gravity == "west" ? d.left + f.width : d.left - g.width), e
		}
	}
	module.exports = Position
});
define("app/ui/with_scrollbar_width", ["module", "require", "exports"], function(module, require, exports) {
	function ScrollbarWidth() {
		this.calculateScrollbarWidth = function() {
			if ($("#scrollbar-width").length > 0)
				return;
			var a = $('<div class="modal-measure-scrollbar"/>').prependTo($("body")), b = $('<div class="inner"/>').appendTo(a), c = a.width() - b.width();
			a.remove(), $("head").append('<style id="scrollbar-width">        .modal-enabled,        .modal-enabled .global-nav-inner,        .gallery-enabled,        .gallery-enabled .global-nav-inner {          margin-right: ' + c + "px      } </style>")
		}
	}
	module.exports = ScrollbarWidth
});
deferred('$lib/jquery.event.drag.js', function() {
	/*! jquery.event.drag (c) 2010 Three Dub Media - http://threedubmedia.com http://threedubmedia.com/code/license */
	(function($) {
		$.fn.drag = function(a, b, c) {
			var d = typeof a == "string" ? a : "", e = $.isFunction(a) ? a : $.isFunction(b) ? b : null;
			return d.indexOf("drag") !== 0 && ( d = "drag" + d), c = (a == e ? b : c) || {}, e ? this.bind(d, c, e) : this.trigger(d)
		};
		var a = $.event, b = a.special, c = b.drag = {
			defaults : {
				which : 1,
				distance : 0,
				not : ":input",
				handle : null,
				relative : !1,
				drop : !0,
				click : !1
			},
			datakey : "dragdata",
			livekey : "livedrag",
			add : function(b) {
				var d = $.data(this, c.datakey), e = b.data || {};
				d.related += 1, !d.live && b.selector && (d.live = !0, a.add(this, "draginit." + c.livekey, c.delegate)), $.each(c.defaults, function(a, b) {
					e[a] !== undefined && (d[a] = e[a])
				})
			},
			remove : function() {
				$.data(this, c.datakey).related -= 1
			},
			setup : function() {
				if ($.data(this, c.datakey))
					return;
				var b = $.extend({
					related : 0
				}, c.defaults);
				$.data(this, c.datakey, b), a.add(this, "mousedown", c.init, b), this.attachEvent && this.attachEvent("ondragstart", c.dontstart)
			},
			teardown : function() {
				if ($.data(this, c.datakey).related)
					return;
				$.removeData(this, c.datakey), a.remove(this, "mousedown", c.init), a.remove(this, "draginit", c.delegate), c.textselect(!0), this.detachEvent && this.detachEvent("ondragstart", c.dontstart)
			},
			init : function(d) {
				var e = d.data, f;
				if (e.which > 0 && d.which != e.which)
					return;
				if ($(d.target).is(e.not))
					return;
				if (e.handle && !$(d.target).closest(e.handle, d.currentTarget).length)
					return;
				e.propagates = 1, e.interactions = [c.interaction(this, e)], e.target = d.target, e.pageX = d.pageX, e.pageY = d.pageY, e.dragging = null, f = c.hijack(d, "draginit", e);
				if (!e.propagates)
					return;
				return f = c.flatten(f), f && f.length && (e.interactions = [], $.each(f, function() {
					e.interactions.push(c.interaction(this, e))
				})), e.propagates = e.interactions.length, e.drop !== !1 && b.drop && b.drop.handler(d, e), c.textselect(!1), a.add(document, "mousemove mouseup", c.handler, e), !1
			},
			interaction : function(a, b) {
				return {
					drag : a,
					callback : new c.callback,
					droppable : [],
					offset : $(a)[b.relative?"position":"offset"]() || {
						top : 0,
						left : 0
					}
				}
			},
			handler : function(d) {
				var e = d.data;
				switch(d.type) {
					case!e.dragging&&"mousemove":
						if (Math.pow(d.pageX - e.pageX, 2) + Math.pow(d.pageY - e.pageY, 2) < Math.pow(e.distance, 2))
							break;
						d.target = e.target, c.hijack(d, "dragstart", e), e.propagates && (e.dragging = !0);
					case"mousemove":
						if (e.dragging) {
							c.hijack(d, "drag", e);
							if (e.propagates) {
								e.drop !== !1 && b.drop && b.drop.handler(d, e);
								break
							}
							d.type = "mouseup"
						};
					case"mouseup":
						a.remove(document, "mousemove mouseup", c.handler), e.dragging && (e.drop !== !1 && b.drop && b.drop.handler(d, e), c.hijack(d, "dragend", e)), c.textselect(!0), e.click === !1 && e.dragging && ($.event.triggered = !0, setTimeout(function() {
							$.event.triggered = !1
						}, 20), e.dragging = !1)
				}
			},
			delegate : function(b) {
				var d = [], e, f = $.data(this, "events") || {};
				return $.each(f.live || [], function(f, g) {
					if (g.preType.indexOf("drag") !== 0)
						return;
					e = $(b.target).closest(g.selector,b.currentTarget)[0];
					if (!e)
						return;
					a.add(e, g.origType + "." + c.livekey, g.origHandler, g.data), $.inArray(e, d) < 0 && d.push(e)
				}), d.length ? $(d).bind("dragend." + c.livekey, function() {
					a.remove(this, "." + c.livekey)
				}) : !1
			},
			hijack : function(b, d, e, f, g) {
				if (!e)
					return;
				var h = {
					event : b.originalEvent,
					type : b.type
				}, i = d.indexOf("drop") ? "drag" : "drop", j, k = f || 0, l, m, n, o = isNaN(f) ? e.interactions.length : f;
				b.type = d, b.originalEvent = null, e.results = [];
				do
					if ( l = e.interactions[k]) {
						if (d !== "dragend" && l.cancelled)
							continue;
						n = c.properties(b, e, l), l.results = [], $(g || l[i] || e.droppable).each(function(f, g) {
							n.target = g, j = g ? a.handle.call(g, b, n) : null, j === !1 ? (i == "drag" && (l.cancelled = !0, e.propagates -= 1), d == "drop" && (l[i][f] = null)) : d == "dropinit" && l.droppable.push(c.element(j) || g), d == "dragstart" && (l.proxy = $(c.element(j)||l.drag)[0]), l.results.push(j),
							delete b.result;
							if (d !== "dropinit")
								return j
						}), e.results[k] = c.flatten(l.results), d == "dropinit" && (l.droppable = c.flatten(l.droppable)), d == "dragstart" && !l.cancelled && n.update()
					}
				while(++k<o);
				return b.type = h.type, b.originalEvent = h.event, c.flatten(e.results)
			},
			properties : function(a, b, d) {
				var e = d.callback;
				return e.drag = d.drag, e.proxy = d.proxy || d.drag, e.startX = b.pageX, e.startY = b.pageY, e.deltaX = a.pageX - b.pageX, e.deltaY = a.pageY - b.pageY, e.originalX = d.offset.left, e.originalY = d.offset.top, e.offsetX = a.pageX - (b.pageX - e.originalX), e.offsetY = a.pageY - (b.pageY - e.originalY), e.drop = c.flatten((d.drop || []).slice()), e.available = c.flatten((d.droppable || []).slice()), e
			},
			element : function(a) {
				if (a && (a.jquery || a.nodeType == 1))
					return a
			},
			flatten : function(a) {
				return $.map(a, function(a) {
					return a && a.jquery ? $.makeArray(a) : a && a.length ? c.flatten(a) : a
				})
			},
			textselect : function(a) {
				$(document)[a?"unbind":"bind"]("selectstart", c.dontstart).attr("unselectable", a ? "off" : "on").css("MozUserSelect", a ? "" : "none")
			},
			dontstart : function() {
				return !1
			},
			callback : function() {
			}
		};
		c.callback.prototype = {
			update : function() {
				b.drop && this.available.length && $.each(this.available, function(a) {
					b.drop.locate(this, a)
				})
			}
		}, b.draginit = b.dragstart = b.dragend = c
	})(jQuery)
});
define("app/ui/with_dialog", ["module", "require", "exports", "core/compose", "app/ui/with_scrollbar_width", "$lib/jquery.event.drag.js"], function(module, require, exports) {
	function withDialog() {
		compose.mixin(this, [withScrollbarWidth]), this.center = function(a) {
			var b = $(window), c = {
				top : parseInt((b.height() - a.outerHeight()) / 2),
				left : parseInt((b.width() - a.outerWidth()) / 2)
			};
			return $("body.ie6").length && (c.top += b.scrollTop(), c.left += b.scrollLeft()), c
		}, this.windowHeight = function() {
			return $(window).height()
		}, this.scrollTop = function() {
			return $(window).scrollTop()
		}, this.position = function() {
			var a = this.center(this.$dialog);
			this.attr.top && (a.top = this.attr.top), this.attr.left && (a.left = this.attr.left), this.attr.maxTop && (a.top = Math.min(a.top, this.attr.maxTop)), this.attr.maxLeft && (a.left = Math.min(a.left, this.attr.maxLeft)), $("body").attr("dir") === "rtl" ? this.$dialog.css({
				top : a.top,
				right : a.left
			}) : this.$dialog.css({
				top : a.top,
				left : a.left
			}), this.windowHeight() < this.$dialog.outerHeight() ? (this.$dialog.css("position", "absolute"), this.$dialog.css("top", this.scrollTop() + "px")) : this.attr.fixed === !1 && this.$dialog.css("top", a.top + this.scrollTop())
		}, this.resize = function() {
			this.attr.width && this.$dialog.css("width", this.attr.width), this.attr.height && this.$dialog.css("height", this.attr.height)
		}, this.applyDraggability = function() {
			if (!this.$dialog.hasClass("draggable"))
				return;
			var a = this, b = {
				relative : !0,
				handle : ".modal-header"
			}, c = function(a, b) {
				$("body").attr("dir") === "rtl" ? this.$dialog.css({
					top : b.offsetY,
					right : b.originalX - b.deltaX
				}) : this.$dialog.css({
					top : b.offsetY,
					left : b.offsetX
				})
			};
			this.$dialog.drag("start", function() {
				a.$dialog.addClass("unselectable"), $("#doc").addClass("unselectable")
			}), this.$dialog.drag("end", function() {
				a.$dialog.removeClass("unselectable"), $("#doc").removeClass("unselectable")
			}), this.$dialog.drag(c.bind(this), b)
		}, this.setFocus = function() {
			var a = this.$dialog.find(".primary-btn");
			a.length && !a.attr("disabled") && a.focus()
		}, this.isOpen = function() {
			return this.$dialogContainer.is(":visible")
		}, this.dialogVisible = function() {
			this.trigger("uiDialogFadeInComplete")
		}, this.open = function() {
			this.isOpen() || (this.$dialogContainer.fadeIn("fast", this.dialogVisible.bind(this)), this.calculateScrollbarWidth(), $("body").addClass("modal-enabled"), this.resize(), this.position(), this.applyDraggability(), this.setFocus(), this.trigger("uiDialogOpened"))
		}, this.afterClose = function() {
			$(".modal-container:visible").length || $("body").removeClass("modal-enabled"), this.trigger("uiDialogHidden")
		}, this.closeRequested = function(a) {
			this.trigger("uiDialogCloseRequested"), this.close(a)
		}, this.close = function(a) {
			if (!this.isOpen())
				return;
			a && a.preventDefault(), this.$dialogContainer.fadeOut("fast", this.afterClose.bind(this)), this.trigger("uiDialogClosed")
		}, this.triggerClicked = function(a) {
			a.preventDefault(), this.open()
		}, this.after("initialize", function() {
			this.$dialogContainer = this.$dialog || this.$node, this.$dialog = this.$dialogContainer.find("div.modal"), this.attr.closeSelector = this.attr.closeSelector || ".modal-close, .close-modal-background-target", this.on(this.select("closeSelector"), "click", this.closeRequested), this.on(document, "uiShortcutEsc", this.closeRequested), this.on(document, "uiCloseDialog", this.closeRequested), this.on(document, "uiBeforePageChanged", this.close), this.attr.triggerSelector && this.on(this.attr.triggerSelector, "click", this.triggerClicked)
		})
	}

	var compose = require("core/compose"), withScrollbarWidth = require("app/ui/with_scrollbar_width");
	require("$lib/jquery.event.drag.js"), module.exports = withDialog
});
define("app/ui/dialogs/signin_or_signup", ["module", "require", "exports", "core/component", "app/ui/with_position", "app/ui/with_dialog"], function(module, require, exports) {
	function signinOrSignupDialog() {
		this.defaultAttrs({
			dialogSelector : "#signin-or-signup"
		}), this.openSigninDialog = function(a, b) {
			b.signUpOnly ? (this.$node.addClass("signup-only-dialog"), this.select("dialogSelector").addClass("signup-only").removeClass("not-signup-only")) : (this.$node.removeClass("signup-only-dialog"), this.select("dialogSelector").addClass("not-signup-only").removeClass("signup-only")), this.open(), this.trigger("uiSigninOrSignupDialogOpened")
		}, this.notifyClosed = function() {
			this.trigger("uiSigninOrSignupDialogClosed")
		}, this.after("initialize", function(a) {
			this.$dialog = this.select("dialogSelector"), this.$dialog.find("form.signup").bind("submit", function() {
				this.trigger("uiSignupButtonClicked")
			}.bind(this)), this.on(document, "uiOpenSigninOrSignupDialog", this.openSigninDialog), this.on(document, "uiCloseSigninOrSignupDialog", this.close), this.on(this.$node, "uiDialogClosed", this.notifyClosed)
		})
	}

	var defineComponent = require("core/component"), withPosition = require("app/ui/with_position"), withDialog = require("app/ui/with_dialog"), SigninOrSignupDialog = defineComponent(signinOrSignupDialog, withDialog, withPosition);
	module.exports = SigninOrSignupDialog
});
define("app/ui/forms/input_with_placeholder", ["module", "require", "exports", "core/component"], function(module, require, exports) {
	function inputWithPlaceholder() {
		this.defaultAttrs({
			hidePlaceholderClassName : "hasome",
			placeholder : ".holder",
			elementType : "input"
		}), this.focusInput = function(a) {
			this.$input.focus()
		}, this.inputBlurred = function(a) {
			this.$input.val() == "" && this.$node.removeClass(this.attr.hidePlaceholderClassName)
		}, this.inputChanged = function(a) {
			this.$node.addClass(this.attr.hidePlaceholderClassName)
		}, this.after("initialize", function() {
			this.$input = this.$node.find(this.attr.elementType);
			if (this.$input.length != 1)
				throw new Error("InputWithPlaceholder must be attached to a container with exactly one input element inside of it");
			this.$placeholder = this.select("placeholder");
			if (this.$placeholder.length != 1)
				throw new Error("InputWithPlaceholder must be attached to a container with exactly one placeholder element inside of it");
			this.on(this.$input, "blur", this.inputBlurred), this.on(this.$input, "keydown paste", this.inputChanged), this.on(this.$placeholder, "click", this.focusInput), this.$input.val() && this.inputChanged()
		})
	}

	var defineComponent = require("core/component"), InputWithPlaceholder = defineComponent(inputWithPlaceholder);
	module.exports = InputWithPlaceholder
});
define("app/ui/signup_call_out", ["module", "require", "exports", "core/component"], function(module, require, exports) {
	function signupCallOut() {
		this.after("initialize", function() {
			this.$node.bind("submit", function() {
				this.trigger("uiSignupButtonClicked")
			}.bind(this))
		})
	}

	var defineComponent = require("core/component"), SignupCallOut = defineComponent(signupCallOut);
	module.exports = SignupCallOut
});
define("app/data/signup_click_scribe", ["module", "require", "exports", "core/component", "app/data/with_scribe"], function(module, require, exports) {
	function loggedOutScribe() {
		this.scribeSignupClick = function(a, b) {
			this.scribe({
				action : "signup_click"
			}, b)
		}, this.scribeSigninOrSignupDialogOpened = function(a, b) {
			this.scribe({
				action : "open"
			}, b)
		}, this.scribeSigninOrSignupDialogClosed = function(a, b) {
			this.scribe({
				action : "close"
			}, b)
		}, this.after("initialize", function() {
			this.on("uiSignupButtonClicked", this.scribeSignupClick), this.on("uiSigninOrSignupDialogOpened", this.scribeSigninOrSignupDialogOpened), this.on("uiSigninOrSignupDialogClosed", this.scribeSigninOrSignupDialogClosed)
		})
	}

	var defineComponent = require("core/component"), withScribe = require("app/data/with_scribe");
	module.exports = defineComponent(loggedOutScribe, withScribe)
});
define("app/boot/logged_out", ["module", "require", "exports", "app/ui/dialogs/signin_or_signup", "app/ui/forms/input_with_placeholder", "app/ui/signup_call_out", "app/data/signup_click_scribe"], function(module, require, exports) {
	var SigninOrSignupDialog = require("app/ui/dialogs/signin_or_signup"), InputWithPlaceholder = require("app/ui/forms/input_with_placeholder"), SignupCallOut = require("app/ui/signup_call_out"), LoggedOutScribe = require("app/data/signup_click_scribe");
	module.exports = function(b) {
		InputWithPlaceholder.attachTo("#signin-or-signup-dialog .holding, .profile-signup-call-out .holding, .search-signup-call-out .holding"), SigninOrSignupDialog.attachTo("#signin-or-signup-dialog", {
			eventData : {
				scribeContext : {
					component : "auth_dialog",
					element : "unauth_follow"
				}
			}
		}), SignupCallOut.attachTo(".signup-call-out form.signup", {
			eventData : {
				scribeContext : {
					component : "signup_callout",
					element : "form"
				}
			}
		}), LoggedOutScribe.attachTo(document)
	}
});
define("app/utils/ttft", ["module", "require", "exports", "app/data/scribe_transport"], function(module, require, exports) {
	function scribeTTFTData(a, b) {
		if (!recorded && window.performance && a) {
			recorded = !0;
			var c = a;
			c.did_load = b, c.web_timings = $.extend({}, window.performance.timing), c.web_timings.toJSON &&
			delete c.web_timings.toJSON, c.navigation = {
				type : window.performance.navigation.type,
				redirectCount : window.performance.navigation.redirectCount
			}, c.referrer = document.referrer, scribeTransport.send(c, "swift_time_to_first_tweet", !1), using("app/utils/params", function(a) {
				if (a.fromQuery(window.location).show_ttft) {
					var b = c.web_timings;
					$(document).trigger("uiShowError", {
						message : "<table width=80%><thead><th>milestone<th>time<th>cumulative</thead><tbody><tr><td>connect:       <td>" + (b.connectEnd - b.navigationStart) + "<td>" + (b.connectEnd - b.navigationStart) + "</tr>" + "<tr><td>process:       <td>" + (b.responseStart - b.connectEnd) + "<td>" + (b.responseStart - b.navigationStart) + "</tr>" + "<tr><td>response:      <td>" + (b.responseEnd - b.responseStart) + "<td>" + (b.responseEnd - b.navigationStart) + "</tr>" + "<tr><td>render:        <td>" + (c.client_record_time - b.responseEnd) + "<td>" + (c.client_record_time - b.navigationStart) + "</tr>" + "<tr><td>interactivity: <td>" + (c.aq_empty_time - c.client_record_time) + "<td>" + (c.aq_empty_time - b.navigationStart) + "</tr>" + "<tr><td>ajax_complete: <td>" + (c.ajax_complete_time - c.aq_empty_time) + "<td>" + (c.ajax_complete_time - b.navigationStart) + "</tr>" + "<tr><td>ajax_count:    <td>" + c.ajax_count + "</tr>" + "</tbody></table>"
					})
				}
			});
			try {
				delete window.ttft
			} catch(d) {
				window.ttft = undefined
			}
		}
	}

	function scribeMilestones(a) {
		if (!window.ttftData)
			return;
		var b = !0;
		for (var c = 0; c < requiredMilestones.length; ++c)
			if (!(requiredMilestones[c] in window.ttftData)) {
				b = !1;
				break
			}
		(a || b) && scribeTTFTData(window.ttftData, b)
	}

	function onAjaxComplete(a, b, c) {
		if (c && c.url in newAjaxRequests)
			for (var d = 0; d < newAjaxRequests[c.url].length; d++)
				if (c === newAjaxRequests[c.url][d]) {
					newAjaxRequests[c.url].splice(d, 1);
					return
				}
		pendingAjaxCount--;
		if (pendingAjaxCount == 0 || $.active == 0)
			unbindAjaxHandlers(), recordPendingAjaxComplete()
	}

	function onAjaxSend(a, b, c) {
		c && c.url && (newAjaxRequests[c.url] || (newAjaxRequests[c.url] = []), newAjaxRequests[c.url].push(c))
	}

	function recordPendingAjaxComplete() {
		recordMilestone("ajax_complete_time", (new Date).getTime())
	}

	function bindAjaxHandlers() {
		$(document).bind("ajaxComplete", onAjaxComplete), $(document).bind("ajaxSend", onAjaxSend)
	}

	function unbindAjaxHandlers() {
		$(document).unbind("ajaxComplete", onAjaxComplete), $(document).unbind("ajaxSend", onAjaxSend)
	}

	function startAjaxTracking() {
		startingAjaxCount = pendingAjaxCount = $.active, recordMilestone("ajax_count", startingAjaxCount), startingAjaxCount == 0 ? recordPendingAjaxComplete() : (unbindAjaxHandlers(), bindAjaxHandlers())
	}

	function recordMilestone(a, b) {
		window.ttftData && !window.ttftData[a] && (window.ttftData[a] = b), scribeMilestones(!1)
	}

	var scribeTransport = require("app/data/scribe_transport"), recorded = !1, requiredMilestones = ["page", "client_record_time", "aq_empty_time", "ajax_complete_time", "ajax_count"], startingAjaxCount = 0, pendingAjaxCount = 0, newAjaxRequests = {};
	window.ttft = {
		recordMilestone : recordMilestone
	}, scribeMilestones(!1), setTimeout(function() {
		scribeMilestones(!0)
	}, 45e3), module.exports = {
		startAjaxTracking : startAjaxTracking
	}
}); 