import { ENV } from './environment';

const FIREBASE_CONFIG_DEV = {
	apiKey: 'AIzaSyDTRw87FGV0RSnq0CNdN5C4Fw5F1K055-o',
	authDomain: 'four-birds-dev.firebaseapp.com',
	projectId: 'four-birds-dev',
	storageBucket: 'four-birds-dev.appspot.com',
	messagingSenderId: '353459397017',
	appId: '1:353459397017:web:679853af12cef74afa7308',
};

const FIREBASE_CONFIG_PROD = {
	apiKey: 'AIzaSyD7sUEPTq2bCKzdHANp13FVqlHr2LnTG8A',
	authDomain: 'four-birds-409101.firebaseapp.com',
	projectId: 'four-birds-409101',
	storageBucket: 'four-birds-409101.appspot.com',
	messagingSenderId: '1091923292904',
	appId: '1:1091923292904:web:648739ce7be39aa69f0f5d',
	measurementId: 'G-BCBR0HPEYL',
};

export const FIREBASE_CONFIG =
	ENV === 'production' ? FIREBASE_CONFIG_PROD : FIREBASE_CONFIG_DEV;
