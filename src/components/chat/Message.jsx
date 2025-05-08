// src/components/chat/Message.jsx
import React from 'react';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const isRaghadReply = (content) =>
  content && content.startsWith('تم تطويري على يد البطلة الرائعة: رغد حسنين');

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  const isRaghad = isRaghadReply(message.content);

  // Example of English content with Markdown formatting
  const exampleContent = `# Main Title
## Subtitle

**Bold text** and *italic text*

- Bullet point
- Another item

1. Numbered list
2. Another item

> Important quote

\`simple code\`

\`\`\`javascript
const code = "block";
\`\`\`

[Link](https://example.com)`;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`flex items-end max-w-[80%] gap-2 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-700'
            : 'bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-800'
        }`}>
          {isUser ? (
            <FiUser className="w-4 h-4 text-white" />
          ) : (
            <FiMessageSquare className="w-4 h-4 text-blue-700 dark:text-blue-200" />
          )}
        </div>
        <div
          className={`px-4 py-3 rounded-2xl shadow text-base whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-md'
              : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 dark:from-blue-900 dark:to-blue-800 dark:text-blue-100 rounded-bl-md'
          }`}
          style={isRaghad ? { direction: 'rtl', textAlign: 'right' } : {}}
        >
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="p-2 rounded bg-gray-200 dark:bg-gray-700 overflow-x-auto">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 last:mb-0">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 last:mb-0">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 last:mb-0">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    {children}
                  </td>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mb-2">{children}</h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

