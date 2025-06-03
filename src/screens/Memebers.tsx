import { getMembersById } from "@/data/supabaseclient"
import type { FamilyMemeber } from "@/data/types"
import { useUserStore } from "@/data/userstore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Members = () => {
    const [familyMembers, setFamilyMembers] = useState<FamilyMemeber[]>([])
    const groupId = useUserStore((state) => state.userData?.user.id)
    const navigator = useNavigate()

    if(groupId === null || groupId === undefined) {
        navigator("/signin")
    }

    useEffect(() => {
        async function getMembers() {
            const data = await getMembersById(groupId!)
            if (data === null ){
                return
            }
            setFamilyMembers(data)
        }

        getMembers()
    }, [])

  return (
    <div>
        <p>Family Members</p>
        {familyMembers?.map((mem : FamilyMemeber) => (
            <div className="space-x-2 flex">
                <p>{mem.name}</p>
                <p>{mem.role}</p>
                <p>{mem.created_at}</p>
            </div>
        ))}
    </div>
  )
}

export default Members