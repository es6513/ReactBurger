import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = ()=>{
	return{type:actionTypes.AUTH_START};
};

export const authSuccess = (token,userId)=>{
	return{
		type:actionTypes.AUTH_SUCCESS,
		idToken:token,
		userId:userId
	};
};

export const authFail = (error)=>{
	return{
		type:actionTypes.AUTH_FAIL,
		error:error
	};
};

export const logout = ()=>{
	localStorage.removeItem("token");
	localStorage.removeItem("expireationDate");
	localStorage.removeItem("userId");
	return{type:actionTypes.AUTH_LOGOUT};
};

export const checkAuthTimeout = (expirationTime)=>{
	return dispatch=>{
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email,password,isSignup)=>{
	return dispatch=>{
		dispatch(authStart());
		const authData = {
			email:email,
			password:password,
			returnSecureToken:true
		};
		let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAj9R82Y6o3ubHKj4eWWO6GTgnQR96fpdk";
		if(!isSignup){
			url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAj9R82Y6o3ubHKj4eWWO6GTgnQR96fpdk";
		}
		axios.post(url,authData)
			.then(response=>{
				console.log(response);
				const expireationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem("token",response.data.idToken);
				localStorage.setItem("expireationDate",expireationDate);
				localStorage.setItem("userId",response.data.localId);
				dispatch(authSuccess(response.data.idToken,response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err=>{
				console.log(err);
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = (path)=>{
	return{
		type:actionTypes.SET_AUTH_REDIRECT_PATH,
		path:path
	};
};

export const authCheckState = ()=>{
	return dispatch=>{
		const token = localStorage.getItem("token");
		if(!token){
			dispatch(logout());
		}else{
			const expireationDate = new Date(localStorage.getItem("expireationDate"));
			if(expireationDate <= new Date()){
				dispatch(logout());
			}else{
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token,userId));
				dispatch(checkAuthTimeout((expireationDate.getTime() - new Date().getTime()) / 1000));
			}
			
		}
	};
};