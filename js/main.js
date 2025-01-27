
$(function () {
    $('a[href^=#]').click(function () {
        var speed = 1000;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });
});

$(function () {
    $(".diamondswrap").diamonds({
        size: 170, //画像サイズ
        gap: 3, //マージン
        hideIncompleteRow: false, //レイアウト調整で最後のイメージを非表示にする
        autoRedraw: true, //ウィンドウサイズリサイズの際に再配置
        itemSelector: ".item" //適用するCSS
    });
});


jQuery(document).ready(function ($) {
    var $content = $('#wrapper'),
        $drawer = $('#drawer'),
        $button = $('#spNavi'),
        $aaa = $('#drawer-toggle'),
        $menu = $('.menu'),
        isOpen = false;
    //ボタンをタップ、クリックした時
    $button.on('touchstart click', function () {
        if (isOpen) {
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
        if (isOpen) {
            $aaa.removeClass('open');
            $drawer.removeClass('open');
            $content.removeClass('open');
            isOpen = false;
        }
    });

    $menu.on('touched click', function (e) {
        e.stopPropagation(); //イベント伝播のみ阻止
        if (isOpen) {
            $aaa.removeClass('open');
            $drawer.removeClass('open');
            $content.removeClass('open');
            isOpen = false;
        }
    });
});

$(function () {
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


$(function () {
    json = "./member.json";

    target_member = $('#member_list');
    target_list = $('#memberList');

    $.getJSON(json, function (data, status) {
        for (var n in data) {

            if (n >= 0) {
                if (data[n].picture != null) {
                    if(data[n].picture == "default_2022.png"){
                        pic = "default_2022.png";
                    }else{
                        pic = data[n].picture + '.jpg';
                    }
                    block = '<div class=\"item\"><a href="member.html#' + data[n].picture + '"><img src="images/member/2022/' + pic + '\"/><span class=\"detail\"><span class=\"name\">' + data[n].name + '</span></span></a></div>';
                    //     line = '<a href="' + data[n].url + '"><span><u>';
                    //     line_end = '</u></span></a></br>';
                    // } else {
                    //     line = '<span><u>';
                    //     line_end = '</u></span></br>';
                    // }
                    // if (data[n].tag.tag_top == null) {
                    //     data[n].tag.tag_top = 'お知らせ';
                    // }
                    // text = '[' + data[n].tag.tag_top + ']　' + data[n].news + ' -' + data[n].date.year + '/' + data[n].date.month + '/' + data[n].date.day;
                    // text = line + text + line_end;
                    $(target_member).append(block);

                    list = '<div id="' + data[0].picture + '" class="member clearfix"><div class="img"><img src="images/member/2022/' + pic + '"></div><div class="info"><p class="name">' + data[n].name + '</p><p class="nameEng">' + data[n].eng + '</p><p class="status">' + data[n].pos + '</p></div></div>';
                    $(target_list).append(list);
                }
            }
        }
    })
})



// <div id="abekatsu" class="member clearfix">
// <div class="img">
//     <img src="http://ulab.myu.ac.jp/~bits/images/member/m19.png" />
// </div>
// <div class="info">
//     <p class="name">あべかつ</p>
//     <p class="nameEng">Abekatsu</p>
//     <p class="status">事業構想学部デザイン情報学科　４年</p>
//     <p class="comment">夏休み中、家の庭にカモの親子が迷い込んだ。<br>ええもん見た。</p>
//     <p class="works">うごけ！まじんくん、霧雨の散策路（背景映像）</p>
// </div>
// </div>