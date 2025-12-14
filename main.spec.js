describe('main.js', function() {

	describe('calculate()', function(){

		it('validates expression', function() {

			spyOn(window, 'updateResult').and.stub();
			calculate('a+3');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);

		});

		it('validates expression when the first number is invalid', function() {

			spyOn(window, 'updateResult');
			calculate('a+3');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);

		});

		it('validates expression when the second number is invalid', function() {

			spyOn(window, 'updateResult');
			calculate('3+a');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);

		});

		it('validates expression when the operation is invalid', function() {

			spyOn(window, 'updateResult');
			calculate('3(a');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);

		});

		it('calls add', function () {
			
			spyOn(Calculator.prototype, 'add');
			calculate('3+4');
			expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
			expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
			expect(Calculator.prototype.add).toHaveBeenCalledWith(4);

		});
		it('calls subtract', function () {

			spyOn(Calculator.prototype, 'subtract');			
			calculate('10-5');
			expect(Calculator.prototype.subtract).toHaveBeenCalled();
			expect(Calculator.prototype.subtract).toHaveBeenCalledWith(5);

		});

		it('calls multiply', function () {
			
			spyOn(Calculator.prototype, 'multiply');
			calculate('3*7');
			expect(Calculator.prototype.multiply).toHaveBeenCalled();
			expect(Calculator.prototype.multiply).not.toHaveBeenCalledWith(6);
			expect(Calculator.prototype.multiply).toHaveBeenCalledWith(7);

		});

		it('calls divide', function () {
			
			spyOn(Calculator.prototype, 'divide');
			calculate('3/8');
			expect(Calculator.prototype.divide).toHaveBeenCalled();
			expect(Calculator.prototype.divide).not.toHaveBeenCalledWith(3);
			expect(Calculator.prototype.divide).toHaveBeenCalledWith(8);

		});


		it('calss updateResult (callThrough)', function() {

			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.callThrough();

			calculate('5*5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith(25);

		});

		it('calss updateResult (callFake)', function() {

			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
				return 'it works';
			});

			calculate('5*5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('it works');

		});

		it('calss updateResult (returnValue)', function() {

			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');

			calculate('5*5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');

		});

		it('calss updateResult (returnValues)', function() {

			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');

			calculate('5+5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');

		});

		it('does not handle errors', function() {

			spyOn(Calculator.prototype, 'multiply').and.throwError('some error');
			expect(function () {
				calculate('5*5')
			}).toThrowError('some error');

		})

	});

	describe('updateResult()', function(){

		beforeAll(function() {

			const element = document.createElement('div');
			element.setAttribute('id', 'result');
			document.body.appendChild(element);
			this.element = element;

		})

		afterAll(function() {

			document.body.removeChild(this.element);

		})

		it('adds result to DOM element', function() {
			
			updateResult('5');

			expect(this.element.innerText).toBe('5')

		});
		
	});

  describe('showVersion()', function () {
    it('calls calculator.version', function () {
      spyOn(document, 'getElementById').and.returnValue({
        innerText: null
      });

      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
      );

      showVersion();

      expect(spy).toHaveBeenCalled();
    });
  });

})