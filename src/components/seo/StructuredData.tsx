import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Resignation Letter Template",
    "description": "Create professional resignation letters instantly with our free templates. Choose from multiple templates, customize with your details, and download in various formats.",
    "url": "https://resignationletter.net/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Professional resignation letter templates",
      "Customizable form fields",
      "PDF, Word, and text download options",
      "Mobile-responsive design",
      "Privacy-focused (no data storage)",
      "Comprehensive writing guide",
      "FAQ section"
    ],
    "author": {
      "@type": "Organization",
      "name": "Resignation Letter Template"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Resignation Letter Template"
    },
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2025-01-26",
    "dateModified": "2025-01-26"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a resignation letter and why do I need one?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A resignation letter is a formal document that officially notifies your employer of your intention to leave your job. It serves as legal documentation, helps maintain professional relationships, provides a clear record of your departure date, and ensures a smooth transition process."
        }
      },
      {
        "@type": "Question",
        "name": "How much notice should I give when resigning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard notice period is two weeks for most positions. However, senior roles may require 4-6 weeks, and executive positions often need 3-6 months. Always check your employment contract for specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What should I include in my resignation letter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your resignation letter should include: the date, recipient's name and title, a clear statement of resignation, your last working date, a brief reason (optional), an offer to help with transition, expression of gratitude, and your signature."
        }
      },
      {
        "@type": "Question",
        "name": "Do I have to give a reason for resigning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you are not legally required to provide a reason for resigning. However, giving a brief, professional reason can help maintain positive relationships and provide closure."
        }
      }
    ]
  };

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Write a Professional Resignation Letter",
    "description": "Step-by-step guide to writing a professional resignation letter that maintains good relationships and ensures a smooth transition.",
    "image": "https://resignationletter.net/og-image.png",
    "totalTime": "PT15M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Computer or mobile device"
      },
      {
        "@type": "HowToSupply",
        "name": "Internet connection"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Resignation Letter Template"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose a Template",
        "text": "Select from professional resignation letter templates based on your situation (standard, immediate, career change, retirement, or personal reasons).",
        "image": "https://resignationletter.net/step1.png"
      },
      {
        "@type": "HowToStep",
        "name": "Fill in Your Details",
        "text": "Complete the form with your personal information including name, position, company, supervisor, and last working date.",
        "image": "https://resignationletter.net/step2.png"
      },
      {
        "@type": "HowToStep",
        "name": "Review and Customize",
        "text": "Preview your resignation letter and add any optional personal message or reason for leaving.",
        "image": "https://resignationletter.net/step3.png"
      },
      {
        "@type": "HowToStep",
        "name": "Download Your Letter",
        "text": "Download your professional resignation letter in PDF, Word, or text format, or copy it to your clipboard.",
        "image": "https://resignationletter.net/step4.png"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
    </>
  );
};

export default StructuredData;