// to prevent XSS from https://dweldon.silvrback.com/browser-policy

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
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
  '*.akamaihd.net'
];

_.each(trusted, function(origin) {
  origin = "https://" + origin;
  BrowserPolicy.content.allowOriginForAll(origin);
});
