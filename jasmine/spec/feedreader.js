/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    it('all have defined non-empty URL', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    it('all have defined non-empty name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  describe('The menu', function() {
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    it('becomes visible when menu icon is clicked and hidden again when icon is clicked again', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      setTimeout(function() {
        done();
      }, 3000);
    });

    it('exist in .feed container after feed is loaded', function(done) {
      expect($('.feed').find('.entry').length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    beforeEach(function(done) {
      setTimeout(function() {
        done();
      }, 1000);
    });

    it('changes feed content when a new feed is loaded', function(done) {
      function isDifferentFeeds(before, after) {
        if (before.length !== after.length) return true;
        for (var i = 0; i < before.length; i++)
          if (before[i] !== after[i]) return true;
        return false;
      }

      var feedsBefore = [];
      $('.feed').find('h2').each(function(idx, h2) {
        feedsBefore.push(h2.textContent);
      });
      loadFeed(1);
      setTimeout(function() {
        var feedsAfter = [];
        $('.feed').find('h2').each(function(idx, h2) {
          feedsAfter.push(h2.textContent);
        });
        expect(isDifferentFeeds(feedsBefore, feedsAfter)).toBe(true);
        loadFeed(0);
        done();
      }, 3000);
    });
  });
}());
