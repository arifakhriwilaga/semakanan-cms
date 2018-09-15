import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Stats from 'src/components/Dashboard/Views/Dashboard/Stats.vue'

// Pages
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import TimeLine from 'src/components/Dashboard/Views/Pages/TimeLinePage.vue'
// import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

// Components pages
import Buttons from 'src/components/Dashboard/Views/Components/Buttons.vue'
import GridSystem from 'src/components/Dashboard/Views/Components/GridSystem.vue'
import Panels from 'src/components/Dashboard/Views/Components/Panels.vue'
import SweetAlert from 'src/components/Dashboard/Views/Components/SweetAlert.vue'
import Notifications from 'src/components/Dashboard/Views/Components/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Components/Icons.vue'
import Typography from 'src/components/Dashboard/Views/Components/Typography.vue'

// Forms pages
import RegularForms from 'src/components/Dashboard/Views/Forms/RegularForms.vue'
import ExtendedForms from 'src/components/Dashboard/Views/Forms/ExtendedForms.vue'
import ValidationForms from 'src/components/Dashboard/Views/Forms/ValidationForms.vue'
import Wizard from 'src/components/Dashboard/Views/Forms/Wizard.vue'

// TableList pages
import RegularTables from 'src/components/Dashboard/Views/Tables/RegularTables.vue'
import ExtendedTables from 'src/components/Dashboard/Views/Tables/ExtendedTables.vue'
import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'
// Maps pages
import GoogleMaps from 'src/components/Dashboard/Views/Maps/GoogleMaps.vue'
import FullScreenMap from 'src/components/Dashboard/Views/Maps/FullScreenMap.vue'
import VectorMaps from 'src/components/Dashboard/Views/Maps/VectorMapsPage.vue'

// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue'
// Charts
import Charts from 'src/components/Dashboard/Views/Charts.vue'


// import UserList from 'src/components/Users/UserList.vue'
// import UserCreate from 'src/components/Users/UserCreate.vue'

import CategoryUkmList from 'src/components/Settings/CategoryUkmList.vue'

// seKomunitas
import Login from 'src/components/Auth/Login.vue'

// Merchant
import MerchantList from 'src/components/Merchant/MerchantList.vue'
import MerchantProfile from 'src/components/Merchant/MerchantProfile.vue'
import MerchantCreate from 'src/components/Merchant/MerchantFormCreate.vue'

// Merchant Top
import MerchantTopList from 'src/components/Merchant/MerchantTopList.vue'
import MerchantTopCreate from 'src/components/Merchant/MerchantTopFormCreate.vue'

// Merchant Pop
import MerchantPopList from 'src/components/Merchant/MerchantPopList.vue'
import MerchantPopCreate from 'src/components/Merchant/MerchantPopFormCreate.vue'

// Merchant Open & Close
import MerchantOpenList from 'src/components/Merchant/MerchantOpenList.vue'
import MerchantCloseList from 'src/components/Merchant/MerchantCloseList.vue'

// Slider
import SliderListSemakanan from 'src/components/Slider/SliderListSemakanan.vue'
import SliderHomeList from 'src/components/Slider/SliderListHome.vue'
import SliderForm from 'src/components/Slider/SliderForm.vue'

// Transaction
import TransactionList from 'src/components/Transaction/TransactionList.vue'
import TransactionDetail from 'src/components/Transaction/Show.vue'

// History
import HistoryList from 'src/components/History/HistoryList.vue'
import HistoryDetail from 'src/components/History/Show.vue'

//Food
import FoodList from 'src/components/Food/FoodList.vue';
import FoodForm from 'src/components/Food/FoodForm.vue';

//Driver
import DriverList from 'src/components/Driver/DriverList';

//Helpdesk
import HelpdeskList from 'src/components/Helpdesk/HelpdeskList';

// Users
import UserList from 'src/components/Users/List.vue'
import UserCreate from 'src/components/Users/Create.vue'

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      component: Typography
    }

  ]
}

let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      component: RegularForms
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      component: ExtendedForms
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      component: ValidationForms
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      component: PaginatedTables
    }]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      component: GoogleMaps
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      component: FullScreenMap
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      component: VectorMaps
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      component: User
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      component: TimeLine
    }
  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    notLogged: true
  }
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register,
  meta: {
    notLogged: true
  }
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

let settingsMenu = {
  path: '/settings',
  name: 'settings',
  component: DashboardLayout,
  children: [{
    path: 'category_ukm',
    name: 'category-list',
    component: CategoryUkmList
  }]
}

/**
 *
 * seKomunitas
 *
 */
const merchantsMenu = {
  path: '/merchants',
  name: 'merchants',
  component: DashboardLayout,
  children: [
    {
      path: 'list',
      name: 'merchant-list',
      component: MerchantList
    },
    {
      path: 'profile/:id',
      name: 'merchant-profile',
      component: MerchantProfile
    },
    {
      path: 'create',
      name: 'merchant-create',
      component: MerchantCreate
    },
    {
      path: ':id',
      name: 'merchant-edit',
      component: MerchantCreate
    },
    {
      path: 'top/list',
      name: 'merchant-top-list',
      component: MerchantTopList
    },
    {
      path: 'top/create',
      name: 'merchant-top-create',
      component: MerchantTopCreate
    },
    {
      path: 'pop/list',
      name: 'merchant-pop-list',
      component: MerchantPopList
    },
    {
      path: 'pop/create',
      name: 'merchant-pop-create',
      component: MerchantPopCreate
    },
    {
      path: 'open/list',
      name: 'merchant-open-list',
      component: MerchantOpenList
    },
    {
      path: 'close/list',
      name: 'merchant-close-list',
      component: MerchantCloseList
    }
  ]
}

// Slider
const sliderMenu = {
  component: DashboardLayout,
  name: 'slider',
  path: '/slider',
  children: [
    {
      path: 'semakanan/list',
      name: 'slider-list-semakanan',
      component: SliderListSemakanan
    },
    {
      path: 'home/list',
      name: 'slider-home-list',
      component: SliderHomeList
    },
    {
      path: 'create',
      name: 'slider-create',
      component: SliderForm
    },
    {
      path: 'edit/:id',
      name: 'slider-edit',
      component: SliderForm
    }
  ]
};
// Transaction
const transactionMenu = {
  component: DashboardLayout,
  name: 'transaction',
  path: '/transaction',
  children: [
    {
      path: 'list',
      name: 'transaction-list',
      component: TransactionList
    },
    {
      path: 'detail/:id',
      name: 'transaction-detail',
      component: TransactionDetail
    }
  ]
}
// History
const historyMenu = {
  component: DashboardLayout,
  name: 'history',
  path: '/history',
  children: [
    {
      path: '',
      name: 'history-list',
      component: HistoryList
    },
    {
      path: '/:id',
      name: 'history-detail',
      component: HistoryDetail
    }
  ]
}

const foodMenu = {
  component: DashboardLayout,
  name: 'foods',
  path: '/foods',
  children: [
    {
      path: 'list',
      name: 'food-list',
      component: FoodList
    },
    {
      path: 'create',
      name: 'food-create',
      component: FoodForm
    },
    {
      path: 'edit/:id',
      name: 'user-edit',
      component: FoodForm
    }
  ]
};
//Helpdesk
const helpdeskMenu = {
  component: DashboardLayout,
  name: 'helpdesks',
  path: '/helpdesks',
  children: [
    {
      path: 'list',
      name: 'helpdesk-list',
      component: HelpdeskList
    }
  ]
};

// Driver
const driverMenu = {
  component: DashboardLayout,
  name: 'drivers',
  path: '/drivers',
  children: [
    {
      path: 'list',
      name: 'driver-list',
      component: DriverList
    },
    // {
    //   path: 'create',
    //   name: 'driver-create',
    //   component: DriverForm
    // },
    // {
    //   path: 'driver/:id',
    //   name: 'driver-edit',
    //   component: DriverForm
    // }
  ]
}
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  settingsMenu,
  componentsMenu,
  formsMenu,
  driverMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  loginPage,
  registerPage,
  lockPage,
  foodMenu,
  merchantsMenu,
  sliderMenu,
  transactionMenu,
  helpdeskMenu,
  historyMenu,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: {
          auth: true
        }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats
      }
    ]
  },
  {path: '*', component: NotFound}
]


/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
