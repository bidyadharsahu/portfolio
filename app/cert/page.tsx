import React from 'react';

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

const Cert = () => {
  return (
    <div className="space-y-6 my-10 px-6">
      <h1 className="text-2xl font-bold mb-6">My Certifications</h1>
      <ul className="space-y-4">
        {certifications.map((cert, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded shadow">
            <p className="font-semibold text-lg">{cert.title}</p>
            <p className="text-sm text-gray-600">
              <strong>Issued By:</strong> {cert.issuedBy}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {cert.date}
            </p>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                View Cert
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
