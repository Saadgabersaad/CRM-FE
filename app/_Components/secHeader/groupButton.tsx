import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from "next/navigation";

interface SelectedButtonProps {
    onFilter: (value: string) => void;
}

export default function SelectedButton({ onFilter }: SelectedButtonProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const pathname = usePathname();

    // Button configurations based on the pathname
    const buttonConfigs = React.useMemo(() => {
        switch (pathname) {
            case '/customers':
                return [
                    { label: "Current Customers", filterValue: "current" },
                    { label: "Potential Customers", filterValue: "potential" }
                ];
            case '/leads':
                return [
                    { label: "My Team Leads", filterValue: "active" },
                    { label: "All Leads", filterValue: "inactive" }
                ];
            case '/accounts':
                return [
                    { label: "Active Accounts", filterValue: "active" },
                    { label: "Inactive Accounts", filterValue: "inactive" }
                ];
            default:
                return [];
        }
    }, [pathname]);

    const handleListItemClick = (filterValue: string, index: number) => {
        setSelectedIndex(index);
        onFilter(filterValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 'fit-content',
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 1,
                gap: 0.5,
                p: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}
            className="mainColor  flex-row rounded gap-0.5 font-[700] items-center  secondaryColor px-1.5 p-1"
        >
            {buttonConfigs.map((config, index) => (
                <div className="border-0 rounded" key={index}>
                    <ListItemButton
                        sx={{
                            borderRadius: '5px',
                            backgroundColor: selectedIndex === index ? 'white' : 'transparent',
                        }}
                        onClick={() => handleListItemClick(config.filterValue, index)}
                    >
                        <ListItemText
                            primary={config.label}
                            className={selectedIndex === index ? 'font-semibold' : ''}
                        />
                    </ListItemButton>
                </div>
            ))}
        </Box>
    );
}
