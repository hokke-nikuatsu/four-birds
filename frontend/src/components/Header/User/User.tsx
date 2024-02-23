import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	StyledUser,
	StyledUserIcon,
	StyledUserLogin,
	StyledUserLogout,
} from './UserStyle';
import { userAuthenticator } from '../../../App';
import {
	deleteCsrfToken,
	generateCsrfToken,
} from '../../../services/api/users';
import { signOutUser, updateUser } from '../../../services/redux/users/actions';
import { useAppDispatch, type AppState } from '../../../services/store/store';

const User = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const user = useSelector((state: AppState) => state.user);
	const hasUserInfo = !!user.uid;

	const login = async () => {
		await userAuthenticator.signInWithGoogleAccount();
	};

	const logout = async () => {
		await userAuthenticator.signOutFromGoogleAccount();
		localStorage.removeItem('userInfo');

		await deleteCsrfToken(user);
		dispatch(signOutUser());
	};

	useEffect(() => {
		const checkRedirectResult = async () => {
			const userInfo = localStorage.getItem('userInfo');

			if (userInfo) {
				const user = JSON.parse(userInfo);

				await generateCsrfToken(user);
				await dispatch(updateUser(user));

				setIsLoading(false);

				return;
			}

			try {
				const googleUser = await userAuthenticator.handleRedirectResult();
				if (googleUser) {
					const userInfo = {
						uid: googleUser.uid,
						displayName: googleUser.displayName ?? '',
						email: googleUser.email ?? '',
						photoUrl: googleUser.photoURL ?? '',
					};

					localStorage.setItem('userInfo', JSON.stringify(userInfo));

					await generateCsrfToken(userInfo);
					dispatch(updateUser(userInfo));
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
						<StyledUserLogout onClick={logout}>ログアウト</StyledUserLogout>
					</>
				) : (
					<StyledUserLogin onClick={login}>ログイン</StyledUserLogin>
				))}
		</StyledUser>
	);
};

export default User;
