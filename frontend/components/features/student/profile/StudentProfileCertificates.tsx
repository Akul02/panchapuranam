import { FaExternalLinkAlt } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { CertificateDto } from "../../../../types/certficateDto";
import SectionHeader from "../../../ui/SectionHeader";


export default function StudentProfileCertificates({ certificates }: { certificates: CertificateDto[] }) {
    return (
        <div className="flex flex-col space-y-2">
            <SectionHeader title="Certificates" />
            {certificates.map((certificate, id) => (
                <a key={id} href={certificate.certUrl}>
                    <div className="w-full px-4 py-2 border border-primary rounded-md flex items-center gap-4">
                        <PiCertificateBold color="#6E3326" size={22} />
                        <div>{certificate.programName}.pdf</div>
                        <div className="ml-auto"><FaExternalLinkAlt color="#6E3326" size={18} /></div>
                    </div>
                </a>
            ))}
        </div>
    )
}
