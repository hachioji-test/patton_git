jQuery(function($){ //

$(window).load(function() {
	$("body").removeClass("preload");
});

//ナビ
$(window).on('load resize', function(){
	var _width = window.innerWidth;
	if(_width < 1025){
		$(".nav_pc > ul > li").prependTo($(".nav_sp ul"));
		$(".side_inner").appendTo($(".drawer-nav"));
	}else{
		$(".nav_sp > ul > li").appendTo($(".nav_pc > ul"));
		$(".drawer-nav .side_inner").appendTo($(".nav_pc"));
	}
});

$(document).ready(function() {
	$('.drawer').drawer();
});

$(".gnav > ul > li > span").click(function(){
    $(this).toggleClass("gnav_hover");
    $(this).next(".inner_nav").slideToggle(300);
    $(this).children("svg").toggleClass("gnav_on");
});

$(document).on('click touchend', function(event) {
  if (!$(event.target).closest('.gnav > ul > li > span').length) {
        $(".inner_nav").slideUp();
        $(".gnav > ul > li > span > svg").removeClass('gnav_on');
        $(".gnav > ul > li > span").removeClass('gnav_hover');
  }
});

$(".languages dt").click(function(){
    $(this).next("dd").slideToggle();
    $(this).next("dd").siblings("dd").slideUp();
    $(this).toggleClass("open");
    $(this).siblings("dt").removeClass("open");
    $(this).children("dt svg").toggleClass("gnav_on");
});

$(document).on('click touchend', function(event) {
  if (!$(event.target).closest('.languages dt').length) {
        $(".languages dd").slideUp();
	    $(".languages dt svg").removeClass("gnav_on");
  }
});

$(function(){
  var flg = "default";
  $('.drawer-toggle').click(function(){
    if(flg == "default"){
      $(".drawer-hamburger-txt").text("CLOSE");
      flg = "changed";
    }else{
      $(".drawer-hamburger-txt").text("MENU");
      flg = "default";
    }
  });
});

//句読点・括弧
$(function(){
	var tgElm = $('.brackets'),
		tagType = "span";
		tgElm.each(function(){
			var tgText = $(this).html();
			tgText = tgText.replace(/[「『（【｛［〔〈《]/g, '<' + tagType + ' style="display: inline-block; margin-left: -0.5em;">$&</' + tagType + '>');
			//以下一行を変更
			tgText = tgText.replace(/[」』）】｝］〕〉》。、]/g, '<' + tagType + ' style="display: inline-block; margin-right: -0.5em;">$&</' + tagType + '>');
		$(this).html(tgText);
	});
});

//ページトップ
// $(document).ready(function() {
//
// 	$(".page_top").hide();
//
// 	$(window).scroll(function() {
//
// 		if ($(this).scrollTop() > 100) {
// 			$('.page_top').fadeIn("fast");
// 		} else {
// 			$('.page_top').fadeOut("fast");
// 		}
// 	});
// });

// $(window).bind("scroll", function() {
//
// 	scrollHeight = $(document).height();
// 	scrollPosition = $(window).height() + $(window).scrollTop();
// 	footHeight = $("footer").innerHeight();
//
// 	if (scrollHeight - scrollPosition <= footHeight) {
//
// 		$(".page_top").css({
// 			"position": "absolute",
// 			"bottom": footHeight - 50
// 		});
//
// 	} else {
//
// 		$(".page_top").css({
// 			"position": "fixed",
// 			"bottom": "30px"
// 		});
// 	}
// });

$('.page_top a').click(function() {
	$('body,html').animate({
		scrollTop: 0
	}, 500);
	return false;
});

//画像切り替え
$(window).on('load resize', function(){
	// 置換の対象とするclass属性。
	var $elem = $('.image-switch');
	// 置換の対象とするsrc属性の末尾の文字列。
	var sp = '_sp.';
	var pc = '_pc.';
	// 画像を切り替えるウィンドウサイズ。
	var replaceWidth = 640;

	function imageSwitch() {
		// ウィンドウサイズを取得する。
		var windowWidth = parseInt($(window).width());

		// ページ内にあるすべての`.js-image-switch`に適応される。
		$elem.each(function() {
			var $this = $(this);
			// ウィンドウサイズが768px以上であれば_spを_pcに置換する。
			if (windowWidth >= replaceWidth) {
				$this.attr('src', $this.attr('src').replace(sp, pc));

				// ウィンドウサイズが768px未満であれば_pcを_spに置換する。
			} else {
				$this.attr('src', $this.attr('src').replace(pc, sp));
			}
		});
	}
	imageSwitch();

	// 動的なリサイズは操作後0.2秒経ってから処理を実行する。
	var resizeTimer;
	$(window).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			imageSwitch();
		}, 50);
	});
});

// モーダル
$(window).ready(function () {
               
                $('.modal__btn').fit_modal({
                    fix_fw_el : '.header',
                    fix_right_el : '.events__block',
                });

                var fm_this;

                var fmModal = $('.modal__two-modal').fit_modal({
                    fast_create : false,
                    fix_fw_el : '.header',
                    fix_right_el : '.events__block',
                    active_custom_func : function () {
                        return fm_this = this;
                    }
                });

                var user_modal = $('.no_elm').fit_modal({
                    modal_content_block : '.demo-modal__us-func',
                    modal_title : 'User modal',
                    window_animation_type  : 'fade_in_top',
                    fix_fw_el : '.header, .events__block',
                    fix_right_el : '.events__block',
                    active_custom_func : function (el, fn) {
                        $(this.modal_title_class).html(this.modal_title + ' - ' + fn.idClass.slice(1));
                        $(this.modal_content_block).html($('.test__input').val());
                        console.log(fn);
                    }
                });

                $('.test__form').submit(function (e) {
                    e.preventDefault();
                    user_modal.trigger('on.modal.active');
                });

                $('.license__link').fit_modal({
                    fix_fw_el : '.header',
                    fix_right_el : '.events__block',
                    responsive_mod : {
                        media : 1024
                    }
                });

                $('button, a, .no_elm').on('fm.onActive fm.onWindow fm.onClose fm.onCloseFrame fm.onResponsive fm.offResponsive', function (evt) {
                    $('.' + evt.namespace).addClass('active');
                    setTimeout(function () {
                        $('.' + evt.namespace).removeClass('active');
                    }, 700)
                });
            });
// ローダー
$(window).load(function () {
    $('.loading').delay(1500).fadeOut(300);
});

function stopload(){
    $('.loading').delay(1000).fadeOut(700);
}
setTimeout('stopload()',10000);



}); //
