import { Metadata } from 'next';
import NavBar from '../../src/components/elements/NavBar';
import Footer from '../../src/components/elements/Footer';
import Container from '../../src/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - Resignation Letter Generator',
  description: 'Learn how we protect your privacy. Our resignation letter generator processes all data locally on your device with no server storage.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar />
      <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '40px 0' }}>
        <Container>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '60px 40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              color: '#1f2937',
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Privacy Policy
            </h1>
            
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Last updated: January 26, 2025
            </p>

            <div style={{ color: '#374151', fontSize: '16px', lineHeight: '1.7' }}>
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Our Privacy Commitment
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  At Resignation Letter Generator, we are committed to protecting your privacy. This privacy policy 
                  explains how we handle your information when you use our resignation letter generation service.
                </p>
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ color: '#065f46', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                    🔒 Key Privacy Principle
                  </h3>
                  <p style={{ color: '#047857', margin: 0 }}>
                    <strong>We do not collect, store, or transmit any of your personal information.</strong> All data 
                    processing happens locally on your device, ensuring complete privacy and security.
                  </p>
                </div>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Information We Do NOT Collect
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  When you use our resignation letter generator, we do NOT collect:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>Your name, position, or company information</li>
                  <li style={{ marginBottom: '8px' }}>Resignation dates or reasons</li>
                  <li style={{ marginBottom: '8px' }}>Any content you enter into our forms</li>
                  <li style={{ marginBottom: '8px' }}>Generated resignation letters</li>
                  <li style={{ marginBottom: '8px' }}>Personal messages or custom content</li>
                  <li style={{ marginBottom: '8px' }}>Email addresses or contact information</li>
                </ul>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  How Our Service Works
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Our resignation letter generator operates entirely within your web browser:
                </p>
                <ol style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>You select a template and fill out the form</li>
                  <li style={{ marginBottom: '8px' }}>Your browser processes the information locally</li>
                  <li style={{ marginBottom: '8px' }}>The letter is generated on your device</li>
                  <li style={{ marginBottom: '8px' }}>You download the letter directly from your browser</li>
                  <li style={{ marginBottom: '8px' }}>No data is sent to our servers at any point</li>
                </ol>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Technical Information We May Collect
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Like most websites, we may collect basic technical information for website functionality and improvement:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>Browser type and version</li>
                  <li style={{ marginBottom: '8px' }}>Operating system</li>
                  <li style={{ marginBottom: '8px' }}>IP address (anonymized)</li>
                  <li style={{ marginBottom: '8px' }}>Pages visited and time spent</li>
                  <li style={{ marginBottom: '8px' }}>Referral source</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  This information is collected through standard web analytics and does not include any personal 
                  information you enter into our forms.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Cookies and Local Storage
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  We may use cookies and local storage for:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>Remembering your preferences (like selected templates)</li>
                  <li style={{ marginBottom: '8px' }}>Improving website performance</li>
                  <li style={{ marginBottom: '8px' }}>Analytics (through third-party services like Google Analytics)</li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  We do NOT store your form data or generated letters in cookies or local storage.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Third-Party Services
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  We may use third-party services for website analytics and functionality:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Google Analytics:</strong> For understanding website usage patterns
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Content Delivery Networks (CDNs):</strong> For faster website loading
                  </li>
                </ul>
                <p style={{ marginBottom: '16px' }}>
                  These services have their own privacy policies and do not have access to the personal 
                  information you enter into our resignation letter forms.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Data Security
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Since we don't collect or store your personal information, there's no risk of data breaches 
                  involving your resignation letter content. Your information remains secure on your device at all times.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  We implement standard security measures for our website infrastructure, including:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>HTTPS encryption for all connections</li>
                  <li style={{ marginBottom: '8px' }}>Regular security updates</li>
                  <li style={{ marginBottom: '8px' }}>Secure hosting infrastructure</li>
                </ul>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Your Rights
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Since we don't collect your personal information, traditional data rights (like access, 
                  deletion, or portability) don't apply. However, you have complete control over your data:
                </p>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '8px' }}>All your information stays on your device</li>
                  <li style={{ marginBottom: '8px' }}>You can clear your browser data at any time</li>
                  <li style={{ marginBottom: '8px' }}>You can use the service without providing any personal information</li>
                  <li style={{ marginBottom: '8px' }}>You can disable cookies in your browser settings</li>
                </ul>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Children's Privacy
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. Since we don't collect personal information from 
                  anyone, this policy applies universally.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Changes to This Privacy Policy
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  We may update this privacy policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Contact Us
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div style={{
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <p style={{ margin: 0 }}>
                    Email: privacy@resignationletter.net<br />
                    Website: https://resignationletter.net/contact
                  </p>
                </div>
              </section>

              <div style={{
                background: '#f0f9ff',
                border: '1px solid #0ea5e9',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  🛡️ Privacy Summary
                </h3>
                <p style={{ color: '#075985', margin: 0 }}>
                  Your resignation letter data never leaves your device. We built this tool with privacy by design, 
                  ensuring your sensitive employment information remains completely confidential.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}