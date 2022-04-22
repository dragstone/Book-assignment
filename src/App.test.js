const { shallow } = require('enzyme')
import { App } from './App'

describe('test', () => {
  it('first test', () => {
    expect(1 + 1).toBe(2)
  })
  it('enzyme test', () => {
    const wrapper = shallow(<App />)
    console.log(wrapper.debug())
  })
})
