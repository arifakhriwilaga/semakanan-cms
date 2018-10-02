export default [
  {
    name: 'Merchants',
    icon: 'ti-star',
    children: [
      {
        name: 'Daftar Merchants',
        path: '/merchants/list'
      },
      {
        name: 'Daftar Merchant Teratas',
        path: '/merchants/top/list'
      },
      {
        name: 'Daftar Merchant Populer',
        path: '/merchants/pop/list'
      }
    ]
  },
  {
    name: 'Food',
    icon: 'ti-receipt',
    path: '/foods/list'
  },
  {
    name: 'Driver',
    icon: 'ti-user',
    path: '/drivers/list'
  },
  {
    name: 'Helpdesks',
    icon: 'ti-star',

    children: [
      {
        name: 'Merchants',
        path: '/helpdesks/merchants'
      },
      {
        name: 'Kost',
        path: '/helpdesks/kosts'
      }
    ]
  },
  {
    name: 'Slider',
    icon: 'ti-image',
    children: [
      {
        name: 'Slider',
        path: '/slider/semakanan/list'
      }
    ]
  },
  {
    name: 'Transaksi',
    icon: 'ti-shopping-cart',
    children: [
      {
        name: 'Daftar Transaksi',
        path: '/transaction/list'
      }
    ]
  },
  {
    name: 'History',
    icon: 'ti-menu-alt',
    children: [
      {
        name: 'Daftar History',
        path: '/history'
      }
    ]
  }
]
