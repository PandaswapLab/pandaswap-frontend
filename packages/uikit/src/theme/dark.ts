import { DefaultTheme } from "styled-components";
// import { dark as darkAlert } from "../components/Alert/theme";
// import { dark as darkCard } from "../components/Card/theme";
// import { dark as darkPancakeToggle } from "../components/PancakeToggle/theme";
// import { dark as darkRadio } from "../components/Radio/theme";
// import { dark as darkToggle } from "../components/Toggle/theme";
// import { dark as darkNav } from "../widgets/Menu/theme";
// import { dark as darkModal } from "../widgets/Modal/theme";
// import { dark as darkTooltip } from "../components/Tooltip/theme";
import base from "./base";
// import { darkColors } from "./colors";
import light from "./light";

const darkTheme: DefaultTheme = {
  ...base,
  ...light,
  isDark: true,

  // alert: darkAlert,
  // colors: darkColors,
  // card: darkCard,
  // toggle: darkToggle,
  // nav: darkNav,
  // modal: darkModal,
  // pancakeToggle: darkPancakeToggle,
  // radio: darkRadio,
  // tooltip: darkTooltip,
};

export default darkTheme;
