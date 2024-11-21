import FakeTerminalWindow from '../components/certification/FakeTerminalWindow';
import Prompt from '../components/certification/Prompt';

interface Certification {
  title: string;
  issuedBy: string;
  date: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuedBy: "Amazon Web Services",
    date: "March 2023",
    link: "https://example.com/cert/aws",
  },
  {
    title: "Microsoft Certified: Azure Developer Associate",
    issuedBy: "Microsoft",
    date: "June 2023",
    link: "https://example.com/cert/azure",
  },
  {
    title: "Certified Blockchain Developer",
    issuedBy: "Blockchain Council",
    date: "January 2024",
    link: "https://example.com/cert/blockchain",
  },
];

const CertificationList = ({ certifications }: { certifications: Certification[] }) => (
  <ul>
    {certifications.map((cert, index) => (
      <li key={index} className="mb-4">
        <p>
          <span className="font-semibold">{cert.title}</span> <br />
          Issued by: {cert.issuedBy} <br />
          Date: {cert.date}
        </p>
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Certification
          </a>
        )}
      </li>
    ))}
  </ul>
);

const Certification = () => {
  return (
    <div className="space-y-10 my-10 break-words">
      {/* certifications section */}
      <FakeTerminalWindow>
        <Prompt content="cd certifications/" />
        <Prompt directory="/certifications" branch={true} content="ls" />
        <CertificationList certifications={certifications} />
      </FakeTerminalWindow>
    </div>
  );
};

export default Certification;
