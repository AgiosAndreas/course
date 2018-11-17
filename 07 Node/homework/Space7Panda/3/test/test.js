const assert = require('assert');
const bruteSha256 = require('../brute.js')
const sha256 = new bruteSha256;

describe("sha256", function() { 
	describe(".brute", function() {

		it(".brute hello", function() {
			assert.equal(sha256.brute('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'elloh'), 'hello');
		});

		it("error on .brute return null", function() {
			assert.equal(sha256.brute('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', ''), null);
		});
	})

	describe(".bruteFile", function() {
		it(".bruteFile hello", function() {
			assert.equal(sha256.bruteFile('./hashes', '01.sha256'), 's');
		});
	})

	describe(".brute", function() {})

})