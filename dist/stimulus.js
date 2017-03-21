!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Stimulus=e():t.Stimulus=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=15)}([function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(){function t(t,e,n,r){this.object=t,this.descriptor=e,this.eventTarget=n,this.delegatedTargetMatcher=r}return Object.defineProperty(t.prototype,"eventName",{get:function(){return this.descriptor.eventName},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"methodName",{get:function(){return this.descriptor.methodName},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"preventsDefault",{get:function(){return this.descriptor.preventsDefault},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDirect",{get:function(){return null==this.delegatedTargetMatcher},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDelegated",{get:function(){return!this.isDirect},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"method",{get:function(){var t=this.object[this.methodName];if("function"==typeof t)return t;throw new Error('Action references undefined method "'+this.methodName+'"')},enumerable:!0,configurable:!0}),t.prototype.hasSameDescriptorAs=function(t){return null!=t&&t.descriptor.isEqualTo(this.descriptor)},t.prototype.matchDelegatedTarget=function(t){var e=this.delegatedTargetMatcher;return!!e&&e(t)},t.prototype.performWithEvent=function(t){this.preventsDefault&&t.preventDefault(),this.method.call(this.object,t)},t}()},function(t,e,n){"use strict";function r(t){throw new Error(t)}n.d(e,"a",function(){return o});var o=function(){function t(t,e,n,r){this.targetName=t,this.eventName=e,this.methodName=n,this.preventsDefault=r}return t.forOptions=function(e){return new t(e.targetName||null,e.eventName||r("Missing event name in descriptor"),e.methodName||r("Missing method name in descriptor"),e.preventsDefault||!1)},t.forElementWithInlineDescriptorString=function(e,n){try{var r=this.parseOptionsFromInlineActionDescriptorString(n);return r.eventName=r.eventName||this.getDefaultEventNameForElement(e),t.forOptions(r)}catch(t){throw new Error('Invalid descriptor "'+n+'": '+t.message)}},t.parseOptionsFromInlineActionDescriptorString=function(t){var e=t.trim(),n=e.match(/^(~)?((.+?)->)?(.+)$/)||r("Invalid descriptor syntax");return{eventName:n[3],methodName:n[4],preventsDefault:!n[1]}},t.getDefaultEventNameForElement=function(t){return this.defaultEventNames[t.tagName.toLowerCase()](t)},t.prototype.isEqualTo=function(t){return null!=t&&t.targetName==this.targetName&&t.eventName==this.eventName&&t.methodName==this.methodName&&t.preventsDefault==this.preventsDefault},t.prototype.toString=function(){return(this.preventsDefault?"":"~")+this.eventName+"->"+this.methodName},t}();o.defaultEventNames={a:function(t){return"click"},button:function(t){return"click"},form:function(t){return"submit"},input:function(t){return"submit"==t.getAttribute("type")?"click":"change"},select:function(t){return"change"},textarea:function(t){return"change"}}},function(t,e,n){!function(t,n){n(e)}(this,function(t){"use strict";function e(t){for(var e=new Set,n=0,r=t;n<r.length;n+=1){var o=r[n],i=o.attribute;void 0!=i&&e.add(i)}return e}function n(t,e,n){var r;n.has(t)?r=n.get(t):(r=new Set,n.set(t,r)),r.add(e)}function r(t,e,n){var r=n.get(t);r&&r.delete(e)}var o=function(t){try{this.source=t,this.tokens=a.readTokens(this.source),this.attributeSet=e(this.tokens)}catch(e){throw new Error("Error in selector '"+t+"': "+e.message)}},i={attributes:{}};o.get=function(t){var e,n=o.selectors;return t=t.toString().trim(),n.has(t)?e=n.get(t):(e=new o(t),n.set(t,e)),e},i.attributes.get=function(){return Array.from(this.attributeSet)},o.prototype.matches=function(t){return t.matches(this.source)},o.prototype.toString=function(){return this.source},Object.defineProperties(o.prototype,i),o.selectors=new Map;var s;!function(t){t[t.TAG=0]="TAG",t[t.ID=1]="ID",t[t.CLASS=2]="CLASS",t[t.ATTR=3]="ATTR"}(s||(s={}));var a=function(t,e,n,r){this.type=t,this.value=e,this.data=n||"",this.negated=r},c={attribute:{},length:{}};a.readTokens=function(t){var e=a.readToken(t,s.TAG)||a.readToken(t,s.ID)||a.readToken(t,s.CLASS)||a.readToken(t,s.ATTR);if(e){var n=t.slice(e.length);return[e].concat(a.readTokens(n))}if(0==t.length)return[];throw new Error("Invalid or unsupported syntax near '"+t+"'")},a.readToken=function(t,e){var n=a.PATTERNS[e],r=":not("==t.slice(0,5),o=r?5:0,i=t.slice(o).match(n);if(i){var s=i[0],c=i[1];if(r){if(")"==t.charAt(s.length+o))return new a(e,":not("+s+")",c,!0);throw new Error("Expected close-parenthesis after ':not("+s+"'")}return new a(e,s,c,!1)}},c.attribute.get=function(){switch(this.type){case s.ID:return"id";case s.CLASS:return"class";case s.ATTR:return this.data}},c.length.get=function(){return this.value.length},Object.defineProperties(a.prototype,c),a.PATTERNS=function(){var t="\\\\[0-9a-fA-F]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?",e="(?:"+t+")|\\\\[^\\n\\r\\f0-9a-fA-F]",n="\\n|\\r\\n|\\r|\\f",r="[^\\0-\\177]",o="[_a-zA-Z]|(?:"+r+")|(?:"+e+")",i="[_a-zA-Z0-9-]|(?:"+r+")|(?:"+e+")",a="-?(?:"+o+")(?:"+i+")*",c='"(?:[^\\n\\r\\f\\\\"]|\\\\(?:'+n+")|(?:"+e+"))*",u="'(?:[^\\n\\r\\f\\\\']|\\\\(?:"+n+")|(?:"+e+"))*",h="(?:"+c+")|(?:"+u+")",l="(?:"+a+")|(?:"+h+")";return p={},p[s.TAG]=new RegExp("^("+a+")"),p[s.ID]=new RegExp("^#("+a+")"),p[s.CLASS]=new RegExp("^\\.("+a+")"),p[s.ATTR]=new RegExp("^\\[("+a+")(?:(=|~=|\\|=|\\^=|\\$=|\\*=)("+l+"))?\\]"),p;var p}();var u=function(t,e){var n=this;this.element=t,this.started=!1,this.delegate=e,this.elements=new Set,this.mutationObserver=new MutationObserver(function(t){return n.processMutations(t)})};u.prototype.start=function(){this.started||(this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,subtree:!0}),this.started=!0,this.refresh())},u.prototype.stop=function(){this.started&&(this.mutationObserver.takeRecords(),this.mutationObserver.disconnect(),this.started=!1)},u.prototype.refresh=function(){var t=this;if(this.started){for(var e=new Set(this.matchElementsInTree()),n=0,r=Array.from(t.elements);n<r.length;n+=1){var o=r[n];e.has(o)||t.removeElement(o)}for(var i=0,s=Array.from(e);i<s.length;i+=1){var a=s[i];t.addElement(a)}}},u.prototype.processMutations=function(t){for(var e=this,n=0,r=t;n<r.length;n+=1){var o=r[n];e.processMutation(o)}},u.prototype.processMutation=function(t){"attributes"==t.type?this.processAttributeChange(t.target,t.attributeName):"childList"==t.type&&(this.processRemovedNodes(t.removedNodes),this.processAddedNodes(t.addedNodes))},u.prototype.processAttributeChange=function(t,e){var n=t;this.elements.has(n)?this.matchElement(n)?this.delegate.elementAttributeChanged(n,e):this.removeElement(n):this.matchElement(n)&&this.addElement(n)},u.prototype.processRemovedNodes=function(t){for(var e=this,n=0,r=t;n<r.length;n+=1){var o=r[n];e.processNode(o,e.removeElement)}},u.prototype.processAddedNodes=function(t){for(var e=this,n=0,r=t;n<r.length;n+=1){var o=r[n];e.processNode(o,e.addElement)}},u.prototype.matchElement=function(t){return this.delegate.matchElement(t)},u.prototype.matchElementsInTree=function(t){return void 0===t&&(t=this.element),this.delegate.matchElementsInTree(t)},u.prototype.processNode=function(t,e){var n=this,r=this.elementFromNode(t);if(r)for(var o=0,i=n.matchElementsInTree(r);o<i.length;o+=1){var s=i[o];e.call(n,s)}},u.prototype.elementFromNode=function(t){if(t.nodeType==Node.ELEMENT_NODE)return t},u.prototype.addElement=function(t){this.elements.has(t)||(this.elements.add(t),this.delegate.elementMatched(t))},u.prototype.removeElement=function(t){this.elements.has(t)&&(this.elements.delete(t),this.delegate.elementUnmatched(t))};var h=function(t,e,n){this.attributeName=e,this.delegate=n,this.elementObserver=new u(t,this)},l={element:{},selector:{}};l.element.get=function(){return this.elementObserver.element},l.selector.get=function(){return"["+this.attributeName+"]"},h.prototype.start=function(){this.elementObserver.start()},h.prototype.stop=function(){this.elementObserver.stop()},h.prototype.matchElement=function(t){return t.hasAttribute(this.attributeName)},h.prototype.matchElementsInTree=function(t){var e=t.matches(this.selector)?[t]:[],n=Array.from(t.querySelectorAll(this.selector));return e.concat(n)},h.prototype.elementMatched=function(t){this.delegate.elementMatchedAttribute(t,this.attributeName)},h.prototype.elementUnmatched=function(t){this.delegate.elementUnmatchedAttribute(t,this.attributeName)},h.prototype.elementAttributeChanged=function(t,e){e==this.attributeName&&this.delegate.elementAttributeValueChanged(t,e)},Object.defineProperties(h.prototype,l);var p=function(){this.valuesByKey=new Map,this.keysByValue=new Map};p.prototype.add=function(t,e){n(t,e,this.valuesByKey),n(e,t,this.keysByValue)},p.prototype.delete=function(t,e){r(t,e,this.valuesByKey),r(e,t,this.keysByValue)},p.prototype.has=function(t,e){var n=this.valuesByKey.get(t);return!!n&&n.has(e)},p.prototype.getKeysForValue=function(t){var e=this.keysByValue.get(t);return e?Array.from(e):[]},p.prototype.getValuesForKey=function(t){var e=this.valuesByKey.get(t);return e?Array.from(e):[]},p.prototype.getValueCountForKey=function(t){var e=this.valuesByKey.get(t);return e?e.size:0};var f=function(t,e){this.delegate=e,this.elementObserver=new u(t,this),this.selectorSet=new Set,this.elements=new p,this.attributes=new p},d={started:{},element:{},selectors:{},compositeSelector:{}};d.started.get=function(){return this.elementObserver.started},f.prototype.start=function(){this.elementObserver.start()},f.prototype.stop=function(){this.elementObserver.stop()},f.prototype.refresh=function(){this.elementObserver.refresh()},d.element.get=function(){return this.elementObserver.element},d.selectors.get=function(){return Array.from(this.selectorSet)},d.compositeSelector.get=function(){var t=Array.from(this.selectorSet).join(", ");return 0==t.length?":not(*)":t},f.prototype.observeSelector=function(t){var e=this;if(!this.selectorSet.has(t)){this.selectorSet.add(t);for(var n=0,r=t.attributes;n<r.length;n+=1){var o=r[n];e.attributes.add(t,o)}this.refresh()}},f.prototype.stopObservingSelector=function(t){var e=this;if(this.selectorSet.has(t)){this.selectorSet.delete(t);for(var n=0,r=t.attributes;n<r.length;n+=1){var o=r[n];e.attributes.delete(t,o)}this.refresh()}},f.prototype.matchElement=function(t){return t.matches(this.compositeSelector)},f.prototype.matchElementsInTree=function(t){var e=t.matches(this.compositeSelector)?[t]:[],n=Array.from(t.querySelectorAll(this.compositeSelector));return e.concat(n)},f.prototype.elementMatched=function(t){for(var e=this,n=0,r=e.selectors;n<r.length;n+=1){var o=r[n];e.elements.has(o,t)||o.matches(t)&&e.recordMatch(o,t)}},f.prototype.elementUnmatched=function(t){for(var e=this,n=0,r=e.selectors;n<r.length;n+=1){var o=r[n];e.elements.has(o,t)&&e.recordUnmatch(o,t)}},f.prototype.elementAttributeChanged=function(t,e){for(var n=this,r=0,o=n.attributes.getKeysForValue(e);r<o.length;r+=1){var i=o[r],s=i.matches(t),a=n.elements.has(i,t);s&&!a?n.recordMatch(i,t):a&&!s&&n.recordUnmatch(i,t)}},f.prototype.recordMatch=function(t,e){this.elements.add(t,e),this.delegate.elementMatchedSelector(e,t)},f.prototype.recordUnmatch=function(t,e){this.elements.delete(t,e),this.delegate.elementUnmatchedSelector(e,t)},Object.defineProperties(f.prototype,d);var m=function(t,e,n){this.attributeName=e,this.delegate=n,this.elementObserver=new u(t,this),this.tokensByElement=new p},v={started:{},element:{},selector:{}};v.started.get=function(){return this.elementObserver.started},m.prototype.start=function(){this.elementObserver.start()},m.prototype.stop=function(){this.elementObserver.stop()},m.prototype.refresh=function(){this.elementObserver.refresh()},v.element.get=function(){return this.elementObserver.element},v.selector.get=function(){return"["+this.attributeName+"]"},m.prototype.getElementsMatchingToken=function(t){return this.tokensByElement.getKeysForValue(t)},m.prototype.matchElement=function(t){return t.hasAttribute(this.attributeName)},m.prototype.matchElementsInTree=function(t){var e=t.matches(this.selector)?[t]:[],n=Array.from(t.querySelectorAll(this.selector));return e.concat(n)},m.prototype.elementMatched=function(t){for(var e=this,n=Array.from(this.readTokenSetForElement(t)),r=0,o=n;r<o.length;r+=1){var i=o[r];e.addTokenForElement(i,t)}},m.prototype.elementUnmatched=function(t){for(var e=this,n=this.getTokensForElement(t),r=0,o=n;r<o.length;r+=1){var i=o[r];e.removeTokenForElement(i,t)}},m.prototype.elementAttributeChanged=function(t){for(var e=this,n=this.readTokenSetForElement(t),r=0,o=Array.from(n);r<o.length;r+=1){var i=o[r];e.addTokenForElement(i,t)}for(var s=0,a=e.getTokensForElement(t);s<a.length;s+=1){var c=a[s];n.has(c)||e.removeTokenForElement(c,t)}},m.prototype.addTokenForElement=function(t,e){this.tokensByElement.has(e,t)||(this.tokensByElement.add(e,t),this.delegate.elementMatchedTokenForAttribute(e,t,this.attributeName))},m.prototype.removeTokenForElement=function(t,e){this.tokensByElement.has(e,t)&&(this.tokensByElement.delete(e,t),this.delegate.elementUnmatchedTokenForAttribute(e,t,this.attributeName))},m.prototype.getTokensForElement=function(t){return this.tokensByElement.getValuesForKey(t)},m.prototype.readTokenSetForElement=function(t){for(var e=new Set,n=t.getAttribute(this.attributeName)||"",r=0,o=n.split(/\s+/);r<o.length;r+=1){var i=o[r];i.length&&e.add(i)}return e},Object.defineProperties(m.prototype,v),t.Selector=o,t.AttributeObserver=h,t.ElementObserver=u,t.SelectorObserver=f,t.TokenListObserver=m,Object.defineProperty(t,"__esModule",{value:!0})})},function(t,e,n){"use strict";var r=n(13);n.d(e,"a",function(){return o});var o=function(){function t(t){this.router=t}return t.start=function(){var e=new r.a(document.documentElement,"data-controller"),n=new t(e);return n.start(),n},t.prototype.start=function(){this.router.start()},t.prototype.stop=function(){this.router.stop()},t.prototype.register=function(t,e){this.router.register(t,e)},t}()},function(t,e,n){"use strict";var r=n(0),o=n(1);n.d(e,"a",function(){return i});var i=function(){function t(t){this.context=t}return Object.defineProperty(t.prototype,"element",{get:function(){return this.context.element},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"identifier",{get:function(){return this.context.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"targets",{get:function(){return this.context.targets},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){},t.prototype.connect=function(){},t.prototype.disconnect=function(){},t.prototype.addAction=function(t,e){var n,i,s=this;e instanceof EventTarget?n=e:(n=this.element,e&&(i=function(t){return s.targets.matchesElementWithTargetName(t,e.targetName)}));var a=o.a.forElementWithInlineDescriptorString(n,t),c=new r.a(this,a,n,i);this.context.addAction(c)},t.prototype.removeAction=function(t){this.context.removeAction(t)},t}()},function(t,e,n){"use strict";function r(t,e){return function(n,r,i){o(n,"initialize",function(){this.addAction(t+"->"+r,e)})}}function o(t,e,n){var r=t[e];t[e]=function(){n.apply(this,arguments),r.apply(this,arguments)}}Object.defineProperty(e,"__esModule",{value:!0}),e.on=r},function(t,e,n){"use strict";var r=n(12);n.d(e,"a",function(){return o});var o=function(){function t(){this.actionsByEventName=new r.a}return Object.defineProperty(t.prototype,"actions",{get:function(){return this.actionsByEventName.values},enumerable:!0,configurable:!0}),t.prototype.add=function(t){this.actionsByEventName.add(t.eventName,t)},t.prototype.delete=function(t){this.actionsByEventName.delete(t.eventName,t)},t.prototype.has=function(t){return this.actionsByEventName.hasValue(t)},t.prototype.getActionsForEventName=function(t){return this.actionsByEventName.get(t)},t}()},function(t,e,n){"use strict";var r=n(8),o=n(10),i=n(14);n.d(e,"a",function(){return s});var s=function(){function t(t,e,n,s){this.identifier=t,this.element=e,this.delegate=s,this.targets=new i.a(t,e,this),this.dispatcher=new r.a(this),this.inlineActionObserver=new o.a(t,e,this),this.controller=new n(this),this.controller.initialize()}return t.prototype.connect=function(){this.dispatcher.start(),this.inlineActionObserver.start(),this.controller.connect()},t.prototype.disconnect=function(){this.controller.disconnect(),this.inlineActionObserver.stop(),this.dispatcher.stop()},Object.defineProperty(t.prototype,"parentElement",{get:function(){return this.element.parentElement},enumerable:!0,configurable:!0}),t.prototype.addAction=function(t){this.dispatcher.addAction(t)},t.prototype.removeAction=function(t){this.dispatcher.removeAction(t)},t.prototype.getObjectForInlineActionDescriptor=function(t){return this.controller},t.prototype.inlineActionConnected=function(t){this.addAction(t)},t.prototype.inlineActionDisconnected=function(t){this.removeAction(t)},t.prototype.canControlElement=function(t){return this.delegate.contextCanControlElement(this,t)},t}()},function(t,e,n){"use strict";function r(t,e){for(var n=0,r=t;n<r.length;n++){r[n].performWithEvent(e)}}function o(t){var e=t.target;return e instanceof Element?e:e instanceof Node?e.parentElement:null}var i=n(6),s=n(9);n.d(e,"a",function(){return a});var a=function(){function t(t){this.context=t,this.started=!1,this.directActions=new i.a,this.delegatedActions=new i.a,this.events=new s.a,this.handleDirectEvent=this.handleDirectEvent.bind(this),this.handleDelegatedEvent=this.handleDelegatedEvent.bind(this)}return t.prototype.start=function(){this.started||(this.started=!0,this.addEventListeners())},t.prototype.stop=function(){this.started&&(this.removeEventListeners(),this.started=!1)},t.prototype.addAction=function(t){var e=this.getActionSetForAction(t);e.has(t)||(this.addEventListenerForAction(t),e.add(t))},t.prototype.removeAction=function(t){var e=this.getActionSetForAction(t);e.has(t)&&(this.removeEventListenerForAction(t),e.delete(t))},t.prototype.getActionSetForAction=function(t){return t.isDirect?this.directActions:this.delegatedActions},t.prototype.addEventListeners=function(){this.addEventListenersForActionSet(this.directActions),this.addEventListenersForActionSet(this.delegatedActions)},t.prototype.removeEventListeners=function(){this.removeEventListenersForActionSet(this.delegatedActions),this.removeEventListenersForActionSet(this.directActions)},t.prototype.addEventListenersForActionSet=function(t){for(var e=0,n=t.actions;e<n.length;e++){var r=n[e];this.addEventListenerForAction(r)}},t.prototype.removeEventListenersForActionSet=function(t){for(var e=0,n=t.actions;e<n.length;e++){var r=n[e];this.removeEventListenerForAction(r)}},t.prototype.addEventListenerForAction=function(t){if(this.started){var e=this.getEventListenerForAction(t);this.events.add(t.eventName,t.eventTarget,e,!1)}},t.prototype.removeEventListenerForAction=function(t){if(this.started){var e=this.getEventListenerForAction(t);this.events.delete(t.eventName,t.eventTarget,e,!1)}},t.prototype.getEventListenerForAction=function(t){return t.isDirect?this.handleDirectEvent:this.handleDelegatedEvent},t.prototype.handleDirectEvent=function(t){if(this.canHandleEvent(t)){r(this.findDirectActionsForEvent(t),t)}},t.prototype.handleDelegatedEvent=function(t){if(this.canHandleEvent(t)){r(this.findDelegatedActionsForEvent(t),t)}},t.prototype.canHandleEvent=function(t){var e=o(t);return!e||this.context.canControlElement(e)},t.prototype.findDirectActionsForEvent=function(t){return this.directActions.getActionsForEventName(t.type).filter(function(e){return e.eventTarget==t.currentTarget})},t.prototype.findDelegatedActionsForEvent=function(t){var e=this.delegatedActions.getActionsForEventName(t.type);return this.getBubbledElementsForEvent(t).reduce(function(t,n){return t.concat(e.filter(function(t){return t.matchDelegatedTarget(n)}))},[])},t.prototype.getBubbledElementsForEvent=function(t){for(var e=[],n=o(t);n&&n!=this.parentElement;)e.push(n),n=n.parentElement;return e},Object.defineProperty(t.prototype,"parentElement",{get:function(){return this.context.parentElement},enumerable:!0,configurable:!0}),t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return o});var r=function(){function t(t,e,n,r){this.name=t,this.target=e,this.listener=n,this.useCapture=r,this.references=0}return t.prototype.isEqualTo=function(t){return t&&t.name===this.name&&t.target==this.target&&t.listener==this.listener&&t.useCapture==this.useCapture},t.prototype.observe=function(){return 0==this.references&&this.target.addEventListener(this.name,this.listener,this.useCapture),this.references++,1==this.references},t.prototype.stopObserving=function(){return this.references>0&&(1==this.references&&this.target.removeEventListener(this.name,this.listener,this.useCapture),this.references--),0==this.references},t}(),o=function(){function t(){this.observers=new Set}return t.prototype.add=function(t,e,n,o){var i=new r(t,e,n,o);this.addObserver(i)},t.prototype.delete=function(t,e,n,o){var i=new r(t,e,n,o);this.deleteObserver(i)},t.prototype.addObserver=function(t){var e=this.findMatchingObserver(t);e.observe()&&this.observers.add(e)},t.prototype.deleteObserver=function(t){var e=this.findMatchingObserver(t);e.stopObserving()&&this.observers.delete(e)},t.prototype.findMatchingObserver=function(t){for(var e=0,n=Array.from(this.observers);e<n.length;e++){var r=n[e];if(r.isEqualTo(t))return r}return t},t}()},function(t,e,n){"use strict";var r=n(0),o=n(1),i=n(2);n.n(i);n.d(e,"a",function(){return s});var s=function(){function t(t,e,n){this.identifier=t,this.delegate=n,this.attributeObserver=new i.AttributeObserver(e,this.attributeName,this),this.connectedActions=new Map}return Object.defineProperty(t.prototype,"element",{get:function(){return this.attributeObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"attributeName",{get:function(){return"data-"+this.identifier+"-action"},enumerable:!0,configurable:!0}),t.prototype.start=function(){this.attributeObserver.start()},t.prototype.stop=function(){this.attributeObserver.stop()},t.prototype.elementMatchedAttribute=function(t,e){this.delegate.canControlElement(t)&&this.refreshActionForElement(t)},t.prototype.elementAttributeValueChanged=function(t,e){this.delegate.canControlElement(t)&&this.refreshActionForElement(t)},t.prototype.elementUnmatchedAttribute=function(t,e){this.disconnectActionForElement(t)},t.prototype.refreshActionForElement=function(t){var e=t.getAttribute(this.attributeName);if(null==e)this.disconnectActionForElement(t);else{var n=this.buildActionForElementWithDescriptorString(t,e),r=this.getActionForElement(t);n.hasSameDescriptorAs(r)||(this.disconnectActionForElement(t),this.connectActionForElement(n,t))}},t.prototype.connectActionForElement=function(t,e){this.connectedActions.set(e,t),this.delegate.inlineActionConnected(t)},t.prototype.disconnectActionForElement=function(t){var e=this.getActionForElement(t);e&&(this.connectedActions.delete(t),this.delegate.inlineActionDisconnected(e))},t.prototype.getActionForElement=function(t){return this.connectedActions.get(t)||null},t.prototype.buildActionForElementWithDescriptorString=function(t,e){var n=o.a.forElementWithInlineDescriptorString(t,e),i=this.delegate.getObjectForInlineActionDescriptor(n);return new r.a(i,n,this.element,function(e){return e==t})},t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(){function t(t){this.maskedElements=t}return t.forElementWithSelector=function(e,n){return new t(Array.from(e.querySelectorAll(n)))},Object.defineProperty(t.prototype,"length",{get:function(){return this.maskedElements.length},enumerable:!0,configurable:!0}),t.prototype.masks=function(t){return!!this.length&&(this.has(t)||this.contains(t))},t.prototype.has=function(t){return this.maskedElements.indexOf(t)>=0},t.prototype.contains=function(t){for(var e=0,n=this.maskedElements;e<n.length;e++){if(n[e].contains(t))return!0}return!1},t}()},function(t,e,n){"use strict";function r(t,e,n){var r=t.get(e);return r||(r=new n,t.set(e,r)),r}function o(t,e){var n=t.get(e);null!=n&&0==n.size&&t.delete(e)}n.d(e,"a",function(){return i});var i=function(){function t(){this.map=new Map}return Object.defineProperty(t.prototype,"values",{get:function(){return Array.from(this.map.values()).reduce(function(t,e){return t.concat(Array.from(e))},[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return Array.from(this.map.values()).reduce(function(t,e){return t+e.size},0)},enumerable:!0,configurable:!0}),t.prototype.add=function(t,e){r(this.map,t,Set).add(e)},t.prototype.delete=function(t,e){r(this.map,t,Set).delete(e),o(this.map,t)},t.prototype.has=function(t,e){var n=this.map.get(t);return null!=n&&n.has(e)},t.prototype.hasKey=function(t){return this.map.has(t)},t.prototype.hasValue=function(t){return Array.from(this.map.values()).some(function(e){return e.has(t)})},t.prototype.get=function(t){var e=this.map.get(t);return e?Array.from(e):[]},t}();!function(){function t(){this.map=new Map}return Object.defineProperty(t.prototype,"values",{get:function(){return Array.from(this.map.values()).reduce(function(t,e){return t.concat(e.values)},[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return Array.from(this.map.values()).reduce(function(t,e){return t+e.size},0)},enumerable:!0,configurable:!0}),t.prototype.add=function(t,e,n){r(this.map,t,i).add(e,n)},t.prototype.delete=function(t,e,n){r(this.map,t,i).delete(e,n),o(this.map,t)},t.prototype.has=function(t,e,n){var r=this.map.get(t);return null!=r&&r.has(e,n)},t.prototype.hasKey=function(t,e){if(1==arguments.length)return this.map.has(t);var n=this.map.get(t);return null!=n&&n.hasKey(e)},t.prototype.hasValue=function(t){return Array.from(this.map.values()).some(function(e){return e.hasValue(t)})},t.prototype.get=function(t,e){var n=this.map.get(t);return n?n.get(e):[]},t}()},function(t,e,n){"use strict";var r=n(2),o=(n.n(r),n(7)),i=n(11);n.d(e,"a",function(){return s});var s=function(){function t(t,e){this.attributeName=e,this.tokenListObserver=new r.TokenListObserver(t,e,this),this.controllerConstructors=new Map,this.contextMaps=new WeakMap,this.connectedContexts=new Set,this.masks=new WeakMap}return Object.defineProperty(t.prototype,"element",{get:function(){return this.tokenListObserver.element},enumerable:!0,configurable:!0}),t.prototype.start=function(){this.tokenListObserver.start()},t.prototype.stop=function(){this.tokenListObserver.stop()},t.prototype.register=function(t,e){if(this.controllerConstructors.has(t))throw new Error("Router already has a controller registered with the identifier '"+t+"'");this.controllerConstructors.set(t,e),this.connectContexts(t)},t.prototype.connectContexts=function(t){for(var e=this.tokenListObserver.getElementsMatchingToken(t),n=0,r=e;n<r.length;n++){var o=r[n];this.connectContextForElement(t,o)}},t.prototype.connectContextForElement=function(t,e){var n=this.fetchContextForElement(t,e);n&&!this.connectedContexts.has(n)&&(this.connectedContexts.add(n),this.resetMasksForIdentifier(t),n.connect())},t.prototype.disconnectContextForElement=function(t,e){var n=this.fetchContextForElement(t,e);n&&this.connectedContexts.has(n)&&(this.connectedContexts.delete(n),this.resetMasksForIdentifier(t),n.disconnect())},t.prototype.getConnectedContextsForIdentifier=function(t){return Array.from(this.connectedContexts).filter(function(e){return e.identifier==t})},t.prototype.fetchContextForElement=function(t,e){var n=this.controllerConstructors.get(t);if(n){var r=this.fetchContextMapForElement(e),i=r.get(t);return i||(i=new o.a(t,e,n,this),r.set(t,i)),i}},t.prototype.fetchContextMapForElement=function(t){var e=this.contextMaps.get(t);return e||(e=new Map,this.contextMaps.set(t,e)),e},t.prototype.fetchMaskForElement=function(t,e){var n=this.masks.get(e);if(!n){var r="["+this.attributeName+"='"+t+"']";n=i.a.forElementWithSelector(e,r),this.masks.set(e,n)}return n},t.prototype.resetMasksForIdentifier=function(t){for(var e=this.getConnectedContextsForIdentifier(t),n=0,r=e;n<r.length;n++){var o=r[n];this.masks.delete(o.element)}},t.prototype.contextCanControlElement=function(t,e){return!this.fetchMaskForElement(t.identifier,t.element).masks(e)},t.prototype.elementMatchedTokenForAttribute=function(t,e,n){this.connectContextForElement(e,t)},t.prototype.elementUnmatchedTokenForAttribute=function(t,e,n){this.disconnectContextForElement(e,t)},t}()},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(){function t(t,e,n){this.identifier=t,this.element=e,this.delegate=n}return t.prototype.has=function(t){return null!=this.find(t)},t.prototype.find=function(t){var e=this.getSelectorForTargetName(t),n=this.element.querySelector(e);return n&&this.delegate.canControlElement(n)?n:null},t.prototype.findAll=function(t){var e=this,n=this.getSelectorForTargetName(t);return Array.from(this.element.querySelectorAll(n)).filter(function(t){return e.delegate.canControlElement(t)})},t.prototype.matchesElementWithTargetName=function(t,e){var n=this.getSelectorForTargetName(e);return t.matches(n)&&this.delegate.canControlElement(t)},t.prototype.getSelectorForTargetName=function(t){return"[data-"+this.identifier+"-target='"+t+"']"},t}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),o=n(0);n.d(e,"Action",function(){return o.a});var i=n(3);n.d(e,"Application",function(){return i.a});var s=n(4);n.d(e,"Controller",function(){return s.a});var a=n(1);n.d(e,"Descriptor",function(){return a.a}),n.d(e,"decorators",function(){return r})}])});