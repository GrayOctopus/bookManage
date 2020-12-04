import Vue from 'vue'
import VueRouter from 'vue-router'
const Login  = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Weclome = () => import('views/home/homeChild/Welcome.vue')
const Book = () => import('views/home/homeChild/book/Book.vue')
const Borrow = () => import('views/home/homeChild/borrow/Borrow.vue')
const ReaderInfo = () => import('views/home/homeChild/reader/ReaderInfo.vue')
const ReaderType = () => import('views/home/homeChild/reader/ReaderType.vue')
const AddReader = () => import('views/home/homeChild/reader/AddReader.vue')
const EditReader = () => import('views/home/homeChild/reader/EditReader.vue')
const Report = () => import('views/home/homeChild/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Weclome
      },
      {
        path: '/book',
        component: Book
      },
      {
        path: '/borrow',
        component: Borrow
      },
      {
        path: '/readerinfo',
        component: ReaderInfo
      },
      {
        path: '/readertype',
        component: ReaderType
      },
      {
        path: '/addreader',
        component:AddReader
      },
      {
        path: '/editreader',
        component:EditReader
      },
      {
        path: '/report',
        component: Report
      }
    ]
  }
]


const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
      if (to.path === '/login')
        return next()
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr){
        Vue.prototype.$message.error('请先登录！')
        return next('/login')
      }
      next()
    }
)

export default router
