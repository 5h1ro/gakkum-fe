import { createTheme } from '@mui/material/styles';

export const themes = createTheme({
    typography: {
        button: {
            textTransform: 'capitalize',
        },
    },
    palette: {
        primary: {
            main: '#3c7d21',
        },
        secondary: {
            main: "#3c7d21"
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline:after": {
                        borderBottomColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: '#3c7d21',
                            borderWidth: '2px',
                            borderRadius: '10px'
                        }
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline:after": {
                        borderBottomColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: '#3c7d21',
                            borderWidth: '2px',
                            borderRadius: '10px'
                        }
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#3c7d21',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    }
                }
            }
        }
    }
});