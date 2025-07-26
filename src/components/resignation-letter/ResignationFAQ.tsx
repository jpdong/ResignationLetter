import React, { useState } from 'react';
import Container from '../layout/Container';
import Row from '../layout/Row';
import Column from '../layout/Column';
import SectionTitle from '../elements/SectionTitle';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'timing' | 'content' | 'legal';
}

const ResignationFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems: FAQItem[] = [
    {
      id: 'what-is-resignation-letter',
      category: 'general',
      question: 'What is a resignation letter and why do I need one?',
      answer: 'A resignation letter is a formal document that officially notifies your employer of your intention to leave your job. It serves as legal documentation, helps maintain professional relationships, provides a clear record of your departure date, and ensures a smooth transition process.'
    },
    {
      id: 'how-much-notice',
      category: 'timing',
      question: 'How much notice should I give when resigning?',
      answer: 'The standard notice period is two weeks for most positions. However, senior roles may require 4-6 weeks, and executive positions often need 3-6 months. Always check your employment contract for specific requirements, as some companies may have different policies.'
    },
    {
      id: 'what-to-include',
      category: 'content',
      question: 'What should I include in my resignation letter?',
      answer: 'Your resignation letter should include: the date, recipient\'s name and title, a clear statement of resignation, your last working date, a brief reason (optional), an offer to help with transition, expression of gratitude, and your signature.'
    },
    {
      id: 'reason-required',
      category: 'content',
      question: 'Do I have to give a reason for resigning?',
      answer: 'No, you are not legally required to provide a reason for resigning. However, giving a brief, professional reason can help maintain positive relationships and provide closure. Keep it simple and positive, such as "career advancement" or "personal reasons."'
    },
    {
      id: 'when-to-submit',
      category: 'timing',
      question: 'When is the best time to submit my resignation letter?',
      answer: 'Submit your resignation letter early in the week (Monday or Tuesday) and early in the day. This gives your employer time to process the information and plan accordingly. Avoid Fridays or right before holidays when possible.'
    },
    {
      id: 'verbal-vs-written',
      category: 'general',
      question: 'Should I resign verbally first or submit the letter directly?',
      answer: 'It\'s best practice to have a verbal conversation with your supervisor first, followed immediately by submitting your written resignation letter. This shows respect and professionalism while ensuring you have written documentation.'
    },
    {
      id: 'immediate-resignation',
      category: 'timing',
      question: 'Can I resign immediately without notice?',
      answer: 'While legally possible in most at-will employment situations, resigning without notice can damage professional relationships and your reputation. Only do this in extreme circumstances, and be prepared for potential consequences like forfeiting benefits or references.'
    },
    {
      id: 'negative-workplace',
      category: 'content',
      question: 'How do I resign from a toxic workplace professionally?',
      answer: 'Even in difficult situations, maintain professionalism in your resignation letter. Focus on your decision to leave rather than workplace issues. Keep it brief, avoid negative comments, and stick to facts. You can address concerns through other channels if necessary.'
    },
    {
      id: 'rescind-resignation',
      category: 'legal',
      question: 'Can I take back my resignation after submitting it?',
      answer: 'You can attempt to rescind your resignation, but your employer is not obligated to accept it. Once submitted, your resignation is generally considered final. If you want to withdraw it, speak with your supervisor immediately and be prepared for any outcome.'
    },
    {
      id: 'resignation-during-probation',
      category: 'legal',
      question: 'Do I need to give notice during my probation period?',
      answer: 'Probation periods often have different notice requirements, sometimes as little as one week or even same-day resignation. Check your employment contract or employee handbook for specific probation period policies.'
    },
    {
      id: 'resignation-benefits',
      category: 'legal',
      question: 'Will resigning affect my benefits or final paycheck?',
      answer: 'This depends on your company\'s policies and local laws. Generally, you should receive your final paycheck including unused vacation time. Health insurance may continue through COBRA. Review your employee handbook and speak with HR about benefit transitions.'
    },
    {
      id: 'reference-after-resignation',
      category: 'general',
      question: 'Can I still get a reference after resigning?',
      answer: 'Yes, if you resign professionally and maintain good relationships. A well-written resignation letter helps ensure positive references. Consider asking for a reference letter before you leave, while your contributions are fresh in your supervisor\'s mind.'
    },
    {
      id: 'resignation-email',
      category: 'general',
      question: 'Is it acceptable to resign via email?',
      answer: 'Email resignation should be a last resort, used only when in-person or phone conversation isn\'t possible (remote work, supervisor unavailable, etc.). If you must resign via email, follow the same professional format as a written letter.'
    },
    {
      id: 'counter-offer',
      category: 'general',
      question: 'What if my employer makes a counter-offer?',
      answer: 'Consider counter-offers carefully. While flattering, statistics show that many people who accept counter-offers still leave within a year. Consider why you wanted to leave originally and whether the counter-offer addresses those core issues.'
    },
    {
      id: 'resignation-busy-period',
      category: 'timing',
      question: 'Should I delay my resignation if it\'s a busy time at work?',
      answer: 'While considerate, you shouldn\'t indefinitely delay your resignation for company convenience. If possible, time your resignation to minimize disruption, but don\'t sacrifice important opportunities. Offer to help with transition planning to show professionalism.'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Questions', count: faqItems.length },
    { key: 'general', label: 'General', count: faqItems.filter(item => item.category === 'general').length },
    { key: 'timing', label: 'Timing', count: faqItems.filter(item => item.category === 'timing').length },
    { key: 'content', label: 'Content', count: faqItems.filter(item => item.category === 'content').length },
    { key: 'legal', label: 'Legal', count: faqItems.filter(item => item.category === 'legal').length }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div style={{ padding: '80px 0', background: '#f9fafb' }} id="faq">
      <Container>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Get answers to the most common questions about resignation letters and the resignation process.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div style={{ marginBottom: '40px' }}>
          <Row gutter={[20, 20]} justify="center">
            <Column xs={24} md={16} lg={12}>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </Column>
          </Row>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px', 
            marginTop: '20px' 
          }}>
            {categories.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeCategory === key ? '#3b82f6' : '#fff',
                  color: activeCategory === key ? '#fff' : '#6b7280',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                {label}
                <span style={{
                  background: activeCategory === key ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                  color: activeCategory === key ? '#fff' : '#6b7280',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      background: getCategoryColor(item.category),
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      marginBottom: '8px'
                    }}>
                      {item.category}
                    </div>
                    <h3 style={{
                      color: '#1f2937',
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {item.question}
                    </h3>
                  </div>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#6b7280',
                    transform: expandedItems.has(item.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    ▼
                  </div>
                </button>
                
                {expandedItems.has(item.id) && (
                  <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: '1px solid #f3f4f6',
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}>
                    <p style={{
                      color: '#4b5563',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      margin: '16px 0 0 0'
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>
                🔍
              </div>
              <h3 style={{ color: '#6b7280', marginBottom: '8px' }}>
                No questions found
              </h3>
              <p style={{ color: '#9ca3af', margin: 0 }}>
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div style={{
          marginTop: '60px',
          background: '#fff',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            color: '#1f2937',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            Still Have Questions?
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px'
          }}>
            If you couldn't find the answer you're looking for, our resignation letter templates 
            and guide provide comprehensive coverage of most resignation scenarios.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const element = document.getElementById('templates');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Browse Templates
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('guide');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                background: 'transparent',
                color: '#3b82f6',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                padding: '10px 22px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
              }}
            >
              Read Guide
            </button>
          </div>
        </div>
      </Container>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'general': '#3b82f6',
    'timing': '#10b981',
    'content': '#f59e0b',
    'legal': '#ef4444'
  };
  return colors[category] || '#6b7280';
};

export default ResignationFAQ;