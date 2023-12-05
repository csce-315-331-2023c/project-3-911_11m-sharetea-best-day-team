/**
 * HTMLMagnifier.js
 * Provides a magnification functionality for HTML elements on a webpage.
 * Author: David Roh
 * 
 * The HTMLMagnifier is an object that allows users to magnify parts of a webpage. 
 * It can be customized with different zoom levels, shapes, and sizes.
 */
(function(window) {
  /**
   * Creates an instance of HTMLMagnifier.
   * @param {Object} options Configuration options for the magnifier.
   * @param {number} [options.zoom=2] - Zoom level of the magnifier.
   * @param {string} [options.shape='square'] - Shape of the magnifier ('square' or 'circle').
   * @param {number} [options.width=200] - Width of the magnifier in pixels.
   * @param {number} [options.height=200] - Height of the magnifier in pixels.
   */
  function HTMLMagnifier(options) {
    const _this = this;

    _this.options = Object.assign({ zoom: 2, shape: 'square', width: 200, height: 200 }, options);

    const magnifierTemplate = `<div class="magnifier" style="display: none;position: fixed;overflow: hidden;background-color: white;border: 1px solid #555;border-radius: 4px;z-index:10000;">
                               <div class="magnifier-content" style="top: 0px;left: 0px;margin-left: 0px;margin-top: 0px;overflow: visible;position: absolute;display: block;transform-origin: left top;-moz-transform-origin: left top;-ms-transform-origin: left top;-webkit-transform-origin: left top;-o-transform-origin: left top;user-select: none;-moz-user-select: none;-webkit-user-select: none;padding-top: 0px"></div>
                               <div class="magnifier-glass" style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;opacity: 0.0;-ms-filter: alpha(opacity=0);background-color: white;cursor: move;"></div>
                             </div>`;

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    let magnifier, magnifierContent;
    let observerObj;
    let syncTimeout;
    let isVisible = false;
    let magnifierBody;
    let events = {};

    /**
     * Sets the position of an element.
     * @param {HTMLElement} element - The element to set the position of.
     * @param {number} left - The left position in pixels.
     * @param {number} top - The top position in pixels.
     */
    function setPosition(element, left, top) {
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
    }

    /**
     * Sets the dimensions of an element.
     * @param {HTMLElement} element - The element to set the dimensions for.
     * @param {number} width - The width of the element in pixels.
     * @param {number} height - The height of the element in pixels.
     */
    function setDimensions(element, width, height) {
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
    }

    /**
     * Sets up the magnifier based on the specified options.
     */
    function setupMagnifier() {
      switch(_this.options.shape) {
        case 'square':
          setDimensions(magnifier, _this.options.width, _this.options.height);
          break;
        case 'circle':
          setDimensions(magnifier, _this.options.width, _this.options.height);
          magnifier.style.borderRadius = '50%';
          break;
        default:
          // Do nothing
          break;
      }
      magnifierContent.style.WebkitTransform =
      magnifierContent.style.MozTransform =
        magnifierContent.style.OTransform =
          magnifierContent.style.MsTransform =
            magnifierContent.style.transform = `scale(${_this.options.zoom})`;
    }

    /**
     * Checks if a given element is a descendant of another element.
     *
     * @param {Node} parent - The parent element to check against.
     * @param {Node} child - The child element to check.
     * @returns {boolean} - True if the child is a descendant of the parent, false otherwise.
     */
    function isDescendant(parent, child) {
      let node = child;
      while (node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }

    /**
     * Synchronizes the content of the magnifier.
     * Prepares the content, syncs the viewport, and syncs the scroll bars if the magnifier is visible.
     */
    function syncContent() {
      if (isVisible) {
        prepareContent();
        syncViewport();
        syncScrollBars();
      }
    }

    /**
     * Queues the synchronization of content if the element is visible.
     * @function syncContentQueued
     */
    function syncContentQueued() {
      if (isVisible) {
        window.clearTimeout(syncTimeout);
        syncTimeout = window.setTimeout(syncContent, 100);
      }
    }

    /**
     * Handles the DOM change event.
     * If the magnifier is visible, it queues the synchronization of content.
     */
    function domChanged() {
      if (isVisible) {
        syncContentQueued();
      }
    }

    /**
     * Unbinds the DOM observer and removes event listeners for DOM changes.
     */
    function unBindDOMObserver() {
      if (observerObj) {
        observerObj.disconnect();
        observerObj = null;
      }
      if (document.removeEventListener) {
        document.removeEventListener('DOMNodeInserted', domChanged, false);
        document.removeEventListener('DOMNodeRemoved', domChanged, false);
      }
    }

    /**
     * Binds a DOM observer to track changes in the document.
     */
    function bindDOMObserver() {
      if (MutationObserver) {
        observerObj = new MutationObserver(function(mutations) {
          for(let i = 0; i < mutations.length; i++) {
            if (!isDescendant(magnifier, mutations[i].target)) {
              try {
                triggerEvent('checkMutation', mutations[i]);
                domChanged();
                break;
              } catch (error) {
              //
              }
            }
          }
        });
        observerObj.observe(document, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            'class',
            'width',
            'height',
            'style'
          ],
          attributeOldValue: true
        });
      } else
      if (document.addEventListener) {
        document.addEventListener('DOMNodeInserted', domChanged, false);
        document.addEventListener('DOMNodeRemoved', domChanged, false);
      }
    }

    /**
     * Triggers the specified event and calls all registered event handlers with the provided data.
     * 
     * @param {string} event - The name of the event to trigger.
     * @param {any} data - The data to pass to the event handlers.
     */
    function triggerEvent(event, data) {
      const handlers = events[event];
      if (handlers) {
        for(let i = 0; i < handlers.length; i++) {
          handlers[i].call(_this, data);
        }
      }
    }

    /**
     * Synchronizes the viewport of the magnifier.
     */
    function syncViewport() {
      const x1 = magnifier.offsetLeft;
      const y1 = magnifier.offsetTop;
      const x2 = document.body.scrollLeft;
      const y2 = document.body.scrollTop;
      const left = -x1 * _this.options.zoom - x2 * _this.options.zoom;
      const top = -y1 * _this.options.zoom - y2 * _this.options.zoom;
      setPosition(magnifierContent, left, top);
      triggerEvent('viewPortChanged', magnifierBody);
    }

    /**
     * Removes elements matching the given selector from the container.
     * @param {HTMLElement} container - The container element.
     * @param {string} selector - The CSS selector to match elements.
     */
    function removeSelectors(container, selector) {
      const elements = container.querySelectorAll(selector);
      if (elements.length > 0) {
        for(let i = 0; i < elements.length; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }
    }

    /**
     * Prepares the content for the magnifier.
     */
    function prepareContent() {
      magnifierContent.innerHTML = '';
      const bodyOriginal = document.body;
      const bodyCopy = bodyOriginal.cloneNode(true);
      const color = bodyOriginal.style.backgroundColor;
      if (color) {
        magnifier.css('background-color', color);
      }
      bodyCopy.style.cursor = 'auto';
      bodyCopy.style.paddingTop = '0px';
      bodyCopy.setAttribute('unselectable', 'on');
      const canvasOriginal = bodyOriginal.querySelectorAll('canvas');
      const canvasCopy = bodyCopy.querySelectorAll('canvas');
      if (canvasOriginal.length > 0) {
        if (canvasOriginal.length === canvasCopy.length) {
          for(let i = 0; i < canvasOriginal.length; i++) {
            let ctx = canvasCopy[i].getContext('2d');
            try {
              ctx.drawImage(canvasOriginal[i], 0, 0);
            } catch (error) {
            //
            }
          }
        }
      }
      removeSelectors(bodyCopy, 'script');
      removeSelectors(bodyCopy, 'audio');
      removeSelectors(bodyCopy, 'video');
      removeSelectors(bodyCopy, '.magnifier');
      triggerEvent('prepareContent', bodyCopy);
      magnifierContent.appendChild(bodyCopy);
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      setDimensions(magnifierContent, width, height);
      magnifierBody = magnifierContent.querySelector('body');
      triggerEvent('contentUpdated', magnifierBody);
    }

    /**
     * Initializes the scroll bars for the magnifier.
     */
    function initScrollBars() {
      triggerEvent('initScrollBars', magnifierBody);
    }

    /**
     * Synchronizes the scroll position of the specified control with the corresponding element in the magnifier body.
     * If the control has an ID or a class name, it will try to find the corresponding element in the magnifier body using the ID or class name.
     * If found, it will update the scroll position of the element to match the scroll position of the control.
     * If the control is the document itself, it will synchronize the viewport of the magnifier.
     * @param {HTMLElement|Document} ctrl - The control element or the document.
     * @returns {boolean} - Returns true if the scroll position was synchronized successfully, false otherwise.
     */
    function syncScroll(ctrl) {
      const selectors = [];
      if (ctrl.getAttribute) {
        if (ctrl.getAttribute('id')) {
          selectors.push('#' + ctrl.getAttribute('id'));
        }
        if (ctrl.className) {
          selectors.push('.' + ctrl.className.split(' ').join('.'));
        }
        for(let i = 0; i < selectors.length; i++) {
          let t = magnifierBody.querySelectorAll(selectors[i]);
          if (t.length === 1) {
            t[0].scrollTop  = ctrl.scrollTop;
            t[0].scrollLeft = ctrl.scrollLeft;
            return true;
          }
        }
      } else
      if (ctrl === document) {
        syncViewport();
      }
      return false;
    }

    /**
     * Synchronizes the scroll bars of the magnifier with the target element or all visible div elements.
     * @param {Event} e - The scroll event. If provided, syncs the scroll with the target element.
     */
    function syncScrollBars(e) {
      if (isVisible) {
        if (e && e.target) {
          syncScroll(e.target);
        } else {
          let scrolled = [];
          let elements = document.querySelectorAll('div');
          for(let i = 0; i < elements.length; i++) {
            if (elements[i].scrollTop > 0) {
              scrolled.push(elements[i]);
            }
          }
          for(let i = 0; i < scrolled.length; i++) {
            if (!isDescendant(magnifier, scrolled[i])) {
              syncScroll(scrolled[i]);
            }
          }
        }
        triggerEvent('syncScrollBars', magnifierBody);
      }
    }

    /**
     * Makes an element draggable.
     *
     * @param {HTMLElement} ctrl - The element to make draggable.
     * @param {Object} options - The options for the draggable behavior.
     * @param {string} [options.handler] - The selector for the drag handler element.
     * @param {string[]} [options.exclude] - The list of tag names to exclude from dragging.
     * @param {Function} [options.ondrag] - The callback function to be called during dragging.
     * @returns {Object} - The reference to the draggable object.
     */
    function makeDraggable(ctrl, options) {

      const _this = this;

      let dragObject = null;
      let dragHandler = null;

      options = options || {};
      options.exclude = [ 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON' ];

      if (options.handler) {
        dragHandler = ctrl.querySelector(options.handler);
      } else {
        dragHandler = ctrl;
      }

      /**
       * Sets the position of an element.
       * @param {HTMLElement} element - The element to set the position for.
       * @param {number} left - The left position in pixels.
       * @param {number} top - The top position in pixels.
       */
      function setPosition(element, left, top) {
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
      }

      let pos_y, pos_x, ofs_x, ofs_y;

      ctrl.style.cursor = 'move';

      /**
       * Handles the down event for the magnifier.
       * 
       * @param {Event} e - The event object.
       */
      function downHandler(e) {
        const target = e.target || e.srcElement;
        const parent = target.parentNode;

        if (target && (options.exclude.indexOf(target.tagName.toUpperCase()) === -1)) {
          if (!parent || (options.exclude.indexOf(parent.tagName.toUpperCase()) === -1)) {  // img in a
            dragObject = ctrl;

            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;

            ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
            ofs_y = dragObject.getBoundingClientRect().top  - dragObject.offsetTop;

            pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
            pos_y = pageY - (dragObject.getBoundingClientRect().top  + document.body.scrollTop);

            e.preventDefault();
          }
        }
      }

      /**
       * Handles the move event for dragging an object.
       * @param {Event} e - The move event object.
       */
      function moveHandler(e) {
        if (dragObject !== null) {
          const pageX = e.pageX || e.touches[0].pageX;
          const pageY = e.pageY || e.touches[0].pageY;
          const left = pageX - pos_x - ofs_x - document.body.scrollLeft;
          const top  = pageY - pos_y - ofs_y  - document.body.scrollTop;

          setPosition(dragObject, left, top);
          if (options.ondrag) {
            options.ondrag.call(e);
          }
        }
      }

      /**
       * Handles the up event for the drag operation.
       */
      function upHandler() {
        if (dragObject !== null) {
          dragObject = null;
        }
      }

      dragHandler.addEventListener('mousedown', function(e) {
        downHandler(e);
      });

      window.addEventListener('mousemove', function(e) {
        moveHandler(e);
      });

      window.addEventListener('mouseup', function(e) {
        upHandler(e);
      });

      dragHandler.addEventListener('touchstart', function(e) {
        downHandler(e);
      });

      window.addEventListener('touchmove', function(e) {
        moveHandler(e);
      });

      window.addEventListener('touchend', function(e) {
        upHandler(e);
      });

      return _this;

    }

    /**
     * Initializes the magnifier functionality.
     */
    function init() {
      const div = document.createElement('div');
      div.innerHTML = magnifierTemplate;
      magnifier = div.querySelector('.magnifier');
      document.body.appendChild(magnifier);
      magnifierContent = magnifier.querySelector('.magnifier-content');
      if (window.addEventListener) {
        window.addEventListener('resize', syncContent, false);
        window.addEventListener('scroll', syncScrollBars, true);
      }
      makeDraggable(magnifier, { ondrag: syncViewport });
    }

    _this.setZoom = function(value) {
      _this.options.zoom = value;
      setupMagnifier();
    };

    _this.setShape = function(shape, width, height) {
      _this.options.shape = shape;
      if (width) {
        _this.options.width = width;
      }
      if (height) {
        _this.options.height = height;
      }
      setupMagnifier();
    };

    _this.setWidth = function(value) {
      _this.options.width = value;
      setupMagnifier();
    };

    _this.setHeight = function(value) {
      _this.options.height = value;
      setupMagnifier();
    };

    _this.getZoom = function() {
      return _this.options.zoom;
    };

    _this.getShape = function() {
      return _this.options.shape;
    };

    _this.getWidth = function() {
      return _this.options.width;
    };

    _this.getHeight = function() {
      return _this.options.height;
    };

    _this.isVisible = function() {
      return isVisible;
    };

    _this.on = function(event, callback) {
      events[event] = events[event] || [];
      events[event].push(callback);
    };

    _this.syncScrollBars = function() {
      syncScrollBars();
    };

    _this.syncContent = function() {
      syncContentQueued();
    };

    _this.hide = function() {
      unBindDOMObserver();
      magnifierContent.innerHTML = '';
      magnifier.style.display = 'none';
      isVisible = false;
    };

    _this.show = function(event) {
      let left, top;
      if (event) {
        left = event.pageX - 20;
        top = event.pageY - 20;
      } else {
        left = 200;
        top = 200;
      }
      setupMagnifier();
      prepareContent();
      setPosition(magnifier, left, top);
      magnifier.style.display = '';
      syncViewport();
      syncScrollBars();
      initScrollBars();
      bindDOMObserver();
      isVisible = true;
    };

    init();

    return _this;

  }

  if (typeof module !== 'undefined' && module.exports) module.exports = HTMLMagnifier; else window.HTMLMagnifier = HTMLMagnifier;

})(window);
