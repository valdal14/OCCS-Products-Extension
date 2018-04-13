const Occs = require('../server').Occs;

describe('Occs.getToken', function(){

    it('should return a token string', function(){
        let token = Occs.getToken();
        expect(token).toBe("1234");
    });
});