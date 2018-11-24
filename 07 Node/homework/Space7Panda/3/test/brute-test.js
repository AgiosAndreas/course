const assert = require('assert');
const bruteSha256 = require('../brute.js')
const sha256 = new bruteSha256;

describe("sha256", function() { 

	let files = [
	{
		name:'file_1',
		code:'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
		letters:'elloh',
		word:'hello'
	},
	{
		name:'file_2',
		code:'486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7',
		letters:'dlwor',
		word:'world'
	},
	{
		name:'file_3',
		code:'8997fb8c0b5c3a08ec0a7bcbac77dae2074c3cf0eaf0845bcc9e275040c64994',
		letters:'oyfzz',
		word:'fozzy'
	},
	{
		name:'file_4',
		code:'f9194e73f9e9459e3450ea10a179cdf77aafa695beecd3b9344a98d111622243',
		letters:'eroz',
		word:'zero'
	},
	{
		name:'file_5',
		code:'cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944',
		letters:'god',
		word:'dog'
	}];

	describe("brute contract", function() {

		it("if 'code' or 'letter' empty return 'null'", function() {
			assert.equal(sha256.brute('', ''), null);
		});

		it("if cant find key return 'null'", function() {
			assert.equal(sha256.brute('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'asdds'), null);
		});

	 })

	describe("sha256.brute(code, letters)", function() {

		for (let i = 0; i < files.length; i++) {

			it(`find key '${files[i].word}'`, function() {
				assert.equal(sha256.brute(files[i].code, files[i].letters), files[i].word);
			});

		}
	})

	describe("sha256.bruteFile(fileName, content)", function() {

		for (let i = 0; i < files.length; i++) {

			it('returns ' + files[i].name + " " + files[i].word + " " + files[i].code, function() {
				assert.equal(sha256.bruteFile(files[i].name, files[i].code + ' ' + files[i].letters), files[i].name + " " + files[i].word + " " + files[i].code);
			});
	
		}

	})
});