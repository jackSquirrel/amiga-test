// Ссылки на медиа
const arrayOfLinks = [
    {
        img: 'images/kot1.jpeg'
    },
    {
        img: 'images/kot2.jpeg'
    },
    {
        video: 'https://www.youtube.com/embed/yboOZb3hxIs?ecver=2&enablejsapi=1',
        thumb: 'https://cdn.kanobu.ru/articles/pics/31b737dc-1fa1-4bc7-b2be-ec2bff621a96.jpg'
    },
    {
        img: 'images/kot3.jpeg'
    },
    {
        video: 'https://www.youtube.com/embed/eID8mesV5PM?ecver=2&enablejsapi=1',
        thumb: 'https://n1s2.hsmedia.ru/ac/f5/0f/acf50f2fe9bbf9c50f1996ea397714eb/386x400_1_bc9b8225a08bf5603e073d4d3bea19fd@800x828_0xac120003_15315877441606203171.jpg'
    },
    {
        img: 'images/kot4.jpeg'
    }
]

// Настройки карусели
const $fotoramaDiv = $('.fotorama').fotorama({
    maxwidth: '100%',
    ratio: 16/9,
    allowfullscreen: 'native',
    nav: 'thumbs',
    swipe: false,
    click: false,
    navwidth: '300px',
    thumbmargin: 10,
    thumbwidth: 80,
    thumbheight: 80,
    auto: false
});

const fotorama = $fotoramaDiv.data('fotorama');

// Получение массива правильного формата для элементов карусели
function getArrayOfLoads(arr) {
    return arr.map(item => {
        if(item.img) {
            return {
                img: item.img,
                thumb: item.thumb
            }
        } else {
            return {
                html: '<iframe width="720" height="405" src="' + item.video + '" frameborder="0" allowfullscreen></iframe>',
                thumb: item.thumb
            }
        }
    })
}

fotorama.load(getArrayOfLoads(arrayOfLinks));

// Остановка видео при перелистывании
$fotoramaDiv.on(
    'fotorama:show',
    function () {
        $('iframe').each(function(){
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
    }
);

// Включение / выключение полного экрана по нажатию
$('.fotorama__stage').click(() => {
    fotorama.fullScreen ? fotorama.cancelFullScreen() : fotorama.requestFullScreen();
});

$('.fotorama__arr').click((e) => {
    e.stopPropagation();
});