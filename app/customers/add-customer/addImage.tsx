'use client';
import React from 'react';
import { Paperclip } from 'lucide-react';
import Image from "next/image";
import Logo from "../../assets/languageLogo.png";
import { usePathname } from "next/navigation";

const ROUTE_CONFIG = [
    { path: "/edit-customer", title: "Edit Contact Profile Image" },
    { path: "/add-customer", title: "Add Contact Profile Image" },
    { path: "/leads/add-lead", title: "Add Lead Profile Picture" },
    { path: "/leads/edit-lead", title: "Edit Lead Profile Picture" },
    { path: "/accounts/add-account", title: "Add contact Profile Image" },
    { path: "/accounts/edit-account", title: "Edit contact Profile Image" }
];
// TODO name adjustment
const AddImageBtn = () => {
    const pathname = usePathname();
    // const [selectedFile, setSelectedFile] = useState(null); // Manage selected image

    // Match route to corresponding title using configuration
    const routeInfo = ROUTE_CONFIG.find((route) => pathname === route.path) || {
        title: "Add Profile Picture"
    };

    // Handle file change and preview generation
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setSelectedFile(URL.createObjectURL(file));
    //     }
    // };

    return (
        <div className="flex items-center gap-8 ms-2 font-bold">
            <h2 className="text-primary text-[20px]">{routeInfo.title}</h2>

            {pathname==='/edit-customer'?
                <div className="w-[100px] h-[100px]">
                <Image
                    src={Logo}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>:''
            }

            <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
            />

            <label
                htmlFor="file-input"
                className="flex items-center gap-3 px-2 py-4
                           rounded border-2 border-blue-400 border-dashed
                           text-gray-500 cursor-pointer"
            >
                <Paperclip size="24px" className="text-primary" />
                { routeInfo ? "Change Image" : "Add Image"}
            </label>
        </div>
    );
};

export default AddImageBtn;
