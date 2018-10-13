export default [
  {
    name: 'Merchants',
    icon: 'store',
    children: [
      {
        name: 'Merchant',
        path: '/merchants/list'
      },
      {
        name: 'Merchant Teratas',
        path: '/merchants/top/list'
      },
      {
        name: 'Merchant Populer',
        path: '/merchants/pop/list'
      }
    ]
  },
  {
    name: 'Makanan',
    icon: 'utensils',
    path: '/foods/list'
  },
  {
    name: 'Driver',
    icon: 'users',
    children: [
      {
        name: 'Driver',
        path: '/drivers/list'
      },
      {
        name: 'Driver Shift',
        path: '/drivers/shift'
      },
    ]
  },
  {
    name: 'Helpdesks',
    icon: 'question-circle',

    children: [
      // {
      //   name: 'Merchants',
      //   path: '/helpdesks/merchants'
      // },
      {
        name: 'Kost',
        path: '/helpdesks/kosts/list'
      }
    ]
  },
  {
    name: 'Slider',
    icon: 'images',
    path: '/sliders/list'
    // children: [
    //   {
    //     name: 'Slider',
    //     path: '/slider/semakanan/list'
    //   }
    // ]
  },
  {
    name: 'Transaksi',
    icon: 'shopping-basket',
    path: '/transactions/list'
    // children: [
    //   {
    //     name: 'Daftar Transaksi',
    //     path: '/transaction/list'
    //   }
    // ]
  },
  {
    name: 'Histori',
    icon: 'book',
    path: '/histories'
    // children: [
    //   {
    //     name: 'Daftar History',
    //     path: '/history'
    //   }
    // ]
  }
]
