import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vgl from 'vue-golden-layout';
import '@/script/hacks/HTMLDivElement';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Log, LogError } from '@/script/modules/Logger';
import VEXTInterface from '@/script/modules/VEXT';
import Editor from '@/script/Editor';
import TypeDocumentationLink from 'venice-ebx-browser/src/components/TypeDocumentationLink.vue';
import Property from 'venice-ebx-browser/src/components/Property.vue';
import Reference from 'venice-ebx-browser/src/components/Reference.vue';
import Partition from 'venice-ebx-browser/src/components/Partition.vue';
import Instance from 'venice-ebx-browser/src/components/Instance.vue';
import InstanceIdentifier from 'venice-ebx-browser/src/components/InstanceIdentifier.vue';
import Directory from 'venice-ebx-browser/src/components/Directory.vue';
import GameRegistry, { FetchPartitionLoader } from '@/script/modules/GameRegistry';
import { capitalize, removeExtension } from './filters';
const locale = require('element-ui/lib/locale/lang/en');

let debugMode: boolean = false;
if (!navigator.userAgent.includes('VeniceUnleashed')) {
	if (window.location.ancestorOrigins === undefined || window.location.ancestorOrigins[0] !== 'webui://main') {
		debugMode = true;
	}
}
window.debug = debugMode;
(window).editor = new Editor(debugMode);
window.vext = new VEXTInterface(debugMode);

(window).Log = Log;
(window).LogError = LogError;

Vue.use(vgl);
Vue.use(ElementUI, { locale });

Vue.component('TypeDocumentationLink', TypeDocumentationLink);
Vue.component('Property', Property);
Vue.component('Reference', Reference);
Vue.component('Partition', Partition);
Vue.component('Instance', Instance);
Vue.component('InstanceIdentifier', InstanceIdentifier);
Vue.component('Directory', Directory);

Vue.filter('capitalize', capitalize);
Vue.filter('removeExt', removeExtension);

const registries = {
	'venice': new GameRegistry('venice', new FetchPartitionLoader('https://ebx.rylius.de/venice/ebx', () => fetch('https://ebx.rylius.de/venice/partitions.json').then(res => res.json())))
};

Vue.prototype.$registries = registries;

new Vue({
	render: (h) => h(App),
	store
}).$mount('#app');
