import { useEffect, useState } from "react";
import { useUserStore } from "@/data/userstore";
import { getAllGroupMediaWithNames } from "@/data/supabaseclient";
import type { GroupMediaItem } from "@/data/types";


const Home = () => {
  const groupId = useUserStore((s) => s.userData?.user.id)
  const [media, setMedia] = useState<GroupMediaItem[]>([])

  useEffect(() => {
    if (!groupId) return

    getAllGroupMediaWithNames(groupId).then(setMedia)
  }, [groupId])

  return (
    <div className="">
        <div className="flex justify-center items-center">
            <p>Current Uploads</p>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {media.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
            {item.url.match(/\.(mp4|mov|webm)$/i) ? (
                <video src={item.url} controls className="w-full h-auto rounded shadow" />
            ) : (
                <img src={item.url} alt="media" className="w-full h-auto rounded shadow" />
            )}
            <span className="mt-2 text-sm text-center text-muted-foreground">
                Uploaded by: {item.uploader}
            </span>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Home;
