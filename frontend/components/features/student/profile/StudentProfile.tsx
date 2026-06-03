import { getStudentAvailablePrograms, getStudentProfile } from "../../../../api/server/studentServer";
import StyledPageCard from "../../../ui/cards/StyledPageCard";
import StudentProfileCertificates from "./StudentProfileCertificates";
import StudentProfileContactDetails from "./StudentProfileContactDetails";
import StudentProfileEnrolmentDetails from "./StudentProfileEnrolmentDetails";


export default async function StudentProfile({studentId} : {studentId : number}) {

    const student = await getStudentProfile(studentId.toString());

    const availablePrograms = await getStudentAvailablePrograms(studentId.toString());
    
    return (
        <div className="flex justify-center w-screen">
            <StyledPageCard className="w-[80%] mt-8 sm:mt-16 md:w-[70%] lg:w-[60%] lg:mt-32 2xl:w-[40%] 2xl:mt-40">

                <div className="p-6 flex flex-col space-y-4">

                    {/* profile header */}
                    <div className="flex">
                        <div className="w-20 h-20 rounded-full bg-primary border-2 border-accent flex-shrink-0
                            flex items-center justify-center text-white text-2xl font-bold font-heading tracking-wide">
                            {student.firstname.charAt(0).toLocaleUpperCase()}{student.lastname.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-primary font-bold font-heading text-xl pl-6">
                            {student.firstname} {student.lastname}
                            <p className="text-sm mt-0.5">Student ID: #{student.id}</p>    
                        </div>
                    </div>

                    <hr className="border-primary h-[2px]"/>

                    {/* contact details */}
                    <StudentProfileContactDetails student={student}/>

                    {/* enrolments */}
                    <StudentProfileEnrolmentDetails enrolments={student?.enrolments} availablePrograms={availablePrograms}/>
                    
                    {/* Certificates */}
                    <StudentProfileCertificates certificates={student.certificates}/>
                </div>

            </StyledPageCard>

        </div>
    )
}
