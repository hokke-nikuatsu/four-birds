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
import { FIREBASE_CONFIG } from '../../utils/firebase';

export class UserAuthenticator {
	private googleProvider: GoogleAuthProvider;
	private firebaseApp: FirebaseApp;
	private auth: Auth;

	constructor() {
		this.googleProvider = new GoogleAuthProvider();
		this.firebaseApp = initializeApp(FIREBASE_CONFIG);
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
