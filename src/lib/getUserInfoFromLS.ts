export const getUserInfoFromLS = () => {
    let userinfo = JSON.parse(localStorage.getItem("user")) 

    return userinfo
}