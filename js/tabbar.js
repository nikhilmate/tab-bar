'use strict';
(function () {
    window.TabToggle = (function () {
        (function () {
            if (typeof Object.assign != 'function') {
                Object.assign = function (target, varArgs) {
                    if (target == null) {
                        throw new TypeError(
                            'Cannot convert undefined or null to object'
                        );
                    }
                    var to = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var nextSource = arguments[index];

                        if (nextSource != null) {
                            for (var nextKey in nextSource) {
                                if (
                                    Object.prototype.hasOwnProperty.call(
                                        nextSource,
                                        nextKey
                                    )
                                ) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                    }
                    return to;
                };
            }
        })();
        function TabToggle() {
            // THIS => function scope for Main Components
            // _this => function scope for inside Components
            var THIS = this;
            THIS._args = arguments[0];

            THIS._params = (function (_this) {
                var vars = {},
                    _args = _this._args;
                vars['defaultTab'] =
                    !!_args['defaultTab'] && typeof _args === 'object'
                        ? _args['defaultTab']
                        : null;
                vars['currentTab'] = vars['defaultTab'];
                vars['eventCB'] = null;
                return vars;
            })(THIS);

            THIS.tabEventHandler = function (event, parentEl) {
                event.preventDefault();
                var tabID = parentEl.getAttribute('tn-tab-id');
                if (!!tabID) {
                    THIS.setTargetActive(tabID);
                }
                THIS._params['eventCB'] &&
                    typeof THIS._params['eventCB'] === 'function' &&
                    THIS._params['eventCB'].apply(THIS, [parentEl]);
            };
            THIS.getTab = function (_el) {
                if (
                    _el instanceof Element &&
                    _el.tagName != document.documentElement.tagName
                ) {
                    var tabID = _el.getAttribute('tn-tab-id');
                    if (!!tabID) {
                        return _el;
                    } else {
                        return THIS.getTab.call(THIS, _el.parentNode);
                    }
                }
                return null;
            };
            THIS.setTargetActive = function (tabID) {
                var _tabID = tabID ? tabID.trim() : '';
                var totalEl = document.querySelectorAll(
                    '[tn-tab-id], [tn-tab-target]'
                );
                for (var i = 0; i < totalEl.length; i++) {
                    var tabSrc = totalEl[i].getAttribute('tn-tab-id')
                        ? totalEl[i].getAttribute('tn-tab-id').trim()
                        : null;
                    var tabTarget = totalEl[i].getAttribute('tn-tab-target')
                        ? totalEl[i].getAttribute('tn-tab-target').trim()
                        : null;
                    if (tabSrc == _tabID || tabTarget == _tabID) {
                        totalEl[i].classList.add('active');
                    } else {
                        totalEl[i].classList.remove('active');
                    }
                }
                THIS._setParams({
                    currentTab: _tabID,
                });
            };
            THIS._setParams = function (_obj) {
                THIS._params = Object.assign(THIS._params, {}, _obj);
            };
            THIS.setTabEventHandler = function () {
                document.addEventListener &&
                    document.addEventListener('click', function (e) {
                        var _parentTab = THIS.getTab.call(THIS, e.target);
                        if (!!_parentTab) {
                            THIS.tabEventHandler(e, _parentTab);
                        }
                    });
            };
            THIS.setDefaultTabinUI = function () {
                if (!!THIS._params['defaultTab']) {
                    var defaultTab = THIS._params['defaultTab'];
                    THIS.setTargetActive(defaultTab);
                }
            };

            THIS._setCallbackFunc = function (_cb) {
                THIS._setParams({
                    eventCB: _cb,
                });
            };

            THIS._init = (function (_this) {
                return function () {
                    _this.setTabEventHandler();
                    _this.setDefaultTabinUI();
                };
            })(THIS);

            THIS._resetTab = (function (_this) {
                return function () {
                    _this.setDefaultTabinUI();
                };
            })(THIS);

            return {
                init: function () {
                    THIS && THIS._init();
                },
                resetTab: function () {
                    THIS && THIS._resetTab();
                },
                attachCallBack: function (cb) {
                    THIS &&
                        typeof cb === 'function' &&
                        THIS._setCallbackFunc(cb);
                },
            };
        }
        return TabToggle;
    })();
})();
