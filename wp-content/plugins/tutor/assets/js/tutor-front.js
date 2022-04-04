/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/react/admin-dashboard/segments/filter.js":
/*!*********************************************************!*\
  !*** ./assets/react/admin-dashboard/segments/filter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ajaxHandler)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * On click add filter value on the url
 * and refresh page
 *
 * Handle bulk action
 *
 * @package Filter / sorting
 * @since v2.0.0
 */
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    _x = _wp$i18n._x,
    _n = _wp$i18n._n,
    _nx = _wp$i18n._nx;
document.addEventListener('DOMContentLoaded', function () {
  var commonConfirmModal = document.getElementById('tutor-common-confirmation-modal');
  var commonConfirmForm = document.getElementById('tutor-common-confirmation-form');
  var commonConfirmContent = document.getElementById('tutor-common-confirmation-modal-content');
  var filterCourse = document.getElementById('tutor-backend-filter-course');

  if (filterCourse) {
    filterCourse.addEventListener('change', function (e) {
      window.location = urlPrams('course-id', e.target.value);
    }, {
      once: true
    });
  }

  var filterCategory = document.getElementById('tutor-backend-filter-category');

  if (filterCategory) {
    filterCategory.addEventListener('change', function (e) {
      window.location = urlPrams('category', e.target.value);
    }, {
      once: true
    });
  }

  var filterOrder = document.getElementById('tutor-backend-filter-order');

  if (filterOrder) {
    filterOrder.addEventListener('change', function (e) {
      window.location = urlPrams('order', e.target.value);
    }, {
      once: true
    });
  }

  var filterSearch = document.getElementById('tutor-admin-search-filter-form');

  if (filterSearch) {
    filterSearch.onsubmit = function (e) {
      e.preventDefault();
      var search = document.getElementById('tutor-backend-filter-search').value;
      window.location = urlPrams('search', search);
    };
  }
  /**
   * onclick apply button show checkbox select message
   * if not selected
   */


  var applyButton = document.getElementById('tutor-admin-bulk-action-btn');
  var modal = document.querySelector('.tutor-bulk-modal-disabled');

  if (applyButton) {
    applyButton.onclick = function () {
      var bulkIds = [];
      var bulkFields = document.querySelectorAll('.tutor-bulk-checkbox');

      var _iterator = _createForOfIteratorHelper(bulkFields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;

          if (field.checked) {
            bulkIds.push(field.value);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (bulkIds.length) {
        modal.setAttribute('id', 'tutor-bulk-confirm-popup');
      } else {
        tutor_toast(__('Warning', 'tutor'), __('Nothing was selected for bulk action.', 'tutor'), 'error');

        if (modal.hasAttribute('id')) {
          modal.removeAttribute('id');
        }
      }
    };
  }
  /**
   * Onsubmit bulk form handle ajax request then reload page
   */


  var bulkForm = document.getElementById('tutor-admin-bulk-action-form');

  if (bulkForm) {
    bulkForm.onsubmit = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var formData, bulkIds, bulkFields, _iterator2, _step2, field, loadingButton, prevHtml, post, response, _ref2, _ref2$message, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                formData = new FormData(bulkForm);
                bulkIds = [];
                bulkFields = document.querySelectorAll('.tutor-bulk-checkbox');
                _iterator2 = _createForOfIteratorHelper(bulkFields);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    field = _step2.value;

                    if (field.checked) {
                      bulkIds.push(field.value);
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                if (bulkIds.length) {
                  _context.next = 9;
                  break;
                }

                alert(__('Select checkbox for action', 'tutor'));
                return _context.abrupt("return");

              case 9:
                formData.set('bulk-ids', bulkIds);
                formData.set(window.tutor_get_nonce_data(true).key, window.tutor_get_nonce_data(true).value);
                _context.prev = 11;
                loadingButton = document.querySelector('#tutor-confirm-bulk-action.tutor-btn-loading');
                prevHtml = loadingButton.innerHTML;
                loadingButton.innerHTML = "<div class=\"ball\"></div>\n        <div class=\"ball\"></div>\n        <div class=\"ball\"></div>\n        <div class=\"ball\"></div>";
                _context.next = 17;
                return fetch(window._tutorobject.ajaxurl, {
                  method: 'POST',
                  body: formData
                });

              case 17:
                post = _context.sent;
                loadingButton.innerHTML = prevHtml;

                if (!post.ok) {
                  _context.next = 24;
                  break;
                }

                _context.next = 22;
                return post.json();

              case 22:
                response = _context.sent;

                if (response.success) {
                  location.reload();
                } else {
                  _ref2 = response.data || {}, _ref2$message = _ref2.message, message = _ref2$message === void 0 ? __('Something went wrong, please try again ', 'tutor') : _ref2$message;
                  tutor_toast(__('Failed', 'tutor'), message, 'error');
                }

              case 24:
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](11);
                alert(_context.t0);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[11, 26]]);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }
  /**
   * onclick bulk action button show confirm popup
   * on click confirm button submit bulk form
   */


  var bulkActionButton = document.getElementById('tutor-confirm-bulk-action');

  if (bulkActionButton) {
    bulkActionButton.onclick = function () {
      var input = document.createElement('input');
      input.type = 'submit';
      bulkForm.appendChild(input);
      input.click();
      input.remove();
    };
  }

  function urlPrams(type, val) {
    var url = new URL(window.location.href);
    var params = url.searchParams;
    params.set(type, val);
    params.set('paged', 1);
    return url;
  }
  /**
   * Select all bulk checkboxes
   *
   * @since v2.0.0
   */


  var selectAll = document.querySelector('#tutor-bulk-checkbox-all');

  if (selectAll) {
    selectAll.addEventListener('click', function () {
      var checkboxes = document.querySelectorAll('.tutor-bulk-checkbox');
      checkboxes.forEach(function (item) {
        if (selectAll.checked) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    });
  }
  /**
   * Delete course delete
   */


  var deleteCourse = document.querySelectorAll('.tutor-admin-course-delete');

  var _iterator3 = _createForOfIteratorHelper(deleteCourse),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var course = _step3.value;

      course.onclick = function (e) {
        var id = e.currentTarget.dataset.id;

        if (commonConfirmForm) {
          commonConfirmForm.elements.action.value = 'tutor_course_delete';
          commonConfirmForm.elements.id.value = id;
        }

        if (commonConfirmContent) {
          commonConfirmContent.innerHTML = "\n          <div class=\"tutor-modal-icon\">\n          <img src=\"https://i.imgur.com/Nx6U2u7.png\" alt=\"\"/>\n          </div>\n          <div class=\"tutor-modal-text-wrap\">\n          <h3 class=\"tutor-modal-title\">\n           ".concat(__('Wait!', 'tutor'), "\n          </h3>\n          <p>\n            ").concat(__('Are you sure you would like perform this action? We suggest you proceed with caution.', 'tutor'), "\n          </p>\n          </div>\n        ");
        }
      };
    }
    /**
     * Handle common confirmation form
     *
     * @since v.2.0.0
     */

  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (commonConfirmForm) {
    commonConfirmForm.onsubmit = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var formData, loadingButton, prevHtml, post, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                formData = new FormData(commonConfirmForm); //show loading

                loadingButton = commonConfirmForm.querySelector('.tutor-btn-loading');
                prevHtml = loadingButton.innerHTML;
                loadingButton.innerHTML = "<div class=\"ball\"></div>\n      <div class=\"ball\"></div>\n      <div class=\"ball\"></div>\n      <div class=\"ball\"></div>";
                _context2.next = 7;
                return ajaxHandler(formData);

              case 7:
                post = _context2.sent;
                //after post back button text
                loadingButton.innerHTML = prevHtml; //hide modal

                if (commonConfirmModal.classList.contains('tutor-is-active')) {
                  commonConfirmModal.classList.remove('tutor-is-active');
                }

                if (!post.ok) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 13;
                return post.json();

              case 13:
                response = _context2.sent;

                if (response) {
                  tutor_toast(__('Delete', 'tutor'), __('Course has been deleted ', 'tutor'), 'success');
                  location.reload();
                } else {
                  tutor_toast(__('Failed', 'tutor'), __('Course delete failed ', 'tutor'), 'error');
                }

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  }
  /**
   * Handle ajax request show toast message on success | failure
   *
   * @param {*} formData including action and all form fields
   */


  function ajaxHandler(_x4) {
    return _ajaxHandler.apply(this, arguments);
  }

  function _ajaxHandler() {
    _ajaxHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(formData) {
      var post;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return fetch(window._tutorobject.ajaxurl, {
                method: 'POST',
                body: formData
              });

            case 3:
              post = _context3.sent;
              return _context3.abrupt("return", post);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              tutor_toast(__('Operation failed', 'tutor'), _context3.t0, 'error');

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return _ajaxHandler.apply(this, arguments);
  }
});
function ajaxHandler(_x5) {
  return _ajaxHandler2.apply(this, arguments);
}

function _ajaxHandler2() {
  _ajaxHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(formData) {
    var post;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch(window._tutorobject.ajaxurl, {
              method: 'POST',
              body: formData
            });

          case 3:
            post = _context4.sent;
            return _context4.abrupt("return", post);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            tutor_toast(__('Operation failed', 'tutor'), _context4.t0, 'error');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _ajaxHandler2.apply(this, arguments);
}

/***/ }),

/***/ "./assets/react/admin-dashboard/segments/lib.js":
/*!******************************************************!*\
  !*** ./assets/react/admin-dashboard/segments/lib.js ***!
  \******************************************************/
/***/ (() => {

// this function will load after document content load
window.readyState_complete = function (func) {
  var _caller = function _caller(f) {
    return f();
  };

  document.addEventListener('readystatechange', function (e) {
    return e.target.readyState === 'complete' ? typeof func == 'function' ? setTimeout(function () {
      return _caller(func);
    }) : '' : '';
  });
};

window.addBodyClass = function (currentUrl) {
  // History push
  var url = new URL(currentUrl);
  var tabPage = url.searchParams.get('tab_page');
  var tabPageEdit = url.searchParams.get('edit') && '_edit';
  document.body.classList.add(tabPage);
  document.body.classList.add(tabPage + tabPageEdit);
};

window.selectorElement = function (selector) {
  return document.querySelector(selector);
};

window.selectorElements = function (selector) {
  return document.querySelectorAll(selector);
};

window.selectorsByName = function (selector) {
  return document.getElementsByName(selector);
};

window.selectorById = function (selector) {
  return document.getElementById(selector);
};

window.selectorByClass = function (selector) {
  return document.getElementsByClassName(selector);
};
/**
 * Function to download json file
 * @param {json} response
 * @param {string} fileName
 */


window.json_download = function (response, fileName) {
  var fileToSave = new Blob([response], {
    type: "application/json"
  });
  var el = document.createElement("a");
  el.href = URL.createObjectURL(fileToSave);
  el.download = fileName;
  el.click();
};

/***/ }),

/***/ "./assets/react/front/_select_dd_search.js":
/*!*************************************************!*\
  !*** ./assets/react/front/_select_dd_search.js ***!
  \*************************************************/
/***/ (() => {

window.selectSearchField = function (selectElement) {
  var tutorFormSelect = document.querySelectorAll(selectElement); // if (typeof readyState_complete !== 'undefined' && readyState_complete) {

  (function () {
    tutorFormSelect.forEach(function (element) {
      if (!element.hasAttribute('noDropdown') && !element.classList.contains('no-tutor-dropdown')) {
        var initialSelectedItem = element.options[element.selectedIndex];
        element.style.display = 'none';
        var searchInputWrap, searchInput, resultFilter, resultWrap, resultList, textToSearch, dropDownOthers, dropDown;
        element.insertAdjacentHTML('afterend', ddMarkup(element.options));
        searchInputWrap = element.nextElementSibling.querySelector('.tutor-input-search');
        searchInput = searchInputWrap && searchInputWrap.querySelector('input');

        if (element.options.length < 5) {
          searchInputWrap.style.display = 'none';
        }

        dropDownOthers = document.querySelectorAll('.tutor-dropdown-select-options-container.is-active');
        dropDown = element.nextElementSibling.querySelector('.tutor-dropdown-select-options-container');
        var selectLabel = element.nextElementSibling.querySelector('.tutor-dropdown-select-selected');
        var selectedLabel = selectLabel && selectLabel.querySelector('.text-medium-body');
        selectedLabel.innerText = initialSelectedItem && initialSelectedItem.text;

        selectLabel.onclick = function (e) {
          e.stopPropagation();
          dd_hide_dom_click(document.querySelectorAll('.tutor-dropdown-select-options-container'));
          dropDown.classList.toggle('is-active');
          setTimeout(function () {
            searchInput.focus();
          }, 100);

          dropDown.onclick = function (e) {
            e.stopPropagation();
          };
        };

        dd_hide_dom_click(document.querySelectorAll('.tutor-dropdown-select-options-container'));
        resultWrap = searchInputWrap.nextElementSibling;
        resultList = resultWrap && resultWrap.querySelectorAll('.tutor-dropdown-select-option');

        if (resultList) {
          resultList.forEach(function (item) {
            item.onclick = function (e) {
              e.stopPropagation();
              var selectFieldOptions = Array.from(element.options);
              selectFieldOptions.forEach(function (option, i) {
                if (option.value === e.target.dataset.key) {
                  dropDown.classList.toggle('is-active');
                  selectedLabel.innerText = e.target.innerText;
                  selectedLabel.dataset.value = option.value;
                  element.value = option.value;
                  var save_tutor_option = document.getElementById('save_tutor_option');

                  if (save_tutor_option) {
                    save_tutor_option.disabled = false;
                  }
                }
              });
              var onChangeEvent = new Event('change');
              element.dispatchEvent(onChangeEvent);
              jQuery(selectFieldOptions).trigger('change');
            };
          });
        }

        var countHiddenItems = function countHiddenItems(list) {
          var result = 0;
          list.forEach(function (item) {
            if (item.style.display !== 'none') {
              result += 1;
            }
          });
          return result;
        };

        searchInput.oninput = function (e) {
          var txtValue,
              noItemFound = false;
          resultFilter = e.target.value.toUpperCase();
          resultList.forEach(function (item) {
            textToSearch = item.querySelector('.text-regular-caption');
            txtValue = textToSearch.textContent || textToSearch.innerText;

            if (txtValue.toUpperCase().indexOf(resultFilter) > -1) {
              item.style.display = '';
              noItemFound = 'false'; // console.log('found');
            } else {
              noItemFound = 'true';
              item.style.display = 'none'; // console.log('not found');
            }
          }); // console.log(countHiddenItems(resultList), noItemFound);

          var noItemText = "\n                    <div class=\"tutor-dropdown-select-option noItem\">\n                        No item found\n                    </div>\n                    ";
          var appendNoItemText = dropDown.querySelector('.tutor-frequencies');

          if (0 == countHiddenItems(resultList)) {
            var hasNoItem = false;
            appendNoItemText.querySelectorAll('.tutor-dropdown-select-option').forEach(function (item) {
              if (item.classList.contains('noItem') == true) {
                hasNoItem = true;
              }
            });

            if (false == hasNoItem) {
              appendNoItemText.insertAdjacentHTML('beforeend', noItemText);
              hasNoItem = true;
            }
          } else {
            if (null !== dropDown.querySelector('.noItem')) {
              dropDown.querySelector('.noItem').remove();
            }
          }
        };
      }
    });
    var selectDdMarkup = document.querySelectorAll('.tutor-dropdown-select.select-dropdown');
    selectDdMarkup.forEach(function (item) {
      if (item.nextElementSibling) {
        if (item.nextElementSibling.classList.contains('select-dropdown')) {
          item.nextElementSibling.remove();
        }
      }
    });
    var otherDropDown = document.querySelectorAll('.tutor-dropdown-select-options-container');

    document.onclick = function (e) {
      dd_hide_dom_click(otherDropDown);
    };
  })();

  function dd_hide_dom_click(elem) {
    if (elem) {
      elem.forEach(function (elemItem) {
        elemItem.classList.remove('is-active');
      });
    }
  }

  function ddMarkup(options) {
    var optionsList = '';
    Array.from(options).forEach(function (item) {
      optionsList += "\n            <div class=\"tutor-dropdown-select-option\">\n\t\t\t\t<div class=\"text-regular-caption color-text-title tutor-admin-report-frequency\" data-key=\"".concat(item.value, "\">").concat(item.text, "</div>\n            </div>\n            ");
    });
    var markupDD = "\n        <div class=\"tutor-dropdown-select select-dropdown\">\n            <div class=\"tutor-dropdown-select-options-container\">\n                <div class=\"tutor-input-search\">\n                    <div class=\"tutor-input-group tutor-form-control-has-icon tutor-form-control-lg\">\n                        <span class=\"tutor-icon-search-filled tutor-input-group-icon color-black-50\"></span>\n                        <input\n                        type=\"search\"\n                        class=\"tutor-form-control\"\n                        placeholder=\"Search ...\"\n                        />\n                    </div>\n                </div>\n                <div class=\"tutor-frequencies\">\n                    ".concat(optionsList, "\n                </div>\n            </div>\n            <div class=\"tutor-dropdown-select-selected\">\n                <div class=\"text-medium-body color-text-primary\"> ").concat(window.wp.i18n.__('Select One', 'tutor'), "\t</div>\n            </div>\n        </div>\n        ");
    return markupDD;
  }
}; // const callback = function(mutationsList) {
// 	for (let mutation of mutationsList) {
// 		if (mutation.type == 'childList') {
// 			if (mutation.addedNodes.length) {
// 				if (mutation.target.id === 'tutor-course-filter-loop-container') {
// 					window.selectSearchField('.tutor-form-select');
// 				}
// 			}
// 		}
// 	}
// };
// const observer = new MutationObserver(callback);
// const targetNode = document.querySelector('body');
// const config = { attributes: true, childList: true, subtree: true };
// observer.observe(targetNode, config);


selectSearchField('.tutor-form-select');

/***/ }),

/***/ "./assets/react/front/course/_lesson.js":
/*!**********************************************!*\
  !*** ./assets/react/front/course/_lesson.js ***!
  \**********************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  $(document).on('click', '.tutor-single-course-lesson-comments button[type="submit"]', function (e) {
    e.preventDefault();
    var btn = $(this);
    var form = btn.closest('form');
    var data = form.serialize();
    console.log(data);
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        btn.addClass('tutor-updating-message').prop('disabled', true);
      },
      success: function success() {
        // Replicate pagination click
        var replacable = btn.closest('.tutor-pagination-wrapper-replacable');
        var wrapper = replacable.find('[data-tutor_pagination_ajax]');
        var lesson_id = replacable.data('lesson_id');

        var _ref = wrapper.length ? wrapper.data('tutor_pagination_ajax') : {},
            _ref$current_page_num = _ref.current_page_num,
            current_page_num = _ref$current_page_num === void 0 ? 1 : _ref$current_page_num;

        var page_num = btn.hasClass('tutor-lesson-comment-reply') ? current_page_num : 1; // New comment opens first page
        // Create wrapper if not available

        if (!wrapper.length) {
          var rand_string = 'tutor_id_' + new Date().getTime();
          replacable.append('<div data-tutor_pagination_ajax="" id="' + rand_string + '"></div>');
          wrapper = $('#' + rand_string);
        }

        wrapper.attr('data-tutor_pagination_ajax', '{"action":"tutor_single_course_lesson_load_more","lesson_id":' + lesson_id + '}').append('<a class="page-numbers" style="display:none" id="tutor_lesson_load_temp" href="' + _tutorobject.home_url + '?current_page=' + page_num + '"></a>').find('a#tutor_lesson_load_temp').trigger('click');
      },
      error: function error(e) {
        alert('Something went wrong!');
        btn.removeClass('tutor-updating-message').prop('disabled', false);
      }
    });
  }); // Set navigation menu position

  $(window).resize(function () {
    var height = 500;
    var top = '50px';

    if ($('.course-players-parent').length) {
      height = $('.course-players-parent').height() - 100;
      top = '50px';
    }

    if ($('.tutor-lesson-feature-image').length) {
      height = $('.tutor-lesson-feature-image').height();
      top = '0px';
    }

    $('.tutor-single-course-content-next, .tutor-single-course-content-prev').css('height', height + 'px').show().find('a').css('top', top);
  }).trigger('resize');
});

/***/ }),

/***/ "./assets/react/front/course/_login-reg.js":
/*!*************************************************!*\
  !*** ./assets/react/front/course/_login-reg.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/response */ "./assets/react/helper/response.js");

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__;
  /**
   * Tutor ajax login
   *
   * @since v.1.6.3
   */

  $(document).on('submit', '.tutor-login-modal form', function (e) {
    e.preventDefault();
    var form = $(this);
    var button = form.find('button');
    var error_container = form.find('.tutor-login-error');
    var form_data = $(this).serializeObject();
    form_data.action = 'tutor_user_login';
    console.log(form_data);
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: form_data,
      beforeSend: function beforeSend() {
        button.addClass('tutor-updating-message');
        error_container.empty();
      },
      success: function success(response) {
        if (response.success) {
          location.assign(response.data.redirect_to);
          return;
        }

        var error_message = (response.data || {}).message || __('Invalid username or password!', 'tutor');

        error_container.html("\n                    <div class=\"tutor-alert tutor-warning tutor-mt-28\">\n                        <div class=\"tutor-alert-text\">\n                            <span class=\"tutor-alert-icon tutor-icon-34 tutor-icon-circle-outline-info-filled tutor-mr-12\"></span>\n                            <span>\n                                ".concat(error_message, "\n                            </span>\n                        </div>\n                    </div>\n                "));
      },
      error: function error() {
        tutor_toast(__('Error!', 'tutor'), (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(), 'error');
      },
      complete: function complete() {
        button.removeClass('tutor-updating-message');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/front/course/_social-share.js":
/*!****************************************************!*\
  !*** ./assets/react/front/course/_social-share.js ***!
  \****************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  /**
   * Share Link enable
   *
   * @since v.1.0.4
   */
  if ($.fn.ShareLink) {
    var $social_share_wrap = $('.tutor-social-share-wrap');

    if ($social_share_wrap.length) {
      var share_config = JSON.parse($social_share_wrap.attr('data-social-share-config'));
      $social_share_wrap.find('.tutor_share').ShareLink({
        title: share_config.title,
        text: share_config.text,
        image: share_config.image,
        class_prefix: 's_',
        width: 640,
        height: 480
      });
    }
  }
});

/***/ }),

/***/ "./assets/react/front/course/_spotlight-quiz-timing.js":
/*!*************************************************************!*\
  !*** ./assets/react/front/course/_spotlight-quiz-timing.js ***!
  \*************************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = window.wp.i18n.__;
  /**
   * Quiz attempt
   */

  var $tutor_quiz_time_update = $('#tutor-quiz-time-update'); // Assign countdown if quiz time element available

  if ($tutor_quiz_time_update.length) {
    // Get timing info from data
    var attempt_settings = JSON.parse($tutor_quiz_time_update.attr('data-attempt-settings'));
    var attempt_meta = JSON.parse($tutor_quiz_time_update.attr('data-attempt-meta')); // Restrict quiz timing if time limit is set

    if (attempt_meta.time_limit.time_limit_seconds > 0) {
      // Get the timeout timestamp
      var countDownDate = new Date(attempt_settings.attempt_started_at).getTime() + attempt_meta.time_limit.time_limit_seconds * 1000;
      var time_now = new Date(attempt_meta.date_time_now).getTime(); // Set the time interval to show countdown

      var tutor_quiz_interval = setInterval(function () {
        // Distance between current time and the quiz timeout timestamp
        var distance = countDownDate - time_now; // Distance in human readable fragments

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        var seconds = Math.floor(distance % (1000 * 60) / 1000); // Concat fragments to human redable time

        var countdown_human = '';
        days ? countdown_human += days + 'd ' : 0;
        countdown_human += (hours || 0) + 'h ';
        countdown_human += (minutes || 0) + 'm ';
        countdown_human += (seconds || 0) + 's '; // If distance is smaller than 0, then clear the interval and show reattempt alert box

        if (distance < 0) {
          clearInterval(tutor_quiz_interval);
          $tutor_quiz_time_update.toggleClass('tutor-quiz-time-expired'); // Replace the time with expired text

          countdown_human = 'EXPIRED';

          if (_tutorobject.quiz_options.quiz_when_time_expires === 'auto_submit') {
            // Automatically submit the quiz with the progress so far
            $('form#tutor-answering-quiz').submit();
          } else {
            // Else if 'auto_abandon' or anything else for now
            // Add Disable state button class and disable then
            $('.tutor-quiz-answer-next-btn, .tutor-quiz-submit-btn, .tutor-quiz-answer-previous-btn').addClass('tutor-btn-disable tutor-no-hover').prop('disabled', true); // add alert text

            $('.time-remaining span').css('color', '#F44337'); // Abandon the quiz. The attempt status in the database will be 'attempt_timeout'

            $.ajax({
              url: _tutorobject.ajaxurl,
              type: 'POST',
              data: {
                quiz_id: $('#tutor_quiz_id').val(),
                action: 'tutor_quiz_timeout'
              },
              success: function success(data) {
                var attemptAllowed = $('#tutor-quiz-time-expire-wrapper').data('attempt-allowed');
                var attemptRemaining = $('#tutor-quiz-time-expire-wrapper').data('attempt-remaining');
                var alertDiv = '#tutor-quiz-time-expire-wrapper';
                $(alertDiv).addClass('tutor-alert-show'); // if attempt remaining

                if (attemptRemaining > 0) {
                  $("".concat(alertDiv, " .tutor-quiz-alert-text")).html(__('Your time limit for this quiz has expired, please reattempt the quiz. Attempts remaining: ' + attemptRemaining + '/' + attemptAllowed, 'tutor'));
                } else {
                  // if attempt not remaining
                  if ($(alertDiv).hasClass('time-remaining-warning')) {
                    $(alertDiv).removeClass('time-remaining-warning');
                    $(alertDiv).addClass('time-over');
                  }

                  if ($("".concat(alertDiv, " .flash-info span:first-child")).hasClass('tutor-icon-warning-outline-circle-filled')) {
                    $("".concat(alertDiv, " .flash-info span:first-child")).removeClass('tutor-icon-warning-outline-circle-filled');
                    $("".concat(alertDiv, " .flash-info span:first-child")).addClass('tutor-icon-cross-circle-outline-filled');
                  }

                  $tutor_quiz_time_update.toggleClass('tutor-quiz-time-expired');
                  $('#tutor-start-quiz').hide();
                  $("".concat(alertDiv, " .tutor-quiz-alert-text")).html("".concat(__('Unfortunately, you are out of time and quiz attempts. ', 'tutor')));
                }
              },
              complete: function complete() {}
            });
          }
        } // Update the time_now variable


        time_now = time_now + 1000; // Update the alert content based on timing

        $tutor_quiz_time_update.html(countdown_human); // clearTimeout(tutor_quiz_interval);
        // return;

        if (countdown_human == 'EXPIRED') {
          $tutor_quiz_time_update.addClass('color-text-error');
        }
        /**
         * dynamically update progress indicator
         *
         * @since v2.0.0
         */


        if (distance) {
          // convert distance in sec
          var newDistance = distance / 1000; // get total time duration in sec

          var totalTime = attempt_meta.time_limit.time_limit_seconds; //calculate progress

          var progress = Math.ceil(newDistance * 100 / totalTime);
          var svgWrapper = document.querySelector('.quiz-time-remaining-progress-circle');
          var svg = document.querySelector('.quiz-time-remaining-progress-circle svg');

          if (svg && svgWrapper) {
            var StrokeDashOffset = 44 - 44 * (progress / 100);

            if (progress <= 0) {
              progress = 0; // if time out red the progress circle

              svgWrapper.innerHTML = "<svg viewBox=\"0 0 50 50\" width=\"50\" height=\"50\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<circle cx=\"0\" cy=\"0\" r=\"11\"></circle>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</svg>";
              svgWrapper.setAttribute('class', 'quiz-time-remaining-expired-circle');
            }

            svg.setAttribute('style', "stroke-dashoffset: ".concat(StrokeDashOffset, ";")); // svg.setAttribute('style', `--quizeProgress: ${100 - progress}`);
          }
        }
      }, 1000);
    } else {
      // If no time limit is set, show 'No Limit' message
      $tutor_quiz_time_update.html(__('No Limit', 'tutor'));
    }
  }

  var $quiz_start_form = $('form#tutor-start-quiz');

  if ($quiz_start_form.length) {
    if (_tutorobject.quiz_options.quiz_auto_start == 1) {
      $quiz_start_form.submit();
    }
  }
});

/***/ }),

/***/ "./assets/react/front/course/_spotlight-quiz.js":
/*!******************************************************!*\
  !*** ./assets/react/front/course/_spotlight-quiz.js ***!
  \******************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = window.wp.i18n.__;

  function feedback_response($question_wrap) {
    var goNext = false; // Prepare answer array

    var quiz_answers = JSON.parse(window.tutor_quiz_context.split('').reverse().join(''));
    !Array.isArray(quiz_answers) ? quiz_answers = [] : 0; // Evaluate result

    var feedBackMode = $question_wrap.attr('data-quiz-feedback-mode');
    $('.wrong-right-text').remove();
    $('.quiz-answer-input-bottom').removeClass('wrong-answer right-answer');
    var validatedTrue = true;
    var $inputs = $question_wrap.find('input');
    var $checkedInputs = $question_wrap.find('input[type="radio"]:checked, input[type="checkbox"]:checked');

    if (feedBackMode === 'retry') {
      $checkedInputs.each(function () {
        var $input = $(this);
        var $type = $input.attr('type');

        if ($type === 'radio' || $type === 'checkbox') {
          var isTrue = quiz_answers.indexOf($input.val()) > -1; // $input.attr('data-is-correct') == '1';

          if (!isTrue) {
            if ($input.prop("checked")) {
              $input.closest('.quiz-answer-input-bottom').addClass('wrong-answer').append("<span class=\"wrong-right-text\"><i class=\"tutor-icon-line-cross-line\"></i> ".concat(__('Incorrect, Please try again', 'tutor'), "</span>"));
            }

            validatedTrue = false;
          }
        }
      });
      $inputs.each(function () {
        var $input = $(this);
        var $type = $input.attr('type');

        if ($type === 'checkbox') {
          var isTrue = quiz_answers.indexOf($input.val()) > -1; // $input.attr('data-is-correct') == '1';

          var checked = $input.is(':checked');

          if (isTrue && !checked) {
            $question_wrap.find('.answer-help-block').html("<p style=\"color: #dc3545\">".concat(__('More answer for this question is required', 'tutor'), "</p>"));
            validatedTrue = false;
          }
        }
      });
    } else if (feedBackMode === 'reveal') {
      // Loop through every single checked radio/checkbox input field
      $checkedInputs.each(function () {
        var $input = $(this);
        var isTrue = quiz_answers.indexOf($input.val()) > -1; // $input.attr('data-is-correct') == '1';
        // And check if the answer is correct

        if (!isTrue) {
          validatedTrue = false;
        }
      }); // Loop through all the inputs regardless of correct/incorrect

      $inputs.each(function () {
        var $input = $(this);
        var $type = $input.attr('type'); // Reveal mode feature is currently available for only radio and checkbox type answers

        if ($type === 'radio' || $type === 'checkbox') {
          var isTrue = quiz_answers.indexOf($input.val()) > -1; // $input.attr('data-is-correct') == '1';

          var checked = $input.is(':checked');

          if (isTrue) {
            $input.closest('.quiz-question-ans-choice').addClass('right-answer').append("<span class=\"wrong-right-text\">\n                                        <i class=\"tutor-icon-pencil-line\"></i>\n                                        ".concat(__('Correct Answer', 'tutor'), "\n                                    </span>")).find('.wrong-right-text:eq(1)').remove();
          } else {
            if ($input.prop("checked")) {
              $input.closest('.quiz-answer-input-bottom').addClass('wrong-answer');
            }
          }

          if (isTrue && !checked) {
            $input.attr('disabled', 'disabled');
            validatedTrue = false;
            goNext = true;
          }
        }
      });
    }

    if (validatedTrue) {
      goNext = true;
    }

    return goNext;
  }
  /**
   * Quiz Validation Helper
   *
   * @since v.1.6.1
   */


  function tutor_quiz_validation($question_wrap) {
    var validated = true;
    var $required_answer_wrap = $question_wrap.find('.quiz-answer-required');

    if ($required_answer_wrap.length) {
      /**
       * Radio field validation
       *
       * @type {jQuery}
       *
       * @since v.1.6.1
       */
      var $inputs = $required_answer_wrap.find('input');

      if ($inputs.length) {
        var $type = $inputs.attr('type');

        if ($type === 'radio') {
          if ($required_answer_wrap.find('input[type="radio"]:checked').length == 0) {
            $question_wrap.find('.answer-help-block').html("<p style=\"color: #dc3545\">".concat(__('Please select an option to answer', 'tutor'), "</p>"));
            validated = false;
          }
        } else if ($type === 'checkbox') {
          if ($required_answer_wrap.find('input[type="checkbox"]:checked').length == 0) {
            $question_wrap.find('.answer-help-block').html("<p style=\"color: #dc3545\">".concat(__('Please select at least one option to answer.', 'tutor'), "</p>"));
            validated = false;
          }
        } else if ($type === 'text') {
          //Fill in the gaps if many, validation all
          $inputs.each(function (index, input) {
            if (!$(input).val().trim().length) {
              $question_wrap.find('.answer-help-block').html("<p style=\"color: #dc3545\">".concat(__('The answer for this question is required', 'tutor'), "</p>"));
              validated = false;
            }
          });
        }
      }

      if ($required_answer_wrap.find('textarea').length) {
        if ($required_answer_wrap.find('textarea').val().trim().length < 1) {
          $question_wrap.find('.answer-help-block').html("<p style=\"color: #dc3545\">".concat(__('The answer for this question is required', 'tutor'), "</p>"));
          validated = false;
        }
      }
    }

    return validated;
  }
  /**
   * Quiz view
   * @date 22 Feb, 2019
   * @since v.1.0.0
   */


  $('.tutor-quiz-next-btn-all').prop('disabled', false);
  $(document).on('click', '.tutor-quiz-answer-next-btn, .tutor-quiz-answer-previous-btn', function (e) {
    e.preventDefault();
    var counter_el = $('.tutor-quiz-question-counter>span:first-child');
    var current_question = parseInt($(this).closest('[data-question_index]').data('question_index')); // Show previous quiz if press previous button

    if ($(this).hasClass('tutor-quiz-answer-previous-btn')) {
      $(this).closest('.quiz-attempt-single-question').hide().prev().show();
      counter_el.text(current_question - 1);
      return;
    }

    var $that = $(this);
    var $question_wrap = $that.closest('.quiz-attempt-single-question');
    /**
     * Validating required answer
     * @type {jQuery}
     *
     * @since v.1.6.1
     */

    var validated = tutor_quiz_validation($question_wrap);

    if (!validated) {
      return;
    }

    var feedBackNext = feedback_response($question_wrap);

    if (!feedBackNext) {
      return;
    }

    var question_id = parseInt($that.closest('.quiz-attempt-single-question').attr('id').match(/\d+/)[0], 10);
    var next_question_id = $that.closest('.quiz-attempt-single-question').attr('data-next-question-id');

    if (next_question_id) {
      var $nextQuestion = $(next_question_id);

      if ($nextQuestion && $nextQuestion.length) {
        /**
         * check if reveal mode wait for 500ms then
         * hide question so that correct answer reveal
         * @since 1.8.10
         */
        var feedBackMode = $question_wrap.attr('data-quiz-feedback-mode');

        if (feedBackMode === 'reveal') {
          setTimeout(function () {
            $('.quiz-attempt-single-question').hide();
            $nextQuestion.show();
          }, 800);
        } else {
          $('.quiz-attempt-single-question').hide();
          $nextQuestion.show();
        }
        /**
         * If pagination exists, set active class
         */


        if ($('.tutor-quiz-questions-pagination').length) {
          $('.tutor-quiz-question-paginate-item').removeClass('active');
          $('.tutor-quiz-questions-pagination a[href="' + next_question_id + '"]').addClass('active');
        } // Increase counter


        counter_el.text(current_question + 1);
      }
    }
  });
  $(document).on('click', '.tutor-quiz-question-paginate-item', function (e) {
    e.preventDefault();
    var $that = $(this);
    var $question = $($that.attr('href'));
    $('.quiz-attempt-single-question').hide();
    $question.show(); //Active Class

    $('.tutor-quiz-question-paginate-item').removeClass('active');
    $that.addClass('active');
  });
  /**
   * Limit Short Answer Question Type
   */

  $(document).on('keyup', 'textarea.question_type_short_answer, textarea.question_type_open_ended', function (e) {
    var $that = $(this);
    var value = $that.val();
    var limit = $that.hasClass('question_type_short_answer') ? _tutorobject.quiz_options.short_answer_characters_limit : _tutorobject.quiz_options.open_ended_answer_characters_limit;
    var remaining = limit - value.length;

    if (remaining < 1) {
      $that.val(value.substr(0, limit));
      remaining = 0;
    }

    $that.closest('.tutor-quiz-answers-wrap').find('.characters_remaining').html(remaining);
  });
  $(document).on('submit', '#tutor-answering-quiz', function (e) {
    var $questions_wrap = $('.quiz-attempt-single-question');
    var quizSubmitBtn = document.querySelector('.tutor-quiz-submit-btn');
    quizSubmitBtn.disabled = true;
    var validated = true;

    if ($questions_wrap.length) {
      $questions_wrap.each(function (index, question) {
        // !tutor_quiz_validation( $(question) ) ? validated = false : 0;
        // !feedback_response( $(question) ) ? validated = false : 0;
        validated = tutor_quiz_validation($(question));
        validated = feedback_response($(question));
      });
    }

    if (!validated) {
      e.preventDefault();
    }

    setTimeout(function () {
      quizSubmitBtn.disabled = true;
    }, 500);
  });
  $(".tutor-quiz-submit-btn").click(function () {
    $("#tutor-answering-quiz").submit();
  }); //warn user before leave page if quiz is running

  var $tutor_quiz_time_update = $('#tutor-quiz-time-update');
  $(document).on('click', 'a', function (event) {
    var href = $(this).attr('href');

    if ($tutor_quiz_time_update.length > 0 && $tutor_quiz_time_update.text() != 'EXPIRED') {
      event.preventDefault();
      event.stopImmediatePropagation();
      var popup;
      var data = {
        title: __('Abandon Quiz?', 'tutor'),
        description: __('Do you want to abandon this quiz? The quiz will be submitted partially up to this question if you leave this page.', 'tutor'),
        buttons: {
          keep: {
            title: __('Yes, leave quiz', 'tutor'),
            id: 'leave',
            "class": 'tutor-btn tutor-is-outline tutor-is-default',
            callback: function callback() {
              var formData = $('form#tutor-answering-quiz').serialize() + '&action=' + 'tutor_quiz_abandon';
              $.ajax({
                url: window._tutorobject.ajaxurl,
                type: 'POST',
                data: formData,
                beforeSend: function beforeSend() {
                  document.querySelector('#tutor-popup-leave').innerHTML = __('Leaving...', 'tutor');
                },
                success: function success(response) {
                  if (response.success) {
                    location.href = href;
                  } else {
                    alert(__('Something went wrong', 'tutor'));
                  }
                },
                error: function error() {
                  alert(__('Something went wrong', 'tutor'));
                  popup.remove();
                }
              });
            }
          },
          reset: {
            title: __('Stay here', 'tutor'),
            id: 'reset',
            "class": 'tutor-btn',
            callback: function callback() {
              popup.remove();
            }
          }
        }
      };
      popup = new window.tutor_popup($, '', 40).popup(data);
    }
  });
  /* Disable start quiz button  */

  $('body').on('submit', 'form#tutor-start-quiz', function () {
    $(this).find('button').prop('disabled', true);
  });
});

/***/ }),

/***/ "./assets/react/front/course/_spotlight.js":
/*!*************************************************!*\
  !*** ./assets/react/front/course/_spotlight.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_dashboard_segments_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../admin-dashboard/segments/filter */ "./assets/react/admin-dashboard/segments/filter.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


jQuery(document).ready(function ($) {
  $('.tutor-sortable-list').sortable();
});
document.addEventListener('DOMContentLoaded', function (event) {
  var _wp$i18n = wp.i18n,
      __ = _wp$i18n.__,
      _x = _wp$i18n._x,
      _n = _wp$i18n._n,
      _nx = _wp$i18n._nx;
  var sidebar = document.querySelector('.tutor-lesson-sidebar.tutor-desktop-sidebar');
  var sidebarToggle = document.querySelector('.tutor-sidebar-toggle-anchor');

  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      if (getComputedStyle(sidebar).flex === '0 0 400px') {
        sidebar.style.flex = '0 0 0px';
        sidebar.style.display = 'none';
      } else {
        sidebar.style.display = 'block';
        sidebar.style.flex = '0 0 400px';
      }
    });
  }

  var sidebarTabeHandler = function sidebarTabeHandler(sideBarTabs) {
    var tabWrapper = document.querySelector('.tutor-desktop-sidebar-area');

    if (null !== tabWrapper && tabWrapper.children.length < 2) {
      return;
    }

    sideBarTabs.forEach(function (tab) {
      tab.addEventListener('click', function (event) {
        var tabConent = event.currentTarget.parentNode.nextElementSibling;
        clearActiveClass(tabConent);
        event.currentTarget.classList.add('active');
        var id = event.currentTarget.getAttribute('data-sidebar-tab');
        tabConent.querySelector('#' + id).classList.add('active');
      });
    });

    var clearActiveClass = function clearActiveClass(tabConent) {
      for (var i = 0; i < sideBarTabs.length; i++) {
        sideBarTabs[i].classList.remove('active');
      }

      var sidebarTabItems = tabConent.querySelectorAll('.tutor-lesson-sidebar-tab-item');

      for (var _i = 0; _i < sidebarTabItems.length; _i++) {
        sidebarTabItems[_i].classList.remove('active');
      }
    };
  };

  var desktopSidebar = document.querySelectorAll('.tutor-desktop-sidebar-area .tutor-sidebar-tab-item');
  var mobileSidebar = document.querySelectorAll('.tutor-mobile-sidebar-area .tutor-sidebar-tab-item');

  if (desktopSidebar) {
    sidebarTabeHandler(desktopSidebar);
  }

  if (mobileSidebar) {
    sidebarTabeHandler(mobileSidebar);
  }
  /* end of sidetab tab */

  /* comment text-area focus arrow style */


  var commentTextarea = document.querySelectorAll('.tutor-comment-textarea textarea');

  if (commentTextarea) {
    commentTextarea.forEach(function (item) {
      item.addEventListener('focus', function () {
        item.parentElement.classList.add('is-focused');
      });
      item.addEventListener('blur', function () {
        item.parentElement.classList.remove('is-focused');
      });
    });
  }
  /* comment text-area focus arrow style */


  function commentSideLine() {
    var parentComments = document.querySelectorAll('.tutor-comments-list.tutor-parent-comment');
    var replyComment = document.querySelector('.tutor-comment-box.tutor-reply-box');

    if (parentComments) {
      _toConsumableArray(parentComments).forEach(function (parentComment) {
        var childComments = parentComment.querySelectorAll('.tutor-comments-list.tutor-child-comment');
        var commentLine = parentComment.querySelector('.tutor-comment-line');
        var childCommentCount = childComments.length;

        if (childComments[childCommentCount - 1]) {
          var lastCommentHeight = childComments[childCommentCount - 1].clientHeight;
          var heightOfLine = lastCommentHeight + replyComment.clientHeight + 20 - 25 + 50;
          commentLine.style.setProperty('height', "calc(100% - ".concat(heightOfLine, "px)"));
        }
      });
    }
  }

  commentSideLine();
  window.addEventListener(_tutorobject.content_change_event, commentSideLine);
  var spotlightTabs = document.querySelectorAll('.tutor-spotlight-tab.tutor-default-tab .tab-header-item');
  var spotlightTabContent = document.querySelectorAll('.tutor-spotlight-tab .tab-body-item');

  if (spotlightTabs && spotlightTabContent) {
    document.addEventListener('click', function (event) {
      var currentItem = event.target;
      var isValidCurrentItem = currentItem.classList.contains('tab-header-item');

      if (isValidCurrentItem) {
        clearSpotlightTabActiveClass(spotlightTabs, spotlightTabContent);
        currentItem.classList.add('is-active');
        var id = currentItem.getAttribute('data-tutor-spotlight-tab-target');
        var query_string = currentItem.getAttribute('data-tutor-query-string');
        var tabConent = currentItem.parentNode.nextElementSibling;

        if (null !== tabConent.querySelector('#' + id)) {
          tabConent.querySelector('#' + id).classList.add('is-active');
        }

        if (id === 'tutor-course-spotlight-tab-3') {
          commentSideLine();
        }

        var url = new URL(window.location);
        url.searchParams.set('page_tab', query_string);
        window.history.pushState({}, '', url);
      }
    });

    var clearSpotlightTabActiveClass = function clearSpotlightTabActiveClass() {
      var spotlightTabs = document.querySelectorAll('.tutor-spotlight-tab.tutor-default-tab .tab-header-item');
      var spotlightTabContent = document.querySelectorAll('.tutor-spotlight-tab .tab-body-item');
      spotlightTabs.forEach(function (item) {
        item.classList.remove('is-active');
      });
      spotlightTabContent.forEach(function (item) {
        item.classList.remove('is-active');
      });
    };
  }
  /* commenting */
  // quize drag n drop functionality


  var tutorDraggables = document.querySelectorAll('.tutor-draggable > div');
  var tutorDropzone = document.querySelectorAll('.tutor-dropzone');
  tutorDraggables.forEach(function (quizBox) {
    quizBox.addEventListener('dragstart', dragStart);
    quizBox.addEventListener('dragend', dragEnd);
  });
  tutorDropzone.forEach(function (quizImageBox) {
    quizImageBox.addEventListener('dragover', dragOver);
    quizImageBox.addEventListener('dragenter', dragEnter);
    quizImageBox.addEventListener('dragleave', dragLeave);
    quizImageBox.addEventListener('drop', dragDrop);
  });

  function dragStart() {
    this.classList.add('tutor-dragging');
  }

  function dragEnd() {
    this.classList.remove('tutor-dragging');
  }

  function dragOver(event) {
    this.classList.add('tutor-drop-over');
    event.preventDefault();
  }

  function dragEnter() {}

  function dragLeave() {
    this.classList.remove('tutor-drop-over');
  }

  function dragDrop() {
    var copyElement = document.querySelector('.tutor-quiz-border-box.tutor-dragging');

    if (this.querySelector('input')) {
      this.querySelector('input').remove();
    }

    var input = copyElement.querySelector('input');
    var inputValue = input.value;
    var inputName = input.dataset.name;
    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.setAttribute('value', input.value);
    newInput.setAttribute('name', inputName);
    this.appendChild(newInput);
    var copyContent = copyElement.querySelector('.tutor-dragging-text-conent').textContent;
    this.querySelector('.tutor-dragging-text-conent').textContent = copyContent;
    this.classList.remove('tutor-drop-over');
  } // tutor assignment file upload


  var fileUploadField = document.getElementById('tutor-assignment-file-upload');

  if (fileUploadField) {
    fileUploadField.addEventListener('change', tutorAssignmentFileHandler);
  }

  function tutorAssignmentFileHandler() {
    var _document$querySelect;

    var uploadedFileSize = _toConsumableArray(fileUploadField.files).reduce(function (sum, file) {
      return sum + file.size;
    }, 0); // byte


    var uploadSizeLimit = parseInt((_document$querySelect = document.querySelector('input[name="tutor_assignment_upload_limit"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || 0;
    var message = '';
    var maxAllowedFiles = window._tutorobject.assignment_max_file_allowed;
    var alreadyUploaded = document.querySelectorAll('#tutor-student-assignment-edit-file-preview .tutor-instructor-card').length;
    var allowedToUpload = maxAllowedFiles - alreadyUploaded;

    if (fileUploadField.files.length > allowedToUpload) {
      tutor_toast(__('Warning', 'tutor'), __("Max ".concat(maxAllowedFiles, " file allowed to upload"), 'tutor'), 'error');
      return;
    }

    if (uploadedFileSize > uploadSizeLimit) {
      tutor_toast(__('Warning', 'tutor'), __("File size exceeds maximum limit ".concat(Math.floor(uploadSizeLimit / 1000000), " MB."), 'tutor'), 'error');
      return;
    }

    if ('files' in fileUploadField) {
      if (fileUploadField && fileUploadField.files.length == 0) {
        message = 'Select one or more files.';
      } else {
        if (fileUploadField.files.length > allowedToUpload) {
          tutor_toast(__('Warning', 'tutor'), __("Max ".concat(maxAllowedFiles, " file allowed to upload"), 'tutor'), 'error');
        }

        var fileCard = '';
        var assignmentFilePreview = document.querySelector('.tutor-asisgnment-upload-file-preview');
        var assignmentEditFilePreview = document.getElementById('tutor-student-assignment-edit-file-preview');

        for (var i = 0; i < allowedToUpload; i++) {
          var file = fileUploadField.files[i];

          if (!file) {
            continue;
          }

          var editWrapClass = assignmentEditFilePreview ? 'tutor-col-sm-5 tutor-py-16 tutor-mr-16' : '';
          fileCard += "<div class=\"tutor-instructor-card ".concat(editWrapClass, "\">\n                                    <div class=\"tutor-icard-content\">\n                                        <div class=\"text-regular-body color-text-title\">\n                                            ").concat(file.name, "\n                                        </div>\n                                        <div class=\"text-regular-small\">Size: ").concat(file.size, "</div>\n                                    </div>\n                                    <div onclick=\"(() => {\n\t\t\t\t\t\t\t\t\t\tthis.closest('.tutor-instructor-card').remove();\n\t\t\t\t\t\t\t\t\t})()\" class=\"tutor-attachment-file-close tutor-avatar tutor-is-xs flex-center\">\n                                        <span class=\"tutor-icon-cross-filled color-design-brand\"></span>\n                                    </div>\n                                </div>");
        }

        if (assignmentFilePreview) {
          assignmentFilePreview.innerHTML = fileCard;
        }

        if (assignmentEditFilePreview) {
          assignmentEditFilePreview.insertAdjacentHTML('beforeend', fileCard);
        }
      }
    }
  }
  /* Show More Text */


  var showMoreBtn = document.querySelector('.tutor-show-more-btn button');

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', showMore);
  }

  function showMore() {
    var lessText = document.getElementById('short-text');
    var dots = document.getElementById('dots');
    var moreText = document.getElementById('full-text');
    var btnText = document.getElementById('showBtn');
    var contSect = document.getElementById('content-section');

    if (dots.style.display === 'none') {
      lessText.style.display = 'block';
      dots.style.display = 'inline';
      btnText.innerHTML = "<span class='btn-icon tutor-icon-plus-filled color-design-brand'></span><span class='color-text-primary'>Show More</span>";
      moreText.style.display = 'none';
    } else {
      lessText.style.display = 'none';
      dots.style.display = 'none';
      btnText.innerHTML = "<span class='btn-icon tutor-icon-minus-filled color-design-brand'></span><span class='color-text-primary'>Show Less</span>";
      moreText.style.display = 'block';
      contSect.classList.add('no-before');
    }
  } //remove file


  var removeButton = document.querySelectorAll('.tutor-attachment-file-close a');
  removeButton.forEach(function (item) {
    item.onclick = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var currentTarget, fileName, id, formData, span, post, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                currentTarget = event.currentTarget;
                fileName = currentTarget.dataset.name;
                id = currentTarget.dataset.id;
                formData = new FormData();
                formData.set('action', 'tutor_remove_assignment_attachment');
                formData.set('assignment_comment_id', id);
                formData.set('file_name', fileName);
                formData.set(window.tutor_get_nonce_data(true).key, window.tutor_get_nonce_data(true).value);
                span = currentTarget.querySelector('span');
                span.classList.add('tutor-updating-message');
                _context.next = 13;
                return (0,_admin_dashboard_segments_filter__WEBPACK_IMPORTED_MODULE_0__["default"])(formData);

              case 13:
                post = _context.sent;

                if (!post.ok) {
                  _context.next = 21;
                  break;
                }

                _context.next = 17;
                return post.json();

              case 17:
                response = _context.sent;

                if (!response) {
                  tutor_toast(__('Warning', 'tutor'), __("Attachment remove failed", 'tutor'), 'error');
                } else {
                  currentTarget.closest('.tutor-instructor-card').remove();
                }

                _context.next = 23;
                break;

              case 21:
                alert(post.statusText);
                span.classList.remove('tutor-updating-message');

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();
  });
});

/***/ }),

/***/ "./assets/react/front/course/_wishlist.js":
/*!************************************************!*\
  !*** ./assets/react/front/course/_wishlist.js ***!
  \************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__;
  $(document).on('click', '.tutor-course-wishlist-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var course_id = $that.attr('data-course-id');
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: {
        course_id: course_id,
        action: 'tutor_course_add_to_wishlist'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message tutor-m-0');
      },
      success: function success(data) {
        if (data.success) {
          if (data.data.status === 'added') {
            $that.find('i').addClass('tutor-icon-fav-full-filled').removeClass('tutor-icon-fav-line-filled');
          } else {
            $that.find('i').addClass('tutor-icon-fav-line-filled').removeClass('tutor-icon-fav-full-filled');
          }
        } else {
          window.location = data.data.redirect_to;
        }
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message tutor-m-0');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/front/course/_woocommerce.js":
/*!***************************************************!*\
  !*** ./assets/react/front/course/_woocommerce.js ***!
  \***************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  // course archive page added_to_cart event change view cart html
  $(document).on('added_to_cart', function (event, fragments, cart_hash, $button) {
    $button.siblings('a.added_to_cart').addClass('tutor-btn tutor-btn-icon tutor-btn-disable-outline tutor-btn-ghost tutor-no-hover tutor-btn-md').prepend($button[0].querySelector('.btn-icon'));
  });
});

/***/ }),

/***/ "./assets/react/front/course/index.js":
/*!********************************************!*\
  !*** ./assets/react/front/course/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_reg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_login-reg */ "./assets/react/front/course/_login-reg.js");
/* harmony import */ var _spotlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_spotlight */ "./assets/react/front/course/_spotlight.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_wishlist */ "./assets/react/front/course/_wishlist.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wishlist__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _social_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_social-share */ "./assets/react/front/course/_social-share.js");
/* harmony import */ var _social_share__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_social_share__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _spotlight_quiz__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_spotlight-quiz */ "./assets/react/front/course/_spotlight-quiz.js");
/* harmony import */ var _spotlight_quiz__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_spotlight_quiz__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _spotlight_quiz_timing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_spotlight-quiz-timing */ "./assets/react/front/course/_spotlight-quiz-timing.js");
/* harmony import */ var _spotlight_quiz_timing__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_spotlight_quiz_timing__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lesson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_lesson */ "./assets/react/front/course/_lesson.js");
/* harmony import */ var _lesson__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lesson__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _woocommerce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_woocommerce */ "./assets/react/front/course/_woocommerce.js");
/* harmony import */ var _woocommerce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_woocommerce__WEBPACK_IMPORTED_MODULE_7__);








window.jQuery(document).ready(function ($) {
  // Login require on enrol purchase click
  $(document).on('click', '.tutor-course-entry-box-login button, .tutor-course-entry-box-login a, .tutor-open-login-modal', function (e) {
    e.preventDefault();
    var login_url = $(this).data('login_url') || $(this).closest('.tutor-course-entry-box-login').data('login_url');

    if (login_url) {
      window.location.assign(login_url);
    } else {
      $('.tutor-login-modal').addClass('tutor-is-active');
    }
  });
});

/***/ }),

/***/ "./assets/react/front/dashboard.js":
/*!*****************************************!*\
  !*** ./assets/react/front/dashboard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_mobile_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/mobile-nav */ "./assets/react/front/dashboard/mobile-nav.js");
/* harmony import */ var _dashboard_mobile_nav__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dashboard_mobile_nav__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dashboard_withdrawal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/withdrawal */ "./assets/react/front/dashboard/withdrawal.js");
/* harmony import */ var _dashboard_withdrawal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dashboard_withdrawal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dashboard_settings_profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/settings/profile */ "./assets/react/front/dashboard/settings/profile.js");
/* harmony import */ var _dashboard_settings_profile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dashboard_settings_profile__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dashboard_settings_passowrd_reset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/settings/passowrd-reset */ "./assets/react/front/dashboard/settings/passowrd-reset.js");
/* harmony import */ var _dashboard_settings_passowrd_reset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dashboard_settings_passowrd_reset__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ "./assets/react/front/dashboard/export-csv.js":
/*!****************************************************!*\
  !*** ./assets/react/front/dashboard/export-csv.js ***!
  \****************************************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  var _wp$i18n = wp.i18n,
      __ = _wp$i18n.__,
      _x = _wp$i18n._x,
      _n = _wp$i18n._n,
      _nx = _wp$i18n._nx;
  /**
   * Export purchase history
   *
   * @since v2.0.0
   */

  var exportPurchase = document.querySelectorAll(".tutor-export-purchase-history");

  var _iterator = _createForOfIteratorHelper(exportPurchase),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var purchased = _step.value;

      if (purchased) {
        purchased.onclick = function (e) {
          var target = e.currentTarget;
          var filename = "order-".concat(target.dataset.order, "-purchase-history.csv");
          var data = [{
            "Order ID ": target.dataset.order,
            "Course Name": target.dataset.courseName,
            Price: target.dataset.price,
            Date: target.dataset.date,
            Status: target.dataset.status
          }];
          exportCSV(data, filename);
        };
      }
    }
    /**
     * Export CSV file
     *
     * @param {*} data | data that will be used for generating CSV file
     * @param {*} filename | filename of CSV file
     * @since v2.0.0
     */

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function exportCSV(data, filename) {
    var keys = Object.keys(data[0]);
    var csvFile = [keys.join(","), data.map(function (row) {
      return keys.map(function (key) {
        return row[key];
      }).join(",");
    }).join("\n")].join("\n"); //generate csv

    var blob = new Blob([csvFile], {
      type: "text/csv;charset=utf-8"
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});

/***/ }),

/***/ "./assets/react/front/dashboard/mobile-nav.js":
/*!****************************************************!*\
  !*** ./assets/react/front/dashboard/mobile-nav.js ***!
  \****************************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  // Toggle menu in mobile view
  var $ = window.jQuery;
  $(".tutor-dashboard .tutor-dashboard-menu-toggler").click(function () {
    var el = $(".tutor-dashboard-left-menu");
    el.closest(".tutor-dashboard").toggleClass("is-sidebar-expanded");

    if (el.css("display") !== "none") {
      el.get(0).scrollIntoView({
        block: "start"
      });
    }
  });
});

/***/ }),

/***/ "./assets/react/front/dashboard/settings/passowrd-reset.js":
/*!*****************************************************************!*\
  !*** ./assets/react/front/dashboard/settings/passowrd-reset.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ../../../helper/response */ "./assets/react/helper/response.js"),
    get_response_message = _require.get_response_message;

window.jQuery(document).ready(function ($) {
  $('.tutor-settings-pass-field [name="confirm_new_password"]').on('input', function () {
    var original = $('[name="new_password"]');
    var val = (original.val() || '').trim();
    var matched = val && $(this).val() === val;
    $(this).next()[matched ? 'show' : 'hide']();
  });
  $('.tutor-profile-password-reset').click(function (e) {
    e.preventDefault();
    var btn = $(this);
    var form = btn.closest('form');
    var data = form.serializeObject();
    data.action = 'tutor_profile_password_reset';
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        btn.addClass('tutor-updating-message');
      },
      success: function success(resp) {
        var success = resp.success;

        if (success) {
          window.tutor_toast('Success', get_response_message(resp), 'success');
          window.location.reload();
        } else {
          window.tutor_toast('Error', get_response_message(resp), 'error');
        }
      },
      complete: function complete() {
        btn.removeClass('tutor-updating-message');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/front/dashboard/settings/profile.js":
/*!**********************************************************!*\
  !*** ./assets/react/front/dashboard/settings/profile.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ../../../helper/response */ "./assets/react/helper/response.js"),
    get_response_message = _require.get_response_message;

var validURL = function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return !!pattern.test(str);
};

var getResizedFromUploaded = function getResizedFromUploaded(file, dimension, callback) {
  // Read image as data url
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    // Read as image to retrieve dimension
    var image = new Image();
    image.addEventListener('load', function () {
      var width = image.width,
          height = image.height;
      var left = 0;
      var top = 0;
      var w = width;
      var h = height;

      if (dimension.width == dimension.height) {
        left = width > height ? (width - height) / 2 : 0;
        top = height > width ? (height - width) / 2 : 0;
        w = width > height ? height : width;
        h = height > width ? width : height;
      }

      dimension.height = dimension.height || height / width * dimension.width;
      var dm_width = dimension.width > width ? width : dimension.width;
      var dm_height = dimension.width > width ? height : dimension.height; // Create the destination canvas

      var canvas = document.createElement('canvas');
      canvas.width = dm_width;
      canvas.height = dm_height;
      var context = canvas.getContext('2d');
      context.drawImage(image, left, top, w, h, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(function (blob) {
        blob.name = file.name;
        blob.lastModified = file.lastModified;
        var reader2 = new FileReader();
        reader2.addEventListener('load', function () {
          callback(blob, reader2.result);
        });
        reader2.readAsDataURL(blob);
      }, 'image/jpeg');
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
};

window.jQuery(document).ready(function ($) {
  /**
   * Profile Photo and Cover Photo editor
   *
   * @since  v.1.7.5
   */
  var PhotoEditor = function PhotoEditor(photo_editor) {
    this.dialogue_box = photo_editor.find('#tutor_photo_dialogue_box');

    this.open_dialogue_box = function (name) {
      this.dialogue_box.attr('name', name);
      this.dialogue_box.trigger('click');
    };

    this.upload_selected_image = function (name, file) {
      var nonce = tutor_get_nonce_data(true);
      var context = this;
      context.toggle_loader(name, true); // Prepare payload to upload

      var form_data = new FormData();
      form_data.append('action', 'tutor_user_photo_upload');
      form_data.append('photo_type', name);
      form_data.append('photo_file', file, file.name);
      form_data.append(nonce.key, nonce.value); // Upload the image to server

      var _this = this;

      $.ajax({
        url: window._tutorobject.ajaxurl,
        data: form_data,
        type: 'POST',
        processData: false,
        contentType: false,
        error: context.error_alert,
        success: function success() {
          var photoType = _this.title_capitalize(name.replace('_', ' '));

          tutor_toast('Success', photoType + ' Changed successfully!', 'success');
        },
        complete: function complete() {
          context.toggle_loader(name, false);
        }
      });
    };

    this.title_capitalize = function (string) {
      var arr = string.split(' ');

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      return arr.join(' ');
    };

    this.accept_upload_image = function (context, e) {
      var file = e.currentTarget.files[0] || null;
      context.update_preview(e.currentTarget.name, file); // Resize 

      getResizedFromUploaded(file, {
        width: 1200
      }, function (blob) {
        context.upload_selected_image(e.currentTarget.name, blob);
      });
      $(e.currentTarget).val('');
    };

    this.delete_image = function (name) {
      var context = this;
      context.toggle_loader(name, true);
      $.ajax({
        url: window._tutorobject.ajaxurl,
        data: {
          action: 'tutor_user_photo_remove',
          photo_type: name
        },
        type: 'POST',
        error: context.error_alert,
        complete: function complete() {
          context.toggle_loader(name, false);
        }
      });
    };

    this.update_preview = function (name, file) {
      var renderer = photo_editor.find(name == 'cover_photo' ? '#tutor_cover_area' : '#tutor_profile_area');

      if (!file) {
        renderer.css('background-image', 'url(' + renderer.data('fallback') + ')');
        this.delete_image(name);
        return;
      }

      var reader = new FileReader();

      reader.onload = function (e) {
        renderer.css('background-image', 'url(' + e.target.result + ')');
      };

      reader.readAsDataURL(file);
    };

    this.toggle_profile_pic_action = function (show) {
      var method = show === undefined ? 'toggleClass' : show ? 'addClass' : 'removeClass';
      photo_editor[method]('pop-up-opened');
    };

    this.error_alert = function () {
      tutor_toast('Error', 'Maximum file size exceeded!', 'error'); // alert('Something Went Wrong.');
    };

    this.toggle_loader = function (name, show) {
      photo_editor.find('#tutor_photo_meta_area .loader-area').css('display', show ? 'block' : 'none');
    };

    this.initialize = function () {
      var context = this;
      this.dialogue_box.change(function (e) {
        context.accept_upload_image(context, e);
      });
      photo_editor.find('#tutor_profile_area .tutor_overlay, #tutor_pp_option>div:last-child').click(function () {
        context.toggle_profile_pic_action();
      }); // Upload new

      photo_editor.find('.tutor_cover_uploader').click(function () {
        context.open_dialogue_box('cover_photo');
      });
      photo_editor.find('.tutor_pp_uploader').click(function () {
        context.open_dialogue_box('profile_photo');
      }); // Delete existing

      photo_editor.find('.tutor_cover_deleter').click(function () {
        context.update_preview('cover_photo', null);
      });
      photo_editor.find('.tutor_pp_deleter').click(function () {
        context.update_preview('profile_photo', null);
      });
    };
  };

  var photo_editor = $('#tutor_profile_cover_photo_editor');
  photo_editor.length > 0 ? new PhotoEditor(photo_editor).initialize() : 0; // Save profile settings with ajax

  $('.tutor-profile-settings-save').click(function (e) {
    e.preventDefault();
    var btn = $(this);
    var form = btn.closest('form');
    var data = form.serializeObject();
    var phone = document.querySelector('[name=phone_number]');

    if (data.phone_number && !data.phone_number.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
      phone.classList.add('invalid');
      tutor_toast('Invalid', 'Invalid phone number', 'error');
      phone.focus();
      return false;
    } else {
      phone.classList.remove('invalid');
    }

    data.action = 'tutor_update_profile';
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        btn.addClass('tutor-updating-message');
      },
      success: function success(resp) {
        var success = resp.success;

        if (success) {
          window.tutor_toast('Success', get_response_message(resp), 'success');
        } else {
          window.tutor_toast('Error', get_response_message(resp), 'error');
        }
      },
      complete: function complete() {
        btn.removeClass('tutor-updating-message');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/front/dashboard/withdrawal.js":
/*!****************************************************!*\
  !*** ./assets/react/front/dashboard/withdrawal.js ***!
  \****************************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var $ = window.jQuery;
  /**
   * Withdraw Form Tab/Toggle
   *
   * @since v.1.1.2
   */

  $('.tutor-dashboard-setting-withdraw input[name="tutor_selected_withdraw_method"]').on('change', function (e) {
    var $that = $(this);
    var form = $that.closest('form');
    form.find('.withdraw-method-form').hide();
    form.find('.withdraw-method-form').hide().filter('[data-withdraw-form="' + $that.val() + '"]').show();
  });
});

/***/ }),

/***/ "./assets/react/front/pages/course-landing.js":
/*!****************************************************!*\
  !*** ./assets/react/front/pages/course-landing.js ***!
  \****************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = window.wp.i18n.__;
  /**
   * Retake course
   *
   * @since v1.9.5
   */

  $('.tutor-course-retake-button').prop('disabled', false).click(function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var course_id = $(this).data('course_id');
    var data = {
      title: __('Override Previous Progress', 'tutor'),
      description: __('Before continue, please decide whether to keep progress or reset.', 'tutor'),
      buttons: {
        reset: {
          title: __('Reset Data', 'tutor'),
          "class": 'tutor-btn tutor-is-outline tutor-is-default',
          callback: function callback(button) {
            $.ajax({
              url: window._tutorobject.ajaxurl,
              type: 'POST',
              data: {
                action: 'tutor_reset_course_progress',
                course_id: course_id
              },
              beforeSend: function beforeSend() {
                button.prop('disabled', true).addClass('tutor-updating-message');
              },
              success: function success(response) {
                if (response.success) {
                  window.location.assign(response.data.redirect_to);
                } else {
                  alert((response.data || {}).message || __('Something went wrong', 'tutor'));
                }
              },
              complete: function complete() {
                button.prop('disabled', false).removeClass('tutor-updating-message');
              }
            });
          }
        },
        keep: {
          title: __('Keep Data', 'tutor'),
          "class": 'tutor-btn',
          callback: function callback() {
            window.location.assign(url);
          }
        }
      }
    };
    new window.tutor_popup($, 'icon-gear', 40).popup(data);
  });
});
readyState_complete(function () {
  var loadingSpinner = document.querySelector('.course-players .loading-spinner');

  if (null !== loadingSpinner) {
    loadingSpinner.remove();
  }
});

/***/ }),

/***/ "./assets/react/front/pages/instructor-list-filter.js":
/*!************************************************************!*\
  !*** ./assets/react/front/pages/instructor-list-filter.js ***!
  \************************************************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

jQuery(document).ready(function ($) {
  /**
   *
   * Instructor list filter
   *
   * @since  v.1.8.4
   */
  // Get values on course category selection
  $('.tutor-instructor-filter').each(function () {
    var root = $(this);
    var filter_args = {};
    var time_out;

    function run_instructor_filter(name, value, page_number) {
      // Prepare http payload
      var result_container = root.find('.filter-result-container');
      var html_cache = result_container.html();
      var attributes = root.data();
      attributes.current_page = page_number || 1;
      name ? filter_args[name] = value : filter_args = {};
      filter_args.attributes = attributes;
      filter_args.action = 'load_filtered_instructor'; // Show loading icon

      result_container.html('<div style="text-align:center"><img src="' + window._tutorobject.loading_icon_url + '"/></div>');
      $.ajax({
        url: window._tutorobject.ajaxurl,
        data: filter_args,
        type: 'POST',
        success: function success(r) {
          result_container.html(r);
        },
        error: function error() {
          result_container.html(html_cache);
          tutor_toast('Failed', 'Request Error', 'error');
        }
      });
    }

    root.on('change', '.course-category-filter [type="checkbox"]', function () {
      var values = {};
      $(this).closest('.course-category-filter').find('input:checked').each(function () {
        values[$(this).val()] = $(this).parent().text();
      }); // Show selected cat list

      var cat_parent = root.find('.selected-cate-list').empty();
      var cat_ids = Object.keys(values);
      cat_ids.forEach(function (value) {
        cat_parent.append('<span>' + values[value] + ' <span class="tutor-icon-line-cross-line" data-cat_id="' + value + '"></span></span>');
      });
      cat_ids.length ? cat_parent.append('<span data-cat_id="0">Clear All</span>') : 0;
      run_instructor_filter($(this).attr('name'), cat_ids);
    }).on('click', '.tutor-instructor-ratings i', function (e) {
      var rating = e.target.dataset.value;
      run_instructor_filter('rating_filter', rating);
    }).on('change', '#tutor-instructor-relevant-sort', function (e) {
      var short_by = e.target.value;
      run_instructor_filter('short_by', short_by);
    }).on('click', '.selected-cate-list [data-cat_id]', function () {
      var id = $(this).data('cat_id');
      var inputs = root.find('.mobile-filter-popup [type="checkbox"]');
      id ? inputs = inputs.filter('[value="' + id + '"]') : 0;
      inputs.prop('checked', false).trigger('change');
    }).on('input', '.filter-pc [name="keyword"]', function () {
      // Get values on search keyword change
      var val = $(this).val();
      time_out ? window.clearTimeout(time_out) : 0;
      time_out = window.setTimeout(function () {
        run_instructor_filter('keyword', val);
        time_out = null;
      }, 500);
    }).on('click', '[data-page_number]', function (e) {
      // On pagination click
      e.preventDefault();
      run_instructor_filter(null, null, $(this).data('page_number'));
    }).on('click', '.clear-instructor-filter', function () {
      // Clear filter
      var root = $(this).closest('.tutor-instructor-filter');
      root.find('input[type="checkbox"]').prop('checked', false);
      root.find('[name="keyword"]').val('');
      var stars = document.querySelectorAll('.tutor-instructor-ratings i'); //remove star selection

      var _iterator = _createForOfIteratorHelper(stars),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var star = _step.value;

          if (star.classList.contains('active')) {
            star.classList.remove('active');
          }

          if (star.classList.contains('tutor-icon-star-full-filled')) {
            star.classList.remove('tutor-icon-star-full-filled');
            star.classList.add('tutor-icon-star-line-filled');
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      rating_range.innerHTML = "";
      run_instructor_filter();
    }).on('click', '.mobile-filter-container i', function () {
      // Open mobile screen filter
      $(this).parent().next().addClass('is-opened');
    }).on('click', '.mobile-filter-popup button', function () {
      $('.mobile-filter-popup [type="checkbox"]').trigger('change'); // Close mobile screen filter

      $(this).closest('.mobile-filter-popup').removeClass('is-opened');
    }).on('input', '.filter-mobile [name="keyword"]', function () {
      // Sync keyword with two screen
      root.find('.filter-pc [name="keyword"]').val($(this).val()).trigger('input');
    }).on('change', '.mobile-filter-popup [type="checkbox"]', function (e) {
      if (e.originalEvent) {
        return;
      } // Sync category with two screen


      var name = $(this).attr('name');
      var val = $(this).val();
      var checked = $(this).prop('checked');
      root.find('.course-category-filter [name="' + name + '"]').filter('[value="' + val + '"]').prop('checked', checked).trigger('change');
    }).on('mousedown touchstart', '.expand-instructor-filter', function (e) {
      var window_height = $(window).height();
      var el = root.find('.mobile-filter-popup>div');
      var el_top = window_height - el.height();
      var plus = ((e.originalEvent.touches || [])[0] || e).clientY - el_top;
      root.on('mousemove touchmove', function (e) {
        var y = ((e.originalEvent.touches || [])[0] || e).clientY;
        var height = window_height - y + plus;
        height > 200 && height <= window_height ? el.css('height', height + 'px') : 0;
      });
    }).on('mouseup touchend', function () {
      root.off('mousemove touchmove');
    }).on('click', '.mobile-filter-popup>div', function (e) {
      e.stopImmediatePropagation();
    }).on('click', '.mobile-filter-popup', function (e) {
      $(this).removeClass('is-opened');
    }).on('click', '.tutor-instructor-category-show-more > .text-medium-caption', function (e) {
      //show more @since v2.0.0
      var term_id = e.target.parentNode.dataset.id;
      console.log(e.target.tagName);
      console.log(term_id);
      $.ajax({
        url: window._tutorobject.ajaxurl,
        type: 'POST',
        data: {
          action: 'show_more',
          term_id: term_id
        },
        beforeSend: function beforeSend() {
          $('.tutor-show-more-loading').html("<img src='".concat(window._tutorobject.loading_icon_url, "'>"));
        },
        success: function success(response) {
          console.log(response);

          if (response.success && response.data.categories.length) {
            $('.tutor-instructor-category-show-more').css('display', 'block');

            var _iterator2 = _createForOfIteratorHelper(response.data.categories),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var res = _step2.value;
                var wrapper = $('.tutor-instructor-categories-wrapper .course-category-filter');
                $('.tutor-instructor-category-show-more .text-medium-caption').attr('data-id', res.term_id);
                wrapper.append("<div class=\"tutor-form-check tutor-mb-6\">\n                                    <input\n                                        id=\"item-a\"\n                                        type=\"checkbox\"\n                                        class=\"tutor-form-check-input tutor-form-check-square\"\n                                        name=\"category\"\n                                        value=\"".concat(res.term_id, "\"/>\n                                    <label for=\"item-a\">\n                                        ").concat(res.name, "\n                                    </label>\n                                </div>\n                                "));
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }

          if (false === response.data.show_more) {
            $('.tutor-instructor-category-show-more').css('display', 'none');

            if (document.querySelector('.course-category-filter').classList.contains('tutor-show-more-blur')) {
              document.querySelector('.course-category-filter').classList.remove('tutor-show-more-blur');
            }
          }
        },
        complete: function complete() {
          $('.tutor-show-more-loading').html("");
        },
        error: function error(err) {
          alert(err);
        }
      });
    });
  });
  /**
   * Show start active as per click
   *
   * @since v2.0.0
   */

  var stars = document.querySelectorAll('.tutor-instructor-ratings i');
  var rating_range = document.querySelector('.tutor-instructor-rating-filter');

  var _iterator3 = _createForOfIteratorHelper(stars),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var star = _step3.value;

      star.onclick = function (e) {
        //remove active if has
        var _iterator4 = _createForOfIteratorHelper(stars),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _star = _step4.value;

            if (_star.classList.contains('active')) {
              _star.classList.remove('active');
            }

            if (_star.classList.contains('tutor-icon-star-full-filled')) {
              _star.classList.remove('tutor-icon-star-full-filled');

              _star.classList.add('tutor-icon-star-line-filled');
            }
          } //show stars active as click

        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        var length = e.target.dataset.value;

        for (var i = 0; i < length; i++) {
          stars[i].classList.add('active');
          stars[i].classList.remove('tutor-icon-star-line-filled');
          stars[i].classList.add('tutor-icon-star-full-filled');
        }

        rating_range.innerHTML = "0.0 - ".concat(length, ".0");
      };
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
});

/***/ }),

/***/ "./assets/react/helper/response.js":
/*!*****************************************!*\
  !*** ./assets/react/helper/response.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get_response_message": () => (/* binding */ get_response_message)
/* harmony export */ });
var get_response_message = function get_response_message(response, def_message) {
  var __ = wp.i18n.__;

  var _ref = response || {},
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data;

  var _data$message = data.message,
      message = _data$message === void 0 ? def_message || __('Something Went Wrong!', 'tutor') : _data$message;
  return message;
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************************!*\
  !*** ./assets/react/front/tutor-front.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_dashboard_segments_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../admin-dashboard/segments/lib */ "./assets/react/admin-dashboard/segments/lib.js");
/* harmony import */ var _admin_dashboard_segments_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admin_dashboard_segments_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _course_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./course/index */ "./assets/react/front/course/index.js");
/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard */ "./assets/react/front/dashboard.js");
/* harmony import */ var _dashboard_export_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/export-csv */ "./assets/react/front/dashboard/export-csv.js");
/* harmony import */ var _dashboard_export_csv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dashboard_export_csv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pages_course_landing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/course-landing */ "./assets/react/front/pages/course-landing.js");
/* harmony import */ var _pages_course_landing__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_pages_course_landing__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pages_instructor_list_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/instructor-list-filter */ "./assets/react/front/pages/instructor-list-filter.js");
/* harmony import */ var _pages_instructor_list_filter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_pages_instructor_list_filter__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _select_dd_search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_select_dd_search */ "./assets/react/front/_select_dd_search.js");
/* harmony import */ var _select_dd_search__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_select_dd_search__WEBPACK_IMPORTED_MODULE_6__);







/**
 * Codes from this file should be decentralized according to relavent file/folder structure.
 * It's a legacy file.
 */

readyState_complete(function () {
  Object.entries(document.getElementsByTagName('a')).forEach(function (item) {
    var urlString = item[1].getAttribute('href');

    if (urlString !== null && urlString !== void 0 && urlString.includes('/logout') || urlString !== null && urlString !== void 0 && urlString.includes('logout')) {
      item[1].setAttribute('data-no-instant', '');
    }
  });
});
jQuery(document).ready(function ($) {
  'use strict';
  /**
   * wp.i18n translateable functions
   * @since 1.9.0
   */

  var _this = this;

  var _wp$i18n = wp.i18n,
      __ = _wp$i18n.__,
      _x = _wp$i18n._x,
      _n = _wp$i18n._n,
      _nx = _wp$i18n._nx;
  /**
   * Initiate Select2
   * @since v.1.3.4
   */

  if (jQuery().select2) {
    $('.tutor_select2').select2({
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      }
    });
  } //END: select2

  /*!
   * jQuery UI Touch Punch 0.2.3
   *
   * Copyright 2011–2014, Dave Furfero
   * Dual licensed under the MIT or GPL Version 2 licenses.
   *
   * Depends:
   *  jquery.ui.widget.js
   *  jquery.ui.mouse.js
   */


  !function (a) {
    function f(a, b) {
      if (!(a.originalEvent.touches.length > 1)) {
        a.preventDefault();
        var c = a.originalEvent.changedTouches[0],
            d = document.createEvent('MouseEvents');
        d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d);
      }
    }

    if (a.support.touch = 'ontouchend' in document, a.support.touch) {
      var e,
          b = a.ui.mouse.prototype,
          c = b._mouseInit,
          d = b._mouseDestroy;
      b._touchStart = function (a) {
        var b = this;
        !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, 'mouseover'), f(a, 'mousemove'), f(a, 'mousedown'));
      }, b._touchMove = function (a) {
        e && (this._touchMoved = !0, f(a, 'mousemove'));
      }, b._touchEnd = function (a) {
        e && (f(a, 'mouseup'), f(a, 'mouseout'), this._touchMoved || f(a, 'click'), e = !1);
      }, b._mouseInit = function () {
        var b = this;
        b.element.bind({
          touchstart: a.proxy(b, '_touchStart'),
          touchmove: a.proxy(b, '_touchMove'),
          touchend: a.proxy(b, '_touchEnd')
        }), c.call(b);
      }, b._mouseDestroy = function () {
        var b = this;
        b.element.unbind({
          touchstart: a.proxy(b, '_touchStart'),
          touchmove: a.proxy(b, '_touchMove'),
          touchend: a.proxy(b, '_touchEnd')
        }), d.call(b);
      };
    }
  }(jQuery);
  /**
   * END jQuery UI Touch Punch
   */

  var videoPlayer = {
    ajaxurl: window._tutorobject.ajaxurl,
    nonce_key: window._tutorobject.nonce_key,
    video_data: function video_data() {
      var video_track_data = $('#tutor_video_tracking_information').val();
      return video_track_data ? JSON.parse(video_track_data) : {};
    },
    track_player: function track_player() {
      var that = this;

      if (typeof Plyr !== 'undefined') {
        var player = new Plyr(this.player_DOM);
        var video_data = that.video_data();
        player.on('ready', function (event) {
          var instance = event.detail.plyr;

          var _ref = video_data || {},
              _ref$best_watch_time = _ref.best_watch_time,
              best_watch_time = _ref$best_watch_time === void 0 ? 0 : _ref$best_watch_time;

          if (best_watch_time > 0 && instance.duration > Math.round(best_watch_time)) {
            instance.media.currentTime = best_watch_time;
          }

          that.sync_time(instance);
        });
        var tempTimeNow = 0;
        var intervalSeconds = 30; //Send to tutor backend about video playing time in this interval

        player.on('timeupdate', function (event) {
          var instance = event.detail.plyr;
          var tempTimeNowInSec = tempTimeNow / 4; //timeupdate firing 250ms interval

          if (tempTimeNowInSec >= intervalSeconds) {
            that.sync_time(instance);
            tempTimeNow = 0;
          }

          tempTimeNow++;
        });
        player.on('ended', function (event) {
          var video_data = that.video_data();
          var instance = event.detail.plyr;
          var data = {
            is_ended: true
          };
          that.sync_time(instance, data);

          if (video_data.autoload_next_course_content) {
            that.autoload_content();
          }
        });
      }
    },
    sync_time: function sync_time(instance, options) {
      var post_id = this.video_data().post_id; //TUTOR is sending about video playback information to server.

      var data = {
        action: 'sync_video_playback',
        currentTime: instance.currentTime,
        duration: instance.duration,
        post_id: post_id
      };
      data[this.nonce_key] = _tutorobject[this.nonce_key];
      var data_send = data;

      if (options) {
        data_send = Object.assign(data, options);
      }

      $.post(this.ajaxurl, data_send);
    },
    autoload_content: function autoload_content() {
      var post_id = this.video_data().post_id;
      var data = {
        action: 'autoload_next_course_content',
        post_id: post_id
      };
      data[this.nonce_key] = _tutorobject[this.nonce_key];
      $.post(this.ajaxurl, data).done(function (response) {
        if (response.success && response.data.next_url) {
          location.href = response.data.next_url;
        }
      });
    },
    init: function init(element) {
      this.player_DOM = element;
      this.track_player();
    }
  };
  /**
   * Fire TUTOR video
   * @since v.1.0.0
   */

  $('.tutorPlayer').each(function () {
    videoPlayer.init(this);
  });
  $(document).on('change keyup paste', '.tutor_user_name', function () {
    $(this).val(tutor_slugify($(this).val()));
  });

  function tutor_slugify(text) {
    return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  }

  $(document).on('click', '.tutor_question_cancel', function (e) {
    e.preventDefault();
    $('.tutor-add-question-wrap').toggle();
  }); // Quiz Review : Tooltip

  $('.tooltip-btn').on('hover', function (e) {
    $(this).toggleClass('active');
  }); // tutor course content accordion

  /**
   * Toggle topic summery
   * @since v.1.6.9
   */

  $('.tutor-course-title h4 .toggle-information-icon').on('click', function (e) {
    $(this).closest('.tutor-topics-in-single-lesson').find('.tutor-topics-summery').slideToggle();
    e.stopPropagation();
  });
  $('.tutor-course-topic.tutor-active').find('.tutor-course-lessons').slideDown();
  $('.tutor-course-title').on('click', function () {
    var lesson = $(this).siblings('.tutor-course-lessons');
    $(this).closest('.tutor-course-topic').toggleClass('tutor-active');
    lesson.slideToggle();
  });
  $(document).on('click', '.tutor-topics-title h3 .toggle-information-icon', function (e) {
    $(this).closest('.tutor-topics-in-single-lesson').find('.tutor-topics-summery').slideToggle();
    e.stopPropagation();
  });
  /**
   * Check if lesson has classic editor support
   * If classic editor support, stop ajax load on the lesson page.
   *
   * @since v.1.0.0
   *
   * @updated v.1.4.0
   */

  /* if (!_tutorobject.enable_lesson_classic_editor) {
  	$(document).on('click', '.tutor-single-lesson-a', function(e) {
  		e.preventDefault();
  			var $that = $(this);
  		var lesson_id = $that.attr('data-lesson-id');
  		var $wrap = $('#tutor-single-entry-content');
  			$.ajax({
  			url: _tutorobject.ajaxurl,
  			type: 'POST',
  			data: { lesson_id: lesson_id, action: 'tutor_render_lesson_content' },
  			beforeSend: function() {
  				var page_title = $that.find('.lesson_title').text();
  				$('head title').text(page_title);
  				window.history.pushState('obj', page_title, $that.attr('href'));
  				$wrap.addClass('loading-lesson');
  				$('.tutor-single-lesson-items').removeClass('active');
  				$that.closest('.tutor-single-lesson-items').addClass('active');
  			},
  			success: function(data) {
  				$wrap.html(data.data.html);
  				videoPlayer.init();
  				$('.tutor-lesson-sidebar').css('display', '');
  				window.dispatchEvent(new window.Event('tutor_ajax_lesson_loaded')); // Some plugins like h5p needs notification on ajax load
  			},
  			complete: function() {
  				$wrap.removeClass('loading-lesson');
  			},
  		});
  	});
  		$(document).on('click', '.sidebar-single-quiz-a', function(e) {
  		e.preventDefault();
  			var $that = $(this);
  		var quiz_id = $that.attr('data-quiz-id');
  		var page_title = $that.find('.lesson_title').text();
  		var $wrap = $('#tutor-single-entry-content');
  			$.ajax({
  			url: _tutorobject.ajaxurl,
  			type: 'POST',
  			data: { quiz_id: quiz_id, action: 'tutor_render_quiz_content' },
  			beforeSend: function() {
  				$('head title').text(page_title);
  				window.history.pushState('obj', page_title, $that.attr('href'));
  				$wrap.addClass('loading-lesson');
  				$('.tutor-single-lesson-items').removeClass('active');
  				$that.closest('.tutor-single-lesson-items').addClass('active');
  			},
  			success: function(data) {
  				$wrap.html(data.data.html);
  				$('.tutor-lesson-sidebar').css('display', '');
  			},
  			complete: function() {
  				$wrap.removeClass('loading-lesson');
  			},
  		});
  	});
  } */

  /**
   * @date 05 Feb, 2019
   */

  $(document).on('click', '.tutor-lesson-sidebar-hide-bar', function (e) {
    e.preventDefault();
    $('.tutor-lesson-sidebar').toggle();
    $('#tutor-single-entry-content').toggleClass('sidebar-hidden');
  });
  $('.tutor-tabs-btn-group a').on('click touchstart', function (e) {
    e.preventDefault();
    var $that = $(this);
    var tabSelector = $that.attr('href');
    $('.tutor-lesson-sidebar-tab-item').hide();
    $(tabSelector).show();
    $('.tutor-tabs-btn-group a').removeClass('active');
    $that.addClass('active');
  });
  /**
   *
   * @type {jQuery}
   *
   * Improved Quiz draggable answers drop accessibility
   * Answers draggable wrap will be now same height.
   *
   * @since v.1.4.4
   */

  var countDraggableAnswers = $('.quiz-draggable-rand-answers').length;

  if (countDraggableAnswers) {
    $('.quiz-draggable-rand-answers').each(function () {
      var $that = $(this);
      var draggableDivHeight = $that.height();
      $that.css({
        height: draggableDivHeight
      });
    });
  }
  /**
   * Datepicker initiate
   *
   * @since v.1.1.2
   */


  if (jQuery.datepicker) {
    $('.tutor_report_datepicker').datepicker({
      dateFormat: 'yy-mm-dd'
    });
  }
  /**
   * Setting account for withdraw earning
   *
   * @since v.1.2.0
   */


  $(document).on('submit', '#tutor-withdraw-account-set-form', function (e) {
    if (!e.detail || e.detail == 1) {
      e.preventDefault();
      var $form = $(this);
      var $btn = $form.find('.tutor_set_withdraw_account_btn');
      var data = $form.serializeObject();
      $btn.prop("disabled", true);
      $.ajax({
        url: _tutorobject.ajaxurl,
        type: 'POST',
        data: data,
        beforeSend: function beforeSend() {
          $btn.addClass('tutor-updating-message');
        },
        success: function success(data) {
          if (data.success) {
            tutor_toast('Success!', data.data.msg, 'success');
          }
        },
        complete: function complete() {
          $btn.removeClass('tutor-updating-message');
          setTimeout(function () {
            $btn.prop("disabled", false);
          }, 2000);
        }
      });
    }
  });
  /**
   * Make Withdraw Form
   *
   * @since v.1.2.0
   */

  $(document).on('click', '.open-withdraw-form-btn, .close-withdraw-form-btn', function (e) {
    e.preventDefault();

    if ($(this).data('reload') == 'yes') {
      window.location.reload();
      return;
    }

    $('.tutor-earning-withdraw-form-wrap').toggle().find('[name="tutor_withdraw_amount"]').val('');
    $('.tutor-withdrawal-pop-up-success').hide().next().show();
    $('html, body').css('overflow', $('.tutor-earning-withdraw-form-wrap').is(':visible') ? 'hidden' : 'auto');
  });
  $(document).on('submit', '#tutor-earning-withdraw-form', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $('#tutor-earning-withdraw-btn');
    var $responseDiv = $('.tutor-withdraw-form-response');
    var data = $form.serializeObject();
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        $form.find('.tutor-success-msg').remove();
        $btn.addClass('tutor-updating-message');
      },
      success: function success(data) {
        var Msg;
        $('.tutor-earning-withdraw-form-wrap').hide();

        if (data.success) {
          if (data.data.available_balance !== 'undefined') {
            $('.withdraw-balance-col .available_balance').html(data.data.available_balance);
          }

          tutor_toast(__('Request Successful', 'tutor'), __('Your request has been submitted. Please wait for the administrator’s response.', 'tutor'), 'success');
          setTimeout(function () {
            location.reload();
          }, 500);
        } else {
          tutor_toast('Error', data.data.msg, 'error');
          Msg = '<div class="tutor-error-msg inline-image-text is-inline-block">\
                            <img src="' + window._tutorobject.tutor_url + 'assets/images/icon-cross.svg"/> \
                            <div>\
                                <b>Error</b><br/>\
                                <span>' + data.data.msg + '</span>\
                            </div>\
                        </div>'; // $responseDiv.html(Msg);

          setTimeout(function () {
            $responseDiv.html('');
          }, 5000);
          return false;
        }
      },
      complete: function complete() {
        $btn.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Delete Course
   */

  $(document).on('click', '.tutor-dashboard-element-delete-btn', function (e) {
    e.preventDefault();
    var element_id = $(this).attr('data-id');
    $('#tutor-dashboard-delete-element-id').val(element_id);
  });
  $(document).on('submit', '#tutor-dashboard-delete-element-form', function (e) {
    e.preventDefault();
    var element_id = $('#tutor-dashboard-delete-element-id').val();
    var $btn = $('.tutor-modal-element-delete-btn');
    var data = $(this).serializeObject();
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        $btn.addClass('tutor-updating-message');
      },
      success: function success(res) {
        if (res.success) {
          $('#tutor-dashboard-' + res.data.element + '-' + element_id).remove();
        }
      },
      complete: function complete() {
        $btn.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Assignment
   *
   * @since v.1.3.3
   */

  $(document).on('submit', '#tutor_assignment_start_form', function (e) {
    e.preventDefault();
    var $that = $(this);
    var form_data = $that.serializeObject();
    form_data.action = 'tutor_start_assignment';
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: 'POST',
      data: form_data,
      beforeSend: function beforeSend() {
        $('#tutor_assignment_start_btn').addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          location.reload();
        }
      },
      complete: function complete() {
        $('#tutor_assignment_start_btn').removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Assignment answer validation
   */

  $(document).on('submit', '#tutor_assignment_submit_form', function (e) {
    var assignment_answer = tinymce.activeEditor.getContent();

    if (assignment_answer.trim().length < 1) {
      e.preventDefault();
      tutor_toast(__('Warning', 'tutor'), __('Assignment answer is required.', 'tutor'), 'error');
    }
  });
  /**
   * Single Assignment Upload Button
   * @since v.1.3.4
   */

  $('form').on('change', '.tutor-assignment-file-upload', function () {
    $(this).siblings('label').find('span').html($(this).val().replace(/.*(\/|\\)/, ''));
  });
  /**
   * Lesson Sidebar Topic Toggle
   * @since v.1.3.4
   */

  $(document).on('click', '.tutor-topics-in-single-lesson .tutor-topics-title, .tutor-single-lesson-topic-toggle', function (e) {
    var $that = $(this);
    var $parent = $that.closest('.tutor-topics-in-single-lesson');
    $parent.toggleClass('tutor-topic-active');
    $parent.find('.tutor-lessons-under-topic').slideToggle();
  });
  $('.tutor-single-lesson-items.active').closest('.tutor-lessons-under-topic').show();
  $('.tutor-single-lesson-items.active').closest('.tutor-topics-in-single-lesson').addClass('tutor-topic-active');
  $('.tutor-course-lesson.active').closest('.tutor-lessons-under-topic').show();
  /**
   *
   * @type {jQuery}
   *
   * Course builder auto draft save
   *
   * @since v.1.3.4
   */

  var tutor_course_builder = $('input[name="tutor_action"]').val();

  if (tutor_course_builder === 'tutor_add_course_builder') {
    setInterval(auto_draft_save_course_builder, 30000);
  }

  function auto_draft_save_course_builder() {
    var form_data = $('form#tutor-frontend-course-builder').serializeObject();
    form_data.tutor_ajax_action = 'tutor_course_builder_draft_save';
    $.ajax({
      //url : _tutorobject.ajaxurl,
      type: 'POST',
      data: form_data,
      beforeSend: function beforeSend() {
        $('.tutor-dashboard-builder-draft-btn span').text(__('Saving...', 'tutor'));
      },
      success: function success(data) {},
      complete: function complete() {
        $('.tutor-dashboard-builder-draft-btn span').text(__('Save', 'tutor'));
      }
    });
  }
  /**
   *
   * @type {jQuery}
   *
   * Course builder section toggle
   *
   * @since v.1.3.5
   */


  $('.tutor-course-builder-section-title').on('click', function () {
    if ($(this).find('i').hasClass('tutor-icon-angle-up-filled')) {
      $(this).find('i').removeClass('tutor-icon-angle-up-filled').addClass('tutor-icon-angle-down-filled');
    } else {
      $(this).find('i').removeClass('tutor-icon-angle-down-filled').addClass('tutor-icon-angle-up-filled');
    }

    $(this).next('div').slideToggle();
  });
  /**
   * Profile photo upload
   * @since v.1.4.5
   */

  $(document).on('click', '#tutor_profile_photo_button', function (e) {
    e.preventDefault();
    $('#tutor_profile_photo_file').trigger('click');
  });
  $(document).on('change', '#tutor_profile_photo_file', function (event) {
    event.preventDefault();
    var $file = this;

    if ($file.files && $file.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.tutor-profile-photo-upload-wrap').find('img').attr('src', e.target.result);
      };

      reader.readAsDataURL($file.files[0]);
    }
  });
  /**
   * Addon, Tutor BuddyPress
   * Retrieve MetaInformation on BuddyPress message system
   * @for TutorLMS Pro
   * @since v.1.4.8
   */

  $(document).on('click', '.thread-content .subject', function (e) {
    var $btn = $(this);
    var thread_id = parseInt($btn.closest('.thread-content').attr('data-thread-id'));
    var nonce_key = _tutorobject.nonce_key;
    var json_data = {
      thread_id: thread_id,
      action: 'tutor_bp_retrieve_user_records_for_thread'
    };
    json_data[nonce_key] = _tutorobject[nonce_key];
    $.ajax({
      type: 'POST',
      url: window._tutorobject.ajaxurl,
      data: json_data,
      beforeSend: function beforeSend() {
        $('#tutor-bp-thread-wrap').html('');
      },
      success: function success(data) {
        if (data.success) {
          $('#tutor-bp-thread-wrap').html(data.data.thread_head_html);
          tutor_bp_setting_enrolled_courses_list();
        }
      }
    });
  });

  function tutor_bp_setting_enrolled_courses_list() {
    $('ul.tutor-bp-enrolled-course-list').each(function () {
      var $that = $(this);
      var $li = $that.find(' > li');
      var itemShow = 3;

      if ($li.length > itemShow) {
        var plusCourseCount = $li.length - itemShow;
        $li.each(function (liIndex, liItem) {
          var $liItem = $(this);

          if (liIndex >= itemShow) {
            $liItem.hide();
          }
        });
        var infoHtml = '<a href="javascript:;" class="tutor_bp_plus_courses"><strong>+' + plusCourseCount + ' More </strong></a> Courses';
        $that.closest('.tutor-bp-enrolled-courses-wrap').find('.thread-participant-enrolled-info').html(infoHtml);
      }

      $that.show();
    });
  }

  tutor_bp_setting_enrolled_courses_list();
  $(document).on('click', 'a.tutor_bp_plus_courses', function (e) {
    e.preventDefault();
    var $btn = $(this);
    $btn.closest('.tutor-bp-enrolled-courses-wrap').find('.tutor-bp-enrolled-course-list li').show();
    $btn.closest('.thread-participant-enrolled-info').html('');
  });
  /**
   * Addon, Tutor Certificate
   * Certificate dropdown content and copy link
   * @for TutorLMS Pro
   * @since v.1.5.1
   */
  //$(document).on('click', '.tutor-dropbtn', function (e) {

  $('.tutor-dropbtn').click(function () {
    var $content = $(this).parent().find('.tutor-dropdown-content');
    $content.slideToggle(100);
  });
  $(document).on('click', function (e) {
    var container = $('.tutor-dropdown');
    var $content = container.find('.tutor-dropdown-content'); // if the target of the click isn't the container nor a descendant of the container

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $content.slideUp(100);
    }
  });
  /**
   * Show hide is course public checkbox (frontend dashboard editor)
   *
   * @since  v.1.7.2
   */

  var price_type = $('.tutor-frontend-builder-course-price [name="tutor_course_price_type"]');

  if (price_type.length == 0) {
    $('#_tutor_is_course_public_meta_checkbox').show();
  } else {
    price_type.change(function () {
      if ($(this).prop('checked')) {
        var method = $(this).val() == 'paid' ? 'hide' : 'show';
        $('#_tutor_is_course_public_meta_checkbox')[method]();
      }
    }).trigger('change');
  }
  /**
   * Withdrawal page tooltip
   *
   * @since  v.1.7.4
   */
  // Fully accessible tooltip jQuery plugin with delegation.
  // Ideal for view containers that may re-render content.


  (function ($) {
    $.fn.tutor_tooltip = function () {
      this // Delegate to tooltip, Hide if tooltip receives mouse or is clicked (tooltip may stick if parent has focus)
      .on('mouseenter click', '.tooltip', function (e) {
        e.stopPropagation();
        $(this).removeClass('isVisible');
      }) // Delegate to parent of tooltip, Show tooltip if parent receives mouse or focus
      .on('mouseenter focus', ':has(>.tooltip)', function (e) {
        if (!$(this).prop('disabled')) {
          // IE 8 fix to prevent tooltip on `disabled` elements
          $(this).find('.tooltip').addClass('isVisible');
        }
      }) // Delegate to parent of tooltip, Hide tooltip if parent loses mouse or focus
      .on('mouseleave blur keydown', ':has(>.tooltip)', function (e) {
        if (e.type === 'keydown') {
          if (e.which === 27) {
            $(this).find('.tooltip').removeClass('isVisible');
          }
        } else {
          $(this).find('.tooltip').removeClass('isVisible');
        }
      });
      return this;
    };
  })(jQuery); // Bind event listener to container element


  jQuery('.tutor-tooltip-inside').tutor_tooltip();
  /**
   * Manage course filter
   *
   * @since  v.1.7.2
   */

  var filter_container = $('.tutor-course-filter-container form');
  var loop_container = $('.tutor-course-filter-loop-container');
  var column_per_row = $('.course_template_shortcode').data('column_per_row');
  var course_per_page = $('.course_template_shortcode').data('course_per_page');
  var page_shortcode = $('.course_template_shortcode').data('page_shortcode');
  var filter_modifier = {}; // Sidebar checkbox value change

  filter_container.on('submit', function (e) {
    e.preventDefault();
    console.log('submitted');
  }).find('input').change(function (e) {
    ajaxFilterArchive(e);
  });

  var ajaxFilterArchive = function ajaxFilterArchive() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var filter_criteria = Object.assign(filter_container.serializeObject(), filter_modifier);
    filter_criteria.page = page;
    filter_criteria.page_shortcode = page_shortcode;
    filter_criteria.column_per_row = column_per_row;
    filter_criteria.course_per_page = course_per_page;
    filter_criteria.action = 'tutor_course_filter_ajax';
    loop_container.html('<div class="loading-spinner"></div>');
    $(_this).closest('form').find('.tutor-clear-all-filter').show();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: filter_criteria,
      success: function success(r) {
        loop_container.html(r).find('.tutor-pagination-wrap a').each(function () {
          $(this).attr('data-href', $(this).attr('href')).attr('href', '#');
        });
      },
      complete: function complete(c) {
        selectSearchField('[name=tutor_course_filter]');
        $('.course-archive-page .page-numbers').on('click', function (pe) {
          pe.preventDefault();
          ajaxFilterArchive(pe, $(this).data('pagenumber'));
        });
      }
    });
  };

  if (loop_container.length > 0) {
    ajaxFilterArchive();
  } // Alter pagination


  loop_container.on('click', '.tutor-pagination-wrap a', function (e) {
    var url = $(this).data('href') || $(this).attr('href');

    if (url) {
      url = new URL(url);
      var page = url.searchParams.get('paged');

      if (page) {
        e.preventDefault();
        filter_modifier.page = page;
        filter_container.find('input:first').trigger('change');
      }
    }
  }); // Alter sort filter

  loop_container.on('change', 'select[name="tutor_course_filter"]', function () {
    filter_modifier.tutor_course_filter = $(this).val();
    filter_container.find('input:first').trigger('change');
  }); // Refresh page after coming back to course archive page from cart

  var archive_loop = $('.tutor-course-loop');

  if (archive_loop.length > 0) {
    window.sessionStorage.getItem('tutor_refresh_archive') === 'yes' ? window.location.reload() : 0;
    window.sessionStorage.removeItem('tutor_refresh_archive');
    archive_loop.on('click', '.tutor-loop-cart-btn-wrap', function () {
      window.sessionStorage.setItem('tutor_refresh_archive', 'yes');
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=tutor-front.js.map