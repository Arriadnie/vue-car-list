import { shallowMount } from '@vue/test-utils'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SearchInput)
  })

  afterEach(() => wrapper.destroy())

  it('renders $attrs.placeholder inside html template', async () => {
    const placeholder = 'SomeText'
    
    await wrapper.setProps({ placeholder })

    expect(wrapper.html()).toMatch(placeholder)
  })

  it('renders text value when passed', async () => {
    const value = 'SomeText'
    
    const input = wrapper.find('input')

    await input.setValue(value)

    expect(input.element.value).toBe(value)
  })
})
