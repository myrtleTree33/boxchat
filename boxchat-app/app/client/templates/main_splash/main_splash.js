/*****************************************************************************/
/* MainSplash: Event Handlers */
/*****************************************************************************/
Template.MainSplash.events({});

/*****************************************************************************/
/* MainSplash: Helpers */
/*****************************************************************************/
Template.MainSplash.helpers({});

/*****************************************************************************/
/* MainSplash: Lifecycle Hooks */
/*****************************************************************************/
Template.MainSplash.onCreated(function() {
});

Template.MainSplash.onRendered(function() {
  $(".splash-tagline").typed({
    strings: ["NUS Forum", "A better IVLE forum for the masses.", "Create forums on the go.", "Community-driven."],
    typeSpeed: 2,
    loop: true,
    backDelay: 1000,
  });
});

Template.MainSplash.onDestroyed(function() {});
