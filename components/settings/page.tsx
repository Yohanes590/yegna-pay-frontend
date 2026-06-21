"use client"
import { Eye, CopyIcon, EyeClosed } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import cryptoRandomString from "crypto-random-string"
import { useUserData } from "@/lib/hooks/user_data_fetch"
import { usePathname } from "next/navigation"
import { ClipLoader } from "react-spinners"
import Cookies from "js-cookie"
import RequestBalanceShow from "@/components/dashboard-componets/balance-show"
export default function SettingRender() {
    const [APIKey, setApiKey] = useState<string>("")
    const [ShowState, setState] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const [projectName, setProjectName] = useState<string>("")
    const [webHookUrl, setWebHookUrl] = useState<string>("")
    const [expiresDate, setExpiresDate] = useState<string>("")
    const [paymentReceiver, setPaymentReceiver] = useState<string>("")
    const [projectDescription, setProjectDescription] = useState<string>("")



    const pathName = usePathname()
    const { user, function: fetchUserInfo, } = useUserData()

    const GenerateKey = () => {
        const NewKey = cryptoRandomString({ length: 32, type: "hex" })
        setApiKey(NewKey)
        toast.success("New Api Key Successfully Generated")
    }

    const APIShow = () => {
        if (ShowState == true) {
            setState(true)
        } else {
            setState(false)
        }
    }

    useEffect(() => { fetchUserInfo() }, [fetchUserInfo])

    useEffect(() => {
        const pathNameExtractor = pathName.split('/')[2]
        const userProject = user?.projects.find((project: any) => project.id == pathNameExtractor)
        setApiKey(userProject?.api_sec_key)


        // setting the values //

        setProjectName(userProject?.project_name)
        setWebHookUrl(userProject?.call_back_url)
        setExpiresDate(userProject?.before_expires)
        setPaymentReceiver(userProject?.receiver_name)
        setProjectDescription(userProject?.project_description)

    }, [user])


    async function UpdateProjectData() {
        const userToken = Cookies.get("access_token")
        const pathNameExtractor = pathName.split('/')[2]
        if (projectName == "" || APIKey == "" || webHookUrl == "" || projectDescription == "" || expiresDate == "") {
            toast.error("please filed the spaces")
        } else {
            const sendedData = {
                id: pathNameExtractor,
                token: userToken,
                updatedData: {
                    project_name: projectName,
                    api_sec_key: APIKey,
                    call_back_url: webHookUrl,
                    project_description: projectDescription,
                    before_expires: expiresDate,
                    receiver_name: paymentReceiver
                }
            }
            setButtonLoading(true)
            const RequestServer = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/user/edit-project", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendedData)
            })
            const ServerResponse = await RequestServer.json()
            setButtonLoading(false)
            if (ServerResponse.success) {
                toast.success(ServerResponse.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast.error(ServerResponse.message)
            }
        }

    }

    return (<>
        <RequestBalanceShow />

        <div className="setting-container h-screen mt-[50px]">
            <div
                className="container-header cursor-default"
            >
                <h1 className="font-bold text-2xl text-black/60">Project Setting</h1>
                <p>You can edit and change project information's</p>
            </div>

            <div className="line w-[90%] h-[2px] bg-black/10 mt-[20px]"></div>

            <div className="input-container mt-[30px] flex gap-7 items-center flex-wrap ">
                <div className="input-labels">
                    <div className="label">
                        <label>Project Name</label>
                    </div>
                    <div className="input mt-[5px]">
                        <input
                            value={projectName}
                            onChange={(e: any) => setProjectName(e.target.value)}
                            className="mt-[5px] bg-white outline-none h-[50px] w-[400px] rounded-xl shadow-lg pl-[15px]" type="text " placeholder="example name ..." />
                    </div>
                </div>


                <div className="input-labels">
                    <div className="label">
                        <label>Web Hook Back URL</label>
                    </div>
                    <div className="input mt-[5px]">
                        <input
                            value={webHookUrl}
                            onChange={(e: any) => setWebHookUrl(e.target.value)}
                            className="mt-[5px] bg-white outline-none h-[50px] w-[400px] rounded-xl shadow-lg pl-[15px]" type="text " placeholder="your.domain.com" />
                    </div>
                </div>


                <div className="input-labels">
                    <div className="label">
                        <label>API Key</label>
                    </div>
                    <div className="input mt-[5px] bg-white outline-none flex items-center gap-2 h-[50px] w-[400px] rounded-xl shadow-lg pl-[15px]">
                        <div className="outline-none" />
                        <div className="icon flex items-center gap-3">
                            {
                                ShowState ? (<>
                                    {APIKey}
                                    <Eye className="cursor-pointer" onClick={() => ShowState ? setState(false) : setState(true)} size={18} />
                                </>) : (<>
                                    *************************************
                                    <EyeClosed className="cursor-pointer" onClick={() => ShowState ? setState(false) : setState(true)} size={18} />


                                </>)
                            }
                            <CopyIcon
                                onClick={async () => {
                                    await navigator.clipboard.writeText(APIKey)
                                    toast.success("API key copied to clipboard!")
                                }}
                                className="cursor-pointer" size={15} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="lower-container mt-[30px] mb-[20px] flex gap-8">

                <div className="input-labels">
                    <div className="label">
                        <label>Do not accept payments before this date</label>
                    </div>
                    <div className="input mt-[5px]">
                        <input
                            value={expiresDate}
                            onChange={(e: any) => setExpiresDate(e.target.value)}
                            type="date" className="mt-[5px] bg-white outline-none h-[50px] w-[400px] rounded-xl shadow-lg pl-[15px]" />
                    </div>
                </div>

                <div className="input-labels ">
                    <div className="label">
                        <label>{paymentReceiver}</label>
                    </div>
                    <div className="input mt-[5px]">
                        <input
                            value={paymentReceiver ?? ""}
                            onChange={(e: any) => setPaymentReceiver(e.target.value)}
                            className="mt-[5px] bg-white outline-none h-[50px] w-[400px] rounded-xl shadow-lg pl-[15px]"
                            type="text"
                            placeholder="payment..."
                        />
                    </div>
                </div>
            </div>


            <div className="input-labels mt-[15px]">
                <div className="label">
                    <label>Project Description</label>
                </div>
                <div className="input mt-[5px]">
                    <textarea
                        value={projectDescription}
                        onChange={(e: any) => setProjectDescription(e.target.value)}
                        className="mt-[5px] bg-white outline-none w-[560px] h-[200px] pt-[20px] rounded-xl shadow-lg pl-[15px]" placeholder="this project ..." />
                </div>
            </div>
            <div className="buttons flex items-center gap-4 mt-[20px]">
                <button
                    onClick={GenerateKey}
                    className="h-[45px] w-[250px] bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 duration-150">Regenerate API Key</button>
                <button
                    onClick={UpdateProjectData}
                    disabled={buttonLoading}
                    className={`h-[45px] w-[300px] gap-2 flex items-center justify-center ${buttonLoading ? "bg-blue-500/50 text-white/70 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer "} rounded-lg  duration-150`}>
                    {
                        buttonLoading ? (<>
                            Saving progress
                            <ClipLoader size={20} color="white" />
                        </>) : (<>
                            Save Changes
                        </>)
                    }
                </button>
            </div>

            {/* <div className="pricing-section mt-[50px]">
                <div className="container-header cursor-default">
                    <h1 className="font-bold text-2xl text-black/60">Request Balance</h1>
                    <p>Upgrade your plan with additional requests for improved performance and reliability.</p>
                </div>




            </div> */}


        </div>
    </>)
}

// havu011221