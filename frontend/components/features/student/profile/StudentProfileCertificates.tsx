import { CertificateDto } from "../../../../types/certficateDto";
import { CertificateIcon, LinkIcon } from "../../../ui/Icons";
import SectionHeader from "../../../ui/SectionHeader";


export default function StudentProfileCertificates({ certificates }: { certificates: CertificateDto[] }) {
    return (
        <div className="flex flex-col space-y-2">
            <SectionHeader title="Certificates" />
            {certificates.map((certificate, id) => (
                <a key={id} href={certificate.certUrl}>
                    <div className="w-full px-4 py-2 bg-accent border border-primary rounded-md flex items-center gap-4">
                        <CertificateIcon className="text-primary" size={22} />
                        <div>{certificate.programName}.pdf</div>
                        <div className="ml-auto"><LinkIcon className="text-primary" size={18} /></div>
                    </div>
                </a>
            ))}
        </div>
    )
}
