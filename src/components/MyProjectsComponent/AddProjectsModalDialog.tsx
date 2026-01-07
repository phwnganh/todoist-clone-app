import QuestionIcon from "../icons/QuestionIcon.tsx";
import LargeCloseIcon from "../icons/LargeCloseIcon.tsx";
import FormSmallArrowDownIcon from "../icons/FormSmallArrowDownIcon.tsx";
import UserAvatar from '../../assets/User-avatar.png'
import CustomSwitch from "../ui/CustomSwitch.tsx";
import ListItemIcon from "../icons/ListItemIcon.tsx";
import BoardItemIcon from "../icons/BoardItemIcon.tsx";
import PremiumCalendarIcon from "../icons/PremiumCalendarIcon.tsx";
import PremiumStarIcon from "../icons/PremiumStarIcon.tsx";
import {type FormEvent, type MouseEvent, useState} from "react";
import AddProjectsColorListDropdown from "./AddProjectsColorListDropdown.tsx";
import {createPortal} from "react-dom";
import type {Color} from "../../types/color.type.ts";
import AddProjectsWorkspaceListDropdown from "./AddProjectsWorkspaceListDropdown.tsx";
import AddProjectsParentProjectListDropdown from "./AddProjectsParentProjectListDropdown.tsx";
import HashtagIcon from "../icons/HashtagIcon.tsx";

const AddProjectsModalDialog = ({onClose}: {onClose: () => void}) => {
    const [nameValue, setNameValue] = useState("");
    const [isOpenColorDropdown, setIsOpenColorDropdown] = useState(false);
    const [isOpenWorkspaceDropdown, setIsOpenWorkspaceDropdown] = useState(false);
    const [isOpenParentProjectsDropdown, setIsOpenParentProjectsDropdown] = useState(false);
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedParentProject, setSelectedParentProject] = useState<string | null>(null);
    const handleToggleColorDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpenColorDropdown(prev => !prev);
    }

    const handleToggleWorkspaceDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpenWorkspaceDropdown(prev => !prev);
    }

    const handleToggleParentProjectDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpenParentProjectsDropdown(prev => !prev);
    }

    const handleSelectColor = (color: Color) => {
        setSelectedColor(color)
        setIsOpenColorDropdown(false)
    }

    const handleSelectParentProjects = (parentProject: string) => {
        setSelectedParentProject(parentProject)
        setIsOpenParentProjectsDropdown(false)
    }
    const handleAddMyProjects = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return createPortal(
        <div className="fixed inset-0 bg-black/40 z-50 pt-[13vh]">
                <div className="w-120 max-w-full mx-auto rounded-large bg-white transition-all duration-500 ease-in-out">
                        <header className="flex justify-between py-2 pr-2 pl-4">
                            <div className="flex flex-wrap gap-xsmall">
                                <h1 className="font-medium text-product-library-display-primary-idle-tint">Add project</h1>
                                <div className="flex justify-center items-center">
                                    <QuestionIcon/>
                                </div>
                            </div>
                            <button className="flex justify-center items-center" onClick={onClose}>
                                <LargeCloseIcon/>
                            </button>
                        </header>
                        <hr className="border-t border-t-product-library-divider-tertiary"/>
                        <form onSubmit={(e) => handleAddMyProjects(e)}>
                            <div className="p-4 flex flex-col gap-large">
                                {/*name section*/}
                                <div>
                                    <label className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5">Name</label>
                                    <div className="border border-product-library-border-idle-tint rounded-small flex items-center justify-between hover:border-product-library-border-focus-tint">
                                        <input name="name" type="text" maxLength={120} className="py-1.5 px-2 w-full outline-none text-sm" onChange={e => setNameValue(e.target.value)} value={nameValue}/>
                                        {nameValue.length < 120 ?
                                            <div className="mr-xsmall -ml-xsmall text-sm text-product-library-display-secondary-idle-tint">{nameValue.length}/120</div>
                                            :
                                            <div className="mr-xsmall -ml-xsmall text-sm text-product-library-actionable-destructive-idle-tint">{nameValue.length}/120</div>}
                                    </div>
                                </div>

                                {/*color section*/}
                                <div className="relative">
                                    <label className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5">Color</label>
                                    <button onClick={(e) => handleToggleColorDropdown(e)} className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full">
                                        <div className="flex items-center justify-center w-6 h-6">
                                            <div className={`rounded-xl w-3 h-3 ${selectedColor?.hexadecimal ?? "bg-charcoal"}`}></div>
                                        </div>
                                        <div className="flex-1">
                                            <input type="hidden" className="whitespace-nowrap overflow-hidden absolute">
                                            </input>
                                            <div className="text-product-library-display-primary-idle-tint text-sm text-start">{selectedColor?.label ?? "Charcoal"}</div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <FormSmallArrowDownIcon/>
                                        </div>
                                    </button>
                                    {isOpenColorDropdown &&  <AddProjectsColorListDropdown selectedColor={selectedColor} onSelect={(color: Color) => handleSelectColor(color)}/>
                                    }
                                </div>


                                {/*workspace section*/}
                                <div className="relative">
                                    <label className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5">Workspace</label>
                                    <button onClick={e => handleToggleWorkspaceDropdown(e)} className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full">
                                        <div className="flex items-center justify-center w-4.5 h-4.5 rounded-small">
                                            <img src={UserAvatar} alt="user-avatar" className="object-cover w-full h-full"/>
                                        </div>
                                        <div className="flex-1">
                                            <input type="hidden" className="whitespace-nowrap overflow-hidden absolute">
                                            </input>
                                            <div className="text-product-library-display-primary-idle-tint text-sm text-start">My Projects</div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <FormSmallArrowDownIcon/>
                                        </div>
                                    </button>
                                    {isOpenWorkspaceDropdown && <AddProjectsWorkspaceListDropdown/>}
                                </div>


                                {/*parent project*/}
                                <div className="relative">
                                    <label className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5">Parent project</label>
                                    <button onClick={(e) => handleToggleParentProjectDropdown(e)} className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 justify-between hover:border-product-library-border-focus-tint w-full">
                                        <input type="hidden" className="whitespace-nowrap overflow-hidden absolute"/>
                                        <div className="flex items-center gap-1.5">
                                            {selectedParentProject !== "No Parent" &&
                                                <div className="flex justify-center items-center">
                                                    <HashtagIcon/>
                                                </div>}

                                            <div className="text-product-library-display-primary-idle-tint text-sm text-start">{selectedParentProject ?? "No Parent"}</div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <FormSmallArrowDownIcon/>
                                        </div>
                                    </button>
                                    {isOpenParentProjectsDropdown && <AddProjectsParentProjectListDropdown selectedProject={selectedParentProject} onSelect={(parentProject: string) => handleSelectParentProjects(parentProject)}/>}
                                </div>


                                {/*add to favorites*/}
                                <div className="flex items-center">
                                    <div className="mr-2 flex justify-center items-center">
                                        <CustomSwitch/>
                                    </div>
                                    <div className="text-sm text-product-library-display-primary-idle-tint">Add to favorites</div>
                                </div>
                                <div>
                                    <label className="text-product-library-selectable-tertiary-on-unselected-enabled-tint text-sm font-strong pb-1.5">Layout</label>
                                    <div className="flex justify-center border-2 border-product-library-selectable-background gap-0.75 bg-product-library-selectable-background rounded-large text-product-library-selectable-tertiary-on-selected-enabled-tint">
                                        <label className="pt-xsmall px-xsmall pb-small w-full">
                                            <input type="radio" className="sr-only"/>
                                            <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                                    <ListItemIcon/>
                                    List
                                </span>
                                        </label>

                                        <label className="pt-xsmall px-xsmall pb-small w-full">
                                            <input type="radio" className="sr-only"/>
                                            <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                                    <BoardItemIcon/>
                                    Board
                                </span>
                                        </label>

                                        <label className="pt-xsmall px-xsmall pb-small w-full">
                                            <input type="radio" className="sr-only"/>
                                            <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                                    <div className="relative">
                                        <PremiumCalendarIcon/>
                                       <div className="w-3.5 h-3.5 rounded-full absolute -right-0.5 bottom-0 flex justify-center items-center">
                                           <PremiumStarIcon/>
                                       </div>
                                    </div>
                                    Calendar
                                </span>
                                        </label>
                                    </div>
                                </div>


                                <hr className="border-t border-t-product-library-divider-tertiary"/>

                            </div>
                            <footer className="flex justify-end px-4 pb-4 gap-2.5">
                                <button type="button" className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17" onClick={onClose}>
                                    <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">Cancel</span>
                                </button>
                                <button type="submit" className="px-3 py-1.5 rounded-small bg-product-library-actionable-primary-idle-fill flex justify-center items-center min-w-17">
                                    <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">Add</span>
                                </button>
                            </footer>
                        </form>

                </div>
        </div>,
        document.body
    );
};

export default AddProjectsModalDialog;