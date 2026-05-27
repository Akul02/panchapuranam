"use client"

import { useEffect, useState } from 'react'
import StyledSelect from "../../ui/StyledSelect";
import { StudentProfileEnrolmentDto } from "../../../types/student";
import { useParams } from "next/navigation";
import { MultiValue } from "react-select";
import { getPrograms } from "../../../api/program";
import { enrolStudentInProgram } from "../../../api/enrolment";

export default function StudentProgramEnrolment( {currentEnrolments, onSuccess} : {currentEnrolments: StudentProfileEnrolmentDto[], onSuccess : () => void}) {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [newPrograms, setNewPrograms] = useState<string[]>([]);
    const [programOptions, setProgramOptions] = useState<string[]>([]);    

    useEffect(() => {
        getPrograms()
            .then(allPrograms => {
                // for each program go through current enrolments, to see if it is there, if it is not, the program is available
                const availablePrograms = allPrograms.filter(p => !currentEnrolments.some(e => e.programName === p));
                if (availablePrograms.length >= 1) {
                    setProgramOptions(availablePrograms);
                } else {
                    setMessage("Already enrolled in all programs");
                }
            })
            .catch(err => {setError(err.message); console.log(err)});
    }, []);

    const handleSelectInput = (selected : MultiValue<{value : string, label : string}>) => {
        const programs = selected.map((item) => item.value);
        setNewPrograms(programs);
    }

    const params = useParams<{id : string}>();

    const handleConfirm = async () => {
        if (!newPrograms.length) {
            if (!programOptions.length){
                setError("See below")
            } else{
                setError("Please select at least one program");
            }
            return;
        }

        setError(null);
    
        try {
            const resSuccess = await enrolStudentInProgram(params.id, newPrograms);
            setMessage(resSuccess.message);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setMessage(null);
        }

    }
    
    return (
        <div className="">
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            {/* revisit text colour when making colour pallete */}
            {message && <p className="text-primary text-sm font-semibold mb-1">{message}</p>} 
            <StyledSelect options={programOptions?.map(p => ({value: p, label: p}))} handleSelectInput={handleSelectInput} instanceId="programEnrolments" label="Select Programs"/>
            <div className="w-full flex justify-center">
                <button onClick={handleConfirm} className="w-1/2 mt-2 bg-primary text-secondary font-bold text-sm py-2.5 rounded-md hover:bg-secondary hover:text-primary transition-colors">
                    Confirm Enrolment
                </button>
            </div>
            
        </div>
    )
}
