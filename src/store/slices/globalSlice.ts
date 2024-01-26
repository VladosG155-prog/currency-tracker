import { createSlice } from '@reduxjs/toolkit';
import { Themes } from '@root/@types/enums';

interface IState {
  theme: Themes;
  showLoader: boolean;
  showModal: boolean;
}

const initialState: IState = {
  theme: (localStorage.getItem('theme') as Themes) || Themes.Dark,
  showLoader: false,
  showModal: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export default globalSlice.reducer;

export const { changeTheme, toggleModal } = globalSlice.actions;
