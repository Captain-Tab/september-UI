const sinon = require('sinon');
const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/Input'

Vue.config.productionTip = false
Vue.config.devtools = false
chai.use(require('sinon-chai'));

describe('Input', () => {

  it('存在.',  ()=>{
      expect(Input).to.exist
  })
    describe('props', ()=>{
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(function () {
            vm.$destroy()
        })
        it('接收value.', () => {
            vm = new Constructor({
                propsData: {
                    value: '1234'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('1234')
        })
        it('接收disabled.', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
        })
        it('接收readonly.', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.readOnly).to.equal(true)
        })
        it('接收errorText.', () => {
            vm = new Constructor({
                propsData: {
                    errorText: 'wrong'
                }
            }).$mount()
            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.equal('#s-error')
            const message = vm.$el.querySelector('.message')
            expect(message.innerText).to.equal('wrong')
       })
    })
    describe('events', ()=>{
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(function () {
            vm.$destroy()
        })
        it('支持change事件', ()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            // 触发input的默认事件
            vm.$on('change', callback)
            const event = new Event('change')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持input事件', ()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            // 触发input的默认事件
            vm.$on('input', callback)
            const event = new Event('input')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持focus事件', ()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            // 触发input的默认事件
            vm.$on('focus', callback)
            const event = new Event('focus')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持blur事件', ()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            // 触发input的默认事件
            vm.$on('blur', callback)
            const event = new Event('blur')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })
    })
})

