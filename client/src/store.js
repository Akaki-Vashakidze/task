import create from 'zustand';

const useStore = create((set => ({
    data:[],
    loadData : (serverData) => set((state) => ({data:serverData})),
})))

export default useStore;