const assert = require('assert');
const BruteSha256 = require('../brute.js');
const sha256 = new BruteSha256;

describe("sha256", () => { 

	describe("#brute() contract test", () => {

		it("if 'code' or 'letter' empty return 'null'", () => {
			assert.equal(sha256.brute('', ''), null);
		});

		it("if cant find key return 'null'", () =>	 {
			assert.equal(sha256.brute('2cf244', 'asdds'), null);
		});

	})

	describe("#brute(code, letters)", () => {

		let codes = [
		{
			code:'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
			letters:'elloh',
			word:'hello'
		},
		{
			code:'486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7',
			letters:'dlwor',
			word:'world'
		},
		{
			code:'8997fb8c0b5c3a08ec0a7bcbac77dae2074c3cf0eaf0845bcc9e275040c64994',
			letters:'oyfzz',
			word:'fozzy'
		},
		{
			code:'f9194e73f9e9459e3450ea10a179cdf77aafa695beecd3b9344a98d111622243',
			letters:'eroz',
			word:'zero'
		},
		{
			code:'cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944',
			letters:'god',
			word:'dog'
		}];

		for (let i = 0; i < codes.length; i++) {

			let code = codes[i].code;
			let letters = codes[i].letters;
			let result = codes[i].word;

			it(`find key '${result}'`, () => {
				assert.equal(sha256.brute(code, letters), result);
			});

		}
	})

	describe("#bruteFile(fileName, fileDir)", () => {

		let path = 'test/test_files';
		let files =
		[
			'01.sha256',
			'02.sha256',
			'03.sha256',
			'04.sha256',
			'05.sha256'
		];

		for (let i = 0; i < files.length; i++) {

			it(`${files[i]} successfully decoded`, (done) => {
				sha256
					.bruteFile(files[i], path)
					.then(() => done())
					.catch(done);
			});

		}
	})

	describe("#bruteDir(path)", () => {

		let path = 'test/test_files';

		it(`Directory ${path} successfully decoded`, (done) => {
			sha256
				.bruteDir(path)
				.then(() => done())
				.catch(done);
		});

	})
});