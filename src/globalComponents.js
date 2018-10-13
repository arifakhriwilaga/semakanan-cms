import fgInput from './components/UIComponents/Inputs/formGroupInput.vue'
import DropDown from './components/UIComponents/Dropdown.vue'
import Checkbox from './components/UIComponents/Inputs/Checkbox.vue'
import Radio from './components/UIComponents/Inputs/Radio.vue'
import Spinner from './components/UIComponents/Spinner.vue'
import ShowImage from './components/Base/ShowImage.vue'

// kalendar
// import PortalVue from 'portal-vue'
// import format from 'date-fns/format';
// import smoothscroll from 'smoothscroll-polyfill';
import Kalendar from './components/UIComponents/Kalendar/kalendar-container';
import KalendarCell from './components/UIComponents/Kalendar/kalendar-cell';
import KalendarDay from './components/UIComponents/Kalendar/kalendar-day';
import KalendarEventpopup from './components/UIComponents/Kalendar/kalendar-eventpopup';
import KalendarWeekView from './components/UIComponents/Kalendar/kalendar-weekview';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// import * from './components/UIComponents/Kalendar'
// import Switch from './components/UIComponents/Switch.vue'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 * Ideally, only small components that are re-used many times across your application should be registered here.
 * For plugins and bigger components local registration is preferable because it will allow you to do code splitting easier :)
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component(fgInput.name, fgInput);
    Vue.component(DropDown.name, DropDown);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Radio.name, Radio);
    Vue.component(Spinner.name, Spinner);
    Vue.component('show-image', ShowImage);

    // Kalendar
    Vue.component('kalendar', Kalendar);
    Vue.component('kalendar-cell', KalendarCell);
    Vue.component('kalendar-day', KalendarDay);
    Vue.component('kalendar-eventpopup', KalendarEventpopup);
    Vue.component('kalendar-week-view', KalendarWeekView);

    // icon
    Vue.component('v-icon', Icon);

    // Vue.component(Switch.name, Spinner)
  }
}

export default GlobalComponents
