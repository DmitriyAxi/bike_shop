import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../Store/Store.ts";
import { switchTheme } from "../Store/ThemeSlice.ts";

export const useTheme = () => {
    const isLight = useSelector((state: RootState) => state.theme.isLight);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch(switchTheme());
    };

    return { isLight, toggleTheme };
};