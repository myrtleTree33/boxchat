// to prevent XSS from https://dweldon.silvrback.com/browser-policy

BrowserPolicy.framing.disallow();
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowImageOrigin('*');

var trusted = [
  '*.google-analytics.com',
  '*.google.com',
  '*.facebook.com',
  '*.twitter.com',
  '*.u.nus.edu',
  '*.nus.edu.sg',
  '*.mxpnl.com',
  '*.zendesk.com',
  '*.imgur.com',
  '*.cloudfront.net',
  '*.akamaihd.net',
  'fonts.googleapis.com',
  '*.gstatic.com'
];

_.each(trusted, function(origin) {
  origin = "https://" + origin;
  BrowserPolicy.content.allowOriginForAll(origin);
});
