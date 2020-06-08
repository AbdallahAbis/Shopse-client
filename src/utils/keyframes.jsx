import { keyframes } from "styled-components"

export const slideDown = keyframes`
0%{
    transform: translateY(-15%);
    opacity: 0;
}

100%{
    transform: none;
    opacity: 1;
}
`
export const slideBottom = keyframes`
0%{
  transform: translateY(-80%);
  opacity: 0;

}
100%{
  transform: none;
  opacity: 1;
}
`
export const halfRotate = keyframes`
0%{
  transform: rotate(-45deg) translate(-100%, 10%);
  opacity: 0;

}
100%{
  transform: none;
  opacity: 1;
}
`
export const slideRight = keyframes`
0%{
  transform: translateX(-300%);
  opacity: 0;

}
80%{
  opacity:0;
}
100%{
  transform: none;
  opacity: 1;
}
`
