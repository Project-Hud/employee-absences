(function () {

  function hide($el) {
    $el.fadeOut()
  }

  function show($el) {
    $el.fadeIn()
  }

  function next() {
    var $currentPanel = $('.js-panel:visible')
      , $upcomingPanel = $currentPanel.next('.js-panel')

    if ($upcomingPanel.length === 0) {
      $upcomingPanel = $('.js-panel:first-child')
    }

    hide($currentPanel)
    show($upcomingPanel)
  }

  setInterval(next, 5000)

})()
