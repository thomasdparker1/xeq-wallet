import { THEME } from "../actions/types.ts";
import { dark} from "../../assets/styles/themes.js";


const availableThemes = {dark};

export default function (state = dark, action) {
  switch (action.type) {
    case THEME:
      return availableThemes[action.payload];
    default:
      return state;
  }
}
