(function() {
	function a() {
		document.write = "";
		window.top.location = window.self.location;
		setTimeout(function() {
			document.body.innerHTML = ""
		}, 0);
		window.self.onload = function(a) {
			document.body.innerHTML = ""
		}
	}

	if (window.top !== window.self)
		try {
			window.top.location.host || a()
		} catch(b) {
			a()
		}
})();
/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(a, b) {
	function H(a) {
		var b = G[a] = {};
		q.each(a.split(t), function(_, a) {
			b[a] = !0
		});
		return b
	}

	function K(a, c, d) {
		if (d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(J, "-$1").toLowerCase();
			d = a.getAttribute(e);
			if ( typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : I.test(d) ? q.parseJSON(d) : d
				} catch(f) {
				}
				q.data(a, c, d)
			} else
				d = b
		}
		return d
	}

	function L(a) {
		var b;
		for (b in a) {
			if (b === "data" && q.isEmptyObject(a[b]))
				continue;
			if (b !== "toJSON")
				return !1
		}
		return !0
	}

	function db() {
		return !1
	}

	function eb() {
		return !0
	}

	function kb(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}

	function lb(a, b) {
		do
			a = a[b];
		while(a&&a.nodeType!==1);
		return a
	}

	function mb(a, b, c) {
		b = b || 0;
		if (q.isFunction(b))
			return q.grep(a, function(a, d) {
				var e = !!b.call(a, d, a);
				return e === c
			});
		if (b.nodeType)
			return q.grep(a, function(a, d) {
				return a === b === c
			});
		if ( typeof b == "string") {
			var d = q.grep(a, function(a) {
				return a.nodeType === 1
			});
			if (hb.test(b))
				return q.filter(b, d, !c);
			b = q.filter(b, d)
		}
		return q.grep(a, function(a, d) {
			return q.inArray(a, b) >= 0 === c
		})
	}

	function nb(a) {
		var b = ob.split("|"), c = a.createDocumentFragment();
		if (c.createElement)
			while (b.length)
			c.createElement(b.pop());
		return c
	}

	function Fb(a, b) {
		return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
	}

	function Gb(a, b) {
		if (b.nodeType !== 1 || !q.hasData(a))
			return;
		var c, d, e, f = q._data(a), g = q._data(b, f), i = f.events;
		if (i) {
			delete g.handle;
			g.events = {};
			for (c in i)
			for ( d = 0, e = i[c].length; d < e; d++)
				q.event.add(b, c, i[c][d])
		}
		g.data && (g.data = q.extend({}, g.data))
	}

	function Hb(a, b) {
		var c;
		if (b.nodeType !== 1)
			return;
		b.clearAttributes && b.clearAttributes();
		b.mergeAttributes && b.mergeAttributes(a);
		c = b.nodeName.toLowerCase();
		if (c === "object") {
			b.parentNode && (b.outerHTML = a.outerHTML);
			q.support.html5Clone && a.innerHTML && !q.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)
		} else if (c === "input" && yb.test(a.type)) {
			b.defaultChecked = b.checked = a.checked;
			b.value !== a.value && (b.value = a.value)
		} else
			c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text);
		b.removeAttribute(q.expando)
	}

	function Ib(a) {
		return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
	}

	function Jb(a) {
		yb.test(a.type) && (a.defaultChecked = a.checked)
	}

	function _b(a, b) {
		if ( b in a)
			return b;
		var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Zb.length;
		while (e--) {
			b = Zb[e] + c;
			if ( b in a)
				return b
		}
		return d
	}

	function ac(a, b) {
		a = b || a;
		return q.css(a, "display") === "none" || !q.contains(a.ownerDocument, a)
	}

	function bc(a, b) {
		var c, d, e = [], f = 0, g = a.length;
		for (; f < g; f++) {
			c = a[f];
			if (!c.style)
				continue;
			e[f] = q._data(c, "olddisplay");
			if (b) {
				!e[f] && c.style.display === "none" && (c.style.display = "");
				c.style.display === "" && ac(c) && (e[f] = q._data(c, "olddisplay", fc(c.nodeName)))
			} else {
				d = Kb(c, "display");
				!e[f] && d !== "none" && q._data(c, "olddisplay", d)
			}
		}
		for ( f = 0; f < g; f++) {
			c = a[f];
			if (!c.style)
				continue;
			if (!b || c.style.display === "none" || c.style.display === "")
				c.style.display = b ? e[f] || "" : "none"
		}
		return a
	}

	function cc(a, b, c) {
		var d = Sb.exec(b);
		return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
	}

	function dc(a, b, c, d) {
		var e = c === ( d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0;
		for (; e < 4; e += 2) {
			c === "margin" && (f += q.css(a, c + Yb[e], !0));
			if (d) {
				c === "content" && (f -= parseFloat(Kb(a, "padding" + Yb[e])) || 0);
				c !== "margin" && (f -= parseFloat(Kb(a, "border" + Yb[e] + "Width")) || 0)
			} else {
				f += parseFloat(Kb(a, "padding" + Yb[e])) || 0;
				c !== "padding" && (f += parseFloat(Kb(a, "border" + Yb[e] + "Width")) || 0)
			}
		}
		return f
	}

	function ec(a, b, c) {
		var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = q.support.boxSizing && q.css(a, "boxSizing") === "border-box";
		if (d <= 0 || d == null) {
			d = Kb(a, b);
			if (d < 0 || d == null)
				d = a.style[b];
			if (Tb.test(d))
				return d;
			e = f && (q.support.boxSizingReliable || d === a.style[b]);
			d = parseFloat(d) || 0
		}
		return d + dc(a, b, c || ( f ? "border" : "content"), e) + "px"
	}

	function fc(a) {
		if (Vb[a])
			return Vb[a];
		var b = q("<" + a + ">").appendTo(e.body), c = b.css("display");
		b.remove();
		if (c === "none" || c === "") {
			Lb = e.body.appendChild(Lb || q.extend(e.createElement("iframe"), {
				frameBorder : 0,
				width : 0,
				height : 0
			}));
			if (!Mb || !Lb.createElement) {
				Mb = (Lb.contentWindow || Lb.contentDocument).document;
				Mb.write("<!doctype html><html><body>");
				Mb.close()
			}
			b = Mb.body.appendChild(Mb.createElement(a));
			c = Kb(b, "display");
			e.body.removeChild(Lb)
		}
		Vb[a] = c;
		return c
	}

	function lc(a, b, c, d) {
		var e;
		if (q.isArray(b))
			q.each(b, function(b, e) {
				c || hc.test(a) ? d(a, e) : lc(a + "[" + ( typeof e == "object" ? b : "") + "]", e, c, d)
			});
		else if (!c && q.type(b) === "object")
			for (e in b)lc(a + "[" + e + "]", b[e], c, d);
		else
			d(a, b)
	}

	function Cc(a) {
		return function(b, c) {
			if ( typeof b != "string") {
				c = b;
				b = "*"
			}
			var d, e, f, g = b.toLowerCase().split(t), i = 0, j = g.length;
			if (q.isFunction(c))
				for (; i < j; i++) {
					d = g[i];
					f = /^\+/.test(d);
					f && ( d = d.substr(1) || "*");
					e = a[d] = a[d] || [];
					e[f?"unshift":"push"](c)
				}
		}
	}

	function Dc(a, c, d, e, f, g) {
		f = f || c.dataTypes[0];
		g = g || {};
		g[f] = !0;
		var i, j = a[f], k = 0, l = j ? j.length : 0, m = a === yc;
		for (; k < l && (m || !i); k++) {
			i = j[k](c, d, e);
			if ( typeof i == "string")
				if (!m || g[i])
					i = b;
				else {
					c.dataTypes.unshift(i);
					i = Dc(a, c, d, e, i, g)
				}
		}
		(m || !i) && !g["*"] && ( i = Dc(a, c, d, e, "*", g));
		return i
	}

	function Ec(a, c) {
		var d, e, f = q.ajaxSettings.flatOptions || {};
		for (d in c)c[d] !== b && ((f[d]?a:e||(e={}))[d] = c[d]);
		e && q.extend(!0, a, e)
	}

	function Fc(a, c, d) {
		var e, f, g, i, j = a.contents, k = a.dataTypes, l = a.responseFields;
		for (f in l) f in d && (c[l[f]] = d[f]);
		while (k[0] === "*") {
			k.shift();
			e === b && ( e = a.mimeType || c.getResponseHeader("content-type"))
		}
		if (e)
			for (f in j)
			if (j[f] && j[f].test(e)) {
				k.unshift(f);
				break
			}
		if (k[0] in d)
			g = k[0];
		else {
			for (f in d) {
				if (!k[0] || a.converters[f + " " + k[0]]) {
					g = f;
					break
				}
				i || ( i = f)
			}
			g = g || i
		}
		if (g) {
			g !== k[0] && k.unshift(g);
			return d[g]
		}
	}

	function Gc(a, b) {
		var c, d, e, f, g = a.dataTypes.slice(), i = g[0], j = {}, k = 0;
		a.dataFilter && ( b = a.dataFilter(b, a.dataType));
		if (g[1])
			for (c in a.converters)
			j[c.toLowerCase()] = a.converters[c];
		for (; e = g[++k]; )
			if (e !== "*") {
				if (i !== "*" && i !== e) {
					c = j[i + " " + e] || j["* " + e];
					if (!c)
						for (d in j) {
							f = d.split(" ");
							if (f[1] === e) {
								c = j[i + " " + f[0]] || j["* " + f[0]];
								if (c) {
									if (c === !0)
										c = j[d];
									else if (j[d] !== !0) {
										e = f[0];
										g.splice(k--, 0, e)
									}
									break
								}
							}
						}
					if (c !== !0)
						if (c && a["throws"])
							b = c(b);
						else
							try {
								b = c(b)
							} catch(l) {
								return {
									state : "parsererror",
									error : c ? l : "No conversion from " + i + " to " + e
								}
							}
				}
				i = e
			}
		return {
			state : "success",
			data : b
		}
	}

	function Oc() {
		try {
			return new a.XMLHttpRequest
		} catch(b) {
		}
	}

	function Pc() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch(b) {
		}
	}

	function Xc() {
		setTimeout(function() {
			Qc = b
		}, 0);
		return Qc = q.now()
	}

	function Yc(a, b) {
		q.each(b, function(b, c) {
			var d = (Wc[b] || []).concat(Wc["*"]), e = 0, f = d.length;
			for (; e < f; e++)
				if (d[e].call(a, b, c))
					return
		})
	}

	function Zc(a, b, c) {
		var d, e = 0, f = 0, g = Vc.length, i = q.Deferred().always(function() {
			delete j.elem
		}), j = function() {
			var b = Qc || Xc(), c = Math.max(0, k.startTime + k.duration - b), d = c / k.duration || 0, e = 1 - d, f = 0, g = k.tweens.length;
			for (; f < g; f++)
				k.tweens[f].run(e);
			i.notifyWith(a, [k, e, c]);
			if (e < 1 && g)
				return c;
			i.resolveWith(a, [k]);
			return !1
		}, k = i.promise({
			elem : a,
			props : q.extend({}, b),
			opts : q.extend(!0, {
				specialEasing : {}
			}, c),
			originalProperties : b,
			originalOptions : c,
			startTime : Qc || Xc(),
			duration : c.duration,
			tweens : [],
			createTween : function(b, c, d) {
				var e = q.Tween(a, k.opts, b, c, k.opts.specialEasing[b] || k.opts.easing);
				k.tweens.push(e);
				return e
			},
			stop : function(b) {
				var c = 0, d = b ? k.tweens.length : 0;
				for (; c < d; c++)
					k.tweens[c].run(1);
				b ? i.resolveWith(a, [k, b]) : i.rejectWith(a, [k, b]);
				return this
			}
		}), l = k.props;
		$c(l, k.opts.specialEasing);
		for (; e < g; e++) {
			d = Vc[e].call(k, a, l, k.opts);
			if (d)
				return d
		}
		Yc(k, l);
		q.isFunction(k.opts.start) && k.opts.start.call(a, k);
		q.fx.timer(q.extend(j, {
			anim : k,
			queue : k.opts.queue,
			elem : a
		}));
		return k.progress(k.opts.progress).done(k.opts.done, k.opts.complete).fail(k.opts.fail).always(k.opts.always)
	}

	function $c(a, b) {
		var c, d, e, f, g;
		for (c in a) {
			d = q.camelCase(c);
			e = b[d];
			f = a[c];
			if (q.isArray(f)) {
				e = f[1];
				f = a[c] = f[0]
			}
			if (c !== d) {
				a[d] = f;
				delete a[c]
			}
			g = q.cssHooks[d];
			if (g && "expand" in g) {
				f = g.expand(f);
				delete a[d];
				for (c in f)
				if (!( c in a)) {
					a[c] = f[c];
					b[c] = e
				}
			} else
				b[d] = e
		}
	}

	function _c(a, b, c) {
		var d, e, f, g, i, j, k, l, m, n = this, o = a.style, p = {}, r = [], s = a.nodeType && ac(a);
		if (!c.queue) {
			l = q._queueHooks(a, "fx");
			if (l.unqueued == null) {
				l.unqueued = 0;
				m = l.empty.fire;
				l.empty.fire = function() {
					l.unqueued || m()
				}
			}
			l.unqueued++;
			n.always(function() {
				n.always(function() {
					l.unqueued--;
					q.queue(a, "fx").length || l.empty.fire()
				})
			})
		}
		if (a.nodeType === 1 && ("height" in b || "width" in b)) {
			c.overflow = [o.overflow, o.overflowX, o.overflowY];
			q.css(a, "display") === "inline" && q.css(a, "float") === "none" && (!q.support.inlineBlockNeedsLayout || fc(a.nodeName) === "inline" ? o.display = "inline-block" : o.zoom = 1)
		}
		if (c.overflow) {
			o.overflow = "hidden";
			q.support.shrinkWrapBlocks || n.done(function() {
				o.overflow = c.overflow[0];
				o.overflowX = c.overflow[1];
				o.overflowY = c.overflow[2]
			})
		}
		for (d in b) {
			f = b[d];
			if (Sc.exec(f)) {
				delete b[d];
				j = j || f === "toggle";
				if (f === ( s ? "hide" : "show"))
					continue;
				r.push(d)
			}
		}
		g = r.length;
		if (g) {
			i = q._data(a, "fxshow") || q._data(a, "fxshow", {});
			"hidden" in i && ( s = i.hidden);
			j && (i.hidden = !s);
			s ? q(a).show() : n.done(function() {
				q(a).hide()
			});
			n.done(function() {
				var b;
				q.removeData(a, "fxshow", !0);
				for (b in p)
				q.style(a, b, p[b])
			});
			for ( d = 0; d < g; d++) {
				e = r[d];
				k = n.createTween(e, s ? i[e] : 0);
				p[e] = i[e] || q.style(a, e);
				if (!( e in i)) {
					i[e] = k.start;
					if (s) {
						k.end = k.start;
						k.start = e === "width" || e === "height" ? 1 : 0
					}
				}
			}
		}
	}

	function ad(a, b, c, d, e) {
		return new ad.prototype
		.init(a, b, c, d, e)
	}

	function bd(a, b) {
		var c, d = {
			height : a
		}, e = 0;
		b = b ? 1 : 0;
		for (; e < 4; e += 2 - b) {
			c = Yb[e];
			d["margin" + c] = d["padding" + c] = a
		}
		b && (d.opacity = d.width = a);
		return d
	}

	function dd(a) {
		return q.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
	}

	var c, d, e = a.document, f = a.location, g = a.navigator, i = a.jQuery, j = a.$, k = Array.prototype.push, l = Array.prototype.slice, m = Array.prototype.indexOf, n = Object.prototype.toString, o = Object.prototype.hasOwnProperty, p = String.prototype.trim, q = function(a, b) {
		return new q.fn.init(a, b, c)
	}, r = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, s = /\S/, t = /\s+/, u = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, v = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, x = /^[\],:{}\s]*$/, y = /(?:^|:|,)(?:\s*\[)+/g, z = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, B = /^-ms-/, C = /-([\da-z])/gi, D = function(a, b) {
		return (b + "").toUpperCase()
	}, E = function() {
		if (e.addEventListener) {
			e.removeEventListener("DOMContentLoaded", E, !1);
			q.ready()
		} else if (e.readyState === "complete") {
			e.detachEvent("onreadystatechange", E);
			q.ready()
		}
	}, F = {};
	q.fn = q.prototype = {
		constructor : q,
		init : function(a, c, d) {
			var f, g, i, j;
			if (!a)
				return this;
			if (a.nodeType) {
				this.context = this[0] = a;
				this.length = 1;
				return this
			}
			if ( typeof a == "string") {
				a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = v.exec(a);
				if (f && (f[1] || !c)) {
					if (f[1]) {
						c = c instanceof q ? c[0] : c;
						j = c && c.nodeType ? c.ownerDocument || c : e;
						a = q.parseHTML(f[1], j, !0);
						w.test(f[1]) && q.isPlainObject(c) && this.attr.call(a, c, !0);
						return q.merge(this, a)
					}
					g = e.getElementById(f[2]);
					if (g && g.parentNode) {
						if (g.id !== f[2])
							return d.find(a);
						this.length = 1;
						this[0] = g
					}
					this.context = e;
					this.selector = a;
					return this
				}
				return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
			}
			if (q.isFunction(a))
				return d.ready(a);
			if (a.selector !== b) {
				this.selector = a.selector;
				this.context = a.context
			}
			return q.makeArray(a, this)
		},
		selector : "",
		jquery : "1.8.3",
		length : 0,
		size : function() {
			return this.length
		},
		toArray : function() {
			return l.call(this)
		},
		get : function(a) {
			return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
		},
		pushStack : function(a, b, c) {
			var d = q.merge(this.constructor(), a);
			d.prevObject = this;
			d.context = this.context;
			b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
			return d
		},
		each : function(a, b) {
			return q.each(this, a, b)
		},
		ready : function(a) {
			q.ready.promise().done(a);
			return this
		},
		eq : function(a) {
			a = +a;
			return a === -1 ? this.slice(a) : this.slice(a, a + 1)
		},
		first : function() {
			return this.eq(0)
		},
		last : function() {
			return this.eq(-1)
		},
		slice : function() {
			return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
		},
		map : function(a) {
			return this.pushStack(q.map(this, function(b, c) {
				return a.call(b, c, b)
			}))
		},
		end : function() {
			return this.prevObject || this.constructor(null)
		},
		push : k,
		sort : [].sort,
		splice : [].splice
	};
	q.fn.init.prototype = q.fn;
	q.extend = q.fn.extend = function() {
		var a, c, d, e, f, g, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
		if ( typeof i == "boolean") {
			l = i;
			i = arguments[1] || {};
			j = 2
		}
		typeof i != "object" && !q.isFunction(i) && ( i = {});
		if (k === j) {
			i = this; --j
		}
		for (; j < k; j++)
			if (( a = arguments[j]) != null)
				for (c in a) {
					d = i[c];
					e = a[c];
					if (i === e)
						continue;
					if (l && e && (q.isPlainObject(e) || ( f = q.isArray(e)))) {
						if (f) {
							f = !1;
							g = d && q.isArray(d) ? d : []
						} else
							g = d && q.isPlainObject(d) ? d : {};
						i[c] = q.extend(l, g, e)
					} else
						e !== b && (i[c] = e)
				}
		return i
	};
	q.extend({
		noConflict : function(b) {
			a.$ === q && (a.$ = j);
			b && a.jQuery === q && (a.jQuery = i);
			return q
		},
		isReady : !1,
		readyWait : 1,
		holdReady : function(a) {
			a ? q.readyWait++ : q.ready(!0)
		},
		ready : function(a) {
			if (a === !0 ? --q.readyWait : q.isReady)
				return;
			if (!e.body)
				return setTimeout(q.ready, 1);
			q.isReady = !0;
			if (a !== !0 && --q.readyWait > 0)
				return;
			d.resolveWith(e, [q]);
			q.fn.trigger && q(e).trigger("ready").off("ready")
		},
		isFunction : function(a) {
			return q.type(a) === "function"
		},
		isArray : Array.isArray ||
		function(a) {
			return q.type(a) === "array"
		},
		isWindow : function(a) {
			return a != null && a == a.window
		},
		isNumeric : function(a) {
			return !isNaN(parseFloat(a)) && isFinite(a)
		},
		type : function(a) {
			return a == null ? String(a) : F[n.call(a)] || "object"
		},
		isPlainObject : function(a) {
			if (!a || q.type(a) !== "object" || a.nodeType || q.isWindow(a))
				return !1;
			try {
				if (a.constructor && !o.call(a, "constructor") && !o.call(a.constructor.prototype, "isPrototypeOf"))
					return !1
			} catch(c) {
				return !1
			}
			var d;
			for (d in a);
			return d === b || o.call(a, d)
		},
		isEmptyObject : function(a) {
			var b;
			for (b in a)
			return !1;
			return !0
		},
		error : function(a) {
			throw new Error(a)
		},
		parseHTML : function(a, b, c) {
			var d;
			if (!a || typeof a != "string")
				return null;
			if ( typeof b == "boolean") {
				c = b;
				b = 0
			}
			b = b || e;
			if ( d = w.exec(a))
				return [b.createElement(d[1])];
			d = q.buildFragment([a], b, c ? null : []);
			return q.merge([], (d.cacheable ? q.clone(d.fragment) : d.fragment).childNodes)
		},
		parseJSON : function(b) {
			if (!b || typeof b != "string")
				return null;
			b = q.trim(b);
			if (a.JSON && a.JSON.parse)
				return a.JSON.parse(b);
			if (x.test(b.replace(z, "@").replace(A, "]").replace(y, "")))
				return (new Function("return " + b))();
			q.error("Invalid JSON: " + b)
		},
		parseXML : function(c) {
			var d, e;
			if (!c || typeof c != "string")
				return null;
			try {
				if (a.DOMParser) {
					e = new DOMParser;
					d = e.parseFromString(c, "text/xml")
				} else {
					d = new ActiveXObject("Microsoft.XMLDOM");
					d.async = "false";
					d.loadXML(c)
				}
			} catch(f) {
				d = b
			}
			(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && q.error("Invalid XML: " + c);
			return d
		},
		noop : function() {
		},
		globalEval : function(b) {
			b && s.test(b) && (a.execScript ||
			function(b) {
				a.eval.call(a, b)
			})(b)
		},
		camelCase : function(a) {
			return a.replace(B, "ms-").replace(C, D)
		},
		nodeName : function(a, b) {
			return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
		},
		each : function(a, c, d) {
			var e, f = 0, g = a.length, i = g === b || q.isFunction(a);
			if (d) {
				if (i) {
					for (e in a)
					if (c.apply(a[e], d) === !1)
						break
				} else
					for (; f < g; )
						if (c.apply(a[f++], d) === !1)
							break
			} else if (i) {
				for (e in a)
				if (c.call(a[e], e, a[e]) === !1)
					break
			} else
				for (; f < g; )
					if (c.call(a[f], f, a[f++]) === !1)
						break;
			return a
		},
		trim : p && !p.call("﻿ ") ? function(a) {
			return a == null ? "" : p.call(a)
		} : function(a) {
			return a == null ? "" : (a + "").replace(u, "")
		},
		makeArray : function(a, b) {
			var c, d = b || [];
			if (a != null) {
				c = q.type(a);
				a.length == null || c === "string" || c === "function" || c === "regexp" || q.isWindow(a) ? k.call(d, a) : q.merge(d, a)
			}
			return d
		},
		inArray : function(a, b, c) {
			var d;
			if (b) {
				if (m)
					return m.call(b, a, c);
				d = b.length;
				c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
				for (; c < d; c++)
					if ( c in b && b[c] === a)
						return c
			}
			return -1
		},
		merge : function(a, c) {
			var d = c.length, e = a.length, f = 0;
			if ( typeof d == "number")
				for (; f < d; f++)
					a[e++] = c[f];
			else
				while (c[f] !== b)
				a[e++] = c[f++];
			a.length = e;
			return a
		},
		grep : function(a, b, c) {
			var d, e = [], f = 0, g = a.length;
			c = !!c;
			for (; f < g; f++) {
				d = !!b(a[f], f);
				c !== d && e.push(a[f])
			}
			return e
		},
		map : function(a, c, d) {
			var e, f, g = [], i = 0, j = a.length, k = a instanceof q || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || q.isArray(a));
			if (k)
				for (; i < j; i++) {
					e = c(a[i], i, d);
					e != null && (g[g.length] = e)
				}
			else
				for (f in a) {
					e = c(a[f], f, d);
					e != null && (g[g.length] = e)
				}
			return g.concat.apply([], g)
		},
		guid : 1,
		proxy : function(a, c) {
			var d, e, f;
			if ( typeof c == "string") {
				d = a[c];
				c = a;
				a = d
			}
			if (!q.isFunction(a))
				return b;
			e = l.call(arguments, 2);
			f = function() {
				return a.apply(c, e.concat(l.call(arguments)))
			};
			f.guid = a.guid = a.guid || q.guid++;
			return f
		},
		access : function(a, c, d, e, f, g, i) {
			var j, k = d == null, l = 0, m = a.length;
			if (d && typeof d == "object") {
				for (l in d)
				q.access(a, c, l, d[l], 1, g, e);
				f = 1
			} else if (e !== b) {
				j = i === b && q.isFunction(e);
				if (k)
					if (j) {
						j = c;
						c = function(a, b, c) {
							return j.call(q(a), c)
						}
					} else {
						c.call(a, e);
						c = null
					}
				if (c)
					for (; l < m; l++)
						c(a[l], d, j ? e.call(a[l], l, c(a[l], d)) : e, i);
				f = 1
			}
			return f ? a : k ? c.call(a) : m ? c(a[0], d) : g
		},
		now : function() {
			return (new Date).getTime()
		}
	});
	q.ready.promise = function(b) {
		if (!d) {
			d = q.Deferred();
			if (e.readyState === "complete")
				setTimeout(q.ready, 1);
			else if (e.addEventListener) {
				e.addEventListener("DOMContentLoaded", E, !1);
				a.addEventListener("load", q.ready, !1)
			} else {
				e.attachEvent("onreadystatechange", E);
				a.attachEvent("onload", q.ready);
				var c = !1;
				try {
					c = a.frameElement == null && e.documentElement
				} catch(f) {
				}
				c && c.doScroll && function g() {
					if (!q.isReady) {
						try {
							c.doScroll("left")
						} catch(a) {
							return setTimeout(g, 50)
						}
						q.ready()
					}
				}()
			}
		}
		return d.promise(b)
	};
	q.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
		F["[object " + b + "]"] = b.toLowerCase()
	});
	c = q(e);
	var G = {};
	q.Callbacks = function(a) {
		a = typeof a == "string" ? G[a] || H(a) : q.extend({}, a);
		var c, d, e, f, g, i, j = [], k = !a.once && [], l = function(b) {
			c = a.memory && b;
			d = !0;
			i = f || 0;
			f = 0;
			g = j.length;
			e = !0;
			for (; j && i < g; i++)
				if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
					c = !1;
					break
				}
			e = !1;
			j && ( k ? k.length && l(k.shift()) : c ? j = [] : m.disable())
		}, m = {
			add : function() {
				if (j) {
					var b = j.length;
					(function d(b) {
						q.each(b, function(_, b) {
							var c = q.type(b);
							c === "function" ? (!a.unique || !m.has(b)) && j.push(b) : b && b.length && c !== "string" && d(b)
						})
					})(arguments);
					if (e)
						g = j.length;
					else if (c) {
						f = b;
						l(c)
					}
				}
				return this
			},
			remove : function() {
				j && q.each(arguments, function(_, a) {
					var b;
					while (( b = q.inArray(a, j, b)) > -1) {
						j.splice(b, 1);
						if (e) {
							b <= g && g--;
							b <= i && i--
						}
					}
				});
				return this
			},
			has : function(a) {
				return q.inArray(a, j) > -1
			},
			empty : function() {
				j = [];
				return this
			},
			disable : function() {
				j = k = c = b;
				return this
			},
			disabled : function() {
				return !j
			},
			lock : function() {
				k = b;
				c || m.disable();
				return this
			},
			locked : function() {
				return !k
			},
			fireWith : function(a, b) {
				b = b || [];
				b = [a, b.slice ? b.slice() : b];
				j && (!d || k) && ( e ? k.push(b) : l(b));
				return this
			},
			fire : function() {
				m.fireWith(this, arguments);
				return this
			},
			fired : function() {
				return !!d
			}
		};
		return m
	};
	q.extend({
		Deferred : function(a) {
			var b = [["resolve", "done", q.Callbacks("once memory"), "resolved"], ["reject", "fail", q.Callbacks("once memory"), "rejected"], ["notify", "progress", q.Callbacks("memory")]], c = "pending", d = {
				state : function() {
					return c
				},
				always : function() {
					e.done(arguments).fail(arguments);
					return this
				},
				then : function() {
					var a = arguments;
					return q.Deferred(function(c) {
						q.each(b, function(b, d) {
							var f = d[0], g = a[b];
							e[d[1]](q.isFunction(g) ? function() {
								var a = g.apply(this, arguments);
								a && q.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f+"With"
								](this === e ? c : this, [a])
							} : c[f])
						});
						a = null
					}).promise()
				},
				promise : function(a) {
					return a != null ? q.extend(a, d) : d
				}
			}, e = {};
			d.pipe = d.then;
			q.each(b, function(a, f) {
				var g = f[2], i = f[3];
				d[f[1]] = g.add;
				i && g.add(function() {
					c = i
				}, b[a^1][2].disable, b[2][2].lock);
				e[f[0]] = g.fire;
				e[f[0] + "With"] = g.fireWith
			});
			d.promise(e);
			a && a.call(e, e);
			return e
		},
		when : function(a) {
			var b = 0, c = l.call(arguments), d = c.length, e = d !== 1 || a && q.isFunction(a.promise) ? d : 0, f = e === 1 ? a : q.Deferred(), g = function(a, b, c) {
				return function(d) {
					b[a] = this;
					c[a] = arguments.length > 1 ? l.call(arguments) : d;
					c === i ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
				}
			}, i, j, k;
			if (d > 1) {
				i = new Array(d);
				j = new Array(d);
				k = new Array(d);
				for (; b < d; b++)
					c[b] && q.isFunction(c[b].promise) ? c[b].promise().done(g(b, k, c)).fail(f.reject).progress(g(b, j, i)) : --e
			}
			e || f.resolveWith(k, c);
			return f.promise()
		}
	});
	q.support = function() {
		var b, c, d, f, g, i, j, k, l, m, n, o = e.createElement("div");
		o.setAttribute("className", "t");
		o.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		c = o.getElementsByTagName("*");
		d = o.getElementsByTagName
		("a")[0];
		if (!c || !d || !c.length)
			return {};
		f = e.createElement("select");
		g = f.appendChild(e.createElement("option"));
		i = o.getElementsByTagName("input")[0];
		d.style.cssText = "top:1px;float:left;opacity:.5";
		b = {
			leadingWhitespace : o.firstChild.nodeType === 3,
			tbody : !o.getElementsByTagName("tbody").length,
			htmlSerialize : !!o.getElementsByTagName("link").length,
			style : /top/.test(d.getAttribute("style")),
			hrefNormalized : d.getAttribute("href") === "/a",
			opacity : /^0.5/.test(d.style.opacity),
			cssFloat : !!d.style.cssFloat,
			checkOn : i.value === "on",
			optSelected : g.selected,
			getSetAttribute : o.className !== "t",
			enctype : !!e.createElement("form").enctype,
			html5Clone : e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			boxModel : e.compatMode === "CSS1Compat",
			submitBubbles : !0,
			changeBubbles : !0,
			focusinBubbles : !1,
			deleteExpando : !0,
			noCloneEvent : !0,
			inlineBlockNeedsLayout : !1,
			shrinkWrapBlocks : !1,
			reliableMarginRight : !0,
			boxSizingReliable : !0,
			pixelPosition : !1
		};
		i.checked = !0;
		b.noCloneChecked = i.cloneNode(!0).checked;
		f.disabled = !0;
		b.optDisabled = !g.disabled;
		try {
			delete o.test
		} catch(p) {
			b.deleteExpando = !1
		}
		if (!o.addEventListener && o.attachEvent && o.fireEvent) {
			o.attachEvent("onclick", n = function() {
				b.noCloneEvent = !1
			});
			o.cloneNode(!0).fireEvent("onclick");
			o.detachEvent("onclick", n)
		}
		i = e.createElement("input");
		i.value = "t";
		i.setAttribute("type", "radio");
		b.radioValue = i.value === "t";
		i.setAttribute("checked", "checked");
		i.setAttribute("name", "t");
		o.appendChild(i);
		j = e.createDocumentFragment();
		j.appendChild(o.lastChild);
		b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked;
		b.appendChecked = i.checked;
		j.removeChild(i);
		j.appendChild(o);
		if (o.attachEvent)
			for (l in {
				submit : !0,
				change : !0,
				focusin : !0
			}) {
				k = "on" + l;
				m = k in o;
				if (!m) {
					o.setAttribute(k, "return;");
					m = typeof o[k] == "function"
				}
				b[l + "Bubbles"] = m
			}
		q(function() {
			var c, d, f, g, i = "padding:0;margin:0;border:0;display:block;overflow:hidden;", j = e.getElementsByTagName("body")[0];
			if (!j)
				return;
			c = e.createElement("div");
			c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
			j.insertBefore(c, j.firstChild);
			d = e.createElement("div");
			c.appendChild(d);
			d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			f = d.getElementsByTagName("td");
			f[0].style.cssText = "padding:0;margin:0;border:0;display:none";
			m = f[0].offsetHeight === 0;
			f[0].style.display = "";
			f[1].style.display = "none";
			b.reliableHiddenOffsets = m && f[0].offsetHeight === 0;
			d.innerHTML = "";
			d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			b.boxSizing = d.offsetWidth === 4;
			b.doesNotIncludeMarginInBodyOffset = j.offsetTop !== 1;
			if (a.getComputedStyle) {
				b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%";
				b.boxSizingReliable = (a.getComputedStyle(d, null) || {
					width : "4px"
				}).width === "4px";
				g = e.createElement("div");
				g.style.cssText = d.style.cssText = i;
				g.style.marginRight = g.style.width = "0";
				d.style.width = "1px";
				d.appendChild(g);
				b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)
			}
			if ( typeof d.style.zoom != "undefined") {
				d.innerHTML = "";
				d.style.cssText = i + "width:1px;padding:1px;display:inline;zoom:1";
				b.inlineBlockNeedsLayout = d.offsetWidth === 3;
				d.style.display = "block";
				d.style.overflow = "visible";
				d.innerHTML = "<div></div>";
				d.firstChild.style.width = "5px";
				b.shrinkWrapBlocks = d.offsetWidth !== 3;
				c.style.zoom = 1
			}
			j.removeChild(c);
			c = d = f = g = null
		});
		j.removeChild(o);
		c = d = f = g = i = j = o = null;
		return b
	}();
	var I = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, J = /([A-Z])/g;
	q.extend({
		cache : {},
		deletedIds : [],
		uuid : 0,
		expando : "jQuery" + (q.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData : {
			embed : !0,
			object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet : !0
		},
		hasData : function(a) {
			a = a.nodeType ? q.cache[a[q.expando]] : a[q.expando];
			return !!a && !L(a)
		},
		data : function(a, c, d, e) {
			if (!q.acceptData(a))
				return;
			var f, g, i = q.expando, j = typeof c == "string", k = a.nodeType, l = k ? q.cache : a, m = k ? a[i] : a[i] && i;
			if ((!m || !l[m] || !e && !l[m].data) && j && d === b)
				return;
			m || ( k ? a[i] = m = q.deletedIds.pop() || q.guid++ : m = i);
			if (!l[m]) {
				l[m] = {};
				k || (l[m].toJSON = q.noop)
			}
			if ( typeof c == "object" || typeof c == "function")
				e ? l[m] = q.extend(l[m], c) : l[m].data = q.extend(l[m].data, c);
			f = l[m];
			if (!e) {
				f.data || (f.data = {});
				f = f.data
			}
			d !== b && (f[q.camelCase(c)] = d);
			if (j) {
				g = f[c];
				g == null && ( g = f[q.camelCase(c)])
			} else
				g = f;
			return g
		},
		removeData : function(a, b, c) {
			if (!q.acceptData(a))
				return;
			var d, e, f, g = a.nodeType, i = g ? q.cache : a, j = g ? a[q.expando] : q.expando;
			if (!i[j])
				return;
			if (b) {
				d = c ? i[j] : i[j].data;
				if (d) {
					if (!q.isArray(b))
						if ( b in d)
							b = [b];
						else {
							b = q.camelCase(b);
							b in d ? b = [b] : b = b.split(" ")
						}
					for ( e = 0, f = b.length; e < f; e++)
						delete d[b[e]];
					if (!( c ? L : q.isEmptyObject)(d))
						return
				}
			}
			if (!c) {
				delete i[j].data;
				if (!L(i[j]))
					return
			}
			g ? q.cleanData([a], !0) : q.support.deleteExpando || i != i.window ?
			delete i[j] : i[j] = null
		},
		_data : function(a, b, c) {
			return q.data(a, b, c, !0)
		},
		acceptData : function(a) {
			var b = a.nodeName && q.noData[a.nodeName.toLowerCase()];
			return !b || b !== !0 && a.getAttribute("classid") === b
		}
	});
	q.fn.extend({
		data : function(a, c) {
			var d, e, f, g, i, j = this[0], k = 0, l = null;
			if (a === b) {
				if (this.length) {
					l = q.data(j);
					if (j.nodeType === 1 && !q._data(j, "parsedAttrs")) {
						f = j.attributes;
						for ( i = f.length; k < i; k++) {
							g = f[k].name;
							if (!g.indexOf("data-")) {
								g = q.camelCase(g.substring(5));
								K(j, g, l[g])
							}
						}
						q._data(j, "parsedAttrs", !0)
					}
				}
				return l
			}
			if ( typeof a == "object")
				return this.each(function() {
					q.data(this, a)
				});
			d = a.split(".", 2);
			d[1] = d[1] ? "." + d[1] : "";
			e = d[1] + "!";
			return q.access(this, function(c) {
				if (c === b) {
					l = this.triggerHandler("getData" + e, [d[0]]);
					if (l === b && j) {
						l = q.data(j, a);
						l = K(j, a, l)
					}
					return l === b && d[1] ? this.data(d[0]) : l
				}
				d[1] = c;
				this.each(function() {
					var b = q(this);
					b.triggerHandler("setData" + e, d);
					q.data(this, a, c);
					b.triggerHandler("changeData" + e, d)
				})
			}, null, c, arguments.length > 1, null, !1)
		},
		removeData : function(a) {
			return this.each(function() {
				q.removeData(this, a)
			})
		}
	});
	q.extend({
		queue : function(a, b, c) {
			var d;
			if (a) {
				b = (b || "fx") + "queue";
				d = q._data(a, b);
				c && (!d || q.isArray(c) ? d = q._data(a, b, q.makeArray(c)) : d.push(c));
				return d || []
			}
		},
		dequeue : function(a, b) {
			b = b || "fx";
			var c = q.queue(a, b), d = c.length, e = c.shift(), f = q._queueHooks(a, b), g = function() {
				q.dequeue(a, b)
			};
			if (e === "inprogress") {
				e = c.shift();
				d--
			}
			if (e) {
				b === "fx" && c.unshift("inprogress");
				delete f.stop;
				e.call(a, g, f)
			}
			!d && f && f.empty.fire()
		},
		_queueHooks : function(a, b) {
			var c = b + "queueHooks";
			return q._data(a, c) || q._data(a, c, {
				empty : q.Callbacks("once memory").add(function() {
					q.removeData(a, b + "queue", !0);
					q.removeData(a, c, !0)
				})
			})
		}
	});
	q.fn.extend({
		queue : function(a, c) {
			var d = 2;
			if ( typeof a != "string") {
				c = a;
				a = "fx";
				d--
			}
			return arguments.length < d ? q.queue(this[0], a) : c === b ? this : this.each(function() {
				var b = q.queue(this, a, c);
				q._queueHooks(this, a);
				a === "fx" && b[0] !== "inprogress" && q.dequeue(this, a)
			})
		},
		dequeue : function(a) {
			return this.each(function() {
				q.dequeue(this, a)
			})
		},
		delay : function(a, b) {
			a = q.fx ? q.fx.speeds[a] || a : a;
			b = b || "fx";
			return this.queue(b, function(b, c) {
				var d = setTimeout(b, a);
				c.stop = function() {
					clearTimeout(d)
				}
			})
		},
		clearQueue : function(a) {
			return this.queue(a || "fx", [])
		},
		promise : function(a, c) {
			var d, e = 1, f = q.Deferred(), g = this, i = this.length, j = function() {
				--e || f.resolveWith(g, [g])
			};
			if ( typeof a != "string") {
				c = a;
				a = b
			}
			a = a || "fx";
			while (i--) {
				d = q._data(g[i], a + "queueHooks");
				if (d && d.empty) {
					e++;
					d.empty.add(j)
				}
			}
			j();
			return f.promise(c)
		}
	});
	var M, N, O, P = /[\t\r\n]/g, Q = /\r/g, R = /^(?:button|input)$/i, S = /^(?:button|input|object|select|textarea)$/i, T = /^a(?:rea|)$/i, U = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, V = q.support.getSetAttribute;
	q.fn.extend({
		attr : function(a, b) {
			return q.access(this, q.attr, a, b, arguments.length > 1)
		},
		removeAttr : function(a) {
			return this.each(function() {
				q.removeAttr(this, a)
			})
		},
		prop : function(a, b) {
			return q.access(this, q.prop, a, b, arguments.length > 1)
		},
		removeProp : function(a) {
			a = q.propFix[a] || a;
			return this.each(function() {
				try {
					this[a] = b;
					delete this[a]
				} catch(c) {
				}
			})
		},
		addClass : function(a) {
			var b, c, d, e, f, g, i;
			if (q.isFunction(a))
				return this.each(function(b) {
					q(this).addClass(a.call(this, b, this.className))
				});
			if (a && typeof a == "string") {
				b = a.split(t);
				for ( c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if (e.nodeType === 1)
						if (!e.className && b.length === 1)
							e.className = a;
						else {
							f = " " + e.className + " ";
							for ( g = 0, i = b.length; g < i; g++)
								f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
							e.className = q.trim(f)
						}
				}
			}
			return this
		},
		removeClass : function(a) {
			var c, d, e, f, g, i, j;
			if (q.isFunction(a))
				return this.each(function(b) {
					q(this).removeClass(a.call(this, b, this.className))
				});
			if (a && typeof a == "string" || a === b) {
				c = (a || "").split(t);
				for ( i = 0, j = this.length; i < j; i++) {
					e = this[i];
					if (e.nodeType === 1 && e.className) {
						d = (" " + e.className + " ").replace(P, " ");
						for ( f = 0, g = c.length; f < g; f++)
							while (d.indexOf(" " + c[f] + " ") >= 0)
							d = d.replace(" " + c[f] + " ", " ");
						e.className = a ? q.trim(d) : ""
					}
				}
			}
			return this
		},
		toggleClass : function(a, b) {
			var c = typeof a, d = typeof b == "boolean";
			return q.isFunction(a) ? this.each(function(c) {
				q(this).toggleClass(a.call(this, c, this.className, b), b)
			}) : this.each(function() {
				if (c === "string") {
					var e, f = 0, g = q(this), i = b, j = a.split(t);
					while ( e = j[f++]) {
						i = d ? i : !g.hasClass(e);
						g[i?"addClass":"removeClass"](e)
					}
				} else if (c === "undefined" || c === "boolean") {
					this.className && q._data(this, "__className__", this.className);
					this.className = this.className || a === !1 ? "" : q._data(this, "__className__") || ""
				}
			})
		},
		hasClass : function(a) {
			var b = " " + a + " ", c = 0, d = this.length;
			for (; c < d; c++)
				if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(P, " ").indexOf(b) >= 0)
					return !0;
			return !1
		},
		val : function(a) {
			var c, d, e, f = this[0];
			if (!arguments.length) {
				if (f) {
					c = q.valHooks[f.type] || q.valHooks[f.nodeName.toLowerCase()];
					if (c && "get" in c && ( d = c.get(f, "value")) !== b)
						return d;
					d = f.value;
					return typeof d == "string" ? d.replace(Q, "") : d == null ? "" : d
				}
				return
			}
			e = q.isFunction(a);
			return this.each(function(d) {
				var f, g = q(this);
				if (this.nodeType !== 1)
					return;
				e ? f = a.call(this, d, g.val()) : f = a;
				f == null ? f = "" : typeof f == "number" ? f += "" : q.isArray(f) && ( f = q.map(f, function(a) {
					return a == null ? "" : a + ""
				}));
				c = q.valHooks[this.type] || q.valHooks[this.nodeName.toLowerCase()];
				if (!c || !("set" in c) || c.set(this, f, "value") === b)
					this.value = f
			})
		}
	});
	q.extend({
		valHooks : {
			option : {
				get : function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select : {
				get : function(a) {
					var b, c, d = a.options, e = a.selectedIndex, f = a.type === "select-one" || e < 0, g = f ? null : [], i = f ? e + 1 : d.length, j = e < 0 ? i : f ? e : 0;
					for (; j < i; j++) {
						c = d[j];
						if ((c.selected || j === e) && (q.support.optDisabled ? !c.disabled : c.getAttribute("disabled") === null) && (!c.parentNode.disabled || !
						q.nodeName(c.parentNode, "optgroup"))) {
							b = q(c).val();
							if (f)
								return b;
							g.push(b)
						}
					}
					return g
				},
				set : function(a, b) {
					var c = q.makeArray(b);
					q(a).find("option").each(function() {
						this.selected = q.inArray(q(this).val(), c) >= 0
					});
					c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn : {},
		attr : function(a, c, d, e) {
			var f, g, i, j = a.nodeType;
			if (!a || j === 3 || j === 8 || j === 2)
				return;
			if (e && q.isFunction(q.fn[c]))
				return q(a)[c](d);
			if ( typeof a.getAttribute == "undefined")
				return q.prop(a, c, d);
			i = j !== 1 || !q.isXMLDoc(a);
			if (i) {
				c = c.toLowerCase();
				g = q.attrHooks[c] || (U.test(c) ? N : M)
			}
			if (d !== b) {
				if (d === null) {
					q.removeAttr(a, c);
					return
				}
				if (g && "set" in g && i && ( f = g.set(a, d, c)) !== b)
					return f;
				a.setAttribute(c, d + "");
				return d
			}
			if (g && "get" in g && i && ( f = g.get(a, c)) !== null)
				return f;
			f = a.getAttribute(c);
			return f === null ? b : f
		},
		removeAttr : function(a, b) {
			var c, d, e, f, g = 0;
			if (b && a.nodeType === 1) {
				d = b.split(t);
				for (; g < d.length; g++) {
					e = d[g];
					if (e) {
						c = q.propFix[e] || e;
						f = U.test(e);
						f || q.attr(a, e, "");
						a.removeAttribute( V ? e : c);
						f && c in a && (a[c] = !1)
					}
				}
			}
		},
		attrHooks : {
			type : {
				set : function(a, b) {
					if (R.test(a.nodeName) && a.parentNode)
						q.error("type property can't be changed");
					else if (!q.support.radioValue && b === "radio" && q.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b);
						c && (a.value = c);
						return b
					}
				}
			},
			value : {
				get : function(a, b) {
					return M && q.nodeName(a, "button") ? M.get(a, b) : b in a ? a.value : null
				},
				set : function(a, b, c) {
					if (M && q.nodeName(a, "button"))
						return M.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix : {
			tabindex : "tabIndex",
			readonly : "readOnly",
			"for" : "htmlFor",
			"class" : "className",
			maxlength : "maxLength",
			cellspacing : "cellSpacing",
			cellpadding : "cellPadding",
			rowspan : "rowSpan",
			colspan : "colSpan",
			usemap : "useMap",
			frameborder : "frameBorder",
			contenteditable : "contentEditable"
		},
		prop : function(a, c, d) {
			var e, f, g, i = a.nodeType;
			if (!a || i === 3 || i === 8 || i === 2)
				return;
			g = i !== 1 || !q.isXMLDoc(a);
			if (g) {
				c = q.propFix[c] || c;
				f = q.propHooks[c]
			}
			return d !== b ? f && "set" in f && ( e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && ( e = f.get(a, c)) !== null ? e : a[c]
		},
		propHooks : {
			tabIndex : {
				get : function(a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : S.test(a.nodeName) || T.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	});
	N = {
		get : function(a, c) {
			var d, e = q.prop(a, c);
			return e === !0 || typeof e != "boolean" && ( d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set : function(a, b, c) {
			var d;
			if (b === !1)
				q.removeAttr(a, c);
			else {
				d = q.propFix[c] || c;
				d in a && (a[d] = !0);
				a.setAttribute(c, c.toLowerCase())
			}
			return c
		}
	};
	if (!V) {
		O = {
			name : !0,
			id : !0,
			coords : !0
		};
		M = q.valHooks.button = {
			get : function(a, c) {
				var d;
				d = a.getAttributeNode(c);
				return d && (O[c] ? d.value !== "" : d.specified) ? d.value : b
			},
			set : function(a, b, c) {
				var d = a.getAttributeNode(c);
				if (!d) {
					d = e.createAttribute(c);
					a.setAttributeNode(d)
				}
				return d.value = b + ""
			}
		};
		q.each(["width", "height"], function(a, b) {
			q.attrHooks[b] = q.extend(q.attrHooks[b], {
				set : function(a, c) {
					if (c === "") {
						a.setAttribute(b, "auto");
						return c
					}
				}
			})
		});
		q.attrHooks.contenteditable = {
			get : M.get,
			set : function(a, b, c) {
				b === "" && ( b = "false");
				M.set(a, b, c)
			}
		}
	}
	q.support.hrefNormalized || q.each(["href", "src", "width", "height"], function(a, c) {
		q.attrHooks[c] = q.extend(q.attrHooks[c], {
			get : function(a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b : d
			}
		})
	});
	q.support.style || (q.attrHooks.style = {
		get : function(a) {
			return a.style.cssText.toLowerCase() || b
		},
		set : function(a, b) {
			return a.style.cssText = b + ""
		}
	});
	q.support.optSelected || (q.propHooks.selected = q.extend(q.propHooks.selected, {
		get : function(a) {
			var b = a.parentNode;
			if (b) {
				b.selectedIndex
				b.parentNode && b.parentNode.selectedIndex
			}
			return null
		}
	}));
	q.support.enctype || (q.propFix.enctype = "encoding");
	q.support.checkOn || q.each(["radio", "checkbox"], function() {
		q.valHooks[this] = {
			get : function(a) {
				return a.getAttribute("value") === null ? "on" : a.value
			}
		}
	});
	q.each(["radio", "checkbox"], function() {
		q.valHooks[this] = q.extend(q.valHooks[this], {
			set : function(a, b) {
				if (q.isArray(b))
					return a.checked = q.inArray(q(a).val(), b) >= 0
			}
		})
	});
	var W = /^(?:textarea|input|select)$/i, X = /^([^\.]*|)(?:\.(.+)|)$/, Y = /(?:^|\s)hover(\.\S+|)\b/, Z = /^key/, ab = /^(?:mouse|contextmenu)|click/, bb = /^(?:focusinfocus|focusoutblur)$/, cb = function(a) {
		return q.event.special.hover ? a : a.replace(Y, "mouseenter$1 mouseleave$1")
	};
	q.event = {
		add : function(a, c, d, e, f) {
			var g, i, j, k, l, m, n, o, p, r, s;
			if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !( g = q._data(a)))
				return;
			if (d.handler) {
				p = d;
				d = p.handler;
				f = p.selector
			}
			d.guid || (d.guid = q.guid++);
			j = g.events;
			j || (g.events = j = {});
			i = g.handle;
			if (!i) {
				g.handle = i = function(a) {
					return typeof q == "undefined" || !!a && q.event.triggered === a.type ? b : q.event.dispatch.apply(i.elem, arguments)
				};
				i.elem = a
			}
			c = q.trim(cb(c)).split(" ");
			for ( k = 0; k < c.length; k++) {
				l = X.exec(c[k]) || [];
				m = l[1];
				n = (l[2] || "").split(".").sort();
				s = q.event.special[m] || {};
				m = ( f ? s.delegateType : s.bindType) || m;
				s = q.event.special[m] || {};
				o = q.extend({
					type : m,
					origType : l[1],
					data : e,
					handler : d,
					guid : d.guid,
					selector : f,
					needsContext : f && q.expr.match.needsContext.test(f),
					namespace : n.join(".")
				}, p);
				r = j[m];
				if (!r) {
					r = j[m] = [];
					r.delegateCount = 0;
					if (!s.setup || s.setup.call(a, e, n, i) === !1)
						a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
				}
				if (s.add) {
					s.add.call(a, o);
					o.handler.guid || (o.handler.guid = d.guid)
				}
				f ? r.splice(r.delegateCount++, 0, o) : r.push(o);
				q.event.global[m] = !0
			}
			a = null
		},
		global : {},
		remove : function(a, b, c, d, e) {
			var f, g, i, j, k, l, m, n, o, p, r, s = q.hasData(a) && q._data(a);
			if (!s || !( n = s.events))
				return;
			b = q.trim(cb(b || "")).split(" ");
			for ( f = 0; f < b.length; f++) {
				g = X.exec(b[f]) || [];
				i = j = g[1];
				k = g[2];
				if (!i) {
					for (i in n)
					q.event.remove(a, i + b[f], c, d, !0);
					continue
				}
				o = q.event.special[i] || {};
				i = ( d ? o.delegateType : o.bindType) || i;
				p = n[i] || [];
				l = p.length;
				k = k ? new RegExp("(^|\\.)" + k.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
				for ( m = 0; m < p.length; m++) {
					r = p[m];
					if ((e || j === r.origType) && (!c || c.guid === r.guid) && (!k || k.test(r.namespace)) && (!d || d === r.selector || d === "**" && r.selector)) {
						p.splice(m--, 1);
						r.selector && p.delegateCount--;
						o.remove && o.remove.call(a, r)
					}
				}
				if (p.length === 0 && l !== p.length) {
					(!o.teardown || o.teardown.call(a, k, s.handle) === !1) && q.removeEvent(a, i, s.handle);
					delete n[i]
				}
			}
			if (q.isEmptyObject(n)) {
				delete s.handle;
				q.removeData(a, "events", !0)
			}
		},
		customEvent : {
			getData : !0,
			setData : !0,
			changeData : !0
		},
		trigger : function(c, d, f, g) {
			if (!f || f.nodeType !== 3 && f.nodeType !== 8) {
				var i, j, k, l, m, n, o, p, r, s, t = c.type || c, u = [];
				if (bb.test(t + q.event.triggered))
					return;
				if (t.indexOf("!") >= 0) {
					t = t.slice(0, -1);
					j = !0
				}
				if (t.indexOf(".") >= 0) {
					u = t.split(".");
					t = u.shift();
					u.sort()
				}
				if ((!f || q.event.customEvent[t]) && !q.event.global[t])
					return;
				c = typeof c == "object" ? c[q.expando] ? c : new q.Event(t, c) : new q.Event(t);
				c.type = t;
				c.isTrigger = !0;
				c.exclusive = j;
				c.namespace = u.join(".");
				c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + u.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
				n = t.indexOf(":") < 0 ? "on" + t : "";
				if (!f) {
					i = q.cache;
					for (k in i)i[k].events && i[k].events[t] && q.event.trigger(c, d, i[k].handle.elem, !0);
					return
				}
				c.result = b;
				c.target || (c.target = f);
				d = d != null ? q.makeArray(d) : [];
				d.unshift(c);
				o = q.event.special[t] || {};
				if (o.trigger && o.trigger.apply(f, d) === !1)
					return;
				r = [[f, o.bindType || t]];
				if (!g && !o.noBubble && !q.isWindow(f)) {
					s = o.delegateType || t;
					l = bb.test(s + t) ? f : f.parentNode;
					for ( m = f; l; l = l.parentNode) {
						r.push([l, s]);
						m = l
					}
					m === (f.ownerDocument || e) && r.push([m.defaultView || m.parentWindow || a, s])
				}
				for ( k = 0; k < r.length && !c.isPropagationStopped(); k++) {
					l = r[k][0];
					c.type = r[k][1];
					p = (q._data(l,"events")||{})[c.type] && q._data(l, "handle");
					p && p.apply(l, d);
					p = n && l[n];
					p && q.acceptData(l) && p.apply && p.apply(l, d) === !1 && c.preventDefault()
				}
				c.type = t;
				if (!g && !c.isDefaultPrevented() && (!o._default || o._default.apply(f.ownerDocument, d) === !1) && (t !== "click" || !q.nodeName(f, "a")) && q.acceptData(f) && n && f[t] && (t !== "focus" && t !== "blur" || c.target.offsetWidth !== 0) && !q.isWindow(f)) {
					m = f[n];
					m && (f[n] = null);
					q.event.triggered = t;
					f[t]();
					q.event.triggered = b;
					m && (f[n] = m)
				}
				return c.result
			}
			return
		},
		dispatch : function(c) {
			c = q.event.fix(c || a.event);
			var d, e, f, g, i, j, k, m, n, o, p = (q._data(this,"events")||{})[c.type] || [], r = p.delegateCount, s = l.call(arguments), t = !c.exclusive && !c.namespace, u = q.event.special[c.type] || {}, v = [];
			s[0] = c;
			c.delegateTarget = this;
			if (u.preDispatch && u.preDispatch.call(this, c) === !1)
				return;
			if (r && (!c.button || c.type !== "click"))
				for ( f = c.target; f != this; f = f.parentNode || this)
					if (f.disabled !== !0 || c.type !== "click") {
						i = {};
						k = [];
						for ( d = 0; d < r; d++) {
							m = p[d];
							n = m.selector;
							i[n] === b && (i[n] = m.needsContext ? q(n, this).index(f) >= 0 : q.find(n, this, null, [f]).length);
							i[n] && k.push(m)
						}
						k.length && v.push({
							elem : f,
							matches : k
						})
					}
			p.length > r && v.push({
				elem : this,
				matches : p.slice(r)
			});
			for ( d = 0; d < v.length && !c.isPropagationStopped(); d++) {
				j = v[d];
				c.currentTarget = j.elem;
				for ( e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++) {
					m = j.matches[e];
					if (t || !c.namespace && !m.namespace || c.namespace_re && c.namespace_re.test(m.namespace)) {
						c.data = m.data;
						c.handleObj = m;
						g = ((q.event.special[m.origType] || {}).handle || m.handler).apply(j.elem, s);
						if (g !== b) {
							c.result = g;
							if (g === !1) {
								c.preventDefault();
								c.stopPropagation()
							}
						}
					}
				}
			}
			u.postDispatch && u.postDispatch.call(this, c);
			return c.result
		},
		props : "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks : {},
		keyHooks : {
			props : "char charCode key keyCode".split(" "),
			filter : function(a, b) {
				a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
				return a
			}
		},
		mouseHooks : {
			props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter : function(a, c) {
				var d, f, g, i = c.button, j = c.fromElement;
				if (a.pageX == null && c.clientX != null) {
					d = a.target.ownerDocument || e;
					f = d.documentElement;
					g = d.body;
					a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0);
					a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)
				}
				!a.relatedTarget && j && (a.relatedTarget = j === a.target ? c.toElement : j);
				!a.which && i !== b && (a.which = i & 1 ? 1 : i & 2 ? 3 : i & 4 ? 2 : 0);
				return a
			}
		},
		fix : function(a) {
			if (a[q.expando])
				return a;
			var b, c, d = a, f = q.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
			a = q.Event(d);
			for ( b = g.length; b; ) {
				c = g[--b];
				a[c] = d[c]
			}
			a.target || (a.target = d.srcElement || e);
			a.target.nodeType === 3 && (a.target = a.target.parentNode);
			a.metaKey = !!a.metaKey;
			return f.filter ? f.filter(a, d) : a
		},
		special : {
			load : {
				noBubble : !0
			},
			focus : {
				delegateType : "focusin"
			},
			blur : {
				delegateType : "focusout"
			},
			beforeunload : {
				setup : function(a, b, c) {
					q.isWindow(this) && (this.onbeforeunload = c)
				},
				teardown : function(a, b) {
					this.onbeforeunload === b && (this.onbeforeunload = null)
				}
			}
		},
		simulate : function(a, b, c, d) {
			var e = q.extend(new q.Event, c, {
				type : a,
				isSimulated : !0,
				originalEvent : {}
			});
			d ? q.event.trigger(e, null, b) : q.event.dispatch.call(b, e);
			e.isDefaultPrevented() && c.preventDefault()
		}
	};
	q.event.handle = q.event.dispatch;
	q.removeEvent = e.removeEventListener ? function(a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function(a, b, c) {
		var d = "on" + b;
		if (a.detachEvent) {
			typeof a[d] == "undefined" && (a[d] = null);
			a.detachEvent(d, c)
		}
	};
	q.Event = function(a, b) {
		if (!(this instanceof q.Event))
			return new q.Event(a, b);
		if (a && a.type) {
			this.originalEvent = a;
			this.type = a.type;
			this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? eb : db
		} else
			this.type = a;
		b && q.extend(this, b);
		this.timeStamp = a && a.timeStamp || q.now();
		this[q.expando] = !0
	};
	q.Event.prototype = {
		preventDefault : function() {
			this.isDefaultPrevented = eb;
			var a = this.originalEvent;
			if (!a)
				return;
			a.preventDefault ? a.preventDefault() : a.returnValue = !1
		},
		stopPropagation : function() {
			this.isPropagationStopped = eb;
			var a = this.originalEvent;
			if (!a)
				return;
			a.stopPropagation && a.stopPropagation();
			a.cancelBubble = !0
		},
		stopImmediatePropagation : function() {
			this.isImmediatePropagationStopped = eb;
			this.stopPropagation()
		},
		isDefaultPrevented : db,
		isPropagationStopped : db,
		isImmediatePropagationStopped : db
	};
	q.each({
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	}, function(a, b) {
		q.event.special[a] = {
			delegateType : b,
			bindType : b,
			handle : function(a) {
				var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector;
				if (!e || e !== d && !q.contains(d, e)) {
					a.type = f.origType;
					c = f.handler.apply(this, arguments);
					a.type = b
				}
				return c
			}
		}
	});
	q.support.submitBubbles || (q.event.special.submit = {
		setup : function() {
			if (q.nodeName(this, "form"))
				return !1;
			q.event.add(this, "click._submit keypress._submit", function(a) {
				var c = a.target, d = q.nodeName(c, "input") || q.nodeName(c, "button") ? c.form : b;
				if (d && !q._data(d, "_submit_attached")) {
					q.event.add(d, "submit._submit", function(a) {
						a._submit_bubble = !0
					});
					q._data(d, "_submit_attached", !0)
				}
			})
		},
		postDispatch : function(a) {
			if (a._submit_bubble) {
				delete a._submit_bubble;
				this.parentNode && !a.isTrigger && q.event.simulate("submit", this.parentNode, a, !0)
			}
		},
		teardown : function() {
			if (q.nodeName(this, "form"))
				return !1;
			q.event.remove(this, "._submit")
		}
	});
	q.support.changeBubbles || (q.event.special.change = {
		setup : function() {
			if (W.test(this.nodeName)) {
				if (this.type === "checkbox" || this.type === "radio") {
					q.event.add(this, "propertychange._change", function(a) {
						a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
					});
					q.event.add(this, "click._change", function(a) {
						this._just_changed && !a.isTrigger && (this._just_changed = !1);
						q.event.simulate("change", this, a, !0)
					})
				}
				return !1
			}
			q.event.add(this, "beforeactivate._change", function(a) {
				var b = a.target;
				if (W.test(b.nodeName) && !q._data(b, "_change_attached")) {
					q.event.add(b, "change._change", function(a) {
						this.parentNode && !a.isSimulated && !a.isTrigger && q.event.simulate("change", this.parentNode, a, !0)
					});
					q._data(b, "_change_attached", !0)
				}
			})
		},
		handle : function(a) {
			var b = a.target;
			if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")
				return a.handleObj.handler.apply(this, arguments)
		},
		teardown : function() {
			q.event.remove(this, "._change");
			return !W.test(this.nodeName)
		}
	});
	q.support.focusinBubbles || q.each({
		focus : "focusin",
		blur : "focusout"
	}, function(a, b) {
		var c = 0, d = function(a) {
			q.event.simulate(b, a.target, q.event.fix(a), !0)
		};
		q.event.special[b] = {
			setup : function() {
				c++ === 0 && e.addEventListener(a, d, !0)
			},
			teardown : function() {
				--c === 0 && e.removeEventListener(a, d, !0)
			}
		}
	});
	q.fn.extend({
		on : function(a, c, d, e, f) {
			var g, i;
			if ( typeof a == "object") {
				if ( typeof c != "string") {
					d = d || c;
					c = b
				}
				for (i in a)
				this.on(i, c, d, a[i], f);
				return this
			}
			if (d == null && e == null) {
				e = c;
				d = c = b
			} else if (e == null)
				if ( typeof c == "string") {
					e = d;
					d = b
				} else {
					e = d;
					d = c;
					c = b
				}
			if (e === !1)
				e = db;
			else if (!e)
				return this;
			if (f === 1) {
				g = e;
				e = function(a) {
					q().off(a);
					return g.apply(this, arguments)
				};
				e.guid = g.guid || (g.guid = q.guid++)
			}
			return this.each(function() {
				q.event.add(this, a, e, d, c)
			})
		},
		one : function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		},
		off : function(a, c, d) {
			var e, f;
			if (a && a.preventDefault && a.handleObj) {
				e = a.handleObj;
				q(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
				return this
			}
			if ( typeof a == "object") {
				for (f in a
				)
				this.off(f, c, a[f]);
				return this
			}
			if (c === !1 || typeof c == "function") {
				d = c;
				c = b
			}
			d === !1 && ( d = db);
			return this.each(function() {
				q.event.remove(this, a, d, c)
			})
		},
		bind : function(a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind : function(a, b) {
			return this.off(a, null, b)
		},
		live : function(a, b, c) {
			q(this.context).on(a, this.selector, b, c);
			return this
		},
		die : function(a, b) {
			q(this.context).off(a, this.selector || "**", b);
			return this
		},
		delegate : function(a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate : function(a, b, c) {
			return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c)
		},
		trigger : function(a, b) {
			return this.each(function() {
				q.event.trigger(a, b, this)
			})
		},
		triggerHandler : function(a, b) {
			if (this[0])
				return q.event.trigger(a, b, this[0], !0)
		},
		toggle : function(a) {
			var b = arguments, c = a.guid || q.guid++, d = 0, e = function(c) {
				var e = (q._data(this, "lastToggle" + a.guid) || 0) % d;
				q._data(this, "lastToggle" + a.guid, e + 1);
				c.preventDefault();
				return b[e].apply(this, arguments) || !1
			};
			e.guid = c;
			while (d < b.length)
			b[d++].guid = c;
			return this.click(e)
		},
		hover : function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	});
	q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
		q.fn[b] = function(a, c) {
			if (c == null) {
				c = a;
				a = null
			}
			return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		};
		Z.test(b) && (q.event.fixHooks[b] = q.event.keyHooks);
		ab.test(b) && (q.event.fixHooks[b] = q.event.mouseHooks)
	});
	(function(a, b) {
		function fb(a, b, c, d) {
			c = c || [];
			b = b || s;
			var e, f, j, k, l = b.nodeType;
			if (!a || typeof a != "string")
				return c;
			if (l !== 1 && l !== 9)
				return [];
			j = g(b);
			if (!j && !d)
				if ( e = Q.exec(a))
					if ( k = e[1]) {
						if (l === 9) {
							f = b.getElementById(k);
							if (!f || !f.parentNode)
								return c;
							if (f.id === k) {
								c.push(f);
								return c
							}
						} else if (b.ownerDocument && ( f = b.ownerDocument.getElementById(k)) && i(b, f) && f.id === k) {
							c.push(f);
							return c
						}
					} else {
						if (e[2]) {
							x.apply(c, y.call(b.getElementsByTagName(a), 0));
							return c
						}
						if (( k = e[3]) && cb && b.getElementsByClassName) {
							x.apply(c, y.call(b.getElementsByClassName(k), 0));
							return c
						}
					}
			return sb(a.replace(M, "$1"), b, c, d, j)
		}

		function gb(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return c === "input" && b.type === a
			}
		}

		function hb(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return (c === "input" || c === "button") && b.type === a
			}
		}

		function ib(a) {
			return A(function(b) {
				b = +b;
				return A(function(c, d) {
					var e, f = a([], c.length, b), g = f.length;
					while (g--)
					c[ e = f[g]] && (c[e] = !(d[e] = c[e]))
				})
			})
		}

		function jb(a, b, c) {
			if (a === b)
				return c;
			var d = a.nextSibling;
			while (d) {
				if (d === b)
					return -1;
				d = d.nextSibling
			}
			return 1
		}

		function kb(a, b) {
			var c, d, f, g, i, j, k, l = D
			[p][a + " "];
			if (l)
				return b ? 0 : l.slice(0);
			i = a;
			j = [];
			k = e.preFilter;
			while (i) {
				if (!c || ( d = N.exec(i))) {
					d && ( i = i.slice(d[0].length) || i);
					j.push( f = [])
				}
				c = !1;
				if ( d = O.exec(i)) {
					f.push( c = new r(d.shift()));
					i = i.slice(c.length);
					c.type = d[0].replace(M, " ")
				}
				for (g in e.filter)
				if (( d = X[g].exec(i)) && (!k[g] || ( d = k[g](d)))) {
					f.push( c = new r(d.shift()));
					i = i.slice(c.length);
					c.type = g;
					c.matches = d
				}
				if (!c)
					break
			}
			return b ? i.length : i ? fb.error(a) : D(a, j).slice(0)
		}

		function lb(a, b, d) {
			var e = b.dir, f = d && b.dir === "parentNode", g = v++;
			return b.first ? function(b, c, d) {
				while ( b = b[e])
				if (f || b.nodeType === 1)
					return a(b, c, d)
			} : function(b, d, i) {
				if (!i) {
					var j, k = u + " " + g + " ", l = k + c;
					while ( b = b[e])
					if (f || b.nodeType === 1) {
						if (( j = b[p]) === l)
							return b.sizset;
						if ( typeof j == "string" && j.indexOf(k) === 0) {
							if (b.sizset)
								return b
						} else {
							b[p] = l;
							if (a(b, d, i)) {
								b.sizset = !0;
								return b
							}
							b.sizset = !1
						}
					}
				} else
					while ( b = b[e])
					if (f || b.nodeType === 1)
						if (a(b, d, i))
							return b
			}
		}

		function mb(a) {
			return a.length > 1 ? function(b, c, d) {
				var e = a.length;
				while (e--)
				if (!a[e](b, c, d))
					return !1;
				return !0
			} : a[0]
		}

		function nb(a, b, c, d, e) {
			var f, g = [], i = 0, j = a.length, k = b != null;
			for (; i < j; i++)
				if ( f = a[i])
					if (!c || c(f, d, e)) {
						g.push(f);
						k && b.push(i)
					}
			return g
		}

		function ob(a, b, c, d, e, f) {
			d && !d[p] && ( d = ob(d));
			e && !e[p] && ( e = ob(e, f));
			return A(function(f, g, i, j) {
				var k, l, m, n = [], o = [], p = g.length, q = f || rb(b || "*", i.nodeType ? [i] : i, []), r = a && (f || !b) ? nb(q, n, a, i, j) : q, s = c ? e || ( f ? a : p || d) ? [] : g : r;
				c && c(r, s, i, j);
				if (d) {
					k = nb(s, o);
					d(k, [], i, j);
					l = k.length;
					while (l--)
					if ( m = k[l])
						s[o[l]] = !(r[o[l]] = m)
				}
				if (f) {
					if (e || a) {
						if (e) {
							k = [];
							l = s.length;
							while (l--)( m = s[l]) && k.push(r[l] = m);
							e(null, s = [], k, j)
						}
						l = s.length;
						while (l--)( m = s[l]) && ( k = e ? z.call(f, m) : n[l]) > -1 && (f[k] = !(g[k] = m))
					}
				} else {
					s = nb(s === g ? s.splice(p, s.length) : s);
					e ? e(null, g, s, j) : x.apply(g, s)
				}
			})
		}

		function pb(a) {
			var b, c, d, f = a.length, g = e.relative[a[0].type], i = g || e.relative[" "], j = g ? 1 : 0, k = lb(function(a) {
				return a === b
			}, i, !0), l = lb(function(a) {
				return z.call(b, a) > -1
			}, i, !0), n = [
			function(a, c, d) {
				return !g && (d || c !== m) || (( b = c).nodeType ? k(a, c, d) : l(a, c, d))
			}];
			for (; j < f; j++)
				if ( c = e.relative[a[j].type])
					n = [lb(mb(n), c)];
				else {
					c = e.filter[a[j].type].apply(null, a[j].matches);
					if (c[p]) {
						d = ++j;
						for (; d < f; d++)
							if (e.relative[a[d].type])
								break;
						return ob(j > 1 && mb(n), j > 1 && a.slice(0, j - 1).join("").replace(M, "$1"), c, j < d && pb(a.slice(j, d)), d < f && pb( a = a.slice(d)), d < f && a.join(""))
					}
					n.push(c)
				}
			return mb(n)
		}

		function qb(a, b) {
			var d = b.length > 0, f = a.length > 0, g = function(i, j, k, l, n) {
				var o, p, q, r = [], t = 0, v = "0", y = i && [], z = n != null, A = m, B = i || f && e.find.TAG("*", n && j.parentNode || j), C = u += A == null ? 1 : Math.E;
				if (z) {
					m = j !== s && j;
					c = g.el
				}
				for (; ( o = B[v]) != null; v++) {
					if (f && o) {
						for ( p = 0; q = a[p]; p++)
							if (q(o, j, k)) {
								l.push(o);
								break
							}
						if (z) {
							u = C;
							c = ++g.el
						}
					}
					if (d) {
						( o = !q && o) && t--;
						i && y.push(o)
					}
				}
				t += v;
				if (d && v !== t) {
					for ( p = 0; q = b[p]; p++)
						q(y, r, j, k);
					if (i) {
						if (t > 0)
							while (v--)!y[v] && !r[v] && (r[v] = w.call(l));
						r = nb(r)
					}
					x.apply(l, r);
					z && !i && r.length > 0 && t + b.length > 1 && fb.uniqueSort(l)
				}
				if (z) {
					u = C;
					m = A
				}
				return y
			};
			g.el = 0;
			return d ? A(g) : g
		}

		function rb(a, b, c) {
			var d = 0, e = b.length;
			for (; d < e; d++)
				fb(a, b[d], c);
			return c
		}

		function sb(a, b, c, d, f) {
			var g, i, k, l, m, n = kb(a), o = n.length;
			if (!d && n.length === 1) {
				i = n[0] = n[0].slice(0);
				if (i.length > 2 && ( k = i[0]).type === "ID" && b.nodeType === 9 && !f && e.relative[i[1].type]) {
					b = e.find.ID(k.matches[0].replace(W,""),b,f)[0];
					if (!b)
						return c;
					a = a.slice(i.shift().length)
				}
				for ( g = X.POS.test(a) ? -1 : i.length - 1; g >= 0; g--) {
					k = i[g];
					if (e.relative[ l = k.type])
						break;
					if ( m = e.find[l])
						if ( d = m(k.matches[0].replace(W, ""), S.test(i[0].type) && b.parentNode || b, f)) {
							i.splice(g, 1);
							a = d.length && i.join("");
							if (!a) {
								x.apply(c, y.call(d, 0));
								return c
							}
							break
						}
				}
			}
			j(a,n)(d, b, f, c, S.test(a));
			return c
		}

		function tb() {
		}

		var c, d, e, f, g, i, j, k, l, m, n = !0, o = "undefined", p = ("sizcache" + Math.random()).replace(".", ""), r = String, s = a.document, t = s.documentElement, u = 0, v = 0, w = [].pop, x = [].push, y = [].slice, z = [].indexOf ||
		function(a) {
			var b = 0, c = this.length;
			for (; b < c; b++)
				if (this[b] === a)
					return b;
			return -1
		}, A = function(a, b) {
			a[p] = b == null || b;
			return a
		}, B = function() {
			var a = {}, b = [];
			return A(function(c, d) {
				b.push(c) > e.cacheLength &&
				delete a[b.shift()];
				return a[c + " "] = d
			}, a)
		}, C = B(), D = B(), E = B(), F = "[\\x20\\t\\r\\n\\f]", G = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", H = G.replace("w", "w#"), I = "([*^$|!~]?=)", J = "\\[" + F + "*(" + G + ")" + F + "*(?:" + I + F + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + H + ")|)|)" + F + "*\\]", K = ":(" + G + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + J + ")|[^:]|\\\\.)*|.*))\\)|)", L = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", M = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"), N = new RegExp("^" + F + "*," + F + "*"), O = new RegExp("^" + F + "*([\\x20\\t\\r\\n\\f>+~])" + F + "*"), P = new RegExp(K), Q = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, R = /^:not/, S = /[\x20\t\r\n\f]*[+~]/, T = /:not\($/, U = /h\d/i, V = /input|select|textarea|button/i, W = /\\(?!\\)/g, X = {
			ID : new RegExp("^#(" + G + ")"),
			CLASS : new RegExp("^\\.(" + G + ")"),
			NAME : new RegExp("^\\[name=['\"]?(" + G + ")['\"]?\\]"),
			TAG : new RegExp("^(" + G.replace("w", "w*") + ")"),
			ATTR : new RegExp("^" + J),
			PSEUDO : new RegExp("^" + K),
			POS : new RegExp(L, "i"),
			CHILD : new RegExp("^:(only|nth|first|last)-child(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
			needsContext : new RegExp("^" + F + "*[>+~]|" + L, "i")
		}, Y = function(a) {
			var b = s.createElement("div");
			try {
				return a(b)
			} catch(c) {
				return !1
			} finally {
				b = null
			}
		}, Z = Y(function(a) {
			a.appendChild(s.createComment(""));
			return !a.getElementsByTagName("*").length
		}), ab = Y(function(a) {
			a.innerHTML = "<a href='#'></a>";
			return a.firstChild && typeof a.firstChild.getAttribute !== o && a.firstChild.getAttribute("href") === "#"
		}), bb = Y(function(a) {
			a.innerHTML = "<select></select>";
			var b = typeof a.lastChild.getAttribute("multiple");
			return b !== "boolean" && b !== "string"
		}), cb = Y(function(a) {
			a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
			if (!a.getElementsByClassName || !a.getElementsByClassName("e").length)
				return !1;
			a.lastChild.className = "e";
			return a.getElementsByClassName("e").length === 2
		}), db = Y(function(a) {
			a.id = p + 0;
			a.innerHTML = "<a name='" + p + "'></a><div name='" + p + "'></div>";
			t.insertBefore(a, t.firstChild);
			var b = s.getElementsByName && s.getElementsByName(p).length === 2 + s.getElementsByName(p + 0).length;
			d = !s.getElementById(p);
			t.removeChild(a);
			return b
		});
		try {
			y.call(t.childNodes,0)[0].nodeType
		} catch(eb) {
			y = function(a) {
				var b, c = [];
				for (; b = this[a]; a++)
					c.push(b);
				return c
			}
		}
		fb.matches = function(a, b) {
			return fb(a, null, null, b)
		};
		fb.matchesSelector = function(a, b) {
			return fb(b, null, null, [a]).length > 0
		};
		f = fb.getText = function(a) {
			var b, c = "", d = 0, e = a.nodeType;
			if (e) {
				if (e === 1 || e === 9 || e === 11) {
					if ( typeof a.textContent == "string")
						return a.textContent;
					for ( a = a.firstChild; a; a = a.nextSibling)
						c += f(a)
				} else if (e === 3 || e === 4)
					return a.nodeValue
			} else
				for (; b = a[d]; d++)
					c += f(b);
			return c
		};
		g = fb.isXML = function(a) {
			var b = a && (a.ownerDocument || a).documentElement;
			return b ? b.nodeName !== "HTML" : !1
		};
		i = fb.contains = t.contains ? function(a, b) {
			var c = a.nodeType === 9 ? a.documentElement : a, d = b && b.parentNode;
			return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d))
		} : t.compareDocumentPosition ? function(a, b) {
			return b && !!(a.compareDocumentPosition(b) & 16)
		} : function(a, b) {
			while ( b = b.parentNode)
			if (b === a)
				return !0;
			return !1
		};
		fb.attr = function(a, b) {
			var c, d = g(a);
			d || ( b = b.toLowerCase());
			if ( c = e.attrHandle[b])
				return c(a);
			if (d || bb)
				return a.getAttribute(b);
			c = a.getAttributeNode(b);
			return c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null
		};
		e = fb.selectors = {
			cacheLength : 50,
			createPseudo : A,
			match : X,
			attrHandle : ab ? {} : {
				href : function(a) {
					return a.getAttribute("href", 2)
				},
				type : function(a) {
					return a.getAttribute("type")
				}
			},
			find : {
				ID : d ? function(a, b, c) {
					if ( typeof b.getElementById !== o && !c) {
						var d = b.getElementById(a);
						return d && d.parentNode ? [d] : []
					}
				} : function(a, c, d) {
					if ( typeof c.getElementById !== o && !d) {
						var e = c.getElementById(a);
						return e ? e.id === a || typeof e.getAttributeNode !== o && e.getAttributeNode("id").value === a ? [e] : b : []
					}
				},
				TAG : Z ? function(a, b) {
					if ( typeof b.getElementsByTagName !== o)
						return b.getElementsByTagName(a)
				} : function(a, b) {
					var c = b.getElementsByTagName(a);
					if (a === "*") {
						var d, e = [], f = 0;
						for (; d = c[f]; f++)
							d.nodeType === 1 && e.push(d);
						return e
					}
					return c
				},
				NAME : db &&
				function(a, b) {
					if ( typeof b.getElementsByName !== o)
						return b.getElementsByName(name)
				},
				CLASS : cb &&
				function(a, b, c) {
					if ( typeof b.getElementsByClassName !== o && !c)
						return b.getElementsByClassName(a)
				}

			},
			relative : {
				">" : {
					dir : "parentNode",
					first : !0
				},
				" " : {
					dir : "parentNode"
				},
				"+" : {
					dir : "previousSibling",
					first : !0
				},
				"~" : {
					dir : "previousSibling"
				}
			},
			preFilter : {
				ATTR : function(a) {
					a[1] = a[1].replace(W, "");
					a[3] = (a[4] || a[5] || "").replace(W, "");
					a[2] === "~=" && (a[3] = " " + a[3] + " ");
					return a.slice(0, 4)
				},
				CHILD : function(a) {
					a[1] = a[1].toLowerCase();
					if (a[1] === "nth") {
						a[2] || fb.error(a[0]);
						a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd"));
						a[4] = +(a[6] + a[7] || a[2] === "odd")
					} else
						a[2] && fb.error(a[0]);
					return a
				},
				PSEUDO : function(a) {
					var b, c;
					if (X.CHILD.test(a[0]))
						return null;
					if (a[3])
						a[2] = a[3];
					else if ( b = a[4]) {
						if (P.test(b) && ( c = kb(b, !0)) && ( c = b.indexOf(")", b.length - c) - b.length)) {
							b = b.slice(0, c);
							a[0] = a[0].slice(0, c)
						}
						a[2] = b
					}
					return a.slice(0, 3)
				}
			},
			filter : {
				ID : d ? function(a) {
					a = a.replace(W, "");
					return function(b) {
						return b.getAttribute("id") === a
					}
				} : function(a) {
					a = a.replace(W, "");
					return function(b) {
						var c = typeof b.getAttributeNode !== o && b.getAttributeNode("id");
						return c && c.value === a
					}
				},
				TAG : function(a) {
					if (a === "*")
						return function() {
							return !0
						};
					a = a.replace(W, "").toLowerCase();
					return function(b) {
						return b.nodeName && b.nodeName.toLowerCase() === a
					}
				},
				CLASS : function(a) {
					var b = C[p][a + " "];
					return b || ( b = new RegExp("(^|" + F + ")" + a + "(" + F + "|$)")) && C(a, function(a) {
						return b.test(a.className || typeof a.getAttribute !== o && a.getAttribute("class") || "")
					})
				},
				ATTR : function(a, b, c) {
					return function(d, e) {
						var f = fb.attr(d, a);
						if (f == null)
							return b === "!=";
						if (!b)
							return !0;
						f += "";
						return b === "=" ? f === c : b === "!=" ? f !== c : b === "^=" ? c && f.indexOf(c) === 0 : b === "*=" ? c && f.indexOf(c) > -1 : b === "$=" ? c && f.substr(f.length - c.length) === c : b === "~=" ? (" " + f + " ").indexOf(c) > -1 : b === "|=" ? f === c || f.substr(0, c.length + 1) === c + "-" : !1
					}
				},
				CHILD : function(a, b, c, d) {
					return a === "nth" ? function(a) {
						var b, e, f = a.parentNode;
						if (c === 1 && d === 0)
							return !0;
						if (f) {
							e = 0;
							for ( b = f.firstChild; b; b = b.nextSibling)
								if (b.nodeType === 1) {
									e++;
									if (a === b)
										break
								}
						}
						e -= d;
						return e === c || e % c === 0 && e / c >= 0
					} : function(b) {
						var c = b;
						switch(a) {
							case"only":
							case"first":
								while ( c = c.previousSibling)
								if (c.nodeType === 1)
									return !1;
								if (a === "first")
									return !0;
								c = b;
							case"last":
								while ( c = c.nextSibling)
								if (c.nodeType === 1)
									return !1;
								return !0
						}
					}
				},
				PSEUDO : function(a, b) {
					var c, d = e.pseudos[a] || e.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
					if (d[p])
						return d(b);
					if (d.length > 1) {
						c = [a, a, "", b];
						return e.setFilters.hasOwnProperty(a.toLowerCase()) ? A(function(a, c) {
							var e, f = d(a, b), g = f.length;
							while (g--) {
								e = z.call(a, f[g]);
								a[e] = !(c[e] = f[g])
							}
						}) : function(a) {
							return d(a, 0, c)
						}
					}
					return d
				}
			},
			pseudos : {
				not : A(function(a) {
					var b = [], c = [], d = j(a.replace(M, "$1"));
					return d[p] ? A(function(a, b, c, e) {
						var f, g = d(a, null, e, []), i = a.length;
						while (i--)
						if ( f = g[i])
							a[i] = !(b[i] = f)
					}) : function(a, e, f) {
						b[0] = a;
						d(b, null, f, c);
						return !c.pop()
					}
				}),
				has : A(function(a) {
					return function(b) {
						return fb(a, b).length > 0
					}
				}),
				contains : A(function(a) {
					return function(b) {
						return (b.textContent || b.innerText || f(b)).indexOf(a) > -1
					}
				}),
				enabled : function(a) {
					return a.disabled === !1
				},
				disabled : function(a) {
					return a.disabled === !0
				},
				checked : function(a) {
					var b = a.nodeName.toLowerCase();
					return b === "input" && !!a.checked || b === "option" && !!a.selected
				},
				selected : function(a) {
					a.parentNode && a.parentNode.selectedIndex;
					return a.selected === !0
				},
				parent : function(a) {
					return !e.pseudos.empty(a)
				},
				empty : function(a) {
					var b;
					a = a.firstChild;
					while (a) {
						if (a.nodeName > "@" || ( b = a.nodeType) === 3 || b === 4)
							return !1;
						a = a.nextSibling
					}
					return !0
				},
				header : function(a) {
					return U.test(a.nodeName)
				},
				text : function(a) {
					var b, c;
					return a.nodeName.toLowerCase() === "input" && ( b = a.type) === "text" && (( c = a.getAttribute("type")) == null || c.toLowerCase() === b)
				},
				radio : gb("radio"),
				checkbox : gb("checkbox"),
				file : gb("file"),
				password : gb("password"),
				image : gb("image"),
				submit : hb("submit"),
				reset : hb("reset"),
				button : function(a) {
					var b = a.nodeName.toLowerCase();
					return b === "input" && a.type === "button" || b === "button"
				},
				input : function(a) {
					return V.test(a.nodeName)
				},
				focus : function(a) {
					var b = a.ownerDocument;
					return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
				},
				active : function(a) {
					return a === a.ownerDocument.activeElement
				},
				first : ib(function() {
					return [0]
				}),
				last : ib(function(a, b) {
					return [b - 1]
				}),
				eq : ib(function(a, b, c) {
					return [c < 0 ? c + b : c]
				}),
				even : ib(function(a, b) {
					for (var c = 0; c < b; c += 2)
						a.push(c);
					return a
				}),
				odd : ib(function(a, b) {
					for (var c = 1; c < b; c += 2)
						a.push(c);
					return a
				}),
				lt : ib(function(a, b, c) {
					for (var d = c < 0 ? c + b : c; --d >= 0; )
						a.push(d);
					return a
				}),
				gt : ib(function(a, b, c) {
					for (var d = c < 0 ? c + b : c; ++d < b; )
						a.push(d);
					return a
				})
			}
		};
		k = t.compareDocumentPosition ? function(a, b) {
			if (a === b) {
				l = !0;
				return 0
			}
			return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
		} : function(a, b) {
			if (a === b) {
				l = !0;
				return 0
			}
			if (a.sourceIndex && b.sourceIndex)
				return a.sourceIndex - b.sourceIndex;
			var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
			if (g === i)
				return jb(a, b);
			if (!g)
				return -1;
			if (!i)
				return 1;
			while (j) {
				e.unshift(j);
				j = j.parentNode
			}
			j = i;
			while (j) {
				f.unshift(j);
				j = j.parentNode
			}
			c = e.length;
			d = f.length;
			for (var k = 0; k < c && k < d; k++)
				if (e[k] !== f[k])
					return jb(e[k], f[k]);
			return k === c ? jb(a, f[k], -1) : jb(e[k], b, 1)
		};
		[0, 0].sort(k);
		n = !l;
		fb.uniqueSort = function(a) {
			var b, c = [], d = 1, e = 0;
			l = n;
			a.sort(k);
			if (l) {
				for (; b = a[d]; d++)
					b === a[d - 1] && ( e = c.push(d));
				while (e--)
				a.splice(c[e], 1)
			}
			return a
		};
		fb.error = function(a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		};
		j = fb.compile = function(a, b) {
			var c, d = [], e = [], f = E[p][a + " "];
			if (!f) {
				b || ( b = kb(a));
				c = b.length;
				while (c--) {
					f = pb(b[c]);
					f[p] ? d.push(f) : e.push(f)
				}
				f = E(a, qb(e, d))
			}
			return f
		};
		s.querySelectorAll && function() {
			var a, b = sb, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [":focus"], f = [":active"], i = t.matchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector || t.msMatchesSelector;
			Y(function(a) {
				a.innerHTML = "<select><option selected=''></option></select>";
				a.querySelectorAll("[selected]").length || e.push("\\[" + F + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
				a.querySelectorAll(":checked").length || e.push(":checked")
			});
			Y(function(a) {
				a.innerHTML = "<p test=''></p>";
				a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + F + "*(?:\"\"|'')");
				a.innerHTML = "<input type='hidden'/>";
				a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
			});
			e = new RegExp(e.join("|"));
			sb = function(a, d, f, g, i) {
				if (!g && !i && !e.test(a)) {
					var j, k, l = !0, m = p, n = d, o = d.nodeType === 9 && a;
					if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
						j = kb(a);
						( l = d.getAttribute("id")) ? m = l.replace(c, "\\$&") : d.setAttribute("id", m);
						m = "[id='" + m + "'] ";
						k = j.length;
						while (k--)
						j[k] = m + j[k].join("");
						n = S.test(a) && d.parentNode || d;
						o = j.join(",")
					}
					if (o)
						try {
							x.apply(f, y.call(n.querySelectorAll(o), 0));
							return f
						} catch(q) {
						} finally {
							l || d.removeAttribute("id")
						}
				}
				return b(a, d, f, g, i)
			};
			if (i) {
				Y(function(b) {
					a = i.call(b, "div");
					try {
						i.call(b, "[test!='']:sizzle");
						f.push("!=", K)
					} catch(c) {
					}
				});
				f = new RegExp(f.join("|"));
				fb.matchesSelector = function(b, c) {
					c = c.replace(d, "='$1']");
					if (!g(b) && !f.test(c) && !e.test(c))
						try {
							var j = i.call(b, c);
							if (j || a || b.document && b.document.nodeType !== 11)
								return j
						} catch(k) {
						}
					return fb(c, null, null, [b]).length > 0
				}
			}
		}();
		e.pseudos.nth = e.pseudos.eq;
		e.filters = tb.prototype = e.pseudos;
		e.setFilters = new tb;
		fb.attr = q.attr;
		q.find = fb;
		q.expr = fb.selectors;
		q.expr[":"] = q.expr.pseudos;
		q.unique = fb.uniqueSort;
		q.text = fb.getText;
		q.isXMLDoc = fb.isXML;
		q.contains = fb.contains
	})(a);
	var fb = /Until$/, gb = /^(?:parents|prev(?:Until|All))/, hb = /^.[^:#\[\.,]*$/, ib = q.expr.match.needsContext, jb = {
		children : !0,
		contents : !0,
		next : !0,
		prev : !0
	};
	q.fn.extend({
		find : function(a) {
			var b, c, d, e, f, g, i = this;
			if ( typeof a != "string")
				return q(a).filter(function() {
					for ( b = 0, c = i.length; b < c; b++)
						if (q.contains(i[b], this))
							return !0
				});
			g = this.pushStack("", "find", a);
			for ( b = 0, c = this.length; b < c; b++) {
				d = g.length;
				q.find(a, this[b], g);
				if (b > 0)
					for ( e = d; e < g.length; e++)
						for ( f = 0; f < d; f++)
							if (g[f] === g[e]) {
								g.splice(e--, 1);
								break
							}
			}
			return g
		},
		has : function(a) {
			var b, c = q(a, this), d = c.length;
			return this.filter(function() {
				for ( b = 0; b < d; b++)
					if (q.contains(this, c[b]))
						return !0
			})
		},
		not : function(a) {
			return this.pushStack(mb(this, a, !1), "not", a)
		},
		filter : function(a) {
			return this.pushStack(mb(this, a, !0), "filter", a)
		},
		is : function(a) {
			return !!a && ( typeof a == "string" ? ib.test(a) ? q(a, this.context).index(this[0]) >= 0 : q.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest : function(a, b) {
			var c, d = 0, e = this.length, f = [], g = ib.test(a) || typeof a != "string" ? q(a, b || this.context) : 0;
			for (; d < e; d++) {
				c = this[d];
				while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
					if ( g ? g.index(c) > -1 : q.find.matchesSelector(c, a)) {
						f.push(c);
						break
					}
					c = c.parentNode
				}
			}
			f = f.length > 1 ? q.unique(f) : f;
			return this.pushStack(f, "closest", a)
		},
		index : function(a) {
			return a ? typeof a == "string" ? q.inArray(this[0], q(a)) : q.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add : function(a, b) {
			var c = typeof a == "string" ? q(a, b) : q.makeArray(a && a.nodeType ? [a] : a), d = q.merge(this.get(), c);
			return this.pushStack(kb(c[0]) || kb(d[0]) ? d : q.unique(d))
		},
		addBack : function(a) {
			return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
		}
	});
	q.fn.andSelf = q.fn.addBack;
	q.each({
		parent : function(a) {
			var b = a.parentNode;
			return b && b.nodeType !== 11 ? b : null
		},
		parents : function(a) {
			return q.dir(a, "parentNode")
		},
		parentsUntil : function(a, b, c) {
			return q.dir(a, "parentNode", c)
		},
		next : function(a) {
			return lb(a, "nextSibling")
		},
		prev : function(a) {
			return lb(a, "previousSibling")
		},
		nextAll : function(a) {
			return q.dir(a, "nextSibling")
		},
		prevAll : function(a) {
			return q.dir(a, "previousSibling")
		},
		nextUntil : function(a, b, c) {
			return q.dir(a, "nextSibling", c)
		},
		prevUntil : function(a, b, c) {
			return q.dir(a, "previousSibling", c)
		},
		siblings : function(a) {
			return q.sibling((a.parentNode || {}).firstChild, a)
		},
		children : function(a) {
			return q.sibling(a.firstChild)
		},
		contents : function(a) {
			return q.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : q.merge([], a.childNodes)
		}
	}, function(a, b) {
		q.fn[a] = function(c, d) {
			var e = q.map(this, b, c);
			fb.test(a) || ( d = c);
			d && typeof d == "string" && ( e = q.filter(d, e));
			e = this.length > 1 && !jb[a] ? q.unique(e) : e;
			this.length > 1 && gb.test(a) && ( e = e.reverse());
			return this.pushStack(e, a, l.call(arguments).join(","))
		}
	});
	q.extend({
		filter : function(a, b, c) {
			c && ( a = ":not(" + a + ")");
			return b.length === 1 ? q.find.matchesSelector(b[0], a) ? [b[0]] : [] : q.find.matches(a, b)
		},
		dir : function(a, c, d) {
			var e = [], f = a[c];
			while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !q(f).is(d))) {
				f.nodeType === 1 && e.push(f);
				f = f[c]
			}
			return e
		},
		sibling : function(a, b) {
			var c = [];
			for (; a; a = a.nextSibling)
				a.nodeType === 1 && a !== b && c.push(a);
			return c
		}
	});
	var ob = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", pb = / jQuery\d+="(?:null|\d+)"/g, qb = /^\s+/, rb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, sb = /<([\w:]+)/, tb = /<tbody/i, ub = /<|&#?\w+;/, vb = /<(?:script|style|link)/i, wb = /<(?:script|object|embed|option|style)/i, xb = new RegExp("<(?:" + ob + ")[\\s/>]", "i"), yb = /^(?:checkbox|radio)$/, zb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ab = /\/(java|ecma)script/i, Bb = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, Cb = {
		option : [1, "<select multiple='multiple'>", "</select>"],
		legend : [1, "<fieldset>", "</fieldset>"],
		thead : [1, "<table>", "</table>"],
		tr : [2, "<table><tbody>", "</tbody></table>"],
		td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		area : [1, "<map>", "</map>"],
		_default : [0, "", ""]
	}, Db = nb(e), Eb = Db.appendChild(e.createElement("div"));
	Cb.optgroup = Cb.option;
	Cb.tbody = Cb.tfoot = Cb.colgroup = Cb.caption = Cb.thead;
	Cb.th = Cb.td;
	q.support.htmlSerialize || (Cb._default = [1, "X<div>", "</div>"]);
	q.fn.extend({
		text : function(a) {
			return q.access(this, function(a) {
				return a === b ? q.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a))
			}, null, a, arguments.length)
		},
		wrapAll : function(a) {
			if (q.isFunction(a))
				return this.each(function(b) {
					q(this).wrapAll(a.call(this, b))
				});
			if (this[0]) {
				var b = q(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]);
				b.map(function() {
					var a = this;
					while (a.firstChild && a.firstChild.nodeType === 1)
					a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner : function(a) {
			return q.isFunction(a) ? this.each(function(b) {
				q(this).wrapInner(a.call(this, b))
			}) : this.each(function() {
				var b = q(this), c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap : function(a) {
			var b = q.isFunction(a);
			return this.each(function(c) {
				q(this).wrapAll( b ? a.call(this, c) : a)
			})
		},
		unwrap : function() {
			return this.parent().each(function() {
				q.nodeName(this, "body") || q(this).replaceWith(this.childNodes)
			}).end()
		},
		append : function() {
			return this.domManip(arguments, !0, function(a) {
				(this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
			})
		},
		prepend : function() {
			return this.domManip(arguments, !0, function(a) {
				(this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
			})
		},
		before : function() {
			if (!kb(this[0]))
				return this.domManip(arguments, !1, function(a) {
					this.parentNode.insertBefore(a, this)
				});
			if (arguments.length) {
				var a = q.clean(arguments);
				return this.pushStack(q.merge(a, this), "before", this.selector)
			}
		},
		after : function() {
			if (!kb(this[0]))
				return this.domManip(arguments, !1, function(a) {
					this.parentNode.insertBefore(a, this.nextSibling)
				});
			if (arguments.length) {
				var a = q.clean(arguments);
				return this.pushStack(q.merge(this, a), "after", this.selector)
			}
		},
		remove : function(a, b) {
			var c, d = 0;
			for (; ( c = this[d]) != null; d++)
				if (!a || q.filter(a, [c]).length) {
					if (!b && c.nodeType === 1) {
						q.cleanData(c.getElementsByTagName("*"));
						q.cleanData([c])
					}
					c.parentNode && c.parentNode.removeChild(c)
				}
			return this
		},
		empty : function() {
			var a, b = 0;
			for (; ( a = this[b]) != null; b++) {
				a.nodeType === 1 && q.cleanData(a.getElementsByTagName("*"));
				while (a.firstChild)
				a.removeChild(a.firstChild)
			}
			return this
		},
		clone : function(a, b) {
			a = a == null ? !1 : a;
			b = b == null ? a : b;
			return this.map(function() {
				return q.clone(this, a, b)
			})
		},
		html : function(a) {
			return q.access(this, function(a) {
				var c = this[0] || {}, d = 0, e = this.length;
				if (a === b)
					return c.nodeType === 1 ? c.innerHTML.replace(pb, "") : b;
				if ( typeof a == "string" && !vb.test(a) && (q.support.htmlSerialize || !xb.test(a)) && (q.support.leadingWhitespace || !qb.test(a)) && !Cb[(sb.exec(a)||["",""])[1].toLowerCase()]) {
					a = a.replace(rb, "<$1></$2>");
					try {
						for (; d < e; d++) {
							c = this[d] || {};
							if (c.nodeType === 1) {
								q.cleanData(c.getElementsByTagName("*"));
								c.innerHTML = a
							}
						}
						c = 0
					} catch(f) {
					}
				}
				c && this.empty().append(a)
			}, null, a, arguments.length)
		},
		replaceWith : function(a) {
			if (!kb(this[0])) {
				if (q.isFunction(a))
					return this.each(function(b) {
						var c = q(this), d = c.html();
						c.replaceWith(a.call(this, b, d))
					});
				typeof a != "string" && ( a = q(a).detach());
				return this.each(function() {
					var b = this.nextSibling, c = this.parentNode;
					q(this).remove();
					b ? q(b).before(a) : q(c).append(a)
				})
			}
			return this.length ? this.pushStack(q(q.isFunction(a) ? a() : a), "replaceWith", a) : this
		},
		detach : function(a) {
			return this.remove(a, !0)
		},
		domManip : function(a, c, d) {
			a = [].concat.apply([], a);
			var e, f, g, i, j = 0, k = a[0], l = [], m = this.length;
			if (!q.support.checkClone && m > 1 && typeof k == "string" && zb.test(k))
				return this.each(function() {
					q(this).domManip(a, c, d)
				});
			if (q.isFunction(k))
				return this.each(function(e) {
					var f = q(this);
					a[0] = k.call(this, e, c ? f.html() : b);
					f.domManip(a, c, d)
				});
			if (this[0]) {
				e = q.buildFragment(a, this, l);
				g = e.fragment;
				f = g.firstChild;
				g.childNodes.length === 1 && ( g = f);
				if (f) {
					c = c && q.nodeName(f, "tr");
					for ( i = e.cacheable || m - 1; j < m; j++)
						d.call(c && q.nodeName(this[j], "table") ? Fb(this[j], "tbody") : this[j], j === i ? g : q.clone(g, !0, !0))
				}
				g = f = null;
				l.length && q.each(l, function(a, b) {
					b.src ? q.ajax ? q.ajax({
						url : b.src,
						type : "GET",
						dataType : "script",
						async : !1,
						global : !1,
						"throws" : !0
					}) : q.error("no ajax") : q.globalEval((b.text || b.textContent || b.innerHTML || "").replace(Bb, ""));
					b.parentNode && b.parentNode.removeChild(b)
				})
			}
			return this
		}
	});
	q.buildFragment = function(a, c, d) {
		var f, g, i, j = a[0];
		c = c || e;
		c = !c.nodeType && c[0] || c;
		c = c.ownerDocument || c;
		if (a.length === 1 && typeof j == "string" && j.length < 512 && c === e && j.charAt(0) === "<" && !wb.test(j) && (q.support.checkClone || !zb.test(j)) && (q.support.html5Clone || !xb.test(j))) {
			g = !0;
			f = q.fragments[j];
			i = f !== b
		}
		if (!f) {
			f = c.createDocumentFragment();
			q.clean(a, c, f, d);
			g && (q.fragments[j] = i && f)
		}
		return {
			fragment : f,
			cacheable : g
		}
	};
	q.fragments = {};
	q.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function(a, b) {
		q.fn[a] = function(c) {
			var d, e = 0, f = [], g = q(c), i = g.length, j = this.length === 1 && this[0].parentNode;
			if ((j == null || j && j.nodeType === 11 && j.childNodes.length === 1) && i === 1) {
				g[b](this[0]);
				return this
			}
			for (; e < i; e++) {
				d = (e > 0 ? this.clone(!0) : this).get();
				q(g[e])[b](d);
				f = f.concat(d)
			}
			return this.pushStack(f, a, g.selector)
		}
	});
	q.extend({
		clone : function(a, b, c) {
			var d, e, f, g;
			if (q.support.html5Clone || q.isXMLDoc(a) || !xb.test("<" + a.nodeName + ">"))
				g = a.cloneNode(!0);
			else {
				Eb.innerHTML = a.outerHTML;
				Eb.removeChild( g = Eb.firstChild)
			}
			if ((!q.support.noCloneEvent || !q.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !q.isXMLDoc(a)) {
				Hb(a, g);
				d = Ib(a);
				e = Ib(g);
				for ( f = 0; d[f]; ++f)
					e[f] && Hb(d[f], e[f])
			}
			if (b) {
				Gb(a, g);
				if (c) {
					d = Ib(a);
					e = Ib(g);
					for ( f = 0; d[f]; ++f)
						Gb(d[f], e[f])
				}
			}
			d = e = null;
			return g
		},
		clean : function(a, b, c, d) {
			var f, g, i, j, k, l, m, n, o, p, r, s, t = b === e && Db, u = [];
			if (!b || typeof b.createDocumentFragment == "undefined")
				b = e;
			for ( f = 0; ( i = a[f]) != null; f++) {
				typeof i == "number" && (i += "");
				if (!i)
					continue;
				if ( typeof i == "string")
					if (!ub.test(i))
						i = b.createTextNode(i);
					else {
						t = t || nb(b);
						m = b.createElement("div");
						t.appendChild(m);
						i = i.replace(rb, "<$1></$2>");
						j = (sb.exec(i)||["",""])[1].toLowerCase();
						k = Cb[j] || Cb._default;
						l = k[0];
						m.innerHTML = k[1] + i + k[2];
						while (l--)
						m = m.lastChild;
						if (!q.support.tbody) {
							n = tb.test(i);
							o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : [];
							for ( g = o.length - 1; g >= 0; --g)
								q.nodeName(o[g], "tbody") && !o[g].childNodes.length && o[g].parentNode.removeChild(o[g])
						}
						!q.support.leadingWhitespace && qb.test(i) && m.insertBefore(b.createTextNode(qb.exec(i)[0]), m.firstChild);
						i = m.childNodes;
						m.parentNode.removeChild(m)
					}
				i.nodeType ? u.push(i) : q.merge(u, i)
			}
			m && ( i = m = t = null);
			if (!q.support.appendChecked)
				for ( f = 0; ( i = u[f]) != null; f++)
					q.nodeName(i, "input") ? Jb(i) : typeof i.getElementsByTagName != "undefined" && q.grep(i.getElementsByTagName("input"), Jb);
			if (c) {
				r = function(a) {
					if (!a.type || Ab.test(a.type))
						return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
				};
				for ( f = 0; ( i = u[f]) != null; f++)
					if (!q.nodeName(i, "script") || !r(i)) {
						c.appendChild(i);
						if ( typeof i.getElementsByTagName != "undefined") {
							s = q.grep(q.merge([], i.getElementsByTagName("script")), r);
							u.splice.apply(u, [f + 1, 0].concat(s));
							f += s.length
						}
					}
			}
			return u
		},
		cleanData : function(a, b) {
			var c, d, e, f, g = 0, i = q.expando, j = q.cache, k = q.support.deleteExpando, l = q.event.special;
			for (; ( e = a[g]) != null; g++)
				if (b || q.acceptData(e)) {
					d = e[i];
					c = d && j[d];
					if (c) {
						if (c.events)
							for (f in c.events)
							l[f] ? q.event.remove(e, f) : q.removeEvent(e, f, c.handle);
						if (j[d]) {
							delete j[d];
							k ?
							delete e[i] : e.removeAttribute ? e.removeAttribute(i) : e[i] = null;
							q.deletedIds.push(d)
						}
					}
				}
		}
	});
	(function() {
		var a, b;
		q.uaMatch = function(a) {
			a = a.toLowerCase();
			var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
			return {
				browser : b[1] || "",
				version : b[2] || "0"
			}
		};
		a = q.uaMatch(g.userAgent);
		b = {};
		if (a.browser) {
			b[a.browser] = !0;
			b.version = a.version
		}
		b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
		q.browser = b;
		q.sub = function() {
			function a(b, c) {
				return new a.fn.init(b, c)
			}


			q.extend(!0, a, this);
			a.superclass = this;
			a.fn = a.prototype = this();
			a.fn.constructor = a;
			a.sub = this.sub;
			a.fn.init = function(d, e) {
				e && e instanceof q && !( e instanceof a) && ( e = a(e));
				return q.fn.init.call(this, d, e, b)
			};
			a.fn.init.prototype = a.fn;
			var b = a(e);
			return a
		}
	})();
	var Kb, Lb, Mb, Nb = /alpha\([^)]*\)/i, Ob = /opacity=([^)]*)/, Pb = /^(top|right|bottom|left)$/, Qb = /^(none|table(?!-c[ea]).+)/, Rb = /^margin/, Sb = new RegExp("^(" + r + ")(.*)$", "i"), Tb = new RegExp("^(" + r + ")(?!px)[a-z%]+$", "i"), Ub = new RegExp("^([-+])=(" + r + ")", "i"), Vb = {
		BODY : "block"
	}, Wb = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	}, Xb = {
		letterSpacing : 0,
		fontWeight : 400
	}, Yb = ["Top", "Right", "Bottom", "Left"], Zb = ["Webkit", "O", "Moz", "ms"], $b = q.fn.toggle;
	q.fn.extend({
		css : function(a, c) {
			return q.access(this, function(a, c, d) {
				return d !== b ? q.style(a, c, d) : q.css(a, c)
			}, a, c, arguments.length > 1)
		},
		show : function() {
			return bc(this, !0)
		},
		hide : function() {
			return bc(this)
		},
		toggle : function(a, b) {
			var c = typeof a == "boolean";
			return q.isFunction(a) && q.isFunction(b) ? $b.apply(this, arguments) : this.each(function() {
				( c ? a : ac(this)) ? q(this).show() : q(this).hide()
			})
		}
	});
	q.extend({
		cssHooks : {
			opacity : {
				get : function(a, b) {
					if (b) {
						var c = Kb(a, "opacity");
						return c === "" ? "1" : c
					}
				}
			}
		},
		cssNumber : {
			fillOpacity : !0,
			fontWeight : !0,
			lineHeight : !0,
			opacity : !0,
			orphans : !0,
			widows : !0,
			zIndex : !0,
			zoom : !0
		},
		cssProps : {
			"float" : q.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style : function(a, c, d, e) {
			if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)
				return;
			var f, g, i, j = q.camelCase(c), k = a.style;
			c = q.cssProps[j] || (q.cssProps[j] = _b(k, j));
			i = q.cssHooks[c] || q.cssHooks[j];
			if (d === b)
				return i && "get" in i && ( f = i.get(a, !1, e)) !== b ? f : k[c];
			g = typeof d;
			if (g === "string" && ( f = Ub.exec(d))) {
				d = (f[1] + 1) * f[2] + parseFloat(q.css(a, c));
				g = "number"
			}
			if (d == null || g === "number" && isNaN(d))
				return;
			g === "number" && !q.cssNumber[j] && (d += "px");
			if (!i || !("set" in i) || ( d = i.set(a, d, e)) !== b)
				try {
					k[c] = d
				} catch(l) {
				}
		},
		css : function(a, c, d, e) {
			var f, g, i, j = q.camelCase(c);
			c = q.cssProps[j] || (q.cssProps[j] = _b(a.style, j));
			i = q.cssHooks[c] || q.cssHooks[j];
			i && "get" in i && ( f = i.get(a, !0, e));
			f === b && ( f = Kb(a, c));
			f === "normal" && c in Xb && ( f = Xb[c]);
			if (d || e !== b) {
				g = parseFloat(f);
				return d || q.isNumeric(g) ? g || 0 : f
			}
			return f
		},
		swap : function(a, b, c) {
			var d, e, f = {};
			for (e in b) {
				f[e] = a.style[e];
				a.style[e] = b[e]
			}
			d = c.call(a);
			for (e in b)
			a.style[e] = f[e];
			return d
		}
	});
	a.getComputedStyle ? Kb = function(b, c) {
		var d, e, f, g, i = a.getComputedStyle(b, null), j = b.style;
		if (i) {
			d = i.getPropertyValue(c) || i[c];
			d === "" && !q.contains(b.ownerDocument, b) && ( d = q.style(b, c));
			if (Tb.test(d) && Rb.test(c)) {
				e = j.width;
				f = j.minWidth;
				g = j.maxWidth;
				j.minWidth = j.maxWidth = j.width = d;
				d = i.width;
				j.width = e;
				j.minWidth = f;
				j.maxWidth = g
			}
		}
		return d
	} : e.documentElement.currentStyle && ( Kb = function(a, b) {
		var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
		e == null && f && f[b] && ( e = f[b]);
		if (Tb.test(e) && !Pb.test(b)) {
			c = f.left;
			d = a.runtimeStyle && a.runtimeStyle.left;
			d && (a.runtimeStyle.left = a.currentStyle.left);
			f.left = b === "fontSize" ? "1em" : e;
			e = f.pixelLeft + "px";
			f.left = c;
			d && (a.runtimeStyle.left = d)
		}
		return e === "" ? "auto" : e
	});
	q.each(["height", "width"], function(a, b) {
		q.cssHooks[b] = {
			get : function(a, c, d) {
				if (c)
					return a.offsetWidth === 0 && Qb.test(Kb(a, "display")) ? q.swap(a, Wb, function() {
						return ec(a, b, d)
					}) : ec(a, b, d)
			},
			set : function(a, c, d) {
				return cc(a, c, d ? dc(a, b, d, q.support.boxSizing && q.css(a, "boxSizing") === "border-box") : 0)
			}
		}
	});
	q.support.opacity || (q.cssHooks.opacity = {
		get : function(a, b) {
			return Ob.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
		},
		set : function(a, b) {
			var c = a.style, d = a.currentStyle, e = q.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || "";
			c.zoom = 1;
			if (b >= 1 && q.trim(f.replace(Nb, "")) === "" && c.removeAttribute) {
				c.removeAttribute("filter");
				if (d && !d.filter)
					return
			}
			c.filter = Nb.test(f) ? f.replace(Nb, e) : f + " " + e
		}
	});
	q(function() {
		q.support.reliableMarginRight || (q.cssHooks.marginRight = {
			get : function(a, b) {
				return q.swap(a, {
					display : "inline-block"
				}, function() {
					if (b)
						return Kb(a, "marginRight")
				})
			}
		});
		!q.support.pixelPosition && q.fn.position && q.each(["top", "left"], function(a, b) {
			q.cssHooks[b] = {
				get : function(a, c) {
					if (c) {
						var d = Kb(a, b);
						return Tb.test(d) ? q(a).position()[b] + "px" : d
					}
				}
			}
		})
	});
	if (q.expr && q.expr.filters) {
		q.expr.filters.hidden = function(a) {
			return a.offsetWidth === 0 && a.offsetHeight === 0 || !q.support.reliableHiddenOffsets && (a.style && a.style.display || Kb(a, "display")) === "none"
		};
		q.expr.filters.visible = function(a) {
			return !q.expr.filters.hidden(a)
		}
	}
	q.each({
		margin : "",
		padding : "",
		border : "Width"
	}, function(a, b) {
		q.cssHooks[a + b] = {
			expand : function(c) {
				var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
				for ( d = 0; d < 4; d++)
					f[a + Yb[d] + b] = e[d] || e[d - 2] || e[0];
				return f
			}
		};
		Rb.test(a) || (q.cssHooks[a + b].set = cc)
	});
	var gc = /%20/g, hc = /\[\]$/, ic = /\r?\n/g, jc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, kc = /^(?:select|textarea)/i;
	q.fn.extend({
		serialize : function() {
			return q.param(this.serializeArray())
		},
		serializeArray : function() {
			return this.map(function() {
				return this.elements ? q.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || kc.test(this.nodeName) || jc.test(this.type))
			}).map(function(a, b) {
				var c = q(this).val();
				return c == null ? null : q.isArray(c) ? q.map(c, function(a, c) {
					return {
						name : b.name,
						value : a.replace(ic, "\r\n")
					}
				}) : {
					name : b.name,
					value : c.replace(ic, "\r\n")
				}
			}).get()
		}
	});
	q.param = function(a, c) {
		var d, e = [], f = function(a, b) {
			b = q.isFunction(b) ? b() : b == null ? "" : b;
			e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
		};
		c === b && ( c = q.ajaxSettings && q.ajaxSettings.traditional);
		if (q.isArray(a) || a.jquery && !q.isPlainObject(a))
			q.each(a, function() {
				f(this.name, this.value)
			});
		else
			for (d in a)lc(d, a[d], c, f);
		return e.join("&").replace(gc, "+")
	};
	var mc, nc, oc = /#.*$/, pc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, qc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rc = /^(?:GET|HEAD)$/, sc = /^\/\//, tc = /\?/, uc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, vc = /([?&])_=[^&]*/, wc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, xc = q.fn.load, yc = {}, zc = {
	}, Ac = ["*/"] + ["*"];
	try {
		nc = f.href
	} catch(Bc) {
		nc = e.createElement("a");
		nc.href = "";
		nc = nc.href
	}
	mc = wc.exec(nc.toLowerCase()) || [];
	q.fn.load = function(a, c, d) {
		if ( typeof a != "string" && xc)
			return xc.apply(this, arguments);
		if (!this.length)
			return this;
		var e, f, g, i = this, j = a.indexOf(" ");
		if (j >= 0) {
			e = a.slice(j, a.length);
			a = a.slice(0, j)
		}
		if (q.isFunction(c)) {
			d = c;
			c = b
		} else
			c && typeof c == "object" && ( f = "POST");
		q.ajax({
			url : a,
			type : f,
			dataType : "html",
			data : c,
			complete : function(a, b) {
				d && i.each(d, g || [a.responseText, b, a])
			}
		}).done(function(a) {
			g = arguments;
			i.html( e ? q("<div>").append(a.replace(uc, "")).find(e) : a)
		});
		return this
	};
	q.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		q.fn[b] = function(a) {
			return this.on(b, a)
		}
	});
	q.each(["get", "post"], function(a, c) {
		q[c] = function(a, d, e, f) {
			if (q.isFunction(d)) {
				f = f || e;
				e = d;
				d = b
			}
			return q.ajax({
				type : c,
				url : a,
				data : d,
				success : e,
				dataType : f
			})
		}
	});
	q.extend({
		getScript : function(a, c) {
			return q.get(a, b, c, "script")
		},
		getJSON : function(a, b, c) {
			return q.get(a, b, c, "json")
		},
		ajaxSetup : function(a, b) {
			if (b)
				Ec(a, q.ajaxSettings);
			else {
				b = a;
				a = q.ajaxSettings
			}
			Ec(a, b);
			return a
		},
		ajaxSettings : {
			url : nc,
			isLocal : qc.test(mc[1]),
			global : !0,
			type : "GET",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			processData : !0,
			async : !0,
			accepts : {
				xml : "application/xml, text/xml",
				html : "text/html",
				text : "text/plain",
				json : "application/json, text/javascript",
				"*" : Ac
			},
			contents : {
				xml : /xml/,
				html : /html/,
				json : /json/
			},
			responseFields : {
				xml : "responseXML",
				text : "responseText"
			},
			converters : {
				"* text" : a.String,
				"text html" : !0,
				"text json" : q.parseJSON,
				"text xml" : q.parseXML
			},
			flatOptions : {
				context : !0,
				url : !0
			}
		},
		ajaxPrefilter : Cc(yc),
		ajaxTransport : Cc(zc),
		ajax : function(a, c) {
			function z(a, c, f, j) {
				var l, t, u, v, x, z = c;
				if (w === 2)
					return;
				w = 2;
				i && clearTimeout(i);
				g = b;
				e = j || "";
				y.readyState = a > 0 ? 4 : 0;
				f && ( v = Fc(m, y, f));
				if (a >= 200 && a < 300 || a === 304) {
					if (m.ifModified) {
						x = y.getResponseHeader("Last-Modified");
						x && (q.lastModified[d] = x);
						x = y.getResponseHeader("Etag");
						x && (q.etag[d] = x)
					}
					if (a === 304) {
						z = "notmodified";
						l = !0
					} else {
						l = Gc(m, v);
						z = l.state;
						t = l.data;
						u = l.error;
						l = !u
					}
				} else {
					u = z;
					if (!z || a) {
						z = "error";
						a < 0 && ( a = 0)
					}
				}
				y.status = a;
				y.statusText = (c || z) + "";
				l ? p.resolveWith(n, [t, z, y]) : p.rejectWith(n, [y, z, u]);
				y.statusCode(s);
				s = b;
				k && o.trigger("ajax" + ( l ? "Success" : "Error"), [y, m, l ? t : u]);
				r.fireWith(n, [y, z]);
				if (k) {
					o.trigger("ajaxComplete", [y, m]);
					--q.active || q.event.trigger("ajaxStop")
				}
			}

			if ( typeof a == "object") {
				c = a;
				a = b
			}
			c = c || {};
			var d, e, f, g, i, j, k, l, m = q.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof q) ? q(n) : q.event, p = q.Deferred(), r = q.Callbacks("once memory"), s = m.statusCode || {}, u = {}, v = {}, w = 0, x = "canceled", y = {
				readyState : 0,
				setRequestHeader : function(a, b) {
					if (!w) {
						var c = a.toLowerCase();
						a = v[c] = v[c] || a;
						u[a] = b
					}
					return this
				},
				getAllResponseHeaders : function() {
					return w === 2 ? e : null
				},
				getResponseHeader : function(a) {
					var c;
					if (w === 2) {
						if (!f) {
							f = {};
							while ( c = pc.exec(e))
							f[c[1].toLowerCase()] = c[2]
						}
						c = f[a.toLowerCase()]
					}
					return c === b ? null : c
				},
				overrideMimeType : function(a) {
					w || (m.mimeType = a);
					return this
				},
				abort : function(a) {
					a = a || x;
					g && g.abort(a);
					z(0, a);
					return this
				}
			};
			p.promise(y);
			y.success = y.done;
			y.error = y.fail;
			y.complete = r.add;
			y.statusCode = function(a) {
				if (a) {
					var b;
					if (w < 2)
						for (b in a)
						s[b] = [s[b], a[b]];
					else {
						b = a[y.status];
						y.always(b)
					}
				}
				return this
			};
			m.url = ((a || m.url) + "").replace(oc, "").replace(sc, mc[1] + "//");
			m.dataTypes = q.trim(m.dataType || "*").toLowerCase().split(t);
			if (m.crossDomain == null) {
				j = wc.exec(m.url.toLowerCase());
				m.crossDomain = !(!j || j[1] === mc[1] && j[2] === mc[2] && (j[3] || (j[1] === "http:" ? 80 : 443)) == (mc[3] || (mc[1] === "http:" ? 80 : 443)))
			}
			m.data && m.processData && typeof m.data != "string" && (m.data = q.param(m.data, m.traditional));
			Dc(yc, m, c, y);
			if (w === 2)
				return y;
			k = m.global;
			m.type = m.type.toUpperCase();
			m.hasContent = !
			rc.test(m.type);
			k && q.active++ === 0 && q.event.trigger("ajaxStart");
			if (!m.hasContent) {
				if (m.data) {
					m.url += (tc.test(m.url) ? "&" : "?") + m.data;
					delete m.data
				}
				d = m.url;
				if (m.cache === !1) {
					var A = q.now(), B = m.url.replace(vc, "$1_=" + A);
					m.url = B + (B === m.url ? (tc.test(m.url) ? "&" : "?"
					) + "_=" + A : "")
				}
			}
			(m.data && m.hasContent && m.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", m.contentType);
			if (m.ifModified) {
				d = d || m.url;
				q.lastModified[d] && y.setRequestHeader("If-Modified-Since", q.lastModified[d]);
				q.etag[d] && y.setRequestHeader("If-None-Match", q.etag[d])
			}
			y.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + (m.dataTypes[0] !== "*" ? ", " + Ac + "; q=0.01" : "") : m.accepts["*"]);
			for (l in m.headers)
			y.setRequestHeader(l, m.headers[l]);
			if (!m.beforeSend || m.beforeSend.call(n, y, m) !== !1 && w !== 2) {
				x = "abort";
				for (l in {
					success : 1,
					error : 1,
					complete : 1
				})y[l](m[l]);
				g = Dc(zc, m, c, y);
				if (!g)
					z(-1, "No Transport");
				else {
					y.readyState = 1;
					k && o.trigger("ajaxSend", [y, m]);
					m.async && m.timeout > 0 && ( i = setTimeout(function() {
						y.abort("timeout")
					}, m.timeout));
					try {
						w = 1;
						g.send(u, z)
					} catch(C) {
						if (!(w < 2))
							throw C;
						z(-1, C)
					}
				}
				return y
			}
			return y.abort()
		},
		active : 0,
		lastModified : {},
		etag : {}
	});
	var Hc = [], Ic = /\?/, Jc = /(=)\?(?=&|$)|\?\?/, Kc = q.now();
	q.ajaxSetup({
		jsonp : "callback",
		jsonpCallback : function() {
			var a = Hc.pop() || q.expando + "_" + Kc++;
			this[a] = !0;
			return a
		}
	});
	q.ajaxPrefilter("json jsonp", function(c, d, e) {
		var f, g, i, j = c.data, k = c.url, l = c.jsonp !== !1, m = l && Jc.test(k), n = l && !m && typeof j == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Jc.test(j);
		if (c.
		dataTypes[0] === "jsonp" || m || n) {
			f = c.jsonpCallback = q.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback;
			g = a[f];
			m ? c.url = k.replace(Jc, "$1" + f) : n ? c.data = j.replace(Jc, "$1" + f) : l && (c.url += (Ic.test(k) ? "&" : "?") + c.jsonp + "=" + f);
			c.converters["script json"] = function() {
				i || q.error(f + " was not called");
				return i[0]
			};
			c.dataTypes[0] = "json";
			a[f] = function() {
				i = arguments
			};
			e.always(function() {
				a[f] = g;
				if (c[f]) {
					c.jsonpCallback = d.jsonpCallback;
					Hc.push(f)
				}
				i && q.isFunction(g) && g(i[0]);
				i = g = b
			});
			return "script"
		}
	});
	q.ajaxSetup({
		accepts : {
			script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents : {
			script : /javascript|ecmascript/
		},
		converters : {
			"text script" : function(a) {
				q.globalEval(a);
				return a
			}
		}
	});
	q.ajaxPrefilter("script", function(a) {
		a.cache === b && (a.cache = !1);
		if (a.crossDomain) {
			a.type = "GET";
			a.global = !1
		}
	});
	q.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var c, d = e.head || e.getElementsByTagName("head")[0] || e.documentElement;
			return {
				send : function(_, f) {
					c = e.createElement("script");
					c.async = "async";
					a.scriptCharset && (c.charset = a.scriptCharset);
					c.src = a.url;
					c.onload = c.onreadystatechange = function(_, a) {
						if (a || !c.readyState || /loaded|complete/.test(c.readyState)) {
							c.onload = c.onreadystatechange = null;
							d && c.parentNode && d.removeChild(c);
							c = b;
							a || f(200, "success")
						}
					};
					d.insertBefore(c, d.firstChild)
				},
				abort : function() {
					c && c.onload(0, 1)
				}
			}
		}
	});
	var Lc, Mc = a.ActiveXObject ? function() {
		for (var a in Lc)Lc[a](0, 1)
	} : !1, Nc = 0;
	q.ajaxSettings.xhr = a.ActiveXObject ? function() {
		return !this.isLocal && Oc() || Pc()
	} : Oc;
	(function(a) {
		q.extend(q.support, {
			ajax : !!a,
			cors : !!a && "withCredentials" in a
		})
	})(q.ajaxSettings.xhr());
	q.support.ajax && q.ajaxTransport(function(c) {
		if (!c.crossDomain || q.support.cors) {
			var d;
			return {
				send : function(e, f) {
					var g, i, j = c.xhr();
					c.username ? j.open(c.type, c.url, c.async, c.username, c.password) : j.open(c.type, c.url, c.async);
					if (c.xhrFields)
						for (i in c.xhrFields)
						j[i] = c.xhrFields[i];
					c.mimeType && j.overrideMimeType && j.overrideMimeType(c.mimeType);
					!c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (i in e)
						j.setRequestHeader(i, e[i])
					} catch(_) {
					}
					j.send(c.hasContent && c.data || null);
					d = function(_, a) {
						var e, i, k, l, m;
						try {
							if (d && (a || j.readyState === 4)) {
								d = b;
								if (g) {
									j.onreadystatechange = q.noop;
									Mc &&
									delete Lc[g]
								}
								if (a)
									j.readyState !== 4 && j.abort();
								else {
									e = j.status;
									k = j.getAllResponseHeaders();
									l = {};
									m = j.responseXML;
									m && m.documentElement && (l.xml = m);
									try {
										l.text = j.responseText
									} catch(n) {
									}
									try {
										i = j.statusText
									} catch(n) {
										i = ""
									}
									!e && c.isLocal && !c.crossDomain ? e = l.text ? 200 : 404 : e === 1223 && ( e = 204)
								}
							}
						} catch(o) {
							a || f(-1, o)
						}
						l && f(e, i, l, k)
					};
					if (!c.async)
						d();
					else if (j.readyState === 4)
						setTimeout(d, 0);
					else {
						g = ++Nc;
						if (Mc) {
							if (!Lc) {
								Lc = {};
								q(a).unload(Mc)
							}
							Lc[g] = d
						}
						j.onreadystatechange = d
					}
				},
				abort : function() {
					d && d(0, 1)
				}
			}
		}
	});
	var Qc, Rc, Sc = /^(?:toggle|show|hide)$/, Tc = new RegExp("^(?:([-+])=|)(" + r + ")([a-z%]*)$", "i"), Uc = /queueHooks$/, Vc = [_c], Wc = {
		"*" : [
		function(a, b) {
			var c, d, e = this.createTween(a, b), f = Tc.exec(b), g = e.cur(), i = +g || 0, j = 1, k = 20;
			if (f) {
				c = +f[2];
				d = f[3] || (q.cssNumber[a] ? "" : "px");
				if (d !== "px" && i) {
					i = q.css(e.elem, a, !0) || c || 1;
					do {
						j = j || ".5";
						i /= j;
						q.style(e.elem, a, i + d)
					} while(j!==(j=e.cur()/g)&&j!==1&&--k)
				}
				e.unit = d;
				e.start = i;
				e.end = f[1] ? i + (f[1] + 1) * c : c
			}
			return e
		}]

	};
	q.Animation = q.extend(Zc, {
		tweener : function(a, b) {
			if (q.isFunction(a)) {
				b = a;
				a = ["*"]
			} else
				a = a.split(" ");
			var c, d = 0, e = a.length;
			for (; d < e; d++) {
				c = a[d];
				Wc[c] = Wc[c] || [];
				Wc[c].unshift(b)
			}
		},
		prefilter : function(a, b) {
			b ? Vc.unshift(a) : Vc.push(a)
		}
	});
	q.Tween = ad;
	ad.prototype = {
		constructor : ad,
		init : function(a, b, c, d, e, f) {
			this.elem = a;
			this.prop = c;
			this.easing = e || "swing";
			this.options = b;
			this.start = this.now = this.cur();
			this.end = d;
			this.unit = f || (q.cssNumber[c] ? "" : "px")
		},
		cur : function() {
			var a = ad.propHooks[this.prop];
			return a && a.get ? a.get(this) : ad.propHooks._default.get(this)
		},
		run : function(a) {
			var b, c = ad.propHooks[this.prop];
			this.options.duration ? this.pos = b = q.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a;
			this.now = (this.end - this.start) * b + this.start;
			this.options.step && this.options.step.call(this.elem, this.now, this);
			c && c.set ? c.set(this) : ad.propHooks._default.set(this);
			return this
		}
	};
	ad.prototype.init.prototype = ad.prototype;
	ad.propHooks = {
		_default : {
			get : function(a) {
				var b;
				if (a.
				elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null) {
					b = q.css(a.elem, a.prop, !1, "");
					return !b || b === "auto" ? 0 : b
				}
				return a.elem[a.prop]
			},
			set : function(a) {
				q.fx.step[a.prop] ? q.fx.step[a.prop](a) : a.elem.style && (a.elem.style[q.cssProps[a.prop]] != null || q.cssHooks[a.prop]) ? q.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
			}
		}
	};
	ad.propHooks.scrollTop = ad.propHooks.scrollLeft = {
		set : function(a) {
			a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
		}
	};
	q.each(["toggle", "show", "hide"], function(a, b) {
		var c = q.fn[b];
		q
		.fn[b] = function(d, e, f) {
			return d == null || typeof d == "boolean" || !a && q.isFunction(d) && q.isFunction(e) ? c.apply(this, arguments) : this.animate(bd(b, !0), d, e, f)
		}
	});
	q.fn.extend({
		fadeTo : function(a, b, c, d) {
			return this.filter(ac).css("opacity", 0).show().end().animate({
				opacity : b
			}, a, c, d)
		},
		animate : function(a, b, c, d) {
			var e = q.isEmptyObject(a), f = q.speed(b, c, d), g = function() {
				var b = Zc(this, q.extend({}, a), f);
				e && b.stop(!0)
			};
			return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
		},
		stop : function(a, c, d) {
			var e = function(a) {
				var b = a.stop;
				delete a.stop;
				b(d)
			};
			if ( typeof a != "string") {
				d = c;
				c = a;
				a = b
			}
			c && a !== !1 && this.queue(a || "fx", []);
			return this.each(function() {
				var b = !0, c = a != null && a + "queueHooks", f = q.timers, g = q._data(this);
				if (c)
					g[c] && g[c].stop && e(g[c]);
				else
					for (c in g)g[c] && g[c].stop && Uc.test(c) && e(g[c]);
				for ( c = f.length; c--; )
					if (f[c].elem === this && (a == null || f[c].queue === a)) {
						f[c].anim.stop(d);
						b = !1;
						f.splice(c, 1)
					}
				(b || !d) && q.dequeue(this, a)
			})
		}
	});
	q.each({
		slideDown : bd("show"),
		slideUp : bd("hide"),
		slideToggle : bd("toggle"),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function(a, b) {
		q.fn[a] = function(a, c, d) {
			return this.animate(b, a, c, d)
		}
	});
	q.speed = function(a, b, c) {
		var d = a && typeof a == "object" ? q.extend({}, a) : {
			complete : c || !c && b || q.isFunction(a) && a,
			duration : a,
			easing : c && b || b && !q.isFunction(b) && b
		};
		d.duration = q.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in q.fx.speeds ? q.fx.speeds[d.duration] : q.fx.speeds._default;
		if (d.queue == null || d.queue === !0)
			d.queue = "fx";
		d.old = d.complete;
		d.complete = function() {
			q.isFunction(d.old) && d.old.call(this);
			d.queue && q.dequeue(this, d.queue)
		};
		return d
	};
	q.easing = {
		linear : function(a) {
			return a
		},
		swing : function(a) {
			return .5 - Math.cos(a * Math.PI) / 2
		}
	};
	q.timers = [];
	q.fx = ad.prototype.init;
	q.fx.tick = function() {
		var a, c = q.timers, d = 0;
		Qc = q.now();
		for (; d < c.length; d++) {
			a = c[d];
			!a() && c[d] === a && c.splice(d--, 1)
		}
		c.length || q.fx.stop();
		Qc = b
	};
	q.fx.timer = function(a) {
		a() && q.timers.push(a) && !Rc && ( Rc = setInterval(q.fx.tick, q.fx.interval))
	};
	q.fx.interval = 13;
	q.fx.stop = function() {
		clearInterval(Rc);
		Rc = null
	};
	q.fx.speeds = {
		slow : 600,
		fast : 200,
		_default : 400
	};
	q.fx.step = {};
	q.expr && q.expr.filters && (q.expr.filters.animated = function(a) {
		return q.grep(q.timers, function(b) {
			return a === b.elem
		}).length
	});
	var cd = /^(?:body|html)$/i;
	q.fn.offset = function(a) {
		if (arguments.length)
			return a === b ? this : this.each(function(b) {
				q.offset.setOffset(this, a, b)
			});
		var c, d, e, f, g, i, j, k = {
			top : 0,
			left : 0
		}, l = this[0], m = l && l.ownerDocument;
		if (!m)
			return;
		if (( d = m.body) === l)
			return q.offset.bodyOffset(l);
		c = m.documentElement;
		if (!q.contains(c, l))
			return k;
		typeof l.getBoundingClientRect != "undefined" && ( k = l.getBoundingClientRect());
		e = dd(m);
		f = c.clientTop || d.clientTop || 0;
		g = c.clientLeft || d.clientLeft || 0;
		i = e.pageYOffset || c.scrollTop;
		j = e.pageXOffset || c.scrollLeft;
		return {
			top : k.top + i - f,
			left : k.left + j - g
		}
	};
	q.offset = {
		bodyOffset : function(a) {
			var b = a.offsetTop, c = a.offsetLeft;
			if (q.support.doesNotIncludeMarginInBodyOffset) {
				b += parseFloat(q.css(a, "marginTop")) || 0;
				c += parseFloat(q.css(a, "marginLeft")) || 0
			}
			return {
				top : b,
				left : c
			}
		},
		setOffset : function(a, b, c) {
			var d = q.css(a, "position");
			d === "static" && (a.style.position = "relative");
			var e = q(a), f = e.offset(), g = q.css(a, "top"), i = q.css(a, "left"), j = (d === "absolute" || d === "fixed") && q.inArray("auto", [g, i]) > -1, k = {}, l = {}, m, n;
			if (j) {
				l = e.position();
				m = l.top;
				n = l.left
			} else {
				m = parseFloat(g) || 0;
				n = parseFloat(i) || 0
			}
			q.isFunction(b) && ( b = b.call(a, c, f));
			b.top != null && (k.top = b.top - f.top + m);
			b.left != null && (k.left = b.left - f.left + n);
			"using" in b ? b.using.call(a, k) : e.css(k)
		}
	};
	q.fn.extend({
		position : function() {
			if (!this[0])
				return;
			var a = this[0], b = this.offsetParent(), c = this.offset(), d = cd.test(b[0].nodeName) ? {
				top : 0,
				left : 0
			} : b.offset();
			c.top -= parseFloat(q.css(a, "marginTop")) || 0;
			c.left -= parseFloat(q.css(a, "marginLeft")) || 0;
			d.top += parseFloat(q.css(b[0], "borderTopWidth")) || 0;
			d.left += parseFloat(q.css(b[0], "borderLeftWidth")) || 0;
			return {
				top : c.top - d.top,
				left : c.left - d.left
			}
		},
		offsetParent : function() {
			return this.map(function() {
				var a = this.offsetParent || e.body;
				while (a && !cd.test(a.nodeName) && q.css(a, "position") === "static")
				a = a.offsetParent;
				return a || e.body
			})
		}
	});
	q.each({
		scrollLeft : "pageXOffset",
		scrollTop : "pageYOffset"
	}, function(a, c) {
		var d = /Y/.test(c);
		q.fn[a] = function(e) {
			return q.access(this, function(a, e, f) {
				var g = dd(a);
				if (f === b)
					return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
				g ? g.scrollTo( d ? q(g).scrollLeft() : f, d ? f : q(g).scrollTop()) : a[e] = f
			}, a, e, arguments.length, null)
		}
	});
	q.each({
		Height : "height",
		Width : "width"
	}, function(a, c) {
		q.each({
			padding : "inner" + a,
			content : c,
			"" : "outer" + a
		}, function(d, e) {
			q.fn[e] = function(e, f) {
				var g = arguments.length && (d || typeof e != "boolean"), i = d || (e === !0 || f === !0 ? "margin" : "border");
				return q.access(this, function(c, d, e) {
					var f;
					if (q.isWindow(c))
						return c.document.documentElement["client" + a];
					if (c.nodeType === 9) {
						f = c.documentElement;
						return Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])
					}
					return e === b ? q.css(c, d, e, i) : q.style(c, d, e, i)
				}, c, g ? e : b, g, null)
			}
		})
	});
	a.jQuery = a.$ = q;
	typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return q
	})
})(window);
/*!
 Copyright (c) 2009, 280 North Inc. http://280north.com/
 MIT License. http://github.com/280north/narwhal/blob/master/README.md
 */
(function(a) {
	typeof define == "function" ? define(a) : a()
})(function() {
	function n(a) {
		try {
			Object.defineProperty(a, "sentinel", {});
			return "sentinel" in a
		} catch(b) {
		}
	}


	Function.prototype.bind || (Function.prototype.bind = function(b) {
		var c = this;
		if ( typeof c != "function")
			throw new TypeError;
		var e = d.call(arguments, 1), f = function() {
			if (this instanceof f) {
				var a = function() {
				};
				a.prototype = c.prototype;
				var g = new a, i = c.apply(g, e.concat(d.call(arguments)));
				return i !== null && Object(i) === i ? i : g
			}
			return c.apply(b, e.concat(d.call(arguments)))
		};
		return f
	});
	var a = Function.prototype.call, b = Array.prototype, c = Object.prototype, d = b.slice, e = a.bind(c.toString), f = a.bind(c.hasOwnProperty), g, i, j, k, l;
	if ( l = f(c, "__defineGetter__")) {
		g = a.bind(c.__defineGetter__);
		i = a.bind(c.__defineSetter__);
		j = a.bind(c.__lookupGetter__);
		k = a.bind(c.__lookupSetter__)
	}
	Array.isArray || (Array.isArray = function(b) {
		return e(b) == "[object Array]"
	});
	Array.prototype.forEach || (Array.prototype.forEach = function(b) {
		var c = E(this), d = arguments[1], f = 0, g = c.length >>> 0;
		if (e(b) != "[object Function]")
			throw new TypeError;
		while (f < g) {
			f in c && b.call(d, c[f], f, c);
			f++
		}
	});
	Array.prototype.map || (Array.prototype.map = function(b) {
		var c = E(this), d = c.length >>> 0, f = Array(d), g = arguments[1];
		if (e(b) != "[object Function]")
			throw new TypeError;
		for (var i = 0; i < d; i++)
			i in c && (f[i] = b.call(g, c[i], i, c));
		return f
	});
	Array.prototype.filter || (Array.prototype.filter = function(b) {
		var c = E(this), d = c.length >>> 0, f = [], g = arguments[1];
		if (e(b) != "[object Function]")
			throw new TypeError;
		for (var i = 0; i < d; i++)
			i in c && b.call(g, c[i], i, c) && f.push(c[i]);
		return f
	});
	Array.prototype.every || (Array.prototype.every = function(b) {
		var c = E(this), d = c.length >>> 0, f = arguments[1];
		if (e(b) != "[object Function]")
			throw new TypeError;
		for (var g = 0; g < d; g++)
			if ( g in c && !b.call(f, c[g], g, c))
				return !1;
		return !0
	});
	Array.prototype.some || (Array.prototype.some = function(b) {
		var c = E(this), d = c.length >>> 0, f = arguments[1];
		if (e(b) != "[object Function]")
			throw new TypeError;
		for (var g = 0; g < d; g++)
			if ( g in c && b.call(f, c[g], g, c))
				return !0;
		return !1
	});
	Array.prototype.reduce || (Array.prototype.reduce = function(b) {
		var c = E(this), d = c.length >>> 0;
		if (e(b) != "[object Function]")
			throw new TypeError;
		if (!d && arguments.length == 1)
			throw new TypeError;
		var f = 0, g;
		if (arguments.length >= 2)
			g = arguments[1];
		else
			do {
				if ( f in c) {
					g = c[f++];
					break
				}
				if (++f >= d)
					throw new TypeError
			} while(!0);
		for (; f < d; f++)
			f in c && ( g = b.call(
			void 0, g, c[f], f, c));
		return g
	});
	Array.prototype.reduceRight || (Array.prototype.reduceRight = function(b) {
		var c = E(this), d = c.length >>> 0;
		if (e(b) != "[object Function]")
			throw new TypeError;
		if (!d && arguments.length == 1)
			throw new TypeError;
		var f, g = d - 1;
		if (arguments.length >= 2)
			f = arguments[1];
		else
			do {
				if ( g in c) {
					f = c[g--];
					break
				}
				if (--g < 0)
					throw new TypeError
			} while(!0);
		do g in this && ( f = b.call(
			void 0, f, c[g], g, c));
		while(g--);
		return f
	});
	Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
		var c = E(this), d = c.length >>> 0;
		if (!d)
			return -1;
		var e = 0;
		arguments.length > 1 && ( e = C(arguments[1]));
		e = e >= 0 ? e : d - Math.abs(e);
		for (; e < d; e++)
			if ( e in c && c[e] === b)
				return e;
		return -1
	});
	Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(b) {
		var c = E(this), d = c.length >>> 0;
		if (!d)
			return -1;
		var e = d - 1;
		arguments.length > 1 && ( e = C(arguments[1]));
		e = e >= 0 ? e : d - Math.abs(e);
		for (; e >= 0; e--)
			if ( e in c && b === c[e])
				return e;
		return -1
	});
	Object.getPrototypeOf || (Object.getPrototypeOf = function(b) {
		return b.__proto__ || (b.constructor ? b.constructor.prototype : c)
	});
	if (!Object.getOwnPropertyDescriptor) {
		var m = "Object.getOwnPropertyDescriptor called on a non-object: ";
		Object.getOwnPropertyDescriptor = function(b, d) {
			if ( typeof b != "object" && typeof b != "function" || b === null)
				throw new TypeError(m + b);
			if (!f(b, d))
				return;
			var e, g, i;
			e = {
				enumerable : !0,
				configurable : !0
			};
			if (l) {
				var n = b.__proto__;
				b.__proto__ = c;
				var g = j(b, d), i = k(b, d);
				b.__proto__ = n;
				if (g || i) {
					g && (e.get = g);
					i && (e.set = i);
					return e
				}
			}
			e.value = b[d];
			return e
		}
	}
	Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(b) {
		return Object.keys(b)
	});
	Object.create || (Object.create = function(b, c) {
		var d;
		if (b === null)
			d = {
				__proto__ : null
			};
		else {
			if ( typeof b != "object")
				throw new TypeError("typeof prototype[" + typeof b + "] != 'object'");
			var e = function() {
			};
			e.prototype = b;
			d = new e;
			d.__proto__ = b
		}
		c !==
		void 0 && Object.defineProperties(d, c);
		return d
	});
	if (Object.defineProperty) {
		var o = n({}), p = typeof document == "undefined" || n(document.createElement("div"));
		if (!o || !p)
			var q = Object.defineProperty
	}
	if (!Object.defineProperty || q) {
		var r = "Property description must be an object: ", s = "Object.defineProperty called on non-object: ", t = "getters & setters can not be defined on this javascript engine";
		Object.defineProperty = function(b, d, e) {
			if ( typeof b != "object" && typeof b != "function" || b === null)
				throw new TypeError(s + b);
			if ( typeof e != "object" && typeof e != "function" || e === null)
				throw new TypeError(r + e);
			if (q)
				try {
					return q.call(Object, b, d, e)
				} catch(m) {
				}
			if (f(e, "value"))
				if (l && (j(b, d) || k(b, d))) {
					var n = b.__proto__;
					b.__proto__ = c;
					delete b[d];
					b[d] = e.value;
					b.__proto__ = n
				} else
					b[d] = e.value;
			else {
				if (!l)
					throw new TypeError(t);
				f(e, "get") && g(b, d, e.get);
				f(e, "set") && i(b, d, e.set)
			}
			return b
		}
	}
	Object.defineProperties || (Object.defineProperties = function(b, c) {
		for (var d in c)f(c, d) && Object.defineProperty(b, d, c[d]);
		return b
	});
	Object.seal || (Object.seal = function(b) {
		return b
	});
	Object.freeze || (Object.freeze = function(b) {
		return b
	});
	try {
		Object.freeze(function() {
		})
	} catch(u) {
		Object.freeze = function(b) {
			return function(c) {
				return typeof c == "function" ? c : b(c)
			}
		}(Object.freeze)
	}
	Object.preventExtensions || (Object.preventExtensions = function(b) {
		return b
	});
	Object.isSealed || (Object.isSealed = function(b) {
		return !1
	});
	Object.isFrozen || (Object.isFrozen = function(b) {
		return !1
	});
	Object.isExtensible || (Object.isExtensible = function(b) {
		if (Object(b) === b)
			throw new TypeError;
		var c = "";
		while (f(b, c))
		c += "?";
		b[c] = !0;
		var d = f(b, c);
		delete b[c];
		return d
	});
	if (!Object.keys) {
		var v = !0, w = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], x = w.length;
		for (var y in {
			toString : null
		})
		v = !1;
		Object.keys = function F(a) {
			if ( typeof a != "object" && typeof a != "function" || a === null)
				throw new TypeError("Object.keys called on a non-object");
			var F = [];
			for (var b in a)f(a, b) && F.push(b);
			if (v)
				for (var c = 0, d = x; c < d; c++) {
					var e = w[c];
					f(a, e) && F.push(e)
				}
			return F
		}
	}
	Date.prototype.toISOString || (Date.prototype.toISOString = function() {
		var b, c, d;
		if (!isFinite(this))
			throw new RangeError;
		b = [this.getUTCFullYear(), this.getUTCMonth() + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
		c = b.length;
		while (c--) {
			d = b[c];
			d < 10 && (b[c] = "0" + d)
		}
		return b.slice(0, 3).join("-") + "T" + b.slice(3).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
	});
	Date.now || (Date.now = function() {
		return (new Date).getTime()
	});
	Date.prototype.toJSON || (Date.prototype.toJSON = function(b) {
		if ( typeof this.toISOString != "function")
			throw new TypeError;
		return this.toISOString()
	});
	isNaN(Date.parse("2011-06-15T21:40:05+06:00")) && ( Date = function(a) {
		var b = function e(b, c, d, h, f, g, i) {
			var j = arguments.length;
			if (this instanceof a) {
				var k = j == 1 && String(b) === b ? new a(e.parse(b)) : j >= 7 ? new a(b, c, d, h, f, g, i) : j >= 6 ? new a(b, c, d, h, f, g) : j >= 5 ? new a(b, c, d, h, f) : j >= 4 ? new a(b, c, d, h) : j >= 3 ? new a(b, c, d) : j >= 2 ? new a(b, c) : j >= 1 ? new a(b) : new a;
				k.constructor = e;
				return k
			}
			return a.apply(this, arguments)
		}, c = new RegExp("^(\\d{4})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");
		for (var d in a)
		b[d] = a[d];
		b.now = a.now;
		b.UTC = a.UTC;
		b.prototype = a.prototype;
		b.prototype.constructor = b;
		b.parse = function(d) {
			var e = c.exec(d);
			if (e) {
				e.shift();
				for (var f = 1; f < 7; f++) {
					e[f] = +(e[f] || (f < 3 ? 1 : 0));
					f == 1 && e[f]--
				}
				var g = +e.pop(), i = +e.pop(), j = e.pop(), k = 0;
				if (j) {
					if (i > 23 || g > 59)
						return NaN;
					k = (i * 60 + g) * 6e4 * (j == "+" ? -1 : 1)
				}
				return a.UTC.apply(this, e) + k
			}
			return a.parse.apply(this, arguments)
		};
		return b
	}(Date));
	var z = "	\n\f\r   ᠎             　\u2028\u2029﻿";
	if (!String.prototype.trim || z.trim()) {
		z = "[" + z + "]";
		var A = new RegExp("^" + z + z + "*"), B = new RegExp(z + z + "*$");
		String.prototype.trim = function() {
			return String(this).replace(A, "").replace(B, "")
		}
	}
	var C = function(a) {
		a = +a;
		a !== a ? a = -1 : a !== 0 && a !== 1 / 0 && a !== -Infinity && ( a = (a > 0 || -1) * Math.floor(Math.abs(a)));
		return a
	}, D = "a"[0] != "a", E = function(a) {
		if (a == null)
			throw new TypeError;
		return D && typeof a == "string" && a ? a.split("") : Object(a)
	}
});
(function(a, b) {
	function t(a) {
		for (var b = 1, c; c = arguments[b]; b++)
			for (var d in c)
			a[d] = c[d];
		return a
	}

	function u(a) {
		return Array.prototype.slice.call(a)
	}

	function w(a, b) {
		for (var c = 0, d; d = a[c]; c++)
			if (b == d)
				return c;
		return -1
	}

	function x() {
		var a = u(arguments), b = [];
		for (var c = 0, d = a.length; c < d; c++)
			a[c].length > 0 && b.push(a[c].replace(/\/$/, ""));
		return b.join("/")
	}

	function y(a, b, c) {
		var d = b.split("/"), e = a;
		while (d.length > 1) {
			var f = d.shift();
			e = e[f] = e[f] || {}
		}
		e[d[0]] = c
	}

	function z() {
	}

	function A(a, b) {
		a && (this.id = this.path = this.resolvePath(a));
		this.originalPath = a;
		this.force = !!b
	}

	function B(a, b) {
		this.id = a;
		this.path = this.resolvePath(a);
		this.force = b
	}

	function C(a, b) {
		this.id = a;
		this.contents = b;
		this.dep = O(a);
		this.deps = [];
		this.path = this.dep.path
	}

	function D(a, b) {
		var d;
		this.body = b;
		if (!a)
			if (c) {
				d = i || K();
				if (d) {
					this.setId(d.id);
					delete j[d.scriptId];
					this.then(function(a) {
						d.complete.call(d, a)
					})
				}
			} else
				g = this;
		else {
			this.setId(a);
			( d = p["module_" + this.id]) && this.then(function(a) {
				d.complete.call(d, a)
			})
		}
	}

	function E(a) {
		var b = [];
		for (var c = 0, d; d = a[c]; c++)
			d instanceof H ? b = b.concat(E(d.deps)) : d instanceof B && b.push(d);
		return b
	}

	function F() {
		for (var a = 0, b; b = this.deps[a]; a++)
			if (b.forceFetch)
				b.forceFetch();
			else {
				b.force = !0;
				b.start()
			}
		return this
	}

	function G(a) {
		this.deps = a;
		this.deps.length == 0 && this.complete()
	}

	function H(a) {
		this.deps = a
	}

	function J() {
		this.entries = {}
	}

	function K() {
		for (var a in d)
		if (d[a].readyState == "interactive")
			return j[d[a].id]
	}

	function L() {
		var a = u(arguments), b, c;
		typeof a[0] == "string" && ( b = a.shift());
		c = a.shift();
		return new D(b, c)
	}

	function M() {
		var a = u(arguments), b;
		typeof a[a.length - 1] == "function" && ( b = a.pop());
		var c = new G(N(a));
		b && c.then(b);
		return c
	}

	function N(a) {
		var b = [];
		for (var c = 0, d; d = a[c]; c++) {
			typeof d == "string" && ( d = O(d));
			v(d) && ( d = new H(N(d)));
			b.push(d)
		}
		return b
	}

	function O(a) {
		var b, c;
		for (var d = 0, e; e = M.matchers[d]; d++) {
			var f = e[0], g = e[1];
			if ( b = a.match(f))
				return g(a)
		}
		throw new Error(a + " was not recognised by loader")
	}

	function Q() {
		a.using = k;
		a.provide = l;
		a.loadrunner = m;
		return P
	}

	function R(a) {
		function d(b, d) {
			c[d] = c[d] || {};
			c[d][a] = {
				key : a,
				start : b.startTime,
				end : b.endTime,
				duration : b.endTime - (b.startTime || (new Date).getTime()),
				status : d,
				origin : b
			}
		}

		var b, c = {};
		if (a && (( b = o[a]) || ( b = p[a]) || ( b = n[a])))
			return {
				start : b.startTime,
				end : b.endTime,
				duration : b.endTime - (b.startTime || (new Date).getTime()),
				origin : b
			};
		for (var a in o)d(o[a], "met");
		for (var a in p)d(p[a], "inProgress");
		for (var a in n)d(n[a], "paused");
		return c
	}

	function S() {
		n = {};
		o = {};
		p = {};
		M.bundles = new J;
		B.exports = {};
		D.provided = {}
	}

	function T(a) {
		return M.bundles.get(a) || undefined
	}

	var c = a.attachEvent && !a.opera, d = b.getElementsByTagName("script"), e, f = b.createElement("script"), g, i, j = {}, k = a.using, l = a.provide, m = a.loadrunner, n = {}, o = {}, p = {};
	for (var q = 0, r; r = d[q]; q++)
		if (r.src.match(/loadrunner\.js(\?|#|$)/)) {
			e = r;
			break
		}
	var s = function() {
		var a = 0;
		return function() {
			return a++
		}
	}(), v = Array.isArray ||
	function(a) {
		return a.constructor == Array
	};
	z.prototype.then = function(b) {
		this.callbacks = this.callbacks || [];
		this.callbacks.push(b);
		this.completed ? b.apply(a, this.results) : this.callbacks.length == 1 && this.start();
		return this
	};
	z.prototype.key = function() {
		this.id || (this.id = s());
		return "dependency_" + this.id
	};
	z.prototype.start = function() {
		var a = this, b, c;
		this.startTime = (new Date).getTime();
		if ( b = o[this.key()])
			this.complete.apply(this, b.results);
		else if ( c = p[this.key()])
			c.then(function() {
				a.complete.apply(a, arguments)
			});
		else if (this.shouldFetch()) {
			p[this.key()] = this;
			this.fetch()
		} else {
			n[this.key()] = n[this.key()] || [];
			n[this.key()].push(this)
		}
	};
	z.prototype.shouldFetch = function() {
		return !0
	};
	z.prototype.complete = function() {
		var b;
		this.endTime = (new Date).getTime();
		delete p[this.key()];
		o[this.key()] || (o[this.key()] = this);
		if (!this.completed) {
			this.results = u(arguments);
			this.completed = !0;
			if (this.callbacks)
				for (var c = 0, d; d = this.callbacks[c]; c++)
					d.apply(a, this.results);
			if ( b = n[this.key()]) {
				for (var c = 0, e; e = b[c]; c++)
					e.complete.apply(e, arguments);
				delete n[this.key()]
			}
		}
	};
	A.autoFetch = !0;
	A.xhrTransport = function() {
		var a, b = this;
		if (window.XMLHttpRequest)
			a = new window.XMLHttpRequest;
		else
			try {
				a = new window.ActiveXObject("Microsoft.XMLHTTP")
			} catch(c) {
				return new Error("XHR not found.")
			}
		a.onreadystatechange = function() {
			var c;
			a.readyState == 4 && b.loaded(a.responseText)
		};
		a.open("GET", this.path, !0);
		a.send(null)
	};
	A.scriptTagTransport = function() {
		var b = f.cloneNode(!1), c = this;
		this.scriptId = "LR" + s();
		b.id = this.scriptId;
		b.type = "text/javascript";
		b.async = !0;
		b.onerror = function() {
			throw new Error(c.path + " not loaded")
		};
		b.onreadystatechange = b.onload = function(b) {
			b = a.event || b;
			if (b.type == "load" || w(["loaded", "complete"], this.readyState) > -1) {
				this.onreadystatechange = null;
				c.loaded()
			}
		};
		b.src = this.path;
		i = this;
		d[0].parentNode.insertBefore(b, d[0]);
		i = null;
		j[this.scriptId] = this
	};
	A.prototype = new z;
	A.prototype.start = function() {
		var a = this, b;
		( def = D.provided[this.originalPath]) ? def.then(function() {
			a.complete()
		}) : ( b = T(this.originalPath)) ? b.then(function() {
			a.start()
		}) : z.prototype.start.call(this)
	};
	A.prototype.resolvePath = function(a) {
		a = a.replace(/^\$/, M.path.replace(/\/$/, "") + "/");
		return a
	};
	A.prototype.key = function() {
		return "script_" + this.id
	};
	A.prototype.shouldFetch = function() {
		return A.autoFetch || this.force
	};
	A.prototype.fetch = A.scriptTagTransport;
	A.prototype.loaded = function() {
		this.complete()
	};
	B.exports = {};
	B.prototype = new A;
	B.prototype.start = function() {
		var a = this, b, c;
		( b = D.provided[this.id]) ? b.then(function(b) {
			a.complete.call(a, b)
		}) : ( c = T(this.id)) ? c.then(function() {
			a.start()
		}) : A.prototype.start.call(this)
	};
	B.prototype.key = function() {
		return "module_" + this.id
	};
	B.prototype.resolvePath = function(a) {
		return x(M.path, a + ".js")
	};
	B.prototype.loaded = function() {
		var a, b, d = this;
		if (!c) {
			a = g;
			g = null;
			if (a) {
				a.setId(this.id);
				a.then(function(a) {
					d.complete.call(d, a)
				})
			} else if (!D.provided[this.id])
				throw new Error("Tried to load '" + this.id + "' as a module, but it didn't have a 'provide()' in it.")
		}
	};
	C.prototype = new A;
	C.prototype.start = function() {
		var a = this, b, c, d;
		for (var e = 0, f = this.contents.length; e < f; e++) {
			c = O(this.contents[e]);
			this.deps.push(c);
			d = c.key();
			!o[d] && !p[d] && !n[d] && (n[d] = this)
		}
		A.prototype.start.call(this)
	};
	C.prototype.loaded = function() {
		var a, b, c = this, d, e;
		for (var f = 0, g = this.deps.length; f < g; f++) {
			d = this.deps[f];
			e = d.key();
			delete n[e];
			o[e] = this
		}
		A.prototype.loaded.call(this)
	};
	D.provided = {};
	D.prototype = new z;
	D.prototype.key = function() {
		this.id || (this.id = "anon_" + s());
		return "definition_" + this.id
	};
	D.prototype.setId = function(a) {
		this.id = a;
		D.provided[a] = this
	};
	D.prototype.fetch = function() {
		var a = this;
		typeof this.body == "object" ? this.complete(this.body) : typeof this.body == "function" && this.body(function(b) {
			a.complete(b)
		})
	};
	D.prototype.complete = function(a) {
		a = a || {};
		this.id && (this.exports = B.exports[this.id] = a);
		z.prototype.complete.call(this, a)
	};
	G.prototype = new z;
	G.prototype.fetch = function() {
		function b() {
			var b = [];
			for (var c = 0, d; d = a.deps[c]; c++) {
				if (!d.completed)
					return;
				d.results.length > 0 && ( b = b.concat(d.results))
			}
			a.complete.apply(a, b)
		}

		var a = this;
		for (var c = 0, d; d = this.deps[c]; c++)
			d.then(b);
		return this
	};
	G.prototype.forceFetch = F;
	G.prototype.as = function(a) {
		var b = this;
		return this.then(function() {
			var c = E(b.deps), d = {};
			for (var e = 0, f; f = c[e]; e++)
				y(d, f.id, arguments[e]);
			a.apply(this, [d].concat(u(arguments)))
		})
	};
	H.prototype = new z;
	H.prototype.fetch = function() {
		var a = this, b = 0, c = [];
		(function d() {
			var e = a.deps[b++];
			e ? e.then(function(a) {
				e.results.length > 0 && ( c = c.concat(e.results));
				d()
			}) : a.complete.apply(a, c)
		})();
		return this
	};
	H.prototype.forceFetch = F;
	var I = [];
	J.prototype.push = function(a) {
		for (var b in a) {
			I[b] = new C(b, a[b]);
			for (var c = 0, d; d = a[b][c]; c++)
				this.entries[d] = I[b]
		}
	};
	J.prototype.get = function(a) {
		return this.entries[a]
	};
	var P = function(a) {
		return a(M, L, P)
	};
	P.Script = A;
	P.Module = B;
	P.Collection = G;
	P.Sequence = H;
	P.Definition = D;
	P.Dependency = z;
	P.noConflict = Q;
	P.debug = R;
	P.reset = S;
	a.loadrunner = P;
	a.using = M;
	a.provide = L;
	M.path = "";
	M.bundles = new J;
	M.matchers = [];
	M.matchers.add = function(a, b) {
		this.unshift([a, b])
	};
	M.matchers.add(/^(lr!)?[a-zA-Z0-9_\/.-]+$/, function(a) {
		var b = new B(a.replace(/^lr!/, ""));
		return b
	});
	M.matchers.add(/(^script!|\.js$)/, function(a) {
		var b = new A(a.replace(/^script!/, ""));
		return b
	});
	if (e) {
		M.path = e.getAttribute("data-path") || e.src.split(/loadrunner\.js/
		)[0] || "";
		( main = e.getAttribute("data-main")) && M.apply(a, main.split(/\s*,\s*/)).then(function() {
		})
	}
})(this, document);
(function(a) {
	loadrunner(function(b, c) {
		function e(a, b) {
			return new loadrunner.Definition(a, function(a) {
				a(b())
			})
		}

		var d;
		a.deferred = e;
		b.matchers.add(/(^script!|\.js(!?)$)/, function(a) {
			var b = !!a.match(/!$/);
			a = a.replace(/!$/, "");
			if ( d = loadrunner.Definition.provided[a])
				return d;
			var c = new loadrunner.Script(a, b);
			b && c.start();
			return c
		})
	})
})(this);
(function(a) {
	loadrunner(function(b, c) {
		function d(a) {
			return Array.prototype.slice.call(a)
		}

		function f(a, b) {
			for (var c = 0, d; d = a[c]; c++)
				if (b == d)
					return c;
			return -1
		}

		function g(a, b) {
			var c = b.id || "", d = c.split("/");
			d.pop();
			var e = a.split("/"), f = !1;
			while (e[0] == ".." && d.length) {
				d.pop();
				e.shift();
				f = !0
			}
			if (e[0] == ".") {
				e.shift();
				f = !0
			}
			f && ( e = d.concat(e));
			return e.join("/")
		}

		function i(a, b) {
			function d(a) {
				return loadrunner.Module.exports[g(a.replace(/^.+!/, ""), b)]
			}

			var c = [];
			for (var e = 0, f = a.length; e < f; e++) {
				if (a[e] == "require") {
					c.push(d);
					continue
				}
				if (a[e] == "exports") {
					b.exports = b.exports || {};
					c.push(b.exports);
					continue
				}
				if (a[e] == "module") {
					c.push(b);
					continue
				}
				c.push(d(a[e]))
			}
			return c
		}

		function j() {
			var a = d(arguments), c = [], j, k;
			typeof a[0] == "string" && ( j = a.shift());
			e(a[0]) && ( c = a.shift());
			k = a.shift();
			var l = new loadrunner.Definition(j, function(a) {
				function l() {
					var b = i(d(c), j), e;
					typeof k == "function" ? e = k.apply(j, b) : e = k;
					typeof e == "undefined" && ( e = j.exports);
					a(e)
				}

				var e = [], j = this;
				for (var m = 0, n = c.length; m < n; m++) {
					var o = c[m];
					f(["require", "exports", "module"], o) == -1 && e.push(g(o, j))
				}
				e.length > 0 ? b.apply(this, e.concat(l)) : l()
			});
			return l
		}

		var e = Array.isArray ||
		function(a) {
			return a.constructor == Array
		};
		a.define = j
	})
})(this);
loadrunner(function(a, b, c, d) {
	function e(a) {
		this.id = this.path = a
	}


	e.loaded = {};
	e.prototype = new c.Dependency;
	e.prototype.start = function() {
		if (e.loaded[this.path])
			this.complete();
		else {
			e.loaded[this.path] = !0;
			this.load()
		}
	};
	e.prototype.load = function() {
		function j() {
			if ($(f).length > 0)
				return i();
			c += 1;
			c < 200 ? b = setTimeout(j, 50) : i()
		}

		function k() {
			var d;
			try {
				d = !!a.sheet.cssRules
			} catch(e) {
				c += 1;
				c < 200 ? b = setTimeout(k, 50) : i();
				return
			}
			i()
		}

		var a, b, c, d = document, e = this.path, f = 'link[href="' + e + '"]', g = $.browser;
		if ($(f).length > 0)
			return this.complete();
		var i = function() {
			clearTimeout(b);
			a.onload = a.onerror = null;
			this.complete()
		}.bind(this);
		if (g.webkit || g.mozilla) {
			c = 0;
			if (g.webkit)
				j();
			else {
				a = d.createElement("style");
				a.innerHTML = '@import "' + e + '";';
				k(a)
			}
		}
		if (!a) {
			a = d.createElement("link");
			a.setAttribute("rel", "stylesheet");
			a.setAttribute("href", e);
			a.setAttribute("charset", "utf-8")
		}
		a.onload = a.onerror = i;
		(d.head || d.getElementsByTagName("head")[0]).appendChild(a)
	};
	a.matchers.add(/^css!/, function(a) {
		a = a.replace(/^css!/, "");
		return new e(a)
	})
});
using.path = $("#swift-module-path").val();
$(".loadrunner-alias").each(function(a, b) {
	using.bundles.push(JSON.parse($(b).val()))
});
using("debug/debug", function(a) {
	function b() {
		function d() {
			c.forEach(function(a) {
				a(b)
			});
			var a = $(document);
			a.on("uiSwiftLoaded uiPageChanged", function() {
				window.__swift_loaded = !0
			});
			a.on("uiBeforeNewPageLoad", function() {
				window.__swift_loaded = !1
			});
			a.trigger("uiSwiftLoaded");
			window.swiftActionQueue && window.swiftActionQueue.flush($);
			if (window.ttftData) {
				window.ttft && window.ttft.recordMilestone("aq_empty_time", (new Date).getTime());
				using("app/utils/ttft", function(a) {
					a.startAjaxTracking()
				})
			}
		}

		var a = $("#init-data").val(), b = JSON.parse(a), c = $.makeArray(arguments);
		b.moreCSSBundle ? using("css!" + b.moreCSSBundle, d) : d()
	}

	if ($("html").hasClass("debug")) {
		window.DEBUG = a;
		a.enable(!0);
		using("core/compose", "core/registry", "core/advice", "core/logger", function(a, b, c, d) {
			a.mixin(b, [c.withAdvice, d])
		})
	} else
		a.enable(!1);
	var c = $("input.swift-boot-module").map(function(a, b) {
		return $(b).val()
	}).toArray();
	using.apply(this, c.concat(b))
});
