
var assert = require('assert');

describe('user login', function(){
	describe('login', function(){
		it('should return -1 when the user dosent exist in the database', function(){
			var bob = null;
			assert.equal(bob.login(), -1);
		});
		it('should return the user id when the user exists in the database', function(){
			var bob = new User(1234);
			assert.equal(bob.login(), 1234);
		});
	});
	
});

describe('admin abilities',function(){
	describe('deleate recording', function(){
		it('should deleate the recording from the database when an admin has privilige to deleate the recording', function(){
			var bob = new Admin(1);
			var recording = new Recoding();
			assert.equal(bob.removeAudio(recording), 1);
			assert.equal(bob.get(recording), -1);
		});
		it('should not delete the recording from the database when an admin doesnt has privilige to deleate the recording', function(){
			var bob = new Admin(0);
			var recording = new Recoding();
			assert.equal(bob.removeAudio(recording), -1);
		});
	});
});

describe('user recordings', function(){
	describe('button togle', function(){
		it('should toggle state from off to on when record button is pressed', function(){
			assert.equal(recordbutton.state(), 0);
			recordbutton.toggle();
			assert.equal(recordbutton.state(), 1);
		});
		it('should toggle state from on to off when record button is pressed', function(){
			assert.equal(recordbutton.state(), 1);
			recordbutton.toggle();
			assert.equal(recordbutton.state(), 0);
		});
		it('when button is pressed from off to on the header of the page and button color changes from blue to red', function(){
			assert.equal(recordbutton.state(), 0);
			assert.equal(recordbutton.color, "blue");
			assert.equal(header.color, "blue");
			recordbutton.toggle();
			assert.equal(recordbutton.state(), 1);
			assert.equal(recordbutton.color, "red");
			assert.equal(header.color, "red");
		});
		it('when button is pressed from on to off the header of the page from red to blue', function(){
			assert.equal(recordbutton.state(), 1);
			assert.equal(header.color, "red");
			recordbutton.toggle();
			assert.equal(recordbutton.state(), 1);
			assert.equal(header.color, "blue");
		});
		it('when button is pressed from on to off the button is no longer visable and the enter information page is visable', function(){
			assert.equal(recordbutton.state(), 1);
			assert.equal(recordbutton.visible, true);
			assert.equle(informationpage.visible, false);
			recordbutton.toggle();
			assert.equal(recordbutton.state(), 1);
			assert.equal(recordbutton.visible, false);
			assert.equle(informationpage.visible, true);
			
		});

	});
	describe('add recordings', function(){
		it('should add the recording to the database when the user presses the submit button on the information page',function(){
			var recording = new Recording();
			var database = new Database();
			database.addrecording(recording);
			assert.equal(database.exists(recording), true);
		});
	});

			
});
