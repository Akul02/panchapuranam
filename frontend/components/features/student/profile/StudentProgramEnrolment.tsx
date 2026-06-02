"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MultiValue } from "react-select";
import { enrolStudentInProgram } from "../../../../api/client/enrolment";
import SubmitButton from "../../../ui/buttons/SubmitButton";
import StyledSelect from "../../../ui/form/StyledSelect";
import Modal from "../../../ui/Modal";

export default function StudentProgramEnrolment({
    availablePrograms,
    onSuccess,
    showEnrolModal,
    setShowEnrolModal,
}: {
    availablePrograms: string[];
    onSuccess: () => void;
    showEnrolModal: boolean;
    setShowEnrolModal: (value: boolean) => void;
}) {
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [newPrograms, setNewPrograms] = useState<string[]>([]);
    const [programOptions, setProgramOptions] = useState<string[]>([]);

    const handleSelectInput = (
        selected: MultiValue<{ value: string; label: string }>,
    ) => {
        const programs = selected.map((item) => item.value);
        setNewPrograms(programs);
    };

    const params = useParams<{ id: string }>();

    const handleConfirm = async () => {
        if (!newPrograms.length) {
            if (!programOptions.length) {
                setError("See below");
            } else {
                setError("Please select at least one program");
            }
            return;
        }

        setError(null);

        try {
            const resSuccess = await enrolStudentInProgram(
                params.id,
                newPrograms,
            );
            setMessage(resSuccess.message);
            onSuccess();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong",
            );
            setMessage(null);
        }
    };

    return (
        <Modal className={`${showEnrolModal ? "block" : "hidden"}`} onClose={() => setShowEnrolModal(false)} title="Enrol Student into Programs">
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            {/* revisit text colour when making colour pallete */}
            {message && (
                <p className="text-primary text-sm font-semibold mb-1">
                    {message}
                </p>
            )}
            {availablePrograms.length == 0 ? (
                <p className="text-primary text-sm font-semibold mb-2">
                    Student already enrolled in all programs
                </p>
            ) : null}
            <StyledSelect
                options={availablePrograms.map((p) => ({ value: p, label: p }))}
                handleSelectInput={handleSelectInput}
                instanceId="programEnrolments"
                label="Select Programs"
            />
            <div className="w-full flex justify-center">
                <SubmitButton className="mt-4 w-3/4" onclick={handleConfirm}>
                    Confirm Enrolment
                </SubmitButton>
            </div>
        </Modal>
    );
}
