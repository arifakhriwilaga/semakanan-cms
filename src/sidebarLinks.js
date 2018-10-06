export default [
  {
    name: 'Merchants',
    icon: 'ti-home',
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
    name: 'Food',
    icon: 'ti-clipboard',
    path: '/foods/list'
  },
  {
    name: 'Driver',
    icon: 'ti-user',
    path: '/drivers/list'
  },
  {
    name: 'Helpdesks',
    icon: 'el-icon-service',

    children: [
      // {
      //   name: 'Merchants',
      //   path: '/helpdesks/merchants'
      // },
      {
        name: 'Kost',
        path: '/helpdesks/kosts'
      }
    ]
  },
  {
    name: 'Slider',
    icon: 'el-icon-picture',
    path: '/slider/semakanan/list'
    // children: [
    //   {
    //     name: 'Slider',
    //     path: '/slider/semakanan/list'
    //   }
    // ]
  },
  {
    name: 'Transaksi',
    icon: 'el-icon-goods',
    path: '/transaction/list'
    // children: [
    //   {
    //     name: 'Daftar Transaksi',
    //     path: '/transaction/list'
    //   }
    // ]
  },
  {
    name: 'History',
    icon: 'ti-agenda',
    path: '/history'
    // children: [
    //   {
    //     name: 'Daftar History',
    //     path: '/history'
    //   }
    // ]
  }
]
