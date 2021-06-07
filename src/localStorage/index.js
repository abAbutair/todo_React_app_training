export const localStorageData = JSON.parse(localStorage.getItem('loginObject'));
export const userId = localStorageData ? localStorageData.userObject._id : '';
export const accessToken = localStorageData ? localStorageData.accessToken : '';
export const refreshToken = localStorageData ? localStorageData.refreshToken : '';