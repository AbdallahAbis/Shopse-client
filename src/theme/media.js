const size = {
  verySmallPhone: "21.5625em", //345
  smallPhone: "23.44em", //375
  phone: "37.5em", //600
  tabPort: "56.25em", //900
  tabLand: "75em", //1200
  laptop: "87.5em", //1400
  desktop: "112.5em", //1800
}

const device = {
  verySmallPhone: `only screen and (max-width: ${size.verySmallPhone})`,
  smallPhone: `only screen and (max-width: ${size.smallPhone})`,
  phone: `only screen and (max-width: ${size.phone})`,
  tabPort: `only screen and (max-width: ${size.tabPort})`,
  tabLand: `only screen and (max-width: ${size.tabLand})`,
  laptop: `only screen and (max-width: ${size.laptop})`,
  desktop: `only screen and (min-width: ${size.desktop})`,
}
export default device
