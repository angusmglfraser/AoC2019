const { expect } = require('chai');
const IntCode = require('./IntCode');

describe('IntCode', () => {
    describe('instruction parsing', () => {
        const computer = new IntCode();

        it('handles an opcode on its own', () => {
            const instruction = computer.getInstruction(99);

            expect(instruction).to.deep.equal({
                opCode: 99, mode1: 0, mode2: 0, mode3: 0,
            });
        });

        it('handles an opcode with an incomplete set of modes', () => {
            const instruction = computer.getInstruction(102);

            expect(instruction).to.deep.equal({
                opCode: 2, mode1: 1, mode2: 0, mode3: 0,
            });
        });

        it('handles an opcode with a complete set of modes', () => {
            const instruction = computer.getInstruction(32107);

            expect(instruction).to.deep.equal({
                opCode: 7, mode1: 1, mode2: 2, mode3: 3,
            });
        });
    });

    describe('execution', () => {
        describe('simple operations. address mode only', () => {
            it('multiplies', () => {
                const computer = new IntCode([2, 0, 2, 1, 99]);

                computer.run();

                expect(computer.halted).to.equal(true);

                expect(computer.arr.slice(0, 5)).to.deep.equal([2, 4, 2, 1, 99]);
            });

            it('adds', () => {
                const computer = new IntCode([1, 0, 5, 1, 99, 5]);

                computer.run();

                expect(computer.halted).to.equal(true);

                expect(computer.arr.slice(0, 6)).to.deep.equal([1, 6, 5, 1, 99, 5]);
            });
        });

        describe('simple operations. immediate mode only', () => {
            it('multiplies', () => {
                const computer = new IntCode([1102, 3, 2, 1, 99]);

                computer.run();

                expect(computer.halted).to.equal(true);

                expect(computer.arr.slice(0, 5)).to.deep.equal([1102, 6, 2, 1, 99]);
            });

            it('adds', () => {
                const computer = new IntCode([1, 0, 5, 1, 99, 5]);

                computer.run();

                expect(computer.halted).to.equal(true);

                expect(computer.arr.slice(0, 6)).to.deep.equal([1, 6, 5, 1, 99, 5]);
            });
        });
    });
});
