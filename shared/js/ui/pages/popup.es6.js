const Parent = window.DDG.base.Page
const mixins = require('./mixins/index.es6.js')
const TopBlockedView = require('./../views/top-blocked-truncated.es6.js')
const TopBlockedModel = require('./../models/top-blocked.es6.js')
const topBlockedTemplate = require('./../templates/top-blocked-truncated.es6.js')
const SiteView = require('./../views/site.es6.js')
const SiteModel = require('./../models/site.es6.js')
const siteTemplate = require('./../templates/site.es6.js')
const BackgroundMessageModel = require('./../models/background-message.es6.js')

function Trackers (ops) {
  this.$parent = window.$('#popup-container')
  Parent.call(this, ops)
}

Trackers.prototype = window.$.extend({},
  Parent.prototype,
  mixins.setBrowserClassOnBodyTag,
  {

    pageName: 'popup',

    ready: function () {
      Parent.prototype.ready.call(this)
      this.message = new BackgroundMessageModel()
      this.setBrowserClassOnBodyTag()

      this.views.site = new SiteView({
        pageView: this,
        model: new SiteModel(),
        appendTo: this.$parent,
        template: siteTemplate
      })

      this.views.topblocked = new TopBlockedView({
        pageView: this,
        model: new TopBlockedModel({numCompanies: 3}),
        appendTo: this.$parent,
        template: topBlockedTemplate
      })

      // TODO: hook up model query to actual ddg ac endpoint.
      // For now this is just here to demonstrate how to
      // listen to another component via model.set() +
      // store.subscribe()
      // this.views.autocomplete = new AutocompleteView({
      //   pageView: this,
      //   model: new AutocompleteModel({suggestions: []}),
      //   // appendTo: this.views.search.$el,
      //   appendTo: null,
      //   template: autocompleteTemplate
      // })
    }
  }
)

// kickoff!
window.DDG = window.DDG || {}
window.DDG.page = new Trackers()
