/*! ds-bootstrap - v1.0.0.32618 - 2024-06-13 4:56pm UTC
 * Copyright (c) 2024 ; Not Licensed */ !(function () {
	'use strict';
	function e(t) {
		return (
			(e =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			e(t)
		);
	}
	function t(t, n) {
		for (var r = 0; r < n.length; r++) {
			var i = n[r];
			(i.enumerable = i.enumerable || !1),
				(i.configurable = !0),
				'value' in i && (i.writable = !0),
				Object.defineProperty(
					t,
					((o = i.key),
					(a = void 0),
					(a = (function (t, n) {
						if ('object' !== e(t) || null === t) return t;
						var r = t[Symbol.toPrimitive];
						if (void 0 !== r) {
							var i = r.call(t, n || 'default');
							if ('object' !== e(i)) return i;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === n ? String : Number)(t);
					})(o, 'string')),
					'symbol' === e(a) ? a : String(a)),
					i,
				);
		}
		var o, a;
	}
	var n = DS,
		r = n._,
		i = n.pubSub,
		o = n.events,
		a = n.constants,
		l = n.utils,
		s = n.translationStore,
		c = [],
		u = (function () {
			function e(t, n, l) {
				var s = this;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
					(this.frame = t),
					(this.frame.blocked = !1),
					(this.preso = l),
					this.setupControlOptions(),
					(this.layouts = {}),
					(this.dockedStates = {}),
					(this.dockSettings = { dockedState: a.docked.NONE, width: 0 }),
					this.setLayout(this.frame.default_layout, a.refs.FRAME),
					DS.flagManager.multiLangSupport && !r.isEmpty(n) && this.setLocalizationData(n, !0),
					(this.resourceDescription = this.frame.resourceData.description);
				var c = l.getFirstSlide();
				for (var u in ((this.slideWidth = c.get('width')), (this.slideHeight = c.get('height')), (this.temp = []), this.frame.layouts)) this.temp.push(u);
				(this.rtl = 'rtl' === this.frame.textdirection),
					(this.hasModernText = 0 !== this.frame.renderingEngineType),
					(this.dir = this.dir.bind(this)),
					r.bindAll(this, 'onLayoutChanged'),
					i.on(o.controlLayout.CHANGED, this.onLayoutChanged),
					i.on(o.controlLayout.UPDATE, function (e, t, n) {
						(s.frame.controlLayouts[e] = n), s.setLayout(e, t);
					}),
					i.on(o.controlOptions.CHANGED, function (e) {
						var t = s.optionChangesRequireMenuRefresh(s.frame.controlOptions.menuOptions, e.menuOptions);
						(s.frame.controlOptions = e), s.setupControlOptions(), i.trigger(o.controlOptions.RESET), t && i.trigger(o.navData.REFRESH_VIEW);
					}),
					i.on(o.frame.FONT_SCALE, function (e) {
						(s.frame.fontscale = e), i.trigger(o.controlOptions.RESET);
					}),
					i.on(o.glossary.UPDATE, function (e) {
						(s.frame.glossaryData = e), i.trigger(o.glossary.REFRESH_VIEW);
					}),
					i.on(o.navData.UPDATE, function (e) {
						(s.frame.navData = e), i.trigger(o.navData.REFRESH_VIEW);
					}),
					i.on(o.resources.UPDATE, function (e) {
						(s.frame.resourceData.resources = e), i.trigger(o.resources.REFRESH_VIEW);
					}),
					i.on(o.resources.UPDATE_DESCRIPTION, function (e) {
						(s.frame.resourceData.description = e), i.trigger(o.resources.REFRESH_VIEW);
					}),
					i.on(o.layer.DIALOG_SHOWN, function (e) {
						var t = DS.windowManager.getCurrentWindow();
						i.trigger(o.frameModel.BLOCKED_CHANGED, t.frame.id, !0, e);
					}),
					i.on(o.layer.DIALOG_HIDDEN, function () {
						var e = DS.windowManager.getCurrentWindow();
						i.trigger(o.frameModel.BLOCKED_CHANGED, e.frame.id, !1);
					}),
					i.on(o.localization.LANGUAGE_UPDATED, function () {
						s.setLocalizationData(DS.localizationManager.getCurrentFrameData());
					}),
					i.on(o.localization.REVIEW_FRAME_UPDATED, function () {
						s.updateReviewStrings();
					});
			}
			var n, u, f;
			return (
				(n = e),
				(u = [
					{
						key: 'traverseMenu',
						value: function (e, t) {
							var n = this;
							t.forEach(function (r) {
								e(r), null != r.links && t.length > 0 && n.traverseMenu(e, r.links);
							});
						},
					},
					{
						key: 'updateMenuStrings',
						value: function () {
							var e = l.getPath(this.frame, 'navData.outline.links', []);
							this.traverseMenu(function (e) {
								e.displaytext = s.getUpdatedTextData('menuItem', ''.concat(e.translationId, '-Name'), e.displaytext);
							}, e);
						},
					},
					{
						key: 'updateGlossaryStrings',
						value: function () {
							(this.frame.glossaryData || []).forEach(function (e) {
								var t = e.translationId;
								(e.title = s.getUpdatedTextData('glossaryItem', ''.concat(t, '-Term'), e.title)),
									(e.content = s.getUpdatedTextData('glossaryItem', ''.concat(t, '-Definition'), e.content));
							});
						},
					},
					{
						key: 'updateResourcesStrings',
						value: function () {
							l.getPath(this.frame, 'resourceData.resources', []).forEach(function (e) {
								var t = e.translationId;
								e.title = s.getUpdatedTextData('resourceItem', ''.concat(t, '-Title'), e.title);
							});
						},
					},
					{
						key: 'updateNoteStrings',
						value: function () {
							(this.frame.notesData || []).forEach(function (e) {
								var t = e.slideId,
									n = r.last(t.split('.')),
									i = s.getUpdatedTextData('slideNote', ''.concat(n, '-Note'));
								null != i && null != DS.renderHtmlString && (e.content = DS.renderHtmlString(i));
							});
						},
					},
					{
						key: 'updateReviewStrings',
						value: function () {
							this.updateMenuStrings(),
								this.updateGlossaryStrings(),
								this.updateResourcesStrings(),
								this.updateNoteStrings(),
								(this.title.text = s.getUpdatedTextData('projectTitle', 'project-Title', this.title.text)),
								this.notifyStringsUpdated();
						},
					},
					{
						key: 'setLocalizationData',
						value: function (e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
							(this.frame.stringTables = e.stringTables),
								(this.frame.navData = e.navData),
								(this.frame.resourceData = e.resourceData),
								(this.frame.glossaryData = e.glossaryData),
								(this.frame.notesData = e.notesData),
								(this.frame.controlStrings = e.controlStrings.reduce(function (e, t) {
									var n = t.id,
										r = t.value;
									return (e[n] = r), e;
								}, {})),
								(this.title.text = this.frame.controlStrings.title),
								t || this.notifyStringsUpdated();
						},
					},
					{
						key: 'notifyStringsUpdated',
						value: function () {
							i.trigger(o.strings.UPDATE_STRINGS),
								i.trigger(o.navData.REFRESH_VIEW),
								i.trigger(o.glossary.REFRESH_VIEW),
								i.trigger(o.resources.REFRESH_VIEW),
								i.trigger(o.transcript.REFRESH_VIEW),
								i.trigger(o.frame.REFLOW);
						},
					},
					{
						key: 'setupControlOptions',
						value: function () {
							var e = this.frame.controlOptions.sidebarOptions;
							(this.sidebarOpts = e),
								(this.bottomBarOpts = this.frame.controlOptions.bottomBarOptions),
								(this.topTabs = e.tabs.linkRight || []),
								(this.topTabsLeft = e.tabs.linkLeft || []),
								(this.topTabsRight = e.tabs.linkRight || []),
								(this.sidebarTabs = e.tabs.sidebar || []),
								(this.outlineInSidebar = this.sidebarTabs.some(function (e) {
									return 'outline' === e.name;
								})),
								(this.buttonOptions = this.frame.controlOptions.buttonoptions),
								(this.title = { enabled: e.titleEnabled, text: e.titleText });
						},
					},
					{
						key: 'optionChangesRequireMenuRefresh',
						value: function (e, t) {
							return e.wrapListItems !== t.wrapListItems || e.autonumber !== t.autonumber;
						},
					},
					{
						key: 'onLayoutChanged',
						value: function (e, t) {
							this.setLayout(e, t);
						},
					},
					{
						key: 'hasTopLinks',
						value: function () {
							return 0 !== this.topTabsLeft.length || 0 !== this.topTabsRight.length;
						},
					},
					{
						key: 'getControlString',
						value: function (e) {
							return s.getUpdatedTextData('frameLink', ''.concat(e, '-Link'), l.getPath(this.frame, 'controlStrings.'.concat(e), null));
						},
					},
					{
						key: 'getString',
						value: function (e) {
							var t = this.currLayout.string_table,
								n = this.frame.stringTables[t].string[e];
							return null == n
								? (c.includes(e) || (c.push(e), console.warn('could not find '.concat(e, ' in string table ').concat(t))),
								  e.replace('acc_', '').replace(/_/g, ' '))
								: n;
						},
					},
					{
						key: 'setDocked',
						value: function (e, t, n) {
							t === a.docked.NONE ? ((this.dockedStates[e] = null), delete this.dockedStates[e]) : (this.dockedStates[e] = { dockedState: t, width: n });
							var r = Object.keys(this.dockedStates);
							0 === r.length
								? (this.dockSettings = { dockedState: a.docked.NONE, width: 0 })
								: t !== a.docked.NONE
								? (this.dockSettings = { dockedState: t, width: n })
								: (this.dockSettings = this.dockedStates[r[0]]);
						},
					},
					{
						key: 'getDockedWidth',
						value: function () {
							var e = this.dockSettings,
								t = e.dockedState,
								n = e.width;
							return t !== DS.constants.docked.NONE ? n : 0;
						},
					},
					{
						key: 'setLayout',
						value: function (e, t) {
							(this.currLayout = this.frame.layouts[e]),
								(this.currControlLayout = this.frame.controlLayouts[e]),
								(this.layouts[t] = this.currControlLayout),
								i.trigger(o.frameModel.LAYOUT_CHANGED, this.currControlLayout, t);
						},
					},
					{
						key: 'getWndControlLayout',
						value: function (e) {
							return this.layouts[e] || this.currControlLayout;
						},
					},
					{
						key: 'dir',
						value: function (e) {
							if (null != e) return this.rtl ? e.reverse() : e;
						},
					},
				]),
				u && t(n.prototype, u),
				f && t(n, f),
				Object.defineProperty(n, 'prototype', { writable: !1 }),
				e
			);
		})(),
		f = u;
	function d(e) {
		return (
			(d =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			d(e)
		);
	}
	function h(e, t, n) {
		return (t = v(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function p(e, t) {
		return (
			(function (e) {
				if (Array.isArray(e)) return e;
			})(e) ||
			(function (e, t) {
				var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
				if (null != n) {
					var r,
						i,
						o,
						a,
						l = [],
						s = !0,
						c = !1;
					try {
						if (((o = (n = n.call(e)).next), 0 === t)) {
							if (Object(n) !== n) return;
							s = !1;
						} else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
					} catch (e) {
						(c = !0), (i = e);
					} finally {
						try {
							if (!s && null != n.return && ((a = n.return()), Object(a) !== a)) return;
						} finally {
							if (c) throw i;
						}
					}
					return l;
				}
			})(e, t) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return y(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y(e, t);
			})(e, t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function y(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function b(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, v(r.key), r);
		}
	}
	function v(e) {
		var t = (function (e, t) {
			if ('object' !== d(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== d(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === d(t) ? t : String(t);
	}
	var g,
		m = DS,
		w = m._,
		S = m.scaler,
		k = m.detection,
		O = m.detection.orientation,
		E = m.utils,
		C = E.getPath,
		x = E.scaleVal,
		L = E.pxify,
		P = m.dom,
		T = P.addClass,
		j = P.removeClass,
		D = m.constants.refs.FRAME,
		A = document.getElementById(DS.constants.els.PRESO),
		I = { x: 'w', xl: 'w', xp: 'w', y: 'h', yl: 'h', yp: 'h', wl: 'w', wp: 'w', hl: 'h', hp: 'h' },
		R = ['wrapper', 'lightBoxWrapper'],
		B = function (e) {
			null != e.beforeUpdateHook && e.beforeUpdateHook();
		},
		M = function (e, t, n) {
			B(e), (n = e.w > 0 ? n : 0), (e.y = e.top = 0), (e.x = e.left = t.l + n), e.update(!0), (t.l = e.x + e.w);
		},
		H = function (e, t, n) {
			B(e), (n = e.w > 0 ? n : 0), (e.y = e.top = 0), (e.x = e.left = t.r - e.w - n), e.update(!0), (t.r = e.x);
		},
		N = function (e, t, n) {
			B(e), (n = e.h > 0 ? n : 0), (e.x = e.left = 0), (e.y = e.top = t.t + n), e.update(!0), (t.t = e.y + e.h);
		},
		F = function (e, t, n) {
			B(e), (n = e.h > 0 ? n : 0), (e.x = e.left = 0), (e.y = e.top = t.b - e.h - n), e.update(!0), (t.b = e.y);
		},
		W = { l: M, r: H, t: N, b: F },
		V = (function () {
			function e(t, n) {
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
					(this.ViewLogic = t),
					(this.params = n),
					(this.nameKey = (null != n && n.nameKey) || t.nameKey),
					(this.enabled = !0);
			}
			var t, n, r;
			return (
				(t = e),
				(n = [
					{
						key: 'init',
						value: function (e) {
							if (this.hasInited) console.warn('has already initialized', this);
							else {
								var t;
								this.hasInited = !0;
								var n = this.ViewLogic,
									r = this.params;
								null == r && null != n ? (r = n) : null != n && (t = !0),
									w.isFunction(r) && (r = r(this.nameSpace || e)),
									(r.w = r.w || r.minW || 100),
									(r.h = r.h || r.minH || 100),
									this.orientationProps(r, 'x', 'y', 'w', 'h', 'scale'),
									(r = Object.assign(
										{
											position: 'absolute',
											x: 0,
											y: 0,
											minW: 0,
											maxW: Number.MAX_SAFE_INTEGER,
											minH: 0,
											maxH: Number.MAX_SAFE_INTEGER,
											wPad: 0,
											scale: 1,
											visibility: 'reflow',
											visual: !0,
											bgColor: null,
											overflow: 'hidden',
											origin: 'center center',
											z: null,
											opacity: null,
											visible: !0,
											attrs: {},
											noContent: !0,
											calcTextSize: !1,
										},
										r,
									)).calcTextSize && (r.noContent = !1),
									(this.noContent = r.noContent),
									(this.lastWidthByText = 0),
									(this.lastHeightByText = 0),
									(this.padLeft = r.padLeft || 0),
									(this.padRight = r.padRight || 0),
									(this.childDef = r.childDef),
									(this.childViews = r.childViews),
									(this.updateHook = r.updateHook),
									(this.onCaptionChanged = r.onCaptionChanged),
									(r.childViews = null),
									(r.updateHook = null),
									(r.childDef = null),
									(r.nameKey = null),
									(r.onCaptionChanged = null),
									Object.assign(this, r.methods),
									(r.methods = null),
									this.createDynamicGetters(r),
									r.visual &&
										((this.el = document.createElement(r.tag || 'div')),
										this.initAttributes(r.attrs),
										this.initStyles(r),
										'button' === r.tag && (this.el.style.cursor = 'pointer'),
										this.initContent(r),
										r.add && A.appendChild(this.el),
										(this.hasInitialized = !0)),
									this.initVisibility(r),
									this.initChildRefs(),
									t && (this.viewLogic = new n(this));
							}
						},
					},
					{
						key: 'orientationProp',
						value: function (e, t) {
							var n = ''.concat(t, 'l'),
								r = ''.concat(t, 'p');
							null != e[n] &&
								null != e[r] &&
								(e[t] = function () {
									return O.isLandscape ? this[n] : this[r];
								});
						},
					},
					{
						key: 'orientationProps',
						value: function (e) {
							for (var t = this, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
							r.forEach(function (n) {
								return t.orientationProp(e, n);
							});
						},
					},
					{
						key: 'initContent',
						value: function (e) {
							if (this.noContent) {
								var t = this.html;
								null != t && (this.el.innerHTML = t);
							} else
								(this.content = document.createElement('div')),
									this.content.setAttribute('class', 'view-content'),
									this.content.setAttribute('tabindex', -1),
									Object.assign(this.content.style, { position: 'relative', 'text-align': 'center', top: 0 }),
									Object.assign(this.content.style, e.contentStyle || {}),
									this.initAttributes(e.contentAttrs, this.content),
									null != e.html && (this.content.innerHTML = this.html),
									this.el.appendChild(this.content);
						},
					},
					{
						key: 'initAttributes',
						value: function (e, t) {
							for (var n in e)
								if (null != e[n]) {
									var r = e[n];
									'id' === n ? (r = w.kebabCase(r)) : 'tabindex' === n && -1 !== r && this.el.setAttribute('data-'.concat(n), r),
										(t || this.el).setAttribute(n, r);
								}
						},
					},
					{
						key: 'initStyles',
						value: function (e) {
							if (
								(Object.assign(this.el.style, {
									position: e.position,
									left: 0,
									top: 0,
									backgroundColor: e.bgColor,
									border: e.border,
									overflow: e.overflow,
									transformOrigin: e.origin,
									opacity: e.opacity,
									zIndex: e.z,
								}),
								null != C(e, 'style.display'))
							) {
								var t = e.style.display;
								'boolean' == typeof t && (e.style.display = t ? 'block' : 'none');
							}
							Object.assign(this.el.style, e.style);
						},
					},
					{
						key: 'initVisibility',
						value: function (e) {
							!1 === e.visible && this.setVisibility(!1);
						},
					},
					{
						key: 'initChildRefs',
						value: function () {
							(this.children = []), (this.childList = []);
							for (var e = this.el.querySelectorAll('[data-ref]'), t = 0; t < e.length; t++) this.children[e[t].dataset.ref] = { el: e[t] };
						},
					},
					{
						key: 'updateStrings',
						value: function () {
							null != this.ariaStringId && this.el.setAttribute('aria-label', G.model.getString(this.ariaStringId)),
								null != this.updateDomStrings && (this.updateDomStrings(), this.calcTextSize && (this.doTextCalcs(), this.update()));
						},
					},
					{
						key: 'updateHtml',
						value: function () {
							var e = this.html;
							null != e && (this.noContent ? (this.el.innerHTML = e) : (this.content.innerHTML = e));
						},
					},
					{
						key: 'createDynamicGetters',
						value: function (t) {
							for (var n in t) 'id' !== n && null != t[n] && e.prop(this, n, t[n]);
						},
					},
					{
						key: 'updateSize',
						value: function () {
							'button' === this.tag
								? ((this.el.style.width = L(x(Math.max(this.w, 24)))), (this.el.style.height = L(x(Math.max(this.h, 24)))))
								: ((this.el.style.width = L(x(this.w))), (this.el.style.height = L(x(this.h))));
						},
					},
					{
						key: 'updateTrans',
						value: function () {
							var e = R.includes(this.nameKey) ? w.identity : x,
								t = ['translate('.concat(L(e(this.x)), ', ').concat(L(e(this.y)), ')')];
							if (this.xs) for (var n = 0; n < this.xs.length; n++) t.push('translateX('.concat(L(e(this.xs[n])), ')'));
							if (this.ys) for (var r = 0; r < this.ys.length; r++) t.push('translateY('.concat(L(e(this.ys[r])), ')'));
							k.deviceView.isMobile && null != this.scale && t.push('scale('.concat(this.scale, ')')), (this.el.style.transform = t.join(' '));
						},
					},
					{
						key: 'calcChildrensWidth',
						value: function () {
							var e =
									arguments.length > 0 && void 0 !== arguments[0]
										? arguments[0]
										: function () {
												return !0;
										  },
								t = 0;
							return (
								null != this.children &&
									this.children.forEach(function (n) {
										e(n) && (n.update(), (t += n.w));
									}),
								t
							);
						},
					},
					{
						key: 'calcChildrensHeight',
						value: function () {
							var e = 0;
							return (
								null != this.children &&
									this.children.forEach(function (t) {
										t.update(), (e += t.h);
									}),
								e
							);
						},
					},
					{
						key: 'positionChildren',
						value: function (e) {
							var t = e.vertical,
								n = e.toTop,
								r = e.toLeft,
								i = e.pad,
								o = e.startPos,
								a = e.reverse,
								l = void 0 !== a && a,
								s = e.hook,
								c = void 0 === s ? w.noop : s,
								u = e.rtl,
								f = void 0 !== u && u,
								d = e.sizeToChildren,
								h = e.alignChild,
								y = t ? (n ? F : N) : r ? H : M,
								b = Object.assign({ l: o, r: o, t: o, b: o }, e.bounds),
								v = l !== f ? this.children.slice().reverse() : this.children,
								g = p(t ? ['height', 't'] : ['width', 'l'], 2),
								m = g[0],
								S = g[1],
								k = O.isLandscape ? w.first : w.last;
							v.forEach(function (e) {
								(e.beforeReflowHook || w.noop)();
								var t = h && k(e.parentAlign);
								(!e.visible && 'reflow' === e.visibility) || '-' === t || (t ? W[t](e, b, i) : y(e, b, i), c(e));
							}),
								d && (this[m] = b[S]);
						},
					},
					{
						key: 'flowChildren',
						value: function (e) {
							(e = Object.assign({ pad: 0, sizeToChildren: !1, startPos: 0, toLeft: !1, reverse: !1, fullUpdate: !1, rtl: !1, hook: function () {} }, e))
								.fullUpdate
								? this.hasAllChildren() && (this.positionChildren(e), this.updateSize())
								: this.positionChildren(e);
						},
					},
					{
						key: 'isBlocked',
						value: function () {
							if (k.theme.isClassic) return !1;
							var e = G.getTopNameSpace(),
								t = G.getCurrentNameSpace(),
								n = G.getBlocker(t.name);
							return null != e && null != n && n.visible;
						},
					},
					{
						key: 'setEnabled',
						value: function (e, t) {
							this.enabled != e && ((this.enabled = e), e ? j(this.el, 'cs-disabled') : T(this.el, 'cs-disabled'), this.el.setAttribute('aria-disabled', !e));
							var n = this.el.getAttribute('data-tabindex');
							null != n && this.el.setAttribute('tabindex', (t && !e) || this.isBlocked() ? -1 : n);
						},
					},
					{
						key: 'setVisibility',
						value: function (e, t) {
							var n = this.visible !== e,
								r = !1;
							return (
								'no-reflow' === this.visibility
									? ((this.el.style.visibility = e ? 'visible' : 'hidden'), (this.el.style.pointerEvents = e ? '' : 'none'))
									: 'reflow' === this.visibility && ((this.el.style.display = e ? 'block' : 'none'), (r = !0)),
								t && (this.layoutDefaultVisible = e),
								(this.visible = e),
								n && C(this, 'viewLogic.didChangeVisibility') && this.viewLogic.didChangeVisibility(e),
								r
							);
						},
					},
					{
						key: 'childVisibilityChanged',
						value: function () {
							null != this.childVisibilityChangedHook ? this.childVisibilityChangedHook() : null != this.parent && this.parent.childVisibilityChanged();
						},
					},
					{
						key: 'update',
						value: function (e) {
							null == this.beforeUpdateHook || e || this.beforeUpdateHook(),
								this.updateSize(),
								this.updateTrans(),
								null != this.updateHook && this.updateHook();
						},
					},
					{
						key: 'updateChildren',
						value: function (e) {
							this.children.forEach(function (t) {
								t.update(), e && t.updateChildren(e);
							});
						},
					},
					{
						key: 'doTextCalcs',
						value: function () {
							var e = 1 / S.getScale(),
								t = this.content.style.width,
								n = this.el.style.display;
							(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation) &&
								((this.el.style.display = 'block'), (this.content.style.width = 'fit-content'));
							var r = this.content.clientWidth * e,
								i = this.content.clientHeight * e;
							(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation) && ((this.content.style.width = t), (this.el.style.display = n)),
								(this.lastWidthByText = r + 4 + this.padLeft + this.padRight),
								(this.lastHeightByText = i + 4);
						},
					},
					{
						key: 'wasAppended',
						value: function () {
							var e = this;
							this.calcTextSize && this.doTextCalcs(),
								null != this.childViews &&
									this.childViews.forEach(function (t) {
										'string' == typeof t && (t = G.getOrCreateView(t)), t.init(e.nameSpace), e.append(t);
									});
						},
					},
					{
						key: 'setChildNum',
						value: function (e) {
							this.defaultChildNum = e;
						},
					},
					{
						key: 'hasAllChildren',
						value: function () {
							return this.hasInitialized && this.children.length === this.defaultChildNum;
						},
					},
					{
						key: 'append',
						value: function (e, t) {
							if (
								((e.parent = this),
								(this.children[w.camelCase(e.nameKey)] = e),
								t ? this.children.unshift(e) : this.children.push(e),
								this.noContent || e.outsideContent ? this.el.appendChild(e.el) : this.content.appendChild(e.el),
								e.wasAppended(),
								e.update(),
								null == e.nameSpace)
							) {
								for (var n = this; null != n && null == n.nameSpace; ) n = n.parent;
								(e.nameSpace = n.nameSpace),
									G.hasNamespace(n.nameSpace)
										? (G.getNamespace(n.nameSpace)[e.nameKey] = e)
										: console.warn('could not find namespace '.concat(n.nameSpace, ' when appending'));
							}
						},
					},
					{
						key: 'destroy',
						value: function () {
							null != this.children &&
								this.children.forEach(function (e) {
									return e.destroy();
								}),
								null != this.viewLogic && this.viewLogic.teardown(),
								null != this.el.parentNode && this.el.parentNode.removeChild(this.el),
								(this.nameSpace = null);
						},
					},
					{
						key: 'startFloat',
						value: function () {
							(this.floating = !0),
								(this.lastFloatParent = this.el.parentNode),
								this.shouldReparent && G.getNamespace(this.nameSpace).wrapper.el.appendChild(this.el);
						},
					},
					{
						key: 'endFloat',
						value: function () {
							this.floating && ((this.floating = !1), this.shouldReparent && this.lastFloatParent.appendChild(this.el));
						},
					},
					{
						key: 'right',
						value: function () {
							return this.floating ? 0 : this.x + this.w;
						},
					},
					{
						key: 'bottom',
						value: function () {
							return this.floating ? 0 : this.y + this.h;
						},
					},
					{
						key: 'getBox',
						value: function () {
							if (null == G.getNamespace(this.nameSpace).wrapper) return null;
							var e = (k.theme.isClassic && G.getNamespace(this.nameSpace).wrapper.dimScale) || 1,
								t = (G.getNamespace(this.nameSpace).wrapper.scale || 1) * e,
								n = this.x,
								r = this.y,
								i = this.w,
								o = this.h,
								a = this.offsets,
								l = (a = void 0 === a ? {} : a).l,
								s = void 0 === l ? 0 : l,
								c = a.t,
								u = this;
							for (n = (n + s) * t, r = (r + (void 0 === c ? 0 : c)) * t; (u = u.parent); ) {
								var f = null != u.parent ? t : 1,
									d = u.offsets,
									h = (d = void 0 === d ? {} : d).l,
									p = void 0 === h ? 0 : h,
									y = d.t,
									b = void 0 === y ? 0 : y;
								(n += (u.x + p) * f), (r += (u.y + b) * f);
							}
							return { x: n, y: r, w: (i *= t), h: (o *= t) };
						},
					},
				]),
				n && b(t.prototype, n),
				r && b(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				e
			);
		})();
	(V.propFns = {
		'fit-to-text-w': function () {
			return Math.max(this.minW, this.lastWidthByText) + this.wPad;
		},
		'fit-to-text-h': function () {
			return Math.max(this.minH, this.lastHeightByText);
		},
		'vertical-center': function () {
			return this.parent.h / 2 - this.h / 2;
		},
		'horizontal-center': function () {
			return this.parent.w / 2 - this.w / 2;
		},
	}),
		(V.prop = function (e, t, n) {
			if ('number' == typeof n) e[t] = n;
			else if ('string' == typeof n && null != V.propFns[n]) Object.defineProperties(e, h({}, t, { get: V.propFns[n], set: w.noop }));
			else if ('string' == typeof n && n.endsWith('%')) {
				var r = parseFloat(n) / 100,
					i = null != I[t] ? I[t] : t;
				Object.defineProperties(
					e,
					h({}, t, {
						get: function () {
							return this.parent[i] ? e.parent[i] * r : 0;
						},
						set: w.noop,
					}),
				);
			} else if (w.isFunction(n)) {
				var o;
				if ('w' === t || 'h' === t) {
					var a = n.bind(e),
						l = t.toUpperCase(),
						s = e['min'.concat(l)],
						c = e['max'.concat(l)];
					o = function () {
						var e = a();
						return e < s ? (e = s) : e > c && (e = c), e;
					}.bind(e);
				} else o = n;
				Object.defineProperties(e, h({}, t, { get: o, set: w.noop }));
			} else e[t] = n;
			e[t] = n;
		});
	var U = {},
		K = {},
		z = {},
		Q = function (e) {
			var t,
				n,
				r = d(e);
			return (
				'string' === r
					? (t = e)
					: 'object' === r
					? (n = e[(t = Object.keys(e)[0])])
					: console.warn('invalid view definition. '.concat(e, ' is a ').concat(d(e))),
				{ viewName: t, children: n }
			);
		},
		G = {
			nameSpaces: {},
			nsStack: [],
			getNamespace: function (e) {
				return this.nameSpaces[e];
			},
			hasNamespace: function (e) {
				return null != this.nameSpaces[e];
			},
			setModel: function (e) {
				return (this.model = e), this;
			},
			resetStates: function (e) {
				var t = this.getNamespace(e);
				w.forEach(t, function (e) {
					return e && e.setEnabled && e.setEnabled(!0);
				});
			},
			updateVisibility: function (e, t) {
				var n = !1;
				for (var r in e) {
					var i = this.nameSpaces[t][r];
					if (null != i) i.setVisibility(e[r], !0) && (n = !0);
				}
				return n;
			},
			def: function (e, t, n) {
				null == n ? (t.nameKey = e) : (n.nameKey = e);
				var r = new V(t, n);
				return null == U[e] ? ((U[e] = r), (K[e] = { ViewLogic: t, p: n }), (z[e] = 0)) : console.warn('views connot share the same name '.concat(e)), r;
			},
			addNameSpace: function (e) {
				(g = e),
					(this.nameSpaces[g] = this.nameSpaces[g] || {
						name: e,
						topLevelElements: [],
						isAttached: !0,
						tabReachable: !0,
						detach: function () {
							(this.isAttached = !1),
								this.topLevelElements.forEach(function (e) {
									return A.removeChild(e.el);
								});
						},
						reattach: function () {
							(this.isAttached = !0),
								this.topLevelElements.forEach(function (e) {
									return A.appendChild(e.el);
								});
						},
						updateTabIndex: function () {
							var e = this,
								t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
								n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
								r = function (t) {
									if (!t.dataset.leavealone) {
										var n = t.getAttribute('data-tabindex');
										null == n && ((n = t.tabIndex), t.setAttribute('data-tabindex', n)), (t.tabIndex = e.tabReachable ? n : -1);
									}
								};
							this.topLevelElements.forEach(function (i) {
								var o = function (e, t) {
									t ? e.el.removeAttribute('aria-hidden') : e.el.setAttribute('aria-hidden', !0);
								};
								t &&
									(i.children.some(function (e) {
										return 'startoverlay' === e.nameKey;
									})
										? i.children
												.filter(function (e) {
													return 'startoverlay' !== e.nameKey;
												})
												.forEach(function (t) {
													return o(t, e.tabReachable);
												})
										: o(i, e.tabReachable)),
									i.el.querySelectorAll(n ? '[tabIndex]:not(.acc-shadow-el):not(.slide-object)' : '[tabIndex]').forEach(function (e) {
										return r(e);
									}),
									'lightBoxClose' === i.nameKey && r(i.el);
							});
						},
					});
			},
			update: (function (e) {
				function t(t, n) {
					return e.apply(this, arguments);
				}
				return (
					(t.toString = function () {
						return e.toString();
					}),
					t
				);
			})(function (e, t) {
				e.forEach(function (e) {
					w.isFunction(e) ? e() : Array.isArray(e) ? update(e, t) : null == e || !e.update || (e.noUpdate && !t) || (e.update(), t && e.updateHtml());
				});
			}),
			getViewConfig: function (e) {
				var t = K[e];
				return { name: e, ViewLogic: t.ViewLogic, p: t.p };
			},
			getOrCreateView: function (e) {
				if (++z[e] > 1) {
					var t = K[e],
						n = t.ViewLogic,
						r = t.p;
					return new V(n, r);
				}
				return U[e];
			},
			tree: function (e, t) {
				for (
					var n = this,
						r = [],
						i = function t(r) {
							if (null !== r) {
								var i = Q(r),
									o = i.viewName,
									a = i.children,
									l = (n.nameSpaces[e][o] = n.getOrCreateView(o));
								if (null != l) {
									if (((l.nameSpace = e), C(a, 'length') > 0)) {
										l.setChildNum(a.length), (l.hasChildren = !0);
										for (var s = 0; s < a.length; s++) t(a[s]);
									}
								} else console.warn("could not find view '".concat(o, "'"));
							}
						},
						o = function t(i, o) {
							if (null !== i) {
								var a = Q(i),
									l = a.viewName,
									s = a.children,
									c = n.nameSpaces[e][l];
								if (null != c) {
									if (
										(c.init(e),
										null != o ? o.append(c) : n.nameSpaces[e].topLevelElements.push(c),
										null != c.childDef && c.childDef(),
										r.push(c),
										c.hasChildren)
									)
										for (var u = 0; u < s.length; u++) t(s[u], c);
								} else console.warn("could not find view '".concat(l, "'"));
							}
						},
						a = 0;
					a < t.length;
					a++
				)
					i(t[a]);
				for (var l = 0; l < t.length; l++) o(t[l]);
				return r;
			},
			getCurrentNameSpace: function () {
				return this.nameSpaces[g];
			},
			getTopNameSpace: function () {
				return w.last(this.nsStack);
			},
			getCurrentNameSpaceString: function () {
				return g;
			},
			getFrameNameSpace: function () {
				return this.nameSpaces[D];
			},
			getBlocker: function (e) {
				switch (e) {
					case DS.constants.refs.FRAME:
						return G.getNamespace(e).frameBlocker;
					case 'LightboxWnd':
						return G.getNamespace(e).lightBoxBlocker;
					case 'LightboxControlsWnd':
						return G.getNamespace(e).lightBoxControlsBlocker;
					default:
						return null;
				}
			},
		};
	function Z(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return e;
			})(e) ||
			X(e) ||
			Y(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function q(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return $(e);
			})(e) ||
			X(e) ||
			Y(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Y(e, t) {
		if (e) {
			if ('string' == typeof e) return $(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			return (
				'Object' === n && e.constructor && (n = e.constructor.name),
				'Map' === n || 'Set' === n ? Array.from(e) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $(e, t) : void 0
			);
		}
	}
	function X(e) {
		if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
	}
	function $(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var J,
		ee = DS,
		te = ee._,
		ne = ee.pubSub,
		re = ee.events,
		ie = {},
		oe = !1,
		ae = {},
		le = function (e) {
			try {
				var t = q(document.styleSheets).find(e);
				J = q(t.rules);
			} catch (e) {}
		};
	if (
		(le(function (e) {
			return null != e.href && e.href.includes('output.min.css');
		}),
		ne.on(re.scheme.CHANGED, function (e) {
			le(function (t) {
				return null != t.ownerNode && t.ownerNode.id === e;
			}),
				(ae = {});
		}),
		null != J)
	) {
		var se = function (e, t) {
			var n, r;
			if (oe) {
				n = ''.concat(t, '.cs-').concat(G.model.frame.default_layout);
				var i = e.split(' ');
				r = (i = i.map(function (e) {
					return (e.startsWith('.') ? '.' : '') + te.compact(e.split('.')).reverse().join('.');
				})).join(' ');
			} else {
				G.model;
				(n = '.cs-'.concat(G.model.frame.default_layout).concat(t)), (r = e);
			}
			return ''.concat(n, ' ').concat(r);
		};
		ie.getColor = function (e, t, n) {
			var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
				i = se(t, r);
			if (null == ae[i]) {
				var o = J.find(function (e) {
					return e.selectorText === i;
				});
				null == o &&
					((oe = !oe),
					(i = se(t, r)),
					(o =
						J.find(function (e) {
							return e.selectorText === i;
						}) || {})),
					(ae[i] = o.style || {});
			}
			return ae[i][n] || '';
		};
	} else {
		var ce = function (e, t) {
				var n = document.createElement(e);
				return n.setAttribute('class', t), n;
			},
			ue = /^\./,
			fe = /\./g;
		ie.getColor = function (e, t, n) {
			var r,
				i,
				o = ((arguments.length > 4 && void 0 !== arguments[4] && arguments[4]) || t).split(/\s+/),
				a = G.getNamespace(e).wrapper.el;
			o.forEach(function (e, t) {
				if (ue.test(e)) (s = e.replace(fe, ' ')), (r = ce('div', s));
				else {
					var n = Z(e.split('.')),
						o = n[0],
						l = n.slice(1);
					r = ce(o, l.join(' '));
				}
				var s;
				0 === t && ((r.style.position = 'absolute'), (r.style.display = 'none'), (i = r)), a.appendChild(r), (a = r);
			});
			var l = window.getComputedStyle(r).getPropertyValue(n);
			return '' === l && 'border-color' === n && (l = window.getComputedStyle(r).getPropertyValue('border-top-color')), i.parentNode.removeChild(i), l || '';
		};
	}
	var de = ie;
	function he(e) {
		return (
			(he =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			he(e)
		);
	}
	function pe(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== he(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== he(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === he(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	var ye,
		be,
		ve,
		ge,
		me = DS,
		we = me.dom,
		Se = me._,
		ke = me.detection,
		Oe = me.pubSub,
		Ee = me.events,
		Ce = (function () {
			function e() {
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
					Se.bindAll(this, 'onLoaderShow', 'onLoaderMute', 'onLoaderUnmute', 'onLoaderHide', 'onRemoveLoaderTitle');
				var t = {};
				(t[Ee.loader.SHOW] = this.onLoaderShow),
					(t[Ee.loader.MUTE] = this.onLoaderMute),
					(t[Ee.loader.UNMUTE] = this.onLoaderUnmute),
					(t[Ee.loader.HIDE] = this.onLoaderHide),
					(t[Ee.loader.REMOVE_TITLE] = this.onRemoveLoaderTitle),
					(t[Ee.startOverlay.READY] = this.onLoaderHide),
					we.addClass(document.body, 'theme-'.concat(window.globals.themeName)),
					document.body.classList.contains('view-tablet') && we.addClass(document.body, 'is-touchable-tablet'),
					ke.env.is360 && we.addClass(document.body, 'is-360'),
					Oe.on(t),
					this.setupBrandingColor();
			}
			var t, n, r;
			return (
				(t = e),
				(n = [
					{
						key: 'setupBrandingColor',
						value: function () {
							window.requestAnimationFrame(function () {
								var e = de.getColor(DS.constants.refs.FRAME, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme');
								null != e && ((DS.constants.theme.brandingHighlight = e), Oe.trigger(Ee.app.BRANDING_COLOR, e));
							});
						},
					},
					{
						key: 'onRemoveLoaderTitle',
						value: function () {
							var e = document.querySelector('body > .mobile-load-title-overlay');
							null != e && e.parentNode.removeChild(e);
						},
					},
					{
						key: 'getSpinLoader',
						value: function () {
							return document.querySelector('body > .slide-loader');
						},
					},
					{
						key: 'onLoaderMute',
						value: function () {
							var e = this.getSpinLoader();
							null != e && (e.style.opacity = 0);
						},
					},
					{
						key: 'showLoaderDelayed',
						value: function (e) {
							clearTimeout(this.loaderTimeout), (this.loaderTimeout = setTimeout(this.onLoaderShow, e));
						},
					},
					{
						key: 'onLoaderHide',
						value: function () {
							clearTimeout(this.loaderTimeout),
								(this.getSpinLoader().style.display = 'none'),
								we.addClass(document.getElementById('preso'), 'hide-slide-loader'),
								Oe.trigger(Ee.app.HIDE_LOADER);
						},
					},
					{
						key: 'onLoaderUnmute',
						value: function () {
							var e = this.getSpinLoader();
							null != e && (e.style.opacity = 1);
						},
					},
					{
						key: 'onLoaderShow',
						value: function (e) {
							e > 0
								? this.showLoaderDelayed(e)
								: ((this.getSpinLoader().style.display = 'block'),
								  we.removeClass(document.getElementById('preso'), 'hide-slide-loader'),
								  Oe.trigger(Ee.app.SHOW_LOADER));
						},
					},
				]) && pe(t.prototype, n),
				r && pe(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				e
			);
		})(),
		xe = DS,
		Le = xe.globalEventHelper.addWindowListener,
		Pe = xe.events,
		Te = Pe.ds,
		_e = Te.FRAME_DATA_LOADED,
		je = Te.PRESO_READY,
		De = Pe.window.STACKING_CHANGED,
		Ae = Pe.frame,
		Ie = Ae.MODEL_READY,
		Re = Ae.SCALE,
		Be = Pe.resume.SET_DATA,
		Me = Pe.startOverlay.READY,
		He = Pe.controlOptions.RESET,
		Ne = Pe.sidebar.ACTIVE_TAB_SET,
		Fe = Pe.renderTree.DESTROYED,
		We = xe.constants,
		Ve = (We.els.PRESO, We.refs.FRAME),
		Ue = xe.detection.theme,
		Ke = xe.pubSub,
		ze = xe.focusManager,
		Qe = (xe.flagManager, xe.playerGlobals),
		Ge = xe.stringTabler,
		Ze = xe.shortcutManager,
		qe = xe.dom,
		Ye = {},
		Xe = function (e) {
			var t = G.nsStack.indexOf(e);
			t >= 0 && G.nsStack.splice(t, 1);
		},
		$e = function () {
			var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
			G.nsStack.forEach(function (t, n, r) {
				(t.tabReachable = n === r.length - 1 && e), t.updateTabIndex();
			});
		},
		Je = function (e) {
			(ye = {
				createWindow: function (t) {
					var n,
						r,
						i = this,
						o = G.getNamespace(t),
						a = function () {
							return (function (e) {
								var t = G.getNamespace(e),
									n = t.isAttached;
								t.reattach(), Xe(t), G.nsStack.push(t), n || Ye[e].all();
								var r = G.nsStack.length;
								G.nsStack.forEach(function (e, t) {
									var n = e.slide.el;
									t === r - 1
										? (qe.addClass(n, 'primary-slide'), qe.removeClass(n, 'secondary-slide'))
										: (qe.removeClass(n, 'primary-slide'), qe.addClass(n, 'secondary-slide'));
								}),
									$e(),
									Ke.trigger(De, e);
							})(t);
						},
						l = function (e, n, r) {
							if (e === t) {
								var i = r ? r.getWndBlockerBackground() : '',
									a = G.getBlocker(e);
								null != a && (a.setBackgroundColor(i), a.setVisibility(n)), (o.tabReachable = !n), o.updateTabIndex(!1, !0);
							}
						};
					return (
						null == o &&
							(G.addNameSpace(t),
							(r = e[t](be)),
							(n = _.flow(
								Le('resize', function () {
									r.resize(), Ke.trigger(Re);
								}),
								DS.pubSub.addListener(DS.events.utilityWindow.DOCKED, function () {
									r.resize(), Ke.trigger(Re);
								}),
							)),
							t === Ve ? be.setLayout(be.frame.default_layout, Ve) : r.all(),
							(o = G.getNamespace(t)),
							(Ye[t] = r),
							(o.moveToTop = a),
							Ue.isUnified &&
								(Ke.on(DS.events.frameModel.BLOCKED_CHANGED, l),
								Ke.on(DS.events.window.MAIN_CHANGED, function (e, t) {
									return l(t, !1);
								}))),
						a(),
						Ke.on(He, function e() {
							var t = (function () {
								var e = [],
									t = G.getNamespace(Ve).tabs.viewLogic.getSelectedTab();
								return (
									t && e.push(t.nameKey),
									_.each(G.getNamespace(Ve).topTabs.children, function (t) {
										_.each(_.filter(t.children, 'viewLogic.showing', !0), function (t) {
											return e.push(t.nameKey);
										});
									}),
									e
								);
							})();
							Xe(G.getNamespace(Ve)),
								r.destroy(),
								DS.pubSub.trigger(Fe),
								(G.nameSpaces[Ve] = null),
								n(),
								Ke.off(He, e),
								i.createWindow('_frame'),
								r.rerender(),
								t.forEach(function (e) {
									Ke.trigger(Ne, e);
								});
						}),
						{
							id: t,
							el: o.slide.el,
							wndEl: o.wrapper.el,
							captionEl: (o.captionContainer || {}).el,
							x: function () {
								return o.wrapper.x;
							},
							y: function () {
								return o.wrapper.y;
							},
							close: function () {
								(o.zoomBounds = null), o.detach(), Xe(o), G.nsStack[G.nsStack.length - 1].moveToTop(), ze.reCenter();
							},
							moveToTop: a,
							getWinScale: function () {
								return o.slide.winScale || 1;
							},
							getPinchZoomBounds: function () {
								return o.slide.pinchZoomBounds;
							},
							onPinchZoom: Ye[t].pinchZoom
								? function (e) {
										(o.zoomBounds = e), Ye[t].pinchZoom();
								  }
								: function () {},
							onWndBlockedChanged: l,
						}
					);
				},
				getSidebarPosition: function () {
					return be.sidebarOpts.sidebarPos;
				},
				getDefaultLayout: function () {
					return ve.default_layout;
				},
				getFonts: function () {
					return ve.fonts;
				},
				getFontScale: function () {
					return be.frame.fontscale;
				},
				getCaptionData: function () {
					var e = be.frame.controlOptions.controls,
						t = { font: e.font, enabled: e.closed_captions },
						n = be.frame.controlOptions.ccOptions || {};
					return (
						(t.font = n.font),
						(t.size = n.size),
						(t.placement = n.placement),
						(t.backgroundColor = n.backgroundColor),
						(t.color = n.color),
						(t.text = n.text),
						t
					);
				},
				getNavData: function () {
					return be.frame.navData.outline.links;
				},
				isReadOnlyOnce: function () {
					return ve.controlOptions.controls.readonlyOnce;
				},
				topmostUnreachable: function () {
					return G.nsStack;
				},
				setAllAccVisibility: function (e) {
					_.forEach(G.nameSpaces, function (t) {
						var n = t.wrapper;
						e ? n.el.removeAttribute('aria-hidden') : n.el.setAttribute('aria-hidden', !0);
					});
				},
			}),
				Ke.on(Be, $e),
				Ke.on(Me, function () {
					$e(!1);
				}),
				(Qe.player = ye);
		},
		et = function () {
			(ye.hasData = !0), Ke.trigger(_e, ye);
		},
		tt = DS,
		nt = tt.MicroScrollBar,
		rt = tt.detection,
		it = function (e) {
			return null != e && 2 === e.split('.').length;
		},
		ot = function (e, t) {
			return e.some(function (e) {
				var n = t[e.name];
				return null == n || ('outline' === e.name && n.enabled) || !0 === n;
			});
		};
	function at(e) {
		return (
			(at =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			at(e)
		);
	}
	function lt(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== at(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== at(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === at(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	var st,
		ct = DS.detection,
		ut = new ((function () {
			function e() {
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
					(this.minSize = Math.min(window.innerWidth, window.innerHeight)),
					(this.isMobileChrome = ct.os.isIOS && ct.browser.isChrome);
			}
			var t, n, r;
			return (
				(t = e),
				(n = [
					{
						key: 'shouldUseCache',
						value: function () {
							return this.isMobileChrome && document.activeElement.classList.contains('acc-textinput');
						},
					},
					{
						key: 'height',
						get: function () {
							return this.shouldUseCache()
								? (this.cachedOuterHeight !== window.outerHeight &&
										((this.cachedHeight = window.outerHeight - (this.cachedOuterHeight - this.cachedHeight)), (this.cachedOuterHeight = window.outerHeight)),
								  this.cachedHeight)
								: ((this.cachedOuterHeight = window.outerHeight), (this.cachedHeight = window.innerHeight), window.innerHeight);
						},
					},
					{
						key: 'width',
						get: function () {
							return window.innerWidth;
						},
					},
				]) && lt(t.prototype, n),
				r && lt(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				e
			);
		})())(),
		ft = 'wrapper';
	G.def(ft, function () {
		var e = G.model.frame;
		return {
			attrs: { id: ft, class: 'cs-base cs-'.concat(e.default_layout, ' fn-').concat(e.default_layout, ' cs-custom-theme') },
			style: { fontSize: ''.concat(e.fontscale, '%') },
			x: 0,
			y: 0,
			w: function () {
				return ut.width;
			},
			h: function () {
				return ut.height;
			},
			updateHook: function () {
				this.el.style.fontSize = ''.concat(e.fontscale, '%');
			},
			add: !0,
		};
	});
	var dt,
		ht = '-20px',
		pt = '-30px';
	var yt = {
			setTooltipOn: function (e, t, n) {
				var r,
					i,
					o = t.left,
					a = t.top,
					l = t.width,
					s = t.height;
				null == st &&
					((r = G.model),
					(i = de.getColor(DS.constants.refs.FRAME, '.cs-button .cs-icon', 'fill')),
					((st = document.createElement('div')).id = 'tooltip'),
					(st.style.left = ht),
					(st.style.top = pt),
					(st.style.borderColor = i),
					st.classList.add('cs-base', 'cs-'.concat(r.frame.default_layout)),
					document.getElementById('app-top').appendChild(st),
					st.addEventListener('mouseleave', yt.runObjHoverOut)),
					(dt = e),
					(st.style.display = 'block'),
					(st.innerText = n);
				var c = st.getBoundingClientRect().width,
					u = window.innerWidth,
					f = o + (l / 2 - c / 2);
				f + c >= u - 10 ? (f = u - 10 - c) : f <= 10 && (f = 10);
				var d = a - (s + 10);
				d <= 10 && (d = a + s + 10), (st.style.left = ''.concat(f, 'px')), (st.style.top = ''.concat(d, 'px'));
			},
			hideTooltip: function (e) {
				null == st || (null != e && e !== dt) || ((st.style.display = 'none'), (st.innerText = ''), (st.style.left = 0), (dt = void 0));
			},
			updateTooltip: function (e, t) {
				var n = st.getBoundingClientRect().width;
				(st.innerText = t), (st.style.left = ''.concat(e - n / 2, 'px'));
			},
			runObjHoverOut: function () {
				null != dt ? dt.onHoverOut() : yt.hideTooltip();
			},
		},
		bt = yt;
	function vt(e) {
		return (
			(vt =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			vt(e)
		);
	}
	function gt(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== vt(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== vt(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === vt(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	var mt = DS,
		wt = mt.dom,
		St = mt.pubSub,
		kt = mt.events,
		Ot = mt._,
		Et = mt.constants,
		Ct = mt.keyManager,
		xt = mt.focusManager,
		Lt = (mt.flagManager, mt.stringTabler),
		Pt = mt.detection,
		Tt = 'click',
		_t = function () {
			return Pt.deviceView.isUnifiedDesktop;
		},
		jt = (function () {
			function e(t) {
				var n = this;
				for (var r in ((function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
				(this.el = t.el),
				(this.view = t),
				(this.model = t.model),
				t.children))
					this[r + 'El'] = t.children[r].el;
				DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation
					? (t.simpleView ||
							(DS._.bindAll(this, 'onFocus', 'onBlur', 'onLayoutChange'),
							this.el.addEventListener('focusin', this.onFocus),
							this.el.addEventListener('focusout', this.onBlur),
							St.on(kt.frameModel.LAYOUT_CHANGED, this.onLayoutChange)),
					  St.on(kt.strings.UPDATE_STRINGS, function () {
							return n.onStringsUpdated();
					  }))
					: (DS._.bindAll(this, 'onFocus', 'onBlur', 'onLayoutChange'),
					  this.el.addEventListener('focusin', this.onFocus),
					  this.el.addEventListener('focusout', this.onBlur),
					  St.on(kt.frameModel.LAYOUT_CHANGED, this.onLayoutChange)),
					_t() &&
						(Ot.bindAll(this, 'onHoverIn', 'onHoverOut', 'onMainKeydown'),
						document.body.addEventListener('mouseenter', this.onHoverOut),
						this.el.addEventListener('mouseenter', this.onHoverIn),
						this.el.addEventListener('mouseleave', this.onHoverOut),
						this.el.addEventListener('mouseup', this.onHoverOut),
						document.addEventListener('keydown', this.onMainKeydown));
			}
			var t, n, r;
			return (
				(t = e),
				(n = [
					{
						key: 'onClick',
						value: function (e) {
							this.el.addEventListener(Tt, e.bind(this));
						},
					},
					{
						key: 'onClickEl',
						value: function (e, t) {
							e.addEventListener(Tt, t.bind(this));
						},
					},
					{
						key: 'on',
						value: function (e, t) {
							this.el.addEventListener(e, t.bind(this));
						},
					},
					{
						key: 'getViewBox',
						value: function () {
							return this.view.getBox();
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							var t = this.getViewBox(),
								n = t.x,
								r = t.y,
								i = t.w,
								o = t.h;
							xt.setFocusRectOn(this.el, { left: n, top: r, width: i, height: o }), this.onHoverIn(e), (this.hasFocus = !0);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							xt.takeFocusOff(), this.onHoverOut(e), (this.hasFocus = !1);
						},
					},
					{
						key: 'getTooltipString',
						value: function () {
							return Lt.getString(this.tooltipKey);
						},
					},
					{
						key: 'onHoverIn',
						value: function (e) {
							var t = this;
							if (_t() && this.hasTooltip && (null == this.hideTooltipWhenOpen || !this.isOpen)) {
								var n = this.getTooltipString(e);
								if (null == n && 'seek' === this.view.nameKey)
									return void setTimeout(function () {
										return t.onHoverIn(e);
									}, 200);
								bt.hideTooltip();
								var r = this.getViewBox(e),
									i = r.x,
									o = r.y,
									a = r.w,
									l = r.h;
								bt.setTooltipOn(this, { left: i, top: o, width: a, height: l }, n), this.tooltipMoves && this.setForFollowMouse(), (this.tooltipOn = !0);
							}
						},
					},
					{
						key: 'dismissTooltip',
						value: function () {
							bt.hideTooltip(this), this.tooltipMoves && this.stopFollowMouse(), (this.tooltipOn = !1);
						},
					},
					{
						key: 'onHoverOut',
						value: function () {
							var e = this;
							_t() &&
								this.hasTooltip &&
								this.tooltipOn &&
								setTimeout(function () {
									var t = document.elementFromPoint(wt.mouseX, wt.mouseY);
									null != t && (e.el.contains(t) || 'tooltip' === t.id || e.dismissTooltip());
								}, 200);
						},
					},
					{
						key: 'onMainKeydown',
						value: function (e) {
							Ct.isKey(e.which, Et.keys.ESCAPE) && (e.stopPropagation(), this.dismissTooltip());
						},
					},
					{
						key: 'teardown',
						value: function () {
							St.off(kt.frameModel.LAYOUT_CHANGED, this.onLayoutChange),
								Pt.deviceView.isUnifiedDesktop &&
									(document.body.removeEventListener('mouseenter', this.onHoverOut),
									this.el.removeEventListener('mouseenter', this.onHoverIn),
									this.el.removeEventListener('mouseleave', this.onHoverOut),
									this.el.removeEventListener('mousedown', this.dismissTooltip),
									document.removeEventListener('keydown', this.onMainKeydown),
									this.tooltipOn && (this.onHoverOut(), this.tooltipMoves && this.stopFollowMouse()));
						},
					},
					{ key: 'onLayoutChange', value: function () {} },
					{
						key: 'onStringsUpdated',
						value: function () {
							this.view.updateStrings();
						},
					},
				]) && gt(t.prototype, n),
				r && gt(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				e
			);
		})(),
		Dt = jt;
	function At(e) {
		return (
			(At =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			At(e)
		);
	}
	function It(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== At(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== At(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === At(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Rt(e, t) {
		return (
			(Rt = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Rt(e, t)
		);
	}
	function Bt(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Mt(e);
			if (t) {
				var i = Mt(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === At(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function Mt(e) {
		return (
			(Mt = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Mt(e)
		);
	}
	var Ht = 'frame',
		Nt = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Rt(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Bt(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					((t = i.call(this, e)).onScroll = function (e) {
						e.preventDefault(), (t.el.scrollTop = 0), (t.el.scrollLeft = 0);
					}),
					t.el.addEventListener('scroll', t.onScroll),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'teardown',
						value: function () {
							this.el.removeEventListener('scroll', this.onScroll);
						},
					},
					{ key: 'onFocus', value: function () {} },
					{ key: 'onBlur', value: function () {} },
				]) && It(t.prototype, n),
				r && It(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt);
	function Ft(e) {
		return (
			(Ft =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ft(e)
		);
	}
	function Wt(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Ft(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Ft(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Ft(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Vt(e, t) {
		return (
			(Vt = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Vt(e, t)
		);
	}
	function Ut(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = zt(e);
			if (t) {
				var i = zt(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Ft(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Kt(e);
			})(this, n);
		};
	}
	function Kt(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function zt(e) {
		return (
			(zt = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			zt(e)
		);
	}
	G.def(Ht, Nt, function () {
		var e = G.model;
		return {
			attrs: { id: Ht, class: 'cs-base cs-'.concat(e.frame.default_layout, ' fn-').concat(e.frame.default_layout) },
			w: '100%',
			h: '100%',
			html: '<div class="top-ui-bg"></div><div class="bottom-ui-bg"></div><div class="left-ui-bg"></div><div class="right-ui-bg"></div>',
		};
	});
	var Qt,
		Gt,
		Zt = DS,
		qt = Zt.detection,
		Yt = Zt.events,
		Xt = Zt.pubSub,
		$t = function () {
			return document.getElementById('app-top') || document.body;
		},
		Jt = DS.utils.pxify,
		en = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Vt(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Ut(o);
			function o(e) {
				var t, n;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					((t = i.call(this, e)).visualNode =
						(((n = document.createElement('div')).className = 'skipnav transparent'),
						(n.innerText = G.model.getString('acc_skipnavigation')),
						$t().appendChild(n),
						window.requestAnimationFrame(function () {
							(Gt = n.clientHeight), (Qt = n.clientWidth), (n.className = 'skipnav'), null != n.parentNode && n.parentNode.removeChild(n);
						}),
						n)),
					DS._.bindAll(Kt(t), 'onButtonClick'),
					t.onClick(t.onButtonClick),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onFocus',
						value: function () {
							if (!qt.device.isMobile) {
								DS.focusManager.takeFocusOff();
								var e = G.getTopNameSpace().slide,
									t = e.getBox(),
									n = t.x,
									r = t.y,
									i = t.w,
									o = t.h;
								Object.assign(this.visualNode.style, { top: Jt(r + o - Gt - 50), left: Jt(n + i - Qt - 50) }),
									(e.el.style.opacity = 0.6),
									$t().appendChild(this.visualNode),
									Xt.trigger(Yt.skipNav.FOCUSED);
							}
						},
					},
					{
						key: 'onBlur',
						value: function () {
							var e = G.getTopNameSpace().slide,
								t = this.visualNode.parentNode;
							(e.el.style.opacity = 1), null != t && t.removeChild(this.visualNode);
						},
					},
					{
						key: 'onButtonClick',
						value: function (e) {
							this.el.focus(),
								setTimeout(function () {
									DS.focusManager.onSlideStarted(null, DS.windowManager.getCurrentWindowSlide());
								}, 100);
						},
					},
				]),
				n && Wt(t.prototype, n),
				r && Wt(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		tn = en,
		nn = 'skipnav';
	function rn(e) {
		return (
			(rn =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			rn(e)
		);
	}
	function on(e, t, n) {
		return (
			(t = (function (e) {
				var t = (function (e, t) {
					if ('object' !== rn(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || 'default');
						if ('object' !== rn(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === t ? String : Number)(e);
				})(e, 'string');
				return 'symbol' === rn(t) ? t : String(t);
			})(t)) in e
				? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (e[t] = n),
			e
		);
	}
	G.def(nn, tn, function () {
		var e = G.model,
			t = e.getString('acc_skipnavigation');
		return {
			tag: 'button',
			ariaStringId: 'acc_skipnavigation',
			attrs: { id: nn, 'aria-label': t, tabindex: 0 },
			visible: e.sidebarOpts.sidebarEnabled,
			x: -100,
			y: -100,
			w: 1,
			h: 1,
			html: t,
			methods: {
				updateDomStrings: function () {
					this.el.textContent = e.getString('acc_skipnavigation');
				},
			},
		};
	});
	var an = DS,
		ln = an._,
		sn = an.pubSub,
		cn = an.events,
		un = an.detection,
		fn = an.constants.MOBILE_UI_SIZE,
		dn = 'top '.concat(150, 'ms ease-in-out');
	function hn(e) {
		return (
			(hn =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			hn(e)
		);
	}
	function pn(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== hn(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== hn(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === hn(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function yn(e, t) {
		return (
			(yn = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			yn(e, t)
		);
	}
	function bn(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = gn(e);
			if (t) {
				var i = gn(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === hn(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return vn(e);
			})(this, n);
		};
	}
	function vn(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function gn(e) {
		return (
			(gn = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			gn(e)
		);
	}
	var mn = DS,
		wn = mn.pubSub,
		Sn = mn.events,
		kn = mn._,
		On = mn.utils,
		En =
			(mn.flagManager,
			(function (e) {
				!(function (e, t) {
					if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
					(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
						Object.defineProperty(e, 'prototype', { writable: !1 }),
						t && yn(e, t);
				})(o, e);
				var t,
					n,
					r,
					i = bn(o);
				function o(e) {
					var t;
					return (
						(function (e, t) {
							if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
						})(this, o),
						(t = i.call(this, e)),
						kn.bindAll(vn(t), 'onSlideChange', 'onAriaToggle'),
						wn.on(Sn.slide.HAS_MOUNTED, t.onSlideChange),
						wn.on(Sn.slide.ARIA_TOGGLE, t.onAriaToggle),
						(t.teardownPushableSlide = (function (e) {
							var t;
							if (!un.deviceView.isPhone) return ln.noop;
							function n() {
								(e.view.el.style.transition = null), (e.view.el.style.top = '0px');
							}
							function r(t) {
								e.view.el.style.transition = dn;
								var n = 0.45 * window.innerHeight - 10,
									r = -(e.view.bottom() - n),
									i = e.view.y + r,
									o = 0;
								i < fn && un.theme.isUnified ? (o = fn - i + 10) : i < 0 && (o = -1 * i + 10), (e.view.el.style.top = ''.concat(r + o, 'px'));
							}
							function i() {
								(e.view.el.style.transition = dn), (e.view.el.style.top = ''.concat(0, 'px'));
							}
							return (
								sn.on(
									(on((t = {}), cn.threeSixtyImage.UN_PUSH_LABEL, n),
									on(t, cn.threeSixtyImage.PUSH_UP_BY_LABEL, r),
									on(t, cn.threeSixtyImage.PUSH_DOWN_BY_LABEL, i),
									t),
								),
								function () {
									n(),
										sn.off(cn.threeSixtyImage.UN_PUSH_LABEL, n),
										sn.off(cn.threeSixtyImage.PUSH_UP_BY_LABEL, r),
										sn.off(cn.threeSixtyImage.PUSH_DOWN_BY_LABEL, i);
								}
							);
						})(vn(t))),
						t
					);
				}
				return (
					(t = o),
					(n = [
						{
							key: 'onAriaToggle',
							value: function (e) {
								e.hidden
									? (this.el.setAttribute('aria-hidden', !0), this.el.setAttribute('tabindex', 0))
									: (this.el.removeAttribute('aria-hidden'), this.el.removeAttribute('tabindex'));
							},
						},
						{
							key: 'teardown',
							value: function () {
								wn.off(Sn.slide.HAS_MOUNTED, this.onSlideChange), this.teardownPushableSlide();
							},
						},
						{
							key: 'onSlideChange',
							value: function (e) {
								null != this.labelEl &&
									this.view.nameSpace === e.props.windowId &&
									(this.labelEl.textContent = ''.concat(G.model.getString('slide'), ': ').concat(On.stripTags(e.props.model.title())));
							},
						},
						{ key: 'onFocus', value: function () {} },
						{ key: 'onBlur', value: function () {} },
					]) && pn(t.prototype, n),
					r && pn(t, r),
					Object.defineProperty(t, 'prototype', { writable: !1 }),
					o
				);
			})(Dt)),
		Cn = En,
		xn = 10,
		Ln = 20,
		Pn = 65,
		Tn = 1e3,
		_n = DS,
		jn = _n.scaler,
		Dn = _n.MicroScrollBar,
		An = _n.utils.pxify,
		In = 'slide',
		Rn = DS;
	Rn.pubSub, Rn.events;
	G.def(In, Cn, function (e) {
		var t = G.getNamespace(e),
			n = (t.frame, t.sidebar),
			r = t.topBar,
			i = t.bottomBar,
			o = G.model;
		return {
			attrs: { id: In, class: 'window-slide '.concat(e, '-slide') },
			origin: '0 0',
			w: function () {
				return jn.zoomMode ? this.availW - (this.currWinScale <= 1 ? 9 : 0) : Math.round(o.slideWidth * this.currWinScale);
			},
			h: function () {
				return jn.zoomMode
					? Math.min(this.availH - (this.currWinScale <= 1 ? 9 : 0), window.innerHeight - (this.y + (this.bottomBarExists() ? i.h : 0)))
					: Math.round(o.slideHeight * this.currWinScale);
			},
			z: 1,
			style: { overflow: 'scroll' },
			methods: {
				topBarExists: function () {
					return (
						null != r &&
						r.visible &&
						(o.sidebarOpts.titleEnabled || o.sidebarOpts.sidebarEnabled || o.hasTopLinks() || o.frame.controlOptions.controls.elapsedandtotaltime)
					);
				},
				bottomBarExists: function () {
					var e = !1;
					return (
						null != i &&
							i.visible &&
							i.children &&
							(e = i.children.some(function (e) {
								return e.visible;
							})),
						o.bottomBarOpts.bottomBarEnabled && e
					);
				},
				calcSidebarOffsets: function () {
					var e = null != n && n.visible,
						t = e && 'left' === n.pos;
					(this.sidebarWidthOffset = t ? n.right() : e ? window.innerWidth - n.x : 0), (this.sidebarXOffset = t ? n.right() : 0);
				},
				calcWinScale: function () {
					var e = this.topBarExists(),
						t = this.bottomBarExists(),
						n = t ? i.h : 0,
						a = e ? r.h : 0,
						l = a + n,
						s = n | a ? Ln : 0;
					(this.offY = 0),
						(this.minY = 0),
						!e && t ? ((this.offY = -i.h), (l += 15), (this.minY = 15)) : e && !t && ((this.offY = 25), (l += 15), (this.minY = 15));
					var c = o.dockSettings,
						u = c.dockedState,
						f = c.width,
						d = u !== DS.constants.docked.NONE;
					(this.availW = window.innerWidth - this.sidebarWidthOffset - (d ? f : 0)),
						(this.availH = window.innerHeight - l),
						(this.currWinScale = Math.min((this.availW - s) / o.slideWidth, this.availH / o.slideHeight));
				},
				beforeUpdateHook: function () {
					this.calcSidebarOffsets(), this.calcWinScale();
				},
			},
			winScale: function () {
				return jn.zoomMode ? 1 : this.currWinScale;
			},
			x: function () {
				var e = o.dockSettings,
					t = e.dockedState,
					n = e.width,
					r = 'left' === t ? n : 0;
				if (!jn.zoomMode) {
					var i = o.slideWidth * this.currWinScale;
					return Math.round(r + this.sidebarXOffset + (this.availW - i) / 2);
				}
				return r + this.sidebarXOffset;
			},
			y: function () {
				return Math.max(jn.zoomMode ? r.h : this.minY, Math.round((window.innerHeight - o.slideHeight * this.winScale) / 2 + this.offY));
			},
			add: !0,
			updateHook: function () {
				var e = this;
				if (jn.zoomMode) {
					null == this.scrollbar && ((this.scrollbar = new Dn(this.el, 'slide')), (this.hscrollbar = new Dn(this.el, 'slide', !0))),
						(this.scrollbar.scrollBar.style.left = An(this.x + this.w)),
						(this.scrollbar.scrollBar.style.top = An(this.y)),
						(this.scrollbar.scrollBar.style.height = An(this.availH)),
						(this.hscrollbar.scrollBar.style.left = An(this.x)),
						(this.hscrollbar.scrollBar.style.top = An(this.y + this.h)),
						(this.hscrollbar.scrollBar.style.width = An(this.availW)),
						this.scrollbar.setEnabled(!0),
						this.hscrollbar.setEnabled(!0);
					window.requestAnimationFrame(function t() {
						e.el.getElementsByClassName('slide').length > 0 ? (e.scrollbar.update(), e.hscrollbar.update()) : window.requestAnimationFrame(t);
					});
				} else this.scrollbar && (this.scrollbar.setEnabled(!1), this.hscrollbar.setEnabled(!1));
			},
			html: '<div id="slide-label" data-ref="label" aria-live="polite"></div>\n      <main class="slide-container" data-ref="container" aria-live="off" tabindex="-1"></main>',
			noContent: !0,
		};
	});
	var Bn = 'logo';
	DS.flagManager;
	function Mn(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Hn(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Hn(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Hn(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Hn(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	G.def(Bn, function (e) {
		var t,
			n = G.model,
			r = G.getNamespace(e).sidebar,
			i = r.w,
			o = 0.75 * i;
		return {
			id: Bn,
			attrs: { class: 'logo cs-logo', role: 'banner' },
			w: '100%',
			h: 170,
			html: function () {
				((t = document.createElement('img')).onload = function () {
					(i = t.naturalWidth), (o = t.naturalHeight), (t.onload = null), r.updateChildren(!0);
				}),
					(t.src = DS.utils.resolveAssetUrl(n.sidebarOpts.html5_logo_url)),
					n.sidebarOpts.logoAltText && (t.alt = n.sidebarOpts.logoAltText),
					this.el.appendChild(t);
			},
			visible: n.sidebarOpts.logoEnabled,
			updateHook: function () {
				o / 170 > i / r.data.actualWidth() ? ((t.style.width = 'auto'), (t.style.height = '100%')) : ((t.style.width = '100%'), (t.style.height = 'auto'));
			},
		};
	});
	var Nn = 'sidebar',
		Fn = DS,
		Wn = Fn.utils,
		Vn = Fn.TweenLite,
		Un = Fn.dom,
		Kn = Fn.events,
		zn = Fn.pubSub,
		Qn = Fn.detection;
	G.def(Nn, function (e) {
		var t = G.model,
			n = de.getColor(e, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme'),
			r = t.sidebarOpts.sidebarPos;
		Un.addClass(document.body, 'sidebar-'.concat(r));
		var i = 0.25,
			o = function () {
				var e = t.dockSettings || {},
					n = e.dockedState,
					r = e.width,
					i = n !== DS.constants.docked.NONE,
					o = window.innerWidth - (i ? r : 0),
					a = Qn.device.isPhone ? 0.8 * window.innerWidth : o / 4;
				return Wn.clamp(245, 400, a);
			},
			a = function () {
				return 'left' === r ? 0 : window.innerWidth - o();
			},
			l = { x: a() },
			s = [];
		return {
			tag: 'section',
			attrs: { id: Nn, class: 'cs-left area-secondary-wrapper', 'aria-label': 'sidebar' },
			overflow: 'visible',
			visible: t.sidebarOpts.sidebarEnabled,
			pos: r,
			noContent: !1,
			shouldReparent: !1,
			xs: [0],
			data: { actualWidth: o },
			x: function () {
				var e = this,
					t = a();
				if ((this.collapsed && ('left' === this.pos ? (t -= o()) : (t += o())), this.animate && !this.animating)) {
					var n = 'left' === this.pos ? -30 : 30;
					this.collapsed && this.floating
						? (Un.addClass(document.body, 'sidebar-closing'),
						  Vn.to(this.content, i, {
								opacity: 0,
								x: n,
								ease: 'power4.out',
								onComplete: function () {
									Un.removeClass(document.body, 'sidebar-closing'), Un.addClass(document.body, 'sidebar-closed');
								},
						  }))
						: (Un[this.collapsed ? 'addClass' : 'removeClass'](document.body, 'sidebar-closed'),
						  Vn.set(this.content, { x: n, opacity: 0 }),
						  Vn.to(this.content, i, { x: 0, delay: 0.11, ease: 'power2.out' }),
						  Vn.to(this.content, i, { opacity: 1, delay: 0.11, ease: 'none', overwrite: !1 }));
					var r = window.innerWidth,
						s = Vn.to(l, i, {
							x: t,
							onComplete: function () {
								(e.animating = !1), (e.animate = !1);
							},
							onUpdate: function () {
								'right' === e.pos && window.innerWidth != r && (s.kill(), (e.animating = !1)), zn.trigger(Kn.frame.REFLOW), zn.trigger(Kn.frame.SCALE);
							},
						});
					this.animating = !0;
				}
				return (
					this.animating || (l.x = t),
					this.floating
						? 'right' === this.pos
							? ((this.xs[0] = l.x - window.innerWidth), window.innerWidth)
							: ((this.xs[0] = l.x), 0)
						: ((this.xs[0] = 0), l.x)
				);
			},
			w: function () {
				return this.visible ? o() : 0;
			},
			h: '100%',
			html: '\n      <style>\n        .selected-animation-done:after {\n          background: '.concat(
				n,
				';\n        }\n      </style>\n      <div class="slider-mask" data-ref="sliderMask">\n        <div class="tab-selected-slider cs-brandhighlight-bg" data-ref="tabSelectedSlider"></div>\n      </div>\n    ',
			),
			updateHook: function () {
				this.hasAllChildren() && this[this.collapsed ? 'onSidebarHide' : 'onSidebarShow']();
			},
			methods: {
				onSidebarHide: function () {
					this.onSidebarShow(),
						(s = Mn(this.el.querySelectorAll('[tabindex="0"]:not(#hamburger)'))).forEach(function (e) {
							e.tabIndex = -1;
						}),
						this.content.setAttribute('aria-hidden', !0);
				},
				onSidebarShow: function () {
					s.forEach(function (e) {
						e.tabIndex = 0;
					}),
						this.content.removeAttribute('aria-hidden');
				},
			},
		};
	});
	var Gn = function () {
			return 'no icon';
		},
		Zn = {
			next: function () {
				return '\n  <svg class="cs-icon next-icon" width="10px" height="18px" viewBox="0 -1 10 18" focusable="false">\n    <path transform="rotate(180, 5, 8)" d="M2.81685219,7.60265083 L9.00528946,1.41421356 L7.5910759,-1.27897692e-13 L1.55431223e-13,7.5910759 L0.0115749356,7.60265083 L1.55431223e-13,7.61422577 L7.5910759,15.2053017 L9.00528946,13.7910881 L2.81685219,7.60265083 Z" stroke="none" fillRule="evenodd"></path>\n  </svg>';
			},
			prev: function () {
				return '\n  <svg class="cs-icon prev-icon" width="10px" height="18px" viewBox="0 -1 10 18" focusable="false">\n    <path transform="translate(0, 1)" d="M2.81685219,7.60265083 L9.00528946,1.41421356 L7.5910759,-1.27897692e-13 L1.55431223e-13,7.5910759 L0.0115749356,7.60265083 L1.55431223e-13,7.61422577 L7.5910759,15.2053017 L9.00528946,13.7910881 L2.81685219,7.60265083 Z" stroke="none" fillRule="evenodd"></path>\n  </svg>\n';
			},
			submit: function () {
				return '\n   <svg class="cs-icon check-icon" width="17px" height="18px" viewBox="0 0 17 16" focusable="false">\n\n  <path stroke="none" transform="translate(0, 1)" d="\n  M 17 1.4\n  L 15.6 0 5.7 9.9 1.4 5.65 0 7.05 5.65 12.75 5.7 12.75 17 1.4 Z"/>\n\n  </svg>';
			},
			replay: function () {
				return '<svg class="cs-icon" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" focusable="false">\n    <path fill="#FFFFFF" stroke="none" d="\n      M 10.95 8.75\n      Q 11 9 11 9.25 10.95 11.15 9.7 12.4 8.4 13.7 6.5 13.75 4.6 13.7 3.3 12.4 2.05 11.15 2 9.25 2.05 7.3 3.3 6.05 4.398828125 4.998828125 6 4.75\n      L 6 6.9\n      Q 6.05 7.75 6.85 7.35\n      L 11.35 4.3\n      Q 11.7 4.05 11.7 3.75 11.7 3.45 11.35 3.2\n      L 6.85 0.15\n      Q 6.05 -0.3 6 0.6\n      L 6 2.75\n      Q 3.4517578125 3.001171875 1.8 4.75 0.05 6.6 0 9.25 0.05 12 1.9 13.85 3.75 15.65 6.5 15.75 9.25 15.65 11.1 13.85 12.95 12 13 9.25 13 9 13 8.75\n      L 10.95 8.75 Z"/>\n    </svg>';
			},
			play: function () {
				return '<svg id="icon-play" class="cs-icon play-icon" width="11" height="13" viewBox="0 0 11 13" focusable="false">\n    <path fill="#FFFFFF" stroke="none" d="\n      M 0.851 13.011\n      C 0.381 13.295 0 13.068 0 12.526\n      L 0 0.771\n      C 0 0.219 0.378 0 0.854 0.288\n      L 10.507 6.132\n      C 10.979 6.417 10.981 6.878 10.504 7.168\n      L 6.307 9.708\n      L 0.851 13.011 Z" />\n  </svg>';
			},
			pause: function () {
				return '<svg id="icon-pause" class="cs-icon pause-icon" width="9" height="14" viewBox="0 0 9 14" focusable="false">\n    <rect x="0" width="3" height="14"/>\n    <rect x="6" width="3" height="14"/>\n  </svg>';
			},
			volume: function (e, t) {
				var n = Math.min(1, e / 5),
					r = Math.min(1, Math.max(0, e / 5 - 0.5));
				return '<svg class="cs-icon volume-icon '
					.concat(
						t ? 'volume-icon-selected' : '',
						'" width="16px" height="14px" viewBox="0 0 16 14" focusable="false">\n      <rect x="0" y="4" width="3" height="6"></rect>\n      <polygon points="4 4 9 0 9 14 4 10"></polygon>\n      <g transform="translate(10, 0)">\n        <mask id="vol-mask" fill="white">\n          <rect id="path-1" x="0" y="0" width="8" height="14" style="fill: white;"></rect>\n        </mask>\n        <circle strokeWidth="1.5" style="opacity: ',
					)
					.concat(r, ';" mask="url(#vol-mask)" fill="none" cx="-1" cy="7" r="6.5"></circle>\n        <circle strokeWidth="1.5" style="opacity: ')
					.concat(n, ';" mask="url(#vol-mask)" fill="none" cx="-1" cy="7" r="3.5"></circle>\n      </g>\n    </g>\n  </svg>');
			},
			captionsOn: function (e) {
				return '<svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n            <path fill="#FFFFFF" stroke="none" d="M 19 2 Q 19 1.15 18.4 0.6 17.85 0 17 0 L 2 0 Q 1.15 0 0.6 0.6 0 1.15 0 2 L 0 12 Q 0 12.85 0.6 13.4 1.15 14 2 14 L 7.6 14 9.5 15.9 11.4 14 17 14 Q 17.85 14 18.4 13.4 19 12.85 19 12 L 19 2 M 15.7 4.2 L 15.25 4.85 Q 15.15 4.9 15.1 5 15 5.05 14.85 5.05 14.75 5.05 14.6 4.95 14.5 4.9 14.3 4.8 14.15 4.65 13.9 4.6 13.65 4.5 13.3 4.5 12.85 4.5 12.5 4.7 12.15 4.85 11.9 5.15 11.7 5.45 11.6 5.9 11.45 6.35 11.45 6.9 11.5 7.45 11.6 7.9 11.7 8.35 11.95 8.65 12.2 8.95 12.5 9.15 12.85 9.3 13.25 9.3 13.65 9.3 13.9 9.2 14.2 9.1 14.35 8.95 14.5 8.85 14.65 8.75 14.8 8.65 14.95 8.65 15.15 8.65 15.25 8.8 L 15.75 9.4 Q 15.45 9.75 15.15 10 14.8 10.2 14.45 10.35 14.05 10.5 13.7 10.55 13.3 10.6 12.95 10.6 12.25 10.6 11.65 10.35 11.1 10.1 10.65 9.65 10.2 9.15 9.95 8.45 9.7 7.75 9.7 6.9 9.7 6.1 9.95 5.4 10.15 4.75 10.6 4.25 11.05 3.75 11.7 3.5 12.35 3.2 13.2 3.2 14 3.2 14.6 3.45 15.2 3.7 15.7 4.2 M 5.85 4.7 Q 5.5 4.85 5.25 5.15 5.05 5.45 4.95 5.9 4.8 6.35 4.8 6.9 4.85 7.45 4.95 7.9 5.05 8.35 5.3 8.65 5.55 8.95 5.85 9.15 6.2 9.3 6.6 9.3 7 9.3 7.25 9.2 7.55 9.1 7.7 8.95 7.85 8.85 8 8.75 8.15 8.65 8.3 8.65 8.5 8.65 8.6 8.8 L 9.1 9.4 Q 8.8 9.75 8.5 10 8.15 10.2 7.8 10.35 7.4 10.5 7.05 10.55 6.65 10.6 6.3 10.6 5.6 10.6 5 10.35 4.45 10.1 4 9.65 3.55 9.15 3.3 8.45 3.05 7.75 3.05 6.9 3.05 6.1 3.3 5.4 3.5 4.75 3.95 4.25 4.4 3.75 5.05 3.5 5.7 3.2 6.55 3.2 7.35 3.2 7.95 3.45 8.55 3.7 9.05 4.2 L 8.6 4.85 Q 8.5 4.9 8.45 5 8.35 5.05 8.2 5.05 8.1 5.05 7.95 4.95 7.85 4.9 7.65 4.8 7.5 4.65 7.25 4.6 7 4.5 6.65 4.5 6.2 4.5 5.85 4.7 Z"/>\n          </svg>';
			},
			captionsOff: function (e) {
				return '<svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n            <g>\n              <path d="M 11.45 3.5 Q 10.8 3.75 10.35 4.25 9.9 4.75 9.7 5.4 9.45 6.1 9.45 6.9 9.45 7.75 9.7 8.45 9.95 9.15 10.4 9.65 10.85 10.1 11.4 10.35 12 10.6 12.7 10.6 13.05 10.6 13.45 10.55 13.8 10.5 14.2 10.35 14.55 10.2 14.9 10 15.2 9.75 15.5 9.4 L 15 8.8 Q 14.9 8.65 14.7 8.65 14.55 8.65 14.4 8.75 14.25 8.85 14.1 8.95 13.95 9.1 13.65 9.2 13.4 9.3 13 9.3 12.6 9.3 12.25 9.15 11.95 8.95 11.7 8.65 11.45 8.35 11.35 7.9 11.25 7.45 11.2 6.9 11.2 6.35 11.35 5.9 11.45 5.45 11.65 5.15 11.9 4.85 12.25 4.7 12.6 4.5 13.05 4.5 13.4 4.5 13.65 4.6 13.9 4.65 14.05 4.8 14.25 4.9 14.35 4.95 14.5 5.05 14.6 5.05 14.75 5.05 14.85 5 14.9 4.9 15 4.85 L 15.45 4.2 Q 14.95 3.7 14.35 3.45 13.75 3.2 12.95 3.2 12.1 3.2 11.45 3.5 M 5.6 4.7 Q 5.95 4.5 6.4 4.5 6.75 4.5 7 4.6 7.25 4.65 7.4 4.8 7.6 4.9 7.7 4.95 7.85 5.05 7.95 5.05 8.1 5.05 8.2 5 8.25 4.9 8.35 4.85 L 8.8 4.2 Q 8.3 3.7 7.7 3.45 7.1 3.2 6.3 3.2 5.45 3.2 4.8 3.5 4.15 3.75 3.7 4.25 3.25 4.75 3.05 5.4 2.8 6.1 2.8 6.9 2.8 7.75 3.05 8.45 3.3 9.15 3.75 9.65 4.2 10.1 4.75 10.35 5.35 10.6 6.05 10.6 6.4 10.6 6.8 10.55 7.15 10.5 7.55 10.35 7.9 10.2 8.25 10 8.55 9.75 8.85 9.4 L 8.35 8.8 Q 8.25 8.65 8.05 8.65 7.9 8.65 7.75 8.75 7.6 8.85 7.45 8.95 7.3 9.1 7 9.2 6.75 9.3 6.35 9.3 5.95 9.3 5.6 9.15 5.3 8.95 5.05 8.65 4.8 8.35 4.7 7.9 4.6 7.45 4.55 6.9 4.55 6.35 4.7 5.9 4.8 5.45 5 5.15 5.25 4.85 5.6 4.7 Z" />\n              <path class="icon-stroke-only" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 9.5 15.2 L 7.8 13.5 2 13.5 Q 1.35 13.5 0.95 13.05 0.5 12.65 0.5 12 L 0.5 2 Q 0.5 1.35 0.95 0.95 1.35 0.5 2 0.5 L 17 0.5 Q 17.65 0.5 18.05 0.95 18.5 1.35 18.5 2 L 18.5 12 Q 18.5 12.65 18.05 13.05 17.65 13.5 17 13.5 L 11.2 13.5 9.5 15.2 Z" />\n            </g>\n          </svg>';
			},
			captions: function () {
				return '\n    <svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n      <g>\n        <path d="M 11.45 3.5 Q 10.8 3.75 10.35 4.25 9.9 4.75 9.7 5.4 9.45 6.1 9.45 6.9 9.45 7.75 9.7 8.45 9.95 9.15 10.4 9.65 10.85 10.1 11.4 10.35 12 10.6 12.7 10.6 13.05 10.6 13.45 10.55 13.8 10.5 14.2 10.35 14.55 10.2 14.9 10 15.2 9.75 15.5 9.4 L 15 8.8 Q 14.9 8.65 14.7 8.65 14.55 8.65 14.4 8.75 14.25 8.85 14.1 8.95 13.95 9.1 13.65 9.2 13.4 9.3 13 9.3 12.6 9.3 12.25 9.15 11.95 8.95 11.7 8.65 11.45 8.35 11.35 7.9 11.25 7.45 11.2 6.9 11.2 6.35 11.35 5.9 11.45 5.45 11.65 5.15 11.9 4.85 12.25 4.7 12.6 4.5 13.05 4.5 13.4 4.5 13.65 4.6 13.9 4.65 14.05 4.8 14.25 4.9 14.35 4.95 14.5 5.05 14.6 5.05 14.75 5.05 14.85 5 14.9 4.9 15 4.85 L 15.45 4.2 Q 14.95 3.7 14.35 3.45 13.75 3.2 12.95 3.2 12.1 3.2 11.45 3.5 M 5.6 4.7 Q 5.95 4.5 6.4 4.5 6.75 4.5 7 4.6 7.25 4.65 7.4 4.8 7.6 4.9 7.7 4.95 7.85 5.05 7.95 5.05 8.1 5.05 8.2 5 8.25 4.9 8.35 4.85 L 8.8 4.2 Q 8.3 3.7 7.7 3.45 7.1 3.2 6.3 3.2 5.45 3.2 4.8 3.5 4.15 3.75 3.7 4.25 3.25 4.75 3.05 5.4 2.8 6.1 2.8 6.9 2.8 7.75 3.05 8.45 3.3 9.15 3.75 9.65 4.2 10.1 4.75 10.35 5.35 10.6 6.05 10.6 6.4 10.6 6.8 10.55 7.15 10.5 7.55 10.35 7.9 10.2 8.25 10 8.55 9.75 8.85 9.4 L 8.35 8.8 Q 8.25 8.65 8.05 8.65 7.9 8.65 7.75 8.75 7.6 8.85 7.45 8.95 7.3 9.1 7 9.2 6.75 9.3 6.35 9.3 5.95 9.3 5.6 9.15 5.3 8.95 5.05 8.65 4.8 8.35 4.7 7.9 4.6 7.45 4.55 6.9 4.55 6.35 4.7 5.9 4.8 5.45 5 5.15 5.25 4.85 5.6 4.7 Z" />\n        <path class="icon-stroke-only" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 9.5 15.2 L 7.8 13.5 2 13.5 Q 1.35 13.5 0.95 13.05 0.5 12.65 0.5 12 L 0.5 2 Q 0.5 1.35 0.95 0.95 1.35 0.5 2 0.5 L 17 0.5 Q 17.65 0.5 18.05 0.95 18.5 1.35 18.5 2 L 18.5 12 Q 18.5 12.65 18.05 13.05 17.65 13.5 17 13.5 L 11.2 13.5 9.5 15.2 Z" />\n      </g>\n    </svg>';
			},
			carrot: function (e) {
				return '\n    <svg style="left:calc('.concat(
					e,
					');" class="cs-icon cs-icon-carrot carrot"width="30" height="30" viewBox="0 0 30 30" focusable="false">\n      <g transform="translate(8, 8)">\n        <polygon style="fill:currentColor !important" points="1,1.5 5,5 1,8.5"/>\n      </g>\n  </svg>',
				);
			},
			search: function () {
				return '\n    <svg class="search-icon" width="13px" height="15px" viewBox="0 0 13 15" focusable="false"\n      <g fill="none" fill-rule="evenodd">\n        <g stroke-width="2">\n          <circle cx="5.6" cy="5.6" r="4.6"/>\n          <path d="M8 9l4 5"/>\n        </g>\n      </g>\n    </svg>\n    ';
			},
			searchClear: function () {
				return '\n    <svg class="cs-icon icon" width="11px" height="11px" viewBox="0 0 11 11">\n    <g id="Desktop-Color-Contrast" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="Search" transform="translate(-290.000000, -69.000000)" fill="fill:currentColor !important" fill-rule="nonzero">\n            <g id="search" transform="translate(13.000000, 59.000000)">\n                <polygon id="ic_close" points="286.777666 10 282.500215 14.2779053 278.222334 10 277 11.2222382 281.277881 15.5002869 277 19.7779053 278.222334 21 282.500215 16.7222382 286.777666 21 288 19.7779053 283.722119 15.5002869 288 11.2222382"></polygon>\n            </g>\n        </g>\n    </g>\n    </svg>\n    ';
			},
			filter: function () {
				return '<svg class="cs-icon icon-gear" width="14" height="14" viewBox="0 0 14 14" focusable="false">\n    <path id="icon-gear" transform="translate(0,3)" d="M11.1,9.8C11.1,9.8,11.1,9.8,11.1,9.8C11.1,9.8,11.1,9.7,11.1,9.8c0-0.1,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0-0.1,0.1-0.1c0,0,0,0,0,0c0-0.1,0.1-0.1,0.1-0.2c0,0,0,0,0,0c0-0.1,0-0.1,0.1-0.2c0,0,0,0,0,0c0.1-0.2,0.2-0.5,0.2-0.7l2-0.4V6.4l-2-0.4c0-0.3-0.1-0.5-0.2-0.7c0,0,0,0,0,0c0-0.1,0-0.1-0.1-0.2c0,0,0,0,0,0c0-0.1,0-0.1-0.1-0.2c0,0,0,0,0,0c0,0,0-0.1-0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l1.2-1.7l-0.9-0.9L9.7,2.8c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0,0,0,0,0c-0.1,0-0.1-0.1-0.2-0.1c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c0,0,0,0,0,0C8.3,2.1,8.1,2.1,7.8,2L7.4,0H6.2L5.9,2c-0.3,0-0.5,0.1-0.7,0.2c0,0,0,0,0,0C5,2.3,5,2.3,4.9,2.3c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0.1c0,0,0,0,0,0c0,0-0.1,0-0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0L2.3,1.6L1.4,2.5l1.2,1.7c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0,0,0C2.2,5,2.2,5,2.2,5.1c0,0,0,0,0,0c0,0.1,0,0.1-0.1,0.2c0,0,0,0,0,0C2,5.5,1.9,5.8,1.9,6l-2,0.4v1.2l2,0.4c0,0.3,0.1,0.5,0.2,0.7c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0,0,0,0,0,0c0,0,0,0.1,0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l-1.2,1.7l0.9,0.9L4,11.2c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0.1,0,0.1,0.1c0,0,0,0,0,0c0.1,0,0.1,0.1,0.2,0.1c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0.1c0,0,0,0,0,0c0.2,0.1,0.5,0.2,0.7,0.2l0.4,2h1.2l0.4-2c0.3,0,0.5-0.1,0.7-0.2c0,0,0,0,0,0c0.1,0,0.1,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1,0,0.2-0.1c0,0,0,0,0,0c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l1.7,1.2l0.9-0.9L11.1,9.8C11,9.8,11,9.8,11.1,9.8C11,9.8,11.1,9.8,11.1,9.8z M6.8,9.2c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2C8,4.8,9,5.8,9,7C9,8.2,8,9.2,6.8,9.2z"/>\n  </svg>';
			},
			close: function () {
				return '\n    <svg class="cs-icon icon-close" width="20" height="20" viewBox="0 0 36 36" focusable="false">\n      <polygon points="36,2.826 33.174,0 18,15.174 2.826,0 0,2.826 15.174,18 0,33.174 2.826,36 18,20.826 33.174,36 36,33.174 20.826,18" />\n    </svg>';
			},
			clear: function () {
				return '<svg class="cs-icon icon-clear" width="13" height="14" viewBox="0 0 13 14" focusable="false">\n    <use xlink:href="#icon-clear" fill="rgba(240, 240, 240, 1)" transform="translate(0, 1)" />\n    <path id="icon-clear" transform="translate(3,3)" d="M6.5,0C2.9,0,0,2.9,0,6.5C0,10.1,2.9,13,6.5,13c3.6,0,6.5-2.9,6.5-6.5C13,2.9,10.1,0,6.5,0z M1.5,6.5c0-2.8,2.2-5,5-5c1.2,0,2.4,0.5,3.2,1.2L2.2,9.1C1.8,8.3,1.5,7.5,1.5,6.5z M6.5,11.5c-1.2,0-2.3-0.5-3.2-1.2L10.8,4c0.4,0.7,0.7,1.6,0.7,2.5C11.5,9.3,9.3,11.5,6.5,11.5z"/>\n  </svg>';
			},
			hamburger: function () {
				return '\n    <svg class="cs-icon" width="30px" height="12px" viewBox="0 10 30 12" focusable="false">\n      <path transform="translate(0, 1)" d="M0,15 L17,15 L17,17 L0,17 L0,15 Z M0,11 L17,11 L17,13 L0,13 L0,11 Z M0,19 L17,19 L17,21 L0,21 L0,19 Z" ></path>\n    </svg>\n  ';
			},
			file: function () {
				return '\n    <svg width="20px" height="27px" viewBox="0 0 40 50" role="presentation" focusable="false">\n      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">\n        <g>\n          <path class="file-icon-bg" d="M2.00804893,0 C0.899034128,0 0,0.889064278 0,1.99091407 L0,48.0090859 C0,49.1086374 0.892756032,50 1.99862555,50 L37.2170607,50 C38.3208711,50 39.2156863,49.1011186 39.2156863,47.993136 L39.2156863,13.6363636 L26.1437908,0 L2.00804893,0 Z"></path>\n          <path class="file-icon-fold" d="M26.1437908,0 L26.1437908,11.7296861 C26.1437908,12.8319383 27.0422752,13.7254902 28.1433598,13.7254902 L39.2156863,13.7254902"></path>\n        </g>\n      </g>\n    </svg>';
			},
			link: function (e) {
				return '\n  <svg class="link-icon" preserveAspectRatio="none" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" role="presentation" focusable="false">\n      <path fill="'.concat(
					e,
					'" stroke="none" d="\n            M 1.45 8.5\n            Q 0.0453125 10.0015625 0 11.9\n            L 0 12.15\n            Q 0.0453125 14.0484375 1.45 15.55\n            L 1.5 15.6\n            Q 3.0015625 17.0046875 4.85 17.05\n            L 5.1 17.05\n            Q 7.0150390625 17.0046875 8.5 15.6\n            L 10.65 13.45\n            Q 10.95 13.15 10.95 12.75 10.95 12.35 10.65 12.05 10.3689453125 11.7689453125 10 11.75\n            L 9.95 11.75\n            Q 9.55 11.75 9.2 12.05\n            L 7.1 14.15\n            Q 6.2 15.05 5 15.05 3.8 15.05 2.9 14.15 2 13.25 2 12.05 2 10.8826171875 2.85 9.95\n            L 5 7.8\n            Q 5.3 7.5 5.3 7.1\n            L 5.3 7.05\n            Q 5.2810546875 6.6810546875 5 6.4 4.7 6.1 4.3 6.1 3.9 6.1 3.55 6.4\n            L 1.45 8.5\n            M 12.05 5\n            Q 11.75 4.7 11.35 4.7 10.95 4.7 10.65 5\n            L 5 10.65\n            Q 4.7 10.95 4.7 11.35 4.7 11.75 5 12.05 5.3 12.35 5.7 12.35 6.1 12.35 6.4 12.05\n            L 12.05 6.4\n            Q 12.35 6.1 12.35 5.7 12.35 5.3 12.05 5\n            M 15.6 1.5\n            L 15.55 1.45\n            Q 14 0 12.05 0\n            L 12 0\n            Q 10.05 0 8.5 1.45\n            L 6.4 3.55\n            Q 6.1 3.9 6.1 4.3 6.1 4.7 6.4 5 6.7 5.3 7.1 5.3 7.5 5.3 7.8 5\n            L 9.95 2.85\n            Q 10.8826171875 2 12.05 2 13.25 2 14.15 2.9 15.05 3.8 15.05 5 15.05 6.2 14.15 7.1\n            L 12.05 9.2\n            Q 11.75 9.55 11.75 9.95 11.75 10.35 12.05 10.65 12.35 10.95 12.75 10.95 13.15 10.95 13.45 10.65\n            L 15.6 8.5\n            Q 17.05 6.96875 17.05 5 17.05 3.05 15.6 1.5 Z"/>\n          </svg>',
				);
			},
			settings: function () {
				return '\n    <svg class="cs-icon" data-ref="settings" width="16px" height="16px" viewBox="0 0 16 16" focusable="false">\n      <path d="M8.94,0 C9.82,0 10.55,0.62 10.63,1.45 L10.73,2.36 C11.1,2.52 11.45,2.71 11.78,2.94 L12.66,2.56 C13.46,2.22 14.39,2.5 14.83,3.23 L15.77,4.77 C16.21,5.5 16,6.4 15.29,6.9 L14.51,7.42 C14.54,8.19 14.53,8.38 14.51,8.58 L15.29,9.11 C16,9.6 16.21,10.51 15.77,11.23 L14.83,12.77 C14.39,13.49 13.46,13.78 12.66,13.44 L11.78,13.06 C11.45,13.29 11.1,13.48 10.73,13.64 L10.63,14.55 C10.55,15.38 9.82,16 8.94,16 L7.06,16 C6.18,16 5.45,15.38 5.37,14.55 L5.27,13.64 C4.9,13.48 4.55,13.29 4.22,13.06 L3.34,13.44 C2.54,13.78 1.61,13.5 1.17,12.77 L0.23,11.23 C-0.21,10.51 0,9.6 0.71,9.11 L1.49,8.58 C1.46,7.81 1.47,7.62 1.49,7.42 L0.71,6.89 C0,6.40 -0.21,5.49 0.23,4.77 L1.17,3.23 C1.61,2.51 2.54,2.22 3.34,2.56 L4.22,2.94 C4.55,2.71 4.9,2.52 5.27,2.36 L5.37,1.45 C5.45,0.62 6.18,0 7.06,0 Z M7.96,4.53 C5.91,4.53 4.25,6.11 4.25,8.06 C4.25,10.01 5.91,11.59 7.96,11.59 C10.02,11.59 11.68,10.01 11.68,8.06 C11.68,6.11 10.02,4.53 7.96,4.53 Z"></path>\n    </svg>\n    ';
			},
			playbackSpeed: function () {
				return '\n    <svg class="cs-icon" width="15" height="15" viewBox="0 0 15 15" focusable="false">\n      <path d="M5.9 4.0L10.4 7.4L5.9 10.8V4.0ZM1.5 8.2H0.0C0.1 9.6 0.6 10.9 1.5 12.0L2.6 11.0C2.0 10.1 1.6 9.2 1.5 8.2H1.5ZM15 7.4H14.9C14.9 5.6 14.3 3.8 13.0 2.4C11.8 1.0 10.0 0.1 8.2 0.0V1.5C10.1 1.7 11.8 2.9 12.8 4.7C13.7 6.4 13.7 8.5 12.8 10.2C11.8 12.0 10.1 13.1 8.2 13.4V14.9C10.0 14.7 11.8 13.8 13.0 12.5C14.3 11.1 14.9 9.3 14.9 7.4L15 7.4ZM3.6 12.1L2.5 13.1C3.7 14.1 5.1 14.8 6.7 14.9V13.4V13.4C5.5 13.3 4.5 12.8 3.6 12.1V12.1ZM2.6 3.9L1.5 2.8C0.6 3.9 0.1 5.3 0 6.7H1.5H1.5C1.6 5.7 2.0 4.7 2.6 3.9H2.6ZM6.7 1.5V0.0C5.1 0.1 3.7 0.7 2.5 1.7L3.6 2.8C4.5 2.1 5.5 1.6 6.7 1.5V1.5Z" stroke="none" />\n    </svg>\n  ';
			},
			track: function (e, t) {
				return '\n    <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="16px" viewBox="0 0 24 16" focusable="false">\n      <defs>\n        <rect id="'
					.concat(
						t,
						'-track" x="2" y="3.5" width="20" height="9" rx="4.5"></rect>\n        <filter x="-12.5%" y="-27.8%" width="125.0%" height="155.6%" filterUnits="objectBoundingBox" id="',
					)
					.concat(
						t,
						'-trackFilter">\n          <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>\n          <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>\n          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>\n          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>\n        </filter>\n      </defs>\n      <g class="thumb-off" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g>\n          <use class="track" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n          <use fill="black" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n          <use class="border" stroke-width="1" xlink:href="#')
					.concat(
						t,
						'-track"></use>\n          <circle class="thumb" stroke-width="0" cx="8" cy="8" r="6"></circle>\n        </g>\n      </g>\n      <g class="thumb-on" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g>\n          <use class="track" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n          <use fill="black" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n          <use class="border" stroke-width="1" xlink:href="#')
					.concat(t, '-track"></use>\n          <circle fill="')
					.concat(e, '" stroke-width="0" cx="16" cy="8" r="6"></circle>\n        </g>\n      </g>\n    </svg>\n  ');
			},
			downArrow: function (e, t) {
				return '\n    <div style="height: 100%; width: 100%; background-color: '
					.concat(e, '; border-right: 1px solid; border-bottom: 1px solid; border-color: ')
					.concat(t, '; border-bottom-right-radius: 3px; transform: rotate(45deg);" />\n    ');
			},
			checkmark: function () {
				return '<svg  class="cs-icon check-icon" focusable="false" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n          <polygon style="fill:currentColor !important" points="12.04 4 13.45 5.41 6.25 12.62 2 8.36 3.41 6.95 6.25 9.79"></polygon>\n      </g>\n    </svg>';
			},
			lock: function () {
				return '<svg width="16px" height="12px" viewBox="0 0 9 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="#FFFFFF" fill-rule="nonzero">\n            <path style="fill:currentColor !important" d="M7.875,4 L7.3125,4 L7.3125,2.85714286 C7.3125,1.28 6.0525,0 4.5,0 C2.9475,0 1.6875,1.28 1.6875,2.85714286 L1.6875,4 L1.125,4 C0.50625,4 0,4.51428571 0,5.14285714 L0,10.8571429 C0,11.4857143 0.50625,12 1.125,12 L7.875,12 C8.49375,12 9,11.4857143 9,10.8571429 L9,5.14285714 C9,4.51428571 8.49375,4 7.875,4 Z M6.24375,4 L2.75625,4 L2.75625,2.85714286 C2.75625,1.88 3.538125,1.08571429 4.5,1.08571429 C5.461875,1.08571429 6.24375,1.88 6.24375,2.85714286 L6.24375,4 Z"></path>\n        </g>\n    </g>\n</svg>';
			},
			lockedViewed: function () {
				return '<svg width="16px" height="12px" viewBox="0 0 9 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="#FFFFFF" fill-rule="nonzero">\n            <path style="fill:currentColor !important" d="M7.875,4 L7.3125,4 L7.3125,2.85714286 C7.3125,1.28 6.0525,0 4.5,0 C2.9475,0 1.6875,1.28 1.6875,2.85714286 L1.6875,4 L1.125,4 C0.50625,4 0,4.51428571 0,5.14285714 L0,10.8571429 C0,11.4857143 0.50625,12 1.125,12 L7.875,12 C8.49375,12 9,11.4857143 9,10.8571429 L9,5.14285714 C9,4.51428571 8.49375,4 7.875,4 Z M7.11248548,6.17405922 C7.38175483,6.47268397 7.38175483,6.92847965 7.0966461,7.21138731 L4.53066757,9.75755627 C4.38811321,9.8990101 4.19804072,9.96187847 4.02380761,9.96187847 C3.83373513,9.96187847 3.65950202,9.8990101 3.51694766,9.75755627 L2.34544071,8.45018243 C2.06033199,8.16727477 2.06033199,7.71147909 2.34544071,7.42857143 C2.63054944,7.14566377 3.08989127,7.14566377 3.375,7.42857143 L4.02380761,8.21728122 L6.08292619,6.17405922 C6.36803491,5.89115155 6.82737675,5.89115155 7.11248548,6.17405922 Z M4.5,1.08571429 C5.461875,1.08571429 6.24375,1.88 6.24375,2.85714286 L6.24375,4 L2.75625,4 L2.75625,2.85714286 C2.75625,1.88 3.538125,1.08571429 4.5,1.08571429 Z"></path>\n        </g>\n    </g>\n</svg>';
			},
			languagePicker: function () {
				return '\n<svg class="cs-icon" viewBox="0 0 48 48" width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n  <path d="M23.99 4c-11.05 0-19.99 8.95-19.99 20s8.94 20 19.99 20c11.05 0 20.01-8.95 20.01-20s-8.96-20-20.01-20zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zm-13.84-7.93c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zm-15.48 19.93c-.33-1.28-.52-2.62-.52-4s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4h-6.76zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zm7.95 23.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zm4.68-11.93h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zm3.53-11.12c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z"/>\n</svg>\n  ';
			},
		},
		qn = {
			play: function () {
				return '<svg id="icon-play" class="cs-icon play-icon" width="14" height="16" viewBox="0 0 14 16" focusable="false">\n    <path d="M1.4 15.4C0.8 15.8 0 15.3 0 14.5L0 1.4C0 0.6 0.8 0.1 1.4 0.5L12.9 7.1C13.5 7.5 13.5 8.4 12.9 8.8L8.0 11.6L1.4 15.4Z" stroke="none" />\n  </svg>';
			},
		},
		Yn = function (e) {
			return DS.detection.env.isPerpetual ? Zn[e] || Gn : qn[e] || Zn[e] || Gn;
		},
		Xn = function () {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
			return window.innerWidth - e < 900;
		};
	function $n(e) {
		return (
			($n =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			$n(e)
		);
	}
	function Jn(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== $n(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== $n(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === $n(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function er(e, t) {
		return (
			(er = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			er(e, t)
		);
	}
	function tr(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = rr(e);
			if (t) {
				var i = rr(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === $n(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return nr(e);
			})(this, n);
		};
	}
	function nr(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function rr(e) {
		return (
			(rr = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			rr(e)
		);
	}
	var ir = DS,
		or = ir.pubSub,
		ar = ir.events,
		lr = ir.constants,
		sr = ir.focusManager,
		cr = ir.globalEventHelper.addWindowListener,
		ur = ir.dom,
		fr = ur.addClass,
		dr = ur.removeClass,
		hr = !1,
		pr = !0,
		yr = 'floating-sidebar',
		br = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && er(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = tr(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					_.bindAll(nr(t), 'onToggle', 'onResize', 'onOver', 'onOut'),
					(t.nameSpace = G.getNamespace(t.view.nameSpace)),
					(t.sidebar = t.nameSpace.sidebar),
					(t.removeCollapseSidebarListener = null),
					(t.toggle = !1),
					t.onClick(t.onToggle),
					((G.model.sidebarOpts.closed && pr) || hr) && (fr(document.body, 'sidebar-closed'), (t.sidebar.collapsed = !0)),
					t.onClickEl(t.nameSpace.sidebarOverlay.el, t.onToggle),
					or.on(ar.sidebar.CLOSE, function () {
						t.sidebar.collapsed || t.onToggle();
					}),
					or.on(ar.sidebar.OPEN, function () {
						t.sidebar.collapsed && t.onToggle();
					}),
					or.on(ar.frame.RESIZE, t.onResize),
					cr('resize', t.onResize),
					t.onResize(null, !0),
					t.wrapperEl.addEventListener('mouseenter', t.onOver),
					t.wrapperEl.addEventListener('mouseleave', t.onOut),
					(pr = !1),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'keyUpCollapseSidebar',
						value: function (e) {
							e.keyCode !== lr.keys.ESCAPE || this.sidebar.collapsed || ('hamburger' === sr.lastFocusedElement().id ? this.onToggle() : this.onToggle(!1));
						},
					},
					{
						key: 'getViewBox',
						value: function () {
							var e = this.el.getBoundingClientRect();
							return { x: e.left + 10, y: e.top + 10, w: e.width - 5, h: e.height };
						},
					},
					{
						key: 'onOver',
						value: function (e) {
							fr(this.wrapperEl, 'menu-icon-wrapper-hover');
						},
					},
					{
						key: 'onOut',
						value: function (e) {
							dr(this.wrapperEl, 'menu-icon-wrapper-hover');
						},
					},
					{
						key: 'setExpandedAttr',
						value: function () {
							return this.el.setAttribute('aria-expanded', !this.sidebar.collapsed), this;
						},
					},
					{
						key: 'animateSidebar',
						value: function () {
							this.animate || ((this.sidebar.animate = !0), this.sidebar.update());
						},
					},
					{
						key: 'onResize',
						value: function (e, t) {
							var n = G.model.dockSettings,
								r = n.dockedState,
								i = n.width,
								o = r !== lr.docked.NONE ? i : 0;
							Xn(o) && this.sidebar.visible
								? (this.sidebar.startFloat(),
								  fr(document.body, yr),
								  null == this.removeCollapseSidebarListener && (this.removeCollapseSidebarListener = cr('keyup', this.keyUpCollapseSidebar.bind(this))))
								: (this.sidebar.endFloat(),
								  dr(document.body, yr),
								  null != this.removeCollapseSidebarListener && (this.removeCollapseSidebarListener(), (this.removeCollapseSidebarListener = null)));
							var a = window.innerWidth - o;
							!this.sidebar.collapsed && Xn(o) && (this.prevWidth > a || t)
								? ((this.sidebar.autoCollapsed = !0), (this.sidebar.collapsed = !0), this.setExpandedAttr().animateSidebar())
								: this.sidebar.autoCollapsed &&
								  !this.sidebar.floating &&
								  this.prevWidth < a &&
								  ((this.sidebar.collapsed = !1), (this.sidebar.autoCollapsed = !1), this.setExpandedAttr().animateSidebar()),
								(this.prevWidth = a);
						},
					},
					{
						key: 'onToggle',
						value: function () {
							var e = this,
								t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
							(this.sidebar.collapsed = !this.sidebar.collapsed),
								this.sidebar.collapsed || (this.sidebar.autoCollapsed = !1),
								t
									? (this.onBlur(),
									  this.setExpandedAttr().animateSidebar(),
									  setTimeout(function () {
											e.sidebar.collapsed ? e.onFocus() : e.sidebar.el.querySelector('[tabIndex="0"]').focus();
									  }, 250))
									: this.setExpandedAttr().animateSidebar(),
								or.trigger(ar.hamburger.TOGGLE, this.sidebar.collapsed);
						},
					},
					{
						key: 'teardown',
						value: function () {
							(hr = this.sidebar.collapsed), or.off(ar.sidebar.CLOSE), or.off(ar.sidebar.OPEN);
						},
					},
				]),
				n && Jn(t.prototype, n),
				r && Jn(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		vr = br,
		gr = 'hamburger';
	G.def(gr, vr, function (e) {
		var t = G.model,
			n = G.getNamespace(e).sidebar;
		return {
			tag: 'button',
			ariaStringId: 'sidebar_toggle',
			attrs: {
				id: gr,
				'aria-expanded': !t.sidebarOpts.closed,
				'aria-controls': 'sidebar',
				'aria-label': ''.concat(t.getString('sidebar_toggle')),
				tabIndex: 0,
			},
			x: function () {
				return 'left' === n.pos ? n.data.actualWidth() : -65;
			},
			w: 50,
			h: 65,
			outsideContent: !0,
			html: '\n      <div class="menu-icon-wrapper" data-ref="wrapper">\n        '.concat(Yn('hamburger')(), '\n      </div>\n    '),
		};
	});
	var mr = DS.detection.deviceView,
		wr = 'topBar';
	G.def(wr, function (e) {
		var t = G.getNamespace(e),
			n = (t.sidebar, t.title, t.frame),
			r = t.slide,
			i = G.model;
		return {
			tag: 'section',
			noTabIndex: !0,
			attrs: { id: wr, 'aria-label': 'top bar' },
			overflow: 'visible',
			x: function () {
				var e = i.dockSettings,
					t = e.dockedState,
					n = e.width,
					o = 'left' === t ? n : 0;
				return r.sidebarXOffset + o;
			},
			y: 0,
			w: function () {
				var e = i.dockSettings,
					t = e.dockedState,
					o = e.width,
					a = 'none' !== t ? o : 0;
				return n.w - (r.sidebarWidthOffset + a);
			},
			h: function () {
				return mr.isMobile || r.topBarExists() ? Pn : 0;
			},
		};
	});
	var Sr = 'title',
		kr = DS.detection;
	function Or(e) {
		return (
			(Or =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Or(e)
		);
	}
	function Er(e, t) {
		return (
			(function (e) {
				if (Array.isArray(e)) return e;
			})(e) ||
			(function (e, t) {
				var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
				if (null != n) {
					var r,
						i,
						o,
						a,
						l = [],
						s = !0,
						c = !1;
					try {
						if (((o = (n = n.call(e)).next), 0 === t)) {
							if (Object(n) !== n) return;
							s = !1;
						} else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
					} catch (e) {
						(c = !0), (i = e);
					} finally {
						try {
							if (!s && null != n.return && ((a = n.return()), Object(a) !== a)) return;
						} finally {
							if (c) throw i;
						}
					}
					return l;
				}
			})(e, t) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Cr(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Cr(e, t);
			})(e, t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Cr(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function xr(e, t, n) {
		return (t = Pr(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function Lr(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Pr(r.key), r);
		}
	}
	function Pr(e) {
		var t = (function (e, t) {
			if ('object' !== Or(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Or(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Or(t) ? t : String(t);
	}
	function Tr(e, t) {
		return (
			(Tr = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Tr(e, t)
		);
	}
	function _r(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Dr(e);
			if (t) {
				var i = Dr(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Or(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return jr(e);
			})(this, n);
		};
	}
	function jr(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Dr(e) {
		return (
			(Dr = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Dr(e)
		);
	}
	G.def(Sr, Dt, function (e) {
		var t,
			n = G.model,
			r = G.model.frame,
			i = G.getNamespace(e),
			o = i.hamburger,
			a = i.sidebar,
			l = 'right' === a.pos && !n.rtl,
			s = r.fontscale / 100;
		t = 1.23077 * s * 13 + xn;
		var c = !kr.deviceView.isPhone && n.sidebarOpts.titleEnabled;
		return {
			simpleView: !0,
			id: Sr,
			tag: 'h1',
			attrs: { class: 'presentation-title cs-title' },
			overflow: 'visible',
			x: function () {
				var e = a.visible ? o.w : 11,
					t = n.rtl ? this.parent.w - this.w - 11 - 11 : 11 + e;
				return 'right' === a.pos && o.visible && (t -= e), t;
			},
			y: 'vertical-center',
			calcTextSize: !0,
			w: 'fit-to-text-w',
			h: 22,
			html: function () {
				return '<div data-ref=\'label\' class="presentation-title-text">'
					.concat(c ? n.title.text : '', '</div> ')
					.concat(l ? '<div class="top-tabs-line" style="height:'.concat(t, 'px;"></div>') : '');
			},
			methods: {
				updateDomStrings: function () {
					c && (this.viewLogic.labelEl.textContent = n.title.text);
				},
			},
			visible: c,
		};
	});
	var Ar = DS,
		Ir = Ar.detection,
		Rr = Ar.events,
		Br = Ar.pubSub,
		Mr = Ar.svgUtils,
		Hr = Ar._.bindAll,
		Nr = {
			remaining: function (e, t) {
				return DS.utils.formatSecondsAsTime(t - e, !0);
			},
			totalelapsed: function (e, t) {
				return [e, t]
					.map(function (e) {
						return DS.utils.formatSecondsAsTime(e, !0);
					})
					.join(' / ');
			},
			elapsed: function (e) {
				return DS.utils.formatSecondsAsTime(e, !0);
			},
			none: function () {
				return '';
			},
		},
		Fr = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Tr(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = _r(o);
			function o(e) {
				var t, n;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(n = i.call(this, e)),
					Hr(jr(n), 'onShow', 'onHide', 'onTick'),
					Br.on((xr((t = {}), Rr.timer.SHOW, n.onShow), xr(t, Rr.timer.HIDE, n.onHide), t)),
					(n.timeFormat = n.getTimeFormat()),
					(n.isPieProgress = Ir.theme.isUnified),
					n
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'getTimeFormat',
						value: function () {
							if (!Ir.deviceView.isClassicMobile) {
								var e = G.model.sidebarOpts.timeFormat;
								if (e && null != Nr[e.toLowerCase()]) return e.toLowerCase();
								if (!G.model.sidebarOpts.timeEnabled) return 'none';
							}
							return 'remaining';
						},
					},
					{
						key: 'teardown',
						value: function () {
							var e;
							Br.off((xr((e = {}), Rr.timer.SHOW, this.onShow), xr(e, Rr.timer.HIDE, this.onHide), e));
						},
					},
					{
						key: 'onTick',
						value: function (e, t, n) {
							if (((this.view.children.timerText.el.innerHTML = Nr[this.timeFormat](t, n)), !Ir.deviceView.isClassicMobile)) {
								var r = Mr.wheelPath(9, 9, 9, 0, 360 * (1 - e), this.isPieProgress);
								this.view.children.timerPath.el.setAttributeNS(null, 'd', r);
							}
						},
					},
					{
						key: 'onShow',
						value: function (e) {
							null != this.currentTimer && this.onHide(),
								(this.currentTimer = e),
								this.currentTimer.on('tick', this.onTick),
								this.toggleVisibility(!0),
								window.requestAnimationFrame(DS.pubSub.trigger.bind(DS.pubSub, DS.events.timer.SHOWN));
						},
					},
					{
						key: 'onHide',
						value: function () {
							null != this.currentTimer &&
								(this.currentTimer.off('tick', this.onTick),
								(this.currentTimer = null),
								window.requestAnimationFrame(DS.pubSub.trigger.bind(DS.pubSub, DS.events.timer.HIDDEN))),
								this.toggleVisibility(!1);
						},
					},
					{
						key: 'toggleVisibility',
						value: function (e) {
							var t = Er(e ? ['add', 'remove'] : ['remove', 'add'], 2),
								n = t[0],
								r = t[1];
							document.body.classList[n]('timer-shown'),
								this.el.classList[r]('hidden'),
								this.el.classList[n]('shown'),
								this.view.setVisibility(e),
								this.view.parent.updateChildren(!0);
						},
					},
					{
						key: 'onFocus',
						value: function () {
							var e = this.view.children.timerText.el.getBoundingClientRect(),
								t = e.left,
								n = e.top,
								r = e.width,
								i = e.height;
							(t -= 8), (n -= 8), (r += 37), (i += 12), DS.focusManager.setFocusRectOn(this.el, { left: t, top: n, width: r, height: i });
						},
					},
				]) && Lr(t.prototype, n),
				r && Lr(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Wr = Fr,
		Vr = DS.detection,
		Ur = 'timer';
	G.def(Ur, Wr, function (e) {
		var t = G.getNamespace(e),
			n = t.topBar,
			r = t.title,
			i = t.sidebar,
			o = t.hamburger,
			a = t.topEllipsis;
		return {
			noTabIndex: !0,
			attrs: { id: Ur, 'aria-label': 'timer', class: 'timer cs-timer' },
			overflow: 'visible',
			visible: !1,
			methods: {
				hasUpperRightElement: function () {
					var e = 'right' === i.pos && o.visible,
						t = 'left' === i.pos && a.visible;
					return e || t;
				},
			},
			x: function () {
				var e = G.model.rtl ? n.w - 240 - (r.visible ? r.w : 0) : n.w - 230;
				return (
					'right' === i.pos && o.visible && (e -= o.w),
					Vr.deviceView.isPhone &&
						((e += 4), Vr.orientation.isLandscape ? (e = window.innerWidth - this.w - 5) : this.hasUpperRightElement() ? (e -= 58) : (e -= xn)),
					e
				);
			},
			y: function () {
				var e = Ln;
				return Vr.deviceView.isPhone && Vr.orientation.isLandscape && this.hasUpperRightElement() && (e += Ln), e;
			},
			w: 220,
			h: 22,
			html: function () {
				return '\n        <div class="timer-wheel cs-pie">\n          '.concat(
					'\n          <svg\n            style="width: 18px; height: 18px; overflow: visible;"\n            width="18"\n            height="18"\n            xmlns:xlink="http://www.w3.org/1999/xlink"\n            focusable="false"\n            >\n\n            <circle class="circle-progress-pie"\n              cx="9" cy="9" r="'
						.concat(8, '"\n              stroke-width="')
						.concat(
							2,
							'"\n              fill="transparent" />\n\n            <path data-ref="timerPath"\n              d=""\n              class="cs-brandhighlight-fill"\n              transform="rotate(-90 9 9)"\n              stroke="none" />\n\n          </svg>\n          ',
						),
					"\n        </div>\n        <div class=\"timer-text\" data-ref='timerText' tabindex='0' data-tabindex='0'></div>\n        ",
				);
			},
		};
	});
	var Kr = function (e, t) {
		return '\n    <div class="panel-arrow" data-ref="arrow" style="height: 17px; width: 17px; position: absolute;">\n      <div class="panel-arrow-path"\n        style="\n          height: 100%;\n          width: 100%;\n          background-color: '
			.concat(e, ';\n          border-left: 1px solid;\n          border-top: 1px solid;\n          border-color: ')
			.concat(t, ';\n          border-top-left-radius: 3px;\n          transform: rotate(45deg);\n          "\n        />\n    </div>');
	};
	function zr(e) {
		return (
			(zr =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			zr(e)
		);
	}
	function Qr(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, $r(r.key), r);
		}
	}
	function Gr(e, t) {
		return (
			(Gr = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Gr(e, t)
		);
	}
	function Zr(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Yr(e);
			if (t) {
				var i = Yr(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === zr(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return qr(e);
			})(this, n);
		};
	}
	function qr(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Yr(e) {
		return (
			(Yr = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Yr(e)
		);
	}
	function Xr(e, t, n) {
		return (t = $r(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function $r(e) {
		var t = (function (e, t) {
			if ('object' !== zr(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== zr(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === zr(t) ? t : String(t);
	}
	var Jr = DS,
		ei = (Jr.detection, Jr.events),
		ti = Jr.pubSub,
		ni = Jr.utils.pxify,
		ri = Object.freeze({ unknown: 0, tabLinkPanel: 1, topEllipsesPanel: 2 }),
		ii = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Gr(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Zr(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					Xr(qr((t = i.call(this, e))), 'onTabLinkPanelShown', function (e) {
						var n = e.view.panel.children.arrow;
						t.showArrowShadow(n), (t.lastWidget = ri.tabLinkPanel);
					}),
					Xr(qr(t), 'onTabLinkHidePanel', function () {
						t.lastWidget === ri.tabLinkPanel && t.hideArrowShadow();
					}),
					Xr(qr(t), 'onTopEllipsesPanelShown', function (e) {
						e.view.children.topEllipsisPanel;
						var n = e.view.children.arrow;
						t.showArrowShadow(n), (t.lastWidget = ri.topEllipsesPanel);
					}),
					Xr(qr(t), 'onTopEllipsesHidePanel', function () {
						t.lastWidget === ri.topEllipsesPanel && t.hideArrowShadow();
					}),
					Xr(qr(t), 'showArrowShadow', function (e) {
						var n = e.el;
						if (t.isVisible(n)) {
							var r = DS.views.getTopNameSpace().sidebar.el.getBoundingClientRect(),
								i = n.getBoundingClientRect(),
								o = r.x >= 0,
								a = r.x < i.x && o ? r.width : 0,
								l = i.x - a,
								s = i.y + t.view.h / 2 + 1;
							(t.el.style.transform = 'translate('.concat(ni(l), ', ').concat(ni(s), ')')),
								(t.el.style.display = 'block'),
								t.el.getBoundingClientRect().x !== i.x && (t.el.style.display = 'none');
						}
					}),
					Xr(qr(t), 'hideArrowShadow', function () {
						t.el.style.display = 'none';
					}),
					Xr(qr(t), 'isVisible', function (e) {
						return 'block' === window.getComputedStyle(e).display;
					}),
					Xr(qr(t), 'applyPanelShadowForIE11', function (e) {
						e.el.style.boxShadow = '0 0 40px rgba(0, 0, 0, 0.20)';
					}),
					(t.lastWidget = ri.unknown),
					ti.on(ei.tabLink.PANEL_SHOWN, t.onTabLinkPanelShown),
					ti.on(ei.tabLink.HIDE_PANEL, t.onTabLinkHidePanel),
					ti.on(ei.topEllipsesPanel.PANEL_SHOWN, t.onTopEllipsesPanelShown),
					ti.on(ei.topEllipsesPanel.HIDE_PANEL, t.onTopEllipsesHidePanel),
					t
				);
			}
			return (t = o), n && Qr(t.prototype, n), r && Qr(t, r), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
		})(Dt),
		oi = ii,
		ai = 'arrowShadow';
	function li(e) {
		return (
			(li =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			li(e)
		);
	}
	function si(e, t) {
		return (
			(function (e) {
				if (Array.isArray(e)) return e;
			})(e) ||
			(function (e, t) {
				var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
				if (null != n) {
					var r,
						i,
						o,
						a,
						l = [],
						s = !0,
						c = !1;
					try {
						if (((o = (n = n.call(e)).next), 0 === t)) {
							if (Object(n) !== n) return;
							s = !1;
						} else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
					} catch (e) {
						(c = !0), (i = e);
					} finally {
						try {
							if (!s && null != n.return && ((a = n.return()), Object(a) !== a)) return;
						} finally {
							if (c) throw i;
						}
					}
					return l;
				}
			})(e, t) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return ci(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ci(e, t);
			})(e, t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function ci(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function ui(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== li(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== li(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === li(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function fi() {
		return (
			(fi =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = yi(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			fi.apply(this, arguments)
		);
	}
	function di(e, t) {
		return (
			(di = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			di(e, t)
		);
	}
	function hi(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = yi(e);
			if (t) {
				var i = yi(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === li(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return pi(e);
			})(this, n);
		};
	}
	function pi(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function yi(e) {
		return (
			(yi = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			yi(e)
		);
	}
	G.def(ai, oi, function (e) {
		var t = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'background-color');
		return { attrs: { id: ai }, w: 17, overflow: 'visible', h: 17, html: Kr(t, t), style: { display: 'none' } };
	});
	var bi = DS,
		vi = bi._,
		gi = bi.keyManager,
		mi = bi.focusManager,
		wi = bi.windowManager,
		Si = bi.pubSub,
		ki = bi.events,
		Oi = bi.detection,
		Ei = bi.globalEventHelper,
		Ci = Ei.addBodyListener,
		xi = Ei.removeBodyListener,
		Li = Ei.addWindowListener,
		Pi = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && di(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = hi(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					vi.bindAll(pi(t), 'onKeydown', 'onResizeRefresh'),
					(t.active = []),
					Si.on(ki.sidebar.ACTIVE_TAB_SET, t.onActiveTabSet.bind(pi(t))),
					DS.flagManager.aiCourseTranslation && Si.on(ki.frame.SHOW_TAB_ITEM, t.onShowTabItem.bind(pi(t))),
					Oi.theme.isUnified && (t.removeResize = Li('resize', t.onResizeRefresh)),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onResizeRefresh',
						value: function () {
							var e = this;
							clearTimeout(this.forceRefresh),
								(this.forceRefresh = setTimeout(function () {
									e.view.update();
								}, 200));
						},
					},
					{
						key: 'onShowTabItem',
						value: function (e, t) {
							var n = this.view.children.find(function (t) {
								return t.nameKey.includes(e);
							});
							null != n
								? (n.viewLogic.showPanel(), Si.trigger(ki.sidebar.OPEN))
								: document.body.classList.contains('floating-sidebar') && Si.trigger(ki.sidebar.CLOSE);
						},
					},
					{
						key: 'onActiveTabSet',
						value: function (e) {
							var t = this.view.children.find(function (t) {
								return t.nameKey.includes(e);
							});
							null != t && t.viewLogic.showPanel();
						},
					},
					{
						key: 'onLayoutChange',
						value: function (e) {
							var t = this;
							if (null != G.model && 0 !== this.view.children.length) {
								var n = (G.model.sidebarTabs || []).reduce(function (n, r) {
									var i = r.name,
										o = e[i],
										a = ''.concat(i, 'Tab');
									return (vi.isObject(o) ? !0 === o.enabled : !0 === o) && null != t.view.children[a] && n.push(t.view.children[a]), n;
								}, []);
								if (
									(this.view.children.forEach(function (e) {
										e.el.setAttribute('aria-selected', !1), (e.el.tabIndex = -1);
									}),
									(0 === this.active.length && n.length > 0) || !n.includes(this.currentTab))
								) {
									var r = si(n, 1)[0];
									this.currentTab = r;
								}
								if (null != this.currentTab) {
									this.currentTab.el.setAttribute('aria-selected', !0);
									var i = wi.getCurrentWindow();
									(null != i && null != i.getId && '_frame' !== i.getId()) || (this.currentTab.el.tabIndex = 0);
								}
								this.active = n;
							}
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							this.isFocused || ((this.isFocused = !0), this.getInitialActive().setCurrent(), Ci('keydown', this.onKeydown));
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							this.el.contains(e.relatedTarget) || ((this.isFocused = !1), fi(yi(o.prototype), 'onBlur', this).call(this), xi('keydown', this.onKeydown));
						},
					},
					{
						key: 'onKeydown',
						value: function (e) {
							var t = this.currentTab;
							gi.isActionKey(e.which)
								? ((this.activeTab = this.currentTab), this.activateTab())
								: gi.isRightKey(e.which)
								? (this.currentTab = this.getNextTab(this.currentTab.model.idx))
								: gi.isLeftKey(e.which)
								? (this.currentTab = this.getPrevTab(this.currentTab.model.idx))
								: gi.isHomeKey(e.which)
								? (this.currentTab = this.getFirstTab())
								: gi.isEndKey(e.which) && (this.currentTab = this.getLastTab()),
								t !== this.currentTab && (null != t && (t.el.tabIndex = -1), this.setCurrent());
						},
					},
					{
						key: 'activateTab',
						value: function () {
							null != this.activeTab &&
								(vi.forEach(this.view.children, function (e) {
									return e.el.setAttribute('aria-selected', !1);
								}),
								this.activeTab.el.setAttribute('aria-selected', !0),
								this.activeTab.viewLogic.showPanel());
						},
					},
					{
						key: 'setAsActive',
						value: function (e) {
							this.activeTab = this.currentTab = e;
						},
					},
					{
						key: 'tabDidChangeVisibility',
						value: function () {
							this.view.visible &&
								((null != this.activeTab && this.activeTab.visible) || (this.currentTab = this.activeTab = vi.first(this.getLiveChildren())),
								this.activateTab());
						},
					},
					{
						key: 'setCurrent',
						value: function () {
							var e = this.currentTab;
							if (null != e) {
								(e.el.tabIndex = 0), e.el.focus();
								var t = e.getBox(),
									n = t.x,
									r = t.y,
									i = t.w,
									o = t.h;
								mi.setFocusRectOn(e.el, { left: n, top: r, width: i, height: o });
							}
						},
					},
					{
						key: 'getInitialActive',
						value: function () {
							return (
								(this.currentTab = this.activeTab =
									this.getLiveChildren().find(function (e) {
										return e.el === document.activeElement;
									})),
								this
							);
						},
					},
					{
						key: 'getNextTab',
						value: function (e) {
							var t = this.getLiveChildren(),
								n =
									t.findIndex(function (t) {
										return t.model.idx === e;
									}) + 1;
							return n === t.length && (n = 0), t[n];
						},
					},
					{
						key: 'getPrevTab',
						value: function (e) {
							var t = this.getLiveChildren(),
								n =
									t.findIndex(function (t) {
										return t.model.idx === e;
									}) - 1;
							return -1 === n && (n = t.length - 1), t[n];
						},
					},
					{
						key: 'getFirstTab',
						value: function () {
							return this.view.children.find(function (e) {
								return e.viewLogic.isLive();
							});
						},
					},
					{
						key: 'getLastTab',
						value: function () {
							return this.view.children
								.slice()
								.reverse()
								.find(function (e) {
									return e.viewLogic.isLive();
								});
						},
					},
					{
						key: 'getLiveChildren',
						value: function () {
							return this.view.children.filter(function (e) {
								return e.viewLogic.isLive();
							});
						},
					},
					{
						key: 'getSelectedTab',
						value: function () {
							return this.view.children.find(function (e) {
								return !0 === e.viewLogic.isActive;
							});
						},
					},
					{
						key: 'teardown',
						value: function () {
							Si.off(ki.sidebar.ACTIVE_TAB_SET), (o.lastSelectedTab = this.getSelectedTab()), null != this.removeResize && this.removeResize();
						},
					},
				]) && ui(t.prototype, n),
				r && ui(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt);
	function Ti(e) {
		return (
			(Ti =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ti(e)
		);
	}
	function _i(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Ti(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Ti(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Ti(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function ji(e, t) {
		return (
			(ji = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ji(e, t)
		);
	}
	function Di(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Ai(e);
			if (t) {
				var i = Ai(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Ti(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function Ai(e) {
		return (
			(Ai = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Ai(e)
		);
	}
	var Ii = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && ji(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Di(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					((t = i.call(this, e)).searchEnabled = G.model.frame.controlOptions.controls.search),
					t.onClick(t.showPanel),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'didChangeVisibility',
						value: function (e) {
							this.view.parent.viewLogic.tabDidChangeVisibility();
						},
					},
					{
						key: 'showPanel',
						value: function (e) {
							if (!this.isActive) {
								var t = this.view.parent,
									n = t.children;
								for (var r in n) n[r].viewLogic.hidePanel();
								this.el.classList.add('cs-selected'),
									this.el.setAttribute('aria-selected', 'true'),
									(this.isActive = !0),
									t.viewLogic.setAsActive(this.view),
									DS.pubSub.trigger(DS.events.tab.SHOW, this.model.name);
							}
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							this.el.classList.remove('cs-selected'), this.el.setAttribute('aria-selected', 'false'), (this.isActive = !1);
						},
					},
					{
						key: 'isLive',
						value: function () {
							var e = G.model.currControlLayout[this.model.name];
							return _.isObject(e) ? e.enabled : e;
						},
					},
				]) && _i(t.prototype, n),
				r && _i(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Ri = Ii;
	function Bi(e) {
		return (
			(Bi =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Bi(e)
		);
	}
	function Mi(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Ui(r.key), r);
		}
	}
	function Hi() {
		return (
			(Hi =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Vi(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			Hi.apply(this, arguments)
		);
	}
	function Ni(e, t) {
		return (
			(Ni = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Ni(e, t)
		);
	}
	function Fi(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Vi(e);
			if (t) {
				var i = Vi(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Bi(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Wi(e);
			})(this, n);
		};
	}
	function Wi(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Vi(e) {
		return (
			(Vi = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Vi(e)
		);
	}
	function Ui(e) {
		var t = (function (e, t) {
			if ('object' !== Bi(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Bi(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Bi(t) ? t : String(t);
	}
	var Ki = DS,
		zi = Ki.TweenLite,
		Qi = Ki.dom,
		Gi = Ki._,
		Zi = Ki.events,
		qi = Ki.pubSub,
		Yi = Ki.utils.pxify,
		Xi = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Ni(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Fi(o);
			function o(e) {
				var t, n, r, a;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o),
					(t = i.call(this, e)),
					(n = Wi(t)),
					(a = 'search_toggle'),
					(r = Ui((r = 'tooltipKey'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
					Gi.bindAll(Wi(t), 'onToggleSearchInput', 'hideSlider'),
					(t.nameSpace = G.getCurrentNameSpace());
				var l = t.nameSpace.sidebar.children;
				return (t.tabSelectedSlider = l.tabSelectedSlider.el), (t.sliderMask = l.sliderMask.el), t.updateSliderLayout(), t;
			}
			return (
				(t = o),
				(n = [
					{
						key: 'hasTooltip',
						get: function () {
							return 'searchTab' === this.view.nameKey;
						},
					},
					{
						key: 'updateSliderLayout',
						value: function () {
							var e = this;
							if (Qi.hasClass(this.el, 'cs-selected')) {
								var t = this.nameSpace.tabs,
									n = Math.floor(t.y + t.h);
								(this.sliderMask.style.height = Yi(n)),
									window.requestAnimationFrame(function () {
										zi.set(e.tabSelectedSlider, { x: e.view.x, y: n - 1, width: e.view.w || 0 }), e.hideSlider();
									});
							}
						},
					},
					{
						key: 'onToggleSearchInput',
						value: function (e) {
							o.showingSearch || (qi.trigger(Zi.sidebar.SHOW_SEARCH), this.view.parent.children.outlineTab.viewLogic.showPanel()),
								this.view.el.setAttribute('aria-expanded', !o.showingSearch);
						},
					},
					{
						key: 'didChangeVisibility',
						value: function (e) {
							Hi(Vi(o.prototype), 'didChangeVisibility', this).call(this, e), (this.tabSelectedSlider.style.opacity = 0);
						},
					},
					{
						key: 'hideSlider',
						value: function () {
							(this.tabSelectedSlider.style.display = 'none'), Qi.addClass(this.el, 'selected-animation-done'), (this.tabSelectedSlider.style.opacity = 1);
						},
					},
					{
						key: 'showSlider',
						value: function () {
							var e = document.querySelector('.selected-animation-done');
							null != e && Qi.removeClass(e, 'selected-animation-done'),
								Qi.removeClass(this.el, 'selected-animation-done'),
								(this.tabSelectedSlider.style.display = 'block');
						},
					},
					{
						key: 'animateSlider',
						value: function () {
							this.showSlider(), zi.to(this.tabSelectedSlider, 0.25, { x: this.view.x, width: this.view.w || 0, onComplete: this.hideSlider });
						},
					},
					{
						key: 'showPanel',
						value: function (e) {
							'searchTab' !== this.view.nameKey
								? (Hi(Vi(o.prototype), 'showPanel', this).call(this, e), this.animateSlider(), (o.showingSearch = !1))
								: (this.onToggleSearchInput(), (o.showingSearch = !0));
						},
					},
					{
						key: 'isLive',
						value: function () {
							return Hi(Vi(o.prototype), 'isLive', this).call(this) || 'searchTab' === this.view.nameKey;
						},
					},
					{
						key: 'getViewBox',
						value: function () {
							var e = this.view.getBox();
							return (e.h -= 20), e;
						},
					},
				]),
				n && Mi(t.prototype, n),
				r && Mi(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Ri),
		$i = Xi,
		Ji = DS,
		eo = Ji._,
		to = Ji.scaler,
		no = Ji.utils.getPath,
		ro = Ji.dom,
		io = Ji.constants.refs.FRAME,
		oo = 'tabs',
		ao =
			(G.def(oo, Pi, function (e) {
				var t = G.model,
					n = G.model.rtl,
					r = G.getNamespace(e),
					i = r.sidebar,
					o = r.logo,
					a = t.frame.controlOptions.controls.search && t.outlineInSidebar;
				return {
					ariaStringId: 'sidebar-tabs',
					attrs: { id: oo, role: 'tablist', tabindex: -1, 'aria-label': 'sidebar-tabs', class: 'tabs' },
					overflow: 'visible',
					x: 0,
					y: function () {
						return o ? o.bottom() : 0;
					},
					w: function () {
						return i.data.actualWidth();
					},
					h: 65,
					updateHook: function () {
						var e = this.w - 13,
							t = this.children.length,
							r = e / t,
							i = { startPos: 13, pad: 7 };
						n && ((i.toLeft = !0), (i.startPos = e)), this.flowChildren(i);
						for (var o = 0, l = 0; l < t; l++) o += this.children[l].lastWidthByText;
						a ? n || (o += 33) : (e -= 50);
						var s,
							c = o > e;
						c ? ro.addClass(this.el, 'overflow-tabs') : ro.removeClass(this.el, 'overflow-tabs');
						for (var u = 0; u < t; u++)
							(s = this.children[u]),
								a && u === t - 1
									? ((s.x = n ? xn : e - s.lastWidthByText), s.update())
									: (s.width = c ? Math.min(s.lastWidthByText, r - 3) : s.lastWidthByText);
					},
					childDef: function () {
						ao(G.model, a);
					},
					methods: {
						updateDomStrings: function () {
							var e = this;
							requestAnimationFrame(function () {
								e.updateHook();
							});
						},
					},
				};
			}),
			function (e, t) {
				var n = !1,
					r = no(e, 'sidebarTabs', []);
				e.outlineInSidebar &&
					t &&
					!r.some(function (e) {
						return 'search' === e.name;
					}) &&
					r.push({ name: 'search', idx: r.length - 1, isIcon: !0, properties: {} }),
					r.forEach(function (t, r) {
						var i = (function (e, t, n, r) {
							var i = t.name,
								o = e.getString('search' === i ? 'search_toggle' : i),
								a = e.currControlLayout[i],
								l = !r && (eo.isObject(a) ? a.enabled : a),
								s = i + 'Tab',
								c = null != Pi.lastSelectedTab ? Pi.lastSelectedTab.nameKey === s : l,
								u = G.def(s, $i, {
									model: Object.assign(t, { idx: n }),
									tag: 'button',
									attrs: {
										id: s,
										class: 'tab cs-tabs '.concat(c ? 'cs-selected' : ''),
										role: 'tab',
										'aria-selected': c ? 'true' : 'false',
										'aria-label': o,
										'aria-controls': ''.concat(i, '-panel'),
										tabindex: 0 === n ? 0 : -1,
										'aria-expanded': 'search' !== i && null,
									},
									calcTextSize: !0,
									w: function () {
										return this.width || this.lastWidthByText;
									},
									noUpdate: !0,
									h: 65,
									html: function () {
										return t.isIcon ? Yn(i)() : o;
									},
									updateHook: function () {
										u.viewLogic.updateSliderLayout(), this.lastWidthByText <= 10 && this.doTextCalcs();
									},
									methods: {
										doTextCalcs: function () {
											var e = 1 / to.getScale(),
												t = this.content.style.width;
											(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation) && (this.content.style.width = 'fit-content');
											var n = this.content.scrollWidth * e,
												r = this.content.clientHeight * e;
											(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation) && (this.content.style.width = t),
												(this.lastWidthByText = n + 4 + this.padLeft + this.padRight),
												(this.lastHeightByText = r + 4);
										},
										updateStrings: function () {
											var n = t.name,
												r = 'search' === n ? 'search_toggle' : n;
											this.el.setAttribute('aria-label', e.getString(r)), t.isIcon || (this.content.textContent = e.getString(r)), this.doTextCalcs();
										},
									},
								});
							return u.init(), G.getNamespace(io).tabs.append(u), c;
						})(e, t, r, n);
						n = i || n;
					});
			});
	function lo(e) {
		return (
			(lo =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			lo(e)
		);
	}
	function so(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== lo(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== lo(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === lo(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function co() {
		return (
			(co =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = po(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			co.apply(this, arguments)
		);
	}
	function uo(e, t) {
		return (
			(uo = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			uo(e, t)
		);
	}
	function fo(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = po(e);
			if (t) {
				var i = po(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === lo(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return ho(e);
			})(this, n);
		};
	}
	function ho(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function po(e) {
		return (
			(po = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			po(e)
		);
	}
	var yo = DS,
		bo = yo._,
		vo = yo.pubSub,
		go = yo.detection,
		mo = yo.globalEventHelper,
		wo = (mo.addDocumentListener, mo.removeDocumentListener, yo.keyManager.isTabKey, yo.playerGlobals),
		So = yo.utils,
		ko = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && uo(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = fo(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					bo.bindAll(ho(t), 'onShow'),
					vo.on(DS.events.tab.SHOW, t.onShow),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'getFirstChild',
						value: function () {
							return bo.first(this.view.children);
						},
					},
					{
						key: 'focusChild',
						value: function () {
							this.getFirstChild().viewLogic.focusSelf();
						},
					},
					{ key: 'onFocus', value: function () {} },
					{
						key: 'onBlur',
						value: function (e) {
							if (!wo.presentation.isPreview() || window.globals.HAS_SLIDE)
								if (DS.flagManager.aiCourseTranslation) {
									var t = So.getPath(this, this.view.lnk);
									go.deviceView.isDesktop &&
										null != t &&
										!t.translationShown &&
										this.isTargetOutsidePanel(e.relatedTarget) &&
										(co(po(o.prototype), 'onBlur', this).call(this, e), t.viewLogic.hidePanel());
								} else
									go.deviceView.isDesktop &&
										null != this.view.lnk &&
										this.isTargetOutsidePanel(e.relatedTarget) &&
										(co(po(o.prototype), 'onBlur', this).call(this, e), this.view.lnk.viewLogic.hidePanel());
						},
					},
					{
						key: 'isTargetOutsidePanel',
						value: function (e) {
							return (
								null == e ||
								(!this.el.contains(e) && bo.camelCase(e.id) !== this.view.lnk.nameKey && bo.camelCase(e.parentElement.id) !== this.view.lnk.nameKey)
							);
						},
					},
					{
						key: 'onShow',
						value: function (e) {
							var t = ''.concat(e, 'Panel');
							if (this.view.nameKey === t) {
								var n = this.view.parent.children,
									r = this.getFirstChild();
								for (var i in n) i.indexOf('Panel') > -1 && n[i].viewLogic.onHide();
								(this.el.style.display = 'block'), null != r.onPanelVisible && r.onPanelVisible();
							}
						},
					},
					{
						key: 'onHide',
						value: function () {
							this.el.style.display = 'none';
						},
					},
					{
						key: 'isTopLink',
						value: function () {
							return null != this.view.tabsId;
						},
					},
					{
						key: 'getTopTabsView',
						value: function () {
							return this.view.lnk.parent.parent;
						},
					},
					{
						key: 'teardown',
						value: function () {
							vo.off(DS.events.tab.SHOW, this.onShow);
						},
					},
				]) && so(t.prototype, n),
				r && so(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Oo = ko;
	function Eo(e) {
		return (
			(Eo =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Eo(e)
		);
	}
	function Co(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Eo(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Eo(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Eo(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function xo(e, t) {
		return (
			(xo = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			xo(e, t)
		);
	}
	function Lo(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Po(e);
			if (t) {
				var i = Po(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Eo(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function Po(e) {
		return (
			(Po = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Po(e)
		);
	}
	var To = DS.detection,
		_o = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && xo(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Lo(o);
			function o() {
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					i.apply(this, arguments)
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'focusSelf',
						value: function () {
							var e = this.view.children,
								t = e.search,
								n = e.outline;
							if (null != t) {
								var r = t.viewLogic.searchInputEl;
								To.deviceView.isUnifiedMobile
									? ((r.style.pointerEvents = 'none'),
									  setTimeout(function () {
											r.style.pointerEvents = 'all';
									  }, 100))
									: r.focus();
							} else n.viewLogic.focusSelf();
						},
					},
					{ key: 'onFocus', value: function () {} },
				]),
				n && Co(t.prototype, n),
				r && Co(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		jo = _o;
	function Do(e) {
		return (
			(Do =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Do(e)
		);
	}
	function Ao(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Do(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Do(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Do(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Io(e, t) {
		return (
			(Io = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Io(e, t)
		);
	}
	function Ro(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Mo(e);
			if (t) {
				var i = Mo(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Do(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Bo(e);
			})(this, n);
		};
	}
	function Bo(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Mo(e) {
		return (
			(Mo = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Mo(e)
		);
	}
	var Ho = DS,
		No = Ho.pubSub,
		Fo = Ho.events,
		Wo = Ho.TweenLite,
		Vo = Ho.focusManager,
		Uo = Ho._.bindAll,
		Ko = Ho.dom.addClass,
		zo = Ho.detection,
		Qo = !1,
		Go = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Io(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Ro(o);
			function o(e) {
				var t;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o);
				var n = (t = i.call(this, e)).view.children.searchForm.el,
					r = t.view.children.searchInput.el;
				return (
					n.addEventListener('submit', t.onSearch.bind(Bo(t))),
					zo.deviceView.isMobile &&
						(Uo(Bo(t), 'onMobileOutlineShown'), r.addEventListener('input', t.onSearch.bind(Bo(t))), No.on(Fo.mobile.OUTLINE_SHOWN, t.onMobileOutlineShown)),
					t.ensureEventSubscriptions(),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'teardown',
						value: function () {
							No.off(Fo.mobile.OUTLINE_SHOWN, this.onMobileOutlineShown), No.off(Fo.controlOptions.RESET, this.onControlOptionsReset, this), (Qo = !1);
						},
					},
					{
						key: 'ensureEventSubscriptions',
						value: function () {
							Qo || (No.on(Fo.controlOptions.RESET, this.onControlOptionsReset, this), (Qo = !0));
						},
					},
					{
						key: 'onControlOptionsReset',
						value: function () {
							this.view.updateHtml(), this.view.update();
						},
					},
					{
						key: 'onMobileOutlineShown',
						value: function () {
							document.getElementById('outline-panel').appendChild(this.el), Ko(document.body, 'tab-shown');
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							Vo.setFocusRectOn(this.view.el);
						},
					},
					{
						key: 'onSearch',
						value: function (e) {
							e.preventDefault();
							var t = this.view.parent.children.searchResults,
								n = this.view.children.bottomDiv,
								r = document.querySelector('#outline-content ul');
							Wo.to(r, 0.2, {
								alpha: 0,
								onComplete: function () {
									(t.el.style.opacity = 0),
										Wo.to(t.el, 0.2, {
											alpha: 1,
											onComplete: function () {
												return t.viewLogic.onAfterVisible();
											},
										}),
										(n.el.style.opacity = 0),
										t.setVisibility(!0);
								},
							}),
								t.viewLogic.performSearch(this.searchInputEl.value),
								Ko(document.body, 'search-results-active');
						},
					},
					{
						key: 'updateVisibility',
						value: function (e) {
							var t = this.view,
								n = t.searchResults,
								r = t.searchResults.visible,
								i = t.visible;
							this.view.setVisibility(e), n.setVisibility(e && this.searchResultsOpen), i && (this.searchResultsOpen = r);
						},
					},
				]),
				n && Ao(t.prototype, n),
				r && Ao(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Zo = Go;
	function qo(e) {
		return (
			(qo =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			qo(e)
		);
	}
	function Yo(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== qo(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== qo(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === qo(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Xo() {
		return (
			(Xo =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ta(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			Xo.apply(this, arguments)
		);
	}
	function $o(e, t) {
		return (
			($o = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			$o(e, t)
		);
	}
	function Jo(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = ta(e);
			if (t) {
				var i = ta(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === qo(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return ea(e);
			})(this, n);
		};
	}
	function ea(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function ta(e) {
		return (
			(ta = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			ta(e)
		);
	}
	var na = DS,
		ra = na.pubSub,
		ia = na.events,
		oa = na.TweenLite,
		aa = na._.bindAll,
		la = na.dom,
		sa = la.addClass,
		ca = la.removeClass,
		ua = na.focusManager,
		fa = na.detection,
		da = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && $o(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Jo(o);
			function o(e) {
				var t;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o),
					(t = i.call(this, e)),
					aa(ea(t), 'onShowSearch', 'onHideSearch', 'onFocus'),
					(t.nameSpace = G.getCurrentNameSpace()),
					(t.toggle = !1),
					ra.on(ia.sidebar.SHOW_SEARCH, t.onShowSearch),
					ra.on(ia.sidebar.HIDE_SEARCH, t.onHideSearch),
					(t.searchInput = t.view.children.searchForm.el),
					(t.searchInput.style.display = 'none'),
					(t.searchInput.style.opacity = 0),
					G.model.outlineInSidebar || ((t.toggle = !0), (t.searchInput.style.opacity = 1), (t.searchInput.style.display = 'block'));
				return (
					(t.searchInputField = t.view.children.searchInput.el),
					t.searchInputField.addEventListener('input', t.onSearchTermChanged.bind(ea(t))),
					fa.browser.isWebKit ||
						t.searchInputField.addEventListener('keydown', function (e) {
							27 === e.keyCode && t.clearSearch();
						}),
					t.onClickEl(t.clearEl, function (e) {
						t.onFocus(e), t.clearSearch(), t.searchInputField.focus();
					}),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onShowSearch',
						value: function (e) {
							var t = this;
							this.toggle ||
								((this.toggle = !0),
								this.view.update(),
								this.view.parent.children.outline.update(),
								(this.searchInput.style.display = 'block'),
								oa.to(this.searchInput, 0.2, {
									opacity: 1,
									delay: 0.2,
									onComplete: function () {
										t.searchInputField.focus();
									},
								}),
								sa(document.body, 'search-input-shown'));
						},
					},
					{
						key: 'onHideSearch',
						value: function (e) {
							var t = this;
							(this.toggle = !1),
								this.view.update(),
								oa.to(this.searchInput, 0.2, {
									opacity: 0,
									delay: 0,
									onComplete: function () {
										t.view.parent.children.outline.update(), ($i.showingSearch = !1), (t.searchInput.style.display = 'none');
									},
								}),
								ca(document.body, 'search-input-shown');
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							ua.setFocusRectOn(e.target);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							var t = this.view.parent.children.searchResults;
							G.model.outlineInSidebar && !t.visible && this.onHideSearch();
						},
					},
					{
						key: 'onSearch',
						value: function (e) {
							this.isSearchFieldEmtpy()
								? e.preventDefault()
								: (Xo(ta(o.prototype), 'onSearch', this).call(this, e), ca(this.clearEl, 'hidden'), ra.trigger(ia.search.UPDATE_PANEL));
						},
					},
					{
						key: 'onSearchTermChanged',
						value: function () {
							this.isSearchFieldEmtpy() && this.clearSearch();
						},
					},
					{
						key: 'clearSearch',
						value: function () {
							sa(this.clearEl, 'hidden'), ra.trigger(ia.search.CLEAR);
						},
					},
					{
						key: 'isSearchFieldEmtpy',
						value: function () {
							var e = this.searchInputEl.value;
							return null == e || '' === e;
						},
					},
				]),
				n && Yo(t.prototype, n),
				r && Yo(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Zo),
		ha = da,
		pa = 'search',
		ya = G.def(pa, ha, function () {
			var e = G.model;
			return {
				ariaStringId: 'acc_search_input',
				attrs: { class: pa, 'aria-label': e.getString('acc_search_input'), role: 'search', tabIndex: -1 },
				z: 3,
				x: 0,
				y: 0,
				w: '100%',
				h: function () {
					return this.viewLogic.toggle ? 60 : 0;
				},
				html: function () {
					return '\n      <div class="search-ui">\n        <div data-ref="bottomDiv">\n        </div>\n        <form id="outline-search" data-ref="searchForm" class="search-input cs-outlinesearch cs-searchinput">\n          <input tabindex="0" class="cs-input " data-ref="searchInput" type="search" placeholder="'
						.concat(
							e.getString('search'),
							'">\n        </form>\n        <div data-ref="clear" class="search-clear hidden">\n          <button class="btn cs-button">\n            <span data-ref="searchClearLabel" class="search-clear-close" aria-label="',
						)
						.concat(e.getString('close'), '">')
						.concat(Yn('searchClear')(), '</span>\n          </button>\n        </div>\n      </div>');
				},
				methods: {
					updateDomStrings: function () {
						this.viewLogic.searchInputEl.setAttribute('placeholder', e.getString('search')),
							this.viewLogic.searchClearLabelEl.setAttribute('aria-label', e.getString('close'));
					},
				},
				updateHook: function () {
					this.viewLogic.ensureEventSubscriptions();
				},
			};
		});
	function ba(e) {
		return (
			(ba =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			ba(e)
		);
	}
	function va(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== ba(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== ba(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === ba(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function ga() {
		return (
			(ga =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ka(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			ga.apply(this, arguments)
		);
	}
	function ma(e, t) {
		return (
			(ma = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ma(e, t)
		);
	}
	function wa(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = ka(e);
			if (t) {
				var i = ka(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === ba(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Sa(e);
			})(this, n);
		};
	}
	function Sa(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function ka(e) {
		return (
			(ka = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			ka(e)
		);
	}
	var Oa = DS,
		Ea = Oa.focusManager,
		Ca = Oa.keyManager,
		xa = Oa.detection,
		La = Oa.globalEventHelper,
		Pa = La.addDocumentListener,
		Ta = La.removeDocumentListener,
		_a = (Oa.utils.getPath, Oa.dom),
		ja = _a.parentNodesOf,
		Da = _a.addClass,
		Aa = _a.removeClass,
		Ia = Oa._,
		Ra = Ia.first,
		Ba = Ia.last,
		Ma = Ia.bindAll,
		Ha = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && ma(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = wa(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					Ma(Sa(t), 'onKeydown', 'addEvents', 'onClickItem'),
					t.addEvents(),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'focusSelf',
						value: function () {
							this.hasListItems() &&
								this.getItems()
									.find(function (e) {
										return 0 === e.tabIndex;
									})
									.focus();
						},
					},
					{
						key: 'addEvents',
						value: function () {
							var e = this;
							xa.device.isMobile
								? (this.el.addEventListener('touchmove', function (t) {
										e.moved = !0;
								  }),
								  this.onClick(function (t) {
										e.moved || e.onClickItem(t), (e.moved = !1);
								  }))
								: this.onClick(this.onClickItem);
						},
					},
					{ key: 'onClickItem', value: function () {} },
					{
						key: 'onFocus',
						value: function () {
							!this.isFocused &&
								this.hasListItems() &&
								((this.isFocused = !0),
								(this.currentItem = this.currentItem || Ra(this.getItems())),
								Da(this.currentItem, 'hover'),
								Ca.isShowFocus && this.centerOnFocused(),
								Ea.setFocusRectOn(this.getFocusRectTarget()),
								Pa('keydown', this.onKeydown));
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							this.el.contains(e.relatedTarget) ||
								(ga(ka(o.prototype), 'onBlur', this).call(this, e),
								null != this.currentItem && (Aa(this.currentItem, 'hover'), (this.currentItem.style.backgroundColor = '')),
								Ta('keydown', this.onKeydown),
								(this.isFocused = !1));
						},
					},
					{
						key: 'onKeydown',
						value: function (e) {
							var t = this.currentItem;
							Ca.isActionKey(e.which)
								? (this.activateItem(e), Ca.isSpaceKey(e.which) && e.preventDefault())
								: Ca.isDownishKey(e.which)
								? (this.currentItem = this.getNextItem(this.getItemContent()))
								: Ca.isUpishKey(e.which)
								? (this.currentItem = this.getPrevItem(this.getItemContent()))
								: Ca.isHomeKey(e.which)
								? (this.currentItem = this.getFirstItem())
								: Ca.isEndKey(e.which) && (this.currentItem = this.getLastItem()),
								t !== this.currentItem && (e.preventDefault(), (t.tabIndex = -1), Aa(t, 'hover'), this.focusOnCurrent());
						},
					},
					{
						key: 'hasListItems',
						value: function () {
							return !1;
						},
					},
					{
						key: 'getFocusRectTarget',
						value: function () {
							return this.currentItem;
						},
					},
					{
						key: 'focusOnCurrent',
						value: function () {
							this.centerOnFocused(),
								document.activeElement !== this.currentItem && ((this.currentItem.tabIndex = 0), Da(this.currentItem, 'hover'), this.currentItem.focus()),
								Ea.setFocusRectOn(this.getFocusRectTarget());
						},
					},
					{
						key: 'activateItem',
						value: function () {
							this.onClickItem({ target: this.currentItem.firstElementChild });
						},
					},
					{
						key: 'getNextItem',
						value: function (e) {
							var t = this,
								n =
									this.getItems().findIndex(function (n) {
										return t.findIndexCb(n, e);
									}) + 1;
							return n === this.getItems().length && (n = 0), this.getItems()[n];
						},
					},
					{
						key: 'getPrevItem',
						value: function (e) {
							var t = this,
								n =
									this.getItems().findIndex(function (n) {
										return t.findIndexCb(n, e);
									}) - 1;
							return -1 === n && (n = this.getItems().length - 1), this.getItems()[n];
						},
					},
					{
						key: 'getLastItem',
						value: function () {
							return Ba(this.getItems());
						},
					},
					{
						key: 'getFirstItem',
						value: function () {
							return Ra(this.getItems());
						},
					},
					{
						key: 'getItemContent',
						value: function () {
							return this.currentItem.textContent.trim();
						},
					},
					{
						key: 'findIndexCb',
						value: function (e, t) {
							return e.textContent.trim() === t;
						},
					},
					{
						key: 'getItems',
						value: function () {
							return [];
						},
					},
					{
						key: 'getScrollEl',
						value: function () {
							return this.el;
						},
					},
					{
						key: 'getOffsetEl',
						value: function () {
							return this.el;
						},
					},
					{
						key: 'getOffsetTop',
						value: function (e) {
							return (function (e) {
								return ja(e, function (e) {
									return 'li' === e.nodeName.toLowerCase();
								}).reduce(function (e, t) {
									return e + t.offsetTop;
								}, 0);
							})(e);
						},
					},
					{
						key: 'getOffsetHeight',
						value: function (e) {
							return e.offsetHeight;
						},
					},
					{
						key: 'centerOnFocused',
						value: function () {
							if (null != this.currentItem) {
								var e = this.getOffsetEl(),
									t = this.getOffsetHeight(e),
									n = this.getScrollEl().scrollTop,
									r = this.getOffsetTop(this.currentItem),
									i = r + this.getOffsetHeight(this.currentItem);
								i - n > t ? (e.scrollTop = i - t + 10) : r < n + 10 && (e.scrollTop = r - 10);
							}
						},
					},
				]) && va(t.prototype, n),
				r && va(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Na = Ha;
	function Fa(e) {
		return (
			(Fa =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Fa(e)
		);
	}
	function Wa(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Ka(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			Ua(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Va(e, t) {
		return (
			(function (e) {
				if (Array.isArray(e)) return e;
			})(e) ||
			(function (e, t) {
				var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
				if (null != n) {
					var r,
						i,
						o,
						a,
						l = [],
						s = !0,
						c = !1;
					try {
						if (((o = (n = n.call(e)).next), 0 === t)) {
							if (Object(n) !== n) return;
							s = !1;
						} else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
					} catch (e) {
						(c = !0), (i = e);
					} finally {
						try {
							if (!s && null != n.return && ((a = n.return()), Object(a) !== a)) return;
						} finally {
							if (c) throw i;
						}
					}
					return l;
				}
			})(e, t) ||
			Ua(e, t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Ua(e, t) {
		if (e) {
			if ('string' == typeof e) return Ka(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			return (
				'Object' === n && e.constructor && (n = e.constructor.name),
				'Map' === n || 'Set' === n ? Array.from(e) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ka(e, t) : void 0
			);
		}
	}
	function Ka(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function za(e, t) {
		return (
			(za = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			za(e, t)
		);
	}
	function Qa(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Za(e);
			if (t) {
				var i = Za(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Fa(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Ga(e);
			})(this, n);
		};
	}
	function Ga(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Za(e) {
		return (
			(Za = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Za(e)
		);
	}
	function qa(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Fa(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Fa(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Fa(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Ya(e, t, n) {
		return t && qa(e.prototype, t), n && qa(e, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
	}
	function Xa(e, t) {
		if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
	}
	var $a = function (e) {
			return it(e.slideid);
		},
		Ja = DS,
		el = Ja.windowManager,
		tl = Ja.focusManager,
		nl = Ja.TweenLite,
		rl = Ja.events,
		il = Ja.pubSub,
		ol = Ja.keyManager,
		al = Ja.resolver,
		ll = Ja.dom,
		sl = (ll.hasClass, ll.removeClass),
		cl = ll.addClass,
		ul = ll.getParentWithClass,
		fl = Ja._,
		dl = fl.bindAll,
		hl = (fl.first, Ja.utils),
		pl = hl.stripTags,
		yl = (hl.stripPlayer, hl.prefixWithPlayer),
		bl = Ja.globalEventHelper,
		vl = bl.addDocumentListener,
		gl = (bl.removeDocumentListener, Ja.detection),
		ml = gl.theme,
		wl = gl.os,
		Sl = Ya(function e(t, n, r) {
			Xa(this, e), (this.slideId = t), (this.title = n), (this.text = r);
		}),
		kl = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && za(e, t);
			})(n, e);
			var t = Qa(n);
			function n(e) {
				var r;
				Xa(this, n),
					(r = t.call(this, e)),
					dl(Ga(r), 'traverseLinks', 'performSearch', 'onSlideChanged', 'onClear', 'onReset', 'loadSlideBankSearchData'),
					(r.animationDuration = 0.2);
				var i = G.model.frame.notesData || [];
				return (
					(r.notesBySlideId = i.map(function (e) {
						return new Sl(yl(e.slideId), DS.utils.getPath(al.resolvePath(e.slideId, DS.presentation), 'title'), pl(e.content).trim());
					})),
					(r.slideTextData = G.model.frame.navData.search || []),
					(r.slideTextBySlideId = r.slideTextData
						.filter(function (e) {
							return !e.slidebank;
						})
						.map(function (e) {
							return new Sl(yl(e.slideid), DS.utils.getPath(al.resolvePath(e.slideid, DS.presentation), 'title'), pl(e.Text).trim());
						})),
					(r.menuOptions = G.model.frame.controlOptions.menuOptions),
					(r.wrapListItems = r.menuOptions.wrapListItems),
					(r.links = G.model.frame.navData.outline.links),
					(r.hasSlideBankSlides = r.slideTextData.some(function (e) {
						return e.slidebank;
					})),
					r.hasSlideBankSlides && il.on(rl.player.RESET, r.onReset),
					null != r.clearEl && r.onClickEl(r.clearEl, r.onClear),
					il.on(rl.search.CLEAR, r.onClear),
					r.onClickEl(r.searchFilterEl, r.onToggleSearchOptions),
					r.onClick(r.onClickLink),
					il.on(rl.window.MAIN_CHANGED, r.onSlideChanged),
					r
				);
			}
			return (
				Ya(n, [
					{
						key: 'loadSlideBankSearchData',
						value: function () {
							this.slideBankTextBySlideId = this.slideTextData
								.filter(function (e) {
									return e.slidebank;
								})
								.reduce(function (e, t) {
									var n = al.getSlideBankSlideInstance(t.slideid);
									return null !== n && e.push(new Sl(n.absoluteId, n.title(), pl(t.Text))), e;
								}, []);
						},
					},
					{
						key: 'teardown',
						value: function () {
							il.off(rl.window.MAIN_CHANGED, this.onSlideChanged), window.globals.HAS_SLIDE && il.off(rl.search.CLEAR, this.onClear);
						},
					},
					{
						key: 'onSlideChanged',
						value: function (e) {
							var t = this.resultsEl.querySelector('.cs-selected'),
								n = this.resultsEl.querySelector('[data-slide-id="'.concat(e.absoluteId, '"]'));
							null != t && sl(t, 'cs-selected'), null != n && (cl(n, 'cs-selected'), cl(n, 'cs-viewed'), this.updateAriaLabel(n));
						},
					},
					{
						key: 'onReset',
						value: function () {
							this.onClear(), this.loadSlideBankSearchData();
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							e.relatedTarget;
							var t = e.target;
							if (this.el.contains(t)) {
								if (t === this.searchFilterEl || t === this.clearEl) return tl.setFocusRectOn(t), (this.isFocused = !1), !1;
								if (t === this.notesCheckEl || t === this.slideCheckEl) return tl.setFocusRectOn(t.parentElement), (this.isFocused = !1), !1;
								if (!this.isFocused && (!ml.isUnified || ol.isShowFocus)) {
									var n = Va(this.getItems(), 1)[0];
									(this.isFocused = !0),
										null != n && ((this.currentItem = n), this.lastSelected !== this.currentItem && this.focusOnCurrent(), vl('keydown', this.onKeydown));
								}
							}
							return !1;
						},
					},
					{
						key: 'getIsSearchVisible',
						value: function () {
							return this.searchOptionsEl.classList.contains('visible');
						},
					},
					{
						key: 'setCheckboxesVisible',
						value: function (e) {
							(this.notesCheckEl.hidden = e), (this.slideCheckEl.hidden = e);
						},
					},
					{
						key: 'onToggleSearchOptions',
						value: function (e) {
							var t = this,
								n = this.getIsSearchVisible(),
								r = n ? 'remove' : 'add';
							this.searchOptionsEl.classList[r]('visible'),
								n
									? (clearTimeout(this.checkBoxTimeout),
									  (this.checkBoxTimeout = setTimeout(function () {
											t.setCheckboxesVisible(n);
									  }, 200)))
									: this.setCheckboxesVisible(n);
						},
					},
					{
						key: 'onClickLink',
						value: function (e) {
							if ('locked' !== this.menuOptions.flow) {
								var t = ul(e.target, 'listitem'),
									n = t.dataset.slideId;
								null == n ||
									('restricted' === this.menuOptions.flow && !e.target.classList.contains('cs-viewed')) ||
									(cl(t, 'cs-viewed'), this.updateAriaLabel(t), il.trigger(rl.request.NEXT_SLIDE, n));
							}
						},
					},
					{
						key: 'updateAriaLabel',
						value: function (e) {
							ml.isUnified &&
								Wa(e.querySelector('.outline-states').children).forEach(function (t) {
									if ('none' === window.getComputedStyle(t).display);
									else {
										var n = t.getAttribute('aria-label'),
											r = e.getAttribute('data-slide-title');
										e.children[0].textContent = r + ' ' + n;
									}
								});
						},
					},
					{
						key: 'traverseLinks',
						value: function (e) {
							for (var t = 0; t < e.length; t++) {
								var n = e[t];
								$a(n) ||
									this.searchResults.has(n.slideid) ||
									((this.noSearchTerm || n.displaytext.toLowerCase().indexOf(this.term) >= 0) && this.searchResults.set(n.slideid, n.displaytext)),
									null != n.links && this.traverseLinks(n.links);
							}
						},
					},
					{
						key: 'getDefaultSate',
						value: function (e) {
							var t = el.getCurrentWindow().getCurrentSlide().absoluteId === e || al.resolvePath(e).viewed,
								n = this.menuOptions.flow;
							if (t)
								switch (n) {
									case 'free':
									case 'restricted':
										return G.model.getString('acc_visited');
									case 'locked':
										return ''.concat(G.model.getString('acc_visited'), ', ').concat(G.model.getString('acc_locked'));
								}
							else
								switch (n) {
									case 'free':
										return '';
									case 'restricted':
									case 'locked':
										return G.model.getString('acc_locked');
								}
						},
					},
					{
						key: 'performSearch',
						value: function () {
							var e = this,
								t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
							if (window.globals.HAS_SLIDE) {
								(this.term = t.toLowerCase()),
									(this.items = null),
									(this.noSearchTerm = '' === t),
									(this.searchResults = new Map()),
									(this.resultsEl.innerHTML = ''),
									(this.slideTextEnabled = this.slideCheckEl.checked),
									(this.notesEnabled = this.notesCheckEl.checked);
								var n = G.model.frame.navData.links;
								null != n && this.traverseLinks(n), this.hasSlideBankSlides && void 0 === this.slideBankTextBySlideId && this.loadSlideBankSearchData();
								var r = function (t) {
										t.forEach(function (t) {
											(t.text.toLowerCase().indexOf(e.term) >= 0 || t.title.toLowerCase().indexOf(e.term) >= 0) && e.searchResults.set(t.slideId, t.title);
										});
									},
									i = !this.noSearchTerm;
								this.slideTextEnabled && i && r(this.slideTextBySlideId),
									this.hasSlideBankSlides && i && r(this.slideBankTextBySlideId),
									this.notesEnabled && i && r(this.notesBySlideId);
								wl.isIOS;
								var o = this.wrapListItems ? '' : 'no-wrap',
									a = el.getCurrentWindow().getCurrentSlide().absoluteId,
									l = 0;
								this.searchResults.forEach(function (t, n) {
									0;
									var r = a === n ? 'cs-selected' : '',
										i = document.createElement('li'),
										s = al.resolvePath(n).viewed ? 'cs-viewed' : '',
										c = e.menuOptions.flow,
										u = e.getDefaultSate(n),
										f = '\n      <div role="menuitem" class="cs-listitem listitem '
											.concat(r, ' ')
											.concat(o, ' ')
											.concat(s, ' ')
											.concat('free' !== c && 'cs-' + c, '"\n           data-slide-id="')
											.concat(n, '"\n           data-slide-title="')
											.concat(t, '"\n           tabindex="')
											.concat(l, '"\n           role = "treeitem">\n          <span style="position: absolute; opacity: 0;">')
											.concat(t, ' ')
											.concat(u, '</span>');
									ml.isUnified
										? (f += '\n           <span class="linkText" aria-hidden="true">\n             '
												.concat(
													t,
													'\n           </span>\n           <span class="outline-states" aria-hidden="true">\n             <span class="visitedIcon" aria-label="',
												)
												.concat(G.model.getString('acc_visited'), '">\n               ')
												.concat(Yn('checkmark')(), '\n             </span>\n             <span class="lockedIcon" aria-label="')
												.concat(G.model.getString('acc_locked'), '">\n               ')
												.concat(Yn('lock')(), '\n             </span>\n             <span class="lockedViewedIcon" aria-label="')
												.concat(G.model.getString('acc_visited'), ', ')
												.concat(G.model.getString('acc_locked'), '">\n               ')
												.concat(Yn('lockedViewed')(), '\n             </span>\n           </span>\n        </div>\n      '))
										: (f += '\n             '.concat(t, '\n        </div>')),
										(i.innerHTML = f),
										e.resultsEl.appendChild(i),
										(l = -1);
								});
							}
						},
					},
					{
						key: 'onClear',
						value: function () {
							var e = this,
								t = this.view.parent.children,
								n = t.outline,
								r = t.search;
							(this.outlineUl = this.outlineUl || document.querySelector('#outline-content ul')),
								n.setVisibility(!0),
								nl.to(this.el, this.animationDuration, {
									alpha: 0,
									onComplete: function () {
										nl.to(e.outlineUl, e.animationDuration, { alpha: 1 }),
											e.view.setVisibility(!1),
											(r.children.bottomDiv.el.style.opacity = 1),
											ol.isShowFocus && e.el.contains(document.activeElement) && n.el.focus();
									},
								}),
								(this.term = ''),
								(r.children.searchInput.el.value = ''),
								sl(document.body, 'search-results-active'),
								il.trigger(rl.search.UPDATE_PANEL);
						},
					},
					{
						key: 'hasListItems',
						value: function () {
							return !_.isEmpty(this.getItems());
						},
					},
					{
						key: 'getItems',
						value: function () {
							return (this.items = this.items || Wa(this.el.querySelectorAll('.cs-listitem'))), this.items;
						},
					},
					{
						key: 'activateItem',
						value: function () {
							this['locked' !== this.menuOptions.flow ? 'onClickLink' : 'onCarrotClick']({ target: this.currentItem });
						},
					},
					{
						key: 'findIndexCb',
						value: function (e, t) {
							return e === t;
						},
					},
					{
						key: 'getItemContent',
						value: function () {
							return this.currentItem;
						},
					},
					{
						key: 'onAfterVisible',
						value: function () {
							this.view.parent.children.outline.setVisibility(!1);
						},
					},
				]),
				n
			);
		})(Na),
		Ol = kl,
		El = 'searchResults',
		Cl = G.def(El, Ol, function (e) {
			var t = G.model,
				n = t.rtl ? 'rtl' : '';
			return {
				attrs: { id: El + '-content', class: 'cs-menu cs-panel panel '.concat(n), tabindex: -1 },
				z: 2,
				x: 0,
				y: 68,
				w: '100%',
				overflow: 'scroll',
				h: function () {
					return this.parent.h - 58 - 2 - xn;
				},
				visible: !1,
				html: '\n      <span class="cs-outline search-content">\n        <div style="display:none">\n          <span class="flex-static-auto">\n            <h4 data-ref="title" class=\'cs-heading search-heading panel-section-heading\'>\n              '
					.concat(
						t.getString('search_results'),
						'\n            </h4>\n            <button class="btn-unstyled search-filter cs-search-filter" tabindex="0" data-ref="searchFilter">\n              <span data-ref="searchFilterLabel">',
					)
					.concat(t.getString('filter'), '</span>\n              ')
					.concat(
						Yn('filter')(),
						'\n            </button>\n          </span>\n\n          <div class="search-options flex-static-auto" data-ref="searchOptions">\n            <p data-ref="searchOptionsLabel">',
					)
					.concat(
						t.getString('search_in'),
						'</p>\n            <label>\n              <input data-ref="notesCheck" type="checkbox" checked>\n              <span data-ref="notesCheckLabel">',
					)
					.concat(
						t.getString('transcript_chk'),
						'</span>\n            </label>\n            <label>\n              <input data-ref="slideCheck" type="checkbox" checked>\n              <span data-ref="slideCheckLabel">',
					)
					.concat(
						t.getString('slide_text_chk'),
						'</span>\n            </label>\n          </div>\n        </div>\n        <div class="search-results is-scrollable" tabindex="-1" data-ref="searchResults">\n          <ul data-ref="results"></ul>\n        </div>\n      </span>\n    ',
					),
				methods: {
					updateDomStrings: function () {
						(this.viewLogic.titleEl.textContent = t.getString('search_results')),
							(this.viewLogic.searchFilterLabelEl.textContent = t.getString('filter')),
							(this.viewLogic.searchOptionsLabelEl.textContent = t.getString('search_in')),
							(this.viewLogic.notesCheckLabelEl.textContent = t.getString('transcript_chk')),
							(this.viewLogic.slideCheckLabelEl.textContent = t.getString('slide_text_chk'));
					},
				},
			};
		});
	function xl(e) {
		return (
			(xl =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			xl(e)
		);
	}
	function Ll(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Pl(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Pl(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Pl(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Pl(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function Tl(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== xl(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== xl(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === xl(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function _l() {
		return (
			(_l =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Il(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			_l.apply(this, arguments)
		);
	}
	function jl(e, t) {
		return (
			(jl = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			jl(e, t)
		);
	}
	function Dl(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Il(e);
			if (t) {
				var i = Il(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === xl(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Al(e);
			})(this, n);
		};
	}
	function Al(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Il(e) {
		return (
			(Il = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Il(e)
		);
	}
	var Rl,
		Bl,
		Ml,
		Hl = DS,
		Nl = Hl.detection,
		Fl = Hl.pubSub,
		Wl = Hl._,
		Vl = Hl.events,
		Ul = Hl.keyManager,
		Kl = Hl.resolver,
		zl = Hl.windowManager,
		Ql = Hl.utils.prefixWithPlayer,
		Gl = Hl.focusManager.setFocusRectOn,
		Zl = Hl.globalEventHelper.addDocumentListener,
		ql = Hl.dom,
		Yl = ql.parentNodesOf,
		Xl = ql.getParentWithClass,
		$l = ql.hasClass,
		Jl = ql.addClass,
		es = ql.removeClass,
		ts = function (e) {
			return Yl(e, function (e) {
				return 'li' === e.nodeName.toLowerCase();
			});
		},
		ns = function (e) {
			return ts(e)
				.slice(1)
				.some(function (e) {
					return $l(e, 'item-collapsed');
				});
		},
		rs = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && jl(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Dl(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					Wl.bindAll(
						Al(t),
						'updateVisitedSlides',
						'onSlideChanged',
						'onSelectFirstSlideLink',
						'addSlideToVisited',
						'visuallyUpdateLinks',
						'collapseLastItem',
						'onClickLink',
						'onCarrotClick',
						'onClickItem',
						'centerOnFocused',
						'setDrawSlides',
						'mouseDown',
						'mouseUp',
					),
					(t.visitedSlides = new Set()),
					(t.menuOptions = G.model.frame.controlOptions.menuOptions),
					Fl.once(Vl.resume.SET_DATA, t.updateVisitedSlides),
					Fl.on(Vl.window.MAIN_CHANGED, t.onSlideChanged),
					Fl.on(Vl.mobile.OUTLINE_SHOWN, t.centerOnFocused),
					Fl.on(Vl.navData.SELECT_FIRST_SLIDE_LINK, t.onSelectFirstSlideLink),
					(t.removeDocListeners = Wl.flow(Zl('mousedown', t.mouseDown), Zl('mouseup', t.mouseUp))),
					null != DS.presentation.getDrawPromise && DS.presentation.getDrawPromise().then(t.setDrawSlides),
					(t.isTopTabChild = G.model.topTabs.some(function (e) {
						return 'outline' === e.name;
					})),
					DS.flagManager.aiCourseTranslation && Fl.on(Vl.frame.SHOW_TAB_ITEM, t.onShowTabItem.bind(Al(t))),
					Fl.on(Vl.navData.REFRESH_VIEW, function () {
						if (DS.flagManager.multiLangSupport) {
							var e = DS.utils.getPath(t.el.querySelector('.cs-selected'), 'dataset.ref');
							t.view.updateHtml(), t.view.update(), t.view.initChildRefs(), t.visuallyUpdateLinks();
							var n = DS.utils.getPath(t.view, ['children', e, 'el']);
							null != n && Jl(n, 'cs-selected');
						} else t.view.updateHtml(), t.view.update();
					}),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'teardown',
						value: function () {
							Fl.off(Vl.window.MAIN_CHANGED, this.onSlideChanged), Fl.off(Vl.mobile.OUTLINE_SHOWN, this.centerOnFocused), this.removeDocListeners();
						},
					},
					{
						key: 'focusSelf',
						value: function () {
							this.getItems()
								.find(function (e) {
									return 0 === e.parentNode.tabIndex;
								})
								.parentNode.focus();
						},
					},
					{
						key: 'onFocus',
						value: function () {
							var e = this;
							this.isMouseDown ||
								(null != this.view.parent.children.search && Nl.theme.isUnified
									? setTimeout(function () {
											e.el.contains(document.activeElement) && _l(Il(o.prototype), 'onFocus', e).call(e);
									  }, 500)
									: _l(Il(o.prototype), 'onFocus', this).call(this));
						},
					},
					{
						key: 'mouseDown',
						value: function () {
							this.isMouseDown = !0;
						},
					},
					{
						key: 'mouseUp',
						value: function () {
							this.isMouseDown = !1;
						},
					},
					{
						key: 'onClickItem',
						value: function (e) {
							var t = this;
							if (Nl.theme.isUnified) {
								var n = Xl(e.target, 'listitem');
								($l(e.target, 'carrot') && (t.onCarrotClick(n), 1)) ||
									(n && $l(n.parentNode, 'item-collapsible') && (t.onCarrotClick(n), !$l(n, 'is-promoted-slide'))) ||
									('locked' !== t.menuOptions.flow && t.onClickLink(n));
							} else ('locked' !== this.menuOptions.flow ? this.onClickLink : this.onCarrotClick)(e.target);
						},
					},
					{
						key: 'visuallyUpdateLinks',
						value: function () {
							var e = this;
							this.visitedSlides.forEach(function (t) {
								var n = e.view.children[t];
								null != n && (Nl.theme.isUnified ? e.updateViewedState(n.el) : Jl(n.el, 'cs-viewed'));
							}),
								Nl.theme.isUnified && (this.setComplete('div.is-promoted-slide'), this.setComplete('div.is-scene', 1));
						},
					},
					{
						key: 'setComplete',
						value: function (e) {
							var t = this,
								n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
								r = this.el.querySelectorAll(e);
							Array.from(r).forEach(function (e) {
								Array.from(e.parentNode.querySelectorAll('div'))
									.slice(n)
									.every(function (e) {
										return $l(e, 'cs-viewed');
									}) && (Jl(e, 'cs-complete'), t.updateAriaLabel(e));
							});
						},
					},
					{
						key: 'updateVisitedSlides',
						value: function (e, t) {
							null != e && (e.forEach(this.addSlideToVisited), this.visuallyUpdateLinks());
						},
					},
					{
						key: 'getNextItem',
						value: function (e) {
							var t,
								n = this,
								r = this.getItems(),
								i = r.findIndex(function (t) {
									return n.findIndexCb(t, e);
								});
							do {
								(i += 1) === r.length && (i = 0), (t = r[i]);
							} while (ns(t));
							return t;
						},
					},
					{
						key: 'getPrevItem',
						value: function (e) {
							var t,
								n = this,
								r = this.getItems(),
								i = r.findIndex(function (t) {
									return n.findIndexCb(t, e);
								});
							do {
								-1 == (i -= 1) && (i = r.length - 1), (t = r[i]);
							} while (ns(t));
							return t;
						},
					},
					{
						key: 'addSlideToVisited',
						value: function (e) {
							var t = e.absoluteId,
								n = e.getScene().absoluteId;
							this.visitedSlides.add(n).add(t);
						},
					},
					{
						key: 'isCurrentLinkParent',
						value: function (e, t) {
							return e.el === this.view.children[t].el && e.el.getAttribute('data-has-links') && !e.el.getAttribute('data-is-scene');
						},
					},
					{
						key: 'onSelectFirstSlideLink',
						value: function () {
							var e = this.view.el.querySelector('ul > li > div:not(.is-scene)');
							if (null != e) {
								var t = e.getAttribute('data-ref');
								this.selectLink(e, t);
							}
						},
					},
					{
						key: 'onSlideChanged',
						value: function (e) {
							if ((this.addSlideToVisited(e), !this.currentItem || Xl(this.currentItem, 'listitem').getAttribute('data-ref') != e.absoluteId)) {
								var t = e.absoluteId,
									n = this.view.children[t];
								if (null == n) {
									var r = e.getSlideDraw();
									null != r && ((t = r.absoluteId), (n = this.view.children[t]));
								}
								null != n && this.selectLink(n.el, t);
							}
						},
					},
					{
						key: 'selectLink',
						value: function (e, t) {
							var n = this;
							this.onClickLink(e, !0),
								Yl(
									e,
									function (r) {
										r.classList.contains('item-collapsed') && (n.isCurrentLinkParent(e, t) || (es(r, 'item-collapsed'), r.setAttribute('aria-expanded', !0)));
									},
									function (e) {
										return n.el === e;
									},
								);
						},
					},
					{
						key: 'collapsibleParents',
						value: function (e) {
							var t = this;
							return Yl(
								e,
								function (e) {
									return e.classList.contains('item-collapsible');
								},
								function (e) {
									return t.el === e;
								},
							);
						},
					},
					{
						key: 'collapseLastItem',
						value: function (e) {
							var t = this;
							null != this.lastExpandedEls &&
								this.menuOptions.autocollapse &&
								this.lastExpandedEls.forEach(function (n) {
									n.contains(e) || $l(n, 'item-collapsed') || t.toggleScene(n);
								});
						},
					},
					{
						key: 'toggleScene',
						value: function (e) {
							var t,
								n = $l(e, 'item-collapsed');
							if (((t = n ? 'remove' : 'add'), e.classList[t]('item-collapsed'), e.setAttribute('aria-expanded', n), Nl.theme.isUnified)) {
								var r = Array.from(e.querySelectorAll('div.listitem')),
									i = r[0];
								!(function (e, t) {
									if (!n) {
										var r = e.slice(1).filter(function (e) {
											return !$l(e, 'is-promoted-slide') && !$l(e, 'is-scene');
										});
										r.some(function (e) {
											return $l(e, 'cs-viewed');
										}) && es(t, 'cs-unvisited'),
											r.every(function (e) {
												return $l(e, 'cs-viewed');
											}) && Jl(t, 'cs-complete');
									}
								})(r, i),
									this.updateAriaLabel(i);
							}
							Fl.trigger(Vl.menuLinksListItem.TOGGLE);
						},
					},
					{
						key: 'updateAriaLabel',
						value: function (e) {
							var t = [].slice.call(e.querySelector('.outline-states').children),
								n = e.getAttribute('data-slide-title'),
								r = e.children[0];
							t.some(function (e) {
								if ('none' !== window.getComputedStyle(e).display) {
									var t = e.getAttribute('aria-label');
									return (r.textContent = n + ' ' + t), !0;
								}
							}) || (r.textContent = n);
						},
					},
					{
						key: 'onCarrotClick',
						value: function (e) {
							if (null !== e) {
								var t = Xl(e, 'item-collapsible');
								this.toggleScene(t);
							}
						},
					},
					{
						key: 'onClickLink',
						value: function (e, t) {
							var n = this;
							if (e)
								if (Nl.theme.isUnified) {
									var r = e.getAttribute('data-ref'),
										i = null != r;
									if ('restricted' !== this.menuOptions.flow || t || this.visitedSlides.has(r)) {
										if (
											(null != this.currentItem && e !== this.currentItem && ((this.currentItem.tabIndex = -1), es(this.currentItem, 'hover')),
											(this.currentItem = e),
											null != r &&
												(this.collapseLastItem(e),
												(this.lastExpandedEls = this.collapsibleParents(e)),
												this.lastExpandedEls.forEach(function (e) {
													var t = e.firstElementChild;
													r.includes(t.getAttribute('data-ref')) && (Jl(t, 'cs-viewed'), n.updateAriaLabel(t));
												})),
											$l(e, 'listitem'))
										) {
											this.updateViewedState(e);
											var o = this.el.querySelector('.cs-selected');
											$l(e, 'is-scene') ||
												(null != o && (es(o, 'cs-selected'), this.updateAriaLabel(o)),
												Jl(e, 'cs-selected'),
												window.requestAnimationFrame(function () {
													return n.updateAriaLabel(e);
												}));
										} else this.onCarrotClick(e);
										if (i && !t) {
											var a = zl.getCurrentWindowSlide().absoluteId;
											r != a && (Fl.trigger(Vl.request.NEXT_SLIDE, r), Nl.theme.isUnified && Fl.trigger(Vl.topEllipsesPanel.HIDE)),
												Nl.deviceView.isMobile && (Fl.trigger(Vl.tab.HIDE), (Nl.deviceView.isPhone || Nl.theme.isClassic) && Fl.trigger(Vl.sidebar.CLOSE));
										}
										null != this.currentItem && null != this.focusor && Gl(this.currentItem);
									}
								} else this.onClickLinkOld(e, t);
						},
					},
					{
						key: 'onClickLinkOld',
						value: function (e, t) {
							var n = e.getAttribute('data-ref'),
								r = null != n,
								i = it(n);
							if ('UL' !== e.nodeName)
								if ('restricted' !== this.menuOptions.flow || t || this.visitedSlides.has(n)) {
									if (
										(null != this.currentItem && e !== this.currentItem && ((this.currentItem.tabIndex = -1), es(this.currentItem, 'hover')),
										(this.currentItem = e),
										(i || $l(e.parentNode, 'item-collapsible')) && this.toggleScene(e.parentNode),
										null != n &&
											(this.collapseLastItem(e),
											(this.lastExpandedEls = this.collapsibleParents(e)),
											Array.from(this.lastExpandedEls).forEach(function (e) {
												var t = e.firstElementChild;
												n.includes(t.getAttribute('data-ref')) && Jl(t, 'cs-viewed');
											})),
										$l(e, 'listitem'))
									) {
										Jl(e, 'cs-viewed');
										var o = this.el.querySelector('.cs-selected');
										null != o && es(o, 'cs-selected'), Jl(e, 'cs-selected');
									} else this.onCarrotClick(e);
									if (r && !t) {
										var a = zl.getCurrentWindowSlide().absoluteId;
										i || n == a || (Fl.trigger(Vl.request.NEXT_SLIDE, n), Nl.theme.isUnified && Fl.trigger(Vl.topEllipsesPanel.HIDE)),
											Nl.deviceView.isMobile && (Fl.trigger(Vl.tab.HIDE), (Nl.deviceView.isPhone || Nl.theme.isClassic) && Fl.trigger(Vl.sidebar.CLOSE));
									}
									null != this.currentItem && null != this.focusor && Gl(this.currentItem);
								} else $l(e, 'carrot') && this.onCarrotClick(e);
						},
					},
					{
						key: 'updateViewedState',
						value: function (e) {
							Jl(e, 'cs-viewed');
							var t = ts(e).pop();
							if (!$l(e, 'is-scene') && null != t) {
								var n = t.querySelector('div.listitem');
								es(n, 'cs-unvisited');
							}
							this.updateAriaLabel(e);
						},
					},
					{
						key: 'isExpanded',
						value: function () {
							return !!this.currentItem.dataset.hasLinks && $l(this.parentElement, 'item-collapsed');
						},
					},
					{
						key: 'onKeydown',
						value: function (e) {
							var t = this.currentItem;
							if (Ul.isActionKey(e.which)) this.activateItem(), Ul.isSpaceKey(e.which) && e.preventDefault();
							else if (Ul.isRightKey(e.which) && t.dataset.hasLinks)
								$l(this.currentItem.parentNode, 'item-collapsed')
									? this.onCarrotClick(this.currentItem.firstElementChild)
									: (this.currentItem = this.getNextItem(this.getItemContent()));
							else if (Ul.isDownKey(e.which)) this.currentItem = this.getNextItem(this.getItemContent());
							else if (Ul.isUpKey(e.which)) this.currentItem = this.getPrevItem(this.getItemContent());
							else if (Ul.isLeftKey(e.which))
								if (t.dataset.hasLinks && !$l(t.parentNode, 'item-collapsed')) this.onCarrotClick(this.currentItem.firstElementChild);
								else {
									var n = Xl(this.currentItem, 'item-collapsible');
									null != n && (this.currentItem = n.querySelector('.cs-listitem'));
								}
							else Ul.isHomeKey(e.which) ? (this.currentItem = this.getFirstItem()) : Ul.isEndKey(e.which) && (this.currentItem = this.getLastItem());
							t !== this.currentItem && (e.preventDefault(), es(t, 'hover'), (t.parentNode.tabIndex = -1), this.focusOnCurrent());
						},
					},
					{
						key: 'focusOnCurrent',
						value: function () {
							this.centerOnFocused(),
								document.activeElement !== this.currentItem.parentNode &&
									((this.currentItem.parentNode.tabIndex = 0), Jl(this.currentItem, 'hover'), this.currentItem.parentNode.focus()),
								Gl(this.currentItem);
						},
					},
					{
						key: 'hasListItems',
						value: function () {
							return !Wl.isEmpty(G.model.frame.navData.outline.links);
						},
					},
					{
						key: 'getItems',
						value: function () {
							return (this.links = this.links || Ll(this.el.querySelectorAll('.cs-listitem'))), this.links;
						},
					},
					{
						key: 'activateItem',
						value: function () {
							var e = 'locked' !== this.menuOptions.flow && null == this.currentItem.dataset.isScene,
								t = e ? 'onClickLink' : 'onCarrotClick',
								n = e ? this.currentItem : this.currentItem.querySelector('.carrot');
							this[t](n);
						},
					},
					{
						key: 'findIndexCb',
						value: function (e, t) {
							return e === t;
						},
					},
					{
						key: 'getItemContent',
						value: function () {
							return this.currentItem;
						},
					},
					{
						key: 'getTreeRootEl',
						value: function () {
							return this.el.querySelector('ul');
						},
					},
					{
						key: 'getOffsetEl',
						value: function () {
							return Nl.deviceView.isMobile ? this.el.parentNode : this.el;
						},
					},
					{
						key: 'getOffsetTop',
						value: function (e) {
							return Nl.deviceView.isMobile
								? Wl.first(
										Yl(e, function (e) {
											return 'li' === e.nodeName.toLowerCase();
										}),
								  ).offsetTop
								: _l(Il(o.prototype), 'getOffsetTop', this).call(this, e);
						},
					},
					{
						key: 'onShowTabItem',
						value: function (e, t) {
							if ('outline' === e && null != t) {
								var n = this.getItems().find(function (e) {
									return e.dataset.translationId === t;
								});
								null != n && n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
							}
						},
					},
					{
						key: 'scrollToCurrent',
						value: function () {
							var e = this;
							Nl.deviceView.isMobile &&
								(this.currentItem = this.getItems().find(function (t) {
									return t.getAttribute('data-ref') === e.currentSlideId;
								})),
								_l(Il(o.prototype), 'scrollToCurrent', this).call(this);
						},
					},
					{
						key: 'setDrawSlides',
						value: function () {
							var e = this;
							this.view.draws.forEach(function (t) {
								var n = t.link,
									r = t.links,
									i = Kl.resolvePath(Ql(n.drawid)),
									o = function () {
										var t = n.spliceNum || 1,
											o = i.slides();
										r.splice.apply(r, [n.index, t].concat(Ll(o.map(e.createNewLink)))), (n.spliceNum = o.length), e.view.updateHtml(), e.view.initChildRefs();
									};
								i.on(Vl.draw.RESET_COMPLETE, o), null != i.slides() && o();
							});
						},
					},
					{
						key: 'createNewLink',
						value: function (e) {
							var t = { kind: 'slidelink', expand: !1, type: 'slide' };
							return (t.slideid = e.absoluteId), (t.slidetitle = t.displaytext = e.get('title')), t;
						},
					},
				]),
				n && Tl(t.prototype, n),
				r && Tl(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Na),
		is = rs,
		os = 'rtl',
		as = function () {
			return G.model.rtl ? os : '';
		},
		ls = function (e) {
			G.model.rtl && !e.contains(os) ? e.add(os) : !G.model.rtl && e.contains(os) && e.remove(os);
		},
		ss = DS.detection,
		cs = 'outline',
		us = function (e) {
			for (var t = ''; e; ) (t = e.index + 1 + '.' + t), (e = null != e.parent && 'slidelink' === e.parent.kind && e.parent);
			return t + ' ';
		},
		fs = function () {
			var e = de.getColor(DS.constants.refs.FRAME, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme');
			if (null == Rl || Ml !== !!G.model.rtl || Bl !== e) {
				var t = de.getColor(DS.constants.refs.FRAME, '.cs-tabs.cs-selected', 'color');
				(Rl = '.item-collapsible:not(.item-collapsed) .is-scene {\n      color: '
					.concat(t, ' !important;\n    }\n  \n    .is-scene:not(.item-collapsed) .cs-icon-carrot * {\n      fill: ')
					.concat(t, ' !important;\n    }')),
					(Ml = !!G.model.rtl),
					(Bl = e);
				var n = window.btoa(
					"\n      <svg xmlns='http://www.w3.org/2000/svg' version='1.1'\n            width='6px' height='40px' viewBox='0 0 6 40' preserveAspectRatio='none'>\n        <g stroke='none' fill='".concat(
						Bl,
						"'>\n          <polygon points='0 0 6 0 6 20 6 40 0 40'></polygon>\n        </g>\n      </svg>",
					),
				);
				Rl += '\n      .cs-listitem.cs-selected {\n        background-position: '
					.concat(
						Ml ? 'right' : 'left',
						' top !important;\n        background-repeat: no-repeat !important;\n        background-size: 6px 100% !important;\n        background-image: url("data:image/svg+xml;base64,',
					)
					.concat(n, '") !important;    \n      }');
			}
			return Rl;
		},
		ds = G.def(cs, is, function () {
			var e = G.model;
			return {
				tag: 'nav',
				attrs: { id: cs + '-content', class: 'is-scrollable cs-outline '.concat(as()), tabindex: -1, 'aria-label': e.getString('outline-container') },
				y: function () {
					return null != this.parent.children.search ? this.parent.children.search.h + xn : xn;
				},
				w: '100%',
				h: function () {
					return this.parent.h - (null != this.parent.children.search ? this.parent.children.search.h + xn : xn);
				},
				overflow: 'auto',
				draws: [],
				html: function () {
					var t = this,
						n = {},
						r = 0;
					DS.flagManager.multiLangSupport &&
						this.el.querySelectorAll('[data-collapsible-id]').forEach(function (e) {
							var t = e.dataset.collapsibleId;
							n[t] = !e.classList.contains('item-collapsed');
						});
					var i = e.frame.navData.outline.links || [],
						o = e.frame.controlOptions.menuOptions,
						a = o.wrapListItems,
						l = o.autonumber,
						s = o.tooltips,
						c = o.flow;
					this.el.depth = 0;
					var u = this.el;
					return (
						(u.innerHTML = "\n      <style id='sceneStyle'>\n        ".concat(fs(), '\n      </style>\n      ')),
						(function i(o, u, f) {
							var d = document.createElement('ul');
							(d.depth = u.depth + 1),
								(d.tabIndex = -1),
								null != f ? d.setAttribute('role', 'group') : (d.setAttribute('aria-label', e.getString('outline')), d.setAttribute('role', 'tree')),
								u.appendChild(d);
							for (var h = 0; h < o.length; h++) {
								var p = document.createElement('li'),
									y = o[h];
								(y.parent = f),
									(y.index = h),
									(p.depth = d.depth),
									(p.tabIndex = 1 === p.depth && 0 === h ? 0 : -1),
									p.setAttribute('role', 'treeitem'),
									d.appendChild(p);
								var b = null != y.links,
									v = 15 * p.depth + 19,
									g = y.slideid;
								null == g && t.draws.push({ link: y, links: o, i: h });
								var m = it(g),
									w = e.rtl,
									S = 'free' === c || (b && y.expand) ? '' : e.getString('acc_locked'),
									k = l ? ''.concat(us(y), ' ') : '',
									O = DS.flagManager.aiCourseTranslation && o[h].translationId,
									E = '\n              <div \n                class="cs-listitem listitem '
										.concat(m ? 'is-scene cs-unvisited' : '', ' ')
										.concat(a ? '' : 'no-wrap', ' ')
										.concat('free' !== c && 'cs-' + c, ' ')
										.concat(!m && b ? 'is-promoted-slide' : '', '"\n                style="padding-')
										.concat(w ? 'right' : 'left', ': ')
										.concat(v, 'px;"\n                data-ref="')
										.concat(g, '"\n                ')
										.concat(O ? 'data-translation-id="'.concat(O, '"') : '', '\n                data-slide-title="')
										.concat(k)
										.concat(o[h].displaytext, '"\n                ')
										.concat(m ? 'data-is-scene="true"' : '', '\n                ')
										.concat(b ? 'data-has-links="true"' : '', '\n                title="')
										.concat(
											s ? y.displaytext : '',
											'"\n                tabIndex="-1"\n                role = "none">\n                <span style="position: absolute; opacity: 0;">',
										)
										.concat(k)
										.concat(y.displaytext, ' ')
										.concat(S, '</span>\n\n                ')
										.concat(
											b ? Yn('carrot')(''.concat(w ? -1 : 1, 'px')) : '',
											'\n                <span class="linkText" aria-hidden="true">\n                  ',
										)
										.concat(k)
										.concat(
											y.displaytext,
											'\n                </span>\n                <span class="outline-states" aria-hidden="true">\n                  <span class="visitedIcon" aria-label="',
										)
										.concat(e.getString('acc_visited'), '">\n                    ')
										.concat(Yn('checkmark')(), '\n                  </span>\n                  <span class="lockedIcon" aria-label="')
										.concat(e.getString('acc_locked'), '">\n                    ')
										.concat(Yn('lock')(), '\n                  </span>\n                  <span class="lockedViewedIcon" aria-label="')
										.concat(e.getString('acc_visited'), ', ')
										.concat(e.getString('acc_locked'), '">\n                    ')
										.concat(Yn('lockedViewed')(), '\n                  </span>\n                </span>\n              </div>\n            ');
								(p.innerHTML = E),
									b &&
										(DS.flagManager.multiLangSupport && p.setAttribute('data-collapsible-id', r),
										p.setAttribute('aria-expanded', y.expand),
										p.classList.add('item-collapsible'),
										null != n[r] ? n[r] || p.classList.add('item-collapsed') : y.expand || p.classList.add('item-collapsed'),
										i(y.links, p, y),
										r++);
							}
						})(i, u),
						u.innerHTML
					);
				},
				updateHook: function () {
					var e = document.getElementById('sceneStyle');
					if (ss.browser.isIE) {
						var t = document.createElement('style');
						t.setAttribute('id', 'dynamicStyle'),
							t.setAttribute('type', 'text/css'),
							(t.cssText = fs()),
							document.head.querySelector('#dynamicStyle') || document.head.appendChild(t);
					} else null != e && (e.innerText = fs());
					ls(this.el.classList);
				},
			};
		});
	function hs(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return ps(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return ps(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ps(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function ps(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var ys = 'outlineSearch',
		bs = G.def(ys, jo, function () {
			var e = G.model,
				t = e.frame,
				n = e.outlineInSidebar,
				r = DS.presentation,
				i = t.controlOptions.controls.search || (r.isPreview() && !window.globals.HAS_SLIDE);
			return {
				attrs: { id: ''.concat(ys, '-content'), class: 'outline-search '.concat(as()), tabindex: -1 },
				w: function () {
					var e = this.parent.childWidth || this.parent.w;
					return e - 2;
				},
				h: function () {
					var e = this.parent.h;
					return e - 2;
				},
				updateHook: function () {
					ls(this.el.classList);
				},
				overflow: n ? 'hidden' : 'visible',
				model: t,
				childViews: [].concat(hs(i ? [ya, Cl] : []), [ds]),
			};
		});
	function vs(e) {
		return (
			(vs =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			vs(e)
		);
	}
	function gs(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return ms(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return ms(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ms(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function ms(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function ws(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Cs(r.key), r);
		}
	}
	function Ss(e, t) {
		return (
			(Ss = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Ss(e, t)
		);
	}
	function ks(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Es(e);
			if (t) {
				var i = Es(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === vs(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Os(e);
			})(this, n);
		};
	}
	function Os(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Es(e) {
		return (
			(Es = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Es(e)
		);
	}
	function Cs(e) {
		var t = (function (e, t) {
			if ('object' !== vs(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== vs(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === vs(t) ? t : String(t);
	}
	var xs = DS,
		Ls = (xs._, xs.focusManager),
		Ps = xs.detection,
		Ts = xs.pubSub,
		_s = xs.events,
		js = xs.dom,
		Ds = js.addClass,
		As = js.removeClass,
		Is =
			(xs.keyManager.isTabKey,
			(function (e) {
				!(function (e, t) {
					if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
					(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
						Object.defineProperty(e, 'prototype', { writable: !1 }),
						t && Ss(e, t);
				})(o, e);
				var t,
					n,
					r,
					i = ks(o);
				function o(e) {
					var t, n, r, a;
					return (
						(function (e, t) {
							if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
						})(this, o),
						(t = i.call(this, e)),
						(n = Os(t)),
						(a = void 0),
						(r = Cs((r = 's'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
						t.view.isUnified &&
							((t.getScrollEl = function () {
								return t.termsEl;
							}),
							(t.getOffsetTop = function (e) {
								return e.offsetTop;
							}),
							(t.getOffsetHeight = function (e) {
								return e.offsetHeight + e.nextElementSibling.clientHeight;
							})),
						(t.hasDefinition = Ps.deviceView.isDesktop && !t.view.isUnified),
						Ts.on(_s.glossary.REFRESH_VIEW, function () {
							t.view.updateHtml(), t.view.update();
						}),
						DS.flagManager.aiCourseTranslation && Ts.on(_s.frame.SHOW_TAB_ITEM, t.onShowTabItem.bind(Os(t))),
						t
					);
				}
				return (
					(t = o),
					(n = [
						{
							key: 'onClickItem',
							value: function (e) {
								var t = e.target;
								if (this.hasDefinition && null != t && 'p' !== t.nodeName.toLowerCase()) {
									var n = null != this.activeItem;
									n &&
										(this.activeItem.firstElementChild.setAttribute('aria-expanded', !1),
										(this.activeItem.style.backgroundColor = ''),
										this.closeItem(this.activeItem)),
										(n && this.lastSelected == t) || (t.setAttribute('aria-expanded', !0), this.openItem(t.parentElement)),
										(this.lastSelected = t);
								}
							},
						},
						{
							key: 'getNextItem',
							value: function (e) {
								var t,
									n = this.getItems(),
									r = this.getItems().indexOf(this.currentItem);
								do {
									(r += 1) === n.length && (r = 0), (t = n[r]);
								} while ('none' === t.parentElement.style.display);
								return t;
							},
						},
						{
							key: 'getPrevItem',
							value: function (e) {
								var t,
									n = this.getItems(),
									r = this.getItems().indexOf(this.currentItem);
								do {
									-1 == (r -= 1) && (r = n.length - 1), (t = n[r]);
								} while ('none' === t.parentElement.style.display);
								return t;
							},
						},
						{
							key: 'hasListItems',
							value: function () {
								return !DS._.isEmpty(this.model.frame.glossaryData);
							},
						},
						{
							key: 'getItems',
							value: function () {
								return (this.links = this.links || gs(this.el.querySelectorAll('.term'))), this.links;
							},
						},
						{
							key: 'openItem',
							value: function (e) {
								Ds(e, 'cs-selected'), (e.nextElementSibling.style.display = 'block'), Ds(e.nextElementSibling, 'open'), (this.activeItem = e);
							},
						},
						{
							key: 'closeItem',
							value: function (e) {
								var t = this;
								As(e, 'cs-selected'),
									As(e.nextElementSibling, 'open'),
									(this.activeItem = null),
									TweenLite.to(e, 0.2, {
										opacity: 1,
										onComplete: function () {
											(e.nextElementSibling.style.display = 'none'), Ls.setFocusRectOn(t.currentItem);
										},
									});
							},
						},
						{
							key: 'onShowTabItem',
							value: function (e, t) {
								if ('glossary' === e && null != t) {
									var n = gs(this.el.querySelectorAll('[data-translation-id]')).find(function (e) {
										return e.dataset.translationId === t;
									});
									null != n && n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
								}
							},
						},
					]) && ws(t.prototype, n),
					r && ws(t, r),
					Object.defineProperty(t, 'prototype', { writable: !1 }),
					o
				);
			})(Na)),
		Rs = Is;
	function Bs(e) {
		return (
			(Bs =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Bs(e)
		);
	}
	function Ms(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Hs(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Hs(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Hs(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Hs(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function Ns(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Bs(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Bs(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Bs(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Fs(e, t) {
		return (
			(Fs = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Fs(e, t)
		);
	}
	function Ws(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Us(e);
			if (t) {
				var i = Us(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Bs(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Vs(e);
			})(this, n);
		};
	}
	function Vs(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Us(e) {
		return (
			(Us = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Us(e)
		);
	}
	var Ks = DS,
		zs = (Ks.detection, Ks.pubSub),
		Qs = Ks.events,
		Gs = Ks.keyManager.isSpaceKey,
		Zs = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Fs(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Ws(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					zs.on(Qs.resources.REFRESH_VIEW, function () {
						t.view.updateHtml(), t.view.update();
					}),
					DS.flagManager.aiCourseTranslation && zs.on(Qs.frame.SHOW_TAB_ITEM, t.onShowTabItem.bind(Vs(t))),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{ key: 'onClickItem', value: function () {} },
					{
						key: 'hasListItems',
						value: function () {
							return (this.model.resourceData.resources || []).length > 0;
						},
					},
					{
						key: 'getItems',
						value: function () {
							return (this.items = this.items || Ms(this.el.querySelectorAll('.resource a'))), this.items;
						},
					},
					{
						key: 'activateItem',
						value: function (e) {
							Gs(e.keyCode) && DS.windowOpen.open({ url: this.currentItem.dataset.url });
						},
					},
					{
						key: 'getOffsetTop',
						value: function (e) {
							return this.currentItem.offsetTop;
						},
					},
					{
						key: 'getFocusRectTarget',
						value: function () {
							return this.currentItem.parentNode;
						},
					},
					{
						key: 'onShowTabItem',
						value: function (e, t) {
							if ('resource' === e && null != t) {
								var n = this.getItems().find(function (e) {
									return e.dataset.translationId === t;
								});
								null != n && n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
							}
						},
					},
				]) && Ns(t.prototype, n),
				r && Ns(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Rs),
		qs = Zs;
	function Ys(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Xs(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Xs(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xs(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Xs(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var $s = DS.utils,
		Js = $s.pxify,
		ec = $s.getPath,
		tc = 'resources',
		nc = ['xls', 'pdf', 'doc', 'ppt', 'rtf', 'zip', 'link', 'file'],
		rc = { docx: 'doc', pptx: 'ppt', xlsx: 'xls' },
		ic = G.def(tc, qs, function (e) {
			var t = G.model.frame,
				n = de.getColor(e, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme').replace(/\).*/, ')');
			return {
				attrs: { id: ''.concat(tc, '-content'), class: 'cs-resource '.concat(as(), ' resources'), tabindex: -1 },
				w: function () {
					return this.parent.childWidth || this.parent.w;
				},
				h: function () {
					return this.parent.h - 10;
				},
				overflow: '',
				model: t,
				html: function () {
					return '\n      <div class="resources-content scrolling-panel panel-content">\n        <ul class="resources-list" role="menu">\n          '.concat(
						ec(t, 'resourceData.resources', []).reduce(function (e, t, r) {
							var i = (function (e) {
									var t = e.url,
										n = t.includes('http') ? 'link' : t.split('.').pop().toLowerCase();
									return rc[n] && (n = rc[n]), nc.includes(n) ? n : 'file';
								})(t),
								o = 'href="javascript:DS.windowOpen.open({ url: \''.concat(t.url, '\' })"'),
								a = DS.flagManager.aiCourseTranslation && t.translationId;
							return ''
								.concat(e, '\n              <li class="cs-listitem resource" tabIndex="-1">\n                <a ')
								.concat(o, ' \n                  data-url="')
								.concat(t.url, '" \n                  tabindex="')
								.concat(0 === r ? 0 : -1, '" \n                  role="menuitem" \n                  ')
								.concat(a ? 'data-translation-id="'.concat(a, '"') : '', '\n                >\n                  <div class="file-icon resource-ext-')
								.concat(i, '">\n                    ')
								.concat(Yn('link' === i ? 'link' : 'file')(n), '\n                    <div class="file-icon-text">\n                    ')
								.concat(i, '\n                    </div>\n                  </div>\n                  <div class="file-name">')
								.concat(t.title, '</div>\n                </a>\n              </li>');
						}, ''),
						'\n        </ul>\n      </div>',
					);
				},
				updateHook: function () {
					ls(this.el.classList);
				},
				methods: {
					onPanelVisible: function () {
						Ys(this.el.querySelectorAll('.resource')).forEach(function (e) {
							var t = e.querySelector('.file-name').scrollHeight;
							e.clientHeight < t && (e.style.height = Js(t + 8));
						});
					},
				},
			};
		}),
		oc = DS,
		ac = oc.slideObjectUtils,
		lc = oc.utils.getPath,
		sc = oc.constants,
		cc = 'glossary',
		uc = G.def(cc, Rs, function () {
			var e = G.model;
			return (
				ac.activeMobileMenuItem(e.frame.glossaryData, 'no-glossary'),
				{
					attrs: { id: ''.concat(cc, '-content'), class: ''.concat(as(), ' cs-glossary'), tabindex: -1 },
					w: '100%',
					h: function () {
						return this.parent.h - xn + 2;
					},
					model: e,
					isUnified: !0,
					html: function () {
						return '\n      <div data-ref="terms" class="glossary-content scrolling-panel">\n        <dl>\n        '.concat(
							lc(e, 'frame.glossaryData', [])
								.map(function (e, t) {
									var n = 'glossary-def-'.concat(t),
										r = DS.flagManager.aiCourseTranslation && e.translationId;
									return '\n              <dt \n                class="cs-heading glossary-item glossary-term term"  \n                tabindex="'
										.concat(0 === t ? 0 : -1, '" \n                aria-describedby="')
										.concat(n, '"\n                ')
										.concat(r ? 'data-translation-id="'.concat(r, '.Term"') : '', '\n              >\n                ')
										.concat(e.title, '\n              </dt>\n              <dd \n                id="')
										.concat(n, '" \n                class="glossary-item glossary-desc" \n                tabindex="-1"\n                ')
										.concat(r ? 'data-translation-id="'.concat(r, '.Definition"') : '', '\n              >\n                ')
										.concat(
											e.content
												.toString()
												.split(sc.LINE_BREAK_REGEX)
												.map(function (e) {
													return '<p class='.concat(0 === e.length ? 'empty-p' : '', '>').concat(e, '</p>');
												})
												.join(''),
											'\n              </dd>\n            ',
										);
								})
								.join(''),
							'\n        </dl>\n      </div>',
						);
					},
					updateHook: function () {
						ls(this.el.classList);
					},
				}
			);
		});
	function fc(e) {
		return (
			(fc =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			fc(e)
		);
	}
	function dc(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== fc(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== fc(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === fc(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function hc(e, t) {
		return (
			(hc = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			hc(e, t)
		);
	}
	function pc(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = bc(e);
			if (t) {
				var i = bc(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === fc(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return yc(e);
			})(this, n);
		};
	}
	function yc(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function bc(e) {
		return (
			(bc = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			bc(e)
		);
	}
	var vc = /color:#ffffff/gi,
		gc = DS,
		mc = gc.detection,
		wc = gc.events,
		Sc = gc.focusManager,
		kc = gc.pubSub,
		Oc = (gc.utils, gc.slideObjectUtils),
		Ec = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && hc(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = pc(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					kc.on(wc.window.MAIN_CHANGED, t.onSlideChanged.bind(yc(t))),
					(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation) && kc.on(wc.transcript.REFRESH_VIEW, t.onRefreshView.bind(yc(t))),
					mc.deviceView.isClassicMobile
						? kc.on(wc.mobile.NOTES_SHOWN, t.onHamburgerToggle.bind(yc(t), !1))
						: mc.deviceView.isUnifiedMobile && kc.on(wc.hamburger.TOGGLE, t.onHamburgerToggle.bind(yc(t))),
					(t.forceScrollToTop = !1),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onHamburgerToggle',
						value: function (e) {
							this.forceScrollToTop && !e && ((this.getScrollElement().scrollTop = 0), (this.forceScrollToTop = !1));
						},
					},
					{
						key: 'onFocus',
						value: function () {
							this.el.focus(), Sc.setFocusRectOn(this.el.parentNode);
						},
					},
					{
						key: 'focusSelf',
						value: function () {
							this.onFocus();
						},
					},
					{
						key: 'handleTab',
						value: function () {
							return this.el.parentElement.focus(), !0;
						},
					},
					{
						key: 'onSlideChanged',
						value: function (e) {
							var t = (this.model.notesData || []).find(function (t) {
								return e.absoluteId.includes(t.slideId);
							});
							null != this.titleEl && (this.titleEl.innerHTML = e.get('title'));
							var n = null == t ? '' : t.content;
							mc.deviceView.isClassicMobile && (n = n.replace(vc, 'color:#515557')),
								(this.contentEl.innerHTML = n),
								kc.trigger(wc.transcript.CHANGED),
								Oc.activeMobileMenuItem(n, 'no-transcript'),
								this.scrollToTop();
						},
					},
					{
						key: 'onRefreshView',
						value: function () {
							var e = DS.windowManager.getMainWindowSlide();
							null != e && this.onSlideChanged(e);
						},
					},
					{
						key: 'scrollToTop',
						value: function () {
							mc.deviceView.isDesktop
								? (this.view.el.scrollTop = 0)
								: mc.theme.isClassic
								? 0 === this.getScrollElement().scrollTop
									? (this.forceScrollToTop = !0)
									: (this.getScrollElement().scrollTop = 0)
								: G.getNamespace(this.view.nameSpace).sidebar.collapsed
								? (this.forceScrollToTop = !0)
								: (this.getScrollElement().scrollTop = 0);
						},
					},
					{
						key: 'getScrollElement',
						value: function () {
							return mc.deviceView.isClassicMobile ? this.view.parent.el : this.view.el;
						},
					},
					{
						key: 'getViewBox',
						value: function () {
							return this.view.parent.getBox();
						},
					},
					{
						key: 'teardown',
						value: function () {
							kc.off(wc.window.MAIN_CHANGED, this.onSlideChanged.bind(this)),
								DS.flagManager.multiLangSupport && kc.off(wc.transcript.REFRESH_VIEW, this.onRefreshView.bind(this)),
								mc.deviceView.isClassicMobile
									? kc.off(wc.mobile.NOTES_SHOWN, this.onHamburgerToggle.bind(this, !1))
									: mc.deviceView.isUnifiedMobile && kc.off(wc.hamburger.TOGGLE, this.onHamburgerToggle.bind(this));
						},
					},
				]) && dc(t.prototype, n),
				r && dc(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Cc = Ec,
		xc = 'transcript',
		Lc = {
			outline: bs,
			resources: ic,
			glossary: uc,
			transcript: G.def(xc, Cc, function () {
				var e = G.model,
					t = e.rtl ? 'rtl' : '';
				return {
					attrs: { id: xc + '-content', class: 'cs-transcript '.concat(t), tabindex: 0 },
					w: '100%',
					h: function () {
						return this.parent.h - 20;
					},
					html: '\n      <div data-ref="content" class="note-content scrolling-panel"></div>\n    ',
					model: e.frame,
				};
			}),
		},
		Pc = DS.utils.getPath,
		Tc = DS.constants.refs.FRAME,
		_c = 'sidebarPanels',
		jc =
			(G.def(_c, function (e) {
				var t = G.getNamespace(e),
					n = t.sidebar,
					r = t.tabs,
					i = t.logo;
				return {
					attrs: { id: _c },
					x: 0,
					z: 1,
					y: function () {
						return r.bottom();
					},
					w: function () {
						return n.data.actualWidth();
					},
					h: function () {
						var e = i ? i.h + xn : 0;
						return n.h - r.h - e;
					},
					childDef: function () {
						jc(G.model, e);
					},
				};
			}),
			function (e, t) {
				Pc(e, 'sidebarTabs', []).forEach(function (e, n) {
					!(function (e, t, n, r) {
						var i = t.name,
							o = i + 'Panel',
							a = 0 === n,
							l = G.def(o, Oo, {
								attrs: { id: o, class: 'cs-menu cs-panel is-scrollable panel', 'aria-labelledby': i + '-tab', role: 'tabpanel', tabindex: -1 },
								visibility: 'no-reflow',
								style: { display: a },
								x: 0,
								y: 0,
								w: '100%',
								h: '100%',
								html: '',
							});
						l.init(), G.getNamespace(Tc).sidebarPanels.append(l);
						var s = Lc[i];
						null != s && ((s.nameSpace = r), s.init(), l.append(s));
					})(0, e, n, t);
				});
			}),
		Dc = 'topTabs';
	function Ac(e) {
		return (
			(Ac =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ac(e)
		);
	}
	function Ic(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Ac(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Ac(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Ac(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Rc(e, t) {
		return (
			(Rc = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Rc(e, t)
		);
	}
	function Bc(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Mc(e);
			if (t) {
				var i = Mc(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Ac(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function Mc(e) {
		return (
			(Mc = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Mc(e)
		);
	}
	G.def(Dc, function () {
		return { attrs: { id: Dc, role: 'navigation' }, w: '100%', overflow: 'visible', h: '100%' };
	});
	var Hc = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Rc(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Bc(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)).onClick(t.onClickLink),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onClickLink',
						value: function () {
							var e = this,
								t = this.model.properties.data;
							DS.pubSub.trigger(DS.events.customlink.EVENT, t),
								this.view.parent.children.forEach(function (t) {
									t.viewLogic !== e && t.viewLogic.showing && t.viewLogic.hidePanel();
								});
						},
					},
					{
						key: 'isLive',
						value: function () {
							return !0;
						},
					},
				]) && Ic(t.prototype, n),
				r && Ic(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Nc = Hc;
	function Fc(e) {
		return (
			(Fc =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Fc(e)
		);
	}
	function Wc(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Fc(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Fc(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Fc(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Vc() {
		return (
			(Vc =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Qc(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			Vc.apply(this, arguments)
		);
	}
	function Uc(e, t) {
		return (
			(Uc = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Uc(e, t)
		);
	}
	function Kc(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Qc(e);
			if (t) {
				var i = Qc(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Fc(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return zc(e);
			})(this, n);
		};
	}
	function zc(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Qc(e) {
		return (
			(Qc = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Qc(e)
		);
	}
	var Gc = DS.dom.isWithin,
		Zc = DS.globalEventHelper,
		qc = Zc.addDocumentListener,
		Yc = Zc.removeDocumentListener,
		Xc = DS,
		$c = Xc.pubSub,
		Jc = Xc.events,
		eu = Xc._,
		tu = Xc.playerGlobals,
		nu = Xc.dom,
		ru = nu.addClass,
		iu = nu.removeClass,
		ou = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Uc(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Kc(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					eu.bindAll(zc(t), 'hidePanel', 'onCheckShouldHide'),
					t.onClick(t.onClickLink),
					(t.showing = !1),
					$c.on(Jc.sidebar.ACTIVE_TAB_SET, t.onActiveTabSet.bind(zc(t))),
					DS.flagManager.aiCourseTranslation && $c.on(Jc.frame.SHOW_TAB_ITEM, t.onShowTabItem.bind(zc(t))),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onShowTabItem',
						value: function (e) {
							this.hidePanel(), this.view.nameKey.includes(e) && this.showPanel(!0);
						},
					},
					{
						key: 'onActiveTabSet',
						value: function (e) {
							this.view.parent.children.find(function (t) {
								return t.nameKey.includes(e);
							}) && this.hidePanel(),
								this.view.nameKey.includes(e) && this.showPanel();
						},
					},
					{
						key: 'onClickLink',
						value: function (e) {
							this.showing ? this.hidePanel() : this.showPanel();
						},
					},
					{
						key: 'showPanel',
						value: function () {
							var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
							(this.translationShown = e),
								(this.el.style.border = '1px solid '.concat(this.view.selectedBorderColor)),
								this.el.setAttribute('aria-expanded', !0),
								ru(this.el, 'cs-selected'),
								ru(this.el, 'active'),
								(this.view.panel.el.style.display = 'block'),
								this.view.panel.viewLogic.focusChild(),
								qc('mouseup', this.onCheckShouldHide),
								$c.on(Jc.controlLayout.CHANGED, this.hidePanel),
								(this.showing = !0);
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							(this.translationShown = !1),
								(this.el.style.border = '1px solid rgba(0, 0, 0, 0)'),
								this.el.setAttribute('aria-expanded', !1),
								iu(this.el, 'cs-selected'),
								iu(this.el, 'active'),
								(this.view.panel.el.style.display = 'none'),
								Yc('mouseup', this.onCheckShouldHide),
								$c.off(Jc.controlLayout.CHANGED, this.hidePanel),
								(this.showing = !1);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							(tu.presentation.isPreview() && !window.globals.HAS_SLIDE) || this.onCheckShouldHide({ target: e.relatedTarget }),
								Vc(Qc(o.prototype), 'onBlur', this).call(this, e);
						},
					},
					{
						key: 'onCheckShouldHide',
						value: function (e) {
							(null != e.target && (Gc(e.target, 'panel') || this.el.contains(e.target))) || this.hidePanel();
						},
					},
					{
						key: 'isLive',
						value: function () {
							var e = G.model.currControlLayout[this.model.name];
							return eu.isObject(e) ? e.enabled : e;
						},
					},
					{
						key: 'teardown',
						value: function () {
							$c.off(Jc.controlLayout.CHANGED, this.hidePanel), $c.off(Jc.sidebar.ACTIVE_TAB_SET);
						},
					},
				]),
				n && Wc(t.prototype, n),
				r && Wc(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		au = ou;
	function lu(e) {
		return (
			(lu =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			lu(e)
		);
	}
	function su(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== lu(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== lu(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === lu(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function cu() {
		return (
			(cu =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = hu(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			cu.apply(this, arguments)
		);
	}
	function uu(e, t) {
		return (
			(uu = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			uu(e, t)
		);
	}
	function fu(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = hu(e);
			if (t) {
				var i = hu(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === lu(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return du(e);
			})(this, n);
		};
	}
	function du(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function hu(e) {
		return (
			(hu = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			hu(e)
		);
	}
	var pu = DS,
		yu = pu._,
		bu = pu.events,
		vu = pu.pubSub,
		gu = pu.detection,
		mu = pu.keyManager,
		wu = pu.TweenLite,
		Su = pu.focusManager,
		ku = pu.constants.ANIMATION_DURATION,
		Ou = pu.globalEventHelper,
		Eu = Ou.addDocumentListener,
		Cu = Ou.addWindowListener,
		xu = pu.dom,
		Lu = xu.isInput,
		Pu = xu.hasClass,
		Tu = xu.addClass,
		_u = xu.removeClass,
		ju = gu.device.isMobile ? 'touchend' : 'mouseup',
		Du = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && uu(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = fu(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					yu.bindAll(du(t), 'updatePanel', 'onResize'),
					(t.isOutlinePanel = 'outlineLink' === e.nameKey),
					(t.isGlossaryPanel = 'glossaryLink' === e.nameKey),
					(t.isResourcesPanel = 'resourcesLink' === e.nameKey),
					t.isOutlinePanel &&
						(vu.on(bu.menuLinksListItem.TOGGLE, t.updatePanel),
						vu.on(bu.search.UPDATE_PANEL, function () {
							setTimeout(t.updatePanel, ku);
						}),
						(t.searchEnabled = G.model.frame.controlOptions.controls.search)),
					window.globals.HAS_SLIDE || t.subscribeToRefreshEvents(),
					(t.removeResize = Cu('resize', t.onResize)),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'subscribeToRefreshEvents',
						value: function () {
							this.isOutlinePanel
								? vu.on(bu.navData.REFRESH_VIEW, this.updatePanel)
								: this.isResourcesPanel
								? vu.on(bu.resources.REFRESH_VIEW, this.updatePanel)
								: this.isGlossaryPanel && vu.on(bu.glossary.REFRESH_VIEW, this.updatePanel);
						},
					},
					{
						key: 'teardown',
						value: function () {
							vu.off(bu.resources.REFRESH_VIEW, this.updatePanel),
								vu.off(bu.glossary.REFRESH_VIEW, this.updatePanel),
								vu.off(bu.navData.REFRESH_VIEW, this.updatePanel),
								this.removeResize();
						},
					},
					{
						key: 'onResize',
						value: function () {
							!this.showing || (gu.device.isMobile && Lu(document.activeElement)) || this.hidePanel();
						},
					},
					{
						key: 'updatePanel',
						value: function () {
							var e = this.view.panel.el.querySelector('.scrolling-panel');
							if (null != e)
								(this.view.panel.height = Math.min(window.innerHeight - 120, e.clientHeight + 40)), this.view.panel.update(), this.view.panel.updateChildren();
							else if (this.isOutlinePanel) {
								var t;
								(t = Pu(document.body, 'search-results-active')
									? document.body.querySelector('.search-results-active .search-results ul')
									: document.body.querySelector('#outline-content ul')),
									(this.view.panel.height = Math.min(window.innerHeight - 120, t.clientHeight + 40 + (this.searchEnabled ? 58 : 0))),
									this.view.panel.update(),
									this.view.panel.updateChildren(!0);
							}
						},
					},
					{
						key: 'showPanel',
						value: function () {
							var e = this;
							vu.trigger(bu.tabLink.SHOW_PANEL, this),
								gu.deviceView.isPhone && wu.from(this.view.panel.el, 0.12, { left: 'left' === G.model.sidebarOpts.sidebarPos ? 30 : -30 }),
								Tu(document.body, 'nested-panel-shown'),
								this.el.setAttribute('aria-expanded', !0),
								this.el.classList.add('cs-selected', 'active'),
								(this.view.panel.el.style.display = 'block'),
								this.updatePanel(),
								this.view.panel.viewLogic.focusChild(),
								(this.removeShowPanelListeners = yu.flow(
									Eu('keydown', function (t) {
										return e.handleKeyDown(t);
									}),
									Eu(ju, this.onCheckShouldHide),
								)),
								vu.on(bu.controlLayout.CHANGED, this.hidePanel),
								(this.showing = !0),
								vu.trigger(bu.tabLink.PANEL_SHOWN, this);
						},
					},
					{
						key: 'handleKeyDown',
						value: function (e) {
							mu.isEscapeKey(e.which) && (this.hidePanel(), this.el.focus(), Su.setFocusRectOn(this.el));
						},
					},
					{
						key: 'hidePanel',
						value: function (e) {
							vu.trigger(bu.tabLink.HIDE_PANEL, this),
								(!e && gu.deviceView.isPhone && this.view.panel.inEllipsis) ||
									(cu(hu(o.prototype), 'hidePanel', this).call(this),
									null != this.removeShowPanelListeners && this.removeShowPanelListeners(),
									_u(document.body, 'nested-panel-shown'));
						},
					},
				]) && su(t.prototype, n),
				r && su(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(au),
		Au = Du;
	function Iu(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Ru(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Ru(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ru(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Ru(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var Bu,
		Mu = DS.detection,
		Hu = DS.constants.refs.FRAME,
		Nu = Mu.deviceView.isPhone ? 290 : 302,
		Fu = DS,
		Wu = Fu.pubSub,
		Vu = Fu.events,
		Uu = !0,
		Ku = [],
		zu = !0;
	Wu.on(Vu.renderTree.DESTROYED, function () {
		(Ku = []), (Uu = !0);
	});
	var Qu = function (e) {
			if (e.length > 0) {
				var t = e.shift();
				return Ku.unshift(t), t;
			}
		},
		Gu = function (e) {
			return e.reduce(function (e, t) {
				return t.update(), e + (t.isTopLink ? t.w : 0);
			}, 0);
		};
	function Zu(e) {
		return (
			(Zu =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Zu(e)
		);
	}
	function qu(e, t, n) {
		return (
			(t = (function (e) {
				var t = (function (e, t) {
					if ('object' !== Zu(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || 'default');
						if ('object' !== Zu(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === t ? String : Number)(e);
				})(e, 'string');
				return 'symbol' === Zu(t) ? t : String(t);
			})(t)) in e
				? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (e[t] = n),
			e
		);
	}
	!(function (e) {
		var t,
			n = e.id,
			r =
				(G.def(n, function (r) {
					var o = G.getNamespace(r),
						a = o.title,
						l = o.hamburger,
						s = o.sidebar,
						c = o.timer,
						u = o.topEllipsis;
					G.model.topTabsRight.length;
					return (
						(t = n),
						{
							attrs: { id: n, tabindex: -1 },
							style: { left: '-1px' },
							w: function () {
								var e = this.parent.w - xn;
								return a.visible && (e -= a.w), s.visible && (e -= l.w), null != c && c.visible && (e -= c.w), u.visible && (e -= u.w), e - Ln;
							},
							overflow: 'visible',
							x: e.x,
							y: 'vertical-center',
							h: 22,
							z: 5,
							childDef: function () {
								i(G.model, r);
							},
							methods: e.methods,
							updateHook: e.updateHook,
						}
					);
				}),
				function (n, r, i, o) {
					var a,
						l,
						s,
						c,
						u = 'customlink' === i.name;
					u
						? ((l = Nc),
						  (a = (DS.flagManager.multiLangSupport && r.getControlString(i.properties.data)) || i.properties.title),
						  (s = 'link'.concat(e.dir).concat(o)),
						  (c = 'custom-link'))
						: ((l = Au), (a = r.getString(i.name)), (s = i.name + 'Link'), (c = 'panel-link'));
					var f = de.getColor(n, '.cs-topmenu-item.active .cs-tab', 'border-top-color', '.cs-base'),
						d = { id: s, class: 'cs-topmenu-item cs-tabs top-tab '.concat(c), tabindex: 0 };
					u || ((d['aria-controls'] = ''.concat(i.name, '-panel')), (d['aria-expanded'] = !1));
					var h = G.def(s, l, {
						selectedBorderColor: f,
						attrs: d,
						model: Object.assign(i, { idx: o }),
						isTopLink: !0,
						calcTextSize: !0,
						noUpdate: !0,
						contentStyle: {},
						tag: 'button',
						html: function () {
							return '<span data-ref="label" class="cs-tab top-tab-text">'.concat(a, '</span>');
						},
						methods: {
							updateDomStrings: function () {
								var e = 'customlink' === i.name ? r.getControlString(i.properties.data) : r.getString(i.name);
								this.viewLogic.labelEl.textContent = e;
							},
						},
						wPad: 14,
						z: 2,
						w: 'fit-to-text-w',
						h: 'fit-to-text-h',
						minH: 23,
					});
					h.init(),
						G.getNamespace(Hu)[e.id].append(h, !0),
						u ||
							(function (n, r, i, o) {
								var a = o.name + 'Panel',
									l = 'linksRight' === e.id,
									s = G.getNamespace(n),
									c = (s.topBar, s.frame, s.sidebar),
									u = s.slide,
									f = (s.wrapper, s.topEllipsis, de.getColor(n, '.cs-topmenu-item.active .cs-panel', 'border-top-color', '.cs-base')),
									d = Mu.env.isFileProtocol || Mu.browser.isFF ? 'background-color' : 'background',
									h = de.getColor(n, '.cs-topmenu-item.active .cs-panel', d),
									p = G.getNamespace(n)[o.name + 'Link'],
									y = G.getNamespace(n),
									b = y.topEllipsisPanel,
									v = y.linksRight,
									g = G.model.rtl,
									m = G.def(a, Oo, {
										attrs: {
											id: a,
											class: 'cs-topmenu-item topmenu-item active cs-menu cs-panel panel top-tabs-drop topmenu-panel-align-'.concat(l ? 'right' : 'left'),
											tabIndex: -1,
										},
										style: { borderColor: f, background: h },
										w: Nu,
										h: function () {
											return this.height || 200;
										},
										z: u.z + 1,
										visible: !1,
										lnk: r,
										tabsId: t,
										overflow: 'visible',
										x: function () {
											var e = 0;
											if (p.inEllipsis)
												return (
													!g || Mu.deviceView.isPhone
														? 'left' === c.pos
															? (e = b.maxWidth - Nu + 8)
															: Mu.deviceView.isPhone || (e = (b.maxWidth - Nu) / 2 + 8)
														: 'left' !== c.pos && (e = -2),
													e
												);
											var t = (e = r.x + (r.w - Nu) / 2) + Nu;
											return (
												!p.inEllipsis && t > v.w && (e = v.w - Nu - 20),
												(e = Math.max(g ? 20 : 0, e)),
												(this.children.arrow.el.style.left = ''.concat(r.x - e + r.w / 2 - 11, 'px')),
												e
											);
										},
										y: function () {
											return p.inEllipsis ? 0 : this.lnk.h + 10;
										},
										html: Kr(h, f),
									});
								m.init(n), G.getNamespace(Hu)[e.id].append(m), (r.panel = m);
								var w = Lc[o.name];
								null != w && (w.init(n), m.append(w));
							})(n, h, 0, i);
				}),
			i = function (e, t) {
				[].concat(Iu(e.topTabsLeft), Iu(e.topTabsRight)).forEach(function (n, i) {
					r(t, e, n, i);
				});
			};
	})({
		id: 'linksRight',
		dir: 'Right',
		linkListName: 'topTabsRight',
		x: function () {
			var e = G.getNamespace(DS.constants.refs.FRAME),
				t = e.hamburger,
				n = e.title,
				r = e.sidebar,
				i = e.topEllipsis,
				o = 0;
			return (
				G.model.rtl
					? (r.visible && (o += t.w), i.visible && ((o += i.w), 'right' === r.pos && (o = i.w)))
					: n.visible
					? (o = n.right())
					: r.visible && (o = t.w),
				o + ('right' === r.pos ? 0 : Ln)
			);
		},
		methods: {
			tabWidths: function () {
				return Gu(this.children);
			},
			phoneUpdateHook: function () {
				if (0 !== this.children.length || 0 !== Ku.length) {
					var e = G.getNamespace(this.nameSpace),
						t = e.topEllipsis,
						n = e.topEllipsisPanel;
					this.children.forEach(function (e) {
						var r = n.children.links.el;
						null != e.panel && ((e.panel.inEllipsis = !0), r.insertBefore(e.panel.el, r.firstChild), e.panel.update()),
							(e.inEllipsis = !0),
							r.insertBefore(e.el, r.firstChild),
							t.setVisibility(!0);
					}),
						(this.updateHook = DS._.noop);
				}
			},
		},
		updateHook: function () {
			if (DS.detection.deviceView.isPhone) this.phoneUpdateHook();
			else {
				var e = this.children;
				if (
					(zu ||
						0 !== this.children.length ||
						DS.presentation.isPreview() ||
						this.setVisibility(
							Ku.length > 0 ||
								this.children.some(function (e) {
									return e.visible;
								}),
						),
					(zu = !1),
					(0 !== e.length || 0 !== Ku.length) && null != this.nameSpace)
				) {
					var t = G.getNamespace(this.nameSpace),
						n = t.linksRight,
						r = t.topEllipsis,
						i = t.sidebar,
						o = t.topEllipsisPanel,
						a = this.w;
					if ((Bu > a && (Uu = !0), (Bu = a), Uu && Gu(e) > this.w))
						for (; Gu(e) > this.w; ) {
							var l = Qu(this.children);
							if (null != l && l.isTopLink) {
								if (null != l.el) {
									var s = o.children.links.el;
									null != l.panel && ((l.panel.inEllipsis = !0), s.insertBefore(l.panel.el, s.firstChild), l.panel.update()),
										(l.inEllipsis = !0),
										s.insertBefore(l.el, s.firstChild);
								}
								r.setVisibility(!0);
							}
						}
					else if (Ku.length > 0) {
						var c = Gu(e),
							u = Ku[0];
						this.w > c + u.w &&
							(Ku.shift(),
							this.el.appendChild(u.el),
							null != u.panel && ((u.panel.inEllipsis = !1), u.panel.update(), this.el.appendChild(u.panel.el)),
							this.children.unshift(u),
							(u.inEllipsis = !1));
					}
					0 === Ku.length && r.visible && r.setVisibility(!1), (Uu = !1);
					var f = {
						toLeft: !0,
						startPos: n.w - xn,
						hook: function (e) {
							null != e.panel && e.panel.update();
						},
					};
					'right' !== i.pos || G.model.rtl
						? G.model.rtl && ((f.toLeft = !1), (f.startPos = 0), (f.reverse = !1))
						: ((f.toLeft = !1), (f.startPos = 0), (f.reverse = !0)),
						this.flowChildren(f);
				}
			}
		},
	});
	var Yu = 'bottomBar';
	G.def(Yu, function (e) {
		var t,
			n = G.getNamespace(e),
			r = n.frame,
			i = n.topBar,
			o = n.navControls;
		return (
			qu(
				(t = {
					openPanels: {},
					tag: 'section',
					attrs: { id: Yu },
					overflow: 'visible',
					x: function () {
						return i.x;
					},
					y: function () {
						return r.h - Pn;
					},
					w: function () {
						return i.w;
					},
					h: Pn,
				}),
				'overflow',
				'visible',
			),
			qu(t, 'updateHook', function () {
				if (this.hasAllChildren()) {
					var e = G.model.rtl,
						t = this.children.playbackControls.children.seek;
					if (((t.width = 0), o.update(), this.children.playbackControls.visible && t.visible)) {
						var n = this.calcChildrensWidth() + xn,
							r = e ? 1 : 0,
							i =
								(this.children.filter(function (e) {
									return e.w > 0;
								}).length +
									r) *
								xn;
						t.width = this.w - n - i;
					}
					this.flowChildren({ alignChild: !0, bounds: { t: 0, b: this.h, l: 0, r: this.w }, rtl: !1, pad: xn, reverse: !0 });
				}
			}),
			qu(t, 'childVisibilityChangedHook', function () {
				this.update();
			}),
			qu(t, 'methods', {
				panelToggled: function (e, t) {
					(this.openPanels[e] = t),
						t
							? (this.el.style.zIndex = 11)
							: _.values(this.openPanels).every(function (e) {
									return !e;
							  }) && (this.el.style.zIndex = 3);
				},
			}),
			t
		);
	});
	var Xu = 'navControls';
	G.def(Xu, function () {
		var e = G.model.rtl;
		return {
			tag: 'nav',
			attrs: { id: Xu, 'aria-label': 'slide navigation' },
			w: function () {
				return this.width || 0;
			},
			h: Pn,
			yp: 'vertical-center',
			updateHook: function () {
				this.flowChildren({ rtl: e, startPos: -10, pad: xn, fullUpdate: !0, sizeToChildren: !0 });
			},
			parentAlign: e ? 'l' : 'r',
		};
	});
	var $u = 'miscControls',
		Ju = DS.detection.deviceView;
	function ef(e) {
		return (
			(ef =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			ef(e)
		);
	}
	function tf(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== ef(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== ef(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === ef(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	G.def($u, function (e) {
		var t = G.getNamespace(e).frame,
			n = G.model.rtl;
		return {
			attrs: { id: $u, 'aria-label': 'misc controls', role: 'region' },
			wp: function () {
				return this.width || 0;
			},
			wl: function () {
				return Ju.isPhone ? 58 : this.wp;
			},
			xp: function () {
				return this.left || 0;
			},
			yl: function () {
				return 0;
			},
			xl: function () {
				return Ju.isPhone ? this.parent.w - this.w : this.xp;
			},
			hp: function () {
				return Pn;
			},
			hl: function () {
				return Ju.isPhone ? t.h : this.hp;
			},
			overflow: 'visible',
			parentAlign: function () {
				return n ? 'l' : 'r';
			},
			beforeUpdateHook: function () {
				Ju.isPhone || this.flowChildren({ fullUpdate: !0, pad: xn, startPos: 0, sizeToChildren: !0, rtl: n });
			},
		};
	});
	var nf = DS,
		rf = nf._,
		of = nf.pubSub,
		af = nf.events,
		lf = nf.dom.toggleClasses,
		sf =
			(nf.shortcutManager,
			(function () {
				function e(t) {
					!(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, e),
						(this.view = t),
						rf.bindAll(this, 'onSlideChanged', 'onTimelineChanged', 'onPlaybackChanged'),
						of.on(af.slide.STARTED, this.onSlideChanged);
				}
				var t, n, r;
				return (
					(t = e),
					(n = [
						{
							key: 'teardown',
							value: function () {
								of.off(af.slide.STARTED, this.onSlideChanged);
							},
						},
						{
							key: 'onTimelineChanged',
							value: function (e, t) {
								e !== this.currTimeline &&
									(of.trigger(af.playbackControls.TIMELINE_CHANGED, e, t),
									null != this.currTimeline &&
										(this.currTimeline.off(af.timeline.PLAYING, this.onPlaybackChanged),
										this.currTimeline.off(af.timeline.PAUSED, this.onPlaybackChanged),
										this.currTimeline.off(af.timeline.ENDED, this.onPlaybackChanged)),
									(this.currTimeline = e),
									this.currTimeline.on(af.timeline.PLAYING, this.onPlaybackChanged),
									this.currTimeline.on(af.timeline.PAUSED, this.onPlaybackChanged),
									this.currTimeline.on(af.timeline.ENDED, this.onPlaybackChanged),
									this.onPlaybackChanged());
							},
						},
						{
							key: 'onPlaybackChanged',
							value: function () {
								var e = this.view.children,
									t = e.reset,
									n = e.playPause,
									r = null != this.currTimeline && 'playing' === this.currTimeline.playbackState();
								lf(document.body, 'timeline-playing', 'timeline-paused', r),
									lf(document.body, 'has-reset', 'no-reset', this.view.visible && null != t && t.visible),
									null != n && n.viewLogic.onPlaybackChanged();
							},
						},
						{
							key: 'onSlideChanged',
							value: function (e, t, n) {
								(this.view.el.tabIndex = 0),
									(this.view.el.tabIndex = -1),
									this.view.nameSpace === n &&
										(null != this.currSlide && this.currSlide.off(af.slide.CURRENT_TIMELINE, this.onTimelineChanged),
										(this.currSlide = t),
										this.currSlide.on(af.slide.CURRENT_TIMELINE, this.onTimelineChanged),
										this.onTimelineChanged(t.currentTimeline(), t));
							},
						},
					]) && tf(t.prototype, n),
					r && tf(t, r),
					Object.defineProperty(t, 'prototype', { writable: !1 }),
					e
				);
			})()),
		cf = DS.detection,
		uf = (cf.deviceView, cf.orientation, 'playbackControls');
	function ff(e) {
		return (
			(ff =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			ff(e)
		);
	}
	function df(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, gf(r.key), r);
		}
	}
	function hf() {
		return (
			(hf =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = vf(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			hf.apply(this, arguments)
		);
	}
	function pf(e, t) {
		return (
			(pf = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			pf(e, t)
		);
	}
	function yf(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = vf(e);
			if (t) {
				var i = vf(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === ff(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return bf(e);
			})(this, n);
		};
	}
	function bf(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function vf(e) {
		return (
			(vf = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			vf(e)
		);
	}
	function gf(e) {
		var t = (function (e, t) {
			if ('object' !== ff(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== ff(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === ff(t) ? t : String(t);
	}
	G.def(uf, sf, function (e) {
		var t = G.getNamespace(e).seek,
			n = G.model.rtl;
		return {
			attrs: { id: uf, 'aria-label': 'playback controls', role: 'region', tabindex: -1 },
			visibility: 'no-reflow',
			x: function () {
				return this.left || 0;
			},
			w: function () {
				return this.width + (t.visible ? 0 : t.w) || 0;
			},
			h: Pn,
			noUpdate: !0,
			beforeUpdateHook: function () {
				var e = this.hasAllChildren() && !this.children.playPause.visible ? xn : 0;
				this.flowChildren({ rtl: n, fullUpdate: !0, sizeToChildren: !0, startPos: e - xn, pad: xn });
			},
			parentAlign: function () {
				return n ? 'r' : 'l';
			},
		};
	});
	var mf = DS,
		wf = mf._,
		Sf = mf.utils,
		kf = mf.pubSub,
		Of = mf.events,
		Ef = mf.constants,
		Cf = mf.keyManager,
		xf = mf.focusManager,
		Lf = mf.dom,
		Pf = mf.dom,
		Tf = Pf.addClass,
		_f = Pf.removeClass,
		jf = mf.globalEventHelper,
		Df = jf.addBodyListener,
		Af = jf.removeBodyListener,
		If = mf.appState,
		Rf = 10,
		Bf = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && pf(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = yf(o);
			function o(e) {
				var t, n, r, a;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					(n = bf(t)),
					(a = !0),
					(r = gf((r = 'hasTooltip'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
					(t.isOpen = !1),
					(t.view.volumeStrength = Ef.DEFAULT_VOLUME * Rf),
					wf.bindAll(bf(t), 'onShow', 'onHide', 'onVolumeChanged', 'onInputChanged', 'toggleMute', 'onKeydown', 'onScroll'),
					t.volumeRangeEl.addEventListener('input', t.onInputChanged),
					t.el.addEventListener('mouseover', t.onShow),
					t.el.addEventListener('scroll', t.onScroll),
					t.buttonEl.addEventListener('click', t.toggleMute),
					kf.on(Of.volume.CHANGED, t.onVolumeChanged),
					If.setVolume(t.view.volumeStrength / Rf),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'tooltipKey',
						get: function () {
							return If.getVolume() > 0 ? 'acc_mute' : 'acc_unmute';
						},
					},
					{
						key: 'onVolumeChanged',
						value: function (e) {
							(e = Sf.clamp(0, Rf, e * Rf)), (this.view.volumeStrength = e), this.view.updateButton();
							var t = 0 === e;
							this.buttonEl.setAttribute('aria-pressed', t), this.volumeRangeEl.valueAsNumber !== e && (this.volumeRangeEl.value = e);
						},
					},
					{
						key: 'onHide',
						value: function (e) {
							var t = this;
							setTimeout(function () {
								var e = document.elementFromPoint(Lf.mouseX, Lf.mouseY);
								t.el.contains(e) ||
									'tooltip' === e.id ||
									((t.isOpen = !1), _f(t.el, 'open'), t.view.el.removeEventListener('mouseleave', t.onHide), Af('keydown', t.onKeydown), t.view.update());
							}, 200);
						},
					},
					{
						key: 'onShow',
						value: function () {
							this.isOpen ||
								((this.isOpen = !0),
								Tf(this.el, 'open'),
								this.view.el.addEventListener('mouseleave', this.onHide),
								Df('keydown', this.onKeydown),
								this.view.update());
						},
					},
					{
						key: 'onInputChanged',
						value: function (e) {
							var t = e.target.valueAsNumber;
							If.setVolume(t / Rf);
						},
					},
					{
						key: 'toggleMute',
						value: function (e) {
							If.onToggleVolume();
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							this.onShow(), this.onHoverIn(e), xf.setFocusRectOn(e.target);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							null != e &&
								this.isOpen &&
								!this.el.contains(e.relatedTarget) &&
								(this.onHoverOut(e), this.onHide(), hf(vf(o.prototype), 'onBlur', this).call(this));
						},
					},
					{
						key: 'onKeydown',
						value: function (e) {
							var t = e.which,
								n = this.volumeRangeEl.valueAsNumber,
								r = function (t) {
									If.setVolume(t / Rf), e.preventDefault();
								};
							document.activeElement !== this.volumeRangeEl &&
								(Cf.isDownishKey(t) || Cf.isPageDownKey(t)
									? r(n - 1)
									: Cf.isUpishKey(t) || Cf.isPageUpKey(t)
									? r(n + 1)
									: Cf.isEndKey(t)
									? r(Rf)
									: Cf.isHomeKey(t) && ((this.previousVolume = n), r(0)));
						},
					},
					{
						key: 'onScroll',
						value: function (e) {
							e.target.scrollTop = 0;
						},
					},
					{
						key: 'dismissTooltip',
						value: function () {
							hf(vf(o.prototype), 'dismissTooltip', this).call(this), this.onHide();
						},
					},
					{
						key: 'teardown',
						value: function () {
							kf.off(Of.volume.CHANGED, this.onVolumeChanged);
						},
					},
				]) && df(t.prototype, n),
				r && df(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Mf = Bf,
		Hf = 'volume',
		Nf = DS,
		Ff = Nf.utils.pxify,
		Wf = Nf.constants;
	function Vf(e) {
		return (
			(Vf =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Vf(e)
		);
	}
	function Uf(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Zf(r.key), r);
		}
	}
	function Kf(e, t) {
		return (
			(Kf = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Kf(e, t)
		);
	}
	function zf(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Gf(e);
			if (t) {
				var i = Gf(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Vf(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Qf(e);
			})(this, n);
		};
	}
	function Qf(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Gf(e) {
		return (
			(Gf = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Gf(e)
		);
	}
	function Zf(e) {
		var t = (function (e, t) {
			if ('object' !== Vf(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Vf(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Vf(t) ? t : String(t);
	}
	G.def(Hf, Mf, function (e) {
		var t = G.model,
			n = (G.model.rtl, G.getNamespace(e).bottomBar),
			r = de.getColor(e, '.cs-brandhighlight-bg', 'background', '.cs-base.cs-custom-theme');
		return {
			noUpdate: !0,
			attrs: { id: Hf, class: 'btn cs-volume cs-button volume-panel volume' },
			overflow: 'visible',
			w: 30,
			sliderH: function () {
				return 105;
			},
			h: function () {
				return this.viewLogic.isOpen ? this.sliderH : 30;
			},
			y: function () {
				return (this.el.style.top = Ff(this.viewLogic.isOpen ? -58 : 17, !1)), 0;
			},
			html: function () {
				return (
					(this.volumeStrength = this.volumeStrength || 10 * Wf.DEFAULT_VOLUME),
					'<button\n      data-ref="button"\n      class="cs-button"\n      aria-label="'
						.concat(
							t.getString(this.volumeStrength > 0 ? 'acc_mute' : 'acc_unmute'),
							'"\n      aria-pressed="false"\n      tabIndex="0"\n      >\n      </button>\n      <div data-ref="sliderBar" class="slider-bar btn" style="width: ',
						)
						.concat(Ff(this.w), '; height: ')
						.concat(
							Ff(75),
							'">\n        <input\n          type="range"\n          class="cs-volume volume-range"\n          data-ref="volumeRange"\n          aria-label="',
						)
						.concat(t.getString('acc_volume'), '"\n          min="0"\n          max="')
						.concat(10, '"\n          step="1"\n          value="')
						.concat(
							this.volumeStrength,
							'"\n          tabIndex="0"\n          aria-orientation="vertical" />\n        <div class="volume-track"></div>\n        <div data-ref="volumeProgress"\n          class="volume-progress cs-brandhighlight-bg"\n          style="background: ',
						)
						.concat(r, ';"></div>\n        <div data-ref="volumeDot" class="volume-dot"></div>\n      </div>')
				);
			},
			updateHook: function () {
				n.panelToggled('volume', this.viewLogic.isOpen);
			},
			methods: {
				updateButton: function () {
					var e = this.volumeStrength / 10;
					(this.children.button.el.innerHTML = Yn('volume')(this.volumeStrength)),
						this.children.button.el.setAttribute('aria-label', t.getString(this.volumeStrength > 0 ? 'acc_mute' : 'acc_unmute')),
						(this.children.volumeDot.el.style.top = Ff(55 * (1 - e))),
						(this.children.volumeProgress.el.style.height = Ff(55 * e));
				},
				updateDomStrings: function () {
					this.viewLogic.buttonEl.setAttribute('aria-label', t.getString('acc_volume')),
						this.viewLogic.volumeRangeEl.setAttribute('aria-label', t.getString('acc_volume'));
				},
			},
		};
	});
	var qf = DS,
		Yf = qf.pubSub,
		Xf = qf.captionsManager,
		$f = qf.stringTabler,
		Jf = qf.events.captions,
		ed = Jf.SHOW_BUTTON,
		td = Jf.HIDE_BUTTON,
		nd = Jf.ENABLED,
		rd = Jf.ENABLE,
		id = qf.detection.theme.isUnified,
		od = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Kf(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = zf(o);
			function o(e) {
				var t, n, r, a;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					(n = Qf(t)),
					(a = !0),
					(r = Zf((r = 'hasTooltip'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
					t.onClick(t.onClickCaptions),
					(t.toggle = !1),
					Yf.on(ed, function (e) {
						return t.onVisibilityChanged(!0);
					}),
					Yf.on(td, function (e) {
						return t.onVisibilityChanged(!1);
					}),
					Yf.on(nd, t.onCaptionsEnabled.bind(Qf(t))),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'tooltipKey',
						get: function () {
							return this.toggle ? 'acc_cc_hide' : 'acc_cc_show';
						},
					},
					{
						key: 'onVisibilityChanged',
						value: function (e) {
							this.view.setVisibility(e, !0), this.view.childVisibilityChanged(), (this.toggle = Xf.isCaptionEnabled()), this.updateBtn();
						},
					},
					{
						key: 'onCaptionsEnabled',
						value: function (e) {
							(this.toggle = e), this.updateBtn();
						},
					},
					{
						key: 'updateBtn',
						value: function () {
							var e = this.toggle ? 'add' : 'remove';
							this.view.el.classList[e]('cs-tabs', 'cs-selected'),
								this.view.el.setAttribute('aria-pressed', this.toggle),
								this.view.el.setAttribute('aria-label', $f.getString(this.toggle ? 'acc_cc_hide' : 'acc_cc_show')),
								id && this.view.updateHtml();
						},
					},
					{
						key: 'onClickCaptions',
						value: function (e) {
							this.toggleCaptions();
						},
					},
					{
						key: 'toggleCaptions',
						value: function () {
							(this.toggle = !this.toggle), Yf.trigger(rd, this.toggle), this.updateBtn();
						},
					},
					{
						key: 'getViewBox',
						value: function () {
							var e = this.view.getBox(),
								t = (e.h - 30) / 2;
							return (e.h = 30), (e.y = e.y + t), e;
						},
					},
					{
						key: 'teardown',
						value: function () {
							Yf.off(ed), Yf.off(td), Yf.off(nd);
						},
					},
				]) && Uf(t.prototype, n),
				r && Uf(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		ad = od,
		ld = (DS.flagManager, 'captions');
	function sd(e) {
		return (
			(sd =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			sd(e)
		);
	}
	function cd(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, yd(r.key), r);
		}
	}
	function ud(e, t) {
		return (
			(ud = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ud(e, t)
		);
	}
	function fd(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = hd(e);
			if (t) {
				var i = hd(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === sd(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return dd(e);
			})(this, n);
		};
	}
	function dd(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function hd(e) {
		return (
			(hd = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			hd(e)
		);
	}
	function pd(e, t, n) {
		return (t = yd(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function yd(e) {
		var t = (function (e, t) {
			if ('object' !== sd(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== sd(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === sd(t) ? t : String(t);
	}
	G.def(ld, ad, function () {
		return {
			tag: 'button',
			attrs: { id: ld, class: 'cs-button btn content-center', 'aria-pressed': !1, tabindex: 0 },
			minW: 34,
			minH: Pn,
			y: 'vertical-center',
			noUpdate: !0,
			parentAlign: 'l',
			visible: !1,
			updateHook: function () {
				this.el.setAttribute('aria-label', G.model.getString(this.toggle ? 'acc_cc_hide' : 'acc_cc_show'));
			},
			html: function () {
				var e = null != this.viewLogic && this.viewLogic.toggle,
					t = de.getColor(DS.constants.refs.FRAME, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme');
				return '\n        <style>\n          #captions.cs-button:after {\n            background: '
					.concat(e ? t : 'transparent', ';\n          }\n        </style>\n        ')
					.concat(Yn('captions')(), '\n        ');
			},
		};
	});
	var bd = DS,
		vd = bd._,
		gd = bd.events,
		md = bd.pubSub,
		wd = bd.detection,
		Sd = bd.dom.tappedClass,
		kd = bd.keyManager,
		Od = bd.stringTabler,
		Ed = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && ud(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = fd(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					pd(dd((t = i.call(this, e))), 'hasTooltip', !0),
					pd(dd(t), 'onTap', function (e) {
						Sd(t.el);
					}),
					pd(dd(t), 'onClickBtn', function (e) {
						1 !== t.currTimeline.progress() ? t.currTimeline.togglePlayback() : wd.theme.isUnified && t.currTimeline.reset();
					}),
					pd(dd(t), 'onKeydown', function (e) {
						var t = e.which;
						kd.isSeekKey(t) && md.trigger(gd.player.SEEK, e);
					}),
					pd(dd(t), 'onPlaybackChanged', function () {
						t.updateToggle(), t.updateView();
					}),
					vd.bindAll(dd(t), 'onTimelineChanged'),
					md.on(gd.player.TOGGLE_PLAYBACK, t.onClickBtn),
					md.on(gd.playbackControls.TIMELINE_CHANGED, t.onTimelineChanged),
					wd.deviceView.isMobile && t.onClick(t.onTap),
					t.onClick(t.onClickBtn),
					t.el.addEventListener('keydown', t.onKeydown),
					(t.view.toggle = !0),
					wd.deviceView.isMobile && md.on(gd.currTimeline.TICK, t.onTick.bind(dd(t))),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'tooltipKey',
						get: function () {
							return this.view.toggle ? 'acc_pause' : 'acc_play';
						},
					},
					{
						key: 'teardown',
						value: function () {
							md.off(gd.currTimeline.TICK, this.onTick.bind(this));
						},
					},
					{
						key: 'onTick',
						value: function (e) {
							null != this.circleProgress && this.circleProgress.setAttribute('d', DS.svgUtils.wheelPath(17, 17, 17, 0, 360 * e)), (this.lastProgress = e);
						},
					},
					{
						key: 'updateView',
						value: function () {
							this.view.updateHtml(), (this.circleProgress = this.el.querySelector('.circle-progress path')), this.onTick(this.lastProgress);
						},
					},
					{
						key: 'updateToggle',
						value: function () {
							(this.view.toggle = 'playing' === this.currTimeline.playbackState()),
								this.view.el.setAttribute('aria-pressed', !this.view.toggle),
								this.view.el.setAttribute('aria-label', Od.getString(this.view.toggle ? 'acc_pause' : 'acc_play'));
						},
					},
					{
						key: 'onTimelineChanged',
						value: function (e) {
							(this.currTimeline = e), (this.view.toggle = this.currTimeline.isPlaying()), this.updateView();
						},
					},
				]) && cd(t.prototype, n),
				r && cd(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Cd = Ed,
		xd = DS.stringTabler,
		Ld = 'playPause';
	function Pd(e) {
		return (
			(Pd =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Pd(e)
		);
	}
	function Td(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Rd(r.key), r);
		}
	}
	function _d(e, t) {
		return (
			(_d = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			_d(e, t)
		);
	}
	function jd(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Ad(e);
			if (t) {
				var i = Ad(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Pd(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Dd(e);
			})(this, n);
		};
	}
	function Dd(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Ad(e) {
		return (
			(Ad = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Ad(e)
		);
	}
	function Id(e, t, n) {
		return (t = Rd(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function Rd(e) {
		var t = (function (e, t) {
			if ('object' !== Pd(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Pd(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Pd(t) ? t : String(t);
	}
	G.def(Ld, Cd, function () {
		return {
			tag: 'button',
			attrs: { id: Ld, class: 'content-center cs-button', 'aria-pressed': !1, 'aria-label': xd.getString('acc_pause'), tabindex: 0 },
			contentStyle: { width: '34px', height: '34px' },
			style: { background: 'transparent', border: 'none' },
			html: function () {
				return this.toggle ? Yn('pause')() : Yn('play')();
			},
			methods: {
				updateDomStrings: function () {
					this.el.setAttribute('aria-label', this.toggle ? G.model.getString('acc_pause') : G.model.getString('acc_play'));
				},
			},
			calcTextSize: !0,
			y: 'vertical-center',
			padLeft: 6,
			padRight: 6,
			minH: 34,
			minW: 34,
			z: 1,
		};
	});
	var Bd = DS,
		Md = Bd._,
		Hd = Bd.detection,
		Nd = Bd.utils,
		Fd = Bd.keyManager,
		Wd = Bd.dom,
		Vd = Bd.dom,
		Ud = Vd.addClass,
		Kd = Vd.removeClass,
		zd = Bd.globalEventHelper.addWindowListener,
		Qd = Bd.events,
		Gd = Bd.pubSub,
		Zd =
			(Bd.stringTabler,
			function (e) {
				for (; e.startsWith('0') && !e.startsWith('0:'); ) e = e.substring(1);
				return e;
			}),
		qd = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && _d(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = jd(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					Id(Dd((t = i.call(this, e))), 'hasTooltip', !0),
					Id(Dd(t), 'tooltipMoves', !0),
					Md.bindAll(Dd(t), 'onTick', 'onSeek', 'onMouseDown', 'onMouseUp', 'onMouseMove', 'checkSeekable', 'onKeydown', 'onTimelineChanged', 'onChange'),
					Gd.on(Qd.slide.STARTED, t.checkSeekable),
					Gd.on(Qd.player.SEEK, t.onKeydown),
					Gd.on(Qd.playbackControls.TIMELINE_CHANGED, t.onTimelineChanged),
					(t.isUserControlled = !G.model.frame.controlOptions.controls.readonly || G.model.frame.controlOptions.controls.readonlyOnce),
					t.bindListeners(),
					(t.isUp = !0),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'bindListeners',
						value: function () {
							if (this.isUserControlled) {
								var e = Hd.deviceView.isClassicDesktop ? this.seekEl : this.view.el;
								Hd.device.isMobile
									? (e.addEventListener('touchstart', this.onMouseDown), (this.seekEvent = 'touchmove'), (this.endEvent = 'touchend'))
									: (e.addEventListener('mousedown', this.onMouseDown),
									  e.addEventListener('keydown', this.onKeydown),
									  (this.seekEvent = 'mousemove'),
									  (this.endEvent = 'mouseup')),
									this.progressBarEl.addEventListener('change', this.onChange);
							}
						},
					},
					{
						key: 'isSeekable',
						value: function () {
							if (null == this.currSlide) return !1;
							var e = G.model.frame.controlOptions.controls,
								t = e.readonly,
								n = e.readonlyOnce;
							return !((t && !n) || (n && !this.currSlide.currentTimelineCompletedOnce()));
						},
					},
					{
						key: 'getSeekValue',
						value: function (e) {
							var t = this.view.getBox();
							return Nd.clamp(0, 1, (e - t.x) / t.w);
						},
					},
					{
						key: 'getEventX',
						value: function (e) {
							return Hd.device.isMobile ? e.touches[0] && e.touches[0].pageX : e.pageX;
						},
					},
					{
						key: 'onTimelineChanged',
						value: function (e, t) {
							null != this.currTimeline &&
								(this.currTimeline.off(Qd.timeline.TICK, this.onTick), this.currTimeline.off(Qd.timeline.COMPLETE, this.checkSeekable)),
								(this.currSlide = t),
								(this.currTimeline = e),
								this.currTimeline.on(Qd.timeline.TICK, this.onTick),
								this.currTimeline.on(Qd.timeline.COMPLETE, this.checkSeekable);
							var n = this.currTimeline.progress();
							(this.duration = Nd.toSeconds(this.currTimeline.timelineDuration())),
								(this.progressBarEl.max = Math.round(1e3 * this.duration)),
								(this.progressBarEl.step = 100),
								isNaN(n) && (n = 0),
								this.onTick(n),
								this.checkSeekable();
						},
					},
					{
						key: 'checkSeekable',
						value: function () {
							this.isSeekable()
								? (Kd(this.el, 'read-only'), (this.progressBarEl.disabled = !1))
								: (Ud(this.el, 'read-only'), (this.progressBarEl.disabled = !0));
						},
					},
					{
						key: 'onTick',
						value: function (e) {
							var t = 100 * e;
							(this.progressBarFillEl.style.width = ''.concat(t, '%')),
								this.progressBarEl.setAttribute('aria-valuetext', ''.concat(Math.round(t), '%')),
								(this.progressBarEl.value = this.currTimeline.timeline ? this.currTimeline.timeline.currentTime : 0),
								Gd.trigger(Qd.currTimeline.TICK, e, Math.floor(this.progressBarEl.value));
						},
					},
					{
						key: 'onSeek',
						value: function (e) {
							var t = this;
							e.preventDefault(),
								e.stopPropagation(),
								(this.seeking = !0),
								!0 !== this.isUp &&
									this.currTimeline.isPlaying() &&
									(this.currTimeline.pause(!0),
									this.currTimeline.on(Qd.timeline.AFTER_SEEK_UPDATE, function e() {
										t.currTimeline.play(), t.currTimeline.off(Qd.timeline.AFTER_SEEK_UPDATE, e);
									}));
							var n = this.getEventX(e);
							null != n && this.currTimeline.progress(this.getSeekValue(n)), (this.isUp = !1);
						},
					},
					{
						key: 'seekBy',
						value: function (e, t) {
							var n = this;
							e.preventDefault();
							var r = (this.currTimeline.elapsedTime() + t) / this.currTimeline.duration();
							this.currTimeline.onSeekStart(),
								this.currTimeline.progress(r),
								this.currTimeline.onSeekEnd(),
								this.currTimeline.isPlaying() &&
									(this.currTimeline.pause(),
									setTimeout(function () {
										return n.currTimeline.play();
									}, 125));
						},
					},
					{
						key: 'isEnded',
						value: function () {
							return this.currTimeline.progress() >= 1;
						},
					},
					{
						key: 'onChange',
						value: function (e) {
							this.currTimeline.progress(this.progressBarEl.value / this.progressBarEl.max);
						},
					},
					{
						key: 'onMouseDown',
						value: function (e) {
							(this.isUp = !1),
								(this.removeEndListener = zd(this.endEvent, this.onMouseUp)),
								(this.removeSeekListener = zd(this.seekEvent, this.onSeek)),
								this.currTimeline.onSeekStart(),
								this.onSeek(e);
						},
					},
					{
						key: 'onMouseUp',
						value: function (e) {
							this.onSeek(e), this.removeEndListener(), this.removeSeekListener(), (this.isUp = !0), this.currTimeline.onSeekEnd();
						},
					},
					{
						key: 'onKeydown',
						value: function (e) {
							var t = e.which;
							Fd.isActionKey(t)
								? Gd.trigger(Qd.player.TOGGLE_PLAYBACK)
								: this.isSeekable() &&
								  (Fd.isDownishKey(t)
										? this.seekBy(e, -100)
										: Fd.isPageDownKey(t)
										? this.seekBy(e, -1e3)
										: Fd.isUpishKey(t)
										? this.seekBy(e, 100)
										: Fd.isPageUpKey(t) && this.seekBy(e, 1e3));
						},
					},
					{
						key: 'getViewBox',
						value: function (e) {
							var t = this.view.getBox();
							return null != e && ((t.x = 'focusin' === e.type ? t.x + t.w / 2 : e.pageX), (t.w = 2)), t;
						},
					},
					{
						key: 'onMouseMove',
						value: function (e) {
							bt.updateTooltip(e.pageX, this.getTooltipString());
						},
					},
					{
						key: 'setForFollowMouse',
						value: function () {
							this.el.addEventListener('mousemove', this.onMouseMove);
						},
					},
					{
						key: 'stopFollowMouse',
						value: function () {
							this.el.removeEventListener('mousemove', this.onMouseMove);
						},
					},
					{
						key: 'getTooltipString',
						value: function (e) {
							if (null != this.duration) {
								this.view.getBox().x;
								var t = this.getSeekValue(Wd.mouseX) * this.duration;
								null != e && 'focusin' === e.type && (t = Math.floor(Nd.toSeconds(this.progressBarEl.value)));
								var n = Nd.formatSecondsAsTime(t),
									r = Nd.formatSecondsAsTime(this.duration);
								return ''.concat(Zd(n), ' / ').concat(Zd(r));
							}
						},
					},
				]) && Td(t.prototype, n),
				r && Td(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Yd = qd;
	function Xd(e) {
		return (
			(Xd =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Xd(e)
		);
	}
	function $d(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Xd(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Xd(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Xd(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Jd() {
		return (
			(Jd =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = rh(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			Jd.apply(this, arguments)
		);
	}
	function eh(e, t) {
		return (
			(eh = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			eh(e, t)
		);
	}
	function th(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = rh(e);
			if (t) {
				var i = rh(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Xd(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return nh(e);
			})(this, n);
		};
	}
	function nh(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function rh(e) {
		return (
			(rh = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			rh(e)
		);
	}
	var ih = DS,
		oh = ih._,
		ah = ih.pubSub,
		lh = ih.events,
		sh = ih.dom,
		ch = ih.utils.pxify,
		uh = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && eh(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = th(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					oh.bindAll(nh(t), 'onSlideStarted', 'onStartProgressDetails', 'onStopProgressDetails', 'animateProgressDetails'),
					ah.on(lh.slide.STARTED, t.onSlideStarted),
					t.resetPreviewWidths(),
					t.isUserControlled &&
						(t.view.el.addEventListener('mouseenter', t.onStartProgressDetails), t.view.el.addEventListener('mouseleave', t.onStopProgressDetails)),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onTick',
						value: function (e) {
							Jd(rh(o.prototype), 'onTick', this).call(this, e), (this.progress = e);
						},
					},
					{
						key: 'resetPreviewWidths',
						value: function () {
							(this.previewWidth = 0), (this.prevProgWidth = 0);
						},
					},
					{
						key: 'onSlideStarted',
						value: function () {
							this.resetPreviewWidths();
						},
					},
					{
						key: 'onStartProgressDetails',
						value: function () {
							this.animateProgressDetails();
						},
					},
					{
						key: 'onStopProgressDetails',
						value: function () {
							window.cancelAnimationFrame(this.detailsId);
						},
					},
					{
						key: 'updatePreviewEls',
						value: function () {
							(this.progressPreviewEl.style.width = ch(this.previewWidth)), (this.prevProgressPreviewEl.style.width = ch(this.prevProgWidth));
						},
					},
					{
						key: 'animateProgressDetails',
						value: function () {
							var e = this.view.getBox(),
								t = sh.mouseX - e.x,
								n = this.progress * e.w,
								r = n - e.w * (t / e.w);
							t >= n && (r = 0),
								(this.previewWidth = Math.min(e.w, t)),
								(this.prevProgWidth = Math.min(n, r)),
								this.updatePreviewEls(),
								(this.detailsId = window.requestAnimationFrame(this.animateProgressDetails));
						},
					},
				]),
				n && $d(t.prototype, n),
				r && $d(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Yd),
		fh = uh,
		dh = (DS.detection.device.isMobile, 'seek');
	function hh(e) {
		return (
			(hh =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			hh(e)
		);
	}
	function ph(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, wh(r.key), r);
		}
	}
	function yh(e, t) {
		return (
			(yh = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			yh(e, t)
		);
	}
	function bh(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = gh(e);
			if (t) {
				var i = gh(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === hh(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return vh(e);
			})(this, n);
		};
	}
	function vh(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function gh(e) {
		return (
			(gh = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			gh(e)
		);
	}
	function mh(e, t, n) {
		return (t = wh(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function wh(e) {
		var t = (function (e, t) {
			if ('object' !== hh(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== hh(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === hh(t) ? t : String(t);
	}
	G.def(dh, fh, function (e) {
		var t = G.model,
			n = G.model.frame.controlOptions.controls,
			r = n.readonly,
			i = de.getColor(e, '.cs-seekcontrol', 'border-top-color'),
			o = de.getColor(e, '.cs-seekcontrol', 'background-image').replace('(, ', '(180deg,'),
			a = G.getNamespace(e).slide;
		return {
			attrs: { id: dh, tabindex: -1, class: 'progress-bar cs-seekcontrol '.concat(r ? 'read-only' : '') },
			y: 'vertical-center',
			overflow: 'visible',
			noUpdate: !0,
			w: function () {
				return this.width || 0;
			},
			h: 30,
			updateHook: function () {
				var e = this,
					t = this.el.offsetParent;
				if (DS.detection.deviceView.isPhone && DS.detection.orientation.isLandscape && null != t) {
					var n = a.el.getBoundingClientRect(),
						r = n.height + n.top,
						i = t.getBoundingClientRect(),
						o = this.children.seek.el.getBoundingClientRect(),
						l = i.top + o.top - this.el.getBoundingClientRect().top + o.height;
					(this.el.style.top = ''.concat(r - l, 'px')),
						(this.el.style.width = ''.concat(n.width, 'px')),
						(this.el.style.left = ''.concat(n.left - i.left, 'px')),
						(this.el.style.transform = 'none');
					var s = 0;
					requestAnimationFrame(function t() {
						s++;
						var r = a.el.getBoundingClientRect();
						r.top !== n.top || r.left !== n.left || r.width !== n.width || r.height !== n.height ? e.updateHook() : s < 10 && requestAnimationFrame(t);
					});
				}
			},
			html: '\n      <style>\n        #seek:before {\n          border: 1px solid '
				.concat(i, ';\n          background-image: ')
				.concat(
					o,
					';\n          background-repeat: no-repeat !important;\n        }\n      </style>\n\n      <div class="cs-seekbar-inner progress-bar-inner slide-lockable">\n        <div data-ref="seek" class="cs-seek progress-bar-seek">\n          <div class="progress-bar-fill-preview cs-fill" data-ref="progressPreview"></div>\n          <input\n            tabIndex="0"\n            type="range"\n            aria-hidden="',
				)
				.concat(!n.seekbar, '"\n            aria-label="')
				.concat(
					t.getString('acc_slide_progress'),
					'"\n            data-ref="progressBar">\n          <div class="cs-fill cs-brandhighlight-bg progress-bar-fill" style="width: 0px" data-ref="progressBarFill">\n            <div class="prev-progress-bar-fill-preview cs-fill" data-ref="prevProgressPreview"></div>\n          </div>\n        </div>\n      </div>\n    ',
				),
			methods: {
				updateDomStrings: function () {
					this.viewLogic.progressBarEl.setAttribute('aria-label', t.getString('acc_slide_progress'));
				},
			},
		};
	});
	var Sh = DS,
		kh = Sh._,
		Oh = Sh.events,
		Eh = Sh.pubSub,
		Ch = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && yh(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = bh(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					mh(vh((t = i.call(this, e))), 'hasTooltip', !0),
					mh(vh(t), 'tooltipKey', 'acc_replay'),
					kh.bindAll(vh(t), 'onClickBtn', 'onTimelineChanged'),
					t.onClick(t.onClickBtn),
					Eh.on(Oh.playbackControls.TIMELINE_CHANGED, t.onTimelineChanged),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onClickBtn',
						value: function () {
							this.resetTimeline();
						},
					},
					{
						key: 'resetTimeline',
						value: function () {
							this.currTimeline.reset();
						},
					},
					{
						key: 'onTimelineChanged',
						value: function (e) {
							this.currTimeline = e;
						},
					},
				]) && ph(t.prototype, n),
				r && ph(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		xh = Ch,
		Lh = 'reset';
	G.def(Lh, xh, function () {
		return {
			tag: 'button',
			ariaStringId: 'acc_replay',
			attrs: { id: Lh, class: 'content-center cs-button', 'aria-label': ''.concat(G.model.getString('acc_replay')), tabindex: 0 },
			style: { background: 'transparent', border: 'none' },
			html: Yn('replay')(),
			z: 1,
			y: 'vertical-center',
			padRight: 10,
			minH: 30,
			minW: 30,
		};
	});
	var Ph = function () {
			return 'no icon';
		},
		Th = {
			next: function () {
				return '\n  <svg class="cs-icon next-icon" width="10px" height="18px" viewBox="0 -1 10 18" focusable="false">\n    <path transform="rotate(180, 5, 8)" d="M2.81685219,7.60265083 L9.00528946,1.41421356 L7.5910759,-1.27897692e-13 L1.55431223e-13,7.5910759 L0.0115749356,7.60265083 L1.55431223e-13,7.61422577 L7.5910759,15.2053017 L9.00528946,13.7910881 L2.81685219,7.60265083 Z" stroke="none" fillRule="evenodd"></path>\n  </svg>';
			},
			prev: function () {
				return '\n  <svg class="cs-icon prev-icon" width="10px" height="18px" viewBox="0 -1 10 18" focusable="false">\n    <path transform="translate(0, 1)" d="M2.81685219,7.60265083 L9.00528946,1.41421356 L7.5910759,-1.27897692e-13 L1.55431223e-13,7.5910759 L0.0115749356,7.60265083 L1.55431223e-13,7.61422577 L7.5910759,15.2053017 L9.00528946,13.7910881 L2.81685219,7.60265083 Z" stroke="none" fillRule="evenodd"></path>\n  </svg>\n';
			},
			submit: function () {
				return '\n   <svg class="cs-icon check-icon" width="17px" height="18px" viewBox="0 0 17 16" focusable="false">\n    <path stroke="none" transform="translate(0, 1)" d="M 17 1.4 L 15.6 0 5.7 9.9 1.4 5.65 0 7.05 5.65 12.75 5.7 12.75 17 1.4 Z"/>\n  </svg>';
			},
			replay: function () {
				return '<svg class="cs-icon" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" focusable="false">\n    <path fill="#FFFFFF" stroke="none" d="\n      M 10.95 8.75\n      Q 11 9 11 9.25 10.95 11.15 9.7 12.4 8.4 13.7 6.5 13.75 4.6 13.7 3.3 12.4 2.05 11.15 2 9.25 2.05 7.3 3.3 6.05 4.398828125 4.998828125 6 4.75\n      L 6 6.9\n      Q 6.05 7.75 6.85 7.35\n      L 11.35 4.3\n      Q 11.7 4.05 11.7 3.75 11.7 3.45 11.35 3.2\n      L 6.85 0.15\n      Q 6.05 -0.3 6 0.6\n      L 6 2.75\n      Q 3.4517578125 3.001171875 1.8 4.75 0.05 6.6 0 9.25 0.05 12 1.9 13.85 3.75 15.65 6.5 15.75 9.25 15.65 11.1 13.85 12.95 12 13 9.25 13 9 13 8.75\n      L 10.95 8.75 Z"/>\n    </svg>';
			},
			play: function () {
				return '<svg id="icon-play" class="cs-icon play-icon" width="11" height="13" viewBox="0 0 11 13" focusable="false">\n    <path d="M 0.851 13.011 C 0.381 13.295 0 13.068 0 12.526 L 0 0.771 C 0 0.219 0.378 0 0.854 0.288 L 10.507 6.132 C 10.979 6.417 10.981 6.878 10.504 7.168 L 6.307 9.708 L 0.851 13.011 Z"></path>\n  </svg>';
			},
			pause: function () {
				return '<svg id="icon-pause" class="cs-icon pause-icon" width="9" height="14" viewBox="0 0 9 14" focusable="false">\n    <g>\n       <rect x="0" width="3" height="14"/>\n       <rect x="6" width="3" height="14"/>\n    </g>\n  </svg>';
			},
			volume: function (e, t) {
				var n = Math.min(1, e / 5),
					r = Math.min(1, Math.max(0, e / 5 - 0.5));
				return '<svg class="cs-icon volume-icon '
					.concat(
						t ? 'volume-icon-selected' : '',
						'" width="16px" height="14px" viewBox="0 -3 16 14" focusable="false">\n    <g transform="translate(0, -3)">\n      <rect x="0" y="4" width="3" height="6"></rect>\n      <polygon points="4 4 9 0 9 14 4 10"></polygon>\n      <g transform="translate(10, 0)">\n        <mask id="vol-mask" fill="white">\n          <rect id="path-1" x="0" y="0" width="8" height="14"></rect>\n        </mask>\n        <circle strokeWidth="1.5" style="opacity: ',
					)
					.concat(r, ';" mask="url(#vol-mask)" fill="none" cx="-1" cy="7" r="6.5"></circle>\n        <circle strokeWidth="1.5" style="opacity: ')
					.concat(n, ';" mask="url(#vol-mask)" fill="none" cx="-1" cy="7" r="3.5"></circle>\n      </g>\n    </g>\n  </svg>');
			},
			captionsOn: function (e) {
				return '<svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n            <path fill="#FFFFFF" stroke="none" d="M 19 2 Q 19 1.15 18.4 0.6 17.85 0 17 0 L 2 0 Q 1.15 0 0.6 0.6 0 1.15 0 2 L 0 12 Q 0 12.85 0.6 13.4 1.15 14 2 14 L 7.6 14 9.5 15.9 11.4 14 17 14 Q 17.85 14 18.4 13.4 19 12.85 19 12 L 19 2 M 15.7 4.2 L 15.25 4.85 Q 15.15 4.9 15.1 5 15 5.05 14.85 5.05 14.75 5.05 14.6 4.95 14.5 4.9 14.3 4.8 14.15 4.65 13.9 4.6 13.65 4.5 13.3 4.5 12.85 4.5 12.5 4.7 12.15 4.85 11.9 5.15 11.7 5.45 11.6 5.9 11.45 6.35 11.45 6.9 11.5 7.45 11.6 7.9 11.7 8.35 11.95 8.65 12.2 8.95 12.5 9.15 12.85 9.3 13.25 9.3 13.65 9.3 13.9 9.2 14.2 9.1 14.35 8.95 14.5 8.85 14.65 8.75 14.8 8.65 14.95 8.65 15.15 8.65 15.25 8.8 L 15.75 9.4 Q 15.45 9.75 15.15 10 14.8 10.2 14.45 10.35 14.05 10.5 13.7 10.55 13.3 10.6 12.95 10.6 12.25 10.6 11.65 10.35 11.1 10.1 10.65 9.65 10.2 9.15 9.95 8.45 9.7 7.75 9.7 6.9 9.7 6.1 9.95 5.4 10.15 4.75 10.6 4.25 11.05 3.75 11.7 3.5 12.35 3.2 13.2 3.2 14 3.2 14.6 3.45 15.2 3.7 15.7 4.2 M 5.85 4.7 Q 5.5 4.85 5.25 5.15 5.05 5.45 4.95 5.9 4.8 6.35 4.8 6.9 4.85 7.45 4.95 7.9 5.05 8.35 5.3 8.65 5.55 8.95 5.85 9.15 6.2 9.3 6.6 9.3 7 9.3 7.25 9.2 7.55 9.1 7.7 8.95 7.85 8.85 8 8.75 8.15 8.65 8.3 8.65 8.5 8.65 8.6 8.8 L 9.1 9.4 Q 8.8 9.75 8.5 10 8.15 10.2 7.8 10.35 7.4 10.5 7.05 10.55 6.65 10.6 6.3 10.6 5.6 10.6 5 10.35 4.45 10.1 4 9.65 3.55 9.15 3.3 8.45 3.05 7.75 3.05 6.9 3.05 6.1 3.3 5.4 3.5 4.75 3.95 4.25 4.4 3.75 5.05 3.5 5.7 3.2 6.55 3.2 7.35 3.2 7.95 3.45 8.55 3.7 9.05 4.2 L 8.6 4.85 Q 8.5 4.9 8.45 5 8.35 5.05 8.2 5.05 8.1 5.05 7.95 4.95 7.85 4.9 7.65 4.8 7.5 4.65 7.25 4.6 7 4.5 6.65 4.5 6.2 4.5 5.85 4.7 Z"/>\n          </svg>';
			},
			captionsOff: function (e) {
				return '<svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n            <g>\n              <path d="M 11.45 3.5 Q 10.8 3.75 10.35 4.25 9.9 4.75 9.7 5.4 9.45 6.1 9.45 6.9 9.45 7.75 9.7 8.45 9.95 9.15 10.4 9.65 10.85 10.1 11.4 10.35 12 10.6 12.7 10.6 13.05 10.6 13.45 10.55 13.8 10.5 14.2 10.35 14.55 10.2 14.9 10 15.2 9.75 15.5 9.4 L 15 8.8 Q 14.9 8.65 14.7 8.65 14.55 8.65 14.4 8.75 14.25 8.85 14.1 8.95 13.95 9.1 13.65 9.2 13.4 9.3 13 9.3 12.6 9.3 12.25 9.15 11.95 8.95 11.7 8.65 11.45 8.35 11.35 7.9 11.25 7.45 11.2 6.9 11.2 6.35 11.35 5.9 11.45 5.45 11.65 5.15 11.9 4.85 12.25 4.7 12.6 4.5 13.05 4.5 13.4 4.5 13.65 4.6 13.9 4.65 14.05 4.8 14.25 4.9 14.35 4.95 14.5 5.05 14.6 5.05 14.75 5.05 14.85 5 14.9 4.9 15 4.85 L 15.45 4.2 Q 14.95 3.7 14.35 3.45 13.75 3.2 12.95 3.2 12.1 3.2 11.45 3.5 M 5.6 4.7 Q 5.95 4.5 6.4 4.5 6.75 4.5 7 4.6 7.25 4.65 7.4 4.8 7.6 4.9 7.7 4.95 7.85 5.05 7.95 5.05 8.1 5.05 8.2 5 8.25 4.9 8.35 4.85 L 8.8 4.2 Q 8.3 3.7 7.7 3.45 7.1 3.2 6.3 3.2 5.45 3.2 4.8 3.5 4.15 3.75 3.7 4.25 3.25 4.75 3.05 5.4 2.8 6.1 2.8 6.9 2.8 7.75 3.05 8.45 3.3 9.15 3.75 9.65 4.2 10.1 4.75 10.35 5.35 10.6 6.05 10.6 6.4 10.6 6.8 10.55 7.15 10.5 7.55 10.35 7.9 10.2 8.25 10 8.55 9.75 8.85 9.4 L 8.35 8.8 Q 8.25 8.65 8.05 8.65 7.9 8.65 7.75 8.75 7.6 8.85 7.45 8.95 7.3 9.1 7 9.2 6.75 9.3 6.35 9.3 5.95 9.3 5.6 9.15 5.3 8.95 5.05 8.65 4.8 8.35 4.7 7.9 4.6 7.45 4.55 6.9 4.55 6.35 4.7 5.9 4.8 5.45 5 5.15 5.25 4.85 5.6 4.7 Z" />\n              <path class="icon-stroke-only" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 9.5 15.2 L 7.8 13.5 2 13.5 Q 1.35 13.5 0.95 13.05 0.5 12.65 0.5 12 L 0.5 2 Q 0.5 1.35 0.95 0.95 1.35 0.5 2 0.5 L 17 0.5 Q 17.65 0.5 18.05 0.95 18.5 1.35 18.5 2 L 18.5 12 Q 18.5 12.65 18.05 13.05 17.65 13.5 17 13.5 L 11.2 13.5 9.5 15.2 Z" />\n            </g>\n          </svg>';
			},
			captions: function () {
				return '\n    <svg class="cs-icon captions-icon" width="19px" height="16px" viewBox="0 0 19 16" focusable="false">\n      <g>\n        <path d="M 11.45 3.5 Q 10.8 3.75 10.35 4.25 9.9 4.75 9.7 5.4 9.45 6.1 9.45 6.9 9.45 7.75 9.7 8.45 9.95 9.15 10.4 9.65 10.85 10.1 11.4 10.35 12 10.6 12.7 10.6 13.05 10.6 13.45 10.55 13.8 10.5 14.2 10.35 14.55 10.2 14.9 10 15.2 9.75 15.5 9.4 L 15 8.8 Q 14.9 8.65 14.7 8.65 14.55 8.65 14.4 8.75 14.25 8.85 14.1 8.95 13.95 9.1 13.65 9.2 13.4 9.3 13 9.3 12.6 9.3 12.25 9.15 11.95 8.95 11.7 8.65 11.45 8.35 11.35 7.9 11.25 7.45 11.2 6.9 11.2 6.35 11.35 5.9 11.45 5.45 11.65 5.15 11.9 4.85 12.25 4.7 12.6 4.5 13.05 4.5 13.4 4.5 13.65 4.6 13.9 4.65 14.05 4.8 14.25 4.9 14.35 4.95 14.5 5.05 14.6 5.05 14.75 5.05 14.85 5 14.9 4.9 15 4.85 L 15.45 4.2 Q 14.95 3.7 14.35 3.45 13.75 3.2 12.95 3.2 12.1 3.2 11.45 3.5 M 5.6 4.7 Q 5.95 4.5 6.4 4.5 6.75 4.5 7 4.6 7.25 4.65 7.4 4.8 7.6 4.9 7.7 4.95 7.85 5.05 7.95 5.05 8.1 5.05 8.2 5 8.25 4.9 8.35 4.85 L 8.8 4.2 Q 8.3 3.7 7.7 3.45 7.1 3.2 6.3 3.2 5.45 3.2 4.8 3.5 4.15 3.75 3.7 4.25 3.25 4.75 3.05 5.4 2.8 6.1 2.8 6.9 2.8 7.75 3.05 8.45 3.3 9.15 3.75 9.65 4.2 10.1 4.75 10.35 5.35 10.6 6.05 10.6 6.4 10.6 6.8 10.55 7.15 10.5 7.55 10.35 7.9 10.2 8.25 10 8.55 9.75 8.85 9.4 L 8.35 8.8 Q 8.25 8.65 8.05 8.65 7.9 8.65 7.75 8.75 7.6 8.85 7.45 8.95 7.3 9.1 7 9.2 6.75 9.3 6.35 9.3 5.95 9.3 5.6 9.15 5.3 8.95 5.05 8.65 4.8 8.35 4.7 7.9 4.6 7.45 4.55 6.9 4.55 6.35 4.7 5.9 4.8 5.45 5 5.15 5.25 4.85 5.6 4.7 Z" />\n        <path class="icon-stroke-only" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 9.5 15.2 L 7.8 13.5 2 13.5 Q 1.35 13.5 0.95 13.05 0.5 12.65 0.5 12 L 0.5 2 Q 0.5 1.35 0.95 0.95 1.35 0.5 2 0.5 L 17 0.5 Q 17.65 0.5 18.05 0.95 18.5 1.35 18.5 2 L 18.5 12 Q 18.5 12.65 18.05 13.05 17.65 13.5 17 13.5 L 11.2 13.5 9.5 15.2 Z" />\n      </g>\n    </svg>';
			},
			carrot: function (e) {
				return '\n    <svg style="left:calc('.concat(
					e,
					');" class="cs-icon cs-icon-carrot carrot"width="30" height="30" viewBox="0 0 30 30" focusable="false">\n      <g transform="translate(8, 8)">\n        <polygon style="fill:currentColor !important" points="1,1.5 5,5 1,8.5"/>\n      </g>\n  </svg>',
				);
			},
			search: function () {
				return '\n    <svg class="search-icon" width="13px" height="15px" viewBox="0 0 13 15" focusable="false"\n      <g fill="none" fill-rule="evenodd">\n        <g stroke-width="2">\n          <circle cx="5.6" cy="5.6" r="4.6"/>\n          <path d="M8 9l4 5"/>\n        </g>\n      </g>\n    </svg>\n    ';
			},
			searchClear: function () {
				return '\n    <svg class="cs-icon icon" width="11px" height="11px" viewBox="0 0 11 11">\n    <g id="Desktop-Color-Contrast" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="Search" transform="translate(-290.000000, -69.000000)" fill="fill:currentColor !important" fill-rule="nonzero">\n            <g id="search" transform="translate(13.000000, 59.000000)">\n                <polygon id="ic_close" points="286.777666 10 282.500215 14.2779053 278.222334 10 277 11.2222382 281.277881 15.5002869 277 19.7779053 278.222334 21 282.500215 16.7222382 286.777666 21 288 19.7779053 283.722119 15.5002869 288 11.2222382"></polygon>\n            </g>\n        </g>\n    </g>\n    </svg>\n    ';
			},
			filter: function () {
				return '<svg class="cs-icon icon-gear" width="14" height="14" viewBox="0 0 14 14" focusable="false">\n    <path id="icon-gear" transform="translate(0,3)" d="M11.1,9.8C11.1,9.8,11.1,9.8,11.1,9.8C11.1,9.8,11.1,9.7,11.1,9.8c0-0.1,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0-0.1,0.1-0.1c0,0,0,0,0,0c0-0.1,0.1-0.1,0.1-0.2c0,0,0,0,0,0c0-0.1,0-0.1,0.1-0.2c0,0,0,0,0,0c0.1-0.2,0.2-0.5,0.2-0.7l2-0.4V6.4l-2-0.4c0-0.3-0.1-0.5-0.2-0.7c0,0,0,0,0,0c0-0.1,0-0.1-0.1-0.2c0,0,0,0,0,0c0-0.1,0-0.1-0.1-0.2c0,0,0,0,0,0c0,0,0-0.1-0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l1.2-1.7l-0.9-0.9L9.7,2.8c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0,0,0,0,0c-0.1,0-0.1-0.1-0.2-0.1c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c0,0,0,0,0,0C8.3,2.1,8.1,2.1,7.8,2L7.4,0H6.2L5.9,2c-0.3,0-0.5,0.1-0.7,0.2c0,0,0,0,0,0C5,2.3,5,2.3,4.9,2.3c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0.1c0,0,0,0,0,0c0,0-0.1,0-0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0L2.3,1.6L1.4,2.5l1.2,1.7c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0,0,0C2.2,5,2.2,5,2.2,5.1c0,0,0,0,0,0c0,0.1,0,0.1-0.1,0.2c0,0,0,0,0,0C2,5.5,1.9,5.8,1.9,6l-2,0.4v1.2l2,0.4c0,0.3,0.1,0.5,0.2,0.7c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0,0,0,0,0,0c0,0,0,0.1,0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l-1.2,1.7l0.9,0.9L4,11.2c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0.1,0,0.1,0.1c0,0,0,0,0,0c0.1,0,0.1,0.1,0.2,0.1c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0.1c0,0,0,0,0,0c0.2,0.1,0.5,0.2,0.7,0.2l0.4,2h1.2l0.4-2c0.3,0,0.5-0.1,0.7-0.2c0,0,0,0,0,0c0.1,0,0.1,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1,0,0.2-0.1c0,0,0,0,0,0c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0l1.7,1.2l0.9-0.9L11.1,9.8C11,9.8,11,9.8,11.1,9.8C11,9.8,11.1,9.8,11.1,9.8z M6.8,9.2c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2C8,4.8,9,5.8,9,7C9,8.2,8,9.2,6.8,9.2z"/>\n  </svg>';
			},
			close: function () {
				return '<svg class="cs-icon icon" width="20" height="20" viewBox="0 0 36 36" focusable="false">\n    <use xlink:href="#close-icon" class="cs-icon-shadow" transform="translate(0, .5)" />\n    <polygon points="36,2.826 33.174,0 18,15.174 2.826,0 0,2.826 15.174,18 0,33.174 2.826,36 18,20.826 33.174,36 36,33.174 20.826,18" />\n  </svg>';
			},
			clear: function () {
				return '<svg class="cs-icon icon-clear" width="13" height="14" viewBox="0 0 13 14" focusable="false">\n    <use xlink:href="#icon-clear" fill="rgba(240, 240, 240, 1)" transform="translate(0, 1)" />\n    <path id="icon-clear" transform="translate(3,3)" d="M6.5,0C2.9,0,0,2.9,0,6.5C0,10.1,2.9,13,6.5,13c3.6,0,6.5-2.9,6.5-6.5C13,2.9,10.1,0,6.5,0z M1.5,6.5c0-2.8,2.2-5,5-5c1.2,0,2.4,0.5,3.2,1.2L2.2,9.1C1.8,8.3,1.5,7.5,1.5,6.5z M6.5,11.5c-1.2,0-2.3-0.5-3.2-1.2L10.8,4c0.4,0.7,0.7,1.6,0.7,2.5C11.5,9.3,9.3,11.5,6.5,11.5z"/>\n  </svg>';
			},
			hamburger: function () {
				return '\n    <svg class="cs-icon" width="30px" height="12px" viewBox="0 10 30 12" focusable="false">\n      <path d="M0,15 L17,15 L17,17 L0,17 L0,15 Z M0,11 L17,11 L17,13 L0,13 L0,11 Z M0,19 L17,19 L17,21 L0,21 L0,19 Z" ></path>\n    </svg>\n  ';
			},
			file: function () {
				return '\n    <svg width="20px" height="27px" viewBox="0 0 40 50" focusable="false">\n      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">\n        <g>\n          <path class="file-icon-bg" d="M2.00804893,0 C0.899034128,0 0,0.889064278 0,1.99091407 L0,48.0090859 C0,49.1086374 0.892756032,50 1.99862555,50 L37.2170607,50 C38.3208711,50 39.2156863,49.1011186 39.2156863,47.993136 L39.2156863,13.6363636 L26.1437908,0 L2.00804893,0 Z"></path>\n          <path class="file-icon-fold" d="M26.1437908,0 L26.1437908,11.7296861 C26.1437908,12.8319383 27.0422752,13.7254902 28.1433598,13.7254902 L39.2156863,13.7254902"></path>\n        </g>\n      </g>\n    </svg>';
			},
			link: function (e) {
				return '\n  <svg class="link-icon" preserveAspectRatio="none" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" focusable="false">\n      <path fill="'.concat(
					e,
					'" stroke="none" d="\n            M 1.45 8.5\n            Q 0.0453125 10.0015625 0 11.9\n            L 0 12.15\n            Q 0.0453125 14.0484375 1.45 15.55\n            L 1.5 15.6\n            Q 3.0015625 17.0046875 4.85 17.05\n            L 5.1 17.05\n            Q 7.0150390625 17.0046875 8.5 15.6\n            L 10.65 13.45\n            Q 10.95 13.15 10.95 12.75 10.95 12.35 10.65 12.05 10.3689453125 11.7689453125 10 11.75\n            L 9.95 11.75\n            Q 9.55 11.75 9.2 12.05\n            L 7.1 14.15\n            Q 6.2 15.05 5 15.05 3.8 15.05 2.9 14.15 2 13.25 2 12.05 2 10.8826171875 2.85 9.95\n            L 5 7.8\n            Q 5.3 7.5 5.3 7.1\n            L 5.3 7.05\n            Q 5.2810546875 6.6810546875 5 6.4 4.7 6.1 4.3 6.1 3.9 6.1 3.55 6.4\n            L 1.45 8.5\n            M 12.05 5\n            Q 11.75 4.7 11.35 4.7 10.95 4.7 10.65 5\n            L 5 10.65\n            Q 4.7 10.95 4.7 11.35 4.7 11.75 5 12.05 5.3 12.35 5.7 12.35 6.1 12.35 6.4 12.05\n            L 12.05 6.4\n            Q 12.35 6.1 12.35 5.7 12.35 5.3 12.05 5\n            M 15.6 1.5\n            L 15.55 1.45\n            Q 14 0 12.05 0\n            L 12 0\n            Q 10.05 0 8.5 1.45\n            L 6.4 3.55\n            Q 6.1 3.9 6.1 4.3 6.1 4.7 6.4 5 6.7 5.3 7.1 5.3 7.5 5.3 7.8 5\n            L 9.95 2.85\n            Q 10.8826171875 2 12.05 2 13.25 2 14.15 2.9 15.05 3.8 15.05 5 15.05 6.2 14.15 7.1\n            L 12.05 9.2\n            Q 11.75 9.55 11.75 9.95 11.75 10.35 12.05 10.65 12.35 10.95 12.75 10.95 13.15 10.95 13.45 10.65\n            L 15.6 8.5\n            Q 17.05 6.96875 17.05 5 17.05 3.05 15.6 1.5 Z"/>\n          </svg>',
				);
			},
			disableOrientation: function () {
				return '<svg viewBox="0 0 161 135">\n    <g stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">\n      <path d="M59,31.9948589 C59,30.340844 60.3408574,29 62.0069809,29 L99.9930191,29 C101.653729,29 103,30.3364792 103,31.9948589 L103,103.005141 C103,104.659156 101.659143,106 99.9930191,106 L62.0069809,106 C60.3462712,106 59,104.663521 59,103.005141 L59,31.9948589 Z M61,36 L101,36 L101,96 L61,96 L61,36 Z M81,104 C82.6568542,104 84,102.656854 84,101 C84,99.3431458 82.6568542,98 81,98 C79.3431458,98 78,99.3431458 78,101 C78,102.656854 79.3431458,104 81,104 Z M76,32.5 C76,32.2238576 76.2276528,32 76.5096495,32 L85.4903505,32 C85.7718221,32 86,32.2319336 86,32.5 C86,32.7761424 85.7723472,33 85.4903505,33 L76.5096495,33 C76.2281779,33 76,32.7680664 76,32.5 Z"></path>\n      <path d="M144.276039,68.4976037 C143.65768,83.6270348 137.530567,98.6224671 125.961909,110.191125 C101.576936,134.576098 62.1020027,134.704192 37.8006658,110.402855 L37.8275751,110.429765 L33.4090737,114.848266 L33.3821643,114.821357 C60.1400795,141.579272 103.595566,141.480117 130.445572,114.630111 C143.247134,101.828549 149.95913,85.2399018 150.581333,68.4976037 L161.373625,68.4976037 L147.23149,54.3554681 L133.089354,68.4976037 L144.276049,68.4976037 Z"></path>\n      <path d="M17.2900541,66.5559885 C17.8833587,51.3895735 24.012088,36.3498513 35.6085461,24.7533932 C59.9935191,0.36842015 99.4684528,0.240325436 123.76979,24.5416624 L123.74288,24.514753 L128.161382,20.0962516 L128.188291,20.1231609 C101.430376,-6.63475424 57.9748898,-6.5355989 31.1248839,20.314407 C18.2955218,33.1437691 11.582203,49.7766814 10.9851551,66.5559885 L0.259994507,66.5559885 L14.4021301,80.6981242 L28.5442658,66.5559885 L17.2900541,66.5559885 Z"></path>\n    </g>\n  </svg>';
			},
			enterFullScreen: function () {
				return '\n    <svg class="cs-icon enter-fullscreen-icon" width="14" height="14" viewBox="0 0 14 14" focusable="false">\n      <path d="M1.99055 2.3H5.1V0.4H0.1V5.2H1.9L1.9 2.3Z" stroke="none" />\n      <path d="M5.1 11.8H1.9V8.9H0.1V13.6H5.1L5.1 11.8Z" stroke="none" />\n      <path d="M11.5 11.8H8.4V13.6H13.3V8.9H11.5L11.5 11.8Z" stroke="none" />\n      <path d="M8.4 2.3H11.5V5.2H13.3V0.4H8.4L8.4 2.3Z" stroke="none" />\n    </svg>\n  ';
			},
			exitFullScreen: function () {
				return '\n    <svg class="cs-icon exit-fullscreen-icon" width="15" height="14" viewBox="0 0 15 14" focusable="false">\n      <path d="M4.2 4.1H0.1V6.0H6.2V0H4.2V4.1Z" stroke="none" />\n      <path d="M0.1 9.8H4.2V13.9H6.2V7.9H0.1V9.8Z" stroke="none" />\n      <path d="M10.0 9.8H14.1V7.9H8.1V13.9H10.0V9.8Z" stroke="none" />\n      <path d="M8.1 0V6.0H14.1V4.1H10.0V0H8.1Z" stroke="none" />\n    </svg>\n  ';
			},
			settings: function () {
				return '\n    <svg class="cs-icon" data-ref="settings" width="16px" height="16px" viewBox="0 0 16 16" focusable="false">\n      <path d="M8.94,0 C9.82,0 10.55,0.62 10.63,1.45 L10.73,2.36 C11.1,2.52 11.45,2.71 11.78,2.94 L12.66,2.56 C13.46,2.22 14.39,2.5 14.83,3.23 L15.77,4.77 C16.21,5.5 16,6.4 15.29,6.9 L14.51,7.42 C14.54,8.19 14.53,8.38 14.51,8.58 L15.29,9.11 C16,9.6 16.21,10.51 15.77,11.23 L14.83,12.77 C14.39,13.49 13.46,13.78 12.66,13.44 L11.78,13.06 C11.45,13.29 11.1,13.48 10.73,13.64 L10.63,14.55 C10.55,15.38 9.82,16 8.94,16 L7.06,16 C6.18,16 5.45,15.38 5.37,14.55 L5.27,13.64 C4.9,13.48 4.55,13.29 4.22,13.06 L3.34,13.44 C2.54,13.78 1.61,13.5 1.17,12.77 L0.23,11.23 C-0.21,10.51 0,9.6 0.71,9.11 L1.49,8.58 C1.46,7.81 1.47,7.62 1.49,7.42 L0.71,6.89 C0,6.40 -0.21,5.49 0.23,4.77 L1.17,3.23 C1.61,2.51 2.54,2.22 3.34,2.56 L4.22,2.94 C4.55,2.71 4.9,2.52 5.27,2.36 L5.37,1.45 C5.45,0.62 6.18,0 7.06,0 Z M7.96,4.53 C5.91,4.53 4.25,6.11 4.25,8.06 C4.25,10.01 5.91,11.59 7.96,11.59 C10.02,11.59 11.68,10.01 11.68,8.06 C11.68,6.11 10.02,4.53 7.96,4.53 Z"></path>\n    </svg>\n    ';
			},
			playbackSpeed: function () {
				return '\n    <svg class="cs-icon" width="15" height="15" viewBox="0 0 15 15" focusable="false">\n      <path d="M5.9 4.0L10.4 7.4L5.9 10.8V4.0ZM1.5 8.2H0.0C0.1 9.6 0.6 10.9 1.5 12.0L2.6 11.0C2.0 10.1 1.6 9.2 1.5 8.2H1.5ZM15 7.4H14.9C14.9 5.6 14.3 3.8 13.0 2.4C11.8 1.0 10.0 0.1 8.2 0.0V1.5C10.1 1.7 11.8 2.9 12.8 4.7C13.7 6.4 13.7 8.5 12.8 10.2C11.8 12.0 10.1 13.1 8.2 13.4V14.9C10.0 14.7 11.8 13.8 13.0 12.5C14.3 11.1 14.9 9.3 14.9 7.4L15 7.4ZM3.6 12.1L2.5 13.1C3.7 14.1 5.1 14.8 6.7 14.9V13.4V13.4C5.5 13.3 4.5 12.8 3.6 12.1V12.1ZM2.6 3.9L1.5 2.8C0.6 3.9 0.1 5.3 0 6.7H1.5H1.5C1.6 5.7 2.0 4.7 2.6 3.9H2.6ZM6.7 1.5V0.0C5.1 0.1 3.7 0.7 2.5 1.7L3.6 2.8C4.5 2.1 5.5 1.6 6.7 1.5V1.5Z" stroke="none" />\n    </svg>\n  ';
			},
			track: function (e, t) {
				return '\n    <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="16px" viewBox="0 0 24 16" focusable="false">\n      <defs>\n        <rect id="'
					.concat(
						t,
						'-track" x="2" y="3.5" width="20" height="9" rx="4.5"></rect>\n        <filter x="-12.5%" y="-27.8%" width="125.0%" height="155.6%" filterUnits="objectBoundingBox" id="',
					)
					.concat(
						t,
						'-trackFilter">\n          <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>\n          <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>\n          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>\n          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>\n        </filter>\n      </defs>\n      <g class="thumb-off" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g>\n          <use class="track" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n          <use fill="black" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n          <use class="border" stroke-width="1" xlink:href="#')
					.concat(
						t,
						'-track"></use>\n          <circle class="thumb" stroke-width="0" cx="8" cy="8" r="6"></circle>\n        </g>\n      </g>\n      <g class="thumb-on" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g>\n          <use class="track" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n          <use fill="black" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n          <use class="border" stroke-width="1" xlink:href="#')
					.concat(t, '-track"></use>\n          <circle fill="')
					.concat(e, '" stroke-width="0" cx="16" cy="8" r="6"></circle>\n        </g>\n      </g>\n    </svg>\n  ');
			},
			downArrow: function (e, t) {
				return '\n    <div style="height: 100%; width: 100%; background-color: '
					.concat(e, '; border-right: 1px solid; border-bottom: 1px solid; border-color: ')
					.concat(t, '; border-bottom-right-radius: 3px; transform: rotate(45deg);" />\n    ');
			},
		},
		_h = {
			play: function () {
				return '<svg id="icon-play" class="cs-icon play-icon" width="14" height="16" viewBox="0 0 14 16" focusable="false">\n    <path d="M1.4 15.4C0.8 15.8 0 15.3 0 14.5L0 1.4C0 0.6 0.8 0.1 1.4 0.5L12.9 7.1C13.5 7.5 13.5 8.4 12.9 8.8L8.0 11.6L1.4 15.4Z" stroke="none" />\n  </svg>';
			},
		},
		jh = function (e) {
			return DS.detection.env.isPerpetual ? Th[e] || Ph : _h[e] || Th[e] || Ph;
		};
	function Dh(e) {
		return (
			(Dh =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Dh(e)
		);
	}
	function Ah(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Hh(r.key), r);
		}
	}
	function Ih(e, t) {
		return (
			(Ih = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Ih(e, t)
		);
	}
	function Rh(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Mh(e);
			if (t) {
				var i = Mh(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Dh(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Bh(e);
			})(this, n);
		};
	}
	function Bh(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Mh(e) {
		return (
			(Mh = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Mh(e)
		);
	}
	function Hh(e) {
		var t = (function (e, t) {
			if ('object' !== Dh(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Dh(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Dh(t) ? t : String(t);
	}
	var Nh = DS,
		Fh = Nh.detection,
		Wh = Nh.dom,
		Vh = Nh.pubSub,
		Uh = Nh.events,
		Kh = { next: 'acc_next_visual', prev: 'acc_previous_visual', submit: 'acc_submit' },
		zh = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Ih(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Rh(o);
			function o(e) {
				var t, n, r, a;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					(n = Bh(t)),
					(a = !0),
					(r = Hh((r = 'hasTooltip'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
					Fh.deviceView.isMobile && t.onClick(t.onTap),
					t.onClick(t.onClickBtn),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'tooltipKey',
						get: function () {
							return Kh[this.view.nameKey];
						},
					},
					{
						key: 'onTap',
						value: function (e) {
							Wh.tappedClass(this.el);
						},
					},
					{
						key: 'onClickBtn',
						value: function (e) {
							var t = this.view,
								n = t.enabled,
								r = t.nameKey;
							n && Vh.trigger(Uh.presentation.ON_OBJECT_EVENT, r + '_pressed');
						},
					},
					{
						key: 'onLayoutChange',
						value: function (e) {
							var t = this,
								n = this.view.nameKey;
							this.hasFocus &&
								(e[n]
									? window.requestAnimationFrame(function () {
											return t.onFocus();
									  })
									: this.onBlur());
						},
					},
				]) && Ah(t.prototype, n),
				r && Ah(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Qh = zh,
		Gh = DS.detection.deviceView.isPhone,
		Zh = { next: 'prev', prev: 'next', submit: 'submit' },
		qh = { next: 'acc_next', prev: 'acc_previous', submit: 'acc_submit' },
		Yh = { prev: 'previous' },
		Xh = function (e, t) {
			G.def(e, Qh, function (n) {
				var r = G.model,
					i = n !== DS.constants.refs.FRAME;
				return {
					tag: 'button',
					ariaStringId: qh[e],
					attrs: { id: e, class: 'cs-button btn '.concat(i ? 'lightboxed' : ''), 'aria-label': r.getString(qh[e]), tabindex: 0 },
					parentAlign: function () {
						return i ? 'r' : Gh ? 'br' : 'r';
					},
					html: function () {
						var n = r.buttonOptions[Yh[e] || e],
							i = n.includes('text') && !Gh ? '<span data-ref="label" class="text '.concat(r.rtl ? 'rtl' : '', '">').concat(r.getString(e), '</span>') : '',
							o = n.includes('icon') || Gh ? '<span class="btn-icon">'.concat(jh(r.rtl ? Zh[e] : e)(), '</span>') : '';
						return r.dir(t ? [o, i] : [i, o]).join('\n');
					},
					calcTextSize: !0,
					wp: 'fit-to-text-w',
					wl: function () {
						return Gh ? this.width || 0 : this.wp;
					},
					yp: function () {
						return (this.parent.h - this.h) / 2;
					},
					yl: function () {
						return !Gh || i ? this.yp : this.top || 0;
					},
					xp: function () {
						return this.left || 0;
					},
					xl: function () {
						return i || !Gh ? this.xp : (this.parent.w - this.w) / 2;
					},
					methods: {
						shortcutActivated: function () {
							this.visible && this.viewLogic.onClickBtn();
						},
						updateDomStrings: function () {
							null != this.viewLogic.labelEl && (this.viewLogic.labelEl.textContent = r.getString(e));
						},
					},
					overflow: 'visible',
					padLeft: 20,
					padRight: 3.5,
					minW: 30,
					minH: 30,
				};
			});
		};
	function $h(e) {
		return (
			($h =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			$h(e)
		);
	}
	function Jh(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, ip(r.key), r);
		}
	}
	function ep(e, t) {
		return (
			(ep = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ep(e, t)
		);
	}
	function tp(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = rp(e);
			if (t) {
				var i = rp(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === $h(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return np(e);
			})(this, n);
		};
	}
	function np(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function rp(e) {
		return (
			(rp = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			rp(e)
		);
	}
	function ip(e) {
		var t = (function (e, t) {
			if ('object' !== $h(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== $h(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === $h(t) ? t : String(t);
	}
	Xh('prev', !0), Xh('next', !1), Xh('submit', !1);
	var op = DS,
		ap = (op.events, op.pubSub, op._, op.utils.fullScreen),
		lp = op.detection,
		sp =
			(lp.env.is360,
			lp.deviceView.isTablet,
			(function (e) {
				!(function (e, t) {
					if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
					(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
						Object.defineProperty(e, 'prototype', { writable: !1 }),
						t && ep(e, t);
				})(o, e);
				var t,
					n,
					r,
					i = tp(o);
				function o(e) {
					var t, n, r, a;
					return (
						(function (e, t) {
							if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
						})(this, o),
						(t = i.call(this, e)),
						(n = np(t)),
						(a = !0),
						(r = ip((r = 'hasTooltip'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
						t.onClick(t.onClickToggle),
						(t.view.toggle = !1),
						ap.addChangeListener(function () {
							return t.handleFullScreenChange();
						}),
						t
					);
				}
				return (
					(t = o),
					(n = [
						{
							key: 'tooltipKey',
							get: function () {
								return this.view.toggle ? 'acc_exit_fullscreen' : 'acc_enter_fullscreen';
							},
						},
						{
							key: 'getFullScreenEl',
							value: function () {
								return document.getElementById(DS.constants.els.PRESO);
							},
						},
						{
							key: 'isFullScreen',
							value: function () {
								return ap.getEl() === this.getFullScreenEl();
							},
						},
						{
							key: 'handleFullScreenChange',
							value: function () {
								(this.view.toggle = this.isFullScreen()), this.view.updateHtml();
							},
						},
						{
							key: 'onClickToggle',
							value: function (e) {
								DS.appState.toggleFullScreen();
							},
						},
						{
							key: 'getViewBox',
							value: function () {
								var e = this.view.getBox(),
									t = (e.h - 30) / 2;
								return (e.h = 30), (e.y = e.y + t), e;
							},
						},
					]) && Jh(t.prototype, n),
					r && Jh(t, r),
					Object.defineProperty(t, 'prototype', { writable: !1 }),
					o
				);
			})(Dt)),
		cp = sp,
		up = 'fullScreenToggle',
		fp = DS,
		dp = fp.constants.MOBILE_UI_SIZE,
		hp = fp.detection.deviceView.isPhone;
	G.def(up, cp, function (e) {
		var t = G.model;
		return {
			tag: 'button',
			attrs: { id: up, class: 'cs-button btn fullscreen-open-btn', tabindex: 0 },
			wp: 'fit-to-text-w',
			wl: function () {
				return hp ? this.width || 0 : this.wp;
			},
			yp: function () {
				return (this.parent.h - this.h) / 2;
			},
			yl: function () {
				return hp ? this.top || 0 : this.yp;
			},
			xp: function () {
				return this.left || 0;
			},
			xl: function () {
				return hp ? (this.parent.w - this.w) / 2 : this.xp;
			},
			html: function () {
				var e = this.toggle ? 'acc_exit_fullscreen' : 'acc_enter_fullscreen';
				return this.el.setAttribute('aria-label', t.getString(e)), this.toggle ? jh('exitFullScreen')() : jh('enterFullScreen')();
			},
			methods: {
				updateDomStrings: function () {
					var e = this.toggle ? 'acc_exit_fullscreen' : 'acc_enter_fullscreen';
					this.el.setAttribute('aria-label', t.getString(e));
				},
			},
			z: 1,
			padLeft: 6,
			padRight: 6,
			minW: 30,
			minH: dp,
			noUpdate: !t.frame.chromeless,
			parentAlign: 'br',
			noContent: !1,
			x: function () {
				return this.left || 0;
			},
		};
	});
	function pp(e) {
		return (
			(pp =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			pp(e)
		);
	}
	function yp(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== pp(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== pp(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === pp(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function bp() {
		return (
			(bp =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = wp(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			bp.apply(this, arguments)
		);
	}
	function vp(e, t) {
		return (
			(vp = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			vp(e, t)
		);
	}
	function gp(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = wp(e);
			if (t) {
				var i = wp(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === pp(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return mp(e);
			})(this, n);
		};
	}
	function mp(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function wp(e) {
		return (
			(wp = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			wp(e)
		);
	}
	G.def('sidebarOverlay', Dt, function () {
		return {
			simpleView: !0,
			tag: 'button',
			ariaStringId: 'close',
			attrs: { class: 'sidebar-overlay btn', 'aria-label': G.model.getString('close'), tabIndex: -1 },
			x: 0,
			y: 0,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			position: function () {},
			add: !0,
		};
	});
	var Sp = DS,
		kp = Sp._,
		Op = Sp.pubSub,
		Ep = Sp.events,
		Cp = Sp.detection,
		xp = Sp.globalEventHelper,
		Lp = xp.addWindowListener,
		Pp = xp.addDocumentListener,
		Tp = Sp.dom,
		_p = Tp.isWithin,
		jp = Tp.isInput,
		Dp = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && vp(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = gp(o);
			function o(e) {
				var t;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o),
					(t = i.call(this, e)),
					kp.bindAll(mp(t), 'onResize', 'hidePanel', 'onCheckShouldHide', 'onLayoutReady'),
					t.onClickEl(t.iconEl, t.onOpenList);
				var n = G.getNamespace(t.view.nameSpace);
				return (
					(t.topEllipsisPanel = n.topEllipsisPanel),
					Lp('resize', t.onResize),
					Op.on(Ep.tabLink.SHOW_PANEL, function (e) {
						(t.currentPanelLink = e), t.onCheckShouldHide({ target: e.view.el });
					}),
					Op.on(Ep.topEllipsesPanel.HIDE, t.hidePanel),
					Op.on(Ep.frame.LAYOUT_READY, t.onLayoutReady),
					(t.hideEvent = DS.detection.device.isMobile ? 'touchstart' : 'mousedown'),
					Pp(t.hideEvent, t.onCheckShouldHide, !0),
					(t.arrowEl.style.display = 'none'),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onFocus',
						value: function (e) {
							var t = DS.dom.getParentWithClass(e.target, 'panel-link') || DS.dom.getParentWithClass(e.target, 'custom-link');
							null == t
								? null == DS.dom.getParentWithClass(e.target, 'panel') && bp(wp(o.prototype), 'onFocus', this).call(this, e)
								: DS.focusManager.setFocusRectOn(t);
						},
					},
					{
						key: 'onLayoutReady',
						value: function (e) {
							if (!e.hasCustomLinks) {
								var t = !1;
								Object.keys(e).forEach(function (n) {
									if (-1 != n.indexOf('Panel')) {
										var r = n.replace('Panel', 'Link');
										!e[n] && e[r] && (t = !0);
									}
								}),
									this.view.setVisibility(t);
							}
						},
					},
					{
						key: 'onCheckShouldHide',
						value: function (e) {
							this.hideOnNextTouch &&
								(_p(e.target, 'top-ellipsis-panel')
									? Cp.deviceView.isPhone && document.body.classList.contains('nested-panel-shown') && !_p(e.target, 'panel') && this.hidePanel()
									: this.hidePanel());
						},
					},
					{
						key: 'updateAnimation',
						value: function () {
							var e = this;
							window.requestAnimationFrame(function () {
								e.topEllipsisPanel.updateTrans();
							});
						},
					},
					{
						key: 'showPanel',
						value: function () {
							this.topEllipsisPanel.setVisibility(!0),
								(this.hideOnNextTouch = !0),
								(this.topEllipsisPanel.yOff = 0),
								this.updateAnimation(),
								Cp.deviceView.isDesktop &&
									(DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation
										? (this.arrowEl.style.visibility = 'visible')
										: (this.arrowEl.style.display = 'block')),
								Op.trigger(Ep.topEllipsesPanel.PANEL_SHOWN, this);
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							Op.trigger(Ep.topEllipsesPanel.HIDE_PANEL, this),
								DS.flagManager.multiLangSupport ? (this.arrowEl.style.visibility = 'hidden') : (this.arrowEl.style.display = 'none'),
								this.topEllipsisPanel.setVisibility(!1),
								(this.hideOnNextTouch = !1),
								(this.topEllipsisPanel.yOff = -20),
								this.updateAnimation(),
								null != this.currentPanelLink && (this.currentPanelLink.hidePanel(!0), (this.currentPanelLink = null));
						},
					},
					{
						key: 'onResize',
						value: function (e) {
							this.topEllipsisPanel.visible && !jp(document.activeElement) && this.hidePanel();
						},
					},
					{
						key: 'onOpenList',
						value: function (e) {
							this.topEllipsisPanel.visible ? this.hidePanel() : this.showPanel();
						},
					},
				]) && yp(t.prototype, n),
				r && yp(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Ap = Dp,
		Ip = 'topEllipsis',
		Rp = DS.detection,
		Bp = Rp.deviceView.isPhone,
		Mp = (Rp.orientation, Rp.env);
	function Hp(e) {
		return (
			(Hp =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Hp(e)
		);
	}
	function Np(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t &&
				(r = r.filter(function (t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable;
				})),
				n.push.apply(n, r);
		}
		return n;
	}
	function Fp(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2
				? Np(Object(n), !0).forEach(function (t) {
						Wp(e, t, n[t]);
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
				: Np(Object(n)).forEach(function (t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
				  });
		}
		return e;
	}
	function Wp(e, t, n) {
		return (
			(t = (function (e) {
				var t = (function (e, t) {
					if ('object' !== Hp(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || 'default');
						if ('object' !== Hp(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === t ? String : Number)(e);
				})(e, 'string');
				return 'symbol' === Hp(t) ? t : String(t);
			})(t)) in e
				? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (e[t] = n),
			e
		);
	}
	G.def(Ip, Ap, function (e) {
		var t = G.getNamespace(e),
			n = t.linksRight,
			r = t.sidebar,
			i = (G.model.rtl, de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'border-top-color', '.cs-base')),
			o = Mp.isFileProtocol ? 'background-color' : 'background',
			a = de.getColor(e, '.cs-topmenu-item.active .cs-panel', o);
		return {
			tag: 'div',
			attrs: { id: Ip },
			x: function () {
				var e = G.model.rtl,
					t = 0;
				return Bp ? ('right' === r.pos ? 0 : window.innerWidth - 58) : ((t = e ? n.x - 58 + xn : 'right' === r.pos ? n.x + n.tabWidths() : n.right()), t);
			},
			w: 58,
			visible: !1,
			overflow: 'visible',
			html: '\n      <button\n        class="top-tabs-drop-icon cs-button btn"\n        data-ref="icon"\n        aria-expanded="false"\n        aria-controls="top-ellipsis-panel"\n        aria-label="top_links"\n      >\n        <div></div>\n        <div></div>\n        <div></div>\n      </button>\n\n      '.concat(
				Kr(a, i),
				'\n    ',
			),
			yl: function () {
				return Bp && null != this.top ? this.top : (this.parent.h - this.h) / 2;
			},
			yp: function () {
				return (this.parent.h - this.h) / 2;
			},
			h: function () {
				return this.parent.h / (Bp ? 2 : 1);
			},
		};
	});
	var Vp = DS.detection,
		Up = 'topEllipsisPanel';
	function Kp(e) {
		return (
			(Kp =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Kp(e)
		);
	}
	function zp(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Yp(r.key), r);
		}
	}
	function Qp(e, t) {
		return (
			(Qp = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Qp(e, t)
		);
	}
	function Gp(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = qp(e);
			if (t) {
				var i = qp(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Kp(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Zp(e);
			})(this, n);
		};
	}
	function Zp(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function qp(e) {
		return (
			(qp = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			qp(e)
		);
	}
	function Yp(e) {
		var t = (function (e, t) {
			if ('object' !== Kp(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Kp(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Kp(t) ? t : String(t);
	}
	G.def(Up, function (e) {
		var t = G.getNamespace(e),
			n = t.sidebar,
			r = t.topEllipsis,
			i = t.topBar,
			o = Vp.env.isFileProtocol ? 'background-color' : 'background',
			a = de.getColor(e, '.cs-topmenu-item.active .cs-panel', o),
			l = document.createElement('style'),
			s = G.model.frame;
		return (
			(l.innerHTML = '\n    .nested-panel-shown .cs-'
				.concat(
					s.default_layout,
					' .top-tabs-drop:not(.panel) {\n      box-shadow: none !important;\n      background: transparent;\n      border: transparent !important;\n    }\n    .nested-panel-shown .cs-',
				)
				.concat(s.default_layout, ' .top-tabs-drop .top-tab {\n      visibility: hidden;\n    }\n  ')),
			document.body.appendChild(l),
			Fp(
				Fp(
					{ attrs: { id: Up, class: 'top-ellipsis-panel top-tabs-drop', 'aria-expanded': !1, 'aria-controls': 'temp-container', style: { background: a } } },
					DS.flagManager.multiLangSupport || DS.flagManager.aiCourseTranslation ? { visibility: 'no-reflow' } : {},
				),
				{},
				{
					overflow: 'visible',
					visible: !1,
					yOff: -20,
					y: function () {
						return Vp.deviceView.isPhone ? r.y - Ln : i.h - xn;
					},
					x: function () {
						for (var e = this.el.querySelectorAll('.panel-links .top-tab'), t = 0, r = 0; r < e.length; r++) {
							var i = parseFloat(e[r].style.width);
							i > t && (t = i);
						}
						if (((this.maxWidth = t), Vp.deviceView.isPhone)) {
							var o = Vp.env.is360 && Vp.orientation.isPortrait ? 40 : 0;
							return 'left' === n.pos ? 15 + o : t - 20 - o;
						}
						var a = 20 - t / 2,
							l = this.parent.x + this.parent.parent.x + a,
							s = l + t,
							c = window.innerWidth - 20;
						return s > c ? (a -= s - c) : l < 10 && (a = 10), a;
					},
					w: null,
					h: null,
					html: '\n      <div class="panel-links" data-ref="links">\n      </div>\n    ',
				},
			)
		);
	});
	var Xp = DS.utils,
		$p = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Qp(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Gp(o);
			function o(e) {
				var t, n, r, a;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)),
					(n = Zp(t)),
					(a = function () {
						var e = Xp.fullScreen.getEl();
						if (null != e) {
							if (G.getNamespace(t.view.nameSpace).slide.el.contains(e)) {
								var n = e.querySelector('.caption-container-host');
								null != n
									? (null == t.origParent && (t.origParent = t.el.parentElement), n.appendChild(t.el))
									: DS.flagManager.dropInVideo && (clearTimeout(t.findHost), (t.findHost = window.setTimeout(t.reparent, 30)));
							}
						} else null != t.origParent && (t.origParent.appendChild(t.el), (t.origParent = null));
					}),
					(r = Yp((r = 'reparent'))) in n ? Object.defineProperty(n, r, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (n[r] = a),
					Xp.fullScreen.addChangeListener(function () {
						t.handleFullScreenChange();
					}),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'handleFullScreenChange',
						value: function () {
							DS.flagManager.dropInVideo
								? (clearTimeout(this.reparentTimeout), (this.reparentTimeout = window.setTimeout(this.reparent, 200)))
								: window.requestAnimationFrame(this.reparent);
						},
					},
				]) && zp(t.prototype, n),
				r && zp(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Jp = $p,
		ey = DS,
		ty = ey.detection,
		ny = ty.deviceView.isPhone,
		ry = ty.orientation;
	ey.flagManager;
	function iy(e) {
		return (
			(iy =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			iy(e)
		);
	}
	function oy(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, dy(r.key), r);
		}
	}
	function ay() {
		return (
			(ay =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = uy(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			ay.apply(this, arguments)
		);
	}
	function ly(e, t) {
		return (
			(ly = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ly(e, t)
		);
	}
	function sy(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = uy(e);
			if (t) {
				var i = uy(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === iy(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return cy(e);
			})(this, n);
		};
	}
	function cy(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function uy(e) {
		return (
			(uy = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			uy(e)
		);
	}
	function fy(e, t, n) {
		return (t = dy(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function dy(e) {
		var t = (function (e, t) {
			if ('object' !== iy(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== iy(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === iy(t) ? t : String(t);
	}
	G.def('captionContainer', Jp, function (e) {
		var t = G.getNamespace(e),
			n = t.bottomBar,
			r = t.topBar,
			i = t.slide,
			o = G.model.frame,
			a = o.fontscale,
			l = o.captionFontScale,
			s = o.controlOptions.ccOptions,
			c = e !== DS.constants.refs.FRAME;
		return {
			attrs: { class: 'caption-container' },
			style: { fontSize: ''.concat(null != s ? s.size : l || a, '%') },
			z: 2,
			methods: {
				beforeUpdateHook: function () {
					var e = null != r,
						t = null != n,
						o = ny && ry.isLandscape ? window.innerHeight - Pn + 5 : window.innerHeight - (e ? r.h + n.h : 0) + (ny ? 10 : 0);
					e || t || (o = window.innerHeight),
						(this.dims = c
							? { x: 0, y: 0, w: this.parent.w, h: this.parent.h }
							: {
									x: i.sidebarXOffset,
									y: ny && ry.isLandscape ? 0 : e ? r.h : 0,
									w: window.innerWidth - G.model.getDockedWidth() - i.sidebarWidthOffset,
									h: o,
							  });
				},
			},
			x: function () {
				return this.dims.x;
			},
			y: function () {
				return this.dims.y;
			},
			w: function () {
				return this.dims.w;
			},
			h: function () {
				return this.dims.h;
			},
			add: !0,
		};
	});
	var hy = DS,
		py = hy.dom,
		yy = py.addClass,
		by = py.removeClass,
		vy = hy.appState,
		gy = hy.scaler,
		my = hy.shortcutManager,
		wy = hy.events,
		Sy = hy.focusManager,
		ky = hy.pubSub,
		Oy = hy.keyManager,
		Ey = hy.utils.fullScreen,
		Cy = hy.globalEventHelper.addDocumentListener,
		xy = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && ly(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = sy(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					fy(cy((t = i.call(this, e))), 'hasTooltip', !0),
					fy(cy(t), 'tooltipKey', 'acc_settings'),
					fy(cy(t), 'hideTooltipWhenOpen', !0),
					fy(cy(t), 'onToggleBackgroundAudio', function () {
						ky.trigger(wy.backgroundAudio.TOGGLE);
					}),
					fy(cy(t), 'toggleBackgroundAudio', function () {
						t.updateToggle(t.backgroundAudioSwitchEl, DS.courseAudio.enabled());
					}),
					fy(cy(t), 'onCaptionsEnabled', function () {
						t.view.updateHook();
					}),
					DS._.bindAll(cy(t), 'onAccessibleTextChanged', 'onZoomModeChanged', 'onKeyboardShortcutsChanged'),
					t.onClickEl(t.settingsBtnEl, t.togglePanel),
					null != t.shortcutsSwitchEl &&
						(t.onClickEl(t.shortcutsSwitchEl, t.toggleShortcuts), DS.pubSub.on(wy.player.ENABLE_KEYBOARD_SHORTCUTS, t.onKeyboardShortcutsChanged)),
					null != t.captionsButtonEl && (t.onClickEl(t.captionsButtonEl, t.toggleCaptions), ky.on(wy.captions.ENABLED, t.onCaptionsEnabled)),
					null != t.resetButtonEl && t.onClickEl(t.resetButtonEl, t.resetTimeline),
					null != t.acctextSwitchEl &&
						(t.onClickEl(t.acctextSwitchEl, t.toggleAccessibleText), vy.on(wy.player.ACCESSIBLE_TEXT_CHANGED, t.onAccessibleTextChanged)),
					null != t.zoomSwitchEl && (t.onClickEl(t.zoomSwitchEl, t.toggleZoomMode), ky.on(wy.window.ZOOM_MODE_CHANGED, t.onZoomModeChanged)),
					(t.handleFullScreenChange = t.handleFullScreenChange.bind(cy(t))),
					null != t.fullScreenToggleButtonEl &&
						(t.onClickEl(t.fullScreenToggleButtonEl, t.toggleFullScreen), (t.removeFullScreenListener = Ey.addChangeListener(t.handleFullScreenChange))),
					null != t.backgroundAudioSwitchEl &&
						(t.onClickEl(t.backgroundAudioSwitchEl, t.onToggleBackgroundAudio), ky.on(wy.backgroundAudio.HAS_TOGGLED, t.toggleBackgroundAudio)),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'toggleFullScreen',
						value: function () {
							vy.toggleFullScreen();
						},
					},
					{
						key: 'handleFullScreenChange',
						value: function () {
							Ey.getEl() === vy.getPresoEl() ? yy(this.el, 'full-screen') : by(this.el, 'full-screen');
						},
					},
					{
						key: 'togglePanel',
						value: function () {
							this.isOpen ? this.hidePanel() : (this.showPanel(), this.dismissTooltip());
						},
					},
					{
						key: 'showPanel',
						value: function () {
							var e = this;
							(this.isOpen = !0),
								yy(this.el, 'open'),
								this.view.updatePanelPosition(),
								this.settingsBtnEl.setAttribute('aria-expanded', !0),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!0),
								(this.removeShowPanelListener = Cy('keydown', function (t) {
									return e.handleKeyDown(t);
								}));
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							(this.isOpen = !1),
								by(this.el, 'open'),
								this.settingsBtnEl.setAttribute('aria-expanded', !1),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!1),
								null != this.removeShowPanelListener && this.removeShowPanelListener();
						},
					},
					{
						key: 'handleKeyDown',
						value: function (e) {
							Oy.isEscapeKey(e.which) && (this.hidePanel(), this.settingsBtnEl.focus(), Sy.setFocusRectOn(this.settingsBtnEl));
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							null != e && this.isOpen && !this.el.contains(e.relatedTarget) && (this.hidePanel(), ay(uy(o.prototype), 'onBlur', this).call(this));
						},
					},
					{
						key: 'updateToggle',
						value: function (e, t) {
							t ? (yy(e, 'toggle-on'), by(e, 'toggle-off')) : (yy(e, 'toggle-off'), by(e, 'toggle-on')),
								e.querySelector('button').setAttribute('aria-checked', t);
						},
					},
					{
						key: 'onAccessibleTextChanged',
						value: function (e) {
							(this.accTextOn = e), this.updateToggle(this.acctextSwitchEl, this.accTextOn);
						},
					},
					{
						key: 'onKeyboardShortcutsChanged',
						value: function (e) {
							this.updateToggle(this.shortcutsSwitchEl, e);
						},
					},
					{
						key: 'toggleAccessibleText',
						value: function () {
							(this.accTextOn = !this.accTextOn), this.updateToggle(this.acctextSwitchEl, this.accTextOn), vy.onToggleAccessibleText(this.accTextOn);
						},
					},
					{
						key: 'onZoomModeChanged',
						value: function () {
							this.updateToggle(this.zoomSwitchEl, gy.zoomMode);
						},
					},
					{
						key: 'toggleZoomMode',
						value: function () {
							gy.enableZoomMode(!gy.zoomMode), this.updateToggle(this.zoomSwitchEl, gy.zoomMode), Sy.setFocusRectOn(this.zoomSwitchEl.querySelector('button'));
						},
					},
					{
						key: 'toggleShortcuts',
						value: function () {
							my.enableShortcuts(!my.enabled), this.updateToggle(this.shortcutsSwitchEl, my.enabled);
						},
					},
					{
						key: 'toggleCaptions',
						value: function () {
							G.getNamespace('_frame').captions.viewLogic.toggleCaptions(), this.view.updateHook();
						},
					},
					{
						key: 'resetTimeline',
						value: function () {
							G.getNamespace('_frame').reset.viewLogic.resetTimeline();
						},
					},
					{
						key: 'teardown',
						value: function () {
							vy.off(wy.player.ACCESSIBLE_TEXT_CHANGED, this.onAccessibleTextChanged),
								ky.off(wy.window.ZOOM_MODE_CHANGED, this.onZoomModeChanged),
								ky.off(wy.captions.ENABLED, this.onCaptionsEnabled),
								ky.off(wy.backgroundAudio.HAS_TOGGLED, this.toggleBackgroundAudio),
								null != this.removeFullScreenListener && this.removeFullScreenListener();
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							var t = e.target;
							if (this.el.contains(t)) return Sy.setFocusRectOn(t), this.onHoverIn(e), (this.isFocused = !1), !1;
						},
					},
				]) && oy(t.prototype, n),
				r && oy(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Ly = xy;
	function Py(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Ty(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Ty(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ty(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Ty(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var _y = DS,
		jy = _y.utils.pxify,
		Dy = (_y.detection, 'settings');
	function Ay(e) {
		return (
			(Ay =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ay(e)
		);
	}
	function Iy(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Ry(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Ry(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ry(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Ry(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function By(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, Uy(r.key), r);
		}
	}
	function My() {
		return (
			(My =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Wy(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			My.apply(this, arguments)
		);
	}
	function Hy(e, t) {
		return (
			(Hy = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			Hy(e, t)
		);
	}
	function Ny(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Wy(e);
			if (t) {
				var i = Wy(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Ay(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Fy(e);
			})(this, n);
		};
	}
	function Fy(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Wy(e) {
		return (
			(Wy = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Wy(e)
		);
	}
	function Vy(e, t, n) {
		return (t = Uy(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function Uy(e) {
		var t = (function (e, t) {
			if ('object' !== Ay(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== Ay(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === Ay(t) ? t : String(t);
	}
	G.def(Dy, Ly, function (e) {
		var t = G.model,
			n = (G.model.rtl, de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'background-color')),
			r = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'border-top-color', '.cs-base'),
			i = de.getColor(e, '.cs-brandhighlight-secondary-bg', 'background-color', '.cs-base.cs-custom-theme'),
			o = G.getNamespace(e).bottomBar;
		return {
			noUpdate: !0,
			attrs: { id: Dy, class: 'btn cs-button cs-settings' },
			overflow: 'visible',
			w: 30,
			parentAlign: 'l',
			h: function () {
				return 30;
			},
			x: function () {
				return this.left || 0;
			},
			y: 'vertical-center',
			methods: {
				getControlConfigs: function () {
					return [
						{
							name: 'zoom',
							labelId: 'zoom_to_fit',
							isOn: function () {
								return DS.scaler.zoomMode;
							},
						},
					].concat(
						Py(
							DS.frameModel.hasModernText
								? [
										{
											name: 'acctext',
											labelId: 'accessible_text',
											isOn: function () {
												return DS.appState.accessibleTextOn();
											},
										},
								  ]
								: [],
						),
						[
							{
								name: 'shortcuts',
								labelId: 'keyboardshortcuts_lower',
								isOn: function () {
									return DS.shortcutManager.enabled;
								},
							},
						],
						Py(
							null != DS.courseAudio && DS.courseAudio.hasAudio()
								? [
										{
											name: 'backgroundAudio',
											labelId: 'background_audio',
											isOn: function () {
												return DS.courseAudio.enabled;
											},
										},
								  ]
								: [],
						),
					);
				},
				getToggleControls: function () {
					return this.getControlConfigs()
						.map(function (e) {
							var n = e.name,
								r = e.labelId,
								o = (0, e.isOn)();
							return '\n            <div class="switch '
								.concat(o ? 'toggle-on' : 'toggle-off', '" data-ref="')
								.concat(n, 'Switch">\n              <label class="switch-label" id="')
								.concat(n, '-label" data-label-id="')
								.concat(r, '">\n                ')
								.concat(t.getString(r), '\n              </label>\n              <button class="switch-toggle" id="')
								.concat(n, '-switch" tabindex="0" role="switch" aria-checked="')
								.concat(o, '" aria-labelledby="')
								.concat(n, '-label">\n                ')
								.concat(Yn('track')(i, n), '\n              </button>\n            </div>\n          ');
						})
						.join('');
				},
				updatePanelPosition: function () {
					if (null != o) {
						var e = this.children.settingsPanel.el;
						e.style.left = 0;
						var t = e.getBoundingClientRect(),
							n = o.el.getBoundingClientRect(),
							r = 0;
						t.right > n.right - xn && (r = n.right - (t.right + xn)),
							t.left < n.left + xn && (r = n.left - t.left + xn),
							(e.style.left = jy(r)),
							(this.children.settingsPanelArrow.el.style.transform = 'translateX('.concat(jy(0 - r), ')'));
					}
				},
				updatePanelDepth: function (e) {
					o.panelToggled('settings', e);
				},
				updateDomStrings: function () {
					this.el.querySelectorAll('*[data-label-id]').forEach(function (e) {
						e.textContent = t.getString(e.dataset.labelId);
					}),
						this.el.setAttribute('aria-label', t.getString('acc_settings'));
				},
			},
			updateHook: function () {
				this.updatePanelPosition();
			},
			html: function () {
				var e = '\n        <button data-ref="settingsBtn" aria-expanded="false" class="cs-button" aria-label="'
					.concat(t.getString('acc_settings'), '" tabIndex="0">\n          ')
					.concat(
						Yn('settings')(),
						'\n        </button>\n        <div data-ref="settingsPanel" class="settings-panel" tabindex="-1">\n          <div class="toggle-buttons">\n            ',
					)
					.concat(
						this.getToggleControls(),
						'\n          </div>\n          <div class="panel-down-arrow" style="height: 18px; width: 18px; position: absolute;">\n            <div data-ref="settingsPanelArrow" style="height: 100%; width: 100%;">\n              ',
					)
					.concat(Yn('downArrow')(n, r), '\n            </div>\n          </div>\n        </div>\n        ');
				return e;
			},
		};
	});
	var Ky = DS,
		zy = Ky.dom,
		Qy = zy.addClass,
		Gy = zy.removeClass,
		Zy = Ky.appState,
		qy = Ky.focusManager,
		Yy = Ky.keyManager,
		Xy = Ky.globalEventHelper.addDocumentListener,
		$y = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && Hy(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Ny(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					Vy(Fy((t = i.call(this, e))), 'hasTooltip', !0),
					Vy(Fy(t), 'tooltipKey', 'acc_playback_speed'),
					Vy(Fy(t), 'hideTooltipWhenOpen', !0),
					(t.currentSpeed = 1),
					(t.currentIndex = 4),
					(t.currentFocusIndex = 4),
					Iy(t.el.querySelectorAll('.menu-choice')).forEach(function (e) {
						e.classList.contains('selected') && ((t.currentSpeed = e.dataset.speed), (t.currentIndex = e.dataset.index), (t.selectedEl = e)),
							t.onClickEl(e, function () {
								return t.choiceClicked(e);
							});
					}),
					t.onClickEl(t.toggleBtnEl, t.togglePanel),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'choiceClicked',
						value: function (e) {
							this.updateSpeed(e), this.hidePanel();
						},
					},
					{
						key: 'updateSpeed',
						value: function (e) {
							this.selectedEl.classList.remove('selected'),
								(this.selectedEl.tabIndex = -1),
								this.selectedEl.setAttribute('aria-checked', !1),
								e.classList.add('selected'),
								(e.tabIndex = 0),
								e.setAttribute('aria-checked', !0),
								(this.selectedEl = e);
							var t = e.dataset,
								n = t.speed,
								r = t.index;
							(this.currentSpeed = parseFloat(n)), (this.currentIndex = parseInt(r)), Zy.setPlaybackSpeed(this.currentSpeed);
						},
					},
					{
						key: 'togglePanel',
						value: function () {
							this.isOpen ? this.hidePanel() : (this.showPanel(), this.dismissTooltip());
						},
					},
					{
						key: 'handleKeyDown',
						value: function (e) {
							var t = this.currentFocusIndex;
							if (Yy.isDownishKey(e.which)) t++;
							else if (Yy.isUpishKey(e.which)) t--;
							else if (Yy.isHomeKey(e.which)) t = 0;
							else if (Yy.isEndKey(e.which)) t = 7;
							else if (Yy.isActionKey(e.which)) {
								if (t !== this.currentIndex) {
									var n = this.el.querySelector('[data-index="'.concat(t, '"]'));
									this.updateSpeed(n);
								}
								this.hidePanel(), this.toggleBtnEl.focus(), e.preventDefault();
							} else Yy.isEscapeKey(e.which) && (this.hidePanel(), this.toggleBtnEl.focus(), e.preventDefault());
							t >= 8 && (t = 0),
								t < 0 && (t = 7),
								t !== this.currentFocusIndex &&
									((this.currentFocusIndex = t), e.preventDefault(), this.el.querySelector('[data-index="'.concat(t, '"]')).focus());
						},
					},
					{
						key: 'showPanel',
						value: function () {
							var e = this;
							(this.isOpen = !0),
								(this.currentFocusIndex = this.currentIndex),
								Qy(this.el, 'open'),
								this.view.updatePanelPosition(),
								this.toggleBtnEl.setAttribute('aria-expanded', !0),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!0),
								this.selectedEl.focus(),
								qy.setFocusRectOn(this.selectedEl),
								(this.removeKeyListener = Xy('keydown', function (t) {
									return e.handleKeyDown(t);
								}));
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							(this.isOpen = !1),
								Gy(this.el, 'open'),
								this.toggleBtnEl.setAttribute('aria-expanded', !1),
								this.removeKeyListener(),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!1);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							null != e && this.isOpen && !this.el.contains(e.relatedTarget) && (this.hidePanel(), My(Wy(o.prototype), 'onBlur', this).call(this));
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							var t = e.target;
							if (this.el.contains(t)) return qy.setFocusRectOn(t), this.onHoverIn(e), (this.isFocused = !1), !1;
						},
					},
				]) && By(t.prototype, n),
				r && By(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Jy = $y,
		eb = DS.utils.pxify,
		tb = 'playbackSpeed';
	G.def(tb, Jy, function (e) {
		var t = G.model,
			n = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'background-color'),
			r = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'border-top-color', '.cs-base'),
			i = de.getColor(e, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme'),
			o = G.getNamespace(e).bottomBar;
		return {
			noUpdate: !0,
			attrs: { id: tb, class: 'btn cs-button cs-settings' },
			overflow: 'visible',
			w: 30,
			parentAlign: 'l',
			h: function () {
				return 30;
			},
			x: function () {
				return this.left || 0;
			},
			y: 'vertical-center',
			methods: {
				getSpeedOptions: function () {
					var e = G.model.getString('playback_speed_normal');
					return [
						{ label: '2', value: 2 },
						{ label: '1.75', value: 1.75 },
						{ label: '1.5', value: 1.5 },
						{ label: '1.25', value: 1.25 },
						{ label: e, value: 1, ref: 'Normal' },
						{ label: '0.75', value: 0.75 },
						{ label: '0.5', value: 0.5 },
						{ label: '0.25', value: 0.25 },
					]
						.map(function (e, t) {
							var n = e.label,
								r = e.value,
								o = e.ref,
								a = '',
								l = '';
							return (
								null != o && ((a = 'data-ref="label'.concat(o, '"')), (l = 'data-ref="aria'.concat(o, '"'))),
								'\n            <li tabindex="-1">\n              <div '
									.concat(l, '\n                class="cs-listitem menu-choice ')
									.concat(1 === r ? 'selected' : '', '" \n                data-speed="')
									.concat(r, '"\n                data-index="')
									.concat(t, '"\n                tabindex="')
									.concat(1 === r ? 0 : -1, '" \n                role="menuitemcheckbox" \n                aria-checked="')
									.concat(1 === r, '" \n                aria-label="')
									.concat(n, '"\n              >\n                <div class="selected-icon" style="fill:')
									.concat(
										i,
										';">\n                  <svg width="12" height="9" viewBox="0 0 12 9">\n                    <path d="M10 0.3 L11.5 1.7 L4.3 8.9 L0 4.7 L1.4 3.2 L4.3 6.1 L10 0.3 Z" stroke="none"></path>\n                  </svg>\n                </div>\n                <div class="label" ',
									)
									.concat(a, '>')
									.concat(n, '</div>\n              </div>\n            </li>\n          ')
							);
						})
						.join('');
				},
				updatePanelPosition: function () {
					if (null != o) {
						var e = this.children.contentPanel.el;
						e.style.left = 0;
						var t = e.getBoundingClientRect(),
							n = o.el.getBoundingClientRect(),
							r = 0;
						t.right > n.right - xn && (r = n.right - (t.right + xn)),
							t.left < n.left + xn && (r = n.left - t.left + xn),
							(e.style.left = eb(r)),
							(this.children.contentPanelArrow.el.style.transform = 'translateX('.concat(eb(0 - r), ')'));
					}
				},
				updatePanelDepth: function (e) {
					o.panelToggled('playbackSpeed', e);
				},
				updateDomStrings: function () {
					(this.viewLogic.labelNormalEl.textContent = t.getString('playback_speed_normal')),
						this.viewLogic.ariaNormalEl.setAttribute('aria-label', t.getString('playback_speed_normal')),
						(this.viewLogic.playbackSpeedTitleEl.textContent = t.getString('playback_speed_title')),
						this.viewLogic.playbackSpeedWrapperEl.setAttribute('aria-label', t.getString('playback_speed_title')),
						this.viewLogic.toggleBtnEl.setAttribute('aria-label', t.getString('acc_playback_speed'));
				},
			},
			updateHook: function () {
				this.updatePanelPosition();
			},
			html: function () {
				var e = G.model.getString('playback_speed_title'),
					i = '\n        <button data-ref="toggleBtn" aria-expanded="false" class="cs-button" aria-label="'
						.concat(t.getString('acc_playback_speed'), '" tabIndex="0">\n          ')
						.concat(
							Yn('playbackSpeed')(),
							'\n        </button>\n        <div \n          data-ref="contentPanel" \n          class="settings-panel" \n          tabindex="-1"\n        >\n          <div class="content">\n            <div data-ref=\'playbackSpeedTitle\' class=\'cs-heading title\'>',
						)
						.concat(e, "</div>\n            <ul data-ref='playbackSpeedWrapper' aria-label=\"")
						.concat(e, '" role="menu">\n              ')
						.concat(
							this.getSpeedOptions(),
							'\n            </ul>\n          </div>\n          <div class="panel-down-arrow" style="height: 18px; width: 18px; position: absolute;">\n            <div data-ref="contentPanelArrow" style="height: 100%; width: 100%;">\n              ',
						)
						.concat(Yn('downArrow')(n, r), '\n            </div>\n          </div>\n        </div>\n        ');
				return i;
			},
		};
	});
	var nb = 'frameBlocker';
	function rb(e) {
		return (
			(rb =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			rb(e)
		);
	}
	function ib(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return ob(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return ob(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ob(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function ob(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function ab(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, hb(r.key), r);
		}
	}
	function lb() {
		return (
			(lb =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = fb(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			lb.apply(this, arguments)
		);
	}
	function sb(e, t) {
		return (
			(sb = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			sb(e, t)
		);
	}
	function cb(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = fb(e);
			if (t) {
				var i = fb(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === rb(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return ub(e);
			})(this, n);
		};
	}
	function ub(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function fb(e) {
		return (
			(fb = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			fb(e)
		);
	}
	function db(e, t, n) {
		return (t = hb(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
	}
	function hb(e) {
		var t = (function (e, t) {
			if ('object' !== rb(e) || null === e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var r = n.call(e, t || 'default');
				if ('object' !== rb(r)) return r;
				throw new TypeError('@@toPrimitive must return a primitive value.');
			}
			return ('string' === t ? String : Number)(e);
		})(e, 'string');
		return 'symbol' === rb(t) ? t : String(t);
	}
	G.def(nb, function (e) {
		var t = G.getNamespace(e).slide,
			n = function () {
				return ''
					.concat(t.x, 'px ')
					.concat(t.w, 'px ')
					.concat(window.innerWidth - t.x - t.w, 'px');
			},
			r = function () {
				return ''
					.concat(t.y, 'px ')
					.concat(t.h, 'px ')
					.concat(window.innerHeight - t.y - t.h, 'px');
			};
		return {
			attrs: { id: nb, class: 'frame-blocker-container' },
			x: 0,
			y: 0,
			z: Tn,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			style: { 'pointer-events': 'none', 'grid-template-columns': n(), 'grid-template-rows': r() },
			visible: !1,
			visibility: 'no-reflow',
			html: '<div class="frame-blocker-slide"></div><div class="frame-blocker-top"></div><div class="frame-blocker-bottom"></div><div class="frame-blocker-right"></div><div class="frame-blocker-left"></div>',
			updateHook: function () {
				var e = this;
				window.requestAnimationFrame(function () {
					(e.el.style['grid-template-columns'] = n()), (e.el.style['grid-template-rows'] = r());
				});
			},
			methods: {
				setBackgroundColor: function (e) {
					this.el.childNodes.forEach(function (t) {
						t.style.background = e;
					});
				},
			},
		};
	});
	var pb = DS,
		yb = pb.dom,
		bb = yb.addClass,
		vb = yb.removeClass,
		gb = (pb.appState, pb.focusManager),
		mb = pb.keyManager,
		wb = pb.globalEventHelper.addDocumentListener,
		Sb = pb.localizationManager,
		kb = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && sb(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = cb(o);
			function o(e) {
				var t;
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o),
					db(ub((t = i.call(this, e))), 'hideTooltipWhenOpen', !0),
					db(ub(t), 'hasTooltip', !0),
					db(ub(t), 'tooltipKey', 'acc_language_picker');
				var n = ib(t.el.querySelectorAll('.menu-choice'));
				return (
					(t.itemCount = n.length),
					n.forEach(function (e) {
						e.classList.contains('selected') && ((t.currentLangCode = e.dataset.langCode), (t.currentIndex = e.dataset.index), (t.selectedEl = e)),
							t.onClickEl(e, function () {
								return t.choiceClicked(e);
							});
					}),
					t.onClickEl(t.toggleBtnEl, t.togglePanel),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'choiceClicked',
						value: function (e) {
							this.updateLanguage(e), this.hidePanel();
						},
					},
					{
						key: 'updateSelection',
						value: function () {
							var e = ib(this.el.querySelectorAll('.menu-choice')),
								t = Sb.getCurrentLangCode(),
								n = e.find(function (e) {
									return e.dataset.langCode === t;
								});
							null != n && this.updateLanguage(n);
						},
					},
					{
						key: 'updateLanguage',
						value: function (e) {
							this.selectedEl.classList.remove('selected'),
								(this.selectedEl.tabIndex = -1),
								this.selectedEl.setAttribute('aria-checked', !1),
								e.classList.add('selected'),
								(e.tabIndex = 0),
								e.setAttribute('aria-checked', !0),
								(this.selectedEl = e);
							var t = e.dataset,
								n = t.langCode,
								r = t.index;
							(this.currentLangCode = n), (this.currentIndex = parseInt(r)), Sb.setCurrentLanguage(this.currentLangCode);
						},
					},
					{
						key: 'togglePanel',
						value: function () {
							this.isOpen ? this.hidePanel() : (this.showPanel(), this.dismissTooltip());
						},
					},
					{
						key: 'handleKeyDown',
						value: function (e) {
							var t = this.currentIndex;
							if (
								(mb.isDownishKey(e.which)
									? t++
									: mb.isUpishKey(e.which)
									? t--
									: mb.isHomeKey(e.which)
									? (t = 0)
									: mb.isEndKey(e.which) && (t = this.itemCount - 1),
								t >= this.itemCount && (t = 0),
								t < 0 && (t = this.itemCount - 1),
								t !== this.currentIndex)
							) {
								e.preventDefault();
								var n = this.el.querySelector('[data-index="'.concat(t, '"]'));
								this.updateLanguage(n), n.focus();
							}
						},
					},
					{
						key: 'showPanel',
						value: function () {
							var e = this;
							(this.isOpen = !0),
								bb(this.el, 'open'),
								this.view.updatePanelPosition(),
								this.toggleBtnEl.setAttribute('aria-expanded', !0),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!0),
								this.selectedEl.focus(),
								gb.setFocusRectOn(this.selectedEl),
								(this.removeKeyListener = wb('keydown', function (t) {
									return e.handleKeyDown(t);
								}));
						},
					},
					{
						key: 'hidePanel',
						value: function () {
							(this.isOpen = !1),
								vb(this.el, 'open'),
								this.toggleBtnEl.setAttribute('aria-expanded', !1),
								this.removeKeyListener(),
								null != this.view.updatePanelDepth && this.view.updatePanelDepth(!1);
						},
					},
					{
						key: 'onBlur',
						value: function (e) {
							null != e && this.isOpen && !this.el.contains(e.relatedTarget) && (this.hidePanel(), lb(fb(o.prototype), 'onBlur', this).call(this));
						},
					},
					{
						key: 'onFocus',
						value: function (e) {
							var t = e.target;
							if (this.el.contains(t)) return gb.setFocusRectOn(t), (this.isFocused = !1), !1;
						},
					},
				]) && ab(t.prototype, n),
				r && ab(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		Ob = kb,
		Eb = DS,
		Cb = Eb.utils.pxify,
		xb = Eb.localizationManager,
		Lb = 'languagePicker';
	function Pb(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return Tb(e);
			})(e) ||
			(function (e) {
				if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ('string' == typeof e) return Tb(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				'Object' === n && e.constructor && (n = e.constructor.name);
				if ('Map' === n || 'Set' === n) return Array.from(e);
				if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Tb(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function Tb(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	G.def(Lb, Ob, function (e) {
		var t = G.model,
			n = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'background-color'),
			r = de.getColor(e, '.cs-topmenu-item.active .cs-panel', 'border-top-color', '.cs-base'),
			i = de.getColor(e, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme'),
			o = G.getNamespace(e).bottomBar;
		return {
			noUpdate: !0,
			attrs: { id: Lb, class: 'btn cs-button cs-settings' },
			overflow: 'visible',
			w: 30,
			parentAlign: 'l',
			h: function () {
				return 30;
			},
			x: function () {
				return this.left || 0;
			},
			y: 'vertical-center',
			methods: {
				getLanguages: function () {
					var e = xb.getLanguages(),
						t = xb.getCurrentLangCode();
					return e
						.map(function (e, n) {
							var r = e.langCode,
								o = e.displayNames;
							r = r.toLowerCase();
							var a = o.find(function (e) {
								return e.langCode.toLowerCase() === r;
							}).name;
							return '\n            <li tabindex="-1">\n              <div\n                class="cs-listitem menu-choice '
								.concat(r === t ? 'selected' : '', '" \n                data-lang-code="')
								.concat(r, '"\n                data-index="')
								.concat(n, '"\n                tabindex="')
								.concat(r === t ? 0 : -1, '" \n                role="menuitemcheckbox" \n                aria-checked="')
								.concat(r === t, '" \n                aria-label="')
								.concat(a, '"\n              >\n                <div class="selected-icon" style="fill:')
								.concat(
									i,
									';">\n                  <svg width="12" height="9" viewBox="0 0 12 9">\n                    <path d="M10 0.3 L11.5 1.7 L4.3 8.9 L0 4.7 L1.4 3.2 L4.3 6.1 L10 0.3 Z" stroke="none"></path>\n                  </svg>\n                </div>\n                <div class="label">',
								)
								.concat(a, '</div>\n              </div>\n            </li>\n          ');
						})
						.join('');
				},
				updatePanelPosition: function () {
					if (null != o) {
						var e = this.children.contentPanel.el;
						e.style.left = 0;
						var t = e.getBoundingClientRect(),
							n = o.el.getBoundingClientRect(),
							r = 0;
						t.right > n.right - xn && (r = n.right - (t.right + xn)),
							t.left < n.left + xn && (r = n.left - t.left + xn),
							(e.style.left = Cb(r)),
							(this.children.contentPanelArrow.el.style.transform = 'translateX('.concat(Cb(0 - r), ')'));
					}
				},
				updatePanelDepth: function (e) {
					o.panelToggled('languagePicker', e);
				},
				updateDomStrings: function () {
					(this.viewLogic.languagePickerTitleEl.textContent = t.getString('language_picker_title')),
						this.viewLogic.languagePickerWrapperEl.setAttribute('aria-label', t.getString('language_picker_title')),
						this.viewLogic.toggleBtnEl.setAttribute('aria-label', t.getString('acc_language_picker')),
						this.viewLogic.updateSelection();
				},
			},
			updateHook: function () {
				this.updatePanelPosition();
			},
			html: function () {
				var e = G.model.getString('language_picker_title'),
					i = '\n        <button data-ref="toggleBtn" aria-expanded="false" class="cs-button" aria-label="'
						.concat(t.getString('acc_language_picker'), '" tabIndex="0">\n          ')
						.concat(
							Yn('languagePicker')(),
							'\n        </button>\n        <div \n          data-ref="contentPanel" \n          class="settings-panel" \n          tabindex="-1"\n        >\n          <div class="content">\n            <div data-ref=\'languagePickerTitle\' class=\'cs-heading title\'>',
						)
						.concat(e, "</div>\n            <ul data-ref='languagePickerWrapper' aria-label=\"")
						.concat(e, '" role="menu">\n              ')
						.concat(
							this.getLanguages(),
							'\n            </ul>\n          </div>\n          <div class="panel-down-arrow" style="height: 18px; width: 18px; position: absolute;">\n            <div data-ref="contentPanelArrow" style="height: 100%; width: 100%;">\n              ',
						)
						.concat(Yn('downArrow')(n, r), '\n            </div>\n          </div>\n        </div>\n        ');
				return i;
			},
		};
	});
	var _b = DS.constants.refs.FRAME,
		jb = DS,
		Db = jb.detection,
		Ab = (jb.flagManager, jb.captionsManager);
	function Ib(e) {
		return (
			(Ib =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ib(e)
		);
	}
	function Rb(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Ib(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Ib(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Ib(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	var Bb = DS,
		Mb = Bb._,
		Hb = Bb.pubSub,
		Nb = Bb.events,
		Fb = (function () {
			function e(t) {
				!(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, e),
					(this.el = t.el),
					(this.nameSpace = t.nameSpace),
					this.el.classList.add(this.nameSpace),
					Mb.bindAll(this, 'onSlideTransitionIn', 'onWindowClosing'),
					Hb.on(Nb.slide.ON_TRANSITION_IN, this.onSlideTransitionIn),
					Hb.on(Nb.window.CLOSING, this.onWindowClosing);
			}
			var t, n, r;
			return (
				(t = e),
				(n = [
					{
						key: 'onSlideTransitionIn',
						value: function (e) {
							e.windowId === this.nameSpace && document.body.classList.add('showing-'.concat(this.nameSpace.toLowerCase()));
						},
					},
					{
						key: 'onWindowClosing',
						value: function (e) {
							e === this.nameSpace && document.body.classList.remove('showing-'.concat(this.nameSpace.toLowerCase()));
						},
					},
				]) && Rb(t.prototype, n),
				r && Rb(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				e
			);
		})(),
		Wb = DS.scaler,
		Vb = 'lightBoxWrapper';
	function Ub(e) {
		return (
			(Ub =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Ub(e)
		);
	}
	function Kb(e, t, n) {
		return (
			(t = (function (e) {
				var t = (function (e, t) {
					if ('object' !== Ub(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || 'default');
						if ('object' !== Ub(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === t ? String : Number)(e);
				})(e, 'string');
				return 'symbol' === Ub(t) ? t : String(t);
			})(t)) in e
				? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (e[t] = n),
			e
		);
	}
	G.def(Vb, Fb, function (e) {
		var t = G.model,
			n = t.slideWidth,
			r = t.slideHeight,
			i = G.getNamespace(e).lightBoxBottom;
		return {
			attrs: { id: Vb, class: 'cs-base cs-'.concat(t.frame.default_layout, ' fn-').concat(t.frame.default_layout) },
			style: { transformOrigin: '0px 0px' },
			overflow: 'visible',
			dimScale: function () {
				var e = 0.8 * (window.innerWidth - t.getDockedWidth()),
					o = 0.8 * window.innerHeight;
				return Math.min(e / n, o / (r + (null != i ? 50 : 0)));
			},
			w: function () {
				var e = n * this.dimScale,
					t = Wb.zoomMode && n > e ? 9.5 : 0;
				return (this.scrollW = t), Wb.zoomMode ? Math.min(n, e) + t : e;
			},
			h: function () {
				var e = r * this.dimScale,
					t = Wb.zoomMode && r > e ? 9.5 : 0;
				this.scrollH = t;
				var n = Wb.zoomMode ? Math.min(r, e) + t : e;
				return n + (null != i ? 50 : 0);
			},
			x: function () {
				return (window.innerWidth - t.getDockedWidth() - this.w) / 2;
			},
			y: function () {
				return (window.innerHeight - this.h) / 2;
			},
			add: !0,
		};
	});
	var zb = 'lightBoxSlide',
		Qb = DS,
		Gb = Qb.scaler,
		Zb = Qb.MicroScrollBar,
		qb = Qb.utils.pxify;
	G.def(zb, Cn, function (e) {
		var t,
			n = G.getNamespace(e),
			r = n.lightBoxBottom,
			i = n.lightBoxWrapper;
		return (
			Kb(
				(t = {
					attrs: { class: ''.concat(zb, ' window-slide ').concat(e, '-slide'), role: 'dialog', 'aria-modal': !0 },
					overflow: 'scroll',
					winScale: function () {
						return Gb.zoomMode ? 1 : i.dimScale;
					},
					w: '100%',
				}),
				'w',
				function () {
					return this.parent.w - this.parent.scrollW;
				},
			),
			Kb(t, 'h', function () {
				return this.parent.h - (null != r ? 50 : 0) - this.parent.scrollH;
			}),
			Kb(t, 'z', 1),
			Kb(t, 'bgColor', 'white'),
			Kb(t, 'add', !0),
			Kb(
				t,
				'html',
				'<div id="slide-label-lightbox" data-ref="label" aria-live="polite"></div><main data-ref="container" class="slide-container" tabindex="-1"></main>',
			),
			Kb(t, 'childViews', ['captionContainer']),
			Kb(t, 'updateHook', function () {
				var e = this;
				if (Gb.zoomMode) {
					null == this.scrollbar && ((this.scrollbar = new Zb(this.el, 'lightbox-slide')), (this.hscrollbar = new Zb(this.el, 'lightbox-slide', !0))),
						(this.scrollbar.scrollBar.style.left = qb(this.x + this.w)),
						(this.scrollbar.scrollBar.style.top = qb(this.y)),
						(this.hscrollbar.scrollBar.style.left = qb(this.x)),
						(this.hscrollbar.scrollBar.style.top = qb(this.y + this.h)),
						this.scrollbar.setEnabled(!0),
						this.hscrollbar.setEnabled(!0);
					window.requestAnimationFrame(function t() {
						e.el.getElementsByClassName('slide').length > 0 ? (e.scrollbar.update(), e.hscrollbar.update()) : window.requestAnimationFrame(t);
					});
				} else this.scrollbar && (this.scrollbar.setEnabled(!1), this.hscrollbar.setEnabled(!1));
				this.children.captionContainer.update();
			}),
			t
		);
	});
	function Yb(e) {
		return (
			(Yb =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Yb(e)
		);
	}
	function Xb(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Yb(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Yb(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Yb(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function $b(e, t) {
		return (
			($b = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			$b(e, t)
		);
	}
	function Jb(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = ev(e);
			if (t) {
				var i = ev(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Yb(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function ev(e) {
		return (
			(ev = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			ev(e)
		);
	}
	G.def('lightBox', function () {
		return { attrs: { class: 'lightbox cs-base' }, x: 0, y: 0, z: 1, w: '100%', h: '100%', overflow: 'visible' };
	});
	var tv = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && $b(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = Jb(o);
			function o(e) {
				var t;
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					(t = i.call(this, e)).onClick(t.onClickClose),
					t
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'onClickClose',
						value: function (e) {
							var t = this.model.windowId;
							DS.pubSub.trigger(DS.events.window.CLOSING, t);
						},
					},
				]) && Xb(t.prototype, n),
				r && Xb(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(Dt),
		nv = tv;
	function rv(e) {
		return (
			(rv =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			rv(e)
		);
	}
	function iv(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== rv(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== rv(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === rv(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function ov(e, t) {
		return (
			(ov = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			ov(e, t)
		);
	}
	function av(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = lv(e);
			if (t) {
				var i = lv(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === rv(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return (function (e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				})(e);
			})(this, n);
		};
	}
	function lv(e) {
		return (
			(lv = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			lv(e)
		);
	}
	var sv = (function (e) {
			!(function (e, t) {
				if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
				(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
					Object.defineProperty(e, 'prototype', { writable: !1 }),
					t && ov(e, t);
			})(o, e);
			var t,
				n,
				r,
				i = av(o);
			function o() {
				return (
					(function (e, t) {
						if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
					})(this, o),
					i.apply(this, arguments)
				);
			}
			return (
				(t = o),
				(n = [
					{
						key: 'getViewBox',
						value: function () {
							var e = this.view,
								t = e.w,
								n = e.h,
								r = e.x,
								i = e.y;
							return { x: (r -= 15), y: (i -= 15), w: (t += 30), h: (n += 30) };
						},
					},
				]) && iv(t.prototype, n),
				r && iv(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				o
			);
		})(nv),
		cv = sv,
		uv = 'lightBoxClose';
	G.def(uv, cv, function (e) {
		var t = { windowId: e };
		return {
			tag: 'button',
			ariaStringId: 'close',
			attrs: { id: uv, class: 'lightbox-close-btn-floating', tabindex: 0, 'z-index': 999, 'aria-label': DS.stringTabler.getString('close') },
			style: { overflow: 'visible' },
			html: Yn('close'),
			y: 35,
			x: function () {
				return window.innerWidth - G.model.getDockedWidth() - (this.w + 35);
			},
			model: t,
			w: 20,
			h: 20,
		};
	});
	G.def('visibleOverlay', function () {
		return {
			attrs: { class: 'visible-overlay' },
			x: 0,
			y: 0,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			position: 'fixed',
			bgColor: 'rgba(0, 0, 0, 0.4)',
			add: !0,
		};
	});
	var fv = 'lightBoxBlocker';
	G.def(fv, function (e) {
		var t = G.getNamespace(e).lightBoxWrapper,
			n = function () {
				return ''
					.concat(t.x, 'px ')
					.concat(t.w, 'px ')
					.concat(window.innerWidth - t.x - t.w, 'px');
			},
			r = function () {
				return ''
					.concat(t.y, 'px ')
					.concat(t.h, 'px ')
					.concat(window.innerHeight - t.y - t.h, 'px');
			};
		return {
			attrs: { id: fv, class: 'frame-blocker-container' },
			x: 0,
			y: 0,
			z: Tn,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			style: { 'pointer-events': 'none', 'grid-template-columns': n(), 'grid-template-rows': r() },
			visible: !1,
			visibility: 'no-reflow',
			html: '<div class="frame-blocker-slide"></div><div class="frame-blocker-top"></div><div class="frame-blocker-bottom"></div><div class="frame-blocker-right"></div><div class="frame-blocker-left"></div>',
			updateHook: function () {
				var e = this;
				window.requestAnimationFrame(function () {
					(e.el.style['grid-template-columns'] = n()), (e.el.style['grid-template-rows'] = r());
				});
			},
			methods: {
				setBackgroundColor: function (e) {
					this.el.childNodes.forEach(function (t) {
						t.style.background = e;
					});
				},
			},
		};
	});
	var dv = 'LightboxWnd',
		hv = 'lightBoxBottom';
	G.def(hv, function (e) {
		var t = G.model.rtl;
		return {
			tag: 'nav',
			attrs: { id: hv, class: 'lightbox option-pane' },
			x: 0,
			y: function () {
				return this.parent.y + this.parent.h - this.h;
			},
			w: '100%',
			h: 50,
			updateHook: function () {
				this.hasAllChildren() && this.flowChildren({ alignChild: !0, bounds: { t: 0, b: this.h, l: 0, r: this.w }, pad: 4, reverse: t });
			},
			childVisibilityChangedHook: function () {
				this.update();
			},
		};
	});
	var pv = 'lightBoxControlsBlocker';
	G.def(pv, function (e) {
		var t = G.getNamespace(e),
			n = t.lightBoxWrapper,
			r = t.lightBoxBottom,
			i = function () {
				return ''
					.concat(n.x, 'px ')
					.concat(n.w, 'px ')
					.concat(window.innerWidth - n.x - n.w, 'px');
			},
			o = function () {
				return ''
					.concat(n.y, 'px ')
					.concat(n.h - r.h, 'px ')
					.concat(window.innerHeight - n.y - n.h + r.h, 'px');
			};
		return {
			attrs: { id: pv, class: 'frame-blocker-container' },
			x: 0,
			y: 0,
			z: Tn,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			style: { 'pointer-events': 'none', 'grid-template-columns': i(), 'grid-template-rows': o() },
			visible: !1,
			visibility: 'no-reflow',
			html: '<div class="frame-blocker-slide"></div><div class="frame-blocker-top"></div><div class="frame-blocker-bottom"></div><div class="frame-blocker-right"></div><div class="frame-blocker-left"></div>',
			updateHook: function () {
				var e = this;
				window.requestAnimationFrame(function () {
					(e.el.style['grid-template-columns'] = i()), (e.el.style['grid-template-rows'] = o());
				});
			},
			methods: {
				setBackgroundColor: function (e) {
					this.el.childNodes.forEach(function (t) {
						t.style.background = e;
					});
				},
			},
		};
	});
	var yv = 'LightboxControlsWnd',
		bv = 'printWrapper';
	G.def(bv, function (e) {
		return {
			attrs: { id: bv, class: 'print-window' },
			w: 0,
			h: 0,
			style: { overflow: 'visible', transformOrigin: '0 0', background: 'transparent' },
			scale: 1,
			x: 0,
			y: 0,
			add: !0,
		};
	});
	var vv = DS.constants.printSettings,
		gv = 'printSlide';
	G.def(gv, Cn, function (e) {
		var t = G.model.slideWidth;
		return {
			attrs: { id: gv, class: 'cs-window window-slide '.concat(e, '-slide'), tabindex: -1 },
			style: { overflow: 'visible', transformOrigin: '0 0', background: 'transparent', display: 'none' },
			origin: '0 0',
			winScale: function () {
				return this.w / t;
			},
			w: function () {
				var e = DS.detection.os,
					t = e.isAndroid,
					n = e.isIOS;
				return t ? vv.android.pageW : n ? vv.ios.pageW : vv.desktop.pageW;
			},
			h: 0,
			x: 0,
			y: 0,
			z: 1,
			html: '<div data-ref="container" class="slide-container"></div>',
		};
	});
	var mv = 'PrintWindow',
		wv = 'messageWindowWrapper';
	G.def(wv, function (e) {
		var t = G.model,
			n = t.preso.display().windows().find({ id: e }),
			r = G.getNamespace(DS.constants.refs.FRAME),
			i = r.slide,
			o = r.wrapper;
		return {
			attrs: { id: wv, class: 'cs-base cs-'.concat(t.frame.default_layout, ' fn-').concat(t.frame.default_layout) },
			w: 0.8 * n.get('width'),
			h: n.get('height'),
			style: { overflow: 'visible', transformOrigin: '0 0', background: 'transparent' },
			scale: function () {
				return o.scale;
			},
			x: function () {
				var e = o.scale;
				return o.x + (i.x + (i.w - this.w) / 2) * e;
			},
			y: function () {
				var e = o.scale;
				return o.y + (i.y + (i.h - this.h) / 2) * e;
			},
			add: !0,
		};
	});
	var Sv = 'messageWindowSlide';
	G.def(Sv, Cn, function () {
		return {
			attrs: { id: Sv, class: 'cs-window', 'aria-labelledby': 'slide-label-message', role: 'alertdialog', 'aria-modal': !0, tabindex: -1 },
			origin: '0 0',
			w: '100%',
			h: '100%',
			x: 0,
			y: 0,
			z: 1,
			html: '<div id="slide-label-message" data-ref="label"></div><div data-ref="container" class="slide-container"></div>',
		};
	});
	G.def('overlay', function () {
		return {
			attrs: { class: 'overlay overlay-message' },
			x: 0,
			y: 0,
			w: function () {
				return window.innerWidth;
			},
			h: function () {
				return window.innerHeight;
			},
			position: 'fixed',
			add: !0,
		};
	});
	var kv = 'MessageWnd',
		Ov = DS.scaler,
		Ev = 'shortcutWrapper';
	G.def(Ev, function (e) {
		var t = G.model,
			n = G.getNamespace(DS.constants.refs.FRAME),
			r = (n.slide, n.wrapper);
		return {
			attrs: { id: Ev, class: 'cs-base cs-'.concat(t.frame.default_layout, ' fn-').concat(t.frame.default_layout) },
			w: function () {
				return 0.7 * r.w;
			},
			h: function () {
				return 0.7 * r.h;
			},
			style: { overflow: 'visible', transformOrigin: '0 0', background: 'transparent' },
			x: function () {
				return r.x / Ov.getScale() + (r.w - this.w) / 2;
			},
			y: function () {
				return r.y / Ov.getScale() + (r.h - this.h) / 2;
			},
			add: !0,
		};
	});
	var Cv = function () {
			return 'no icon';
		},
		xv = {
			track: function (e, t) {
				return '\n      <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="16px" viewBox="0 0 24 16">\n        <defs>\n            <rect id="'
					.concat(
						t,
						'-track" x="2" y="3.5" width="20" height="9" rx="4.5"></rect>\n            <filter x="-12.5%" y="-27.8%" width="125.0%" height="155.6%" filterUnits="objectBoundingBox" id="',
					)
					.concat(
						t,
						'-trackFilter">\n                <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>\n                <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>\n                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>\n                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>\n            </filter>\n        </defs>\n        <g class="thumb-off" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g>\n                <use fill="#D1D1D1" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n                <use fill="white" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n                <use stroke="#AFAFAF" stroke-width="1" xlink:href="#')
					.concat(
						t,
						'-track"></use>\n                <circle fill="#585858" stroke-width="0" cx="8" cy="8" r="5"></circle>\n            </g>\n        </g>\n        <g class="thumb-on" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g>\n                <use fill="#DBDBDB" fill-rule="evenodd" xlink:href="#',
					)
					.concat(t, '-track"></use>\n                <use fill="white" fill-opacity="1" filter="url(#')
					.concat(t, '-trackFilter)" xlink:href="#')
					.concat(t, '-track"></use>\n                <use stroke="#AFAFAF" stroke-width="1" xlink:href="#')
					.concat(t, '-track"></use>\n                <circle fill="')
					.concat(e, '" stroke-width="0" cx="16" cy="8" r="6"></circle>\n            </g>\n        </g>\n      </svg>\n    ');
			},
		};
	function Lv(e) {
		return (
			(Lv =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			Lv(e)
		);
	}
	function Pv(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				'value' in r && (r.writable = !0),
				Object.defineProperty(
					e,
					((i = r.key),
					(o = void 0),
					(o = (function (e, t) {
						if ('object' !== Lv(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t || 'default');
							if ('object' !== Lv(r)) return r;
							throw new TypeError('@@toPrimitive must return a primitive value.');
						}
						return ('string' === t ? String : Number)(e);
					})(i, 'string')),
					'symbol' === Lv(o) ? o : String(o)),
					r,
				);
		}
		var i, o;
	}
	function Tv() {
		return (
			(Tv =
				'undefined' != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (e, t, n) {
							var r = (function (e, t) {
								for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Av(e)); );
								return e;
							})(e, t);
							if (r) {
								var i = Object.getOwnPropertyDescriptor(r, t);
								return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
							}
					  }),
			Tv.apply(this, arguments)
		);
	}
	function _v(e, t) {
		return (
			(_v = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (e, t) {
						return (e.__proto__ = t), e;
				  }),
			_v(e, t)
		);
	}
	function jv(e) {
		var t = (function () {
			if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ('function' == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
			} catch (e) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Av(e);
			if (t) {
				var i = Av(this).constructor;
				n = Reflect.construct(r, arguments, i);
			} else n = r.apply(this, arguments);
			return (function (e, t) {
				if (t && ('object' === Lv(t) || 'function' == typeof t)) return t;
				if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
				return Dv(e);
			})(this, n);
		};
	}
	function Dv(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	function Av(e) {
		return (
			(Av = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (e) {
						return e.__proto__ || Object.getPrototypeOf(e);
				  }),
			Av(e)
		);
	}
	var Iv = 'shortcutSlide',
		Rv = DS,
		Bv = Rv._,
		Mv = Rv.shortcutManager,
		Hv = Rv.keyManager,
		Nv = Rv.pubSub,
		Fv = Rv.events,
		Wv = Fv.window.CLOSING,
		Vv = Fv.player.ENABLE_KEYBOARD_SHORTCUTS,
		Uv = Rv.MicroScrollBar,
		Kv = Rv.focusManager,
		zv = (Rv.flagManager, Rv.constants),
		Qv = Rv.globalEventHelper.addDocumentListener;
	var Gv = (function (e) {
		!(function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
			(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
				Object.defineProperty(e, 'prototype', { writable: !1 }),
				t && _v(e, t);
		})(o, e);
		var t,
			n,
			r,
			i = jv(o);
		function o(e) {
			var t;
			return (
				(function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				})(this, o),
				(t = i.call(this, e)),
				Bv.bindAll(Dv(t), 'onKeyboardShortcutsChanged', 'toggleKeyboardShortcuts', 'onFocus', 'onKeydown'),
				Nv.on(Wv, t.closeWindow),
				(t.removeKeydownListener = Qv('keydown', t.onKeydown)),
				null != t.keyboardShortcutsSwitchEl && (t.onClickEl(t.keyboardShortcutsSwitchEl, t.toggleKeyboardShortcuts), Nv.on(Vv, t.onKeyboardShortcutsChanged)),
				t
			);
		}
		return (
			(t = o),
			(n = [
				{
					key: 'onKeydown',
					value: function (e) {
						Hv.isKey(e.which, zv.keys.ESCAPE) && this.closeWindow('ShortcutWnd');
					},
				},
				{
					key: 'closeWindow',
					value: function (e) {
						'ShortcutWnd' === e && Mv.closeShortcutWindow();
					},
				},
				{
					key: 'onKeyboardShortcutsChanged',
					value: function (e) {
						e
							? (this.keyboardShortcutsSwitchEl.classList.add('toggle-on'),
							  this.keyboardShortcutsSwitchEl.classList.remove('toggle-off'),
							  this.shortcutsTableEl.classList.remove('disabled'))
							: (this.keyboardShortcutsSwitchEl.classList.add('toggle-off'),
							  this.keyboardShortcutsSwitchEl.classList.remove('toggle-on'),
							  this.shortcutsTableEl.classList.add('disabled')),
							this.keyboardShortcutsSwitchEl.querySelector('button').setAttribute('aria-checked', e);
					},
				},
				{
					key: 'toggleKeyboardShortcuts',
					value: function () {
						Mv.enableShortcuts(!Mv.enabled);
					},
				},
				{
					key: 'onFocus',
					value: function (e) {
						var t = e.target;
						this.el.contains(t) && Kv.setFocusRectOn(t);
					},
				},
				{
					key: 'teardown',
					value: function () {
						Nv.off(Wv, this.closeWindow),
							null != this.keyboardShortcutsSwitchEl && Nv.off(Vv, this.onKeyboardShortcutsChanged),
							this.removeKeydownListener(),
							Tv(Av(o.prototype), 'teardown', this).call(this);
					},
				},
			]) && Pv(t.prototype, n),
			r && Pv(t, r),
			Object.defineProperty(t, 'prototype', { writable: !1 }),
			o
		);
	})(Cn);
	G.def(Iv, Gv, function () {
		var e = G.model;
		return {
			attrs: { id: Iv, class: 'shortcut-slide', 'aria-labelledby': 'slide-label-message', role: 'alertdialog', 'aria-modal': !0, tabindex: -1 },
			style: { overflow: 'scroll' },
			origin: '0 0',
			w: '100%',
			h: '100%',
			x: 0,
			y: 0,
			z: 1,
			html: function () {
				var t = DS.detection.theme.isUnified
						? [zv.refs.FRAME, '.cs-brandhighlight-bg', 'background-color', '.cs-base.cs-custom-theme']
						: [zv.refs.FRAME, '.cs-duration stop:last-child', 'stop-color', void 0, '.cs-duration stop'],
					n = de.getColor.apply(de, t),
					r = '\n        <div class="switch '
						.concat(
							Mv.enabled ? 'toggle-on' : 'toggle-off',
							'" data-ref="keyboardShortcutsSwitch">\n          <label id="shortcuts-label" class="switch-label">',
						)
						.concat(e.getString('enable_keyboardshortcuts'), '</label>\n          <button class="switch-toggle" tabindex="0" role="switch" aria-checked="')
						.concat(Mv.enabled, '" aria-labelledby="shortcuts-label">\n            ')
						.concat((xv['track'] || Cv)(n, 'shortcuts'), '\n          </button>\n        </div>'),
					i = '<h1>'.concat(e.getString('keyboardshortcuts')).concat(r, '</h1>'),
					o = Mv.getShortcutList()
						.map(function (t) {
							var n = t.name,
								r = t.keyInfo;
							return '<tr class="'
								.concat('?' === r.key ? '' : 'disableable', '"><td class="action">')
								.concat(n, '</td><td class="key">')
								.concat(
									(function (e, t) {
										return (
											(e.ctrl ? t.getString('ctrl_key') + '+' : '') +
											(e.alt ? t.getString('alt_key') + '+' : '') +
											(e.shift ? t.getString('shift_key') + '+' : '') +
											(e.keyName || e.key).toUpperCase()
										);
									})(r, e),
									'</td></tr>',
								);
						})
						.join(''),
					a = '<tr><th class="action">'.concat(e.getString('action'), '</th><th class="key">').concat(e.getString('shortcut'), '</th></tr>');
				return [i, '<table data-ref="shortcutsTable">'.concat(a).concat(o, '</table>')].join('');
			},
			childDef: function () {
				null == this.scrollbar && (this.scrollbar = new Uv(this.el, 'shortcut-slide'));
			},
		};
	});
	var Zv = DS.scaler,
		qv = 'shortcutClose';
	G.def(qv, nv, function (e) {
		var t = { windowId: e };
		return {
			tag: 'button',
			attrs: { id: qv, class: 'close-btn-floating', tabindex: 0, 'z-index': 999, 'aria-label': G.model.getString('close'), 'data-aria-label-id': 'close' },
			style: { overflow: 'visible' },
			html: function () {
				return '<svg class="cs-icon icon-close" width="'
					.concat(20 * Zv.getScale(), '" height="')
					.concat(
						20 * Zv.getScale(),
						'" viewBox="0 0 36 36" focusable="false">\n                <polygon points="36,2.826 33.174,0 18,15.174 2.826,0 0,2.826 15.174,18 0,33.174 2.826,36 18,20.826 33.174,36 36,33.174 20.826,18" />\n              </svg>',
					);
			},
			methods: {
				updateDomStrings: function () {
					this.el.setAttribute('aria-label', G.model.getString('close'));
				},
			},
			y: 35,
			x: function () {
				var e = G.getNamespace('_frame').wrapper;
				return Math.max(window.innerWidth / Zv.getScale(), e.w) - (this.w + 35);
			},
			model: t,
			w: 20,
			h: 20,
		};
	});
	var Yv,
		Xv = 'ShortcutWnd';
	function $v(e) {
		return (
			($v =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  }),
			$v(e)
		);
	}
	function Jv(e, t, n) {
		return (
			(t = (function (e) {
				var t = (function (e, t) {
					if ('object' !== $v(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || 'default');
						if ('object' !== $v(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === t ? String : Number)(e);
				})(e, 'string');
				return 'symbol' === $v(t) ? t : String(t);
			})(t)) in e
				? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
				: (e[t] = n),
			e
		);
	}
	!(function (e, t) {
		Je(e),
			(function (e) {
				var t = window.globalProvideData;
				if (
					((window.globalProvideData = function (e, n) {
						'frame' === e &&
							(null != (ve = JSON.parse(n)).localization && DS.flagManager.multiLangSupport
								? (DS.localizationManager.registerFrameLanguageData(ve.localization),
								  DS.localizationManager.loadFrameData().then(function (e) {
										(ge = e), et();
								  }))
								: et(),
							(window.globalProvideData = t));
					}),
					Ke.on(je, function (e) {
						new Ce(),
							(be = new f(ve, ge, e)),
							G.setModel(be),
							Ge.initialize(be),
							Ze.initialize(function (e) {
								return be.getString(e);
							}),
							(DS.frameModel = be),
							(DS.views = G),
							(DS.frameModel.frame.chromeless || DS.detection.env.hideFrame) && qe.addClass(document.body, 'chromeless'),
							Ke.trigger(Ie);
					}),
					window.globals.useJson)
				) {
					var n = e.replace('.js', '.json'),
						r = new XMLHttpRequest();
					return (
						r.overrideMimeType('application/json'),
						(r.onreadystatechange = function () {
							4 === r.readyState && 200 === r.status && window.globalProvideData('frame', r.responseText.replace(/\\'/g, "'").replace(/\\"/g, '"'));
						}),
						r.open('GET', n, !0),
						void r.send(null)
					);
				}
				DS.loadScript(e);
			})(t);
	})(
		(Jv((Yv = {}), _b, function (e) {
			var t,
				n,
				r = e.topTabsLeft,
				i = e.topTabsRight,
				o = e.sidebarOpts,
				a = o.timeEnabled,
				l = o.logoEnabled,
				s = o.html5_logo_url,
				c = e.frame.controlOptions.controls,
				u = c.closed_captions,
				f = c.settings,
				d = function () {
					return e.frame.chromeless || Db.env.hideFrame;
				},
				h = function () {
					return G.tree(_b, [
						{
							wrapper: [
								d()
									? 'slide'
									: {
											frame: [
												'frameBlocker',
												d() ? null : 'sidebarOverlay',
												'slide',
												!d() && e.frame.skip_nav_enabled ? 'skipnav' : null,
												{
													bottomBar: [
														{ playbackControls: ['playPause', 'seek', 'reset'] },
														{
															miscControls: ['volume'].concat(
																Pb(u ? ['captions'] : []),
																['playbackSpeed'],
																Pb(DS.flagManager.multiLangSupport && DS.localizationManager.getLanguages().length > 1 ? ['languagePicker'] : []),
																Pb(f ? ['settings'] : []),
															),
														},
														{ navControls: ['fullScreenToggle', 'prev', 'next', 'submit'] },
													],
												},
												{ sidebar: [].concat(Pb(l && s ? ['logo'] : []), ['hamburger', 'tabs', 'sidebarPanels']) },
												{ topBar: ['title', { topTabs: ['arrowShadow', 'linksRight'] }, { topEllipsis: ['topEllipsisPanel'] }].concat(Pb(a ? ['timer'] : [])) },
											],
									  },
							],
						},
						'captionContainer',
					]);
				},
				p = h();
			(t = document.querySelectorAll('.panel > div[id*=content]')),
				(n = rt.theme.isUnified ? 12 : 0),
				Array.from(t).forEach(function (e) {
					var t = e.parentNode.id;
					if ('outline-panel' != t) {
						var r = t.replace('-panel', '');
						new nt(e, r, !1, n);
					} else {
						var i = e.querySelector('#outline-content'),
							o = e.querySelector('#search-results-content');
						null != i && new nt(i, 'outline', !1, n), null != o && new nt(o, 'search', !1, n);
					}
				});
			var y = function (e) {
					return function (t) {
						return t.name === e;
					};
				},
				b = function (e) {
					return !r.some(y(e)) && !i.some(y(e));
				},
				v = function (t, n) {
					if (n === _b) {
						var r = (function (e, t) {
								var n = e.sidebarOpts.sidebarEnabled;
								return n && (n = ot(e.sidebarTabs, t)), n || (e.sidebarOpts.logoEnabled && DS.detection.theme.isClassic);
							})(e, t),
							i = ot([].concat(Pb(e.topTabsRight), Pb(e.topTabsLeft)), t),
							o = {
								playPause: t.pauseplay,
								reset: t.seekbar,
								seek: t.seekbar,
								playbackControls: t.pauseplay || t.reset || t.seekbar,
								fullScreenToggle: t.fullScreenToggle,
								playbackSpeed: t.playbackSpeedControl,
								next: t.next,
								prev: t.previous,
								submit: t.submit,
								skipnav: r || i,
								volume: t.volume,
								glossaryTab: t.glossary,
								glossaryPanel: t.glossary && b('glossary'),
								glossaryLink: t.glossary,
								resourcesTab: t.resources,
								resourcesPanel: t.resources && b('resources'),
								resourcesLink: t.resources,
								outlineTab: t.outline.enabled,
								outlinePanel: t.outline.enabled && b('outline'),
								outlineLink: t.outline.enabled,
								transcriptTab: t.transcript,
								transcriptPanel: t.transcript && b('transcript'),
								transcriptLink: t.transcript,
								sidebar: r,
								bottomBar: e.bottomBarOpts.bottomBarEnabled,
							};
						G.resetStates(_b), G.updateVisibility(o, _b), G.update(p);
					}
				};
			DS.pubSub.on(DS.events.frameModel.LAYOUT_CHANGED, v);
			var g,
				m = function (e) {
					var t = e.kind,
						n = e.name,
						r = e.visible,
						i = e.enable,
						o = e.affectTabStop,
						a = 'toggle_window_control_visible' === t || 'toggle_window_control' === t;
					'previous' === n && (n = 'prev');
					var l = G['enable_window_control' === t || 'toggle_window_control' === t ? 'getTopNameSpace' : 'getFrameNameSpace']()[n];
					null != l &&
						(a
							? 'toggle_window_control_visible' === t
								? (l.setVisibility(!l.visible), l.childVisibilityChanged())
								: l.setEnabled(!l.enabled, o)
							: 'set_window_control_visible' === t
							? (l.setVisibility(r), l.childVisibilityChanged())
							: l.setEnabled(i, o));
				};
			if ((DS.pubSub.on(DS.events.navcontrols.CHANGED, m), !window.globals.HAS_SLIDE && !Db.theme.isClassic)) {
				Ab.isCaptionEnabled = function () {
					return captionsEnabled;
				};
				var w = function () {
						var e = document.querySelector('.caption-container');
						if (null == e.querySelector('.caption')) {
							e.style.display = 'none';
							var t = document.createElement('div');
							t.classList.add('caption'), (t.style.margin = '10px 0 0 0'), (t.style.bottom = '0%');
							var n = document.createElement('p'),
								r = DS.playerGlobals.player.getCaptionData();
							(n.innerHTML = r.text.replace(/\r\n/g, '<br />')), t.appendChild(n), e.appendChild(t), S(r);
						}
					},
					S = function (e) {
						if ((w(), null != e)) {
							document.querySelector('.caption-container').style.fontSize = ''.concat(e.size, '%') || 0;
							var t = document.querySelector('.caption'),
								n = parseInt(e.placement, 10);
							(t.style.fontFamily = e.font),
								n > 50 ? ((t.style.top = 'unset'), (t.style.bottom = ''.concat(100 - n, '%'))) : ((t.style.top = e.placement), (t.style.bottom = 'unset'));
							var r = t.querySelector('p');
							(r.style.backgroundColor = e.backgroundColor), (r.style.color = e.color), (DS.frameModel.frame.controlOptions.ccOptions = e);
						}
					},
					k = function (e) {
						w(), (g = e), (document.querySelector('.caption-container').style.display = e ? 'block' : 'none');
					};
				DS.pubSub.on(DS.events.ccOptions.CHANGED, S), DS.pubSub.on(DS.events.captions.ENABLE, k), DS.pubSub.on(DS.events.captions.ENABLED, k);
			}
			var O = function () {
				G.update(p);
				var e = G.getNamespace(_b).sidebarPanels;
				e && null != e.children && e.updateChildren(!0);
			};
			DS.pubSub.on(DS.events.utilityWindow.DOCKED, function (t, n) {
				var r = n.dockedState,
					i = n.dockedWidth;
				e.setDocked(t, r, i), DS.pubSub.trigger(DS.events.frame.SCALE);
				var o = DS.utils.getPath(G.getNamespace(_b), 'hamburger.viewLogic');
				null != o && o.onResize();
			}),
				DS.pubSub.on(DS.events.frame.REFLOW, O);
			var E = function () {
				(p = h()), DS.pubSub.trigger(DS.events.controlOptions.RESET);
			};
			return (
				DS.pubSub.on(DS.events.frameModel.CHROMELESS_CHANGED, E),
				{
					all: O,
					resize: O,
					rerender: function () {
						G.update(p, !0),
							G.nameSpaces[_b].wrapper.updateChildren(!0),
							DS.renderEngine.createWindowFor(),
							window.globals.HAS_SLIDE ||
								window.requestAnimationFrame(function () {
									DS.pubSub.trigger(DS.events.captions.ENABLED, g);
								});
					},
					destroy: function () {
						DS.pubSub.off(DS.events.navcontrols.CHANGED, m),
							DS.pubSub.off(DS.events.frameModel.LAYOUT_CHANGED, v),
							DS.pubSub.off(DS.events.frame.REFLOW, O),
							DS.pubSub.off(DS.events.frameModel.CHROMELESS_CHANGED, E),
							G.nameSpaces[_b].topLevelElements.forEach(function (e) {
								return e.destroy();
							});
					},
				}
			);
		}),
		Jv(Yv, dv, function (e) {
			var t = G.tree(dv, ['lightBoxBlocker', 'visibleOverlay', { lightBoxWrapper: ['lightBoxSlide', 'lightBox'] }, 'lightBoxClose']),
				n = G.getNamespace(dv);
			return (
				(n.slide = n.lightBoxSlide),
				(n.wrapper = n.lightBoxWrapper),
				{
					all: function () {
						return G.update(t);
					},
					resize: function () {
						n.isAttached && G.update(t);
					},
					pinchZoom: function () {
						return n.lightBoxBottom.update();
					},
				}
			);
		}),
		Jv(Yv, yv, function (e) {
			var t = G.tree(yv, [
					'lightBoxControlsBlocker',
					'visibleOverlay',
					{ lightBoxWrapper: ['lightBoxSlide', { lightBox: [{ lightBoxBottom: ['submit', 'next', 'prev', 'captions'] }] }] },
					'lightBoxClose',
				]),
				n = G.getNamespace(yv);
			(n.slide = n.lightBoxSlide), (n.wrapper = n.lightBoxWrapper);
			var r = function (e, n) {
				if (n === yv) {
					var r = { next: e.next, prev: e.previous, submit: e.submit };
					G.resetStates(yv), G.updateVisibility(r, yv), G.update(t);
				}
			};
			return (
				DS.pubSub.on(DS.events.frameModel.LAYOUT_CHANGED, r),
				r(e.currControlLayout),
				{
					all: function () {
						return G.update(t);
					},
					resize: function () {
						n.isAttached && G.update(t);
					},
				}
			);
		}),
		Jv(Yv, mv, function (e) {
			G.tree(mv, [{ printWrapper: ['printSlide'] }]);
			var t = G.getNamespace(mv);
			return (t.slide = t.printSlide), (t.wrapper = t.printWrapper), { all: function () {}, resize: function () {}, pinchZoom: function () {} };
		}),
		Jv(Yv, kv, function (e) {
			var t = G.tree(kv, ['overlay', { messageWindowWrapper: ['messageWindowSlide'] }]),
				n = G.getNamespace(kv);
			return (
				(n.slide = n.messageWindowSlide),
				(n.wrapper = n.messageWindowWrapper),
				{
					all: function () {
						return G.update(t);
					},
					resize: function () {
						n.isAttached && (n.overlay.update(), n.messageWindowWrapper.update());
					},
				}
			);
		}),
		Jv(Yv, Xv, function (e) {
			var t = G.tree(Xv, ['visibleOverlay', { shortcutWrapper: ['shortcutSlide'] }, 'shortcutClose']),
				n = G.getNamespace(Xv);
			return (
				(n.slide = n.shortcutSlide),
				(n.wrapper = n.shortcutWrapper),
				{
					all: function () {
						return G.update(t);
					},
					resize: function () {
						n.isAttached && G.update(t, !0);
					},
				}
			);
		}),
		Yv),
		'html5/data/js/frame.js',
	);
})();
