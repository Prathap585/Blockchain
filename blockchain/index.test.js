const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('Starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('Validate a valid chain', () => {
        bc2.addBlock("foo");
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a corrupt chain with genesis block', () => {
        bc2.chain[0].data = "Bad Data";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidate a corrupt chain', () => {
        bc2.addBlock("foo");
        bc2.chain[1].data = "Not Foo"
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace chian with valid chain', () => {
        bc2.addBlock("goo");

        bc.replaceChain(bc2.chain);
            
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace chian as current chian lenght is less than previous chain', () => {
        bc.addBlock("foo");

        bc.replaceChain(bc2.chain);
            
        expect(bc.chian).not.toEqual(bc2.chain);
    });
});