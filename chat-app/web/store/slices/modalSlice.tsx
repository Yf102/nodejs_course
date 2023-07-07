import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store'

type Modal = {
  modalName: string
  visible: boolean
}

type ModalState = {
  targetModals: Modal[]
}

const initialState: ModalState = {
  targetModals: [],
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<string>) => {
      if (state.targetModals.length != 0) {
        state.targetModals.map((e) => (e.visible = false))
      }

      const target = state.targetModals.filter(
        (i) => i.modalName === action.payload
      )
      if (target?.length !== 0) {
        target[0].visible = true
      } else {
        state.targetModals.push({ modalName: action.payload, visible: true })
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const target = state.targetModals.filter(
        (i) => i.modalName === action.payload
      )
      if (target?.length !== 0) {
        target[0].visible = false
      }
    },
  },
})

export const { showModal, closeModal } = modalSlice.actions
export const selectTargetModals = (state: AppState) => {
  const { targetModals } = state.modal
  return { targetModals }
}
export default modalSlice.reducer
