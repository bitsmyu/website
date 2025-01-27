
$(function(){
	$('a[href^=#]').click(function(){
		var speed = 1000;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

$(function() {
  $(".diamondswrap").diamonds({
    size : 170, //画像サイズ
    gap :  3, //マージン
    hideIncompleteRow : false, //レイアウト調整で最後のイメージを非表示にする
    autoRedraw : true, //ウィンドウサイズリサイズの際に再配置
    itemSelector : ".item" //適用するCSS
  });
});


jQuery(document).ready(function($) {
        var $content = $('#wrapper'),
        $drawer = $('#drawer'),
        $button = $('#spNavi'),
        $aaa = $('#drawer-toggle'),
        $menu = $('.menu'),
        isOpen = false;
    //ボタンをタップ、クリックした時
    $button.on('touchstart click', function () {
        if(isOpen) {
        	$aaa.removeClass('open');
            $drawer.removeClass('open');
            $content.removeClass('open');
            isOpen = false;
        } else {
        	$aaa.addClass('open');
            $drawer.addClass('open');
            $content.addClass('open');
            isOpen = true;
        }
        return false; //親要素へのイベント伝播、aタグのURLクリックによる画面遷移を防ぐ
    });

    //コンテンツ部分をタップ、クリックした時
    $content.on('touchstart click', function (e) {
        e.stopPropagation(); //イベント伝播のみ阻止
        if(isOpen) {
        	$aaa.removeClass('open');
            $drawer.removeClass('open');
            $content.removeClass('open');
            isOpen = false;
        }
    });

    $menu.on('touched click', function (e) {
      　e.stopPropagation(); //イベント伝播のみ阻止
        if(isOpen) {
        	$aaa.removeClass('open');
            $drawer.removeClass('open');
            $content.removeClass('open');
            isOpen = false;
        }
    });
});

$(function() {
    if (window.matchMedia('screen and (min-width:681px)').matches) {
        var topBtn = $('#toTop');    
        topBtn.hide();
        //スクロールが100に達したらボタン表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                topBtn.fadeIn();
            } else {
                topBtn.fadeOut();
            }
        });
        //スクロールしてトップ
        topBtn.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    }
});
