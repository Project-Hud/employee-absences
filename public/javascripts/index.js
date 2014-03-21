(function () {



/*var position = $('.sliderOne__title').offset();
var positionLeft = position.left*/

/*if (positionLeft > 140){
  slideRight()
}*/
/*
setInterval(function(){
  slideLeft()
}, 5000)

setInterval(function(){
  slideRight()
}, 10000)*/


numberOfSlides = $('.slider--slide').length


sliderWidth = 300
currentSlide = 0

containerWidth = sliderWidth * numberOfSlides

numberOfDays = 1 + Math.floor(Math.random() * 6)

$('.slider-container').css("width", containerWidth)



function slideTo(num){
  $('.slider-container').animate({left: -(sliderWidth * num / 2)})
  currentSlide = num
}

for (var i = 0; i < numberOfSlides; i++) {
  $('.controls').append('<li></li>')

}

$('.days-left').text(numberOfDays)

function slideNext(){
  if(currentSlide === (numberOfSlides - 1)) {
    slideTo(0)
  } else {
    slideTo(currentSlide + 1)

  }
}


function slidePrev(){
  slideTo(currentSlide - 1)
}

function changeOpacity(){
  $('.title__holiday').animate({opacity: 1})
}

setInterval(function (){
  slideNext()
}, 5000)






  // function hide($el) {
  //   $el.fadeOut()
  // }

  // function show($el) {
  //   $el.fadeIn()
  // }

  // function next() {
  //   var $currentPanel = $('.js-panel:visible')
  //     , $upcomingPanel = $currentPanel.next('.js-panel')

  //   if ($upcomingPanel.length === 0) {
  //     $upcomingPanel = $('.js-panel:first-child')
  //   }

  //   hide($currentPanel)
  //   show($upcomingPanel)
  // }

  // setInterval(next, 5000)

})()
