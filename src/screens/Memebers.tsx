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
    <div className="min-h-screen  text-black flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-semibold mb-8">Family Members</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {familyMembers.map((mem: FamilyMemeber, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-lg text-white mb-1">{mem.name}</p>
            <p className="text-sm text-white mb-1">{mem.role}</p>
            <p className="text-xs text-white">
              Joined: {new Date(mem.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Members