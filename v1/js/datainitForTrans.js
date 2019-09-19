var zh = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    0: "周日"
};

function replaceImgsrc(ele, imgpath, id) {
    var reg = /\.\.\/\.\.\/photo.*/gi;
    var first = ele.querySelector('img');
    if (!Boolean(first)) {
        return;
    }
    var forJudge = first.src;
    var all = ele.querySelectorAll('img');
    var multiplex = forJudge && reg.test(forJudge);
    var imgMap = {};
    var index = 0;
    for (var j = 0; j < all.length; j++) {
        var img = all[j];
        var old = img.src;
        if (multiplex && imgMap[old]) {
            img.src = imgMap[old];
        } else if (old) {
            var type = old.substr(old.lastIndexOf("."));
            var newSrc = "../blog/" + imgpath + "/" + id + "_" + index + type;
            img.src = newSrc;
            imgMap[old] = newSrc;
        }
        index++;
        img.onerror = function(){
            let bak = imgpath-1;
            this.src=this.src.replace('/'+imgpath+'/', '/'+bak+'/');
            if (j==0) {
                $(".main_list").css("background-image", "url("+this.src+")");
            }
            this.onerror=null;
        };
    }
    var linkall = ele.querySelectorAll('a img');
    if (linkall.length != 0) {
        for (var j = 0; j < linkall.length; j++) {
            linkall[j].parentElement.href = 'javascript:void(0);';
        }
    }
}
var textArea = document.querySelector(".article_blogkiji .text_area");
function renderHtml(title, date, week, contentEle){
    textArea.innerHTML = '';
    textArea.appendChild(contentEle);
    $(".article_blogkiji .title a").html(title);
    $(".article_blogkiji .day").text(date + " | " + week);
    new Nogipic().init(textArea);
}
var humanTrans = null;
var humanTransEle = null;
$(document).ready(function () {
    var href = window.location.href;
    var id = href.split("?")[1].split("&")[0].split("=")[1].split("#")[0];
    function getDetailPic(pic, year){
        return pic.replace(/http.*ikuta\.club\/nogizaka\//,'../').replace(/http.*img\.nogizaka46\.com\/www\/smph\/member\/img/, '../image/head').replace(/\/\d{8}\//,'/'+year+'/');
    }
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "../trans/" + id,
        dataType: "json",
        success: function (detail) {
            var date = new Date(detail.date);
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            mon = mon < 10 ? "0" + mon : mon;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var week = date.getDay();
            detail.date = year+'-'+mon+'-'+day+' '+hour+':'+min;
            
            $(".article_blogkiji .author").text(detail.authorName);

            var copy = $.parseHTML(detail.content)[0];
            replaceImgsrc(copy, year, id);
            $(".main_list").css("background-image", "url("+getDetailPic(detail.pic, year)+")");
            $("title").text(detail.title);
            $(".page_title_in .en").text(detail.authorName);
            $(".page_title_in .jp").text(detail.author.toUpperCase());
            $(".article_blogkiji .title a").attr("href", detail.url);
            $(".profile a").attr("href", '../memberBlog.html#name=' + detail.author);
            
            renderHtml(detail.title, detail.date, zh[week], copy);
        }
    });
});

$(".btn-hamburger").on('click', function () {
  if ($(this).hasClass("active")) {
    $(this).parents().find(".header").removeClass("open");
    $(this).removeClass("active")
    $("body").removeClass("hidden");
  } else {
    $(this).parents().find(".header").addClass("open");
    $(this).addClass("active")
    $("body").addClass("hidden");
  }
});
