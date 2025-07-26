import React, { useState } from 'react';
import Container from '../layout/Container';
import Row from '../layout/Row';
import Column from '../layout/Column';
import SectionTitle from '../elements/SectionTitle';

interface GuideSection {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: string;
}

const ResignationGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('basics');

  const guideSections: GuideSection[] = [
    {
      id: 'basics',
      title: 'Resignation Letter Basics',
      icon: '📝',
      content: (
        <div>
          <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>What is a Resignation Letter?</h3>
          <p style={{ marginBottom: '16px' }}>
            A resignation letter is a formal document that notifies your employer of your intention to leave your job. 
            It serves as official documentation of your departure and helps maintain professional relationships.
          </p>
          
          <h4 style={{ color: '#374151', marginBottom: '12px' }}>Key Components:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Date of the letter</li>
            <li style={{ marginBottom: '8px' }}>Recipient's name and title</li>
            <li style={{ marginBottom: '8px' }}>Clear statement of resignation</li>
            <li style={{ marginBottom: '8px' }}>Last working date</li>
            <li style={{ marginBottom: '8px' }}>Reason (optional but recommended)</li>
            <li style={{ marginBottom: '8px' }}>Gratitude and positive closing</li>
            <li style={{ marginBottom: '8px' }}>Your signature</li>
          </ul>

          <div style={{ 
            background: '#f0f9ff', 
            border: '1px solid #0ea5e9', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '20px'
          }}>
            <h4 style={{ color: '#0c4a6e', marginBottom: '8px' }}>💡 Pro Tip</h4>
            <p style={{ color: '#075985', margin: 0 }}>
              Keep your resignation letter concise, professional, and positive. This document may be kept in your personnel file permanently.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'timing',
      title: 'When to Submit Your Resignation',
      icon: '⏰',
      content: (
        <div>
          <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>Timing Your Resignation</h3>
          
          <h4 style={{ color: '#374151', marginBottom: '12px' }}>Standard Notice Period:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Entry-level positions:</strong> 2 weeks minimum</li>
            <li style={{ marginBottom: '8px' }}><strong>Mid-level positions:</strong> 2-4 weeks</li>
            <li style={{ marginBottom: '8px' }}><strong>Senior positions:</strong> 4-6 weeks or more</li>
            <li style={{ marginBottom: '8px' }}><strong>Executive positions:</strong> 3-6 months</li>
          </ul>

          <h4 style={{ color: '#374151', marginBottom: '12px' }}>Best Times to Resign:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Early in the week (Monday or Tuesday)</li>
            <li style={{ marginBottom: '8px' }}>After completing major projects</li>
            <li style={{ marginBottom: '8px' }}>Before busy seasons when possible</li>
            <li style={{ marginBottom: '8px' }}>When you can provide adequate transition time</li>
          </ul>

          <div style={{ 
            background: '#fef3c7', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '20px'
          }}>
            <h4 style={{ color: '#92400e', marginBottom: '8px' }}>⚠️ Important</h4>
            <p style={{ color: '#a16207', margin: 0 }}>
              Check your employment contract for specific notice requirements. Some positions may require longer notice periods.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'dos-donts',
      title: 'Do\'s and Don\'ts',
      icon: '✅',
      content: (
        <div>
          <Row gutter={[30, 30]}>
            <Column xs={24} md={12}>
              <div style={{ 
                background: '#ecfdf5', 
                border: '1px solid #10b981', 
                borderRadius: '8px', 
                padding: '20px' 
              }}>
                <h4 style={{ color: '#065f46', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✅ DO
                </h4>
                <ul style={{ paddingLeft: '20px', color: '#047857' }}>
                  <li style={{ marginBottom: '8px' }}>Be professional and courteous</li>
                  <li style={{ marginBottom: '8px' }}>Give appropriate notice</li>
                  <li style={{ marginBottom: '8px' }}>Offer to help with transition</li>
                  <li style={{ marginBottom: '8px' }}>Express gratitude for opportunities</li>
                  <li style={{ marginBottom: '8px' }}>Keep it brief and to the point</li>
                  <li style={{ marginBottom: '8px' }}>Proofread before submitting</li>
                  <li style={{ marginBottom: '8px' }}>Submit in person when possible</li>
                  <li style={{ marginBottom: '8px' }}>Keep a copy for your records</li>
                </ul>
              </div>
            </Column>
            
            <Column xs={24} md={12}>
              <div style={{ 
                background: '#fef2f2', 
                border: '1px solid #ef4444', 
                borderRadius: '8px', 
                padding: '20px' 
              }}>
                <h4 style={{ color: '#991b1b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ❌ DON'T
                </h4>
                <ul style={{ paddingLeft: '20px', color: '#dc2626' }}>
                  <li style={{ marginBottom: '8px' }}>Criticize the company or colleagues</li>
                  <li style={{ marginBottom: '8px' }}>Go into excessive detail about reasons</li>
                  <li style={{ marginBottom: '8px' }}>Resign via email unless necessary</li>
                  <li style={{ marginBottom: '8px' }}>Burn bridges with negative comments</li>
                  <li style={{ marginBottom: '8px' }}>Submit without proper notice</li>
                  <li style={{ marginBottom: '8px' }}>Make demands or ultimatums</li>
                  <li style={{ marginBottom: '8px' }}>Discuss salary or benefits issues</li>
                  <li style={{ marginBottom: '8px' }}>Leave without completing handover</li>
                </ul>
              </div>
            </Column>
          </Row>
        </div>
      )
    },
    {
      id: 'situations',
      title: 'Situation-Specific Advice',
      icon: '🎯',
      content: (
        <div>
          <h3 style={{ color: '#1f2937', marginBottom: '20px' }}>Resignation Scenarios</h3>
          
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: '#374151', marginBottom: '12px' }}>🏃‍♂️ Immediate Resignation</h4>
            <p style={{ marginBottom: '12px' }}>
              Sometimes circumstances require immediate departure. In these cases:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '6px' }}>Apologize for the short notice</li>
              <li style={{ marginBottom: '6px' }}>Briefly explain the urgency without details</li>
              <li style={{ marginBottom: '6px' }}>Offer to help remotely if possible</li>
              <li style={{ marginBottom: '6px' }}>Be prepared for potential consequences</li>
            </ul>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: '#374151', marginBottom: '12px' }}>🚀 Career Advancement</h4>
            <p style={{ marginBottom: '12px' }}>
              When leaving for a better opportunity:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '6px' }}>Focus on growth and new challenges</li>
              <li style={{ marginBottom: '6px' }}>Emphasize what you've learned</li>
              <li style={{ marginBottom: '6px' }}>Avoid mentioning salary increases</li>
              <li style={{ marginBottom: '6px' }}>Express genuine appreciation</li>
            </ul>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: '#374151', marginBottom: '12px' }}>🏖️ Retirement</h4>
            <p style={{ marginBottom: '12px' }}>
              For retirement resignations:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '6px' }}>Give extended notice (3-6 months)</li>
              <li style={{ marginBottom: '6px' }}>Offer comprehensive knowledge transfer</li>
              <li style={{ marginBottom: '6px' }}>Reflect on your career journey</li>
              <li style={{ marginBottom: '6px' }}>Maintain relationships for the future</li>
            </ul>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: '#374151', marginBottom: '12px' }}>👨‍👩‍👧‍👦 Personal Reasons</h4>
            <p style={{ marginBottom: '12px' }}>
              When resigning for personal circumstances:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '6px' }}>Keep details private and brief</li>
              <li style={{ marginBottom: '6px' }}>Focus on the decision being necessary</li>
              <li style={{ marginBottom: '6px' }}>Thank them for understanding</li>
              <li style={{ marginBottom: '6px' }}>Leave the door open for future opportunities</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'examples',
      title: 'Before & After Examples',
      icon: '📋',
      content: (
        <div>
          <h3 style={{ color: '#1f2937', marginBottom: '20px' }}>Resignation Letter Examples</h3>
          
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ color: '#dc2626', marginBottom: '16px' }}>❌ Poor Example</h4>
            <div style={{ 
              background: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '8px', 
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              <p>Hey Mike,</p>
              <p>I'm quitting. This place is terrible and I can't stand working here anymore. The management is awful and the pay is terrible. I'm done with this job effective immediately.</p>
              <p>Don't expect me to train anyone.</p>
              <p>Later,<br />John</p>
            </div>
            <div style={{ color: '#dc2626', fontSize: '14px' }}>
              <strong>Problems:</strong> Unprofessional tone, negative comments, no proper notice, no gratitude, poor formatting.
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ color: '#10b981', marginBottom: '16px' }}>✅ Good Example</h4>
            <div style={{ 
              background: '#ecfdf5', 
              border: '1px solid #a7f3d0', 
              borderRadius: '8px', 
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              <p>January 15, 2025</p>
              <br />
              <p>Dear Mr. Johnson,</p>
              <br />
              <p>I am writing to formally notify you of my resignation from my position as Marketing Coordinator at ABC Company. My last day of work will be January 29, 2025, providing two weeks' notice as required.</p>
              <br />
              <p>I have accepted a position that will allow me to further develop my skills in digital marketing and advance my career goals.</p>
              <br />
              <p>I am committed to ensuring a smooth transition and am willing to assist in training my replacement and completing any outstanding projects during my remaining time.</p>
              <br />
              <p>Thank you for the opportunities for professional and personal growth during my time here. I have enjoyed working with the team and appreciate the support provided to me.</p>
              <br />
              <p>Sincerely,<br />John Smith</p>
            </div>
            <div style={{ color: '#10b981', fontSize: '14px' }}>
              <strong>Strengths:</strong> Professional format, clear notice period, positive tone, offers assistance, expresses gratitude.
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '80px 0', background: '#fff' }} id="guide">
      <Container>
        <SectionTitle>Complete Guide to Writing Resignation Letters</SectionTitle>
        
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Learn everything you need to know about writing professional resignation letters. 
            From basic components to situation-specific advice, we've got you covered.
          </p>
        </div>

        <Row gutter={[40, 40]}>
          {/* Navigation Sidebar */}
          <Column xs={24} lg={8}>
            <div style={{ 
              background: '#f9fafb', 
              borderRadius: '12px', 
              padding: '24px',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: '600'
              }}>
                Guide Sections
              </h3>
              
              {guideSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: activeSection === section.id ? '#3b82f6' : 'transparent',
                    color: activeSection === section.id ? '#fff' : '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.background = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </div>
          </Column>

          {/* Content Area */}
          <Column xs={24} lg={16}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              minHeight: '600px'
            }}>
              {guideSections.map((section) => (
                <div
                  key={section.id}
                  style={{
                    display: activeSection === section.id ? 'block' : 'none'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    marginBottom: '24px' 
                  }}>
                    <span style={{ fontSize: '32px' }}>{section.icon}</span>
                    <h2 style={{ 
                      color: '#1f2937', 
                      fontSize: '28px', 
                      fontWeight: '700',
                      margin: 0
                    }}>
                      {section.title}
                    </h2>
                  </div>
                  
                  <div style={{ 
                    color: '#374151', 
                    lineHeight: '1.7',
                    fontSize: '16px'
                  }}>
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </Column>
        </Row>

        {/* Quick Tips Summary */}
        <div style={{ 
          marginTop: '60px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '40px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            marginBottom: '20px' 
          }}>
            🎯 Quick Resignation Letter Checklist
          </h3>
          
          <Row gutter={[30, 20]}>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Professional tone
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Clear last working date
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Adequate notice period
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Express gratitude
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Offer transition help
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Keep it concise
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Proofread carefully
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '14px' }}>
                ✅ Keep a copy
              </div>
            </Column>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ResignationGuide;