import create from 'zustand';

const useStore = create((set => ({
    data:[],
    // addElement: (element) => set((state) => ({data:[...state.data,element]})),
    // deleteElement : (elementID) => set((state) => ({data:state.data.filter(item => {return item.id != elementID})})),
    // addElement : (elementObj) => set((state) => ({data:state.data.push(elementObj)})),
    loadData : (serverData) => set((state) => ({data:serverData})),
})))

export default useStore;