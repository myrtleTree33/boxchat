GARecordPage = function(pageLocation) {
  ga('create', Meteor.settings.public.analyticsSettings['Google Analytics'].trackingId, 'auto');
  ga('send', 'pageview', {
    page: pageLocation
  });
}
