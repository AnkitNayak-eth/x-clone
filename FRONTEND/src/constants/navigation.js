import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { RiAiGenerate } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";


export const navigationMenu=[
    {
        title:"Home",
        icon:<GoHome size={40} />,
        path:"/"
    },
    {
        title:"Explore",
        icon:<GoSearch size={40} />,
        path:"/explore"
    },
    {
        title:"Notifications",
        icon:<IoMdNotificationsOutline size={40} />,
        path:"/notification"
    },
    {
        title:"Messages",
        icon:<CiMail size={40} />,
        path:"/messages"
    },
    {
        title:"Grok",
        icon:<RiAiGenerate size={40} />,
        path:"/grok"
    },
    {
        title:"Premium",
        icon:<RiVerifiedBadgeLine size={40} />,
        path:"/verifed"
    },
    {
        title:"Profile",
        icon:<FaRegUser size={40}/>,
        path:"/profile"
    },
    {
        title:"More",
        icon:<CiCircleMore size={40}/>,
        path:"/more"
    }
]