import React from "react"
import styled from "styled-components"

const Icon = styled.svg`
  stroke: var(--color-tertiary);
  stroke-width: 3px;
  fill: none;
  height: 2.5rem;
  stroke-linejoin: round;
  cursor: pointer;
  z-index: 1001;
  position: relative;
`

const UserIcon = () => (
  <Icon
    aria-label="user profile"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 57.4 57"
  >
    <path d="M38.4 6.8c7.4 12.3-5.4 25.1-17.7 17.7 -1.1-0.7-2.1-1.6-2.8-2.8C10.5 9.4 23.3-3.4 35.6 4.1 36.7 4.7 37.7 5.7 38.4 6.8z" />
    <path d="M38.8 30.8c-2.2 3.6-6.1 6.1-10.7 6.1s-8.5-2.5-10.7-6.1C8 34.9 1.4 44.4 1.4 55.3h53.5C54.9 44.4 48.3 34.9 38.8 30.8z" />
  </Icon>
)

export default UserIcon
