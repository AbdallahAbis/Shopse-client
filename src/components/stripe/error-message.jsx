import React from "react"
import styled from "styled-components"
import device from "../../theme/media"

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 3rem;
  margin-top: 2rem;
  left: 0;
  padding: 0 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  opacity: 0;
  transform: translateY(1rem);
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

  &.visible {
    opacity: 1;
    transform: none;
    span {
      color: #e25950;
    }
  }

  svg {
    flex-shrink: 0;
    margin-top: -1px;
    margin-right: 1rem;

    .base {
      margin-top: 0;
      fill: #e25950;
    }
    .glyph {
      fill: var(--color-secondary);
    }
  }

  // Media Query ...................

  @media ${device.tabPort} {
    top: 3rem;
    height: 0;
    margin: 0;
  }
`

const ErrorMessage = ({ error }) => (
  <Error
    className={error && "visible"}
    role="alert"
    aria-label="the provided information aren't valid!"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
    >
      <path
        className="base"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      ></path>
      <path
        className="glyph"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      ></path>
    </svg>
    <span>{error}</span>
  </Error>
)

export default ErrorMessage
