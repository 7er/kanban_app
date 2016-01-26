var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

describe('basic test', function () {
  it('should be on correct page', function (done) {
    driver.get('http://localhost:8080');
    driver.getTitle().then(function(title) {
      expect(title).toBe('Kanban app');      
      done();
    });
  });
});

