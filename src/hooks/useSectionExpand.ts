import {useState} from "react";

export const useSectionExpand = (defaultOpen = true) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen)
    const handleExpanded = () => {
        setIsExpanded(prev => !prev)
    }
    return {isExpanded, handleExpanded}

}