import React from 'react';
import { LetterTemplate } from '../types/resignation';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import ResignationLetterApp from '../components/resignation-letter/client/ResignationLetterApp';
import StructuredData from '../components/seo/StructuredData';

interface ResignationLetterPageProps {
  initialTemplate?: LetterTemplate;
}

const ResignationLetterPage: React.FC<ResignationLetterPageProps> = ({ initialTemplate }) => {
  return (
    <>
      <StructuredData />
      <NavBar />
      <ResignationLetterApp initialTemplate={initialTemplate} />
      <Footer />
    </>
  );
};

export default ResignationLetterPage;