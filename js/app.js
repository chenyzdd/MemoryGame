const cardArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bomb',
    'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o',  'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];

var randomCards = function (cardsArray) {
    cardsArray.sort(function(){ return 0.5 - Math.random() });
    return cardsArray;
};

var openCount = 0;
var totalCount = 0;

var setUlHtml = function (cardsArray) {
    openCount = 0;
    totalCount = 0;
    var movesEle = document.getElementsByClassName('moves');
    movesEle[0].innerHTML = totalCount;
    var ulStr = '';
    for (var i=0; i<cardsArray.length; i++){
        ulStr += '<li class="card"><i class="fa '+ cardsArray[i] +'"></i></li>';
    }
    var cardGame = document.getElementsByClassName('deck');
    cardGame[0].innerHTML = ulStr;
    var cardTransform = document.getElementsByClassName('card');
    for (var j=0; j<cardsArray.length; j++){
        cardTransform[j].onclick = function (e) {
            if(e.target.className.indexOf('open') == -1 && e.target.className.indexOf('match') == -1){
                openCount ++;
                if (openCount % 2 == 1){
                    e.target.className = 'card trans open show';
                }else {
                    totalCount ++;
                    var movesEle = document.getElementsByClassName('moves');
                    movesEle[0].innerHTML = totalCount;
                    var preClick = document.getElementsByClassName('open');
                    if (preClick[0].childNodes[0].classList[1] == e.target.childNodes[0].classList[1]){
                        preClick[0].className = 'card matchtrans match';
                        e.target.className = 'card matchtrans match';
                        setTimeout(function () {
                            if(openCount == 16){
                                alert('恭喜你完成游戏，翻转总次数为：'+totalCount);
                                return;
                            }
                        }, 800)
                    }else{
                        openCount -= 2;
                        preClick[0].className = 'card unmatchtrans unmatch';
                        e.target.className = 'card unmatchtrans unmatch';
                        setTimeout(function () {
                            var unmatchNode = document.getElementsByClassName('unmatch');
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
    var dstCardsArray = randomCards(cardArray);
    setUlHtml(dstCardsArray);
};

shuffleCards();

document.getElementById('restartGame').onclick = function (e) {
    shuffleCards();
};