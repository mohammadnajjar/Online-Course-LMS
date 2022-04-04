/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/react/course-builder/assignment.js":
/*!***************************************************!*\
  !*** ./assets/react/course-builder/assignment.js ***!
  \***************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var _wp$i18n = wp.i18n,
      __ = _wp$i18n.__,
      _x = _wp$i18n._x,
      _n = _wp$i18n._n,
      _nx = _wp$i18n._nx; // Create/edit assignment opener

  $(document).on('click', '.open-tutor-assignment-modal, .tutor-create-assignments-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var assignment_id = $that.hasClass('tutor-create-assignments-btn') ? 0 : $that.attr('data-assignment-id');
    var topic_id = $that.closest('.tutor-topics-wrap').data('topic-id');
    var course_id = $('#post_ID').val();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        assignment_id: assignment_id,
        topic_id: topic_id,
        course_id: course_id,
        action: 'tutor_load_assignments_builder_modal'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        $('.tutor-assignment-modal-wrap .modal-container').html(data.data.output);
        $('.tutor-assignment-modal-wrap').addClass('tutor-is-active');
        tinymce.init(tinyMCEPreInit.mceInit.tutor_assignment_editor_config);
        tinymce.execCommand('mceRemoveEditor', false, 'tutor_assignments_modal_editor');
        tinyMCE.execCommand('mceAddEditor', false, "tutor_assignments_modal_editor");
        window.dispatchEvent(new Event(_tutorobject.content_change_event));
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
        quicktags({
          id: "tutor_assignments_modal_editor"
        });
      }
    });
  });
  /**
   * Update Assignment Data
   */

  $(document).on('click', '.update_assignment_modal_btn', function (event) {
    event.preventDefault();
    var $that = $(this);
    var content;
    var inputid = 'tutor_assignments_modal_editor';
    var editor = tinyMCE.get(inputid);

    if (editor) {
      content = editor.getContent();
    } else {
      content = $('#' + inputid).val();
    }

    var form_data = $(this).closest('.tutor-modal').find('form.tutor_assignment_modal_form').serializeObject();
    form_data.assignment_content = content;
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: form_data,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          $('#tutor-course-content-wrap').html(data.data.course_contents);
          enable_sorting_topic_lesson(); //Close the modal

          $('.tutor-assignment-modal-wrap').removeClass('tutor-is-active');
          tutor_toast(__('Success', 'tutor'), __('Assignment Updated', 'tutor'), 'success');
        }
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/course-builder/attachment.js":
/*!***************************************************!*\
  !*** ./assets/react/course-builder/attachment.js ***!
  \***************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var _wp$i18n = wp.i18n,
      __ = _wp$i18n.__,
      _x = _wp$i18n._x,
      _n = _wp$i18n._n,
      _nx = _wp$i18n._nx;
  $(document).on('click', '.tutor-attachment-cards:not(.tutor-no-control) .tutor-delete-attachment', function (e) {
    e.preventDefault();
    $(this).closest('[data-attachment_id]').remove();
  });
  $(document).on('click', '.tutorUploadAttachmentBtn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var name = $that.data('name');
    var card_wrapper = $that.parent().find('.tutor-attachment-cards');
    var size_placement_below = !card_wrapper.hasClass('tutor-attachment-size-aside');
    var frame; // If the media frame already exists, reopen it.

    if (frame) {
      frame.open();
      return;
    } // Create a new media frame


    frame = wp.media({
      title: __('Select or Upload Media Of Your Choice', 'tutor'),
      button: {
        text: __('Upload media', 'tutor')
      },
      multiple: true // Set to true to allow multiple files to be selected

    }); // When an image is selected in the media frame...

    frame.on('select', function () {
      // Get media attachment details from the frame state
      var attachments = frame.state().get('selection').toJSON();

      if (attachments.length) {
        for (var i = 0; i < attachments.length; i++) {
          var attachment = attachments[i];
          var size_info = "<span class=\"filesize\">\n                                ".concat(__('Size', 'tutor'), ": ").concat(attachment.filesizeHumanReadable, "\n                            </span>");
          var inputHtml = "<div data-attachment_id=\"".concat(attachment.id, "\">\n                        <div>\n                            <a href=\"").concat(attachment.url, "\" target=\"_blank\">\n                                ").concat(attachment.filename, "\n                            </a>\n                            ").concat(size_placement_below ? size_info : '', "\n                            <input type=\"hidden\" name=\"").concat(name, "\" value=\"").concat(attachment.id, "\">\n                        </div>\n                        <div>\n                            ").concat(!size_placement_below ? size_info : '', "\n                            <span class=\"tutor-delete-attachment tutor-action-icon tutor-icon-line-cross-line tutor-icon-18\"></span>\n                        </div>\n                    </div>");
          $that.parent().find('.tutor-attachment-cards').append(inputHtml);
        }
      }
    }); // Finally, open the modal on click

    frame.open();
  });
});

/***/ }),

/***/ "./assets/react/course-builder/content-drip.js":
/*!*****************************************************!*\
  !*** ./assets/react/course-builder/content-drip.js ***!
  \*****************************************************/
/***/ (() => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.jQuery(document).ready(function ($) {
  // Update content drip data instantly on change.
  // So lesson, quiz, assignment modal can get data without pressing course update/publish
  $('#course_setting_content_drip, [name="_tutor_course_settings[content_drip_type]"]').change(function () {
    var _data;

    if ($(this).attr('type') == 'radio' && !$(this).prop('checked')) {
      return;
    }

    var val = $(this).attr('type') == 'checkbox' ? $(this).prop('checked') ? 1 : 0 : $(this).val();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: (_data = {}, _defineProperty(_data, $(this).attr('name'), val), _defineProperty(_data, "course_id", $('#post_ID').val()), _defineProperty(_data, "action", 'tutor_content_drip_state_update'), _data)
    });
  });
});

/***/ }),

/***/ "./assets/react/course-builder/instructor-multi.js":
/*!*********************************************************!*\
  !*** ./assets/react/course-builder/instructor-multi.js ***!
  \*********************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__;
  var search_container = $('#tutor_course_instructor_modal .tutor-search-result');
  var shortlist_container = $('#tutor_course_instructor_modal .tutor-selected-result');
  var course_id = $('#tutor_course_instructor_modal').data('course_id');
  var search_timeout;

  var search_method = function search_method(user_id, callback) {
    var ajax_call = function ajax_call() {
      search_timeout = undefined;
      var input = $('#tutor_course_instructor_modal input[type="text"]');
      var search_terms = (input.val() || '').trim(); // Clear result if no keyword

      if (!search_terms) {
        search_container.empty();
        return;
      }

      var shortlisted = [];
      shortlist_container.find('[data-instructor-id]').each(function () {
        shortlisted.push($(this).data('instructor-id'));
      });
      user_id && !isNaN(user_id) ? shortlisted.push(user_id) : 0; // Ajax request

      $.ajax({
        url: _tutorobject.ajaxurl,
        type: 'POST',
        data: {
          course_id: course_id,
          search_terms: search_terms,
          shortlisted: shortlisted,
          action: 'tutor_course_instructor_search'
        },
        beforeSend: function beforeSend() {
          if (!callback) {
            // Don't show if click on add. Then add loading icon should appear
            search_container.html('');
            search_container.addClass('tutor-updating-message'); // search_container.html('<div class="tutor-text-center"><span class="tutor-updating-message"></span></div>');
          }
        },
        success: function success(resp) {
          var _ref = resp.data || {},
              search_result = _ref.search_result,
              shortlisted = _ref.shortlisted,
              shortlisted_count = _ref.shortlisted_count;

          search_container.removeClass('tutor-updating-message');
          search_container.html(search_result);
          shortlist_container.html(shortlisted);
          var btn_disabled = shortlisted_count ? false : true;
          $('.add_instructor_to_course_btn').prop('disabled', btn_disabled);
          callback ? callback() : 0;
        }
      });
    };

    if (search_timeout) {
      clearTimeout(search_timeout);
    }

    search_timeout = setTimeout(ajax_call, 350);
  }; // Search/Click input


  $(document).on('input', '#tutor_course_instructor_modal input[type="text"]', search_method);
  $(document).on('focus', '#tutor_course_instructor_modal input[type="text"]', function () {
    search_container.show();
  }); // Shortlist on plus click

  $(document).on('click', '#tutor_course_instructor_modal .tutor-shortlist-instructor', function () {
    $(this).addClass('tutor-updating-message');
    search_method($(this).closest('[data-user_id]').data('user_id'), function () {
      search_container.hide();
    });
  }); // Remove from shortlist

  $(document).on('click', '#tutor_course_instructor_modal .tutor-selected-result .instructor-control a', function () {
    $(this).closest('.added-instructor-item').fadeOut(function () {
      $(this).remove();
    });
  }); // Add instructor to course from shortlist

  $(document).on('click', '.add_instructor_to_course_btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var course_id = $('#tutor_course_instructor_modal').data('course_id');
    var shortlisted = [];
    shortlist_container.find('[data-instructor-id]').each(function () {
      shortlisted.push($(this).data('instructor-id'));
    });
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        course_id: course_id,
        tutor_instructor_ids: shortlisted,
        action: 'tutor_add_instructors_to_course'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          // remove search content 
          search_container.empty();
          shortlist_container.empty(); // Hide the modal

          $('#tutor_course_instructor_modal').removeClass('tutor-is-active'); // Show the result in course editor

          $('.tutor-course-instructors-metabox-wrap').parent().html(data.data.output);
          $('.tutor-modal-wrap').removeClass('show');
          return;
        }

        tutor_toast('Error!', get_response_message(data), 'error');
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
  $(document).on('click', '.tutor-instructor-delete-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var course_id = $('#post_ID').val();
    var instructor_id = $that.closest('.added-instructor-item').attr('data-instructor-id');
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        course_id: course_id,
        instructor_id: instructor_id,
        action: 'detach_instructor_from_course'
      },
      beforeSend: function beforeSend() {
        return $that.addClass('tutor-updating-message');
      },
      complete: function complete() {
        return $that.removeClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          $that.closest('.added-instructor-item').remove();
          return;
        }

        tutor_toast('Error!', get_response_message(data), 'error');
      }
    });
  });
});

/***/ }),

/***/ "./assets/react/course-builder/lesson.js":
/*!***********************************************!*\
  !*** ./assets/react/course-builder/lesson.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/response */ "./assets/react/helper/response.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



(function ($) {
  window.enable_sorting_topic_lesson = function () {
    var __ = wp.i18n.__;

    if (jQuery().sortable) {
      $(".course-contents").sortable({
        handle: ".course-move-handle",
        start: function start(e, ui) {
          ui.placeholder.css('visibility', 'visible');
        },
        stop: function stop(e, ui) {
          console.log('e1', e, ui);
          tutor_sorting_topics_and_lesson();
        }
      });
      $(".tutor-lessons:not(.drop-lessons)").sortable({
        connectWith: ".tutor-lessons",
        items: "div.course-content-item",
        start: function start(e, ui) {
          ui.placeholder.css('visibility', 'visible');
        },
        stop: function stop(e, ui) {
          // Store new updated order as input value
          tutor_sorting_topics_and_lesson(); // Update parent topic id fro the dropped content

          var parent_topic_id = ui.item.closest('[data-topic-id]').attr('data-topic-id');
          var content_id = ui.item.attr('data-course_content_id');
          $.ajax({
            url: window._tutorobject.ajaxurl,
            type: 'POST',
            data: {
              parent_topic_id: parent_topic_id,
              content_id: content_id,
              action: 'tutor_update_course_content_parent'
            },
            success: function success(r) {
              if (!r.success) {
                tutor_toast(__('Error', 'tutor'), (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(r), 'error');
              }
            },
            error: function error() {}
          });
        }
      });
    }
  };

  window.tutor_sorting_topics_and_lesson = function () {
    var topics = {};
    $('.tutor-topics-wrap').each(function (index, item) {
      var $topic = $(this);
      var topics_id = parseInt($topic.attr('id').match(/\d+/)[0], 10);
      var lessons = {};
      $topic.find('.course-content-item').each(function (lessonIndex, lessonItem) {
        var $lesson = $(this);
        var lesson_id = parseInt($lesson.attr('id').match(/\d+/)[0], 10);
        lessons[lessonIndex] = lesson_id;
      });
      topics[index] = {
        'topic_id': topics_id,
        'lesson_ids': lessons
      };
    });
    $('#tutor_topics_lessons_sorting').val(JSON.stringify(topics));
  };
})(window.jQuery);

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__;
  enable_sorting_topic_lesson();
  /**
   * Open Lesson Modal
   */

  $(document).on('click', '.open-tutor-lesson-modal', function (e) {
    e.preventDefault();
    var $that = $(this);
    var lesson_id = $that.attr('data-lesson-id');
    var topic_id = $that.attr('data-topic-id');
    var course_id = $('#post_ID').val();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        lesson_id: lesson_id,
        topic_id: topic_id,
        course_id: course_id,
        action: 'tutor_load_edit_lesson_modal'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        $('.tutor-lesson-modal-wrap .modal-container').html(data.data.output);
        $('.tutor-lesson-modal-wrap').attr({
          'data-lesson-id': lesson_id,
          'data-topic-id': topic_id
        });
        $('.tutor-lesson-modal-wrap').addClass('tutor-is-active');
        var tinymceConfig = tinyMCEPreInit.mceInit.tutor_lesson_editor_config;

        if (!tinymceConfig) {
          tinymceConfig = tinyMCEPreInit.mceInit.course_description;
        }

        tinymce.init(tinymceConfig);
        tinymce.execCommand('mceRemoveEditor', false, 'tutor_lesson_modal_editor');
        tinyMCE.execCommand('mceAddEditor', false, "tutor_lesson_modal_editor");
        window.dispatchEvent(new Event(_tutorobject.content_change_event));
      },
      complete: function complete() {
        console.log('ajax completed');
        $that.removeClass('tutor-updating-message');
        quicktags({
          id: "tutor_lesson_modal_editor"
        });
      }
    });
  }); // Video source 

  $(document).on('change', '.tutor_lesson_video_source', function (e) {
    var val = $(this).val();
    $(this).nextAll().hide().filter('.video_source_wrap_' + val).show();
    $(this).prevAll().filter('[data-video_source]').attr('data-video_source', val);
  }); // Update lesson

  $(document).on('click', '.update_lesson_modal_btn', function (event) {
    event.preventDefault();
    var $that = $(this);
    var content;
    var inputid = 'tutor_lesson_modal_editor';
    var editor = tinyMCE.get(inputid);

    if (editor) {
      content = editor.getContent();
    } else {
      content = $('#' + inputid).val();
    }

    var form_data = $(this).closest('.tutor-modal').find('form').serializeObject();
    form_data.lesson_content = content;
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: form_data,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          $('#tutor-course-content-wrap').html(data.data.course_contents);
          enable_sorting_topic_lesson(); //Close the modal

          $that.closest('.tutor-modal').removeClass('tutor-is-active');
          tutor_toast(__('Success', 'tutor'), __('Lesson Updated', 'tutor'), 'success');
        }
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * @since v.1.9.0
   * Parse and show video duration on link paste in lesson video 
   */

  var video_url_input = ['.video_source_wrap_external_url input', '.video_source_wrap_vimeo input', '.video_source_wrap_youtube input', '.video_source_wrap_html5 input.input_source_video_id'].join(',');
  var autofill_url_timeout;
  $(document).on('blur', video_url_input, function () {
    var url = $(this).val();
    var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (url && regex.test(url) == false) {
      $(this).val('');
      tutor_toast('Error!', __('Invalid Video URL', 'tutor'), 'error');
    }
  }).on('paste', video_url_input, function (e) {
    e.stopImmediatePropagation();
    var root = $(this).closest('.tutor-lesson-modal-wrap').find('.tutor-option-field-video-duration');
    var duration_label = root.find('label');
    var is_wp_media = $(this).hasClass('input_source_video_id');
    var autofill_url = $(this).data('autofill_url');
    $(this).data('autofill_url', null);
    var video_url = is_wp_media ? $(this).data('video_url') : autofill_url || e.originalEvent.clipboardData.getData('text');

    var toggle_loading = function toggle_loading(show) {
      if (!show) {
        duration_label.find('img').remove();
        return;
      } // Show loading icon


      if (duration_label.find('img').length == 0) {
        duration_label.append(' <img src="' + window._tutorobject.loading_icon_url + '" style="display:inline-block"/>');
      }
    };

    var set_duration = function set_duration(sec_num) {
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = Math.round(sec_num - hours * 3600 - minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      var fragments = [hours, minutes, seconds];
      var time_fields = root.find('input');

      for (var i = 0; i < 3; i++) {
        time_fields.eq(i).val(fragments[i]);
      }
    };

    var yt_to_seconds = function yt_to_seconds(duration) {
      var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      match = match.slice(1).map(function (x) {
        if (x != null) {
          return x.replace(/\D/, '');
        }
      });
      var hours = parseInt(match[0]) || 0;
      var minutes = parseInt(match[1]) || 0;
      var seconds = parseInt(match[2]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    };

    if (is_wp_media || $(this).parent().hasClass('video_source_wrap_external_url')) {
      var player = document.createElement('video');
      player.addEventListener('loadedmetadata', function () {
        set_duration(player.duration);
        toggle_loading(false);
      });
      toggle_loading(true);
      player.src = video_url;
    } else if ($(this).parent().hasClass('video_source_wrap_vimeo')) {
      var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
      var match = video_url.match(regExp);
      var video_id = match ? match[5] : null;

      if (video_id) {
        toggle_loading(true);
        $.getJSON('http://vimeo.com/api/v2/video/' + video_id + '/json', function (data) {
          if (Array.isArray(data) && data[0] && data[0].duration !== undefined) {
            set_duration(data[0].duration);
          }

          toggle_loading(false);
        });
      }
    } else if ($(this).parent().hasClass('video_source_wrap_youtube')) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = video_url.match(regExp);
      var video_id = match && match[7].length == 11 ? match[7] : false;
      var api_key = $(this).data('youtube_api_key');

      if (video_id && api_key) {
        var result_url = 'https://www.googleapis.com/youtube/v3/videos?id=' + video_id + '&key=' + api_key + '&part=contentDetails';
        toggle_loading(true);
        $.getJSON(result_url, function (data) {
          if (_typeof(data) == 'object' && data.items && data.items[0] && data.items[0].contentDetails && data.items[0].contentDetails.duration) {
            set_duration(yt_to_seconds(data.items[0].contentDetails.duration));
          }

          toggle_loading(false);
        });
      }
    }
  }).on('input', video_url_input, function () {
    if (autofill_url_timeout) {
      clearTimeout(autofill_url_timeout);
    }

    var $this = $(this);
    autofill_url_timeout = setTimeout(function () {
      var val = $this.val();
      val = val ? val.trim() : '';
      console.log('Trigger', val);
      val ? $this.data('autofill_url', val).trigger('paste') : 0;
    }, 700);
  });
});

/***/ }),

/***/ "./assets/react/course-builder/quiz.js":
/*!*********************************************!*\
  !*** ./assets/react/course-builder/quiz.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/response */ "./assets/react/helper/response.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__; // TAB switching

  var step_switch = function step_switch(modal, go_next, clear_next) {
    var element = modal.find('.tutor-modal-steps');
    var current = element.find('li[data-tab="' + modal.attr('data-target') + '"]');
    var next = current.next();
    var prev = current.prev();

    if (!go_next) {
      var new_tab = prev.data('tab');
      prev.length ? modal.attr('data-target', new_tab) : 0;
      clear_next ? element.find('li[data-tab="' + new_tab + '"]').nextAll().removeClass('tutor-is-completed') : 0;
      return;
    }

    if (next.length) {
      next.addClass('tutor-is-completed');
      modal.attr('data-target', next.data('tab'));
      return true;
    } // If there is no more next screen, it means quiz saved and show the toast


    tutor_toast(__('Success', 'tutor'), __('Quiz Updated'), 'success');
    modal.removeClass('tutor-is-active');
    return null;
  }; // Slider initiator


  var tutor_slider_init = function tutor_slider_init() {
    $('.tutor-field-slider').each(function () {
      var $slider = $(this);
      var $input = $slider.closest('.tutor-field-type-slider').find('input[type="hidden"]');
      var $showVal = $slider.closest('.tutor-field-type-slider').find('.tutor-field-type-slider-value');
      var min = parseFloat($slider.closest('.tutor-field-type-slider').attr('data-min'));
      var max = parseFloat($slider.closest('.tutor-field-type-slider').attr('data-max'));
      $slider.slider({
        range: 'max',
        min: min,
        max: max,
        value: $input.val(),
        slide: function slide(event, ui) {
          $showVal.text(ui.value);
          $input.val(ui.value);
        }
      });
    });
  };

  function tutor_save_sorting_quiz_questions_order() {
    var questions = {};
    $('.quiz-builder-question-wrap').each(function (index, item) {
      var $question = $(this);
      var question_id = parseInt($question.attr('data-question-id'), 10);
      questions[index] = question_id;
    });
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        sorted_question_ids: questions,
        action: 'tutor_quiz_question_sorting'
      }
    });
  } // Sort quiz question


  function enable_quiz_questions_sorting() {
    if (jQuery().sortable) {
      $('.quiz-builder-questions-wrap').sortable({
        handle: '.question-sorting',
        start: function start(e, ui) {
          ui.placeholder.css('visibility', 'visible');
        },
        stop: function stop(e, ui) {
          tutor_save_sorting_quiz_questions_order();
        }
      });
    }
  }
  /**
   * Save answer sorting placement
   *
   * @since v.1.0.0
   */


  function enable_quiz_answer_sorting() {
    if (jQuery().sortable) {
      $('#tutor_quiz_question_answers').sortable({
        handle: '.tutor-quiz-answer-sort-icon',
        start: function start(e, ui) {
          ui.placeholder.css('visibility', 'visible');
        },
        stop: function stop(e, ui) {
          tutor_save_sorting_quiz_answer_order();
        }
      });
    }
  }

  function tutor_save_sorting_quiz_answer_order() {
    var answers = {};
    $('.tutor-quiz-answer-wrap').each(function (index, item) {
      var $answer = $(this);
      var answer_id = parseInt($answer.attr('data-answer-id'), 10);
      answers[index] = answer_id;
    });
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        sorted_answer_ids: answers,
        action: 'tutor_quiz_answer_sorting'
      }
    });
  }

  function tutor_select() {
    var obj = {
      init: function init() {
        $(document).on('click', '.question-type-select .tutor-select-option', function (e) {
          e.preventDefault();
          var $that = $(this);

          if ($that.attr('data-is-pro') !== 'true') {
            var $html = $that.html().trim();
            $that.closest('.question-type-select').find('.select-header .lead-option').html($html);
            $that.closest('.question-type-select').find('.select-header input.tutor_select_value_holder').val($that.attr('data-value')).trigger('change');
            $that.closest('.tutor-select-options').hide();
          } else {
            alert('Tutor Pro version required');
          }
        });
        $(document).on('click', '.question-type-select .select-header', function (e) {
          e.preventDefault();
          var $that = $(this);
          $that.closest('.question-type-select').find('.tutor-select-options').slideToggle();
        });
        this.setValue();
        this.hideOnOutSideClick();
      },
      setValue: function setValue() {
        $('.question-type-select').each(function () {
          var $that = $(this);
          var $option = $that.find('.tutor-select-option');

          if ($option.length) {
            $option.each(function () {
              var $thisOption = $(this);

              if ($thisOption.attr('data-selected') === 'selected') {
                var $html = $thisOption.html().trim();
                $thisOption.closest('.question-type-select').find('.select-header .lead-option').html($html);
                $thisOption.closest('.question-type-select').find('.select-header input.tutor_select_value_holder').val($thisOption.attr('data-value'));
              }
            });
          }
        });
      },
      hideOnOutSideClick: function hideOnOutSideClick() {
        $(document).mouseup(function (e) {
          var $option_wrap = $('.tutor-select-options');

          if (!$(e.target).closest('.select-header').length && !$option_wrap.is(e.target) && $option_wrap.has(e.target).length === 0) {
            $option_wrap.hide();
          }
        });
      },
      reInit: function reInit() {
        this.setValue();
      }
    };
    return obj;
  }

  tutor_select().init();
  tutor_slider_init(); // Create/Edit quiz opener

  $(document).on('click', '.tutor-add-quiz-btn, .open-tutor-quiz-modal, .back-to-quiz-questions-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var step_1 = $(this).hasClass('open-tutor-quiz-modal') || $(this).hasClass('tutor-add-quiz-btn');
    var modal = $('.tutor-modal.tutor-quiz-builder-modal-wrap');
    var quiz_id = $that.hasClass('tutor-add-quiz-btn') ? 0 : $that.attr('data-quiz-id');
    var topic_id = $that.closest('.tutor-topics-wrap').data('topic-id');
    var course_id = $('#post_ID').val();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        quiz_id: quiz_id,
        topic_id: topic_id,
        course_id: course_id,
        action: 'tutor_load_quiz_builder_modal'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (!data.success) {
          tutor_toast('Error', (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(data), 'error');
          return;
        }

        $('.tutor-quiz-builder-modal-wrap').addClass('tutor-is-active');
        $('.tutor-quiz-builder-modal-wrap .modal-container').html(data.data.output);
        $('.tutor-quiz-builder-modal-wrap').attr('data-quiz-id', quiz_id).attr('data-topic-id-of-quiz', topic_id);
        modal.removeClass('tutor-has-question-from');

        if (step_1) {
          step_switch(modal, false, true); // Back to second from third

          step_switch(modal, false, true); // Back to first from second
        }

        window.dispatchEvent(new Event(_tutorobject.content_change_event));
        tutor_slider_init();
        enable_quiz_questions_sorting();
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  }); // Quiz modal next click

  $(document).on('click', '.tutor-quiz-builder-modal-wrap button', function (e) {
    // DOM findar
    var btn = $(this);
    var modal = btn.closest('.tutor-modal');
    var current_tab = modal.attr('data-target');
    var action = $(this).data('action');

    if (action == 'back') {
      step_switch(modal, false);
      return;
    } else if (action != 'next') {
      return;
    } // Quiz meta data


    var course_id = $('#post_ID').val();
    var topic_id = $(this).closest('.tutor-quiz-builder-modal-wrap').attr('data-topic-id-of-quiz');
    var quiz_id = modal.find('[name="quiz_id"]').val();

    if (current_tab == 'quiz-builder-tab-quiz-info' || current_tab == 'quiz-builder-tab-settings') {
      // Save quiz info. Title and description
      var quiz_title = modal.find('[name="quiz_title"]').val();
      var quiz_description = modal.find('[name="quiz_description"]').val();
      var settings = modal.find('#quiz-builder-tab-settings :input, #quiz-builder-tab-advanced-options :input').serializeObject();
      var quiz_info_required = {
        quiz_title: quiz_title,
        course_id: course_id,
        quiz_id: quiz_id,
        topic_id: topic_id
      };

      for (var k in quiz_info_required) {
        if (!quiz_info_required[k]) {
          console.log(quiz_info_required);

          if (k == 'quiz_title') {
            tutor_toast('Error!', __('Quiz title required', 'tutor'), 'error');
          }

          return;
        }
      }

      $.ajax({
        url: window._tutorobject.ajaxurl,
        type: 'POST',
        data: _objectSpread(_objectSpread(_objectSpread({}, settings), quiz_info_required), {}, {
          quiz_description: quiz_description,
          action: 'tutor_quiz_save'
        }),
        beforeSend: function beforeSend() {
          btn.addClass('tutor-updating-message');
        },
        success: function success(data) {
          console.log(quiz_id, quiz_id != 0);

          if (quiz_id && quiz_id != 0) {
            // Update if exists already
            $('#tutor-quiz-' + quiz_id).replaceWith(data.data.output_quiz_row);
            console.log($('#tutor-quiz-' + quiz_id));
          } else {
            // Otherwise create new row
            $('#tutor-topics-' + topic_id + ' .tutor-lessons').append(data.data.output_quiz_row);
            console.log($('#tutor-topics-' + topic_id + ' .tutor-lessons'));
          } // Update modal content


          $('.tutor-quiz-builder-modal-wrap .modal-container').html(data.data.output);
          window.dispatchEvent(new Event(_tutorobject.content_change_event));
          tutor_slider_init();
          step_switch(modal, true);
          enable_quiz_questions_sorting(); // Trigger change to set background based on checked status

          $('[name="quiz_option[feedback_mode]"]').trigger('change');
        },
        complete: function complete() {
          btn.removeClass('tutor-updating-message');
        }
      });
    } else if (current_tab == 'quiz-builder-tab-questions') {
      step_switch(modal, true);
    }
  }); // Add new or edit question button click

  $(document).on('click', '.tutor-quiz-open-question-form', function (e) {
    e.preventDefault(); // Prepare related data for the question

    var $that = $(this);
    var modal = $that.closest('.tutor-modal');
    var quiz_id = modal.find('[name="quiz_id"]').val();
    var topic_id = modal.find('[name="topic_id"]').val();
    var course_id = $('#post_ID').val();
    var question_id = $that.attr('data-question-id');
    var params = {
      quiz_id: quiz_id,
      topic_id: topic_id,
      course_id: course_id,
      question_id: question_id,
      action: 'tutor_quiz_builder_get_question_form'
    };
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: params,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        // Add the question form in modal
        modal.find('.modal-container').html(data.data.output);
        modal.addClass('tutor-has-question-from'); // Enable quiz answer sorting for multi/radio select

        enable_quiz_answer_sorting();
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  }); // Trash question

  $(document).on('click', '.tutor-quiz-question-trash', function (e) {
    e.preventDefault();
    var $that = $(this);
    var question_id = $that.attr('data-question-id');
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        question_id: question_id,
        action: 'tutor_quiz_builder_question_delete'
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success() {
        $that.closest('.quiz-builder-question-wrap').fadeOut(function () {
          $(this).remove();
        });
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Get question answers option form to save/edit multiple/single/true-false options
   *
   * @since v.1.0.0
   */

  $(document).on('click', '.add_question_answers_option, .tutor-quiz-answer-edit a', function (e) {
    e.preventDefault();
    var $that = $(this);
    var question_id = $that.closest('[data-question-id]').attr('data-question-id');
    var answer_id = $(this).hasClass('add_question_answers_option') ? null : $that.closest('.tutor-quiz-answer-wrap').attr('data-answer-id');
    var $formInput = $('#tutor-quiz-question-wrapper :input').serializeObject();
    $formInput.question_id = question_id;
    $formInput.answer_id = answer_id;
    $formInput.action = 'tutor_quiz_question_answer_editor';
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: $formInput,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        $('#tutor_quiz_builder_answer_wrapper').html(data.data.output);
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Quiz Question edit save and continue
   */

  $(document).on('click', '.quiz-modal-question-save-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var modal = $that.closest('.tutor-modal');
    var $formInput = $('#tutor-quiz-question-wrapper :input').serializeObject();
    $formInput.action = 'tutor_quiz_modal_update_question';
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: $formInput,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (data.success) {
          modal.find('.back-to-quiz-questions-btn').trigger('click');
        } else {
          tutor_toast('Error', (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(data), 'error');
        }
      },
      complete: function complete() {
        setTimeout(function () {
          return $that.removeClass('tutor-updating-message');
        }, 2000);
      }
    });
  });
  /**
   * If change question type from quiz builder question
   *
   * @since v.1.0.0
   */

  $(document).on('change', 'input.tutor_select_value_holder', function (e) {
    // Firstly remove older content and show loading spinner
    var answer_wrapper = $('#tutor_quiz_builder_answer_wrapper');
    answer_wrapper.html("<div style=\"text-align:center\">\n                <span class=\"tutor-updating-message\"></span>\n            </div>");
    answer_wrapper.get(0).scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
    var question_id = $(this).closest('[data-question-id]').attr('data-question-id');
    var question_type = $(this).val();
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        question_id: question_id,
        question_type: question_type,
        action: 'tutor_quiz_builder_change_type'
      },
      success: function success(data) {
        if (data.success) {
          $('#tutor_quiz_builder_answer_wrapper').html(data.data.output);
          answer_wrapper.get(0).scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        } else {
          tutor_toast('Error', (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(data), 'error');
        }
      }
    });
  });
  /**
   * Saving question answers options
   * Student should select the right answer at quiz attempts
   *
   * @since v.1.0.0
   */

  $(document).on('click', '#quiz-answer-save-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var $formInput = $('#tutor-quiz-question-wrapper :input').serializeObject();
    $formInput.action = $formInput.tutor_quiz_answer_id ? 'tutor_update_quiz_answer_options' : 'tutor_save_quiz_answer_options';
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: $formInput,
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message');
      },
      success: function success(data) {
        if (!data.success) {
          tutor_toast('Error', (0,_helper_response__WEBPACK_IMPORTED_MODULE_0__.get_response_message)(data), 'error');
          return;
        }

        $('.tutor_select_value_holder').trigger('change');
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Updating Answer
   *
   * @since v.1.0.0
   */

  $(document).on('change', '.tutor-quiz-answers-mark-correct-wrap input', function (e) {
    e.preventDefault();
    var $that = $(this);
    var answer_id = $that.val();
    var inputValue = 1;

    if (!$that.prop('checked')) {
      inputValue = 0;
    }

    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        answer_id: answer_id,
        inputValue: inputValue,
        action: 'tutor_mark_answer_as_correct'
      }
    });
  });
  /**
   * Delete answer for a question in quiz builder
   *
   * @since v.1.0.0
   */

  $(document).on('click', '.tutor-quiz-answer-trash-wrap a.answer-trash-btn', function (e) {
    e.preventDefault();
    var $that = $(this);
    var answer_id = $that.attr('data-answer-id');
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        answer_id: answer_id,
        action: 'tutor_quiz_builder_delete_answer'
      },
      beforeSend: function beforeSend() {
        $that.closest('.tutor-quiz-answer-wrap').remove();
      }
    });
  }); // Collapse/expand advanced settings

  $(document).on('click', '.tutor-quiz-advance-settings .tutor-quiz-advance-header', function () {
    $(this).parent().toggleClass('tutor-is-active').find('.tutor-icon-angle-down-filled').toggleClass('tutor-icon-angle-up-filled');
  }); // Change background of quiz feedback mode

  $(document).on('change', '[name="quiz_option[feedback_mode]"]', function () {
    if ($(this).prop('checked')) {
      $(this).parent().addClass('tutor-bg-white').removeClass('tutor-bg-transparent').siblings().filter('.tutor-radio-select').addClass('tutor-bg-transparent').removeClass('tutor-bg-white');
    }
  });
});

/***/ }),

/***/ "./assets/react/course-builder/topic.js":
/*!**********************************************!*\
  !*** ./assets/react/course-builder/topic.js ***!
  \**********************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__;
  $(document).on('click', '.tutor-save-topic-btn', function (e) {
    e.preventDefault();
    var $button = $(this);
    var modal = $button.closest('.tutor-modal');
    var topic_id = modal.find('[name="topic_id"]').val();
    var topic_title = modal.find('[name="topic_title"]').val();
    var topic_summery = modal.find('[name="topic_summery"]').val();
    var topic_course_id = modal.find('[name="topic_course_id"]').val();
    var data = {
      topic_title: topic_title,
      topic_summery: topic_summery,
      topic_id: topic_id,
      topic_course_id: topic_course_id,
      action: 'tutor_save_topic'
    };
    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: data,
      beforeSend: function beforeSend() {
        $button.addClass('tutor-updating-message');
      },
      success: function success(resp) {
        var _resp$data = resp.data,
            data = _resp$data === void 0 ? {} : _resp$data,
            success = resp.success;
        var _data$message = data.message,
            message = _data$message === void 0 ? __('Something Went Wrong!', 'tutor') : _data$message,
            course_contents = data.course_contents,
            topic_title = data.topic_title;

        if (!success) {
          tutor_toast('Error!', message, 'error');
          return;
        } // Close Modal
        // modal.removeClass('tutor-is-active', $('#tutor-course-content-wrap'));


        modal.removeClass('tutor-is-active'); // Show updated contents

        if (topic_id) {
          // It's topic update
          $button.closest('.tutor-topics-wrap').find('span.topic-inner-title').text(topic_title);
        } else {
          // It's new topic creation
          $('#tutor-course-content-wrap').html(course_contents);
          modal.find('[name="topic_title"]').val('');
          modal.find('[name="topic_summery"]').val('');
        }

        window.dispatchEvent(new Event(_tutorobject.content_change_event));
      },
      complete: function complete() {
        $button.removeClass('tutor-updating-message');
      }
    });
  });
  /**
   * Confirmation for deleting Topic
   */

  $(document).on('click', '.tutor-topics-wrap .topic-delete-btn i', function (e) {
    var $that = $(this);
    var container = $(this).closest('.tutor-topics-wrap');
    var topic_id = container.attr('data-topic-id');

    if (!confirm(__('Are you sure to delete the topic?', 'tutor'))) {
      return;
    }

    $.ajax({
      url: window._tutorobject.ajaxurl,
      type: 'POST',
      data: {
        action: 'tutor_delete_topic',
        topic_id: topic_id
      },
      beforeSend: function beforeSend() {
        $that.addClass('tutor-updating-message-v2');
      },
      success: function success(data) {
        // To Do: Load updated topic list here
        if (data.success) {
          container.remove();
          return;
        }

        tutor_toast('Error!', (data.data || {}).message || __('Something Went Wrong', 'tutor'), 'error');
      },
      complete: function complete() {
        $that.removeClass('tutor-updating-message-v2');
      }
    });
  });
  $(document).on('click', '.topic-inner-title, .expand-collapse-wrap', function (e) {
    e.preventDefault();
    var wrapper = $(this).closest('.tutor-topics-wrap');
    wrapper.find('.tutor-topics-body').slideToggle();
    wrapper.find('.expand-collapse-wrap').toggleClass('is-expanded').find('i').toggleClass('tutor-icon-angle-down-filled tutor-icon-angle-up-filled');
  });
});

/***/ }),

/***/ "./assets/react/course-builder/video-picker.js":
/*!*****************************************************!*\
  !*** ./assets/react/course-builder/video-picker.js ***!
  \*****************************************************/
/***/ (() => {

window.jQuery(document).ready(function ($) {
  var __ = wp.i18n.__; // On Remove video

  $(document).on('click', '.video_source_wrap_html5 .tutor-attachment-cards .tutor-delete-attachment', function () {
    $(this).closest('.video_source_wrap_html5').removeClass('tutor-has-video').find('input.input_source_video_id').val('');
  }); // Upload video

  $(document).on("click", ".video_source_wrap_html5 .video_upload_btn", function (event) {
    event.preventDefault();
    var container = $(this).closest('.video_source_wrap_html5');
    var attachment_card = container.find('.tutor-attachment-cards');
    var frame; // If the media frame already exists, reopen it.

    if (frame) {
      frame.open();
      return;
    } // Create a new media frame


    frame = wp.media({
      title: __("Select or Upload Media Of Your Choice", "tutor"),
      button: {
        text: __("Upload media", "tutor")
      },
      library: {
        type: "video"
      },
      multiple: false // Set to true to allow multiple files to be selected

    }); // When an image is selected in the media frame...

    frame.on("select", function () {
      // Get media attachment details from the frame state
      var attachment = frame.state().get("selection").first().toJSON(); // Show video info

      attachment_card.find(".filename").text(attachment.name).attr('href', attachment.url);
      attachment_card.find('.filesize').text(attachment.filesizeHumanReadable); // Add video id to hidden input

      container.find("input.input_source_video_id").val(attachment.id).data('video_url', attachment.url).trigger('paste'); // Add identifer that video added

      container.addClass('tutor-has-video');
    }); // Finally, open the modal on click

    frame.open();
  });
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
/*!**********************************************!*\
  !*** ./assets/react/course-builder/index.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assignment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assignment */ "./assets/react/course-builder/assignment.js");
/* harmony import */ var _assignment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assignment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _attachment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attachment */ "./assets/react/course-builder/attachment.js");
/* harmony import */ var _attachment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_attachment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _content_drip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content-drip */ "./assets/react/course-builder/content-drip.js");
/* harmony import */ var _content_drip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_content_drip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _instructor_multi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instructor-multi */ "./assets/react/course-builder/instructor-multi.js");
/* harmony import */ var _instructor_multi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_instructor_multi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lesson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lesson */ "./assets/react/course-builder/lesson.js");
/* harmony import */ var _quiz__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quiz */ "./assets/react/course-builder/quiz.js");
/* harmony import */ var _topic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./topic */ "./assets/react/course-builder/topic.js");
/* harmony import */ var _topic__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_topic__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _video_picker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./video-picker */ "./assets/react/course-builder/video-picker.js");
/* harmony import */ var _video_picker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_video_picker__WEBPACK_IMPORTED_MODULE_7__);








window.jQuery(document).ready(function ($) {
  $('.tutor-certificate-template-tab [data-tutor-tab-target]').click(function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
    $('#' + $(this).data('tutor-tab-target')).show().siblings().hide();
  });
});
/**
 * Re init required
 * Modal Loaded...
 */

var load_select2 = function load_select2() {
  if (jQuery().select2) {
    jQuery('.select2_multiselect').select2({
      dropdownCssClass: 'increasezindex'
    });
  }
};

window.addEventListener('DOMContentLoaded', load_select2);
window.addEventListener(_tutorobject.content_change_event, load_select2);
window.addEventListener(_tutorobject.content_change_event, function () {
  return console.log(_tutorobject.content_change_event);
});
/**
 * Get the remaining length of input limit
 *
 * @return {Number}
 */

function getRemainingLength() {
  var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 255;
  var inputElement = arguments.length > 1 ? arguments[1] : undefined;
  return maxLength - (((inputElement || {}).value || {}).length || 0);
}
/**
 * Update the course title input tooltip value in 'keyup'
 * and set the data initially
 */


var maxLength = 255;
var courseCreateTitle = document.getElementById('tutor-course-create-title');
var courseTitleTooltip = courseCreateTitle === null || courseCreateTitle === void 0 ? void 0 : courseCreateTitle.previousElementSibling;
var courseCreateTitleTooptip = document.querySelector('#tutor-course-create-title-tooltip-wrapper .tooltip-txt');

if (courseTitleTooltip) {
  courseTitleTooltip.innerHTML = getRemainingLength(maxLength, courseCreateTitle);
}

if (courseCreateTitle && courseCreateTitleTooptip) {
  document.addEventListener('click', function (e) {
    if (e.target === courseCreateTitle) {
      if (courseCreateTitle === document.activeElement) {
        courseCreateTitleTooptip.style.opacity = '1';
        courseCreateTitleTooptip.style.visibility = 'visible';
      }
    } else {
      courseCreateTitleTooptip.style.opacity = '0';
      courseCreateTitleTooptip.style.visibility = 'hidden';
    }
  });
  courseCreateTitle.addEventListener('keyup', function (e) {
    var remainingLength = getRemainingLength(maxLength, courseCreateTitle);
    courseTitleTooltip.innerHTML = remainingLength;
  });
}
})();

/******/ })()
;
//# sourceMappingURL=tutor-course-builder.js.map