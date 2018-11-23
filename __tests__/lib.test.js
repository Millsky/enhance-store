/**
 * Created by millsky on 11/22/18.
 */
import sinon from 'sinon';
import { initializeStore, enhanceStore, unenhanceStore } from '../lib/index';
import initialStore from '../lib/store';
import initialReducers from '../lib/reducers';

describe('enhance-store', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    describe('#initializeStore', () => {
        /* Smoke test for the initializeStore function */
        describe('Smoke', () => {
            test('It should allow the user to provide a store', () => {
                expect(initializeStore({})).toEqual(void 0);
            });
            test('It should throw an error if the store has already been set', () => {
                expect(() => {
                    initializeStore({})
                }).toThrowError('Store has already been set');
            });
        });
    });
    describe('#enhanceStore', () => {
        describe('Smoke', () => {
            test('It should throw an error if the store has NOT been set', () => {
                sandbox.stub(initialStore, 'get').returns(null);
                expect(() => {
                    enhanceStore('counter', function(state, action) {
                        return state;
                    });
                }).toThrowError('Store has not been set');
            });
        });
        describe('Implementation', () => {
            test('It should dispatch a start hook', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                enhanceStore('counter', (state) => state);
                expect(storeSpy.dispatch.called).toEqual(true);
            });
            test('It should dispatch a complete hook', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                enhanceStore('counter', (state) => state);
                expect(storeSpy.dispatch.calledTwice).toEqual(true);
            });
            test('It should replace the reducers once', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                enhanceStore('counter', (state) => state);
                expect(storeSpy.replaceReducer.calledOnce).toEqual(true);
            });
        });
    });
    describe('#unenhanceStore', () => {
        describe('Smoke', () => {
            test('It should throw an error if the store has NOT been set', () => {
                sandbox.stub(initialStore, 'get').returns(null);
                expect(() => {
                    unenhanceStore('counter');
                }).toThrowError('Store has not been set');
            });
        });
        describe('Implementation', () => {
            test('It should dispatch a start hook', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialReducers, 'get').returns({
                    counter: state => state,
                });
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                unenhanceStore('counter');
                expect(storeSpy.dispatch.called).toEqual(true);
            });
            test('It should dispatch a complete hook', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialReducers, 'get').returns({
                    counter: state => state,
                });
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                unenhanceStore('counter');
                expect(storeSpy.dispatch.calledTwice).toEqual(true);
            });
            test('It should replace the reducers once', () => {
                const storeSpy = {
                    dispatch: sinon.spy(),
                    replaceReducer: sinon.spy(),
                };
                sandbox.stub(initialReducers, 'get').returns({
                    counter: state => state,
                });
                sandbox.stub(initialStore, 'get').returns(storeSpy);
                unenhanceStore('counter');
                expect(storeSpy.replaceReducer.calledOnce).toEqual(true);
            });
        });
    });
});
