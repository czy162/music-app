//按需引入vant组件
import {
  Swipe,
  SwipeItem,
  Icon,
  Popup,
  Slider,
  Search,
  Form,
  Field,
  CellGroup,
  NavBar,
  Toast,
} from "vant";
//放入数组中
let plugins = [
  Swipe,
  SwipeItem,
  Icon,
  Popup,
  Slider,
  Search,
  Form,
  Field,
  CellGroup,
  NavBar,
  Toast,
];
//循环
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
