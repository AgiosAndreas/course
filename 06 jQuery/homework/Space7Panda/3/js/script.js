$(function(){
  $('.thumbnails a').click(function(){                                 // При нажатиина миниатюру
    var images = $(this).find('img');
    var imgSrc = images.attr('src');
 
    $(".big-image img").attr({ src: imgSrc });                         // Подменяем адрес большого изображения на адрес выбранного
    $(this).siblings('a').removeClass('active');                       // Удаляем класс .active со ссылки чтоб убрать рамку
    images.parent().addClass('active');                                // Добавляем класс .active на выбранную миниатюру
    return false;
  });
 
  $('.next').click(function(){                                         // При нажатии на кнопку "вперед"
    var count = $('.thumbnails a').length;                             // Общее количество изображений
    var n = parseInt($('.thumbnails a').index($('.active')) + 1);      // Порядковый номер текущего изображения
    var activeImg = $('.thumbnails .active');                          // Активное на данный момент изображение
    var nextSrc;
 
    if (count != n){                                                   // - Если изображение не последнее
      nextSrc = activeImg.next().find('img').attr('src');              // В переменную записывается адрес следующего изображения
      $('.thumbnails .active').removeClass('active');                  // Удаляется класс .active с предыдущей миниатюры
      activeImg.next().addClass('active');                             // На миниатюру следующего изображения вешается класс .active
    }else{                                                             // - Если текущее изображение последнее в списке
      nextSrc = $('.thumbnails a').first().find('img').attr('src');    // В переменную записывается адрес первого изображения
      $('.thumbnails .active').removeClass('active');                  // Удаляется класс .active с предыдущей миниатюры
      $('.thumbnails a').first().addClass('active');                   // На первую миниатюру вешается класс .active
    }
    $('.big-image img').attr({ src: nextSrc });                        // Подменяем адрес большого изображения на адрес следующего
    return false;
  });
 
 
  $('.prev').click(function(){                                         // При нажатии на кнопку "назад"
    var count = $('.thumbnails a').length;                             // Общее количество изображений
    var n = parseInt($('.thumbnails a').index($('.active')) + 1);      // Порядковый номер текущего изображения
    var activeImg = $('.thumbnails .active');                          // Активное на данный момент изображение
    var prevSrc;
 
    if (n != 1){                                                       // - Если текущее изображение не первое
      prevSrc = activeImg.prev().find('img').attr('src');              // В переменную записывается адрес предыдущего изображения           
      $('.thumbnails .active').removeClass('active');                  // Удаляется класс .active активной до этого миниатюры
      activeImg.prev().addClass('active');                             // На миниатюру изображения слева вешается класс .active
    }else{                                                             // - Если текущее изображение первое
      prevSrc = $('.thumbnails a:last').find('img').attr('src');       // В переменную записывается адрес последнего изображения
      $('.thumbnails .active').removeClass('active');                  // Удаляется класс .active с предыдущей миниатюры
      $('.thumbnails a:last').addClass('active');                      // На последнюю миниатюру вешается класс .active
    }
    $('.big-image img').attr({ src: prevSrc });                        // Подменяется адрес большого изображения на адрес следующего
    return false;
  });
})