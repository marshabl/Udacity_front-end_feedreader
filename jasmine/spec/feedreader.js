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



        // test that allFeeds has a URL and is defined
        it('URL are defined and not 0', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        // tests that allFeeds has a name and is defined
        it('Name are defined and not 0', function() {
             for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
             }
         });
    });

    // tests that the menu icon, when clicked, displays feed options
    // and when clicked again, hides feed options.
    // test uses the menu-hidden class linked to body element
    describe('the menu', function() {
        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        it('is hidden', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        it('is displayed and hides', function() {
            menu.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(true);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    // tests initial entries actually exist when the loadFeed function is called
    // test uses the feed class in the container to look for entries after
    // loadFeed() has been called
    describe('Initial Entries', function() {
        let entries;

        beforeEach(function(done) {
            loadFeed(0, function() {
              entries = document.querySelectorAll('.feed .entry');
              done();
            });
        });

        it('contains a single entry element', function() {
            expect(entries[0]).toBeDefined();
        });

    });

    // test that when loadFeed() is called multiple times, the function calls
    // different Feeds.
    // Test compares loadFeed() from different starting indexes
    describe('New Feed Selection', function() {
        let firstFeedEntryOne;
        let secondFeedEntryOne;

        beforeEach(function(done) {
            loadFeed(0, function() {
              firstFeedEntryOne = document.querySelector('.feed .entry').innerHTML;

              loadFeed(1, function() {
                secondFeedEntryOne = document.querySelector('.feed .entry').innerHTML;
                done();
              });
            });
        });

        it('actually changes', function() {
            expect(firstFeedEntryOne).not.toEqual(secondFeedEntryOne);
        });

    });


}());
