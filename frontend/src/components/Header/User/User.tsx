import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	StyledUser,
	StyledUserIcon,
	StyledUserLogin,
	StyledUserLogout,
	StyledUserName,
} from './UserStyle';
import { userAuthenticator } from '../../../App';
import { type reducers } from '../../../services/redux/rootReducer';
import { signInUser, signOutUser } from '../../../services/redux/users/actions';

export type AppState = ReturnType<typeof reducers>;

const User = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const user = useSelector((state: AppState) => state.user);
	const hasUserInfo = !!user.uid;

	const login = async () => {
		await userAuthenticator.signInWithGoogleAccount();
	};

	const logout = async () => {
		await userAuthenticator.signOutFromGoogleAccount();
		dispatch(signOutUser());
	};

	useEffect(() => {
		const checkRedirectResult = async () => {
			try {
				const googleUser = await userAuthenticator.handleRedirectResult();
				if (googleUser) {
					dispatch(
						signInUser({
							uid: googleUser.uid,
							displayName: googleUser.displayName ?? '',
							email: googleUser.email ?? '',
							photoUrl: googleUser.photoURL ?? '',
						}),
					);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		checkRedirectResult();
	}, [dispatch]);

	return (
		<StyledUser>
			{!isLoading &&
				(hasUserInfo ? (
					<>
						<StyledUserIcon src={user.photoUrl} alt="User Icon" />
						<StyledUserName>{user.displayName}</StyledUserName>
						<StyledUserLogout onClick={logout}>ログアウト</StyledUserLogout>
					</>
				) : (
					<StyledUserLogin onClick={login}>ログイン</StyledUserLogin>
				))}
		</StyledUser>
	);
};

export default User;
