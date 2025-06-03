import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { SignOut } from "@/data/supabaseclient"

const Navbar = () => {
  return (
    <nav>
        <div className="w-screen flex justify-center items-center space-x-4">
            <Button asChild variant="ghost">
                <Link to="/home">Home</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link to="/members">Members</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link to="/media">Media</Link>
            </Button>
            <Button onClick={async () => await SignOut()} asChild variant="ghost">
                <p>Signout</p>
            </Button>
        </div>
    </nav>
  )
}

export default Navbar