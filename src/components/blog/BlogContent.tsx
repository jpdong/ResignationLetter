import React from 'react';
import Markdown from 'markdown-to-jsx';

interface BlogContentProps {
  content: string;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const markdownOptions = {
    overrides: {
      h1: {
        props: {
          className: 'blog-content-h1'
        }
      },
      h2: {
        props: {
          className: 'blog-content-h2'
        }
      },
      h3: {
        props: {
          className: 'blog-content-h3'
        }
      },
      h4: {
        props: {
          className: 'blog-content-h4'
        }
      },
      p: {
        props: {
          className: 'blog-content-p'
        }
      },
      ul: {
        props: {
          className: 'blog-content-ul'
        }
      },
      ol: {
        props: {
          className: 'blog-content-ol'
        }
      },
      li: {
        props: {
          className: 'blog-content-li'
        }
      },
      blockquote: {
        props: {
          className: 'blog-content-blockquote'
        }
      },
      code: {
        props: {
          className: 'blog-content-code'
        }
      },
      pre: {
        props: {
          className: 'blog-content-pre'
        }
      },
      a: {
        props: {
          className: 'blog-content-link',
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      },
      img: {
        props: {
          className: 'blog-content-img'
        }
      },
      table: {
        props: {
          className: 'blog-content-table'
        }
      },
      th: {
        props: {
          className: 'blog-content-th'
        }
      },
      td: {
        props: {
          className: 'blog-content-td'
        }
      },
      hr: {
        props: {
          className: 'blog-content-hr'
        }
      }
    }
  };

  return (
    <div className="blog-content">
      <Markdown options={markdownOptions}>
        {content}
      </Markdown>
    </div>
  );
};