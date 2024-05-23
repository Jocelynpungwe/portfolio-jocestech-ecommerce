import styled from 'styled-components'

const AppLogo = () => {
  return (
    <Wrapper>
      <span>JocesTech</span> Solution
    </Wrapper>
  )
}

const Wrapper = styled.h3`
  margin-bottom: 0;
  color: var(--clr-grey-1);
  span {
    color: var(--clr-primary-5);
  }
`

export default AppLogo
