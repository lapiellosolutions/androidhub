class App
  ES6Promise.polyfill()
  FastClick.attach document.body

  lazySizesConfig.loadMode = 1
  lazySizesConfig.expand = 100
  lazySizesConfig.preloadAfterLoad = false

  document.addEventListener 'lazybeforeunveil', (e) ->
    bg = e.target.getAttribute 'data-bg'
    if bg
      e.target.style.backgroundImage = "url(#{bg})"
      e.target.removeAttribute 'data-bg'