(function () {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector);
    }

    // $方法
    jQuery.prototype.init = function (selector) {
        let dom;
        this.length = 0;

        if (selector == null) return this;

        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            dom = document.getElementsByClassName(selector.slice(1));
        } else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            dom = document.getElementById(selector.slice(1));
        } else if (typeof selector == 'string') {
            dom = document.getElementsByTagName(selector);
        } else {
            dom = selector;
        }

        if (selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        } else {
            // 基础铺垫
            for (let i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++;
            }
        }
    };
    // css方法
    jQuery.prototype.css = function (config) {
        // 循环操作每一个dom
        for (let i = 0; i < this.length; i++) {
            for (let attr in config) {
                this[i].style[attr] = config[attr];
            }
        }

        // 链式操作
        return this;
    };
    // show方法
    jQuery.prototype.show = function () {
        this.css({ display: 'block' });
    };
    // hide方法
    jQuery.prototype.hide = function () {
        this.css({ display: 'none' });
    };
    // get方法
    jQuery.prototype.get = function (num) {
        return num != null
            ? num >= 0
                ? this[num]
                : this[num + this.length]
            : [].slice.call(this, 0);
    };
    // on方法
    jQuery.prototype.on = function (event, selector, data, fn) {
        if (window.addEventListener) {
            if (this.length >= 0) {
                this[0].addEventListener(event, selector, false);

                return this;
            } else {
                this.addEventListener(event, selector, false);
                return this;
            }
        } else if (window.attachEvent) {
            if (this.length >= 0) {
                this[0].attachEvent('on' + event, selector.bind(this));
            } else {
                this.attachEvent('on' + event, selector.bind(this));
            }

            return this;
        }
    };
    // off方法
    jQuery.prototype.off = function (event, selector) {
        if (this.length >= 0) {
            this[0].removeEventListener(event, selector, false);
        } else {
            this.removeEventListener(event, selector, false);
        }
    };
    // attr添加元素属性方法
    jQuery.prototype.attr = function (selector, value) {
        if (value === undefined) {
            if (typeof selector == 'string') {
                // 如果selector是单个字符串
                if (this.length >= 0) {
                    return this[0].getAttribute(selector);
                } else {
                    return this.getAttribute(selector);
                }
            } else if (typeof selector == 'object') {
                // 如果selector是一个对象
                // 遍历selector对象
                for (let item in selector) {
                    // 判断this是否一个数组
                    if (this.length >= 0) {
                        for (let i = 0; i < this.length; i++) {
                            this[i].setAttribute(item, selector[item]);
                        }
                    } else {
                        this.setAttribute(item, selector[item]);
                    }
                }
                return this;
            }
        } else {
            if (this.length >= 0) {
                this[0].setAttribute(selector, value);
            } else {
                this.setAttribute(selector, value);
            }

            return this;
        }
    };
    // removeAttr 删除元素属性方法
    jQuery.prototype.removeAttr = function (selector) {
        if (typeof selector == 'string') {
            this[0].removeAttribute(selector);
        } else if (typeof selector == 'object') {
            for (let item in selector) {
                this[0].removeAttribute(item);
            }
        }

        return this;
    };
    // hasClass判断是否有className方法
    jQuery.prototype.hasClass = function (name) {
        for (let i = 0; i < this.length; i++) {
            if ((' ' + this[i].className + '').indexOf(' ' + name + '') > -1) {
                return true;
            }
        }

        return false;
    };
    // addClass添加className方法
    jQuery.prototype.addClass = function (name) {
        if (!this.hasClass(name)) {
            if (this.length > 0) {
                for (let i = 0; i < this.length; i++) {
                    this[i].className = this[i].className ? this[i].className + ' ' + name : name;
                }
            } else {
                this.className = this.className ? this.className + ' ' + name : name;
            }
        }

        return this;
    };
    // removeClass删除claaName方法
    jQuery.prototype.removeClass = function (name) {
        if (this.hasClass(name)) {
            let reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
            if (this.length > 0) {
                for (let i = 0; i < this.length; i++) {
                    this[i].className = this[i].className.replace(reg, '');
                }
            } else {
                this.className = this.className.replace(reg, '');
            }
        }
    };
    // toggleClass方法
    jQuery.prototype.toggleClass = function (name) {
        if (this.hasClass(name)) {
            this.removeClass(name);
        } else {
            this.addClass(name);
        }
    };

    // find查找子元素方法
    jQuery.prototype.find = function (name) {
        if (this[0].className.indexOf(name) > -1) {
            return this;
        } else {
            for (let i = 0; i < this[0].children.length; i++) {
                let children = this[0].children;

                if (typeof children[i].className === 'string') {
                    if (children[i].className.indexOf(name) > -1) {
                        return $(children[i]);
                    }
                }
            }
        }
    };

    // siblings查找所有兄弟元素
    jQuery.prototype.siblings = function () {
        let children = this[0].parentNode.childNodes;
        let siblings = [];

        for (let i = 0; i < children.length; i++) {
            if (children[i].nodeType == 1 && children[i] != this[0]) {
                siblings.push(children[i]);
            }
        }

        return $(siblings);
    };

    // data方法
    jQuery.prototype.data = function (key) {
        if (this.length > 0) {
            for (let i = 0; i < this.length; i++) {
                return this[i].getAttribute(`data-${key}`);
            }
        } else {
            return this.getAttribute(`data-${key}`);
        }
    };

    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery;
})();
