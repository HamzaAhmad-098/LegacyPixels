!function() {
  "use strict";
  ElementsKit_Helper.registerWidget("elementskit-funfact.default", function(e) {
    var t = e.find(".elementskit-funfact");
    ElementsKit_Helper?.observeElement(t[0], function() {
      t.find(".number-percentage").each(function() {
        var a = jQuery(this), n = a.data("style"), i = a.data("value"), r = a.data("animation-duration") || 2800;
        if ("static" === n) {
          a.animateNumbers(i, true, r);
        } else if (window.Odometer) {
          new Odometer({ el: a[0], value: 0, duration: r }).update(i);
        }
      });
    });
  });
}();
