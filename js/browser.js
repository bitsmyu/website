
//UserAgent で判定
    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();
    var script = document.createElement("script");

    // if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    //     //スマホでの処理
    // }
    if (navigator.platform.indexOf("Win") != -1) {
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "js/sketch03.js");
        document.getElementsByTagName("head")[0].appendChild(script);
        // if (userAgent.indexOf('msie') != -1) {
            // script.setAttribute("type", "text/javascript");
            // script.setAttribute("src", "js/sketch02.js");
            // document.getElementsByTagName("head")[0].appendChild(script);
        // var ele = document.createElement("img");
        // ele.setAttribute("src", "http://yuuuutos.com/images/top_logo_sp.png");    // ele.src = "./image/picture/bg01.gif";
        // ele.setAttribute("alt", "bits");          // ele.alt = "写真";
        // document.getElementById('logo_sp').style.display = 'block';
        // var script02 = document.createElement("script");
        // script02.setAttribute("type", "text/javascript");
        // script02.setAttribute("src", "js/excanvas.js");
        // script.setAttribute("type", "text/javascript");
        // script.setAttribute("src", "js/sketch02.js");
        // document.getElementsByTagName("head")[0].appendChild(script);
    //     var ele = document.createElement("img");
    // ele.setAttribute("src", "images/top_logo_sp.png");    // ele.src = "./image/picture/bg01.gif";
    // ele.setAttribute("alt", "bits");          // ele.alt = "写真";

        // }else if (userAgent.indexOf('chrome') != -1) {
        //     //Chrome/Opera（最新版）での処理
        //     script.setAttribute("type", "text/javascript");
        //     script.setAttribute("src", "js/sketch02.js");
        //     document.getElementsByTagName("head")[0].appendChild(script);
        // } else if (userAgent.indexOf('safari') != -1) {
        //     //Safariでの処理
        //     script.setAttribute("type", "text/javascript");
        //     script.setAttribute("src", "js/sketch02.js");
        //     document.getElementsByTagName("head")[0].appendChild(script);
        //     //document.getElementById("hoge").style.display = "none";
        // }else if (userAgent.indexOf('firefox') != -1) {
        //     //Firefoxでの処理
        //     script.setAttribute("type", "text/javascript");
        //     script.setAttribute("src", "js/sketch02.js");
        //     document.getElementsByTagName("head")[0].appendChild(script);
        // }
 }else {
    if (userAgent.indexOf('chrome') != -1) {

        //Chrome/Opera（最新版）での処理
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "js/sketch01.js");
        document.getElementsByTagName("head")[0].appendChild(script);
    }else if (userAgent.indexOf('safari') != -1) {
        //Safariでの処理
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "js/sketch01.js");
        document.getElementsByTagName("head")[0].appendChild(script);
        //document.getElementById("hoge").style.display = "none";
    }else if (userAgent.indexOf('firefox') != -1) {
        //Firefoxでの処理
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "js/sketch02.js");
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

