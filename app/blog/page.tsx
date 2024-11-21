import React from 'react';

interface Certification {
  title: string;
  issuedBy: string;
  date: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuedBy: "Microsoft",
    date: "June 2023",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/BidyadharSahu-6552/A04FB4EA8366C29B",
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Generative AI Professional (1Z0-1127-24)",
    issuedBy: "Oracle",
    date: "July 2024",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0FA59798687C2DE24DC51E776918211D9AB3C65D77EF293FA511CA35DFE00096",
  },
  {
    title: "Google Cybersecurity",
    issuedBy: "Google",
    date: "April 2024",
    link: "https://www.coursera.org/account/accomplishments/specialization/G4LJ92QBJ3MG",
  },
  {
    title: "ISC2 Candidate",
    issuedBy: "ISC2",
    date: "Sept 2025",
    link: "https://www.credly.com/badges/148f9a55-872d-4954-978e-52625aae8f05/linked_in_profile",
  },
  {
    title: "Oracle Cloud Infrastructure ",
    issuedBy: "Oracle",
    date: "Feb 2024",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=D84576430B24DA7FB48104E8E3BE442C279F08E87CC1F167711561D01654B486",
  },
  {
    title: "Google Analytics Certification",
    issuedBy: "Google",
    date: "July 2023",
    link: "https://skillshop.credential.net/923d473a-4122-4d49-887a-6179f76cd5b9",
  },
  {
    title: "AWS Educate Getting Started with Cloud Ops",
    issuedBy: "Amazon Web Services (AWS)",
    date: "April 2023",
    link: "https://www.credly.com/badges/47c2f896-e091-485e-8ecf-4deb05ecf079/linked_in_profile",
  },
  {
    title: "AWS Educate Getting Started with Compute",
    issuedBy: "Amazon Web Services (AWS)",
    date: "April 2023",
    link: "https://www.credly.com/badges/3332927e-6cb4-4bb7-994f-60bd974158ca/linked_in_profile",
  },
  {
    title: "AWS Educate Getting Started with Storage",
    issuedBy: "Amazon Web Services (AWS)",
    date: "April 2023",
    link: "https://www.credly.com/badges/3d97fd9d-bacc-4bfc-8807-6a7eef8180a4/linked_in_profile",
  },
];

const Blog = () => {
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
