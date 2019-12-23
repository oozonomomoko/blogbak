var en = {
    1: "Mon",
    2: "Tues",
    3: "Wed",
    4: "Thur",
    5: "Fri",
    6: "Sat",
    0: "Sun"
};
var zh = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    0: "周日"
};

function hasContent(ele, transele) {
    return ele && ele.textContent && ele.textContent.trim();
}

function contactTrans(src, trans) {
    var len = src.childNodes.length;
    if (len == 0) {
        return;
    }
    for (var i = 0; i < len; i++) {
        if ('#text' == src.childNodes[i].nodeName && hasContent(src.childNodes[i],trans.childNodes[i])) {
            src.insertBefore($.parseHTML('<p class="transLine">' + trans.childNodes[i].textContent + '</p>')[0], src.childNodes[i]);
            trans.insertBefore(document.createElement('p'), trans.childNodes[i]);
            i++;
            len++;
        } else {
            contactTrans(src.childNodes[i], trans.childNodes[i])
        }
    }
}
function reloadPath(imgpathBack){
    this.src=imgpathBack;
    this.onerror=null;
}
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
            var newSrc = domain + "blog/" + imgpath + "/" + id + "_" + index + type;
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
var token = null;
var textArea = document.querySelector(".article_blogkiji .text_area");
var titleArea = document.querySelector(".article_blogkiji .title");
function renderHtml(that, title, date, week, contentEle){
    $(".translate span").css('background-color', 'gray');
    $(".translate span")[that].style.backgroundColor = '#c676cc';
    textArea.innerHTML = '';
    if(contentEle)
        textArea.appendChild(contentEle);
    titleArea.innerHTML = title;
    $(".article_blogkiji .day").text(date + " | " + week);
    new Nogipic().init(textArea);
}
var domain;
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
        url: "../data/" + id,
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
            
            if((year+'-'+mon+'-'+day)>'2019-08-08') {
                domain = "http://kakiharuka.gitee.io/blogbak/";
            }else {
                domain = "http://nogizaka.gitee.io/blog/";
            }
            $(".article_blogkiji .author").text(detail.authorName);
            //$(".ptop a")[0].href = detail.url;

            var conEle = $.parseHTML(detail.content)[0];
            replaceImgsrc(conEle, year, id);
            var copy = $.parseHTML(detail.content)[0];
            replaceImgsrc(copy, year, id);
            if (detail.transContent) {
                let ph = $.parseHTML(detail.transContent);
                let transEle = ph.length==1?ph[0]:ph[1];
                replaceImgsrc(transEle, year, id);
                contactTrans(conEle, transEle);
            }
            $(".main_list").css("background-image", "url("+getDetailPic(detail.pic, year)+")");
            $("title").text(detail.title);
            $(".page_title_in .en").text(detail.authorName);
            $(".page_title_in .jp").text(detail.author.toUpperCase());
            $(".profile a").attr("href", '../memberBlog.html#name=' + detail.author);
            
            // 原文
            $(".translate span")[0].onclick = function () {
                renderHtml(0, detail.title, detail.date, en[week], copy);
            };
            if (Boolean(detail.transContent)) {
                // 机翻
                $(".translate span")[1].onclick = function () {
                    renderHtml(1, '<p class="transLine">' + detail.transTitle + '</p>' + detail.title, detail.date, zh[week], conEle);
                };
                
                // 人工翻译
                $(".translate span")[2].onclick = function () {
                    if (!humanTrans) {
                        $.ajax({
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            url: "../trans/" + id,
                            dataType: "json",
                            success: function (trans) {
                                humanTrans = trans;
                                humanTransEle = $.parseHTML(humanTrans.content)[0];
                                replaceImgsrc(humanTransEle, year, id);
                                renderHtml(2, humanTrans.title, detail.date, zh[week], humanTransEle);
                            },
                            error: function (){
                                toEdit('<p class="transLine">' + detail.transTitle + '</p>' + detail.title,detail.date,week,conEle);
                            }
                        });
                    }else{
                        renderHtml(2, humanTrans.title, detail.date, zh[week], humanTransEle);
                    }
                };
                // 人工翻译 修改
                $(".humantrans a").click(function () {
                     $.ajax({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        url: "../trans/" + id,
                        dataType: "json",
                        success: function (trans) {
                            humanTrans = trans;
                            humanTransEle = $.parseHTML(humanTrans.content)[0];
                            replaceImgsrc(humanTransEle, year, id);
                            toEdit(humanTrans.title,humanTrans.date,week,humanTransEle);
                        },
                        error: function (){
                            toEdit('<p class="transLine">' + detail.transTitle + '</p>' + detail.title,detail.date,week,conEle);
                        }
                    });
                    
                });
                // 保存
                $(".translate span")[3].onclick = function () {
                    if (!token) 
                        token = prompt('输入口令', '');
                    if (!token) {
                        alert('提交失败');
                        return;
                    }
                    if(!textArea.innerHTML) {
                        alert('提交失败,内容为空');
                        return;
                    }
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/nogizaka/message/humanTrans.do",
                        data: JSON.stringify({
                            author: token,
                            id: id,
                            title: titleArea.innerHTML,
                            content: textArea.innerHTML
                        }),
                        dataType: "json",
                        success: function (data) {
                            if(data.result) {
                                $(".translate span")[3].style.display = 'none';
                                titleArea.style.webkitUserModify = '';
                                textArea.style.webkitUserModify = '';
                                alert('保存成功');
                            } else {
                                alert(data.msg);
                            }
                        },
                        error: function (){
                            alert('保存异常');
                        }
                    });
                };
                
                renderHtml(1, '<p class="transLine">' + detail.transTitle + '</p>' + detail.title, detail.date, zh[week], conEle);
            } else {
                renderHtml(0, detail.title, detail.date, en[week], copy);
                $(".translate span")[1].style.display = 'none';
                $(".translate span")[2].style.display = 'none';
            }
        }
    });
});
function toEdit(title,date,week,conEle){
    token = prompt('输入口令', '');
    if (!token) return;
    
     $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "/nogizaka/message/checkToken.do?token=" + token,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.result){
                titleArea.style.webkitUserModify = 'read-write-plaintext-only';
                textArea.style.webkitUserModify = 'read-write-plaintext-only';
                renderHtml(2, title, date, zh[week], conEle);
                //显示保存按钮
                $(".translate span")[3].style.display = '';
            } else {
                alert('口令错误');
            }
        }
     });
}
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
