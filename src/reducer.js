const initialState = {
    navbarOptionHover: false,
    loading: false,
    navbarmobile: false,
    navbarXmarkClass: "navbarXmarkClassStart",
    MainWebsiteFlag: true,
    ForumFlag: true,
    SignInFlag: true,
    SignUpFlag: true,
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NavBarOptionHoverTrue': {
            return ({

                ...state, navbarOptionHover: true,

            })
        }
            break;
        case 'NavBarOptionHoverFalse': {
            return ({
                ...state, navbarOptionHover: false,
            })
        }
            break;
        case 'loadingTrue': {
            return ({
                ...state, loading: true,
            })
        }
            break;
        case 'loadingFalse': {
            return ({
                ...state, loading: false,
            })
        }
            break;
        case 'navbarmobileTrue': {
            return ({ ...state, navbarmobile: true, })

        }
            break;
        case 'navbarmobileFalse': {
            return ({
                ...state, navbarmobile: false,
            })
        }
            break;
        case 'navbarXmarkClassFinish': {
            return ({

                ...state, navbarXmarkClass: "navbarXmarkClassFinish",
            })
        }
            break;
        case 'navbarXmarkClassStart': {
            return ({

                ...state, navbarXmarkClass: "navbarXmarkClassStart",
            })
        }
            break;
        case 'MainWebsiteFlagTrue': {
            return ({
                ...state, MainWebsiteFlag: true,
            })
        }
            break;
        case 'MainWebsiteFlagFalse': {
            return ({
                ...state, MainWebsiteFlag: false,
            })
        }
            break;
        case 'ForumFlagTrue': {
            return ({
                ...state, ForumFlag: true,
            })
        }
            break;
        case 'ForumFlagFalse': {
            return ({
                ...state, ForumFlag: false,
            })
        }
            break;
        case 'SignInFlagTrue': {
            return ({
                ...state, SignInFlag: true,
            })
        }
            break;
        case 'SignInFlagFalse': {
            return ({
                ...state, SignInFlag: false,
            })
        }
            break;
        case 'SignUpFlagTrue': {
            return ({
                ...state, SignUpFlag: true,
            })
        }
            break;
        case 'SignUpFlagFalse': {
            return ({
                ...state, SignUpFlag: false,
            })
        }
            break;

        default: {
            return state;
        }
            break;
    }

}
export default Reducer;