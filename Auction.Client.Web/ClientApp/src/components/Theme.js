import { createMuiTheme } from '@material-ui/core/styles';

const COLORS = {
    BLACK: '#0d0c0f',
    MID_GREY: '#b3b3b3',
    LIGHT_GREY: '#e2e2e2',
    GREEN: '#0fcf7c',
    WHITE: '#fff',
    LIGHT_BLUE: '#7ec6f2',
    ORANGE: '#ecb933',
    RED: '#f44b33'
}

export default createMuiTheme({
    palette: {
        //primary: {
        //    main: COLORS.BLACK,
        //    contrastText: COLORS.WHITE,
        //},
        secondary: {
            main: COLORS.GREEN,
            contrastText: COLORS.BLACK,
        },
        lightGrey: {
            main: COLORS.LIGHT_GREY,
            contrastText: COLORS.BLACK,
        },
        midGrey: {
            main: COLORS.MID_GREY,
            contrastText: COLORS.WHITE,
        },
        background: {
            default: '#DFDBE5',
        },
    }
});
