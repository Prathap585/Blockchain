const Block = require('./block');

describe('Block', () => {
    let data, block, lastBlock;
    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('set the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });
    it('set the `lastHash` to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

});