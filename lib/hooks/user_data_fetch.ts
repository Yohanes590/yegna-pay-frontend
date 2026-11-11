import { create } from 'zustand';
import { UserDataFetch } from '@/app/backend-service/api-fetch/fetch-user-data';

type UserData = {
    email: string;
    avatar_url: string;
    projects: any;
    payment_plan: string;
    full_name: string;
    status: string | number;
    request_available: number;
    free_requests_remaining?: number;
    free_requests_used?: number;
    paid_requests_balance?: number;
    paid_requests_used?: number;
    revenues?: any[];
};

type StorageType = {
    user: UserData | null;
    loading: boolean;
    message: string;
    function: () => Promise<void>;
};

export const useUserData = create<StorageType>((set, get) => ({
    user: null,
    loading: true,
    message: "",
    function: async () => {
        if (get().user) {
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            const userInfo: any = await UserDataFetch();
            if (userInfo.message === "success" && userInfo.user) {
                set({ user: userInfo.user, loading: false, message: "success" });
            } else {
                set({ user: null, loading: false, message: userInfo?.message || "error" });
            }
        } catch {
            set({ user: null, loading: false, message: "network_error" });
        }
    }
}));
