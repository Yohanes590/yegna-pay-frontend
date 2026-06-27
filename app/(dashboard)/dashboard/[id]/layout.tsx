"use client"
import { useEffect, useState } from "react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { usePathname } from "next/navigation";
import NoProjects from "@/components/dashboard-componets/no-projects";
import LoadingScreen from "@/components/loading";
export default function DetailedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const { user, function: fetchUser, loading } = useUserData()
    const [loadingState, setLoading] = useState<boolean>(false)
    const [checkPathName, setPathName] = useState<boolean>(true)
    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        const pathId = pathName?.split('/')[2]
        if (user?.status == 200) {
            setLoading(false)
        } else if (loading) {
            setLoading(true)
        } else if (!loading) {
            const findProject = user?.projects.find((project: any) => project.id == pathId)
            if (findProject === undefined) {
                setPathName(true)
            } else {
                setPathName(false)
                setLoading(false)
            }

        }


    }, [user])

    if (loadingState) {
        return <LoadingScreen />
    } else if (checkPathName) {
        return <NoProjects />
    } else {
        return (

            <main >
                <div className="">
                    {children}
                </div>
            </main>
        );
    }

}
