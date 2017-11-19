"use strict";

const cardArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bomb',
    'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o',  'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];


//随机获取数组中的一个元素
var randomCards = function (cardsArray) {
    cardsArray.sort(function(){ return 0.5 - Math.random() });
    return cardsArray;
};

var start_time = 0;
var flag = 0;


var setUlHtml = function (cardsArray) {
    let openCount = 0;
    let totalCount = 0;
    let movesEle = document.getElementsByClassName('moves');
    movesEle[0].innerHTML = totalCount;
    let ulStr = '';
    for (let i=0; i<cardsArray.length; i++){
        ulStr += '<li class="card"><i class="fa '+ cardsArray[i] +'"></i></li>';
    }
    let cardGame = document.getElementsByClassName('deck');
    cardGame[0].innerHTML = ulStr;
    let cardTransform = document.getElementsByClassName('card');

    for (let j=0; j<cardsArray.length; j++){
        cardTransform[j].onclick = function (e) {
            //开始计算游戏时间
            if(flag === 0) {
                window['cardTimer'] = setInterval(function () {
                    start_time += 1;
                    let timeElem = document.getElementById('time');
                    timeElem.innerHTML = start_time.toString() + "s";
                }, 1000);
                flag = 1;
            }
            //卡片未打开或未匹配
            if(e.target.className.indexOf('open') === -1 && e.target.className.indexOf('match') === -1){
                openCount ++;
                if (openCount % 2 ===1){
                    e.target.className = 'card trans open show';
                }else {
                     totalCount ++;
                     //星级评定
                     if(totalCount*1.0 /openCount < 4){
                            let stsNumChanged = '<li><i class="fa fa-star"></i></li>';
                            stsNumChanged +='<li><i class="fa fa-star"></i></li>';
                            stsNumChanged += '<li><i class="fa fa-star"></i></li>';
                            let starsNChange = document.getElementsByClassName('stars');
                            starsNChange[0].innerHTML = stsNumChanged;
                     }else if(totalCount*1.0/openCount >= 4 && totalCount*1.0/openCount < 8){
                         console.log(openCount)
                        let stsNumChanged = '<li><i class="fa fa-star"></i></li>';
                            stsNumChanged +='<li><i class="fa fa-star"></i></li>';
                            stsNumChanged += '<li><i class="fa fa-star-o"></i></li>';
                            let starsNChange = document.getElementsByClassName('stars');
                            starsNChange[0].innerHTML = stsNumChanged;
                    }else{
                        let stsNumChanged = '<li><i class="fa fa-star"></i></li>';
                        stsNumChanged +='<li><i class="fa fa-star-o"></i></li>';
                        stsNumChanged += '<li><i class="fa fa-star-o"></i></li>';
                        let starsNChange = document.getElementsByClassName('stars');
                        starsNChange[0].innerHTML = stsNumChanged;
                     }

                    let movesEle = document.getElementsByClassName('moves');
                    movesEle[0].innerHTML = totalCount;
                    let preClick = document.getElementsByClassName('open');

                    //匹配成功
                    if (preClick[0].childNodes[0].classList[1] === e.target.childNodes[0].classList[1]){
                        preClick[0].className = 'card matchtrans match';
                        e.target.className = 'card matchtrans match';
                        setTimeout(function () {
                            //游戏结束
                            if(openCount === 16){
                                clearInterval(window['cardTimer']);
                                flag = 0;
                                let totaltimeElem = document.getElementById('time');
                                alert('恭喜你完成游戏，翻转总次数为：'+totalCount +'。 总用时为:' + totaltimeElem.innerHTML);

                                //时间清0
                                totaltimeElem.innerHTML ="0s";
                                return;
                            }
                        }, 800)
                    }else{ //匹配不成功
                        openCount -= 2;
                        preClick[0].className = 'card unmatchtrans unmatch';
                        e.target.className = 'card unmatchtrans unmatch';
                        setTimeout(function () {
                            let unmatchNode = document.getElementsByClassName('unmatch');
                            unmatchNode[0].className = 'card trans';
                            unmatchNode[0].className = 'card trans';
                        }, 800)
                    }
                }
            }
        };
    }

};


var shuffleCards  = function () {
    let dstCardsArray = randomCards(cardArray);
    setUlHtml(dstCardsArray);
};

shuffleCards();

/**游戏重启**/
document.getElementById('restartGame').onclick = function (e) {
    start_time =0;
    shuffleCards();



};