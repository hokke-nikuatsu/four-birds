import { type FirebaseApp, initializeApp } from 'firebase/app';
import {
	getAuth,
	type Auth,
	GoogleAuthProvider,
	type User,
	signInWithRedirect,
	signOut as firebaseSignOut,
	getRedirectResult,
} from 'firebase/auth';

// TODO: Move settings to credentials folder
const firebaseConfig = {
	apiKey: 'AIzaSyDTRw87FGV0RSnq0CNdN5C4Fw5F1K055-o',
	authDomain: 'four-birds-dev.firebaseapp.com',
	projectId: 'four-birds-dev',
	storageBucket: 'four-birds-dev.appspot.com',
	messagingSenderId: '353459397017',
	appId: '1:353459397017:web:679853af12cef74afa7308',
};

export class UserAuthenticator {
	private googleProvider: GoogleAuthProvider;
	private firebaseApp: FirebaseApp;
	private auth: Auth;

	constructor() {
		this.googleProvider = new GoogleAuthProvider();
		this.firebaseApp = initializeApp(firebaseConfig);
		this.auth = getAuth(this.firebaseApp);
	}

	signInWithGoogleAccount = async (): Promise<void> => {
		try {
			await signInWithRedirect(this.auth, this.googleProvider);
		} catch (e) {
			throw new Error(`Error during sign in: ${e}`);
		}
	};

	signOutFromGoogleAccount = async (): Promise<void> => {
		try {
			await firebaseSignOut(this.auth);
		} catch (e) {
			throw new Error(`Error during sign out: ${e}`);
		}
	};

	handleRedirectResult = async (): Promise<User | undefined> => {
		try {
			const result = await getRedirectResult(this.auth);
			if (!result) return;

			return result.user;
		} catch (e) {
			throw new Error(`Error during redirect result handling: ${e}`);
		}
	};
}
