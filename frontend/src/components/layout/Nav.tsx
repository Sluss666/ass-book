import { HiHome } from 'react-icons/hi'
import { HiMiniUsers } from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation()
  return (
    <ul className="w-1/4 md:w-2/4 -right-48 md:-right-[0%] relative flex gap-4 bottom-8 -mb-10 justify-end text-white">
          <li>
            <Link  reloadDocument id="people-link" to={"people"}>
              <HiMiniUsers
                className="hover:text-slate-200"
                size={location.pathname.split("/")[2] == "people" ? 46 : 40}
              />
              {location.pathname.split("/")[2] == "people" && (
                <label className="text-sm mx-auto" htmlFor="people-link">
                  People
                </label>
              )}
            </Link>
          </li>
          <li>
            <Link reloadDocument id="index-link" to={"/index"} className="grid">
              <HiHome
                className="hover:text-slate-200"
                size={
                  location.pathname.split("/")[1] == "index" &&
                  !location.pathname.split("/")[2]
                    ? 50
                    : 40
                }
              />
              {location.pathname.split("/")[1] == "index" &&
                !location.pathname.split("/")[2] && (
                  <label className="text-sm mx-auto" htmlFor="index-link">
                    Home
                  </label>
                )}
            </Link>
          </li>
        </ul>
  )
}

export default Nav