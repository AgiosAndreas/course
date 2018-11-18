const assert = require('assert');
const bruteSha256 = require('../brute.js')
const sha256 = new bruteSha256;

const file_1 = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 elloh";
const file_2 = "486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7 dlwor";
const file_3 = "9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0 llun";
const file_4 = "9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0 aaa";
const file_5 = "8997fb8c0b5c3a08ec0a7bcbac77dae2074c3cf0eaf0845bcc9e275040c64994 oyfzz";


describe("sha256", function() { 
	describe("sha256.brute(code, letters)", function() {

		it("if 'code' or 'letter' empty return 'null'", function() {
			assert.equal(sha256.brute('', ''), null);
		});

		it("if cant find key return 'null'", function() {
			assert.equal(sha256.brute('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'asdds'), null);
		});

		it("find key 'hello'", function() {
			assert.equal(sha256.brute('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'elloh'), 'hello');
		});

		it("find key 'world'", function() {
			assert.equal(sha256.brute('486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7', 'dlwor'), 'world');
		});

		it("find key 'aaa'", function() {
			assert.equal(sha256.brute('9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0', 'aaa'), 'aaa');
		});

		it("find key 'fozzy'", function() {
			assert.equal(sha256.brute('8997fb8c0b5c3a08ec0a7bcbac77dae2074c3cf0eaf0845bcc9e275040c64994', 'oyfzz'), 'fozzy');
		});

	})

	describe("sha256.bruteFile(fileName, content)", function() {

		it("if 'fileName' or 'content' != string return 'null'", function() {
			assert.equal(sha256.bruteFile(123, file_1), null);
		});

		it("successfully returns 'filename + key + code' for file_1", function() {
			assert.equal(sha256.bruteFile('file_1', file_1), 'file_1 hello 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
		});

		it("successfully returns 'filename + key + code' for file_2", function() {
			assert.equal(sha256.bruteFile('file_2', file_2), 'file_2 world 486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7');
		});

		it("if cant find key returns 'filename + (null) + code'", function() {
			assert.equal(sha256.bruteFile('file_3', file_3), 'file_3 null 9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0');
		});

		it("successfully returns 'filename + key + code' for file_4", function() {
			assert.equal(sha256.bruteFile('file_4', file_4), 'file_4 aaa 9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0');
		});

		it("successfully returns 'filename + key + code' for file_5", function() {
			assert.equal(sha256.bruteFile('file_5', file_5), 'file_5 fozzy 8997fb8c0b5c3a08ec0a7bcbac77dae2074c3cf0eaf0845bcc9e275040c64994');
		});
	})
})