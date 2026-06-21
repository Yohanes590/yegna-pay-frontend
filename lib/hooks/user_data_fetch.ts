import { create } from 'zustand'
import { UserInfo } from '../api_end_poing'
type UserData = {
    email: string,
    avatar_url: string,
    projects: any,
    payment_plan: string,
    full_name: string,
    status: string | number,
    request_available: number

}

type StorageType = {
    user: UserData | null,
    loading: boolean,
    message: string,
    function: () => Promise<void>,
}

export const useUserData = create<StorageType>((set, get) => ({
    user: null,
    loading: false,
    message: "",
    function: async () => {
        if (get().user) return
        set({ loading: true })
        try {
            const userInfo: any = await UserInfo()
            if (userInfo.message != "success") {
                set({ user: userInfo.user, loading: true, message: userInfo.message })
            } else {
                set({ user: userInfo.user, loading: false, message: userInfo.message })
            }
        } catch (error: any) {
            set({ user: null, loading: false })
        }

    }
}))