'use strict';
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";
import jQuery from 'jquery';
const { minify } = require("terser");


import "bootstrap/dist/css/bootstrap.min.css";


jQuery(function() {
  const doMinify = async function() {
    const code = jQuery("#bookmarklet-script").val();
    const result = await minify(code, {sourceMap: false});
    console.log(result, result.code);
    const minified = `javascript:(function() {${encodeURIComponent(result.code)}})();`;
    console.log(minified);
    const outputArea = jQuery("#output-area");
    outputArea.empty();
    const a = jQuery('<a />').addClass("btn").addClass("btn-success").attr('href', minified).text(jQuery('#bookmarklet-name').val());
    const helpText = jQuery('<small />').text('これをブックマークツールバーにドラッグ&ドロップ');
    outputArea.append(jQuery('<hr />'));
    outputArea.append(a);
    outputArea.append(helpText);
  };
  jQuery("#btn-convert").on("click", function(e) {
      e.preventDefault();
      doMinify();
  });
});

