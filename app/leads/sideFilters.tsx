import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function AccordionUsage({
                                           Status,
                                           source,
                                           interest,
                                           field,
                                       }: {
    Status?: { statusFilter: string; setStatusFilter: (value: string) => void };
    source?: { sourceFilter: string; setSourceFilter: (value: string) => void };
    interest?: { interestFilter: string; setInterestFilter: (value: string) => void };
    field?: { fieldFilter: string; setFieldFilter: (value: string) => void };
}) {
    const filters = [
        {
            id: "status",
            title: "Industry Sector",
            filter: Status,
            getFilterValue: (filter: any) => filter.statusFilter,
            setFilterValue: (filter: any, value: string) => filter.setStatusFilter(value),
            options: [
                { value: "", label: "ALL" },
                { value: "new", label: "New" },
                { value: "contacted", label: "Contacted" },
                { value: "qualified", label: "Qualified" },
                { value: "lost", label: "Lost" },
            ],
        },
        {
            id: "source",
            title: "Source",
            filter: source,
            getFilterValue: (filter: any) => filter.sourceFilter,
            setFilterValue: (filter: any, value: string) => filter.setSourceFilter(value),
            options: [
                { value: "", label: "ALL" },
                { value: "website", label: "Website" },
                { value: "referral", label: "Referral" },
                { value: "event", label: "Event" },
            ],
        },
        {
            id: "interest",
            title: "Interest Level",
            filter: interest,
            getFilterValue: (filter: any) => filter.interestFilter,
            setFilterValue: (filter: any, value: string) => filter.setInterestFilter(value),
            options: [
                { value: "", label: "ALL" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
            ],
        },
        {
            id: "field",
            title: "Field",
            filter: field,
            getFilterValue: (filter: any) => filter.fieldFilter,
            setFilterValue: (filter: any, value: string) => filter.setFieldFilter(value),
            options: [
                { value: "", label: "ALL" },
                { value: "Medical", label: "Medical" },
                { value: "IT", label: "IT" },
                { value: "3", label: "etc." },
            ],
        },
    ];

    return (
        <div>
            {filters.map((filter) => (
                <Accordion key={filter.id} className="secondaryColor shadow-none  font-bold">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${filter.id}-content`}
                        id={`${filter.id}-header`}
                        className="mainColor border-0   text-xl font-bold"
                    >
                        {filter.title}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {filter.options.map((option) => (
                                <li key={option.value}>
                                    <FormControlLabel
                                        className="dark80"
                                        control={
                                            <Checkbox
                                                className="mainColor color"
                                                onChange={() =>
                                                    filter.filter && filter.setFilterValue(filter.filter, option.value)
                                                }
                                                checked={
                                                    filter.filter && filter.getFilterValue(filter.filter) === option.value
                                                }
                                            />
                                        }
                                        label={option.label}
                                    />
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}



// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import {Checkbox, FormControlLabel} from "@mui/material";
//
// export default function AccordionUsage({Status ,source,interest,field}:{Status?: string|any ,source?:string|any}) {
//
//     const LEAD_STATUS_FILTER = {
//         id:'id',
//         name:'Lead Status',
//         options :[
//             {value:'',label:'ALL'},
//             {value:'new',label:'New'},
//             {value:'contacted',label:'Contacted'},
//             {value:'qualified',label:'Qualified'},
//             {value:'lost',label:'Lost'},
//
//         ] as const,
//     }
//
//     const LEAD_SOURCE_FILTER = {
//         id:'',
//         name:'Lead Status',
//         options :[
//             {value:'',label:'ALL'},
//             {value:'website',label:'Website'},
//             {value:'referral',label:'Referral'},
//             {value:'event',label:'Event'},
//
//         ] as const,
//     }
//
//     const LEAD_INTEREST_FILTER = {
//         id:'',
//         name:'Lead Status',
//         options :[
//             {value:'',label:'ALL'},
//             {value:'high',label:'High'},
//             {value:'medium',label:'Medium'},
//             {value:'low',label:'Low'},
//
//         ] as const,
//     }
//
//     const LEAD_FIELD_FILTER = {
//         id:'',
//         name:'Lead Status',
//         options :[
//             {value:'',label:'ALL'},
//             {value:'Medical',label:'Medical'},
//             {value:'IT',label:'IT'},
//             {value:'3',label:'etc.'},
//
//         ] as const,
//     }
//
//
//     const { statusFilter, setStatusFilter } = Status;
//     const { sourceFilter, setSourceFilter } = source;
//     const { interestFilter, setInterestFilter } = interest;
//     const { fieldFilter, setFieldFilter } = field;
//
//
//
//     return (
//         <div>
//             <Accordion  className='secondaryColor shadow-none font-bold ' >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                     className='mainColor border-b pb-2 text-xl font-bold'>
//
//                     Industry Sector
//                 </AccordionSummary>
//
//                 <AccordionDetails >
//                     <ul>
//                         {LEAD_STATUS_FILTER.options.map((option) => (
//                             <li  key={option.value}>
//
//                                 <FormControlLabel className='dark80'
//
//                                                   control={<Checkbox className='mainColor color'
//                                                                      onChange={() => setStatusFilter(option.value)}
//                                                                      checked={statusFilter === option.value}/>} label={option.label} />
//
//                             </li>
//                         ))}
//                     </ul>
//                 </AccordionDetails>
//
//             </Accordion>
//
//             <Accordion  className='secondaryColor shadow-none font-bold ' >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                     className='mainColor border-b pb-2 text-xl font-bold'>
//
//                     Source
//                 </AccordionSummary>
//
//                 <AccordionDetails >
//                     <ul>
//                         {LEAD_SOURCE_FILTER.options.map((option) => (
//                             <li  key={option.value}>
//
//                                 <FormControlLabel className='dark80'
//
//                                                   control={<Checkbox className='mainColor color'
//                                                                      onChange={() => setSourceFilter(option.value)}
//                                                                      checked={sourceFilter === option.value}/>} label={option.label} />
//
//                             </li>
//                         ))}
//                     </ul>
//                 </AccordionDetails>
//
//             </Accordion>
//             <Accordion  className='secondaryColor shadow-none font-bold ' >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                     className='mainColor border-b pb-2 text-xl font-bold'>
//
//                     Interest Level
//                 </AccordionSummary>
//
//                 <AccordionDetails >
//                     <ul>
//                         {LEAD_INTEREST_FILTER.options.map((option) => (
//                             <li  key={option.value}>
//
//                                 <FormControlLabel className='dark80'
//
//                                                   control={<Checkbox className='mainColor color'
//                                                                      onChange={() => setInterestFilter(option.value)}
//                                                                      checked={   interestFilter=== option.value}/>} label={option.label} />
//
//                             </li>
//                         ))}
//                     </ul>
//                 </AccordionDetails>
//
//             </Accordion>
//             <Accordion  className='secondaryColor shadow-none font-bold ' >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                     className='mainColor border-b pb-2 text-xl font-bold'>
//
//                     Field
//                 </AccordionSummary>
//
//                 <AccordionDetails >
//                     <ul>
//                         {LEAD_FIELD_FILTER.options.map((option) => (
//                             <li  key={option.value}>
//
//                                 <FormControlLabel className='dark80'
//                                                   control={<Checkbox
//                                                       className='mainColor color'
//                                                       onChange={() => setFieldFilter(option.value)}
//                                                       checked={   fieldFilter=== option.value}/>} label={option.label} />
//
//                             </li>
//                         ))}
//                     </ul>
//                 </AccordionDetails>
//
//             </Accordion>
//
//
//         </div>
//     );
// }


