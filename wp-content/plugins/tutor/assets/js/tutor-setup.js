/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./assets/react/admin-dashboard/tutor-setup.js ***!
  \*****************************************************/
jQuery.fn.serializeObject = function () {
  var $ = jQuery;
  var values = {};
  var array = this.serializeArray();
  jQuery.each(array, function () {
    if (values[this.name]) {
      if (!values[this.name].push) {
        values[this.name] = [values[this.name]];
      }

      values[this.name].push(this.value || '');
    } else {
      values[this.name] = this.value || '';
    }
  }); // Map array value

  $(this).find("input:checkbox").each(function () {
    values[$(this).attr('name')] = $(this).prop('checked') ? $(this).attr('data-on') !== undefined ? $(this).attr('data-on') : 'on' : $(this).attr('data-off') !== undefined ? $(this).attr('data-off') : 'off';
  });
  return values;
};

jQuery(document).ready(function ($) {
  "use strict";

  var url = window.location.href;

  if (url.indexOf('#') > 0) {
    $(".tutor-wizard-container > div").removeClass("active");
    $(".tutor-wizard-container > div.tutor-setup-wizard-settings").addClass("active");
    var split_data = url.split("#");

    if (split_data[1]) {
      var _length = $(".tutor-setup-title li." + split_data[1]).index();

      $(".tutor-setup-title li").removeClass("current");
      $(".tutor-setup-content li").removeClass("active");

      for (var index = 0; index <= _length; index++) {
        $(".tutor-setup-title li").eq(index).addClass('active');

        if (_length == index) {
          $(".tutor-setup-title li").eq(index).addClass("current");
          $(".tutor-setup-content li").eq(index).addClass("active");
        }
      }
    }

    var enable = $("input[name='enable_course_marketplace'").val();
    showHide('on' == enable ? 'on' : 'off');
  }

  $(".tutor-setup-title li").on("click", function (e) {
    e.preventDefault();

    var _length = $(this).closest("li").index();

    $(".tutor-setup-title li").removeClass("active current");
    $(".tutor-setup-title li").eq(_length).addClass("active current");
    $(".tutor-setup-content li").removeClass("active");
    $(".tutor-setup-content li").eq(_length).addClass("active");
    window.location.hash = $("ul.tutor-setup-title li").eq(_length).data("url");

    for (var _index2 = 0; _index2 <= _length; _index2++) {
      $(".tutor-setup-title li").eq(_index2).addClass('active');
    }
  });
  /* ---------------------
  * Navigate Wizard Screens
  * ---------------------- */

  $(".tutor-type-next, .tutor-type-skip").on("click", function (e) {
    e.preventDefault();
    $(".tutor-setup-wizard-type").removeClass("active");
    $(".tutor-setup-wizard-settings").addClass("active");
    $('.tutor-setup-title li').eq(0).addClass('active');
    window.location.hash = "general";
    showHide($("input[name='enable_course_marketplace']:checked").val());
  });
  /* ---------------------
  * Marketplace Type
  * ---------------------- */

  $("input[type=radio][name=enable_course_marketplace]").change(function () {
    console.log('change', this.value);
    var wizardForm = $('form#tutor-setup-form');

    if (this.value == "0" || this.value == "off") {
      wizardForm.find("input[name=enable_course_marketplace]").val("off");
      wizardForm.find("input[name=enable_tutor_earning]").val("off");
    } else if (this.value == "1" || this.value == "on") {
      wizardForm.find("input[name=enable_course_marketplace]").val("on");
      wizardForm.find("input[name=enable_tutor_earning]").val("on");
    }
  });
  /* ---------------------
  * Wizard Action
  * ---------------------- */

  $(".tutor-setup-previous").on("click", function (e) {
    e.preventDefault();

    var _index = $(this).closest("li").index();

    $("ul.tutor-setup-title li").eq(_index).removeClass("active");

    if (_index > 0 && _index == $('.tutor-setup-title li.instructor').index() + 1 && $('.tutor-setup-title li.instructor').hasClass('hide-this')) {
      _index = _index - 1;
    }

    if (_index > 0) {
      $("ul.tutor-setup-title li").eq(_index - 1).addClass("active");
      $("ul.tutor-setup-content li").removeClass("active").eq(_index - 1).addClass("active");
      $("ul.tutor-setup-title li").removeClass("current").eq(_index - 1).addClass("current");
      window.location.hash = $("ul.tutor-setup-title li").eq(_index - 1).data('url');
    } else {
      $('.tutor-setup-wizard-settings').removeClass('active');
      $('.tutor-setup-wizard-type').addClass('active');
      window.location.hash = '';
    }

    setpSet();
  });
  $('.tutor-setup-type-previous').on("click", function (e) {
    $('.tutor-setup-wizard-type').removeClass('active');
    $('.tutor-setup-wizard-boarding').addClass('active');
  });
  $(".tutor-setup-skip, .tutor-setup-next").on("click", function (e) {
    e.preventDefault();

    var _index = $(this).closest("li").index() + 1;

    if (_index == $('.tutor-setup-title li.instructor').index() && $('.tutor-setup-title li.instructor').hasClass('hide-this')) {
      _index = _index + 1;
    }

    $("ul.tutor-setup-title li").eq(_index).addClass("active");
    $("ul.tutor-setup-content li").removeClass("active").eq(_index).addClass("active");
    $("ul.tutor-setup-title li").removeClass("current").eq(_index).addClass("current");
    window.location.hash = $("ul.tutor-setup-title li").eq(_index).data("url");
    setpSet();
  });
  /* ---------------------
  * Wizard Skip
  * ---------------------- */

  $(".tutor-boarding-next, .tutor-boarding-skip").on("click", function (e) {
    e.preventDefault();
    $(".tutor-setup-wizard-boarding").removeClass("active");
    $(".tutor-setup-wizard-type").addClass("active");
  });
  /* ---------------------
  * Wizard Slick Slider
  * ---------------------- */

  $(".tutor-boarding").slick({
    speed: 1000,
    centerMode: true,
    centerPadding: "19.5%",
    slidesToShow: 1,
    arrows: false,
    dots: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "50px",
        slidesToShow: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "30px",
        slidesToShow: 1
      }
    }]
  });
  /* ---------------------
  * Form Submit and Redirect after Finished
  * ---------------------- */

  $(".tutor-redirect").on("click", function (e) {
    var that = $(this);
    e.preventDefault();
    var formData = $("#tutor-setup-form").serializeObject();
    $.ajax({
      url: _tutorobject.ajaxurl,
      type: "POST",
      data: formData,
      success: function success(data) {
        if (data.success) {// window.location = that.data("url");
        }
      }
    });
  });
  /* ---------------------
  * Reset Section
  * ---------------------- */

  $(".tutor-reset-section").on("click", function (e) {
    $(this).closest("li").find("input").val(function () {
      switch (this.type) {
        case "text":
          return this.defaultValue;
          break;

        case "checkbox":
        case "radio":
          this.checked = this.defaultChecked;
          break;

        case "range":
          var rangeval = $(this).closest(".limit-slider");

          if (rangeval.find(".range-input").hasClass("double-range-slider")) {
            rangeval.find(".range-value-1").html(this.defaultValue + "%");
            $(".range-value-data-1").val(this.defaultValue);
            rangeval.find(".range-value-2").html(100 - this.defaultValue + "%");
            $(".range-value-data-2").val(100 - this.defaultValue);
          } else {
            rangeval.find(".range-value").html(this.defaultValue);
            return this.defaultValue;
          }

          break;

        case "hidden":
          return this.value;
          break;
      }
    });
  });
  /* ---------------------
  * Wizard Tooltip
  * ---------------------- */

  $(".tooltip-btn").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });
  /* ---------------------
  * on/of emphasizing after input check click
  * ---------------------- */

  $(".input-switchbox").each(function () {
    inputCheckEmphasizing($(this));
  });

  function inputCheckEmphasizing(th) {
    var checkboxRoot = th.parent().parent();

    if (th.prop("checked")) {
      checkboxRoot.find(".label-on").addClass("active");
      checkboxRoot.find(".label-off").removeClass("active");
    } else {
      checkboxRoot.find(".label-on").removeClass("active");
      checkboxRoot.find(".label-off").addClass("active");
    }
  }

  $(".input-switchbox").click(function () {
    inputCheckEmphasizing($(this));
  });
  /* ---------------------
  * Select Option
  * ---------------------- */

  $(document).on('click', function (e) {
    if (!e.target.closest('.grade-calculation')) {
      if ($(".grade-calculation .options-container") && $(".grade-calculation .options-container").hasClass('active')) {
        $(".grade-calculation .options-container").removeClass('active');
      }
    }
  });
  $(".selected").on("click", function () {
    $(".options-container").toggleClass("active");
  });
  $(".option").each(function () {
    $(this).on("click", function () {
      $(".selected").html($(this).find("label").html());
      $(".options-container").removeClass("active");
    });
  });
  /* ---------------------
  * Time Limit sliders
  * ---------------------- */

  $(".range-input").on("change mousemove", function (e) {
    var rangeInput = $(this).val();
    var rangeValue = $(this).parent().parent().find(".range-value");
    rangeValue.text(rangeInput);
  });
  $(".double-range-slider").on("change mousemove", function () {
    var selector = $(this).closest(".settings");
    selector.find(".range-value-1").text($(this).val() + "%");
    selector.find('input[name="earning_instructor_commission"]').val($(this).val());
    selector.find(".range-value-2").text(100 - $(this).val() + "%");
    selector.find('input[name="earning_admin_commission"]').val(100 - $(this).val());
  });
  $("#attempts-allowed-1").on("click", function (e) {
    if ($("#attempts-allowed-numer").prop("disabled", true)) {
      $(this).parent().parent().parent().addClass("active");
      $("#attempts-allowed-numer").prop("disabled", false);
    }
  });
  $("#attempts-allowed-2").on("click", function (e) {
    if ($("#attempts-allowed-2").is(":checked")) {
      $(this).parent().parent().parent().removeClass("active");
      $("#attempts-allowed-numer").prop("disabled", true);
    }
  });
  $('.wizard-type-item').on('click', function (e) {
    showHide($(this).find('input').val());
  });

  function showHide(val) {
    if (val == 'on') {
      $('.tutor-show-hide').addClass('active');
      $('.tutor-setup-title li.instructor').removeClass('hide-this');
      $('.tutor-setup-content li').eq($('.tutor-setup-title li.instructor')).removeClass('hide-this');
    } else {
      $('.tutor-show-hide').removeClass('active');
      $('.tutor-setup-title li.instructor').addClass('hide-this');
      $('.tutor-setup-content li').eq($('.tutor-setup-title li.instructor')).addClass('hide-this');
    }
  }

  setpSet();

  function setpSet() {
    if ($('.tutor-setup-title li.instructor').hasClass('hide-this')) {
      $('.tutor-steps').html(5);

      var _index = $('.tutor-setup-title li.current').index();

      if (_index > 2) {
        $('.tutor-setup-content li.active .tutor-steps-current').html(_index);
      }
    } else {
      $('.tutor-steps').html(6);
      $(".tutor-setup-content li").each(function () {
        $(this).find('.tutor-steps-current').html($(this).index() + 1);
      });
    }
  }
  /* ---------------------
  * Attempt Allowed
  * ---------------------- */


  $("input[name='attempts-allowed']").on('change', function (e) {
    var _val = $(this).filter(':checked').val();

    if (_val == 'unlimited') {
      $("input[name='quiz_attempts_allowed']").val(0);
    } else {
      $("input[name='quiz_attempts_allowed']").val($("input[name='attempts-allowed-number").val());
    }
  }); // Prevent number input out of range

  $(document).on('input', 'input.tutor-form-number-verify[type="number"]', function () {
    if ($(this).val() == '') {
      $(this).val('');
      return;
    }

    var min = $(this).attr('min');
    var max = $(this).attr('max');
    var val = $(this).val().toString();
    /\D/.test(val) ? val = '' : 0;
    val = parseInt(val || 0);
    $(this).val(Math.abs($(this).val())); // Prevent number smaller than min

    if (!(min === undefined)) {
      val < parseInt(min) ? $(this).val(min) : 0;
    } // Prevent numbers greater than max


    if (!(max === undefined)) {
      val > max ? $(this).val(max) : 0;
    }
  });
  /* $(document).on('focus', 'input.tutor-form-number-verify[type="number"]', function () {
  	$("input[name='attempts-allowed'][value='single']").attr('checked', true);
  }) */

  /* $("input[name='attempts-allowed-number']").on('change', function (e) {
  	$("input[name='quiz_attempts_allowed']").val($(this).val())
  })
  $("input[name='attempts-allowed-number']").on('focus', function (e) {
  	$("input[name='attempts-allowed'][value='single']").attr('checked', true);
  }) */
});
/******/ })()
;
//# sourceMappingURL=tutor-setup.js.map