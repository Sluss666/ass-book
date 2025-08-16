import type { User } from '../../../../types/User'

const Info = ({u}:{u:User}) => {
  return (
    <div className="flex items-center ms-6">
              <img
                className="md:w-12 h-12 rounded-full shadow-md"
                alt="profile-picture"
                src={
                  u?.pic && u.pic !== ""
                    ? u?.pic
                    : "/assets/profile_pictures/default-profile-pic.jpg"
                }
              />
              <section className="mx-2 min-w-24 max-w-32">
                <strong className="cursor-pointer">{u.user}</strong>
                {u.name !== "" && u.surnames !== "" && (
                  <p>
                    {u.name} {u.surnames}
                  </p>
                )}
              </section>
            </div>
  )
}

export default Info