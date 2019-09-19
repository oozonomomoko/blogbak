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
    return ele && ele.textContent && ele.textContent.trim() && ele.textContent != transele.textContent;
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
function renderHtml(that, title, date, week, contentEle){
    $(".translate span").css('background-color', 'gray');
    that.style.backgroundColor = '#c676cc';
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
        url: "../data/" + id,
        dataType: "json",
        success: function (detail) {
        //var detail={"author":"mayu.tamura","authorName":"田村真佑","content":"<div class=\"entrybodyin\">\n\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">       <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">こんにちは、田村真佑です(</span><span class=\"s2\">๑</span><span class=\"s3\">˃̵ᴗ˂̵)</span></span></p> <br><p></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\">乃木坂結成8年目ですね＊*</p><p class=\"p2\">こんな素敵なグループの一員になれたこと</p><p class=\"p2\">素敵な先輩方に出会えたこと</p><p class=\"p2\">素敵なファンの皆様に出会えたこと</p><p class=\"p2\">全てに感謝して</p><p class=\"p2\">これからも乃木坂46の一員として</p><p class=\"p2\">頑張っていきます！</p><p class=\"p2\">これからも宜しくお願いします！</p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\">そして</p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">最近はコミニケーション能力が</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">ぐんぐん上がって</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">自分から積極的に先輩方に</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">声をかけられるようになりました(　</span><span class=\"s4\">˙-˙</span><span class=\"s1\">　)</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">うふふ</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">特に仲良しになったのが、</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">みんなだれか分かるかな〜？</span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><br></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">そうです！しおちゃんこと久保史緒里さんです</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">まさかこんなにお話しできるようになるとは</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">思ってなかったのですが</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">いつのまにかふざけ合う仲になりました(</span><span class=\"s4\">〃ω〃</span><span class=\"s1\">)</span><span class=\"s5\">♡</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">しおちゃんって私だけの呼び方だから</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">みんな呼んだらダメだからね！！</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">田村禁止令だしときます(</span><span class=\"s4\">´</span><span class=\"s6\">⊙</span><span class=\"s4\">ω</span><span class=\"s6\">⊙</span><span class=\"s4\">`</span><span class=\"s1\">)</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">自分から抱きつきに行ける先輩が</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">出来たことを私は嬉しく思います</span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><img src=\"https://img.nogizaka46.com/blog/fourth/img/2019/08/21/5656848/0000.jpeg\" alt=\"image3.jpeg\" id=\"62958542-B4D1-4CDE-87FF-037AA81175E5\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p> <p class=\"p2\">キメキメの私たち</p><p class=\"p2\">凛々しい顔してるな〜</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\">しおちゃん大好きです。</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\">まだまだ抱きつきたいなぁって思ってる先輩が</p><p class=\"p2\">たくさんいるので、</p><p class=\"p2\">これから徐々に抱きつける先輩を</p><p class=\"p2\">増やしていけたらなと思います(〃ω〃)</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">そして全国ツアー大阪！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">残念ながら台風の影響で</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">一日のみのライブになってしまったのですが</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">二日目が出来なくなってしまった分も</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">一日で全てを出し切りました！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">観に来てくださった皆様</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">ありがとうございました！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">次は神宮ですよ！！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">全国ツアー最後の場所なので</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">皆さんも一緒に楽しみましょうね(</span><span class=\"s4\">● </span><span class=\"s3\">˃̶͈̀</span><span class=\"s1\">ロ</span><span class=\"s3\">˂̶͈́)</span><span class=\"s7\">੭</span><span class=\"s8\">ꠥ</span><span class=\"s4\">⁾⁾</span></span></p><p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"><br></span></span></p><p class=\"p1\"><img src=\"https://img.nogizaka46.com/blog/fourth/img/2019/08/21/5656848/0001.jpeg\" alt=\"image1.jpeg\" id=\"3D5A317F-591A-4869-A6A8-04118A45E8F8\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"><br></span></span></p> <p class=\"p2\">↑撮影者はゆりちゃんです！</p><p class=\"p2\">&nbsp; &nbsp;ゆりちゃんありがとう(*´꒳`*)</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><br><p></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">ここで４期生ツーショットコーナーです！</span></p><p class=\"p1\">と言いたいところなんですけど</p><p class=\"p1\">やくぼちゃんとの写真が</p><p class=\"p1\">2人ともなかなか斬新なお顔だったので</p><p class=\"p1\">やくぼちゃんの私的解釈をお伝えして</p><p class=\"p1\">写真はしっかりキメキメで撮ったやつを</p><p class=\"p1\">次回載せますね(　˙-˙　)</p><p class=\"p1\">ごめんなさいーーー</p><p class=\"p1\">という事で、</p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">今回のメンバーは矢久保美緒ちゃん！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">やくぼちゃんは見た目は可愛いのに</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">意外としっかりしてるし</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">自分の芯がしっかりしてる子だなと</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">思うんです。</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">私だけかな？？</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">あといっつもタピオカを持ってるな、、</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">今度やくぼちゃんに</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">美味しいタピオカ屋さんに</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">連れてってもらおーっと(</span><span class=\"s4\">*´</span><span class=\"s9\">꒳</span><span class=\"s4\">`*</span><span class=\"s1\">)</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\">最近自撮り系をあまり</p><p class=\"p2\">載せてなかったので</p><p class=\"p2\">今回は自分をたくさん載せました(　˙-˙　)</p><p class=\"p2\">私だらけのブログになっちゃったけど</p><p class=\"p2\">許してね。。。:;(∩´﹏`∩);:</p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">明日はわたしのあやめんだよ</span><span class=\"s10\">٩(</span><span class=\"s2\">๑</span><span class=\"s4\">❛</span><span class=\"s3\">ᴗ</span><span class=\"s4\">❛</span><span class=\"s2\">๑)</span><span class=\"s10\">۶</span></span></p><div dir=\"ltr\"></div></div></div></div></div></div>  \t\t</div>","date":"2019-08-21 12:06","haveTrans":false,"id":52231,"pic":"https://ikuta.club/nogizaka/blog/2019/52231_0.jpeg","title":"実は大好きなんです。 田村真佑","transContent":"<div class=\"entrybodyin\">\n\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><div dir=\"ltr\"><span></span></div><div dir=\"ltr\"><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">       <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">你好，我是田村真佑</span><span class=\"s2\">3665;</span><span class=\"s3\">怆821;)</span></span></p> <br><p></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\">乃木坂结成8年了吧**</p><p class=\"p2\">能够成为这样优秀的团体的一员</p><p class=\"p2\">能遇到这么棒的前辈们</p><p class=\"p2\">能遇到这么棒的fans们</p><p class=\"p2\">感谢一切</p><p class=\"p2\">今后作为乃木坂46的一员</p><p class=\"p2\">我会加油的！</p><p class=\"p2\">今后也请多多关照！</p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\">然后呢</p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">最近交流能力很强。</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">不断上升</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">自己主动对前辈们说</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">变得能打招呼了(</span><span class=\"s4\">˙-￣</span><span class=\"s1\">)</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">风扇</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">关系特别好的是，</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">大家知道是谁吗？</span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><br></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">是的！我是久保史绪里小姐</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">万没想到会讲这么多话</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">虽然没有想到</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">不知不觉就变成了互相开玩笑的关系(</span><span class=\"s4\">〃ω〃</span><span class=\"s1\">）</span><span class=\"s5\">♡</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">因为Shio酱是只属于我的称呼</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">叫大家来可不行啊！！</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">下达田村禁止令</span><span class=\"s4\">´</span><span class=\"s6\">系数</span><span class=\"s4\">ω</span><span class=\"s6\">系数</span><span class=\"s4\">`</span><span class=\"s1\">）</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">能自己抱着前辈</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">能够做到这一点我感到很高兴</span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><img src=\"https://img.nogizaka46.com/blog/fourth/img/2019/08/21/5656848/0000.jpeg\" alt=\"image3.jpeg\" id=\"62958542-B4D1-4CDE-87FF-037AA81175E5\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p> <p class=\"p2\">心跳的我们</p><p class=\"p2\">一副威风凛凛的脸啊~</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\">最喜欢小紫了。</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\">还想抱著我的前辈</p><p class=\"p2\">因为有很多，</p><p class=\"p2\">从现在开始慢慢抱住前辈</p><p class=\"p2\">我想如果能增加就好了(〃ω〃)</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">然后全国巡演大阪！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">遗憾的是受台风的影响</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">成为了只一日的实况录音,不过</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">第二天不能完成的部分</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">一天就全部拿出来了！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">前来观看的各位</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">谢谢大家了！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">接下来是神宫哦！！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">因为是全国巡演的最后场所</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">大家也一起期待吧</span><span class=\"s4\">●</span><span class=\"s3\">伤822;840;768;</span><span class=\"s1\">罗</span><span class=\"s3\">¶822;840;)</span><span class=\"s7\">2669;</span><span class=\"s8\">43045;</span><span class=\"s4\">8318;8318;</span></span></p><p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"><br></span></span></p><p class=\"p1\"><img src=\"https://img.nogizaka46.com/blog/fourth/img/2019/08/21/5656848/0001.jpeg\" alt=\"image1.jpeg\" id=\"3D5A317F-591A-4869-A6A8-04118A45E8F8\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"><br></span></span></p> <p class=\"p2\">↑摄影者是小百合！</p><p class=\"p2\">谢谢小百合(*´42163;`*)</p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><p class=\"p2\"><br></p><br><p></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">这里是4期生合影角！</span></p><p class=\"p1\">虽然很想说</p><p class=\"p1\">和小鬼的照片</p><p class=\"p1\">因为2人都是相当崭新的脸</p><p class=\"p1\">请转达我个人的解释</p><p class=\"p1\">照片是好好地心动拍摄的</p><p class=\"p1\">下次登载吧(〓-￣)</p><p class=\"p1\">对不起.</p><p class=\"p1\">就是这样，</p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">这次的成员是矢久保美绪！</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">小鬼的外表明明很可爱</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">意外的很坚强</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">自己内心很坚强的孩子啊</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">我想。</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">只有我吗？</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">再有一个木薯淀粉呢。</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">这次小鬼</span></p> <p class=\"p1\"><span class=\"s1\" style=\"background-color: rgba(255, 255, 255, 0);\">好吃的木薯淀粉店</span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">请带我去！</span><span class=\"s4\">*´</span><span class=\"s9\">42163;</span><span class=\"s4\">`*</span><span class=\"s1\">）</span></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p><p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><br></span></p><p class=\"p2\">最近不太喜欢自拍</p><p class=\"p2\">因为没有登载</p><p class=\"p2\">这次登载了很多自己(〓-￣)</p><p class=\"p2\">虽然变成了只有我的博客</p><p class=\"p2\">原谅我吧。。。:;(∩´﹏`∩);：</p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p2\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s4\"></span><br></span></p> <p class=\"p1\"><span style=\"background-color: rgba(255, 255, 255, 0);\"><span class=\"s1\">明天就是我的死心了</span><span class=\"s10\">琥珀</span><span class=\"s2\">3665;</span><span class=\"s4\">10075;</span><span class=\"s3\">嗳</span><span class=\"s4\">10075;</span><span class=\"s2\">3665;</span><span class=\"s10\">大拇指</span></span></p><div dir=\"ltr\"></div></div></div></div></div></div>  \t\t</div>","transTitle":"其实我很喜欢。田村真佑","url":"http://blog.nogizaka46.com/fourth/smph/2019/08/052231.php"};
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
            $(".article_blogkiji .title a").attr("href", detail.url);
            $(".profile a").attr("href", '../memberBlog.html#name=' + detail.author);
            
            // 原文
            $(".translate span")[0].onclick = function () {
                renderHtml(this, detail.title, detail.date, en[week], copy);
            };
            if (Boolean(detail.transContent)) {
                // 机翻
                $(".translate span")[1].onclick = function () {
                    renderHtml(this, '<p class="transLine">' + detail.transTitle + '</p>' + detail.title, detail.date, zh[week], conEle);
                };
                
                // 人工翻译
                $(".translate span")[2].onclick = function () {
                    var human = this;
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
                                renderHtml(human, humanTrans.title, detail.date, zh[week], humanTransEle);
                            },
                            error: function (){
                                if(!confirm('还没人翻译, 要不要翻一个?')){
                                    return;
                                }
                                toEdit();
                            }
                        });
                    }else{
                        renderHtml(human, humanTrans.title, detail.date, zh[week], humanTransEle);
                    }
                };
                
                $(".translate span")[1].click();
            } else {
                $(".translate span")[0].click();
                $(".translate span")[1].style.display = 'none';
                $(".translate span")[2].style.display = 'none';
            }
        }
    });
});
function toEdit(){
    var pass = prompt('输入口令', '');
    if (!pass) return;
    
     $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "message/checkToken.do?pass=" + pass,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.result){
                textArea.css('user-modify', 'read-write-plaintext-only');
                renderHtml(this, '<p class="transLine">' + detail.transTitle + '</p>' + detail.title, detail.date, zh[week], conEle);
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
