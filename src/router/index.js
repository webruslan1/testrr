import Vue from 'vue';
import VueRouter from 'vue-router';

import Profile from '@/pages/profile/Profile.vue'
import Ref from '@/pages/ref/Ref.vue'
import Bonus from '@/pages/bonus/Bonus.vue'
import Stats from '@/pages/stats/Stats.vue'
import Support from '@/pages/support/Support.vue'
import CreateTicket from '@/pages/support/CreateTicket.vue'
import Tickets from '@/pages/support/Tickets.vue'
import TicketChat from '@/pages/support/TicketChat.vue'
import Question from '@/pages/support/Question.vue'
import Deposite from '@/pages/deposite/Deposite.vue'
import Market from '@/pages/market/Market.vue'
import Contact from '@/pages/contact/Contact.vue'
import Policy from '@/pages/policy/Policy.vue'
import User from '@/pages/user/User.vue'

import Crash from '@/games/crash/Crash.vue'
import CrashHistory from '@/games/crash/History.vue'
import Roulette from '@/games/roulette/Roulette.vue'
import RouletteHistory from '@/games/roulette/History.vue'
import Upgrade from '@/games/upgrade/Upgrade.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Crash',
    component: Crash
  },
  {
    path: '/r/:code',
    name: 'RefCode',
    component: Crash
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/crash/:id',
    name: 'CrashHistory',
    component: CrashHistory
  },
  {
    path: '/roulette',
    name: 'Roulette',
    component: Roulette
  },
  {
    path: '/roulette/:id',
    name: 'RouletteHistory',
    component: RouletteHistory
  },
  {
    path: '/upgrade',
    name: 'Upgrade',
    component: Upgrade
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/deposite',
    name: 'Deposite',
    component: Deposite,
  },
  {
    path: '/market',
    name: 'Market',
    component: Market,
  },
  {
    path: '/ref',
    name: 'Ref',
    component: Ref,
  },
  {
    path: '/bonus',
    name: 'Bonus',
    component: Bonus,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
  },
  {
    path: '/support/:id',
    name: 'Support',
    component: Support,
  },
  {
    path: '/support/:id/:id',
    name: 'Question',
    component: Question,
  },
  {
    path: '/create-ticket/:id',
    name: 'CreateTicket',
    component: CreateTicket,
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
  },
  {
    path: '/tickets/:id',
    name: 'TicketChat',
    component: TicketChat,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/policy',
    name: 'Policy',
    component: Policy,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
